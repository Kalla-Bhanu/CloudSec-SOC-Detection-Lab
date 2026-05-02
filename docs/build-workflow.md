# Build Workflow

This file records how the CloudSec SOC Detection Lab was built and how the major pieces fit together. It is not a speaking guide. The repo should stand on the dashboard, evidence map, harness, data, and verification checks.

## Build Sequence

```text
1. Read the lab brief
   -> 2. Map the five use cases
   -> 3. Build the AWS lab foundation
   -> 4. Create IAM users, roles, and permissions
   -> 5. Prepare the S3 data-access story
   -> 6. Prepare the Secrets Manager story
   -> 7. Use CloudTrail as the AWS audit source
   -> 8. Build the EKS runtime layer
   -> 9. Build the Lambda detection harness
   -> 10. Send harness events to Datadog-style intake
   -> 11. Build monitor validation patterns
   -> 12. Build the dashboard
   -> 13. Generate public-safe evidence assets
   -> 14. Add supporting context surfaces
   -> 15. Close with reproducibility and validation checks
```

## Validated Lab Path

The main technical path is intentionally narrow:

- CloudTrail-style audit events for AWS identity, API, S3, and Secrets Manager activity.
- Lambda-style replay harness for controlled scenario events.
- Datadog-style log and monitor validation scoped with `source:test-harness` and `synthetic:true`.
- EKS and Secrets Manager context for the workload identity scenario.
- Static dashboard, generated evidence assets, and fixture-based tests for public review.

Context surfaces such as identity-provider, workspace-admin, MongoDB, endpoint, and exposure views support the investigation story. They are not presented as active vendor-native Datadog integrations in the public package.

## Scenario Build Notes

### 1. Identity Account Takeover

What was built:

- A synthetic identity and workspace-admin path for MFA pressure, risky sign-in context, and privileged follow-on activity.
- Public-safe evidence visuals for the identity system log and workspace admin audit.
- Query examples that connect the actor, time window, and privileged action.

Why it matters:

- Identity incidents rarely end at the login event. The value is in correlating sign-in risk with privileged action.

Primary artifacts:

- `dashboard/assets/evidence/okta-system-log-view.png`
- `dashboard/assets/evidence/google-admin-audit-view.png`
- `docs/queries/cli-query-examples.md`

### 2. AWS Credential Misuse

What was built:

- A cloud control-plane path around discovery, IAM-impacting behavior, and secret-impacting API activity.
- CloudTrail-style and Datadog-style evidence visuals.
- A detection scenario that separates benign inventory noise from privilege or secret impact.

Why it matters:

- The turning point is the move from enumeration into material access: policy changes, secret reads, KMS activity, or another blast-radius change.

Primary artifacts:

- `dashboard/assets/evidence/aws-cloudtrail-key-misuse-view.png`
- `dashboard/assets/evidence/datadog-open-signals-view.png`
- `data/cloud_activity.csv`

### 3. EKS Secret Access Chain

What was built:

- An EKS workload identity scenario connected to STS, Secrets Manager, and KMS-style evidence.
- Runtime visuals for cluster, compute, workload, and secret-access context.
- A response posture around namespace containment, service-account review, and secret rotation.

Why it matters:

- Runtime behavior becomes a cloud incident when workload identity reaches protected secrets or cloud APIs outside an explainable deployment path.

Primary artifacts:

- `dashboard/assets/evidence/eks-cluster-active-live-view.png`
- `dashboard/assets/evidence/eks-compute-live-view.png`
- `dashboard/assets/evidence/eks-resources-live-view.png`
- `dashboard/assets/evidence/secretsmanager-access-view.png`

### 4. Endpoint To MongoDB Pivot

What was built:

- A synthetic endpoint-to-database path that links process lineage, credential-access risk, MongoDB authentication, and collection activity.
- Supporting endpoint and database visuals.
- Query examples for tying host activity to database context.

Why it matters:

- The useful investigation path is the pivot, not the endpoint alert by itself. The lab keeps the host, process, destination, and data context connected.

Primary artifacts:

- `dashboard/assets/evidence/crowdstrike-process-tree-view.png`
- `dashboard/assets/evidence/mongodb-auth-log-view.png`
- `data/endpoint_activity.csv`

### 5. S3 Data Access Exfiltration

What was built:

- A sensitive bucket access path built from list and object-read behavior.
- CloudTrail-style and Datadog-style evidence visuals.
- A response model around principal validation, object scoping, and access constraint.

Why it matters:

- Object access becomes material when source novelty, object sensitivity, volume, and principal context line up.

Primary artifacts:

- `dashboard/assets/evidence/aws-s3-console-view.png`
- `dashboard/assets/evidence/datadog-open-signals-view.png`
- `data/cloud_activity.csv`

## Harness And Validation

The harness is a controlled replay tool, not a production ingestion pipeline. It exists so the same scenario events can be generated and checked repeatedly without relying on random live activity.

```text
synthetic scenario event
-> Lambda-style replay harness
-> Datadog-style log event with source:test-harness
-> monitor validation pattern
-> dashboard and evidence mapping
```

The supported validation path is local and fixture-based:

```powershell
python -B -m pytest --assert=plain -p no:cacheprovider
npm run verify:evidence-assets
npm run test:dashboard
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File .\tools\verify-public-safe.ps1
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File .\tools\verify-security-txt.ps1
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File .\tools\verify-live-dashboard.ps1
```

## Live, Context, And Supporting Boundaries

| Surface | Public package role | Boundary |
|---|---|---|
| AWS CloudTrail, S3, Secrets Manager, EKS, Lambda | Main lab model | Public evidence uses placeholders and sanitized visuals |
| Datadog-style logs and monitors | Detection validation model | Harness events are labeled `source:test-harness` and `synthetic:true` |
| Identity provider and workspace admin | Context surface | Supports the identity scenario without claiming active feed parity |
| MongoDB | Context surface | Supports the endpoint-to-data pivot without private database data |
| Endpoint and exposure panels | Supporting surface | Used for triage context, not production incident screenshots |

## Completion Criteria

The build is complete when:

- All five scenarios have a trigger, proof anchor, query or CLI pivot, triage posture, and response path.
- Evidence assets are generated from public-safe templates and mapped in the evidence manifest.
- The harness tests, dashboard tests, evidence asset check, and public-safe scan pass.
- Retired paid services are not described as currently active.
- Private company names, tenant identifiers, account identifiers, credentials, secret values, and production screenshots are absent from the public repo.
