# CloudSec SOC Detection Lab

[![License: All Rights Reserved](https://img.shields.io/badge/license-All%20Rights%20Reserved-red)](LICENSE)
[![Live: Vercel](https://img.shields.io/badge/live-Vercel-black)](https://cloudsec-soc-detection-lab.vercel.app/dashboard/)
[![Live: GitHub Pages](https://img.shields.io/badge/live-GitHub%20Pages-blue)](https://kalla-bhanu.github.io/CloudSec-SOC-Detection-Lab/)

## Quick Links

- [Live dashboard (Vercel)](https://cloudsec-soc-detection-lab.vercel.app/dashboard/)
- [Live dashboard (GitHub Pages)](https://kalla-bhanu.github.io/CloudSec-SOC-Detection-Lab/)
- [Demo walkthrough](docs/demo-walkthrough.md)
- [Reproducibility](docs/reproducibility.md)
- [Detection scenarios](#detection-scenarios)
- [License](LICENSE)

An AWS-first SOC detection engineering lab that shows how to design, validate, explain, and present five common security monitoring scenarios across cloud, identity, runtime, endpoint, and data-access surfaces.

This is the public-safe portfolio version. It uses synthetic datasets, sanitized evidence visuals, lab-safe harness code, and public documentation only. It does not include private company names, tenant identifiers, private user data, real credentials, secret values, private prep notes, or production screenshots.

## What This Project Shows

- A dashboard-first SOC readout for analyst and leadership review.
- Five detection scenarios mapped to triage, query pivots, proof anchors, and response decisions.
- Public-safe evidence visuals that replace environment-specific screenshots.
- A Lambda-based synthetic event replay harness.
- Datadog log and monitor validation patterns using `source:test-harness` and `synthetic:true`.
- AWS investigation context around CloudTrail, IAM, STS, S3, Secrets Manager, EKS, and KMS.
- Flowcharts, evidence templates, a demo runbook, and a presentation deck.

## Detection Scenarios

1. Identity account takeover pattern.
2. AWS credential misuse and privilege escalation.
3. EKS workload identity and secret-access chain.
4. Endpoint-to-MongoDB pivot investigation.
5. S3 data access and possible exfiltration.

## Repository Structure

```text
dashboard/            Static dashboard UI, evidence visuals, and local runner
data/                 Synthetic CSV datasets used by the lab
docs/                 Flowcharts, walkthroughs, query examples, and deck
harness/              Lambda and Datadog synthetic replay tooling
evidence-templates/   Public-safe source templates for evidence panels
tools/                Utility scripts for generated public-safe assets
```

## Key Artifacts

- Live dashboard (GitHub Pages): `https://kalla-bhanu.github.io/CloudSec-SOC-Detection-Lab/`
- Live dashboard (Vercel): `https://cloudsec-soc-detection-lab.vercel.app/dashboard/`
- Dashboard: `dashboard/index.html`
- Flowcharts: `docs/architecture-and-flowcharts.md`
- Demo walkthrough: `docs/demo-walkthrough.md`
- Reproducibility: `docs/reproducibility.md`
- CLI/query examples: `docs/queries/cli-query-examples.md`
- Evidence manifest: `evidence-templates/asset-manifest.md`
- Presentation deck: `docs/deck/cloudsec-soc-detection-lab.pptx`

## Run The Dashboard Locally

The dashboard is hosted publicly at:

```text
https://kalla-bhanu.github.io/CloudSec-SOC-Detection-Lab/
https://cloudsec-soc-detection-lab.vercel.app/dashboard/
```

GitHub Pages publishes the `dashboard/` folder through `.github/workflows/pages.yml`. Vercel serves the same dashboard with `vercel.json` redirecting the root URL to `/dashboard/`.

To run the same dashboard locally:

```powershell
cd .\dashboard
powershell -ExecutionPolicy Bypass -File .\run-dashboard.ps1
```

Then open the local URL printed by the script.

## Reproduce The Public Package

The supported validation path is documented in `docs/reproducibility.md`. The core local checks are:

```powershell
python -B -m pytest --assert=plain -p no:cacheprovider
npm run test:dashboard
```

That guide also covers dependency installation, workflow linting, the public-safe verifier, the local dashboard command, and the boundary between fixture-based validation and external AWS or Datadog deployment.

## Harness Concept

The harness replays controlled security events into a monitoring system. In this public version, names, account IDs, resource names, and secret paths are placeholders.

```text
synthetic scenario event
-> Lambda replay harness
-> Datadog logs scoped to source:test-harness
-> scoped monitor or alert condition
-> analyst triage and response workflow
```

The intent is not to claim production coverage. The intent is to show the detection-engineering flow: scenario design, signal generation, monitor validation, evidence handling, triage, escalation, and presentation.

## Privacy And Safety

This repository is intentionally sanitized:

- No real company name.
- No real private user, employee, or tenant data.
- No production credentials.
- No private prep notes.
- No production screenshots.
- No secret values.
- No binary exports from private preparation material.

All datasets, visuals, examples, and deck content are synthetic or rewritten for portfolio use.
