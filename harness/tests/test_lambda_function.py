import csv
import importlib
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]
HARNESS_ROOT = REPO_ROOT / "harness"
if str(HARNESS_ROOT) not in sys.path:
    sys.path.insert(0, str(HARNESS_ROOT))

lambda_function = importlib.import_module("lambda_function")


CANONICAL_SCENARIOS = {
    "identity_account_takeover",
    "aws_iam_key_misuse",
    "eks_secret_access_chain",
    "endpoint_to_mongodb_pivot",
    "s3_data_access_exfiltration",
}


def _write_csv(path, fieldnames, rows):
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def _write_fixture_dataset(base_dir):
    shared_fields = [
        "timestamp",
        "source",
        "user_or_service",
        "asset",
        "severity",
        "kill_chain_stage",
        "scenario",
        "status",
        "platform",
        "environment",
        "telemetry_type",
    ]
    rows_by_file = {
        "alerts.csv": [
            {
                "timestamp": "2026-04-08T08:14:00Z",
                "source": "Okta",
                "user_or_service": "admin.user",
                "asset": "workspace-admin-console",
                "severity": "HIGH",
                "kill_chain_stage": "Initial Access",
                "scenario": "identity_account_takeover",
                "status": "Under Investigation",
                "platform": "Okta",
                "environment": "prod",
                "telemetry_type": "identity_authentication",
            },
            {
                "timestamp": "2026-04-09T10:34:00Z",
                "source": "AWS CloudTrail",
                "user_or_service": "svc-report-export",
                "asset": "sensitive-reporting-bucket",
                "severity": "HIGH",
                "kill_chain_stage": "Exfiltration",
                "scenario": "s3_data_access_exfiltration",
                "status": "New",
                "platform": "AWS",
                "environment": "prod",
                "telemetry_type": "object_storage_access",
            },
        ],
        "identity_events.csv": [
            {
                "timestamp": "2026-04-08T08:09:00Z",
                "source": "Okta",
                "user_or_service": "admin.user",
                "asset": "workspace-admin-console",
                "severity": "HIGH",
                "kill_chain_stage": "Initial Access",
                "scenario": "identity_account_takeover",
                "status": "Under Investigation",
                "platform": "Okta",
                "environment": "prod",
                "telemetry_type": "identity_authentication",
            }
        ],
        "cloud_activity.csv": [
            {
                "timestamp": "2026-04-08T12:39:00Z",
                "source": "AWS CloudTrail",
                "user_or_service": "aws-ci-user",
                "asset": "lab-aws-account",
                "severity": "HIGH",
                "kill_chain_stage": "Privilege Escalation",
                "scenario": "aws_iam_key_misuse",
                "status": "New",
                "platform": "AWS",
                "environment": "prod",
                "telemetry_type": "cloud_control_plane",
            },
            {
                "timestamp": "2026-04-08T15:05:00Z",
                "source": "AWS CloudTrail",
                "user_or_service": "app-runtime-sa",
                "asset": "critical-service-db-secret",
                "severity": "CRITICAL",
                "kill_chain_stage": "Credential Access",
                "scenario": "eks_secret_access_chain",
                "status": "Escalated",
                "platform": "AWS",
                "environment": "prod",
                "telemetry_type": "secrets_access",
            },
            {
                "timestamp": "2026-04-09T10:31:00Z",
                "source": "AWS CloudTrail",
                "user_or_service": "svc-report-export",
                "asset": "sensitive-reporting-bucket",
                "severity": "HIGH",
                "kill_chain_stage": "Exfiltration",
                "scenario": "s3_data_access_exfiltration",
                "status": "New",
                "platform": "AWS",
                "environment": "prod",
                "telemetry_type": "object_storage_access",
            },
        ],
        "endpoint_activity.csv": [
            {
                "timestamp": "2026-04-09T02:05:00Z",
                "source": "CrowdStrike",
                "user_or_service": "analyst.user",
                "asset": "workstation-lab-22",
                "severity": "CRITICAL",
                "kill_chain_stage": "Lateral Movement",
                "scenario": "endpoint_to_mongodb_pivot",
                "status": "Escalated",
                "platform": "CrowdStrike",
                "environment": "prod",
                "telemetry_type": "endpoint_detection",
            }
        ],
        "incident_timeline.csv": [
            {
                "timestamp": "2026-04-08T15:06:00Z",
                "source": "AWS CloudTrail",
                "user_or_service": "app-runtime-sa",
                "asset": "critical-service-kms-key",
                "severity": "CRITICAL",
                "kill_chain_stage": "Credential Access",
                "scenario": "eks_secret_access_chain",
                "status": "Escalated",
                "platform": "AWS",
                "environment": "prod",
                "telemetry_type": "kms_access",
            }
        ],
        "asset_inventory.csv": [
            {
                "source": "Tenable Cloud",
                "asset": "records-mongo-lab",
                "severity": "CRITICAL",
                "scenario": "endpoint_to_mongodb_pivot",
                "status": "At Risk",
                "platform": "MongoDB",
                "environment": "prod",
                "telemetry_type": "asset_context",
            }
        ],
    }
    for filename, rows in rows_by_file.items():
        fieldnames = [field for field in shared_fields if field in rows[0]]
        _write_csv(base_dir / filename, fieldnames, rows)


def test_dry_run_all_includes_all_canonical_scenarios(tmp_path, monkeypatch):
    _write_fixture_dataset(tmp_path)
    monkeypatch.setattr(lambda_function, "BASE_DIR", tmp_path)

    result = lambda_function.lambda_handler(
        {"scenario": "all", "limit": 0, "dry_run": True, "replay_id": "test-replay"},
        None,
    )

    assert result["status"] == "dry-run"
    assert set(result["scenario_counts"]) == CANONICAL_SCENARIOS
    assert result["selected_events"] == sum(result["scenario_counts"].values())


def test_each_canonical_scenario_filters_to_its_own_events(tmp_path, monkeypatch):
    _write_fixture_dataset(tmp_path)
    monkeypatch.setattr(lambda_function, "BASE_DIR", tmp_path)

    for scenario in CANONICAL_SCENARIOS:
        result = lambda_function.lambda_handler(
            {"scenario": scenario, "limit": 0, "dry_run": True},
            None,
        )

        assert set(result["scenario_counts"]) == {scenario}
        assert result["selected_events"] == result["scenario_counts"][scenario]


def test_limit_caps_selected_rows(tmp_path, monkeypatch):
    _write_fixture_dataset(tmp_path)
    monkeypatch.setattr(lambda_function, "BASE_DIR", tmp_path)

    result = lambda_function.lambda_handler(
        {"scenario": "all", "limit": 2, "dry_run": True},
        None,
    )

    assert result["selected_events"] == 2


def test_unknown_scenario_returns_no_events_without_posting(tmp_path, monkeypatch):
    _write_fixture_dataset(tmp_path)
    monkeypatch.setattr(lambda_function, "BASE_DIR", tmp_path)

    result = lambda_function.lambda_handler(
        {"scenario": "unknown_scenario", "dry_run": True},
        None,
    )

    assert result == {
        "status": "dry-run",
        "replay_id": result["replay_id"],
        "selected_events": 0,
        "scenario_counts": {},
    }


def test_event_payload_includes_required_tags_and_fields(tmp_path, monkeypatch):
    _write_fixture_dataset(tmp_path)
    monkeypatch.setattr(lambda_function, "BASE_DIR", tmp_path)
    row = next(
        item
        for item in lambda_function._read_csv_rows()
        if item["scenario"] == "aws_iam_key_misuse"
    )

    event = lambda_function._build_event(row, "unit-replay")
    tags = set(event["ddtags"].split(","))

    assert event["ddsource"] == "test-harness"
    assert event["service"] == lambda_function.SERVICE_NAME
    assert event["hostname"] == lambda_function.HOSTNAME
    assert event["synthetic"] == "true"
    assert event["purpose"] == "detection-rule-validation"
    assert event["replay_id"] == "unit-replay"
    assert event["scenario"] == "aws_iam_key_misuse"
    assert event["is_canonical_scenario"] is True
    assert event["simulates"] == "cloudtrail-iam-key-misuse-chain"
    assert event["dataset_file"] == "cloud_activity.csv"
    assert "source:test-harness" in tags
    assert "synthetic:true" in tags
    assert "scenario:aws_iam_key_misuse" in tags
    assert "canonical_scenario:true" in tags
    assert "simulated_source:AWS_CloudTrail" in tags
    assert "dataset:cloud_activity.csv" in tags
    assert "replay_id:unit-replay" in tags


def test_scenario_metadata_marks_exactly_five_canonical_scenarios():
    canonical = {
        scenario
        for scenario, metadata in lambda_function.SCENARIO_METADATA.items()
        if metadata["is_canonical_scenario"]
    }

    assert canonical == CANONICAL_SCENARIOS
    assert lambda_function.SCENARIO_METADATA["asset_context_enrichment"][
        "is_canonical_scenario"
    ] is False


def test_header_only_csv_produces_zero_events(tmp_path, monkeypatch):
    _write_csv(
        tmp_path / "cloud_activity.csv",
        ["timestamp", "source", "scenario", "status"],
        [],
    )
    monkeypatch.setattr(lambda_function, "BASE_DIR", tmp_path)

    result = lambda_function.lambda_handler(
        {"scenario": "all", "limit": 0, "dry_run": True},
        None,
    )

    assert result["selected_events"] == 0
    assert result["scenario_counts"] == {}


def test_missing_scenario_column_uses_dataset_fallback(tmp_path, monkeypatch):
    _write_csv(
        tmp_path / "identity_events.csv",
        ["timestamp", "source", "event_type", "status"],
        [
            {
                "timestamp": "2026-04-08T08:09:00Z",
                "source": "Okta",
                "event_type": "user.authentication.sso",
                "status": "Under Investigation",
            }
        ],
    )
    monkeypatch.setattr(lambda_function, "BASE_DIR", tmp_path)

    result = lambda_function.lambda_handler(
        {"scenario": "identity_account_takeover", "dry_run": True},
        None,
    )

    assert result["selected_events"] == 1
    assert result["scenario_counts"] == {"identity_account_takeover": 1}


def test_generated_replay_ids_are_unique_between_invocations(tmp_path, monkeypatch):
    _write_fixture_dataset(tmp_path)
    monkeypatch.setattr(lambda_function, "BASE_DIR", tmp_path)

    first = lambda_function.lambda_handler({"scenario": "all", "dry_run": True}, None)
    second = lambda_function.lambda_handler({"scenario": "all", "dry_run": True}, None)

    assert first["replay_id"] != second["replay_id"]


def test_posted_path_posts_selected_events_without_network(tmp_path, monkeypatch):
    _write_fixture_dataset(tmp_path)
    posted = {}
    monkeypatch.setattr(lambda_function, "BASE_DIR", tmp_path)
    monkeypatch.setattr(lambda_function, "_load_secret", lambda secret_name: "api-key")

    def fake_post(api_key, events):
        posted["api_key"] = api_key
        posted["events"] = events
        return [202]

    monkeypatch.setattr(lambda_function, "_post_to_datadog", fake_post)

    result = lambda_function.lambda_handler(
        {"scenario": "s3_data_access_exfiltration", "limit": 1, "replay_id": "post-test"},
        None,
    )

    assert result["status"] == "posted"
    assert result["datadog_statuses"] == [202]
    assert result["selected_events"] == 1
    assert result["scenarios_present"] == ["s3_data_access_exfiltration"]
    assert posted["api_key"] == "api-key"
    assert len(posted["events"]) == 1
    assert posted["events"][0]["scenario"] == "s3_data_access_exfiltration"


def test_no_events_status_skips_secret_loading_and_posting(tmp_path, monkeypatch):
    _write_fixture_dataset(tmp_path)
    monkeypatch.setattr(lambda_function, "BASE_DIR", tmp_path)

    def fail_secret(_secret_name):
        raise AssertionError("secret loading should be skipped")

    def fail_post(_api_key, _events):
        raise AssertionError("posting should be skipped")

    monkeypatch.setattr(lambda_function, "_load_secret", fail_secret)
    monkeypatch.setattr(lambda_function, "_post_to_datadog", fail_post)

    result = lambda_function.lambda_handler({"scenario": "not_real"}, None)

    assert result["status"] == "no-events"
    assert result["selected_events"] == 0
    assert result["datadog_statuses"] == []
    assert result["scenarios_present"] == []
