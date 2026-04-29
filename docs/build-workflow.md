# Build Workflow

## 15-Step Flowchart

Use this as a quick walkthrough of how the lab was built.

```text
1. Read the lab brief
   -> 2. Map the five use cases
   -> 3. Build the AWS lab foundation
   -> 4. Create IAM users, roles, and permissions
   -> 5. Prepare the S3 data-access story
   -> 6. Prepare the Secrets Manager story
   -> 7. Use CloudTrail as the AWS audit source
   -> 8. Build the EKS runtime layer
   -> 9. Build the Lambda detection harness
   -> 10. Send harness events to Datadog
   -> 11. Build Datadog monitors
   -> 12. Build the dashboard
   -> 13. Collect screenshots and supporting material
   -> 14. Prepare optional context tools
   -> 15. Prepare the final demo order
```

## 20-Second Summary

`I built this in layers. I started with the five use cases, then created the AWS foundation, then used CloudTrail for AWS activity, Lambda as the controlled test harness, Datadog for log and monitor validation, and EKS for runtime context. Some tools are live, and some are supporting context, but the live path I can defend clearly is Datadog, CloudTrail, Lambda, and EKS.`

## What Is Live

Live or directly validated during the demo:

- Datadog Logs Explorer with `source:test-harness`
- Datadog monitors
- Datadog dashboard
- AWS CloudTrail
- AWS Lambda detection test harness
- AWS EKS cluster `cloudsec-demo`

Only if asked:

- Secrets Manager, without showing secret values
- S3 bucket context
- IAM context
- Okta dashboard/context
- Google Workspace context
- MongoDB Atlas context

Saved screenshots or supporting material:

- CrowdStrike
- Tenable

Do not say Okta, Google Workspace, MongoDB, CrowdStrike, or Tenable are live Datadog integrations.

## Simple Step-By-Step Workflow

### Step 1: Read The Lab Brief

What I did:

- I first understood what the lab was actually asking me to prove.
- I did not start by opening tools randomly.

What to say:

`I started with the requirement first. Before building anything, I made sure I understood what incidents and evidence the reviewer would expect to see.`

### Step 2: Map The Five Use Cases

What I did:

- I turned the lab into five use cases:
  1. Identity takeover through Okta-style activity.
  2. AWS credential misuse and privilege escalation.
  3. EKS workload identity and secret access.
  4. Endpoint to MongoDB pivot.
  5. S3 data access and possible exfiltration.

Why it mattered:

- These five use cases gave me the build order.

What to say:

`The five use cases became my blueprint. Every AWS service, Datadog monitor, and supporting tool was connected back to one of these scenarios.`

### Step 3: Build The AWS Lab Foundation

What I did:

- I used AWS as the main live technical environment.
- AWS gave me IAM, S3, Secrets Manager, CloudTrail, Lambda, and EKS in one place.

Why it mattered:

- AWS lets me show real service pages and explain the technical path clearly.

What to say:

`AWS became the live technical foundation because it gives me identity, data, runtime, secrets, and audit history in one environment.`

### Step 4: Create IAM Users, Roles, And Permissions

What I did:

- I prepared the IAM layer for the cloud identity story.
- This gave the incidents an actor, a permission path, and a privilege boundary.

Why it mattered:

- In cloud investigations, identity is usually the first question: who did it, what did they have access to, and what changed?

What to say:

`IAM came early because every cloud incident needs an actor. I needed users, roles, and permissions before I could explain credential misuse or privilege escalation.`

### Step 5: Prepare The S3 Data-Access Story

What I did:

- I used S3 as the sensitive-data scenario.
- The S3 part supports the data access and exfiltration use case.

Why it mattered:

- It shows business impact, not just alerts.

What to say:

`S3 is where I connect the technical alert to business impact. It shows what data could have been accessed, not just that an event fired.`

### Step 6: Prepare The Secrets Manager Story

What I did:

- I prepared Secrets Manager as the secret-impact part of the EKS scenario.
- I do not show secret values live.

Why it mattered:

- It helps explain why workload identity abuse matters.

What to say:

`Secrets Manager is part of the impact story. If a workload identity can reach secrets, then the incident is no longer just runtime noise. It can become credential exposure.`

### Step 7: Use CloudTrail As The AWS Audit Source

What I did:

- I used CloudTrail/Event History as the AWS source of truth.
- This is where AWS activity can be explained by event name, user, time, and resource.

Why it mattered:

- CloudTrail gives the AWS-side audit trail behind the Datadog detection.

What to say:

`CloudTrail is where I validate the AWS activity. Datadog shows detection and monitoring, but CloudTrail explains what AWS says actually happened.`

### Step 8: Build The EKS Runtime Layer

What I did:

- I prepared the EKS cluster `cloudsec-demo`.
- This gives me runtime context for the workload and service-account story.

Why it mattered:

- EKS makes the demo more technical than only showing alerts.

What to say:

`EKS gives the workload side of the story. It helps me explain how runtime identity, service accounts, and cloud permissions connect in a real attack path.`

### Step 9: Build The Lambda Detection Harness

What I did:

- I built a Lambda-based test harness to replay controlled scenario events.
- The harness emits the use-case events in a repeatable way.

Why it mattered:

- It gives me clean live data without depending on random activity happening during the reviewer.

What to say:

`Lambda is my controlled replay mechanism. I used it so the reviewer can see the same scenario events reliably instead of waiting for live attacks or unstable connectors.`

If they ask why Lambda has no S3 trigger:

`I did not attach an S3 trigger because this harness is not meant to process every S3 object event. It is a controlled replay tool. In a production setup, I would decide between CloudTrail, EventBridge, S3 events, or a pipeline based on the detection requirement.`

### Step 10: Send Harness Events To Datadog

What I did:

- I sent the Lambda harness output into Datadog.
- The events are scoped as `source:test-harness`.

Why it mattered:

- This gives a clean filter for the live demo.

What to say:

`Datadog is where I validate the detection layer. The clean filter is source:test-harness, so I can show the reviewer only the scenario events tied to this lab.`

### Step 11: Build Datadog Monitors

What I did:

- I created monitors for the use cases.
- The monitors turn logs into alertable conditions.

Why it mattered:

- This proves I did more than collect logs. I turned the events into operational detection logic.

What to say:

`The monitors are important because logs by themselves are passive. The monitor layer shows how those events become detections someone can actually respond to.`

### Step 12: Build The Dashboard

What I did:

- I built the dashboard as the first live view.
- It summarizes the main blocks before I go deeper.

Why it mattered:

- The dashboard gives the reviewer a quick orientation before I move into logs, monitors, CloudTrail, Lambda, and EKS.

What to say:

`I start with the dashboard because it gives the reviewer the map first. Then I go into the technical pages that prove each part behind it.`

### Step 13: Collect Screenshots And Supporting Material

What I did:

- I collected supporting material for areas that are not live.
- CrowdStrike and Tenable are handled as saved screenshots/supporting evidence.

Why it mattered:

- It lets me discuss those tools honestly without pretending they are live integrations.

What to say:

`For CrowdStrike and Tenable, I am treating them as supporting evidence because I did not have temporary live accounts for the final demo. I am keeping that boundary clear instead of overselling it.`

### Step 14: Prepare Optional Context Tools

What I did:

- I kept Okta, Google Workspace, MongoDB, IAM, S3, and Secrets Manager ready only if the reviewer asks.

Why it mattered:

- I can answer follow-up questions without making the first demo too scattered.

What to say:

`I am not leading with every tool because that would make the demo noisy. I keep the live path focused, and I use the other tools as context if the reviewer asks for them.`

### Step 15: Prepare The Final Demo Order

What I did:

- I prepared the actual demo flow:

```text
Dashboard
-> Datadog Logs Explorer
-> Datadog monitors
-> AWS CloudTrail
-> Lambda harness
-> EKS
-> Optional AWS follow-ups: IAM, S3, Secrets Manager
-> Optional context: Okta, Google Workspace, MongoDB, CrowdStrike, Tenable
-> Back to deck slide 31
```

Why it mattered:

- This keeps the live demo controlled and technical.

What to say:

`That is why my live flow starts broad, then gets technical. I show the dashboard first, then the logs and monitors, then AWS audit evidence, then the harness and runtime layer.`

## How The Five Use Cases Map To The Workflow

| Use Case | Built Through | Live Evidence |
|---|---|---|
| Identity takeover | Okta-style scenario, Lambda harness, Datadog logs, Datadog monitor | Datadog `source:test-harness`; Okta only as context |
| AWS credential misuse | IAM, CloudTrail, Lambda harness, Datadog monitor | CloudTrail plus Datadog logs/monitor |
| EKS secret access | EKS, service-account story, Secrets Manager, CloudTrail, Datadog | EKS plus CloudTrail plus Datadog |
| Endpoint to MongoDB pivot | Harness event, MongoDB context, CrowdStrike support | Datadog event plus saved supporting material |
| S3 data access | S3 story, CloudTrail, Lambda harness, Datadog monitor | Datadog plus AWS context |

## Quick Answers If They Interrupt

### What Did You Build First?

`I started with the five use cases, then built the AWS foundation around them. The first technical layer was identity and AWS auditability, because those are needed for almost every cloud investigation.`

### Why Is Datadog The Main Live Tool?

`Datadog is where I can show the live detection workflow clearly: logs, filters, monitors, and dashboard. AWS explains the cloud activity behind it.`

### Why Not Show Every Tool Live?

`I wanted the live demo to be reliable and honest. Datadog, CloudTrail, Lambda, and EKS are the live path. Okta, Google Workspace, MongoDB, CrowdStrike, and Tenable are context or saved support, not live Datadog feeds in this final setup.`

### Why Is Cloud SIEM Not The Main Live Proof?

`Cloud SIEM is where this would sit in a fuller production setup. For this live lab demo, I am showing the underlying logs, monitors, dashboard, and AWS audit evidence directly so the reviewer can see the mechanics.`

### Why Is The Harness Better Than Random Live Traffic?

`The harness makes the demo repeatable. I can trigger or show the same use-case events every time, which is better than hoping the exact right event appears during a reviewer review.`

## Do Not Say

- `Everything is fully integrated live.`
- `Okta is live in Datadog.`
- `Google Workspace is live in Datadog.`
- `MongoDB is live in Datadog.`
- `CrowdStrike is live.`
- `Tenable is live.`
- `The Lambda is an S3 ingestion pipeline.`
- `Cloud SIEM is the main live proof.`

## Say Instead

- `The live path is Datadog, CloudTrail, Lambda, and EKS.`
- `Okta, Google Workspace, and MongoDB are context if asked.`
- `CrowdStrike and Tenable are saved screenshots/supporting material.`
- `The Lambda is a controlled detection harness.`
- `Cloud SIEM is the fuller production direction, but I am showing the mechanics directly here.`

## Final 30-Second Workflow

`I approached the lab by first mapping the five use cases, then building the AWS lab foundation around identity, data, secrets, audit logs, runtime, and detection. IAM gave me the actor and permission story. S3 and Secrets Manager gave me impact. CloudTrail gave me AWS audit evidence. EKS gave me runtime context. Lambda gave me a controlled way to replay the scenarios. Datadog received those harness events, then I built monitors and a dashboard around them. The tools that are not live are clearly labeled as context or supporting screenshots.`
