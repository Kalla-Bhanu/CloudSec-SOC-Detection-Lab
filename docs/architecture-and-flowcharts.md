# Architecture And Flowcharts

This document is the public-safe visual map for the CloudSec SOC Detection Lab. It keeps the working detection model intact while removing private company names, tenant details, account identifiers, screenshots, credentials, and secret values.

## End-To-End Detection Flow

```mermaid
flowchart LR
  A[Scenario dataset] --> B[Lambda replay harness]
  B --> C[Datadog-style log intake]
  C --> D[Scoped monitor logic]
  D --> E[Signal review]
  E --> F[Analyst triage]
  F --> G[Escalation packet]
  G --> H[Contain, rotate, or validate]

  C -. source:test-harness .-> I[Synthetic validation label]
  F -. evidence map .-> J[Dashboard evidence catalog]
```

## Public-Safe Lab Architecture

```mermaid
flowchart TB
  subgraph Identity[Identity And Collaboration Context]
    IDP[Identity Provider]
    WORK[Workspace Admin Audit]
  end

  subgraph AWS[AWS Lab Surface]
    CT[CloudTrail Events]
    S3[S3 Object Access]
    EKS[EKS Workload Identity]
    SEC[Secrets Manager]
    LAM[Lambda Test Harness]
  end

  subgraph Detection[Detection And Review]
    DD[Datadog Logs And Monitors]
    DASH[Interactive Dashboard]
    DECK[Review Deck]
  end

  subgraph Support[Supporting Context]
    ENDPOINT[Endpoint Process Tree]
    DB[MongoDB Activity]
    ASSET[Asset Criticality]
  end

  IDP --> DD
  WORK --> DD
  CT --> DD
  S3 --> DD
  EKS --> CT
  EKS --> SEC
  LAM --> DD
  ENDPOINT --> DD
  DB --> DASH
  ASSET --> DASH
  DD --> DASH
  DASH --> DECK
```

## Scenario Correlation Model

```mermaid
flowchart TD
  S1[Identity account takeover] --> S1A[Novel sign-in or MFA pressure]
  S1A --> S1B[Privileged workspace action]
  S1B --> S1C[Session revoke and admin-change review]

  S2[AWS credential misuse] --> S2A[First-seen access path]
  S2A --> S2B[IAM or secret-impacting API activity]
  S2B --> S2C[Disable key, diff policy, rotate touched secrets]

  S3[EKS secret access chain] --> S3A[Unexpected workload identity behavior]
  S3A --> S3B[STS, secret read, or KMS decrypt]
  S3B --> S3C[Contain namespace and rotate secrets]

  S4[Endpoint to MongoDB pivot] --> S4A[Suspicious process lineage]
  S4A --> S4B[Database auth or collection access]
  S4B --> S4C[Contain host and scope data access]

  S5[S3 data access exfiltration] --> S5A[Bucket list and object reads]
  S5A --> S5B[Novel principal, source, or volume]
  S5B --> S5C[Constrain bucket access and scope objects]
```

## Evidence Handling Flow

```mermaid
flowchart LR
  A[Alert or replay event] --> B[Pick scenario]
  B --> C[Open mapped evidence visual]
  C --> D[Run query pivot]
  D --> E[Preserve strongest proof]
  E --> F[Estimate blast radius]
  F --> G[Choose response bias]
  G --> H[Write escalation packet]

  C --> I[Public-safe artifact only]
  I --> J[No private screenshots or tenant identifiers]
```

## Demo Run Order

```mermaid
sequenceDiagram
  participant Presenter
  participant Dashboard
  participant Evidence
  participant Harness
  participant Reviewer

  Presenter->>Dashboard: Open System Scope
  Presenter->>Dashboard: Move to Environment Status
  Presenter->>Evidence: Show mapped artifact group
  Presenter->>Dashboard: Walk Detection Engineering scenarios
  Presenter->>Harness: Explain source:test-harness replay boundary
  Presenter->>Reviewer: Close with runbook, guardrails, and escalation packet
```

## Analyst Decision Gates

| Gate | Question | Public Lab Output |
|---|---|---|
| Entity | Which user, role, host, workload, or service account is in scope? | Scenario row plus evidence visual |
| Novelty | Is the source, device, API path, process, or time window unusual? | Query pivot and timeline context |
| Materiality | Did the activity touch privilege, secrets, protected data, or critical assets? | Asset criticality and proof map |
| Action | Should the analyst contain, validate, rotate, or escalate? | Checklist and escalation packet |
| Closure | Can another analyst continue from the packet? | Timeline, owner, next proof target |

## Sanitization Standard

- Use placeholder actors such as `admin.user`, `app-runtime-sa`, and `analyst.user`.
- Use placeholder cloud account IDs such as `123456789012`.
- Use placeholder resource names such as `critical-service/db`, `records-mongo-lab`, and `sensitive-reporting-bucket`.
- Do not include private company names, tenant screenshots, real credentials, secret values, customer data, or internal prep notes.
- Keep synthetic replay labeled with `source:test-harness` and `synthetic:true`.
