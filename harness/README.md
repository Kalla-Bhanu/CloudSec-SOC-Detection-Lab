# CloudSec Detection Test Harness

This tooling builds a clearly labeled synthetic replay pipeline for the non-AWS parts of the CloudSec lab.

What it is:
- a detection rule test harness
- a manual replay path for curated Okta, Google Workspace, CrowdStrike, MongoDB, and Tenable-shaped events
- a Datadog-visible synthetic feed for validation purposes

What it is not:
- a rebuilt Okta integration
- a rebuilt Google Workspace integration
- a rebuilt CrowdStrike, MongoDB, or Tenable live pipeline

The supported public validation path is local and fixture-based. See `../docs/reproducibility.md` for the clone, install, test, and dashboard run steps.

## Files

- `lambda_function.py`
- `CONTRACT.md`
- `deploy-soclab-test-harness.ps1`
- `invoke-soclab-test-harness.ps1`
- `upsert-datadog-test-harness-monitors.ps1`

## Contract

The harness behavior is defined in `CONTRACT.md`. Tests should validate that contract rather than a single implementation detail.

The five canonical replay scenarios are:

- `identity_account_takeover`
- `aws_iam_key_misuse`
- `eks_secret_access_chain`
- `endpoint_to_mongodb_pivot`
- `s3_data_access_exfiltration`

## Deploy

The deployment commands below are reference deployment steps for users with their own AWS and Datadog accounts. They are not required for public review, and they are not validated by this repository's continuous integration because they require live AWS and Datadog credentials supplied outside the repo.

Review the generated IAM policy and keep all keys, tokens, and secret values outside the repository before adapting these commands.

```powershell
powershell -ExecutionPolicy Bypass -File ".\deploy-soclab-test-harness.ps1"
```

## Create or update the Datadog monitors

```powershell
powershell -ExecutionPolicy Bypass -File ".\upsert-datadog-test-harness-monitors.ps1"
```

## Invoke example scenarios

```powershell
powershell -ExecutionPolicy Bypass -File ".\invoke-soclab-test-harness.ps1" -Scenario identity_account_takeover -Limit 6
```

```powershell
powershell -ExecutionPolicy Bypass -File ".\invoke-soclab-test-harness.ps1" -Scenario aws_iam_key_misuse -Limit 6
```

```powershell
powershell -ExecutionPolicy Bypass -File ".\invoke-soclab-test-harness.ps1" -Scenario eks_secret_access_chain -Limit 6
```

```powershell
powershell -ExecutionPolicy Bypass -File ".\invoke-soclab-test-harness.ps1" -Scenario endpoint_to_mongodb_pivot -Limit 8
```

```powershell
powershell -ExecutionPolicy Bypass -File ".\invoke-soclab-test-harness.ps1" -Scenario s3_data_access_exfiltration -Limit 6
```

## Validation Role

The harness injects synthetic events shaped like the lab's non-AWS sources so detection logic can be validated without relying on private vendor tenants.
