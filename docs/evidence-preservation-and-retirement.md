# Evidence Preservation And Service Retirement

This document defines what remains valid after temporary paid lab services are stopped. The goal is to preserve the completed project as a public-safe portfolio artifact without requiring live AWS, Datadog, identity, workspace, database, endpoint, or exposure-management services to stay running indefinitely.

## Preserved Proof Surface

The durable proof for this lab lives in the repository and public dashboard:

- `README.md` explains the scope, scenarios, links, and supported validation path.
- `dashboard/` provides the static dashboard used for the walkthrough.
- `dashboard/assets/evidence/` stores the generated public-safe evidence visuals.
- `evidence-templates/public-safe/` stores the source templates for those visuals.
- `evidence-templates/asset-manifest.md` maps every evidence asset to a scenario or page.
- `evidence-templates/scenario-proof-map.md` maps each scenario to its proof anchors.
- `data/` stores synthetic datasets shaped around alert, identity, cloud, endpoint, asset, and timeline records.
- `harness/` stores the Lambda-style replay harness, Datadog validation pattern, and contract tests.
- `docs/reproducibility.md` defines the local and CI validation path.
- `docs/demo-walkthrough.md` defines how to present the project without relying on unstable live tabs.
- `docs/build-workflow.md` records the build sequence and the honest live/context boundary.
- `docs/completion-notes.md` records the final project scope and validation model.

These artifacts are designed to outlive the temporary lab services. They can be cloned, reviewed, tested, and presented without access to private service accounts or credentials.

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
- Documentation and walkthrough materials.

The repository intentionally does not preserve raw private screenshots, tenant identifiers, private user data, account identifiers, credentials, tokens, secret values, or exact private resource names. Instead, it preserves the investigation structure, scenario logic, proof mapping, and repeatable validation path in a public-safe form.

## What The Preserved Evidence Proves

The preserved package supports these claims:

- The lab was completed as an evidence-led SOC detection engineering project.
- The five scenarios were modeled with trigger, proof, query, triage, and response paths.
- AWS and Datadog were used as the primary live technical path during build and validation.
- Contextual surfaces such as identity, workspace, database, endpoint, and exposure views support the scenario story without being overclaimed as always-on integrations.
- The final public version is reproducible without paid service access because it uses synthetic data, sanitized evidence visuals, and automated checks.

The preserved package does not claim:

- ongoing live access to retired services.
- production SOC coverage.
- live streaming telemetry from every vendor shown in context panels.
- access to private tenants, private users, or private resource identifiers.

## Recommended Reviewer Wording

Use this phrasing when explaining why the live services are no longer running:

```text
I completed the lab end to end using temporary live cloud, monitoring, identity, workspace, and database services. After completion, I intentionally retired the paid service resources and preserved a public-safe, reproducible version in GitHub. The repository contains the dashboard, evidence map, synthetic datasets, harness, tests, CI checks, walkthrough, and generated proof visuals, so the project can still be reviewed without requiring those paid services to remain active.
```

If asked whether the project can still be reviewed:

```text
Yes. The live vendor services were temporary, but the project evidence is preserved. I can walk through the dashboard, detection scenarios, harness design, proof mapping, validation checks, and the recorded demo without needing to keep paid tenants online.
```

## Before Stopping Paid Services

Complete this checklist before retiring live lab resources:

- Confirm the public repo is pushed and the worktree is clean.
- Confirm the Vercel and GitHub Pages dashboards load.
- Confirm the demo recording is accessible from its separate share location.
- Run the checks in `docs/reproducibility.md`.
- Confirm `npm run verify:evidence-assets` passes.
- Confirm `tools/verify-public-safe.ps1` passes.
- Confirm no future repo evidence depends on a live-only tab or private tenant view.
- Keep any private administrative records outside this public repository.

## After Stopping Paid Services

After the temporary services are stopped:

- Do not describe retired services as currently running.
- Do not present contextual panels as live vendor-native integrations.
- Keep the public explanation focused on completed build, preserved evidence, reproducible review, and responsible cost control.
- Re-run the public checks if any repository files change.
