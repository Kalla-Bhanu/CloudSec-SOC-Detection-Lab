# Public Evidence Manifest

This manifest tracks the public-safe visual evidence package used by the dashboard and deck. Every visual is synthetic or sanitized and generated from repo-owned templates under `evidence-templates/public-safe/`.

## Asset Inventory

| Asset | Scenario Or Page | Role | Status |
|---|---|---|---|
| `architecture-coverage-map.png` | System Scope | Architecture coverage map | Generated |
| `analyst-checklist.png` | Triage Workflow | First-five-minutes checklist | Generated |
| `escalation-packet-outline.png` | Triage Workflow | Escalation packet structure | Generated |
| `incident-timeline-annotated.png` | Demo Readiness | Timeline closeout visual | Generated |
| `okta-system-log-view.png` | Identity Account Takeover | Identity system-log model | Generated |
| `google-admin-audit-view.png` | Identity Account Takeover | Workspace admin audit model | Generated |
| `aws-cloudtrail-key-misuse-view.png` | AWS Credential Misuse | CloudTrail key-misuse model | Generated |
| `aws-s3-console-view.png` | S3 Data Access Exfiltration | S3 object access model | Generated |
| `datadog-open-signals-view.png` | Cloud and Data Scenarios | Signal review model | Generated |
| `datadog-cloud-siem-view.png` | Telemetry Coverage | Source coverage model | Generated |
| `datadog-test-harness-view.png` | Detection Test Harness | Synthetic replay validation | Generated |
| `eks-cluster-active-live-view.png` | EKS Secret Access Chain | Cluster overview model | Generated |
| `eks-compute-live-view.png` | EKS Secret Access Chain | Compute plane model | Generated |
| `eks-resources-live-view.png` | EKS Secret Access Chain | Workload model | Generated |
| `secretsmanager-access-view.png` | EKS Secret Access Chain | Secret-access context | Generated |
| `mongodb-auth-log-view.png` | Endpoint To MongoDB Pivot | Database activity model | Generated |
| `crowdstrike-process-tree-view.png` | Endpoint To MongoDB Pivot | Endpoint process-tree model | Generated |
| `tenable-criticality-view.png` | Exposure Context | Asset criticality model | Generated |

## Dashboard Path

The dashboard uses the generated PNGs from:

```text
dashboard/assets/evidence/
```

The source HTML templates are kept in:

```text
evidence-templates/public-safe/
```

To regenerate the full evidence image set:

```powershell
node .\tools\generate-public-evidence-assets.mjs
```

## Scenario Proof Coverage

| Scenario | Primary Evidence | Supporting Evidence |
|---|---|---|
| Identity account takeover | `okta-system-log-view.png`, `google-admin-audit-view.png` | `datadog-test-harness-view.png` |
| AWS credential misuse | `aws-cloudtrail-key-misuse-view.png`, `datadog-open-signals-view.png` | `datadog-cloud-siem-view.png` |
| EKS secret access chain | `eks-cluster-active-live-view.png`, `eks-compute-live-view.png`, `eks-resources-live-view.png`, `secretsmanager-access-view.png` | `datadog-cloud-siem-view.png` |
| Endpoint to MongoDB pivot | `crowdstrike-process-tree-view.png`, `mongodb-auth-log-view.png` | `datadog-test-harness-view.png` |
| S3 data access exfiltration | `aws-s3-console-view.png`, `datadog-open-signals-view.png` | `aws-cloudtrail-key-misuse-view.png` |

## Sanitization Rules

- Use placeholder actors, account IDs, resource names, hostnames, database names, and secret paths.
- Do not include real screenshots from private tenants.
- Do not include private user data, employee data, credentials, tokens, API keys, or secret values.
- Label replay events as `source:test-harness` and `synthetic:true`.
- Keep context and support surfaces separate from live integration claims.
