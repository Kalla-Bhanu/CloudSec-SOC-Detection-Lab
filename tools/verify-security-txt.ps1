$ErrorActionPreference = "Stop"

$rootPath = Join-Path $PSScriptRoot "..\.well-known\security.txt"
$dashboardPath = Join-Path $PSScriptRoot "..\dashboard\.well-known\security.txt"
$requiredFields = @("Contact", "Expires", "Policy", "Preferred-Languages", "Canonical")

foreach ($path in @($rootPath, $dashboardPath)) {
  if (-not (Test-Path -LiteralPath $path)) {
    Write-Error "Missing security.txt file: $path"
  }
}

$rootContent = (Get-Content -LiteralPath $rootPath -Raw).Replace("`r`n", "`n").Trim()
$dashboardContent = (Get-Content -LiteralPath $dashboardPath -Raw).Replace("`r`n", "`n").Trim()

if ($rootContent -ne $dashboardContent) {
  Write-Error "Root and dashboard security.txt files differ."
}

$fields = @{}
foreach ($line in $rootContent -split "`n") {
  if ($line -match "^([^:]+):\s*(.+)$") {
    $fields[$Matches[1]] = $Matches[2]
  }
}

foreach ($field in $requiredFields) {
  if (-not $fields.ContainsKey($field)) {
    Write-Error "security.txt missing required local field: $field"
  }
}

$expires = [DateTimeOffset]::Parse($fields["Expires"])
if ($expires -le [DateTimeOffset]::UtcNow) {
  Write-Error "security.txt Expires value is not in the future: $($fields["Expires"])"
}

Write-Host "PASS security.txt files are aligned and unexpired."
