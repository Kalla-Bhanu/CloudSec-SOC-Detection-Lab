# Scenario Proof Map

This map makes the public proof requirements explicit so the package can be validated without environment-specific screenshots or private notes.

| Scenario | Event Or Log Proof | Rule Or Query Proof | Response Artifact |
|---|---|---|---|
| `identity_account_takeover` | `okta-system-log-view.png`, `google-admin-audit-view.png` | Identity correlation query example | Analyst checklist |
| `aws_iam_key_misuse` | `aws-cloudtrail-key-misuse-view.png`, `datadog-open-signals-view.png` | AWS credential misuse CLI example | Escalation packet outline |
| `eks_secret_access_chain` | `eks-cluster-active-live-view.png`, `eks-compute-live-view.png`, `eks-resources-live-view.png`, `secretsmanager-access-view.png` | EKS secret access CLI example | Escalation packet outline |
| `endpoint_to_mongodb_pivot` | `crowdstrike-process-tree-view.png`, `mongodb-auth-log-view.png` | Endpoint-to-database pivot query example | Annotated incident timeline |
| `s3_data_access_exfiltration` | `aws-s3-console-view.png`, `datadog-open-signals-view.png` | CloudTrail object-access CLI example | Escalation packet outline |

## Notes

- The package intentionally uses one or two strong artifacts per scenario instead of many redundant screenshots.
- Evidence visuals are generated from public-safe templates and stored under `dashboard/assets/evidence/`.
- Synthetic replay proof must stay labeled with `source:test-harness` and `synthetic:true`.
- Context and support surfaces are not presented as live vendor-native integrations.
