import csv
import json
import os
import urllib.request
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path


DD_SITE = os.environ.get("DD_SITE", "us5.datadoghq.com")
DD_API_SECRET_NAME = os.environ.get(
    "DD_API_SECRET_NAME", "EXAMPLE_DATADOG_SECRET_NAME"
)
SERVICE_NAME = "cloudsec-detection-test-harness"
HOSTNAME = "cloudsec-test-harness"
BASE_DIR = Path(__file__).resolve().parent
BATCH_SIZE = 50

SCENARIO_METADATA = {
    "identity_account_takeover": {
        "simulation": "okta-gws-identity-chain",
        "is_canonical_scenario": True,
    },
    "aws_iam_key_misuse": {
        "simulation": "cloudtrail-iam-key-misuse-chain",
        "is_canonical_scenario": True,
    },
    "eks_secret_access_chain": {
        "simulation": "eks-workload-secret-access-chain",
        "is_canonical_scenario": True,
    },
    "endpoint_to_mongodb_pivot": {
        "simulation": "crowdstrike-mongodb-pivot",
        "is_canonical_scenario": True,
    },
    "s3_data_access_exfiltration": {
        "simulation": "cloudtrail-s3-sensitive-access-chain",
        "is_canonical_scenario": True,
    },
    "asset_context_enrichment": {
        "simulation": "tenable-asset-context",
        "is_canonical_scenario": False,
    },
}

DATASET_MAP = [
    ("alerts.csv", None),
    ("identity_events.csv", "identity_account_takeover"),
    ("cloud_activity.csv", None),
    ("endpoint_activity.csv", "endpoint_to_mongodb_pivot"),
    ("incident_timeline.csv", None),
    ("asset_inventory.csv", "asset_context_enrichment"),
]


def _load_secret(secret_name):
    import boto3

    client = boto3.client("secretsmanager")
    response = client.get_secret_value(SecretId=secret_name)
    secret_string = response.get("SecretString", "")
    try:
        parsed = json.loads(secret_string)
        if isinstance(parsed, dict):
            for key in ("api_key", "DD_API_KEY", "key", "value"):
                if key in parsed and parsed[key]:
                    return parsed[key]
    except json.JSONDecodeError:
        pass
    return secret_string.strip()


def _read_csv_rows():
    rows = []
    for filename, fallback_scenario in DATASET_MAP:
        file_path = BASE_DIR / filename
        if not file_path.exists():
            continue
        with file_path.open("r", encoding="utf-8-sig", newline="") as handle:
            reader = csv.DictReader(handle)
            for row in reader:
                scenario = row.get("scenario") or fallback_scenario or "unclassified"
                normalized = {
                    "dataset_file": filename,
                    "scenario": scenario,
                    "original_source": row.get("source", "Unknown"),
                    "row": row,
                }
                rows.append(normalized)
    return rows


def _build_message(item):
    row = item["row"]
    if row.get("event_summary"):
        summary = row["event_summary"]
    elif row.get("event_type"):
        summary = row["event_type"]
    elif row.get("detection_name"):
        summary = row["detection_name"]
    elif row.get("asset_type"):
        summary = f"Asset context: {row.get('asset_type', 'unknown')}"
    else:
        summary = "Synthetic detection validation event"
    return (
        f"Synthetic test harness event for scenario {item['scenario']} "
        f"simulating {item['original_source']}: {summary}"
    )


def _get_scenario_metadata(scenario):
    return SCENARIO_METADATA.get(
        scenario,
        {
            "simulation": "generic-detection-validation",
            "is_canonical_scenario": False,
        },
    )


def _build_event(item, replay_id):
    row = item["row"]
    scenario = item["scenario"]
    original_source = item["original_source"]
    scenario_metadata = _get_scenario_metadata(scenario)
    simulation_name = scenario_metadata["simulation"]
    is_canonical_scenario = scenario_metadata["is_canonical_scenario"]
    event_time = datetime.now(timezone.utc).isoformat()
    tags = [
        "source:test-harness",
        "synthetic:true",
        "purpose:detection-rule-validation",
        f"scenario:{scenario}",
        f"canonical_scenario:{str(is_canonical_scenario).lower()}",
        f"simulates:{simulation_name}",
        f"simulated_source:{str(original_source).replace(' ', '_')}",
        f"dataset:{item['dataset_file']}",
        f"replay_id:{replay_id}",
    ]
    payload = {
        "message": _build_message(item),
        "ddsource": "test-harness",
        "service": SERVICE_NAME,
        "hostname": HOSTNAME,
        "ddtags": ",".join(tags),
        "synthetic": "true",
        "purpose": "detection-rule-validation",
        "replay_id": replay_id,
        "scenario": scenario,
        "is_canonical_scenario": is_canonical_scenario,
        "simulates": simulation_name,
        "simulated_source": original_source,
        "dataset_file": item["dataset_file"],
        "event_time": event_time,
        "original_timestamp": row.get("timestamp"),
        "severity": row.get("severity"),
        "status": row.get("status"),
        "platform": row.get("platform"),
        "environment": row.get("environment"),
        "telemetry_type": row.get("telemetry_type"),
        "row": row,
    }
    return payload


def _chunk(items, size):
    for index in range(0, len(items), size):
        yield items[index : index + size]


def _post_to_datadog(api_key, events):
    endpoint = f"https://http-intake.logs.{DD_SITE}/api/v2/logs"
    headers = {
        "Content-Type": "application/json",
        "DD-API-KEY": api_key,
    }
    statuses = []
    for batch in _chunk(events, BATCH_SIZE):
        request = urllib.request.Request(
            endpoint,
            data=json.dumps(batch).encode("utf-8"),
            headers=headers,
            method="POST",
        )
        with urllib.request.urlopen(request, timeout=30) as response:
            statuses.append(response.status)
    return statuses


def _select_rows(all_rows, scenario, limit):
    if scenario in (None, "", "all"):
        selected = list(all_rows)
    else:
        selected = [row for row in all_rows if row["scenario"] == scenario]
    if limit:
        selected = selected[:limit]
    return selected


def lambda_handler(event, context):
    event = event or {}
    scenario = event.get("scenario", "all")
    limit = int(event.get("limit", 25))
    dry_run = bool(event.get("dry_run", False))
    replay_id = event.get("replay_id") or datetime.now(timezone.utc).strftime(
        "replay-%Y%m%dT%H%M%S%fZ"
    )

    all_rows = _read_csv_rows()
    selected = _select_rows(all_rows, scenario, limit)
    events = [_build_event(item, replay_id) for item in selected]

    summary = defaultdict(int)
    for item in selected:
        summary[item["scenario"]] += 1

    if dry_run:
        return {
            "status": "dry-run",
            "replay_id": replay_id,
            "selected_events": len(events),
            "scenario_counts": dict(summary),
        }

    if not events:
        return {
            "status": "no-events",
            "replay_id": replay_id,
            "selected_events": 0,
            "scenario_counts": {},
            "datadog_statuses": [],
            "scenarios_present": [],
        }

    api_key = _load_secret(DD_API_SECRET_NAME)
    statuses = _post_to_datadog(api_key, events)
    return {
        "status": "posted",
        "replay_id": replay_id,
        "selected_events": len(events),
        "scenario_counts": dict(summary),
        "datadog_statuses": statuses,
        "scenarios_present": sorted({item["scenario"] for item in selected}),
    }
