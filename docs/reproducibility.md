# Reproducibility

This document defines the supported public reproduction path for the CloudSec SOC Detection Lab. It is the path a reviewer can use to clone the repo, install dependencies, run the local validation suite, and open the dashboard without private tenants or credentials.

For ongoing upkeep after future edits, use `docs/maintenance-checklist.md`.

## Supported Local Surface

The public repo supports fixture-based validation of:

- the static dashboard in `dashboard/`
- synthetic data modeled on security log shapes in `data/`
- the Lambda replay harness contract through local tests
- dashboard navigation and evidence smoke checks through Playwright
- public-safe repository hygiene through `tools/verify-public-safe.ps1`

The supported correctness surface is local and fixture-based by design. It proves that the public package is internally consistent, testable, sanitized, and runnable without access to a private AWS, Datadog, identity, endpoint, database, or exposure-management tenant.

## Tested Tool Versions

Continuous integration runs with:

- Python `3.12`
- Node.js `20`

Newer versions may work, but they are not the versions validated by this repository's CI. PowerShell commands are written for PowerShell Core style execution and are run in CI through `pwsh`.

## Install

From a fresh clone:

```powershell
python -m pip install -r requirements-dev.txt
npm ci
npx playwright install chromium
```

## Run The Local Checks

Run the harness contract tests:

```powershell
python -B -m pytest --assert=plain -p no:cacheprovider
```

Run the dashboard smoke tests:

```powershell
npm run test:dashboard
```

Verify the public-safe evidence templates and committed evidence assets:

```powershell
npm run verify:evidence-assets
```

The default evidence verifier avoids renderer-specific PNG byte hashes so it stays stable across local Windows and CI Linux runners. Use `node tools/generate-public-evidence-assets.mjs --check --render-png` only for same-renderer local byte checks.

Run workflow syntax validation:

```powershell
npx --yes @tktco/node-actionlint
```

Run the public-safe verifier:

```powershell
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File .\tools\verify-public-safe.ps1
```

Verify the security disclosure files:

```powershell
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File .\tools\verify-security-txt.ps1
```

Run the public live-dashboard smoke check:

```powershell
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File .\tools\verify-live-dashboard.ps1
```

Expected result: the test runners should complete without failures. The evidence verifier prints `PASS evidence asset verification completed`. The public-safe verifier prints `PASS public-safe checks completed.` followed by the current tracked-file counts. The security verifier prints `PASS security.txt files are aligned and unexpired.` The exact counts can change as files are added or removed; treat any non-PASS verifier output as a failure.

## Run The Dashboard Locally

```powershell
cd .\dashboard
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File .\run-dashboard.ps1 -Port 4174
```

Then open the local URL printed by the script:

```text
http://127.0.0.1:4174/
```

The Playwright suite uses a separate test port by default so the smoke tests do not collide with the common local demo port.

## What Is Not Reproduced Locally

The local reproduction path does not validate a live AWS account, Datadog organization, identity provider, workspace tenant, endpoint platform, MongoDB tenant, or exposure-management tenant. It also does not include production telemetry, production screenshots, private user data, tenant identifiers, real credentials, or secret values.

This is intentional. The public package shows the detection-engineering flow with sanitized fixtures and repo-owned evidence assets, not production coverage.

## External Deployment Context

The harness directory includes reference deployment scripts for users with their own AWS and Datadog accounts. Those scripts are not required for portfolio review, and external deployment is not validated by this repository's continuous integration because it requires live AWS and Datadog credentials supplied outside the repo.

Local fixture-based validation is the supported correctness surface. If you adapt the external scripts, review the IAM policy first, keep credentials outside the repository, use a disposable lab account where possible, and expect to adjust names, regions, secret locations, and Datadog site settings for your environment.
