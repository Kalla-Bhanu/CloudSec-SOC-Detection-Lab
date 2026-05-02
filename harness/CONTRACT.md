# Detection Test Harness Contract

This contract defines the public-safe behavior of `lambda_function.py`. Tests validate this contract rather than a specific implementation detail.

## Purpose

The harness replays controlled synthetic records into Datadog as clearly labeled validation events. It is not a production integration and does not replay private tenant data, secret values, or production screenshots.

## Supported Input

The Lambda handler accepts a JSON object with these fields:

| Field | Type | Default | Behavior |
| --- | --- | --- | --- |
| `scenario` | string | `all` | `all` selects every available row. A canonical scenario selects rows with that scenario. Unknown scenarios select zero rows. |
| `limit` | integer or numeric string | `25` | Positive values cap selected rows. `0` means no cap. Invalid, blank, or negative values fall back to `25`. |
| `dry_run` | boolean or string | `false` | `true`, `1`, `yes`, `y`, and `on` enable dry-run mode. `false`, `0`, `no`, `n`, `off`, and blank strings disable it. Invalid values fall back to `false` and emit a warning log. When enabled, the harness returns counts and does not load secrets or post to Datadog. |
| `replay_id` | string | generated | Groups all events from one invocation. If omitted, the harness generates a UTC microsecond timestamp ID. |

Strings are stripped and lowercased before boolean coercion. Invalid `limit` and `dry_run` values do not crash the invocation; they fall back to defaults and emit warning logs.

## Canonical Scenarios

Exactly five scenarios are canonical:

- `identity_account_takeover`
- `aws_iam_key_misuse`
- `eks_secret_access_chain`
- `endpoint_to_mongodb_pivot`
- `s3_data_access_exfiltration`

`asset_context_enrichment` is support context, not a canonical detection scenario.

## Dataset Contract

The harness reads these CSV files from the package directory when present:

- `alerts.csv`
- `identity_events.csv`
- `cloud_activity.csv`
- `endpoint_activity.csv`
- `incident_timeline.csv`
- `asset_inventory.csv`

Missing files are skipped. Header-only files produce zero events. Rows without a `scenario` value use the dataset fallback when one exists; otherwise they are marked `unclassified`.

## Event Payload Contract

Every posted or built event includes:

| Field | Type | Contract |
| --- | --- | --- |
| `message` | string | Human-readable synthetic validation summary. |
| `ddsource` | string | Always `test-harness`. |
| `service` | string | Always `cloudsec-detection-test-harness`. |
| `hostname` | string | Always `cloudsec-test-harness`. |
| `ddtags` | string | Comma-delimited Datadog tag string listed below. |
| `synthetic` | string | Always `true`. |
| `purpose` | string | Always `detection-rule-validation`. |
| `replay_id` | string | Invocation grouping ID, generated or caller-provided. |
| `scenario` | string | Canonical scenario, support-context scenario, or fallback scenario name. |
| `is_canonical_scenario` | boolean | `true` only for the five canonical scenarios. |
| `simulates` | string | Scenario simulation name from `SCENARIO_METADATA`. |
| `simulated_source` | string | Original source value from the CSV row. |
| `dataset_file` | string | Source CSV filename. |
| `event_time` | string | UTC ISO timestamp for the built replay event. |
| `original_timestamp` | string or null | Source-row timestamp when present. |
| `severity` | string or null | Source-row severity when present. |
| `status` | string or null | Source-row status when present. |
| `platform` | string or null | Source-row platform when present. |
| `environment` | string or null | Source-row environment when present. |
| `telemetry_type` | string or null | Source-row telemetry type when present. |
| `row` | object | Original CSV row content preserved for analyst context. |

`ddtags` always includes:

- `source:test-harness`
- `synthetic:true`
- `purpose:detection-rule-validation`
- `scenario:<scenario>`
- `canonical_scenario:true|false`
- `simulates:<simulation-name>`
- `simulated_source:<source-with-underscores>`
- `dataset:<dataset-file>`
- `replay_id:<replay-id>`

## Replay And Idempotency

An explicit `replay_id` is stable across all selected events in one invocation. Reusing the same `replay_id` intentionally makes a replay group repeatable. If `replay_id` is omitted, each invocation generates a new UTC timestamp ID.

Rows are not mutated. Replaying the same selected rows creates a new event batch with the same source row content and a new `event_time`.

## Output Contract

Dry-run responses contain:

- `status: dry-run`
- `replay_id`
- `selected_events`
- `scenario_counts`

Posted responses contain:

- `status: posted`
- `replay_id`
- `selected_events`
- `scenario_counts`
- `datadog_statuses`
- `scenarios_present`

If a non-dry-run invocation selects zero events, the harness returns `status: no-events` and does not load secrets or call Datadog.

## Public-Safe Boundaries

The harness must keep synthetic validation visibly separated from vendor-native telemetry. It must not include real account IDs, real access keys, secret values, personal data, private company data, or production screenshots.

The Datadog API key is loaded lazily inside `_load_secret` so local tests can import the module without `boto3` or AWS credentials.
