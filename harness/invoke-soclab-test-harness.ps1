[CmdletBinding()]
param(
    [string]$Region = "us-east-1",
    [string]$FunctionName = "cloudsec-detection-test-harness",
    [ValidateSet("identity_account_takeover", "aws_iam_key_misuse", "eks_secret_access_chain", "endpoint_to_mongodb_pivot", "s3_data_access_exfiltration", "asset_context_enrichment", "all")]
    [string]$Scenario = "all",
    [int]$Limit = 25,
    [string]$OutputFile = ""
)

$ErrorActionPreference = "Stop"

if (-not $OutputFile) {
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $OutputFile = Join-Path $env:TEMP "cloudsec-test-harness-$Scenario-$timestamp-$PID.json"
}

$payload = @{
    scenario = $Scenario
    limit = $Limit
    replay_id = "manual-$(Get-Date -Format 'yyyyMMddTHHmmssZ')"
} | ConvertTo-Json -Compress

$payloadFile = Join-Path $env:TEMP "cloudsec-test-harness-payload-$Scenario-$PID.json"
$payload | Set-Content -Path $payloadFile -Encoding ASCII

aws lambda invoke `
    --function-name $FunctionName `
    --region $Region `
    --cli-binary-format raw-in-base64-out `
    --payload fileb://$payloadFile `
    $OutputFile | Out-Null

Get-Content $OutputFile
