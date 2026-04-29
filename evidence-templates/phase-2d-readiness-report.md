# Evidence Readiness Report

Generated: 2026-04-29

Overall result: PASS

| Area | Item | Result | Detail |
|---|---|---|---|
| Assets | `dashboard/assets/evidence/architecture-coverage-map.png` | PASS | Found |
| Assets | `dashboard/assets/evidence/analyst-checklist.png` | PASS | Found |
| Assets | `dashboard/assets/evidence/escalation-packet-outline.png` | PASS | Found |
| Assets | `dashboard/assets/evidence/incident-timeline-annotated.png` | PASS | Found |
| Assets | `dashboard/assets/evidence/okta-system-log-view.png` | PASS | Found |
| Assets | `dashboard/assets/evidence/google-admin-audit-view.png` | PASS | Found |
| Assets | `dashboard/assets/evidence/aws-cloudtrail-key-misuse-view.png` | PASS | Found |
| Assets | `dashboard/assets/evidence/aws-s3-console-view.png` | PASS | Found |
| Assets | `dashboard/assets/evidence/datadog-open-signals-view.png` | PASS | Found |
| Assets | `dashboard/assets/evidence/datadog-cloud-siem-view.png` | PASS | Found |
| Assets | `dashboard/assets/evidence/datadog-test-harness-view.png` | PASS | Found |
| Assets | `dashboard/assets/evidence/eks-cluster-active-live-view.png` | PASS | Found |
| Assets | `dashboard/assets/evidence/eks-compute-live-view.png` | PASS | Found |
| Assets | `dashboard/assets/evidence/eks-resources-live-view.png` | PASS | Found |
| Assets | `dashboard/assets/evidence/secretsmanager-access-view.png` | PASS | Found |
| Assets | `dashboard/assets/evidence/mongodb-auth-log-view.png` | PASS | Found |
| Assets | `dashboard/assets/evidence/crowdstrike-process-tree-view.png` | PASS | Found |
| Assets | `dashboard/assets/evidence/tenable-criticality-view.png` | PASS | Found |
| Scenario proof | identity_account_takeover | PASS | Evidence visual and query proof mapped |
| Scenario proof | aws_iam_key_misuse | PASS | Evidence visual and CLI proof mapped |
| Scenario proof | eks_secret_access_chain | PASS | Evidence visual and CLI proof mapped |
| Scenario proof | endpoint_to_mongodb_pivot | PASS | Evidence visual and query proof mapped |
| Scenario proof | s3_data_access_exfiltration | PASS | Evidence visual and CLI proof mapped |
| Manifest hygiene | Public-safe status | PASS | No asset depends on private screenshots |

## Summary

- Required evidence assets checked: 18.
- Scenario proof chains checked: 5.
- Public-safe source templates checked: present under `evidence-templates/public-safe/`.
- Dashboard asset path checked: present under `dashboard/assets/evidence/`.
