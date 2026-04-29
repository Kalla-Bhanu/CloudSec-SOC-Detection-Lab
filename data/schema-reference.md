# Curated Dataset Schema Reference

This package implements the six normalized datasets defined in Phase 2B of the implementation specification:

- `alerts.csv`
- `identity_events.csv`
- `cloud_activity.csv`
- `endpoint_activity.csv`
- `asset_inventory.csv`
- `incident_timeline.csv`

Canonical `scenario` values used across the package:

- `identity_account_takeover`
- `aws_iam_key_misuse`
- `eks_secret_access_chain`
- `endpoint_to_mongodb_pivot`
- `s3_data_access_exfiltration`

Shared fields expected across event-style datasets:

- `timestamp`
- `source`
- `user_or_service`
- `asset`
- `severity`
- `kill_chain_stage`
- `scenario`
- `status`

Correlation and coverage support fields used by the real dashboard package:

- `incident_id`
- `alert_id`
- `platform`
- `environment`
- `telemetry_type`

Notes:

- `asset_inventory.csv` intentionally omits event-style fields that do not naturally apply and instead carries the subset required for shared filtering and prioritization.
- `incident_timeline.csv` is the stitched investigation layer and uses `sequence_order` as the authoritative within-incident ordering field.
- Page 2 telemetry coverage should be derived from the six datasets through `platform`, `telemetry_type`, `source`, `environment`, and `timestamp`; it should not introduce a seventh normalized dataset.
