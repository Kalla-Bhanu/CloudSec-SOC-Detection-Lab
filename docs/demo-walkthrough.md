# Live Demo Walkthrough

## Start Here
- Primary URL: `http://127.0.0.1:4174/`
- Start the app if needed:
  - `cd .\dashboard`
  - `powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File .\run-dashboard.ps1 -Port 4174`
- Present from the website dashboard first.
- Use live console tabs only when they strengthen a proof point already established in the dashboard.

## Stage Order
1. `System Scope`
2. `Environment Status`
3. `Evidence Catalog`
4. `Detection Engineering`
5. `Demo Readiness`

## Demo Flow
1. Open `System Scope` and frame the demo as a technical review of implemented work, not a hypothetical architecture.
2. Use the `Executive Snapshot`, `Review Flow`, and `Scenario Coverage Matrix` to show that the lab has been closed end to end.
3. Move to `Environment Status` and establish platform truth fast:
   - validated surfaces
   - context-only surfaces
   - reference support panels
   - archived AWS runtime proof that must be relaunched for demo day
4. Move to `Evidence Catalog` and prove that screenshots, proof surfaces, and scenario mapping were preserved deliberately.
5. Move to `Detection Engineering` and walk the five scenarios in this order:
   - `Identity Account Takeover`
   - `AWS IAM Key Misuse`
   - `EKS Secret Access Chain`
   - `Endpoint to MongoDB Pivot`
   - `S3 Data Access Exfiltration`
6. Finish on `Demo Readiness` and explain the live browser order, AWS relaunch plan, and fallback evidence archive.

## What To Say
- `System Scope`: "I want to start by showing the scope I actually implemented, the proof package I built around it, and how the five scenarios map back to the lab."
- `Environment Status`: "Before I claim anything, I want to be explicit about which surfaces were validated live, which ones are supporting context, and which AWS runtime components were intentionally paused to control cost."
- `Evidence Catalog`: "This is the proof layer behind the story. Each artifact maps to a specific use case, so the walkthrough is evidence-led rather than slide-led."
- `Detection Engineering`: "Each scenario follows the same operator pattern: trigger, correlation, materiality, and response."
- `Demo Readiness`: "This is the operational close. It shows exactly how I would run the live demo, what I would relaunch, and what backup proof is ready if a vendor tab is slow or gated."

## Live Proof Tabs
- Okta System Log
  - reinforce `Identity Account Takeover`
- Google Workspace Admin reporting
  - reinforce privileged follow-on activity in the identity scenario
- AWS CloudTrail and S3
  - reinforce `AWS IAM Key Misuse` and `S3 Data Access Exfiltration`
- Datadog SIEM and Open Signals
  - reinforce AWS misuse correlation and cloud-to-data story
- AWS EKS and Secrets Manager
  - only after relaunch on demo day

## Truth Rules
- Present these as validated surfaces:
  - Okta
  - Google Workspace
  - AWS CloudTrail
  - AWS S3
  - Datadog
  - previously captured EKS and Secrets Manager proof
- Present this as operational context:
  - MongoDB
- Present these as support panels:
  - CrowdStrike
  - Tenable

## Highest-Value Moment
- On `EKS Secret Access Chain`, be explicit that:
  - the proof was captured from a real live EKS cluster and workload
  - the runtime was intentionally removed afterward to avoid AWS charges
  - the relaunch plan exists and can restore the live path before the review

## Backup Proof
- `implementation-package/supporting_evidence_package/okta-system-log-view.png`
- `implementation-package/supporting_evidence_package/google-admin-audit-view.png`
- `implementation-package/supporting_evidence_package/aws-cloudtrail-key-misuse-view.png`
- `implementation-package/supporting_evidence_package/aws-s3-console-view.png`
- `implementation-package/supporting_evidence_package/eks-cluster-active-live-view.png`
- `implementation-package/supporting_evidence_package/eks-compute-live-view.png`
- `implementation-package/supporting_evidence_package/eks-resources-live-view.png`

## After The Review
- If EKS is relaunched, delete it immediately after the review.
- Recreate only the AWS runtime elements needed for the demo.
