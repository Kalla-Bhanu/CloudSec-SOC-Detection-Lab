# Completion Notes

## Scope

This repository is a solo-built synthetic SOC detection engineering lab covering five canonical scenarios across cloud, identity, runtime, endpoint, and data-access surfaces. It is public-safe and fixture-tested: the datasets, evidence visuals, harness events, and dashboard content are synthetic or sanitized for review without private tenants or production screenshots.

The package shows the detection-engineering flow I wanted to preserve: scenario design, signal generation, monitor validation patterns, triage pivots, evidence handling, and analyst handoff. It does not claim production SOC coverage or live coverage across every vendor shown in the public-safe context panels.

## Components

- Dashboard: `dashboard/` contains the static review surface, local runner, evidence catalog, detection scenario views, and demo readiness view.
- Synthetic data: `data/` contains CSV fixtures shaped around alert, identity, cloud, endpoint, asset, and timeline records.
- Evidence assets: `evidence-templates/` contains public-safe source templates and proof maps; generated dashboard visuals live under `dashboard/assets/evidence/`.
- Harness: `harness/` contains the Lambda-style replay harness, invocation helpers, monitor reference script, and contract tests.
- Documentation: `docs/` contains architecture flowcharts, demo walkthrough, query examples, reproducibility notes, and presentation materials.
- CI: `.github/workflows/quality.yml` runs the maintained quality-gate workflow for syntax checks, harness tests, public-safe checks, and dashboard smoke tests.

## Validation Surface

The supported validation path is local and fixture-based. Execution details are documented in `docs/reproducibility.md`.

The maintained checks cover:

- harness behavior through pytest contract tests
- dashboard navigation and evidence loading through Playwright smoke tests
- Python, PowerShell, and JavaScript syntax
- public-safe repository hygiene through `tools/verify-public-safe.ps1`
- cloud execution of the same quality gates through GitHub Actions

External AWS and Datadog deployment scripts are included as reference material for users with their own lab accounts. They require credentials and environment choices outside this repository, so external deployment is not part of the CI validation surface.

## Scope Choices

- Synthetic fixtures are deliberate: they keep the package reproducible without private tenant access.
- Public-safe evidence panels are deliberate: they preserve proof structure without exposing environment-specific screenshots.
- `source:test-harness` and `synthetic:true` are deliberate: they keep replay validation separate from vendor-native telemetry.
- Local fixture-based CI is deliberate: it validates the public package without requiring live cloud or SaaS credentials.

## Evidence Preservation

Temporary paid lab services can be retired after final evidence capture and validation. The completed review surface remains in the public repository, dashboard, generated evidence assets, synthetic datasets, harness tests, walkthrough docs, and CI checks. The detailed boundary is documented in `docs/evidence-preservation-and-retirement.md`.

## License

This repository is distributed under the terms in `LICENSE`.
