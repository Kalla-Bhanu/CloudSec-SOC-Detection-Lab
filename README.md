# CloudSec SOC Detection Lab

An AWS-first SOC detection engineering lab that demonstrates how to design, validate, and explain five common security monitoring scenarios across cloud, identity, endpoint, and data-access surfaces.

This repository is a sanitized portfolio version. It contains synthetic data, lab code, dashboard assets, and public-safe documentation only. It does not include private prep notes, production data, live credentials, customer data, screenshots with tenant details, or company-specific material.

## What This Project Shows

- A dashboard-first SOC readout for analyst and leadership review.
- Five detection scenarios mapped to practical triage and response workflows.
- A Lambda-based synthetic event replay harness.
- Datadog log and monitor validation patterns using `source:test-harness`.
- AWS investigation context around CloudTrail, IAM, STS, S3, Secrets Manager, and EKS.
- Supporting evidence templates for escalation packets, analyst checklists, and investigation notes.

## Detection Scenarios

1. Identity account takeover pattern.
2. AWS credential misuse and privilege escalation.
3. EKS workload identity and secret-access chain.
4. Endpoint-to-database pivot investigation.
5. S3 data access and possible exfiltration.

## Repository Structure

```text
dashboard/            Static dashboard UI and local runner
data/                 Synthetic CSV datasets used by the lab
docs/                 Workflow, dashboard, query, and demo documentation
harness/              Lambda and Datadog synthetic replay tooling
evidence-templates/   Public-safe investigation and escalation templates
```

## Run The Dashboard Locally

```powershell
cd .\dashboard
powershell -ExecutionPolicy Bypass -File .\run-dashboard.ps1
```

Then open the local URL printed by the script.

## Harness Concept

The harness is designed to replay controlled security events into a monitoring system. In this public version, names, account IDs, tenant names, and secrets have been replaced with lab-safe placeholders.

The intent is not to claim production coverage. The intent is to show the detection-engineering flow:

```text
synthetic scenario event
-> Lambda replay harness
-> Datadog logs scoped to source:test-harness
-> monitors / alert conditions
-> analyst triage and response workflow
```

## Privacy And Safety

This repository is intentionally sanitized:

- No real company name.
- No real customer or employee data.
- No production credentials.
- No private prep notes.
- No live tenant screenshots.
- No binary deck exports from the original preparation material.

All datasets and examples are synthetic or rewritten for portfolio use.
