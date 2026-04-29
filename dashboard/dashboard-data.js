(() => {
const STAGES = [
  {
    id: "brief",
    index: 1,
    title: "System Scope",
    summary: "Define the covered platforms, evidence posture, and review structure before drilling into scenario logic."
  },
  {
    id: "execution",
    index: 2,
    title: "Environment Status",
    summary: "Show rebuilt platform state, verified telemetry surfaces, and the controls around honest live demonstration."
  },
  {
    id: "evidence",
    index: 3,
    title: "Evidence Catalog",
    summary: "Inspect the preserved proof surfaces and map each artifact to a scenario and response path."
  },
  {
    id: "logic",
    index: 4,
    title: "Detection Engineering",
    summary: "Review the five scenarios, their correlation logic, proof anchors, query pivots, and response posture."
  },
  {
    id: "demo",
    index: 5,
    title: "Demo Readiness",
    summary: "Close on the run sequence, rebuilt AWS path, and backup proof required for a stable demonstration."
  }
];

const APP_DATA = {
  overviewStats: [
    { label: "Scenario coverage", value: "5/5", note: "All required lab paths are implemented" },
    { label: "Artifact mapping", value: "19/19", note: "Every proof item is mapped to a use case" },
    { label: "Validated surfaces", value: "7", note: "Live proof centers on AWS, Datadog, runtime, and the synthetic detection test harness" },
    { label: "Runtime status", value: "Rebuilt + Harness", note: "AWS audit, secrets, EKS, Lambda, forwarder, and the Datadog detection test harness are live" }
  ],
  systemScope: [
    "Cross-platform review across identity, cloud, runtime, endpoint, and data access surfaces",
    "Five end-to-end scenarios fixed to the lab scope",
    "Proof model separates validated, contextual, archived, and supporting surfaces",
    "CLI and query appendix aligned to the implemented scenarios",
    "Live demonstration path backed by a preserved proof archive"
  ],
  stackCoverage: [
    "Okta and Google Workspace for identity and collaboration context, not vendor-native Datadog feeds in this build",
    "AWS CloudTrail, S3, EKS, and Secrets Manager for cloud and runtime proof",
    "Datadog for cross-platform correlation and signal review",
    "Detection test harness for synthetic non-AWS scenario validation inside Datadog",
    "MongoDB as operational context during the endpoint-to-data pivot",
    "CrowdStrike and Tenable as supporting surfaces where direct live proof was limited"
  ],
  platformNames: [
    "Okta",
    "Google Workspace",
    "AWS CloudTrail",
    "AWS S3",
    "AWS EKS",
    "Secrets Manager",
    "Datadog",
    "Detection Test Harness",
    "MongoDB",
    "CrowdStrike",
    "Tenable"
  ],
  technicalAssets: [
    "Review application",
    "Scenario proof map and evidence manifest",
    "CLI and query appendix",
    "Lambda-based detection test harness",
    "Preserved screenshot archive",
    "PowerPoint submission aligned to the same technical story"
  ],
  packageCrossCheck: [
    "Review flow matches the submitted scope",
    "Evidence archive is mapped by platform and use case",
    "Detection logic is tied to the five defined scenarios",
    "Rebuilt AWS runtime and synthetic validation are separated from context and preserved proof"
  ],
  architectureHighlights: [
    "Normalized scenario set fixed to the lab scope",
    "Proof assets mapped per platform and per scenario",
    "AWS runtime rebuilt with explicit live, context, and preserved labels",
    "Synthetic detection validation separated from vendor-native integrations by source:test-harness labeling",
    "Live browser tabs reserved for AWS, Datadog, and harness proof first",
    "Supplementary surfaces kept narrow where direct live proof was limited"
  ],
  currentAwsState: [
    "CloudTrail trail cloudsec-live-trail is logging to cloudsec-cloudtrail-123456789012-20260426",
    "Secrets Manager now includes trading-api-key-binance, payments/prod/db, and payments-prod-secret",
    "EKS cluster cloudsec-demo is active in us-east-1",
    "Lambda cloudsec-detection-test-harness is active with last update successful",
    "GuardDuty and Security Hub are enabled in us-east-1",
    "Datadog Cloud SIEM shows CloudTrail, Kubernetes, EKS, GuardDuty, and test-harness sources"
  ],
  awsCurrentMetrics: [
    { label: "Active AWS services", value: "8", note: "CloudTrail, S3, Secrets Manager, GuardDuty, Security Hub, EKS, Lambda, and EventBridge are present" },
    { label: "Verified telemetry paths", value: "5", note: "CloudTrail logging, Secrets CloudTrail reads, current Datadog CloudTrail visibility, GuardDuty visibility, and test-harness replay are verified" },
    { label: "Native IdP feeds", value: "0", note: "Datadog IdP Sources and Collaboration Log Sources are 0, so Okta and Google Workspace stay context/harness-validated only" },
    { label: "Residual cloud cost", value: "Controlled", note: "Resources are live again, so teardown discipline still matters after the review" }
  ],
  truthCards: [
    {
      label: "Live proof chain",
      value: "AWS, Datadog, Detection Test Harness",
      tone: "live",
      note: "These are the surfaces to present as live first: CloudTrail/EKS/Secrets/Lambda in AWS, Datadog SIEM/logs, and the Lambda-driven harness."
    },
    {
      label: "Current AWS runtime",
      value: "CloudTrail, secrets, EKS, Lambda, EventBridge, and GuardDuty rebuilt",
      tone: "live",
      note: "The AWS proof surfaces are live again: CloudTrail is logging, EKS is active, Lambda is active, and Secrets Manager contains the expected lab secrets."
    },
    {
      label: "Datadog rebuild status",
      value: "CloudTrail, GuardDuty, EKS, Kubernetes, and test-harness visible",
      tone: "live",
      note: "Datadog is live and queryable. IdP Sources and Collaboration Log Sources remain 0, so Okta and Google Workspace are not claimed as native Datadog feeds."
    },
    {
      label: "Detection test harness",
      value: "Lambda replay -> Datadog logs -> scoped monitors",
      tone: "live",
      note: "Synthetic non-AWS validation events now land in Datadog as source:test-harness with synthetic:true, and the harness monitors for identity and endpoint-to-MongoDB scenarios are firing."
    },
    {
      label: "Context surface",
      value: "Okta, Google Workspace, MongoDB",
      tone: "context",
      note: "These surfaces can support identity, collaboration, and data context, but they are not the core live Datadog detection path."
    },
    {
      label: "Supporting surfaces",
      value: "CrowdStrike, Tenable",
      tone: "curated",
      note: "These remain supporting panels because the live tenants did not expose rehearsal-ready incident views."
    }
  ],
  executionCautions: [
    "Do not present the application as a live connector pulling streaming telemetry.",
    "Use live browser tabs to reinforce rebuilt truth and preserved proof together, not as a product tour.",
    "If authentication is blocked, resume in the same browser profile after login.",
    "Do not claim that all Datadog detections or original five use cases are restored just because four foundational monitors now fire.",
    "Do not describe the detection test harness as an Okta, Google Workspace, CrowdStrike, MongoDB, or Tenable integration rebuild.",
    "Keep CrowdStrike and Tenable framed as supplementary panels during Q&A.",
    "Do not imply container runtime detection or non-AWS cross-source correlation is active just because the AWS data sources now exist."
  ],
  platformStatus: [
    {
      name: "Okta",
      status: "Context / sign-in gated",
      tone: "context",
      detail: "Authenticated context view is available. Do not present Okta as a vendor-native Datadog detection feed in this build.",
      image: "../implementation-package/supporting_evidence_package/okta-system-log-view.png"
    },
    {
      name: "Google Workspace",
      status: "Context console live",
      tone: "context",
      detail: "The Admin Console is signed in and viewable, but Datadog Collaboration Log Sources remains 0, so treat it as context.",
      image: "../implementation-package/supporting_evidence_package/google-admin-audit-view.png"
    },
    {
      name: "AWS CloudTrail / S3",
      status: "Live and verified",
      tone: "live",
      detail: "Trail cloudsec-live-trail is logging to S3 again, and fresh events have been verified through CloudTrail delivery and preserved proof.",
      image: "../implementation-package/supporting_evidence_package/aws-cloudtrail-key-misuse-view.png"
    },
    {
      name: "Datadog",
      status: "Live and queryable",
      tone: "live",
      detail: "Datadog shows CloudTrail, Kubernetes, EKS, GuardDuty, and test-harness sources. The confirmed staged harness query is source:test-harness.",
      image: "../implementation-package/supporting_evidence_package/datadog-open-signals-view.png"
    },
    {
      name: "Detection Test Harness",
      status: "Live synthetic validation",
      tone: "live",
      detail: "Lambda-driven curated replay now posts synthetic non-AWS events to Datadog as source:test-harness with synthetic:true, and the scoped identity and endpoint-to-MongoDB monitors are firing.",
      image: "../implementation-package/supporting_evidence_package/datadog-test-harness-view.png"
    },
    {
      name: "EKS / Secrets Manager",
      status: "Live and rebuilt",
      tone: "live",
      detail: "The EKS cluster, node group, logging, and demo secrets were rebuilt in AWS and can be shown alongside the preserved proof set.",
      image: "../implementation-package/supporting_evidence_package/eks-cluster-active-live-view.png"
    },
    {
      name: "MongoDB",
      status: "Context surface",
      tone: "context",
      detail: "Useful Atlas activity context exists, but it remains supporting context rather than primary proof.",
      image: "../implementation-package/supporting_evidence_package/mongodb-auth-log-view.png"
    },
    {
      name: "CrowdStrike",
      status: "Supplementary panel",
      tone: "curated",
      detail: "Process-tree style evidence exists as a supplementary proof panel.",
      image: "../implementation-package/supporting_evidence_package/crowdstrike-process-tree-view.png"
    },
    {
      name: "Tenable",
      status: "Supplementary panel",
      tone: "curated",
      detail: "Criticality and exposure context exists as a supplementary panel, not a live tenant incident view.",
      image: "../implementation-package/supporting_evidence_package/tenable-criticality-view.png"
    }
  ],
  guardrails: [
    "No live connector is claimed inside this dashboard itself.",
    "No synthetic incident rows should be presented as real tenant telemetry.",
    "Any detection test harness content must stay visibly labeled as source:test-harness and synthetic:true.",
    "Datadog IdP Sources = 0 and Collaboration Log Sources = 0 means Okta and Google Workspace are context, not native SIEM feeds today.",
    "CrowdStrike and Tenable must stay labeled as supplementary panels in Q&A.",
    "AWS, EKS, Lambda, CloudTrail, Secrets, Datadog, and the harness may be described as live; non-AWS vendor-native feed parity is not claimed."
  ],
  recruiterNotes: [
    "Every scenario is tied to a proof source, a response stance, and a technical pivot path.",
    "Live tabs reinforce the dashboard; they do not replace it.",
    "Rebuilt AWS runtime is represented with explicit live/context/preserved labels.",
    "Synthetic detection validation is separated from vendor-native integration claims by explicit labeling and scoped monitor logic.",
    "The application is designed to stand on its own as a technical review surface."
  ],
  evidenceGroups: [
    {
      id: "identity",
      label: "Identity and Admin",
      summary: "Preserved identity proof captured from authenticated admin consoles.",
      items: [
        {
          id: "okta-system-log",
          title: "Okta System Log",
          useCase: "Identity Account Takeover",
          sourceLabel: "Live console capture",
          tone: "live",
          image: "../implementation-package/supporting_evidence_package/okta-system-log-view.png",
          description: "Captured from the authenticated Okta admin tenant to show policy, org, and actor activity that supports the identity scenario."
        },
        {
          id: "google-admin-audit",
          title: "Google Admin Audit",
          useCase: "Identity Account Takeover",
          sourceLabel: "Live console capture",
          tone: "live",
          image: "../implementation-package/supporting_evidence_package/google-admin-audit-view.png",
          description: "Captured from the Google Workspace Admin reporting console to reinforce privileged follow-on activity."
        }
      ]
    },
    {
      id: "cloud",
      label: "Cloud and Detection",
      summary: "Real AWS and Datadog captures that support cloud misuse and S3 investigation.",
      items: [
        {
          id: "cloudtrail-key",
          title: "CloudTrail Key Misuse View",
          useCase: "AWS IAM Key Misuse",
          sourceLabel: "Live console capture",
          tone: "live",
          image: "../implementation-package/supporting_evidence_package/aws-cloudtrail-key-misuse-view.png",
          description: "Real CloudTrail event history screenshot captured from the current AWS session."
        },
        {
          id: "aws-s3",
          title: "AWS S3 Console View",
          useCase: "S3 Data Access Exfiltration",
          sourceLabel: "Live console capture",
          tone: "live",
          image: "../implementation-package/supporting_evidence_package/aws-s3-console-view.png",
          description: "Real S3 console evidence preserved as proof for sensitive object access review."
        },
        {
          id: "datadog-signals",
          title: "Datadog Root-Account Signal (53s MTTD)",
          useCase: "AWS IAM Key Misuse / S3 Data Access Exfiltration",
          sourceLabel: "Live console capture",
          tone: "live",
          image: "../implementation-package/supporting_evidence_package/datadog-open-signals-view.png",
          description: "Real Datadog signal view showing the root-account path, source IP 206.127.185.1, four-region enumeration, and the proof point that detection fired in 53 seconds."
        },
        {
          id: "datadog-siem",
          title: "Datadog Cloud SIEM",
          useCase: "Telemetry coverage and live correlation",
          sourceLabel: "Live console capture",
          tone: "live",
          image: "../implementation-package/supporting_evidence_package/datadog-cloud-siem-view.png",
          description: "Real SIEM view captured as proof that the environment includes cross-platform detection visibility."
        }
      ]
    },
    {
      id: "runtime",
      label: "Runtime and Secrets",
      summary: "Rebuilt EKS and Secrets surfaces paired with preserved proof from the original lab path.",
      items: [
        {
          id: "eks-overview",
          title: "EKS Active Cluster",
          useCase: "EKS Secret Access Chain",
          sourceLabel: "Captured and rebuilt proof",
          tone: "live",
          image: "../implementation-package/supporting_evidence_package/eks-cluster-active-live-view.png",
          description: "Captured from the real AWS account and now matched by the rebuilt cloudsec-demo cluster in us-east-1."
        },
        {
          id: "eks-compute",
          title: "EKS Compute Plane",
          useCase: "EKS Secret Access Chain",
          sourceLabel: "Captured and rebuilt proof",
          tone: "live",
          image: "../implementation-package/supporting_evidence_package/eks-compute-live-view.png",
          description: "Preserved compute proof aligned to the rebuilt demo-nodes managed node group."
        },
        {
          id: "eks-resources",
          title: "EKS Running Workload",
          useCase: "EKS Secret Access Chain",
          sourceLabel: "Captured and rebuilt proof",
          tone: "live",
          image: "../implementation-package/supporting_evidence_package/eks-resources-live-view.png",
          description: "Preserved workload proof aligned to the rebuilt demo workload path rather than a removed runtime."
        },
        {
          id: "secrets-access",
          title: "Secrets Manager View",
          useCase: "EKS Secret Access Chain",
          sourceLabel: "Captured and rebuilt proof",
          tone: "live",
          image: "../implementation-package/supporting_evidence_package/secretsmanager-access-view.png",
          description: "Preserved live proof paired with rebuilt demo secrets including trading-api-key-binance and payments/prod/db."
        }
      ]
    },
    {
      id: "endpoint",
      label: "Endpoint and Data",
      summary: "One supplementary endpoint panel plus one live-context data panel.",
      items: [
        {
          id: "crowdstrike-process",
          title: "CrowdStrike Process Tree",
          useCase: "Endpoint to MongoDB Pivot",
          sourceLabel: "Reference support panel",
          tone: "curated",
          image: "../implementation-package/supporting_evidence_package/crowdstrike-process-tree-view.png",
          description: "Rendered locally as a reference support panel because the live tenant did not expose the required incident trace."
        },
        {
          id: "mongodb-auth",
          title: "MongoDB Atlas Activity",
          useCase: "Endpoint to MongoDB Pivot",
          sourceLabel: "Live context capture",
          tone: "context",
          image: "../implementation-package/supporting_evidence_package/mongodb-auth-log-view.png",
          description: "Real Atlas activity feed screenshot that supports the pivot story as live context, not primary incident proof."
        }
      ]
    },
    {
      id: "harness",
      label: "Detection Test Harness",
      summary: "Synthetic non-AWS validation feed, explicitly labeled and scoped inside Datadog.",
      items: [
        {
          id: "datadog-test-harness",
          title: "Datadog Test Harness View",
          useCase: "Synthetic validation for identity and endpoint-to-data scenarios",
          sourceLabel: "Live synthetic validation",
          tone: "live",
          image: "../implementation-package/supporting_evidence_package/datadog-test-harness-view.png",
          description: "Real Datadog logs view showing source:test-harness and synthetic:true events from the Lambda replay path. This is a detection validation harness, not a rebuilt vendor-native integration."
        }
      ]
    },
    {
      id: "workflow",
      label: "Coverage and Workflow",
      summary: "Artifacts that explain how the review is structured and defended.",
      items: [
        {
          id: "architecture-map",
          title: "Architecture Coverage Map",
          useCase: "Coverage framing",
          sourceLabel: "Reference visual",
          tone: "curated",
          image: "../implementation-package/supporting_evidence_package/architecture-coverage-map.png",
          description: "Maps the platform-role coverage and supports the explanation of how telemetry spans the lab stack."
        },
        {
          id: "analyst-checklist",
          title: "Analyst Checklist",
          useCase: "Triage Engine",
          sourceLabel: "Reference visual",
          tone: "curated",
          image: "../implementation-package/supporting_evidence_package/analyst-checklist.png",
          description: "Summarizes the first-five-minutes analyst logic in a review-friendly format."
        },
        {
          id: "escalation-outline",
          title: "Escalation Packet Outline",
          useCase: "Triage Engine",
          sourceLabel: "Reference visual",
          tone: "curated",
          image: "../implementation-package/supporting_evidence_package/escalation-packet-outline.png",
          description: "Shows the escalation packet structure that supports response decisions during the review."
        },
        {
          id: "timeline-annotated",
          title: "Annotated Incident Timeline",
          useCase: "Investigation closeout",
          sourceLabel: "Reference visual",
          tone: "curated",
          image: "../implementation-package/supporting_evidence_package/incident-timeline-annotated.png",
          description: "Stitched timeline visual used as a backup narrative close when live tabs are not ideal."
        }
      ]
    }
  ],
  scenarios: [
    {
      id: "identity_account_takeover",
      title: "Identity Account Takeover",
      labFit: "Identity + SaaS admin correlation",
      executionTruth: "Uses preserved Okta and Google Workspace admin proof for identity context, plus a separate synthetic Datadog test harness for ongoing non-AWS rule validation.",
      logic: [
        "Okta session start from novel geo, device, or velocity context",
        "MFA reset, push fatigue, or forced follow-on authentication pattern",
        "Privileged Google Workspace action after the risky identity path",
        "Suppress declared admin maintenance windows or approved service identities"
      ],
      proof: [
        "Okta System Log screenshot",
        "Google Admin reporting screenshot",
        "Query examples in the CLI appendix"
      ],
      image: "../implementation-package/supporting_evidence_package/okta-system-log-view.png",
      query: "source IN (\"Okta\",\"Google Workspace\") AND user_or_service=\"jane.admin\" AND timestamp BETWEEN \"2026-04-08T08:00:00Z\" AND \"2026-04-08T08:30:00Z\"",
      operatorJudgment: "The identity anomaly matters because the privileged SaaS action follows quickly enough to establish a coherent admin-impact chain.",
      response: "Validate ownership, revoke sessions, review privileged changes, and confirm no persistence remains."
    },
      {
        id: "aws_iam_key_misuse",
        title: "AWS IAM Key Misuse",
        labFit: "Cloud control-plane misuse against privileged roles and trading-secret paths",
        executionTruth: "Uses real CloudTrail and Datadog proof captured during implementation.",
        logic: [
          "CloudTrail discovery burst across IAM and Secrets Manager from a first-seen key path",
          "Novel source IP 206.127.185.1 against a high-privilege or root identity",
          "Privilege growth or follow-on access that changes blast radius, not just inventory noise",
          "Touch of trading-api-key-binance, trading-api-key-coinbase, KMS, or other crown-jewel secret paths"
        ],
        proof: [
          "AWS CloudTrail screenshot",
          "Datadog root-account signal screenshot",
          "CLI example for IAM misuse investigation"
        ],
        image: "../implementation-package/supporting_evidence_package/aws-cloudtrail-key-misuse-view.png",
        query: "aws cloudtrail lookup-events --lookup-attributes AttributeKey=AccessKeyId,AttributeValue=AKIAIOSFODNN7EXAMPLE --max-results 10",
        operatorJudgment: "The shift from enumeration into privilege or secret access is what turns odd cloud activity into a true business-risk incident, especially when the touched path includes trading credentials.",
        response: "Confirm whether the affected key is attached to live trading positions or venue integrations before disabling, then disable the key, diff IAM changes, rotate touched trading secrets, and scope adjacent role and venue-integration impact."
      },
      {
        id: "eks_secret_access_chain",
        title: "EKS Secret Access Chain",
        labFit: "Runtime to cloud credential and secret access chain",
      executionTruth: "Live EKS and Secrets proof was captured originally and the runtime has now been rebuilt in AWS for the review.",
        logic: [
          "Unexpected pod, token, or service-account activity inside the cluster",
          "AWS API access through workload identity or secret retrieval",
          "KMS or secret usage showing operational value, not harmless noise",
          "Faster escalation when production namespaces or trading-facing workloads are touched"
        ],
      proof: [
        "EKS cluster overview screenshot",
        "EKS compute and workload screenshots",
        "Secrets Manager screenshot",
        "CLI example for EKS secret-access investigation"
      ],
      image: "../implementation-package/supporting_evidence_package/eks-cluster-active-live-view.png",
      query: "aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=GetSecretValue --max-results 10",
        operatorJudgment: "Runtime noise becomes a real incident once workload identity reaches secrets or KMS outside an explainable deployment window, especially if the path can unlock production trading services.",
        response: "Contain the namespace or service account, preserve workload evidence, and rotate touched secrets before the identity can be reused."
      },
      {
      id: "endpoint_to_mongodb_pivot",
      title: "Endpoint to MongoDB Pivot",
      labFit: "Endpoint compromise flowing into database access",
      executionTruth: "Uses CrowdStrike reference support, live MongoDB context, and a separate synthetic Datadog test harness for endpoint-to-data detection validation.",
        logic: [
          "Endpoint execution or process lineage indicating suspicious tooling",
          "Credential access or host compromise signal on the same path",
          "MongoDB authentication from the compromised host context",
          "Collection, export, or unusual read behavior against operational or credential-bearing collections"
        ],
      proof: [
        "CrowdStrike reference process-tree panel",
        "MongoDB Atlas activity screenshot",
        "Query example for endpoint-to-database pivot"
      ],
      image: "../implementation-package/supporting_evidence_package/crowdstrike-process-tree-view.png",
      query: "hostname=\"fin-ws-22\" AND (process_name=\"mongosh.exe\" OR network_destination CONTAINS \"mongo-prod\")",
        operatorJudgment: "The key is to show the pivot path clearly and to distinguish endpoint support from the live but limited database context, especially if mongodb-credentials or position-related collections are in scope.",
        response: "Contain the host, preserve process lineage, and verify whether collections, credentials, or exports tied to production operations were touched."
      },
      {
        id: "s3_data_access_exfiltration",
        title: "S3 Data Access Exfiltration",
        labFit: "Sensitive bucket access and data movement review for crown-jewel cloud data",
        executionTruth: "Uses real AWS S3 and Datadog captures as the proof set.",
        logic: [
          "Sensitive bucket list and get-object activity",
          "Novel principal, source path, or time window",
          "Signal correlation showing unusual retrieval or movement",
          "Escalation based on touched-object sensitivity, prefix scope, and downstream financial or customer impact"
        ],
      proof: [
        "AWS S3 console screenshot",
        "Datadog open signals screenshot",
        "Cloud investigation CLI examples reused for S3 review"
      ],
      image: "../implementation-package/supporting_evidence_package/aws-s3-console-view.png",
      query: "aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=GetObject --max-results 10",
        operatorJudgment: "Object access becomes a real exfiltration story only when source novelty, sensitivity, and access volume line up together, especially if the bucket holds exported reports, partner data, or security material.",
        response: "Validate the principal, scope touched objects, and constrain bucket access when the path stays novel and business materiality is clear."
      }
  ],
  demoPlan: {
    openSequence: [
      "Open the review application first and frame it as an evidence-led review, not a live SIEM feed.",
      "Move to Environment Status and set expectations around live, contextual, and preserved surfaces.",
      "Use Evidence Catalog to prove the preserved work, then call out the Detection Test Harness as a separate synthetic validation layer rather than a rebuilt vendor-native integration.",
      "Use Detection Engineering to walk the five scenarios in the lab order.",
      "Close on the rebuilt AWS path, verified Datadog ingestion, the harness validation boundary, and the backup evidence archive."
    ],
    liveTabs: [
      "Datadog SIEM overview and Signals Explorer",
      "Datadog logs for source:test-harness",
      "Datadog CloudSec Test Harness monitors",
      "AWS CloudTrail event history",
      "AWS Lambda cloudsec-detection-test-harness",
      "EKS and Secrets Manager rebuilt path"
    ],
    relaunch: [
      "AWS core runtime is already rebuilt for the review path",
      "Keep teardown commands ready for EKS and any billable resources after the session",
      "Refresh preserved screenshots only if the rebuilt live view materially improves the proof path",
      "Use the harness for safe replay instead of claiming unavailable vendor-native feeds",
      "Tear down the cluster again immediately after the review if it is no longer needed"
    ],
    backups: [
      "okta-system-log-view.png",
      "google-admin-audit-view.png",
      "aws-cloudtrail-key-misuse-view.png",
      "aws-s3-console-view.png",
      "datadog-test-harness-view.png",
      "eks-cluster-active-live-view.png",
      "eks-compute-live-view.png",
      "eks-resources-live-view.png"
    ]
  },
  heroVisuals: {
    brief: {
      kicker: "Coverage and package map",
      title: "Implementation package overview",
      note: "The review starts from delivered work, not from a fictional live feed.",
      image: "../implementation-package/supporting_evidence_package/architecture-coverage-map.png"
    },
    demo: {
      kicker: "Review backup proof",
      title: "Annotated investigation timeline",
      note: "A preserved visual closeout if any live tab is slow, gated, or unavailable during the demo.",
      image: "../implementation-package/supporting_evidence_package/incident-timeline-annotated.png"
    }
  }
};

const toneLabel = (tone) => ({
  live: "Validated surface",
  context: "Operational context",
  curated: "Supporting surface",
  paused: "Archived runtime proof"
}[tone] || "Reference");

const stageById = (stageId) => STAGES.find((stage) => stage.id === stageId);

const firstEvidenceGroupId = APP_DATA.evidenceGroups[0].id;
const firstEvidenceItemId = APP_DATA.evidenceGroups[0].items[0].id;
const firstScenarioId = APP_DATA.scenarios[0].id;

window.DashboardData = {
  STAGES,
  APP_DATA,
  toneLabel,
  stageById,
  firstEvidenceGroupId,
  firstEvidenceItemId,
  firstScenarioId
};
})();
