# ATT&CK Coverage Boundaries

This document maps the CloudSec SOC Detection Lab to MITRE ATT&CK with explicit
claim boundaries. The mapping is intentionally conservative: validated means the
lab has a direct scenario path and evidence anchor; partial means the lab models
only one slice of the behavior; not claimed means the repo should not be read as
covering that technique.

## Coverage Summary

| Scenario | Validated | Partial With Boundary | Not Claimed |
|---|---|---|---|
| Identity account takeover | T1078.004 Valid Accounts: Cloud Accounts; T1621 Multi-Factor Authentication Request Generation | T1098 Account Manipulation, only where privileged workspace changes follow the risky identity path | Password brute force, phishing delivery, full IdP connector parity |
| AWS credential misuse | T1078.004 Valid Accounts: Cloud Accounts; T1059.009 Command and Scripting Interpreter: Cloud API | T1087.004 Account Discovery: Cloud Account, only for IAM-oriented enumeration; T1098 Account Manipulation, only for policy or role-impacting activity | Initial credential theft, malware execution, full IAM graph coverage |
| EKS secret access chain | T1078.004 Valid Accounts: Cloud Accounts; T1059.009 Command and Scripting Interpreter: Cloud API | T1552.007 Unsecured Credentials: Container API, only where workload identity reaches secret material or Kubernetes API style secret context | Container escape, image build compromise, full Kubernetes audit coverage |
| Endpoint to MongoDB pivot | T1213.006 Data from Information Repositories: Databases | Endpoint execution is supporting context only; database collection is modeled without confirmed bulk export | Malware attribution, full EDR detection, confirmed exfiltration |
| S3 data access exfiltration | T1530 Data from Cloud Storage; T1619 Cloud Storage Object Discovery | T1537 Transfer Data to Cloud Account, only if future evidence adds cross-account transfer or sharing behavior | Full DLP coverage, cross-account object replication, external transfer proof |

## Scenario Notes

### Identity Account Takeover

The lab validates the identity risk chain when MFA pressure or novel sign-in
context is followed by privileged workspace action. It partially maps to account
manipulation because the public package models administrative change context,
not persistence through new credentials or durable role changes.

### AWS Credential Misuse

The lab validates cloud account abuse and Cloud API activity through
CloudTrail-style events, access-key context, and IAM or secret-impacting API
behavior. Discovery is partial because the repo models selected IAM discovery
paths rather than every cloud directory, role, group, and entitlement source.

### EKS Secret Access Chain

The lab validates cloud API use through workload identity and secret-access
context. Container API credential access is partial because the public package
does not claim a full Kubernetes API secret dump or complete audit stream.

### Endpoint To MongoDB Pivot

The lab validates database repository access reasoning through host-to-database
correlation. Endpoint process evidence is supporting context. The repo does not
claim malware attribution or confirmed data export.

### S3 Data Access Exfiltration

The lab validates cloud storage object discovery and object access using
CloudTrail-style S3 events. Transfer to a separate cloud account remains only a
future extension unless cross-account sharing, replication, or transfer evidence
is added.

## Reference Techniques

- T1078.004 Valid Accounts: Cloud Accounts - https://attack.mitre.org/techniques/T1078/004/
- T1621 Multi-Factor Authentication Request Generation - https://attack.mitre.org/techniques/T1621/
- T1098 Account Manipulation - https://attack.mitre.org/techniques/T1098/
- T1059.009 Command and Scripting Interpreter: Cloud API - https://attack.mitre.org/techniques/T1059/009/
- T1087.004 Account Discovery: Cloud Account - https://attack.mitre.org/techniques/T1087/004/
- T1552.007 Unsecured Credentials: Container API - https://attack.mitre.org/techniques/T1552/007/
- T1213.006 Data from Information Repositories: Databases - https://attack.mitre.org/techniques/T1213/006/
- T1530 Data from Cloud Storage - https://attack.mitre.org/techniques/T1530/
- T1619 Cloud Storage Object Discovery - https://attack.mitre.org/techniques/T1619/
- T1537 Transfer Data to Cloud Account - https://attack.mitre.org/techniques/T1537/

