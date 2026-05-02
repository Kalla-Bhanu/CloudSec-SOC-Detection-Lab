# CloudSec SOC Detection Lab Deck Plan

Audience: security engineering, SOC, and cloud security readers who need to inspect the lab without private organization or company details.

Objective: document the completed public-safe SOC detection lab as a coherent working model: scope, architecture, data, detection scenarios, evidence, harness validation, triage workflow, dashboard, and validation closeout.

Narrative arc:

1. Establish that this is a sanitized public lab, not a production-coverage claim.
2. Show the architecture and evidence model.
3. Walk the five scenarios through trigger, correlation, proof, and response.
4. Explain the Lambda/Datadog-style replay harness boundary.
5. Close with dashboard/deck alignment and validation closeout.

Slide list:

1. Title and public-safe positioning.
2. Lab architecture and telemetry flow.
3. Scenario coverage matrix.
4. Data and evidence model.
5. Detection engineering pattern.
6. AWS credential misuse and S3 access examples.
7. EKS secret-access chain.
8. Endpoint-to-MongoDB pivot.
9. Harness and dashboard validation sequence.
10. Readiness closeout and project summary.

Source plan:

- `README.md`
- `docs/architecture-and-flowcharts.md`
- `docs/build-workflow.md`
- `docs/queries/cli-query-examples.md`
- `evidence-templates/asset-manifest.md`
- `dashboard/dashboard-data.js`
- `dashboard/assets/evidence/*.png`
- `data/*.csv`

Visual system:

- Light SOC-console palette with blue, teal, amber, and red status accents.
- Low-radius cards and compact operational layouts.
- Editable text, metric cards, tables, charts, and diagrams.
- Sanitized generated evidence PNGs used as contextual visual plates.

Editability plan:

- Titles, subtitles, labels, callouts, tables, and diagrams remain editable PowerPoint objects.
- Data charts use native chart objects where possible.
- Evidence visuals are raster support assets only, with important labels repeated as editable text when needed.
- Slide text should stay self-contained and limited to public-safe technical context.
