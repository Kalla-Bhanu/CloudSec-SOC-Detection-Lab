# Dashboard Page Blueprint

This blueprint mirrors the approved Phase 2C page design so the live Looker Studio build can follow a fixed page model without reinterpretation.

## Page Order
1. Overview
2. Telemetry Coverage
3. Detection Use Cases
4. Triage and Response Workflow
5. Analyst Drilldown and Incident Timeline

## Shared Filter Posture
- Preserve `scenario`, `severity`, `status`, `time range`, `source`, `user_or_service`, and `asset` whenever a drilldown depends on them.
- Use page-scoped visible filters without discarding shared arriving context.
- Preserve `incident_id` first, then `alert_id`, when landing on the deep investigation page.

## Transition Rules
- Overview to Telemetry Coverage: carry `platform`
- Overview to Detection Use Cases: carry `scenario`
- Telemetry Coverage to Detection Use Cases: carry `source`; auto-select a scenario only if exactly one scenario matches
- Detection Use Cases to Analyst Drilldown and Incident Timeline: carry `scenario`, `source`, and `incident_id` or `alert_id`
- Triage and Response Workflow to Analyst Drilldown and Incident Timeline: carry `scenario`, `source`, and active incident context

## Page Roles
- Overview: queue posture and prioritization only
- Telemetry Coverage: visibility trust and blind spots only
- Detection Use Cases: scenario proof and detection correlation
- Triage and Response Workflow: analyst judgment and escalation logic
- Analyst Drilldown and Incident Timeline: deepest stitched investigation path

## Exit Standard
- Each page must keep its own proof responsibility.
- Page 3 and Page 5 remain the two depth anchors.
- A page is only implementation-complete when its build completion check from the main specification is satisfied.
