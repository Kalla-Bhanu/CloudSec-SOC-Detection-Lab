# Dashboard Handoff

## Primary Demo Surface
- Primary app: `SOC Detection Lab Dashboard`
- Primary URL: `http://127.0.0.1:4174/`
- Primary structure:
  - `System Scope`
  - `Environment Status`
  - `Evidence Catalog`
  - `Detection Engineering`
  - `Demo Readiness`

## Supporting Build Notes
- The website-style dashboard is the primary demo surface.
- The older Looker Studio report remains secondary and should not be treated as the main demo artifact.
- EKS live proof was captured from a real cluster during implementation, then the runtime was removed for cost control.
- The dashboard evidence model is intentionally mixed:
  - validated console evidence for Okta, Google Workspace, AWS, Datadog, and the previously active EKS path
  - live context for MongoDB
  - supporting panels for CrowdStrike and Tenable

## Execution Cautions
- Start the local app before the demo if the site is not already running.
- Use audience-facing browser view, not editor surfaces, during the demo.
- Do not overclaim CrowdStrike or Tenable as live tenant evidence.
- If a browser-auth step is blocked, resume in the same Chrome DevTools MCP browser profile after login.
- Relaunch EKS only when needed and delete it again afterward.

## Delivery Package Cross-Check
- Dataset package: present in `data/`
- Page blueprint: present in `docs/dashboard-blueprint.md`
- Live walkthrough: present in `docs/demo-walkthrough.md`
- Query appendix: present in `docs/queries/cli-query-examples.md`
- Supporting evidence templates: present in `evidence-templates/`

## Final Handoff Review
- Review date: `2026-04-11`
- Result: `Passed`
- Basis:
  - `2A` through `2E` readiness gates are complete in the implementation document.
  - Phase 2D and Phase 2E automated readiness validation passes.
  - A primary website-style dashboard and walkthrough now exist for the live demo flow.
  - The package can be executed in sequence without reopening build order, proof mapping, or page-role decisions.
