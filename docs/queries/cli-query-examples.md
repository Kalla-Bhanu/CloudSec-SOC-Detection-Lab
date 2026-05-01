# CLI and Query Appendix

## AWS IAM misuse

```bash
aws cloudtrail lookup-events --lookup-attributes AttributeKey=AccessKeyId,AttributeValue=EXAMPLE_ACCESS_KEY_ID --max-results 10
```

Interpretation: Use this to confirm whether the same key moved from normal automation into unusual IAM discovery and privilege-change actions.

## Identity correlation

```text
source IN ("identity-provider","workspace-admin") AND user_or_service="admin.user" AND timestamp BETWEEN "2026-04-08T08:00:00Z" AND "2026-04-08T08:30:00Z"
```

Interpretation: This tight correlation window shows whether the suspicious login and privileged SaaS action belong to the same investigation chain.

## Endpoint to database pivot

```text
hostname="workstation-lab-22" AND (process_name="mongosh.exe" OR network_destination CONTAINS "mongo-lab")
```

Interpretation: This isolates the host activity that bridges endpoint compromise into database access.

## EKS secret access

```bash
aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=GetSecretValue --max-results 10
```

Interpretation: This is the fastest lab check for whether suspicious workload identity activity reached protected secrets.
