# Dashboard Handoff

## Primary Review Surface

- Primary app: `CloudSec SOC Detection Lab`
- Default local URL: `http://127.0.0.1:4174/`
- Primary structure:
  - `System Scope`
  - `Environment Status`
  - `Evidence Catalog`
  - `Detection Engineering`
  - `Validation Closeout`

## Supporting Build Notes

- The website dashboard is the primary review surface.
- The dashboard is intentionally public-safe and does not rely on environment-specific screenshots.
- Evidence visuals are generated from repo-owned templates and stored in `dashboard/assets/evidence/`.
- The harness path is synthetic validation, not a vendor-native integration rebuild.
- Context surfaces and support panels are useful for the story, but they are not overclaimed as production feeds.

## Execution Cautions

- Do not overclaim endpoint, exposure, identity, workspace, or database context as live Datadog integrations.
- Keep `source:test-harness` and `synthetic:true` visible when discussing replay validation.
- Do not show or describe private company names, tenant identifiers, credentials, secret values, private user data, or production screenshots.

## Delivery Package Cross-Check

- Dataset package: present in `data/`
- Flowcharts: present in `docs/architecture-and-flowcharts.md`
- Build workflow: present in `docs/build-workflow.md`
- Query appendix: present in `docs/queries/cli-query-examples.md`
- Supporting evidence templates: present in `evidence-templates/`
- Generated dashboard evidence assets: present in `dashboard/assets/evidence/`
- Deck: present in `docs/deck/cloudsec-soc-detection-lab.pptx`

## Final Handoff Review

- Review date: `2026-04-29`
- Result: `Passed`
- Basis:
  - The dashboard, flowcharts, evidence visuals, harness, query appendix, and deck align to the same public-safe scenario model.
  - No remaining handoff-critical rule depends on private notes.
  - The package can be reviewed in sequence without reopening build order, proof mapping, or page-role decisions.
