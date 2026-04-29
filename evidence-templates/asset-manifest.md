# Supporting Evidence Manifest

This manifest tracks the non-dashboard artifacts required by Phase 2D and whether they have been collected as real curated artifacts.

| Artifact | Page or Scenario | Source | Status | Notes |
|---|---|---|---|---|
| `aws-s3-console-view.png` | Page 2, `s3_data_access_exfiltration` | AWS | Collected | Real AWS console screenshot captured from the current browser session |
| `datadog-cloud-siem-view.png` | Page 2 | Datadog | Collected | Real Datadog Cloud SIEM screenshot captured from the current browser session |
| `datadog-open-signals-view.png` | Page 3, `aws_iam_key_misuse`, `s3_data_access_exfiltration` | Datadog | Collected | Real Datadog signals view showing AWS-focused detections in the current browser session |
| `okta-sign-in-view.png` | Page 2, `identity_account_takeover` | Okta | Collected | Real Okta admin dashboard screenshot captured from the authenticated tenant, showing org changes and security monitoring context |
| `okta-system-log-view.png` | Page 3, `identity_account_takeover` | Okta System Log | Collected | Real Okta System Log screenshot captured from the authenticated tenant, showing policy and org-change events with timestamps and actors |
| `google-admin-audit-view.png` | Page 3, `identity_account_takeover` | Google Workspace | Collected | Real Google Workspace Admin reporting screenshot refreshed from the authenticated admin console |
| `aws-cloudtrail-key-misuse-view.png` | Page 3, `aws_iam_key_misuse` | AWS CloudTrail | Collected | Real CloudTrail event history screenshot captured from the current AWS session |
| `eks-audit-token-activity-view.png` | Page 3, `eks_secret_access_chain` | Curated EKS evidence view | Retained | Original curated chain panel kept as supporting narrative backup |
| `eks-cluster-active-live-view.png` | Page 3, `eks_secret_access_chain` | AWS EKS | Collected | Real live EKS cluster overview from the authenticated AWS account showing the cluster in Active state |
| `eks-compute-live-view.png` | Page 3, `eks_secret_access_chain` | AWS EKS | Collected | Real EKS compute screenshot showing live nodes provisioned by Auto Mode |
| `eks-resources-live-view.png` | Page 3, `eks_secret_access_chain` | AWS EKS | Collected | Real EKS resources screenshot showing running pods including the `soc-demo` workload |
| `secretsmanager-access-view.png` | Page 3, `eks_secret_access_chain` | AWS Secrets Manager | Collected | Real Secrets Manager screenshot shows live secret objects in the current AWS account |
| `crowdstrike-process-tree-view.png` | Page 3, `endpoint_to_mongodb_pivot` | Curated CrowdStrike evidence view | Collected | Rendered locally from the curated endpoint activity chain as a process-tree style proof artifact |
| `mongodb-auth-log-view.png` | Page 5, `endpoint_to_mongodb_pivot` | MongoDB | Limited | Real MongoDB Atlas activity feed screenshot from the current tenant, useful as platform context but not direct incident-proof telemetry |
| `tenable-criticality-view.png` | Page 1 or Page 2 | Curated Tenable evidence view | Collected | Rendered locally from the curated asset inventory to show criticality and exposure context |
| `architecture-coverage-map.png` | Page 1 | Curated visual | Collected | Rendered locally from the package coverage design and platform-role mapping |
| `analyst-checklist.png` | Page 4 | Curated visual | Collected | Rendered locally from the first-five-minutes workflow requirements |
| `escalation-packet-outline.png` | Page 4 | Curated visual | Collected | Rendered locally as the concise escalation packet structure |
| `incident-timeline-annotated.png` | Page 5 | Curated visual | Collected | Rendered locally from the stitched endpoint-to-MongoDB incident timeline |

## Page-to-Asset Coverage
- Page 1: covered by `architecture-coverage-map.png` and `tenable-criticality-view.png`
- Page 2: covered by AWS, Datadog, and Okta evidence
- Page 3: covered by Google Workspace, CloudTrail, EKS chain evidence, Secrets Manager, and CrowdStrike chain evidence
- Page 4: covered by `analyst-checklist.png` and `escalation-packet-outline.png`
- Page 5: covered by `mongodb-auth-log-view.png` and `incident-timeline-annotated.png`

## Scenario Proof Status
- `identity_account_takeover`: query proof ready in appendix; Okta admin dashboard context, Okta System Log evidence, and Google Workspace evidence are collected from the live admin tenants
- `aws_iam_key_misuse`: query proof ready in appendix; Datadog and CloudTrail event artifacts are collected
- `eks_secret_access_chain`: query proof ready in appendix; live EKS cluster overview, compute, and workload evidence are collected along with live Secrets Manager evidence
- `endpoint_to_mongodb_pivot`: query proof ready in appendix; curated CrowdStrike chain evidence and live MongoDB evidence are collected
- `s3_data_access_exfiltration`: Datadog detection view, AWS S3 console view, and AWS CloudTrail event history are collected

## Collection Notes
- Live console captures are preserved where the authenticated environment exposed real evidence during implementation.
- Curated rendered evidence views are still used for CrowdStrike and Tenable because the current live accounts did not expose the required incident activity cleanly enough to capture rehearsal-ready proof panels.
- EKS now has real live console evidence from an active cluster created in the authenticated AWS account during implementation.
- MongoDB currently provides live tenant context rather than direct incident-proof telemetry.
- The curated rendered evidence is anchored to the approved scenario datasets and is part of the core handoff package rather than a temporary placeholder layer.
