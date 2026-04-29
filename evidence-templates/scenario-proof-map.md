# Scenario Proof Map

This map makes the Phase 2D proof requirements explicit so the package can be validated mechanically rather than inferred during handoff.

| Scenario | Event or Log Proof | Rule or Query Proof | Annotation Source |
|---|---|---|---|
| `identity_account_takeover` | `okta-sign-in-view.png`, `google-admin-audit-view.png` | `Identity correlation` query example | `scenario-annotations.md` |
| `aws_iam_key_misuse` | `aws-cloudtrail-key-misuse-view.png`, `datadog-open-signals-view.png` | `AWS IAM misuse` CLI example | `scenario-annotations.md` |
| `eks_secret_access_chain` | `eks-audit-token-activity-view.png`, `secretsmanager-access-view.png` | `EKS secret access` CLI example | `scenario-annotations.md` |
| `endpoint_to_mongodb_pivot` | `crowdstrike-process-tree-view.png`, `mongodb-auth-log-view.png` | `Endpoint to database pivot` query example | `scenario-annotations.md` |
| `s3_data_access_exfiltration` | `aws-s3-console-view.png`, `datadog-open-signals-view.png` | `AWS IAM misuse` CLI example used for S3 access investigation flow | `scenario-annotations.md` |

## Notes
- The package intentionally uses one or two strong artifacts per scenario instead of many redundant screenshots.
- The EKS and CrowdStrike artifacts are curated evidence views rendered from the approved scenario datasets because the current live accounts do not expose the necessary activity to capture directly.
- This file is mirrored by `implementation-package/tools/phase-2d-config.json` for automated validation.
