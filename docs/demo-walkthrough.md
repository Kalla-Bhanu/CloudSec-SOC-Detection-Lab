# Demo Walkthrough

## Start Here

- Primary URL: `http://127.0.0.1:4174/`
- Start the app if needed:

```powershell
cd .\dashboard
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File .\run-dashboard.ps1 -Port 4174
```

Present from the dashboard first. Use external console tabs only when they reinforce a proof point already established in the dashboard.

## Stage Order

1. `System Scope`
2. `Environment Status`
3. `Evidence Catalog`
4. `Detection Engineering`
5. `Demo Readiness`

## Demo Flow

1. Open `System Scope` and frame the project as a public-safe technical review of implemented detection engineering work.
2. Use the `Executive Snapshot`, `Review Flow`, and `Scenario Coverage Matrix` to show that the lab is closed end to end.
3. Move to `Environment Status` and establish truth quickly:
   - validated lab surfaces
   - context-only surfaces
   - supporting evidence panels
   - synthetic replay boundary
4. Move to `Evidence Catalog` and prove that each public-safe artifact maps to a scenario.
5. Move to `Detection Engineering` and walk the five scenarios in this order:
   - `Identity Account Takeover`
   - `AWS Credential Misuse`
   - `EKS Secret Access Chain`
   - `Endpoint to MongoDB Pivot`
   - `S3 Data Access Exfiltration`
6. Finish on `Demo Readiness` and explain the run order, harness boundary, backup proof, and sanitization guardrails.

## What To Say

- `System Scope`: "I want to start by showing the scope I implemented, the proof package around it, and how the five scenarios map back to the lab."
- `Environment Status`: "Before I claim anything, I want to separate validated lab surfaces, context surfaces, supporting panels, and the synthetic replay boundary."
- `Evidence Catalog`: "This is the proof layer behind the story. Each artifact maps to a specific use case, so the walkthrough is evidence-led rather than slide-led."
- `Detection Engineering`: "Each scenario follows the same operator pattern: trigger, correlation, materiality, and response."
- `Demo Readiness`: "This is the operational close. It shows exactly how I would run the walkthrough and what backup proof is ready if a live tab is slow or gated."

## Proof Tabs

- Dashboard local view: primary demo surface.
- Evidence Catalog: public-safe proof visuals.
- Datadog-style logs: synthetic replay under `source:test-harness`.
- Datadog-style monitors: validation layer for replayed detections.
- CloudTrail-style event view: AWS investigation mechanics.
- EKS and Secrets Manager visuals: runtime and secret-access scenario context.

## Truth Rules

- Present these as validated lab surfaces:
  - AWS CloudTrail-style events
  - AWS S3-style object access
  - EKS and Secrets Manager scenario visuals
  - Datadog-style logs, signals, and monitors
  - Lambda detection test harness
- Present these as operational context:
  - Identity provider model
  - Workspace admin audit model
  - MongoDB activity model
- Present these as supporting evidence:
  - Endpoint process tree
  - Asset criticality and exposure view

## Highest-Value Moment

On `EKS Secret Access Chain`, make the materiality clear:

```text
Unexpected workload identity behavior
-> STS role use
-> secret read
-> KMS decrypt
-> rotate secret and contain the workload identity
```

The goal is to show why the alert is not just runtime noise. It becomes important when the workload identity reaches protected secret material.

## Backup Proof

All backup proof is stored in:

```text
dashboard/assets/evidence/
```

Recommended backup visuals:

- `okta-system-log-view.png`
- `google-admin-audit-view.png`
- `aws-cloudtrail-key-misuse-view.png`
- `aws-s3-console-view.png`
- `datadog-test-harness-view.png`
- `eks-cluster-active-live-view.png`
- `eks-compute-live-view.png`
- `eks-resources-live-view.png`
- `incident-timeline-annotated.png`

## Do Not Say

- `Everything is fully integrated live.`
- `The synthetic replay is real tenant telemetry.`
- `The dashboard is streaming directly from every vendor.`
- `The support panels prove live endpoint or exposure tenant coverage.`
- `The public deck includes environment-specific screenshots or real credentials.`

## Say Instead

- `The dashboard is the public-safe review surface.`
- `The harness is a controlled synthetic replay path.`
- `source:test-harness and synthetic:true separate validation data from live vendor integrations.`
- `Identity, workspace, endpoint, database, and exposure views are context or supporting panels unless explicitly validated in a live environment.`
- `The public package demonstrates detection-engineering flow, not production coverage.`
