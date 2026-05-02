param(
  [string[]]$Urls = @(
    "https://cloudsec-soc-detection-lab.vercel.app/dashboard/",
    "https://kalla-bhanu.github.io/CloudSec-SOC-Detection-Lab/"
  ),
  [string]$ExpectedTitle = "CloudSec SOC Detection Lab",
  [int]$MaxAttempts = 3,
  [int]$RetryDelaySeconds = 15
)

$ErrorActionPreference = "Stop"
$failed = $false

foreach ($url in $Urls) {
  $passed = $false
  $lastFailure = "not checked"

  for ($attempt = 1; $attempt -le $MaxAttempts; $attempt++) {
    try {
      $response = Invoke-WebRequest `
        -Uri $url `
        -Method Get `
        -UseBasicParsing `
        -MaximumRedirection 5 `
        -TimeoutSec 30 `
        -Headers @{ "User-Agent" = "CloudSec-SOC-Live-Smoke/1.0" }

      if ($response.StatusCode -ne 200) {
        $lastFailure = "returned HTTP $($response.StatusCode), expected 200"
      } else {
        $titlePattern = "<title>\s*$([regex]::Escape($ExpectedTitle))\s*</title>"
        if ($response.Content -notmatch $titlePattern) {
          $lastFailure = "did not include expected title '$ExpectedTitle'"
        } else {
          $passed = $true
          break
        }
      }
    } catch {
      $lastFailure = if ($_.Exception -and $_.Exception.Message) {
        $_.Exception.Message
      } else {
        $_.ToString()
      }
    }

    if ($attempt -lt $MaxAttempts) {
      Write-Warning "Attempt $attempt/$MaxAttempts failed for ${url}: $lastFailure. Retrying..."
      Start-Sleep -Seconds $RetryDelaySeconds
    }
  }

  if ($passed) {
    Write-Host "PASS ${url} returned HTTP 200 with expected title."
  } else {
    Write-Host "FAIL ${url} after $MaxAttempts attempt(s): $lastFailure"
    $failed = $true
  }
}

if ($failed) {
  exit 1
}

Write-Host "PASS live dashboard smoke checks completed."
