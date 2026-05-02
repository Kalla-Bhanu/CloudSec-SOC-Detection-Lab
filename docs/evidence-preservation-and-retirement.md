# Evidence Preservation And Service Retirement

This document defines what remains valid after temporary paid lab services are stopped. The goal is to keep the completed project reviewable as a public-safe lab artifact without requiring live AWS, Datadog, identity, workspace, database, endpoint, or exposure-management services to stay running indefinitely.

## Durable Proof Surface

The durable proof for this lab lives in the repository and public dashboard:

- `README.md` explains the scope, scenarios, links, and supported validation path.
- `dashboard/` provides the static dashboard used for technical review.
- `dashboard/assets/evidence/` stores the generated public-safe evidence visuals.
- `evidence-templates/public-safe/` stores the source templates for those visuals.
- `evidence-templates/asset-manifest.md` maps every evidence asset to a scenario or page.
- `evidence-templates/scenario-proof-map.md` maps each scenario to its proof anchors.
- `data/` stores synthetic datasets shaped around alert, identity, cloud, endpoint, asset, and timeline records.
- `harness/` stores the Lambda-style replay harness, Datadog validation pattern, and contract tests.
- `docs/reproducibility.md` defines the local and CI validation path.
- `docs/build-workflow.md` records the build sequence and the honest live/context boundary.
- `docs/completion-notes.md` records the final project scope and validation model.

These artifacts are designed to outlive the temporary lab services. They can be cloned, reviewed, and tested without access to private service accounts or credentials.

## Retirement Boundary

Temporary paid lab services may be stopped after evidence capture and final validation. Retiring those services does not change:

- Git history.
- Public repository files.
- Generated evidence PNGs.
- Static dashboard behavior.
- Synthetic CSV datasets.
- Harness contract tests.
- Dashboard smoke tests.
- Public-safe checks.
- Documentation and build notes.

The repository intentionally does not keep raw private screenshots, tenant identifiers, private user data, account identifiers, credentials, tokens, secret values, or exact private resource names. Instead, it keeps the investigation structure, scenario logic, proof mapping, and repeatable validation path in a public-safe form.

## What The Durable Evidence Proves

The durable package supports these claims:

- The lab was completed as an evidence-led SOC detection engineering project.
- The five scenarios were modeled with trigger, proof, query, triage, and response paths.
- AWS and Datadog were used as the primary live technical path during build and validation.
- Contextual surfaces such as identity, workspace, database, endpoint, and exposure views support the scenario story without being overclaimed as always-on integrations.
- The final public version is reproducible without paid service access because it uses synthetic data, sanitized evidence visuals, and automated checks.

The durable package does not claim:

- ongoing live access to retired services.
- production SOC coverage.
- live streaming telemetry from every vendor shown in context panels.
- access to private tenants, private users, or private resource identifiers.

## Reviewable After Retirement

The public package remains reviewable because the supported validation path is local and fixture-based:

- Static dashboard behavior is covered by Playwright smoke tests.
- Harness behavior is covered by pytest contract tests.
- Evidence assets are generated from repo-owned templates and checked in place.
- Public-safe scanning checks for private identifiers, credentials, internal names, and attribution phrases.
- Service-retirement status is documented as a boundary, not hidden.

Retired services must not be described as currently active. Contextual panels must not be described as live vendor-native integrations. The durable claim is narrower and stronger: the completed lab, evidence map, synthetic datasets, harness, tests, dashboard, and generated proof visuals remain available without keeping paid tenants online.
