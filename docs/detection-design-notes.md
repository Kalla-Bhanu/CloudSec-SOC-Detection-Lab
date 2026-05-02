# Detection Design Notes

These notes document the engineering reasoning behind the five CloudSec SOC
scenarios. They are lab-modeled design notes, not production deployment claims.
The goal is to make the detection choices, boundaries, and production extension
paths visible without adding private tenant data.

## Shared Design Guardrails

- Treat `source:test-harness` and `synthetic:true` as validation labels, not as
  tenant telemetry claims.
- Escalate only when a signal reaches material activity: privilege, secrets,
  protected data, critical runtime identity, or sensitive object access.
- Keep context panels narrow where the public repo does not claim full
  vendor-native feed parity.
- Prefer underclaiming coverage when the lab evidence proves only one slice of a
  broader technique.

## Identity Account Takeover

Detection idea:

- Correlate risky identity behavior with privileged workspace action inside a
  tight time window.
- Treat MFA pressure or novel sign-in context as the first signal, not as a
  complete incident by itself.

Telemetry and fields:

- Actor or service identity: `admin.user`.
- Source context: geo, device, session, and MFA challenge behavior.
- Follow-on action: privileged workspace-admin activity within the same window.

False-positive controls:

- Suppress approved admin maintenance windows and known helpdesk workflows.
- Require a privileged action after the identity signal before treating it as
  high confidence.
- Keep identity-provider and workspace-admin sources as context surfaces unless
  an active native connector is explicitly available.

Production extension:

- Add device trust, impossible-travel history, MFA factor type, and session
  revocation state.
- Compare the actor against baseline admin hours and known break-glass accounts.

Boundary:

- The lab proves identity-to-admin correlation. It does not claim password
  brute-force coverage, full identity-provider connector parity, or complete
  SaaS audit coverage.

## AWS Credential Misuse

Detection idea:

- Separate benign cloud inventory reads from credential misuse by requiring
  first-seen access context plus IAM, secret, KMS, or policy-impacting activity.

Telemetry and fields:

- CloudTrail-style API event name, source IP, access key, principal ARN, role,
  account placeholder, and resource path.
- Datadog-style signal review scoped to synthetic validation events.

False-positive controls:

- Suppress known inventory automation and approved deployment windows.
- Treat enumeration alone as lower severity unless it is followed by privilege
  or secret impact.
- Require resource sensitivity or blast-radius change before escalation.

Production extension:

- Add identity age, access-key age, source ASN, role assumption chain, session
  tags, and change-management context.
- Compare the event path against normal automation principals and expected
  deployment regions.

Boundary:

- The lab proves cloud control-plane misuse reasoning. It does not claim full
  cloud posture management, GuardDuty parity, or complete IAM graph analysis.

## EKS Secret Access Chain

Detection idea:

- Treat runtime activity as a cloud incident only when workload identity reaches
  STS, Secrets Manager, KMS, or another protected cloud path.

Telemetry and fields:

- Namespace, workload, service account, pod, role, STS action, secret path, and
  KMS-style access context.
- EKS and Secrets Manager visuals use placeholders for account, namespace, and
  secret values.

False-positive controls:

- Suppress expected deployment jobs and service accounts with documented secret
  access.
- Require workload identity plus protected resource access before escalation.
- Keep secret names abstract and never expose secret values.

Production extension:

- Add Kubernetes audit logs, admission-controller context, image provenance,
  namespace ownership, and service-account RBAC diffing.
- Compare secret access against deployment history and expected application
  dependency maps.

Boundary:

- The lab proves workload-identity-to-secret reasoning. It does not claim pod
  escape coverage, runtime exploit detection, or full Kubernetes API audit
  coverage.

## Endpoint To MongoDB Pivot

Detection idea:

- Escalate endpoint evidence when suspicious process lineage connects to
  database authentication or collection access.

Telemetry and fields:

- Hostname, process name, parent process, destination, database user, database
  name, collection context, and time window.
- Endpoint and MongoDB panels are supporting/context surfaces in the public
  package.

False-positive controls:

- Suppress approved administrator or developer database-client activity.
- Require the endpoint signal and database context to line up by host, actor,
  and time.
- Treat database authentication alone as incomplete without process or access
  context.

Production extension:

- Add EDR command-line telemetry, network flow, database audit logs, collection
  sensitivity labels, and export/file-write evidence.
- Compare database access against expected application paths and approved
  administrative workstations.

Boundary:

- The lab proves the pivot reasoning between host activity and database risk.
  It does not claim malware family attribution, full EDR coverage, or confirmed
  data export.

## S3 Data Access Exfiltration

Detection idea:

- Escalate object access when source novelty, sensitive prefix, volume, and
  principal context align.

Telemetry and fields:

- Bucket, object prefix, `ListBucket`, `GetObject`, source IP, principal,
  region, and CloudTrail-style event time.
- Datadog-style signal review shows how the access path becomes an analyst
  decision point.

False-positive controls:

- Suppress approved backup, reporting, and analytics roles.
- Require sensitive object access or unusual access volume before treating a
  read as data risk.
- Keep bucket and object names as placeholders in public evidence.

Production extension:

- Add S3 data-event volume baselines, object sensitivity labels, session tags,
  VPC endpoint context, and bucket-policy history.
- Compare access to approved data pipelines and normal principal-prefix pairs.

Boundary:

- The lab proves cloud-storage access reasoning. It does not claim confirmed
  external transfer, full DLP coverage, or complete cross-account sharing
  detection.

