[CmdletBinding()]
param(
    [string]$Region = "us-east-1",
    [string]$Site = "us5.datadoghq.com",
    [string]$ApiSecretName = "cloudsec-rebuild/datadog/api-key",
    [string]$AppSecretName = "cloudsec-rebuild/datadog/app-key"
)

$ErrorActionPreference = "Stop"

function Get-SecretValue {
    param([string]$SecretId)
    $raw = aws secretsmanager get-secret-value --region $Region --secret-id $SecretId --query SecretString --output text
    try {
        $parsed = $raw | ConvertFrom-Json
        foreach ($key in @("api_key", "app_key", "DD_API_KEY", "DD_APP_KEY", "value", "key")) {
            if ($parsed.PSObject.Properties.Name -contains $key -and $parsed.$key) {
                return $parsed.$key
            }
        }
    } catch {
    }
    return $raw.Trim()
}

function Invoke-DatadogJson {
    param(
        [string]$Method,
        [string]$Uri,
        [object]$Body = $null
    )
    $headers = @{
        "DD-API-KEY" = $script:ApiKey
        "DD-APPLICATION-KEY" = $script:AppKey
        "Content-Type" = "application/json"
    }
    if ($null -ne $Body) {
        return Invoke-RestMethod -Method $Method -Uri $Uri -Headers $headers -Body ($Body | ConvertTo-Json -Depth 10)
    }
    return Invoke-RestMethod -Method $Method -Uri $Uri -Headers $headers
}

$script:ApiKey = Get-SecretValue -SecretId $ApiSecretName
$script:AppKey = Get-SecretValue -SecretId $AppSecretName
$baseUri = "https://api.$Site/api/v1/monitor"
$existingMonitors = Invoke-DatadogJson -Method GET -Uri $baseUri

$monitors = @(
    @{
        name = "CloudSec Test Harness - Pipeline Health"
        type = "log alert"
        query = "logs(""source:test-harness @synthetic:true @purpose:detection-rule-validation"").index(""*"").rollup(""count"").last(""5m"") >= 1"
        message = "Synthetic detection test harness replay observed. This monitor is intentionally scoped to source:test-harness and synthetic:true."
        tags = @("cloudsec", "test-harness", "synthetic", "pipeline-health")
    },
    @{
        name = "CloudSec Test Harness - Identity Account Takeover"
        type = "log alert"
        query = "logs(""source:test-harness @synthetic:true @purpose:detection-rule-validation @scenario:identity_account_takeover"").index(""*"").rollup(""count"").last(""10m"") >= 1"
        message = "Synthetic identity account takeover replay observed. This monitor only fires on test-harness events."
        tags = @("cloudsec", "test-harness", "synthetic", "identity-account-takeover")
    },
    @{
        name = "CloudSec Test Harness - Endpoint To MongoDB Pivot"
        type = "log alert"
        query = "logs(""source:test-harness @synthetic:true @purpose:detection-rule-validation @scenario:endpoint_to_mongodb_pivot"").index(""*"").rollup(""count"").last(""10m"") >= 1"
        message = "Synthetic endpoint-to-MongoDB pivot replay observed. This monitor only fires on test-harness events."
        tags = @("cloudsec", "test-harness", "synthetic", "endpoint-to-mongodb-pivot")
    }
)

foreach ($monitor in $monitors) {
    $body = @{
        name = $monitor.name
        type = $monitor.type
        query = $monitor.query
        message = $monitor.message
        tags = $monitor.tags
        options = @{
            include_tags = $true
            notify_no_data = $false
            renotify_interval = 0
            on_missing_data = "default"
            thresholds = @{
                critical = 1
            }
        }
    }

    $match = $existingMonitors | Where-Object { $_.name -eq $monitor.name } | Select-Object -First 1
    if ($match) {
        Invoke-DatadogJson -Method PUT -Uri "$baseUri/$($match.id)" -Body $body | Out-Null
        Write-Host "Updated monitor $($monitor.name)"
    } else {
        Invoke-DatadogJson -Method POST -Uri $baseUri -Body $body | Out-Null
        Write-Host "Created monitor $($monitor.name)"
    }
}
