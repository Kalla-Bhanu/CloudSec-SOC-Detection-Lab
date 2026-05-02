Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$scriptDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = (Resolve-Path -LiteralPath (Join-Path $scriptDirectory "..")).Path
$failures = [System.Collections.Generic.List[string]]::new()
$scannedTextFiles = 0

function Add-Failure {
  param([string]$Message)
  [void]$failures.Add($Message)
}

function Get-RelativePath {
  param([string]$Path)

  $relative = $Path.Substring($repoRoot.Length).TrimStart("\", "/")
  return ($relative -replace "\\", "/")
}

function Test-IsTextPath {
  param([string]$RelativePath)

  $fileName = Split-Path -Leaf $RelativePath
  if ($fileName -in @("LICENSE", ".editorconfig", ".gitignore", ".gitattributes")) {
    return $true
  }

  $extension = [System.IO.Path]::GetExtension($RelativePath).ToLowerInvariant()
  return $extension -in @(
    ".css",
    ".csv",
    ".html",
    ".js",
    ".json",
    ".md",
    ".mjs",
    ".ps1",
    ".py",
    ".svg",
    ".txt",
    ".xml",
    ".yaml",
    ".yml"
  )
}

Push-Location $repoRoot
try {
  $requiredFiles = @(
    ".editorconfig",
    ".gitattributes",
    ".gitignore",
    "LICENSE",
    "README.md",
    "SECURITY.md",
    "dashboard/index.html",
    "docs/demo-walkthrough.md",
    "docs/deck/cloudsec-soc-detection-lab.pptx",
    "evidence-templates/asset-manifest.md"
  )

  foreach ($requiredFile in $requiredFiles) {
    if (-not (Test-Path -LiteralPath (Join-Path $repoRoot $requiredFile) -PathType Leaf)) {
      Add-Failure "Missing required public file: $requiredFile"
    }
  }

  $trackedFiles = @(& git ls-files)
  if ($LASTEXITCODE -ne 0) {
    Add-Failure "git ls-files failed; run this script from a Git worktree."
    $trackedFiles = @()
  }

  $forbiddenPathPatterns = @(
    "(^|/)__pycache__(/|$)",
    "\.pyc$",
    "\.pyo$",
    "\.log$",
    "\.tmp$",
    "(^|/)\.env(\.|$)?",
    "\.zip$"
  )

  foreach ($trackedFile in $trackedFiles) {
    $normalizedTrackedFile = ($trackedFile -replace "\\", "/")
    foreach ($pattern in $forbiddenPathPatterns) {
      if ($normalizedTrackedFile -match $pattern) {
        Add-Failure "Forbidden tracked artifact: $normalizedTrackedFile"
      }
    }
  }

  $workspaceFiles = Get-ChildItem -LiteralPath $repoRoot -Recurse -Force -File |
    Where-Object {
      $relativePath = Get-RelativePath $_.FullName
      $relativePath -notlike ".git/*"
    }

  foreach ($workspaceFile in $workspaceFiles) {
    $relativePath = Get-RelativePath $workspaceFile.FullName
    foreach ($pattern in $forbiddenPathPatterns) {
      if ($relativePath -match $pattern) {
        Add-Failure "Forbidden workspace artifact: $relativePath"
      }
    }
  }

  $readmeText = Get-Content -LiteralPath (Join-Path $repoRoot "README.md") -Raw
  $requiredReadmeText = @(
    "https://cloudsec-soc-detection-lab.vercel.app/dashboard/",
    "https://kalla-bhanu.github.io/CloudSec-SOC-Detection-Lab/",
    "[License](LICENSE)"
  )

  foreach ($requiredText in $requiredReadmeText) {
    if (-not $readmeText.Contains($requiredText)) {
      Add-Failure "README.md is missing expected public link text: $requiredText"
    }
  }

  $contentPatterns = @(
    @{ Name = "AWS access key id"; Pattern = "\b(AKIA|ASIA)[0-9A-Z]{16}\b" },
    @{ Name = "AWS secret key assignment"; Pattern = "(?i)\b(aws_secret_access_key|secret_access_key)\b\s*[:=]" },
    @{ Name = "Generic secret assignment"; Pattern = "(?i)\b(client_secret|api[_-]?key|access[_-]?token|refresh[_-]?token|private[_-]?key)\b\s*[:=]\s*[""'][A-Za-z0-9_./+=-]{12,}[""']" },
    @{ Name = "Private key block"; Pattern = "-----BEGIN (RSA|DSA|EC|OPENSSH|PRIVATE) KEY-----" },
    @{ Name = "GitHub token"; Pattern = "(?i)\bgh[pousr]_[A-Za-z0-9_]{20,}\b" },
    @{ Name = "Slack token"; Pattern = "(?i)\bxox[baprs]-[A-Za-z0-9-]{10,}\b" },
    @{ Name = "JWT"; Pattern = "\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b" },
    @{ Name = "12 digit account id"; Pattern = "(?<!\d)\d{12}(?!\d)" },
    @{ Name = "Old demo IP address"; Pattern = "\b(185\.220\.101\.14|73\.44\.21\.19)\b" },
    @{ Name = "Interview-only context"; Pattern = "(?i)\b(Keyrock|interview|debrief|SharePoint|Maria|Gilad|David|Shiran)\b" },
    @{ Name = "Private business term"; Pattern = "(?i)\b(customer|billing|invoice|salary|offer letter|job update)\b" },
    @{ Name = "Internal workstream phrasing"; Pattern = "(?i)\b(Phase 2 approved|submitted public scope|implementation specification|screening round)\b" }
  )

  foreach ($trackedFile in $trackedFiles) {
    $relativePath = ($trackedFile -replace "\\", "/")

    if ($relativePath -eq "tools/verify-public-safe.ps1") {
      continue
    }

    if (-not (Test-IsTextPath $relativePath)) {
      continue
    }

    $fullPath = Join-Path $repoRoot $relativePath
    if (-not (Test-Path -LiteralPath $fullPath -PathType Leaf)) {
      Add-Failure "Tracked file is missing from workspace: $relativePath"
      continue
    }

    $scannedTextFiles++
    foreach ($entry in $contentPatterns) {
      $matches = Select-String -LiteralPath $fullPath -Pattern $entry.Pattern -AllMatches
      foreach ($match in $matches) {
        Add-Failure "$($entry.Name) in $relativePath at line $($match.LineNumber)"
      }
    }
  }
}
finally {
  Pop-Location
}

if ($failures.Count -gt 0) {
  Write-Host "FAIL public-safe checks found $($failures.Count) issue(s):"
  foreach ($failure in $failures) {
    Write-Host " - $failure"
  }
  exit 1
}

Write-Host "PASS public-safe checks completed."
Write-Host "Checked $($trackedFiles.Count) tracked files; scanned $scannedTextFiles text files."
