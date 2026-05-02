[CmdletBinding()]
param(
    [string]$Region = "us-east-1",
    [string]$FunctionName = "cloudsec-detection-test-harness",
    [string]$RoleName = "cloudsec-detection-test-harness-role",
    [string]$DatadogApiSecretName = "EXAMPLE_DATADOG_SECRET_NAME",
    [string]$DatadogSite = "us5.datadoghq.com"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$stage = Join-Path $root "build"
$packageDir = Join-Path $stage "package"
$zipPath = Join-Path $stage "$FunctionName.zip"
$assumeRolePath = Join-Path $stage "assume-role.json"
$inlinePolicyPath = Join-Path $stage "inline-policy.json"

New-Item -ItemType Directory -Force -Path $stage | Out-Null
if (Test-Path $packageDir) { Remove-Item -Recurse -Force $packageDir }
New-Item -ItemType Directory -Force -Path $packageDir | Out-Null

Copy-Item (Join-Path $root "lambda_function.py") $packageDir
$datasetRoot = Join-Path (Split-Path $root -Parent) "data"
foreach ($file in @("alerts.csv", "identity_events.csv", "cloud_activity.csv", "endpoint_activity.csv", "incident_timeline.csv", "asset_inventory.csv")) {
    Copy-Item (Join-Path $datasetRoot $file) $packageDir
}

if (Test-Path $zipPath) { Remove-Item -Force $zipPath }
Compress-Archive -Path (Join-Path $packageDir "*") -DestinationPath $zipPath -Force

$assumeRolePolicy = @'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
'@
$assumeRolePolicy | Set-Content -Path $assumeRolePath -Encoding ASCII

$accountId = aws sts get-caller-identity --query Account --output text
$secretArn = aws secretsmanager describe-secret --region $Region --secret-id $DatadogApiSecretName --query ARN --output text

$inlinePolicy = @"
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetSecretValue"
      ],
      "Resource": "$secretArn"
    }
  ]
}
"@
$inlinePolicy | Set-Content -Path $inlinePolicyPath -Encoding ASCII

$roleArn = $null
try {
    $roleArn = aws iam get-role --role-name $RoleName --query Role.Arn --output text 2>$null
} catch {
    $roleArn = $null
}
$roleExists = ($LASTEXITCODE -eq 0 -and $roleArn)

if (-not $roleExists) {
    $roleArn = aws iam create-role --role-name $RoleName --assume-role-policy-document file://$assumeRolePath --query Role.Arn --output text
    aws iam attach-role-policy --role-name $RoleName --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole | Out-Null
    Start-Sleep -Seconds 10
}

aws iam put-role-policy --role-name $RoleName --policy-name "$RoleName-secret-access" --policy-document file://$inlinePolicyPath | Out-Null

$functionExists = $false
try {
    aws lambda get-function --function-name $FunctionName --region $Region --query Configuration.FunctionName --output text 1>$null 2>$null
    $functionExists = ($LASTEXITCODE -eq 0)
} catch {
    $functionExists = $false
}

$envJson = @"
{
  "Variables": {
    "DD_SITE": "$DatadogSite",
    "DD_API_SECRET_NAME": "$DatadogApiSecretName"
  }
}
"@
$envPath = Join-Path $stage "environment.json"
$envJson | Set-Content -Path $envPath -Encoding ASCII

if (-not $functionExists) {
    aws lambda create-function `
        --function-name $FunctionName `
        --region $Region `
        --runtime python3.12 `
        --handler lambda_function.lambda_handler `
        --zip-file fileb://$zipPath `
        --role $roleArn `
        --timeout 30 `
        --memory-size 256 `
        --environment file://$envPath | Out-Null
} else {
    aws lambda update-function-code --function-name $FunctionName --region $Region --zip-file fileb://$zipPath | Out-Null
    aws lambda update-function-configuration `
        --function-name $FunctionName `
        --region $Region `
        --runtime python3.12 `
        --handler lambda_function.lambda_handler `
        --timeout 30 `
        --memory-size 256 `
        --environment file://$envPath | Out-Null
}

aws lambda wait function-updated --function-name $FunctionName --region $Region

Write-Host "Deployed $FunctionName in $Region for account $accountId"
Write-Host "Invoke with:"
Write-Host "aws lambda invoke --function-name $FunctionName --region $Region --cli-binary-format raw-in-base64-out --payload '{\"\"scenario\"\":\"\"identity_account_takeover\"\",\"\"limit\"\":6}' output.json"
