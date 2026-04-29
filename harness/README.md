# CloudSec Detection Test Harness

This tooling builds a clearly labeled synthetic replay pipeline for the non-AWS parts of the CloudSec lab.

What it is:
- a detection rule test harness
- a manual replay path for curated Okta, Google Workspace, CrowdStrike, MongoDB, and Tenable-shaped events
- a Datadog-visible synthetic feed for validation and demo purposes

What it is not:
- a rebuilt Okta integration
- a rebuilt Google Workspace integration
- a rebuilt CrowdStrike, MongoDB, or Tenable live pipeline

## Files

- `lambda_function.py`
- `deploy-cloudsec-test-harness.ps1`
- `invoke-cloudsec-test-harness.ps1`
- `upsert-datadog-test-harness-monitors.ps1`

## Deploy

```powershell
powershell -ExecutionPolicy Bypass -File ".\deploy-cloudsec-test-harness.ps1"
```

## Create or update the Datadog monitors

```powershell
powershell -ExecutionPolicy Bypass -File ".\upsert-datadog-test-harness-monitors.ps1"
```

## Invoke example scenarios

```powershell
powershell -ExecutionPolicy Bypass -File ".\invoke-cloudsec-test-harness.ps1" -Scenario identity_account_takeover -Limit 6
```

```powershell
powershell -ExecutionPolicy Bypass -File ".\invoke-cloudsec-test-harness.ps1" -Scenario endpoint_to_mongodb_pivot -Limit 8
```

## Demo framing

Use this as a test harness for detection validation:

`I built a clearly labeled detection rule test harness that injects synthetic events shaped like the lab's non-AWS sources, so I can validate rule logic and demonstrate the detection patterns without relying on private vendor tenants.`
