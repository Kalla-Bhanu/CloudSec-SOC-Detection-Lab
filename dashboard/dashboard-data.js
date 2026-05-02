(() => {
const evidenceImage = (name) => `./assets/evidence/${name}.png`;

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
    summary: "Show rebuilt lab state, verified telemetry surfaces, and honest boundaries around live demonstration."
  },
  {
    id: "evidence",
    index: 3,
    title: "Evidence Catalog",
    summary: "Inspect the public-safe proof surfaces and map each artifact to a scenario and response path."
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
    summary: "Close on the run sequence, controlled replay path, and backup proof required for a stable demonstration."
  }
];

const APP_DATA = {
  overviewStats: [
    { label: "Scenario coverage", value: "5/5", note: "Every public scenario has trigger, proof, query, and response logic" },
    { label: "Evidence assets", value: "18", note: "Repo-owned sanitized visuals replace environment-specific screenshots" },
    { label: "Validated surfaces", value: "7", note: "AWS, Datadog, runtime, and synthetic replay are represented clearly" },
    { label: "Delivery state", value: "Complete", note: "Dashboard, datasets, harness, flowcharts, docs, and deck align" }
  ],
  systemScope: [
    "Cross-platform review across identity, cloud, runtime, endpoint, and data-access surfaces",
    "Five end-to-end scenarios fixed to a public-safe lab scope",
    "Proof model separates validated lab surfaces, contextual panels, and supporting evidence",
    "CLI and query appendix aligned to the implemented scenarios",
    "Local dashboard and deck tell the same sanitized detection-engineering story"
  ],
  stackCoverage: [
    "Identity and collaboration sources provide account-takeover context",
    "AWS CloudTrail, S3, EKS, Secrets Manager, and Lambda provide cloud and runtime proof",
    "Datadog provides log review, monitor validation, and correlation framing",
    "Detection test harness provides controlled synthetic replay under source:test-harness",
    "MongoDB context supports the endpoint-to-data pivot scenario",
    "CrowdStrike and Tenable are represented as supporting proof panels"
  ],
  platformNames: [
    "Identity Provider",
    "Workspace Admin",
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
    "Interactive dashboard",
    "Scenario proof map and evidence manifest",
    "CLI and query appendix",
    "Lambda-based detection test harness",
    "Public-safe evidence visuals",
    "Presentation deck aligned to the same technical story"
  ],
  packageCrossCheck: [
    "Review flow matches the public lab scope",
    "Evidence archive is mapped by platform and use case",
    "Detection logic is tied to the five defined scenarios",
    "Controlled replay is separated from vendor-native integration claims"
  ],
  architectureHighlights: [
    "Normalized scenario set fixed to the lab scope",
    "Proof assets mapped per platform and per scenario",
    "AWS runtime path documented with explicit live, context, and preserved labels",
    "Synthetic validation separated from vendor-native integrations by source:test-harness labeling",
    "Dashboard starts broad, then narrows into evidence and detection logic",
    "Supplementary surfaces stay narrow where direct live proof is not claimed"
  ],
  currentAwsState: [
    "CloudTrail-style audit events are modeled for identity, API, S3, and Secrets Manager paths",
    "Secrets Manager scenario uses placeholder secret names only",
    "EKS scenario models workload identity and secret-access behavior without secret values",
    "Lambda harness emits controlled synthetic events to Datadog-style log intake",
    "GuardDuty and Security Hub appear as review context, not as overclaimed rule coverage",
    "Datadog-style views separate CloudTrail, Kubernetes, EKS, GuardDuty, and test-harness sources"
  ],
  awsCurrentMetrics: [
    { label: "Modeled AWS services", value: "8", note: "CloudTrail, S3, Secrets Manager, GuardDuty, Security Hub, EKS, Lambda, and EventBridge" },
    { label: "Telemetry paths", value: "5", note: "Audit events, secret reads, runtime context, data access, and harness replay" },
    { label: "Native IdP feed claim", value: "0", note: "Identity context is not presented as a live vendor-native Datadog feed" },
    { label: "Residual risk", value: "Controlled", note: "The lab is safe to review because all public evidence is synthetic or sanitized" }
  ],
  truthCards: [
    {
      label: "Validated lab chain",
      value: "AWS, Datadog, Detection Test Harness",
      tone: "live",
      note: "These are the surfaces presented as the main technical path: audit events, replay harness, log review, and monitor validation."
    },
    {
      label: "Cloud runtime model",
      value: "CloudTrail, secrets, EKS, Lambda, EventBridge",
      tone: "live",
      note: "The public version shows the same detection logic using placeholder account IDs, placeholder resources, and sanitized events."
    },
    {
      label: "Datadog validation",
      value: "Logs, monitors, and source:test-harness scoping",
      tone: "live",
      note: "The harness feed is clearly labeled so synthetic validation is never confused with a live vendor connector."
    },
    {
      label: "Synthetic replay",
      value: "Lambda replay -> Datadog logs -> scoped monitors",
      tone: "live",
      note: "Replay events are intentionally controlled and include synthetic:true in the event model."
    },
    {
      label: "Context surfaces",
      value: "Identity, workspace, MongoDB",
      tone: "context",
      note: "These support the investigation story and help explain pivots without claiming full live connector parity."
    },
    {
      label: "Supporting surfaces",
      value: "CrowdStrike, Tenable",
      tone: "curated",
      note: "These remain supporting panels for endpoint and exposure context."
    }
  ],
  executionCautions: [
    "Do not present the dashboard as a live connector pulling streaming telemetry.",
    "Use live browser tabs only to reinforce a proof point already established in the dashboard.",
    "Do not claim vendor-native feed parity for identity, workspace, endpoint, database, or exposure tools.",
    "Do not describe synthetic replay rows as real tenant telemetry.",
    "Keep source:test-harness and synthetic:true visible when discussing replay validation.",
    "Keep CrowdStrike and Tenable framed as supporting panels during Q&A.",
    "Keep private company names, tenant identifiers, screenshots, and secret values out of the public walkthrough."
  ],
  platformStatus: [
    {
      name: "Identity Provider",
      status: "Context / sign-in model",
      tone: "context",
      detail: "Represents risky login, MFA fatigue, and privileged follow-on activity using public-safe placeholders.",
      image: evidenceImage("okta-system-log-view")
    },
    {
      name: "Workspace Admin",
      status: "Context console model",
      tone: "context",
      detail: "Represents privileged workspace changes that follow an identity anomaly.",
      image: evidenceImage("google-admin-audit-view")
    },
    {
      name: "AWS CloudTrail / S3",
      status: "Validated lab surface",
      tone: "live",
      detail: "Represents the cloud control-plane and object-access paths used in the credential misuse and S3 scenarios.",
      image: evidenceImage("aws-cloudtrail-key-misuse-view")
    },
    {
      name: "Datadog",
      status: "Validated lab surface",
      tone: "live",
      detail: "Represents log review, signal handling, and monitor validation using clear synthetic-source scoping.",
      image: evidenceImage("datadog-open-signals-view")
    },
    {
      name: "Detection Test Harness",
      status: "Synthetic validation",
      tone: "live",
      detail: "Lambda-driven curated replay posts synthetic events as source:test-harness with synthetic:true.",
      image: evidenceImage("datadog-test-harness-view")
    },
    {
      name: "EKS / Secrets Manager",
      status: "Runtime chain model",
      tone: "live",
      detail: "Represents workload identity, STS, secret retrieval, and KMS usage without exposing secret values.",
      image: evidenceImage("eks-cluster-active-live-view")
    },
    {
      name: "MongoDB",
      status: "Context surface",
      tone: "context",
      detail: "Represents database access context during the endpoint-to-data pivot.",
      image: evidenceImage("mongodb-auth-log-view")
    },
    {
      name: "CrowdStrike",
      status: "Supporting panel",
      tone: "curated",
      detail: "Represents process-tree evidence and host containment logic for the endpoint scenario.",
      image: evidenceImage("crowdstrike-process-tree-view")
    },
    {
      name: "Tenable",
      status: "Supporting panel",
      tone: "curated",
      detail: "Represents asset criticality and exposure context used for prioritization.",
      image: evidenceImage("tenable-criticality-view")
    }
  ],
  guardrails: [
    "No real company name, tenant name, account ID, private user data, credential, or secret value is included.",
    "No synthetic incident rows should be presented as real tenant telemetry.",
    "Any replayed content must stay visibly labeled as source:test-harness and synthetic:true.",
    "Context panels are not vendor-native integration claims.",
    "Endpoint and exposure panels are supporting evidence, not production incident views.",
    "The public repo demonstrates detection-engineering flow, not production coverage."
  ],
  recruiterNotes: [
    "Every scenario is tied to a proof source, a response stance, and a technical pivot path.",
    "The dashboard establishes the map before the walkthrough opens any detailed evidence.",
    "Synthetic validation is separated from live integration claims by explicit labeling.",
    "The application stands on its own as a technical review surface."
  ],
  evidenceGroups: [
    {
      id: "identity",
      label: "Identity and Admin",
      summary: "Public-safe identity proof modeled from risky sign-in and privileged admin patterns.",
      items: [
        {
          id: "okta-system-log",
          title: "Identity System Log",
          useCase: "Identity Account Takeover",
          sourceLabel: "Sanitized evidence visual",
          tone: "context",
          image: evidenceImage("okta-system-log-view"),
          description: "Shows repeated MFA failures, novel sign-in context, and follow-on admin activity using placeholder actors."
        },
        {
          id: "google-admin-audit",
          title: "Workspace Admin Audit",
          useCase: "Identity Account Takeover",
          sourceLabel: "Sanitized evidence visual",
          tone: "context",
          image: evidenceImage("google-admin-audit-view"),
          description: "Shows privileged workspace changes after a risky identity path."
        }
      ]
    },
    {
      id: "cloud",
      label: "Cloud and Detection",
      summary: "AWS and Datadog-style views for cloud misuse and S3 investigation.",
      items: [
        {
          id: "cloudtrail-key",
          title: "CloudTrail Key Misuse View",
          useCase: "AWS Credential Misuse",
          sourceLabel: "Sanitized evidence visual",
          tone: "live",
          image: evidenceImage("aws-cloudtrail-key-misuse-view"),
          description: "Shows API discovery followed by privilege-impacting behavior from a first-seen access path."
        },
        {
          id: "aws-s3",
          title: "S3 Object Access View",
          useCase: "S3 Data Access Exfiltration",
          sourceLabel: "Sanitized evidence visual",
          tone: "live",
          image: evidenceImage("aws-s3-console-view"),
          description: "Shows sensitive object access using placeholder bucket names and object paths."
        },
        {
          id: "datadog-signals",
          title: "Datadog Signal Review",
          useCase: "AWS Credential Misuse / S3 Data Access Exfiltration",
          sourceLabel: "Sanitized evidence visual",
          tone: "live",
          image: evidenceImage("datadog-open-signals-view"),
          description: "Shows how log evidence becomes a signal with priority, owner, and response context."
        },
        {
          id: "datadog-siem",
          title: "Datadog Cloud SIEM",
          useCase: "Telemetry coverage and correlation",
          sourceLabel: "Sanitized evidence visual",
          tone: "live",
          image: evidenceImage("datadog-cloud-siem-view"),
          description: "Shows detection coverage and source posture without exposing a real tenant."
        }
      ]
    },
    {
      id: "runtime",
      label: "Runtime and Secrets",
      summary: "EKS and secret-access surfaces for workload-identity investigation.",
      items: [
        {
          id: "eks-overview",
          title: "EKS Active Cluster",
          useCase: "EKS Secret Access Chain",
          sourceLabel: "Sanitized evidence visual",
          tone: "live",
          image: evidenceImage("eks-cluster-active-live-view"),
          description: "Shows a public-safe EKS control-plane view for the runtime scenario."
        },
        {
          id: "eks-compute",
          title: "EKS Compute Plane",
          useCase: "EKS Secret Access Chain",
          sourceLabel: "Sanitized evidence visual",
          tone: "live",
          image: evidenceImage("eks-compute-live-view"),
          description: "Shows node and workload context needed for service-account triage."
        },
        {
          id: "eks-resources",
          title: "EKS Running Workload",
          useCase: "EKS Secret Access Chain",
          sourceLabel: "Sanitized evidence visual",
          tone: "live",
          image: evidenceImage("eks-resources-live-view"),
          description: "Shows a workload path that can be tied back to CloudTrail and Secrets Manager events."
        },
        {
          id: "secrets-access",
          title: "Secrets Manager View",
          useCase: "EKS Secret Access Chain",
          sourceLabel: "Sanitized evidence visual",
          tone: "live",
          image: evidenceImage("secretsmanager-access-view"),
          description: "Shows secret-access context using placeholder secret names only."
        }
      ]
    },
    {
      id: "endpoint",
      label: "Endpoint and Data",
      summary: "Endpoint process evidence plus database-context proof for the pivot scenario.",
      items: [
        {
          id: "crowdstrike-process",
          title: "Endpoint Process Tree",
          useCase: "Endpoint to MongoDB Pivot",
          sourceLabel: "Sanitized evidence visual",
          tone: "curated",
          image: evidenceImage("crowdstrike-process-tree-view"),
          description: "Shows process lineage, credential-access risk, and outbound database pivot logic."
        },
        {
          id: "mongodb-auth",
          title: "MongoDB Activity View",
          useCase: "Endpoint to MongoDB Pivot",
          sourceLabel: "Sanitized evidence visual",
          tone: "context",
          image: evidenceImage("mongodb-auth-log-view"),
          description: "Shows database authentication and collection activity using placeholder database names."
        }
      ]
    },
    {
      id: "harness",
      label: "Detection Test Harness",
      summary: "Synthetic validation feed, explicitly labeled and scoped inside Datadog-style logs.",
      items: [
        {
          id: "datadog-test-harness",
          title: "Datadog Test Harness View",
          useCase: "Synthetic replay validation across all five canonical scenarios",
          sourceLabel: "Synthetic validation",
          tone: "live",
          image: evidenceImage("datadog-test-harness-view"),
          description: "Shows source:test-harness and synthetic:true events from the replay path."
        }
      ]
    },
    {
      id: "workflow",
      label: "Coverage and Workflow",
      summary: "Visuals that explain how the review is structured and defended.",
      items: [
        {
          id: "architecture-map",
          title: "Architecture Coverage Map",
          useCase: "Coverage framing",
          sourceLabel: "Curated visual",
          tone: "curated",
          image: evidenceImage("architecture-coverage-map"),
          description: "Maps the platform-role coverage and supports the explanation of how telemetry spans the lab stack."
        },
        {
          id: "analyst-checklist",
          title: "Analyst Checklist",
          useCase: "Triage Engine",
          sourceLabel: "Curated visual",
          tone: "curated",
          image: evidenceImage("analyst-checklist"),
          description: "Summarizes the first-five-minutes analyst logic in a review-friendly format."
        },
        {
          id: "escalation-outline",
          title: "Escalation Packet Outline",
          useCase: "Triage Engine",
          sourceLabel: "Curated visual",
          tone: "curated",
          image: evidenceImage("escalation-packet-outline"),
          description: "Shows the escalation packet structure that supports response decisions during the review."
        },
        {
          id: "timeline-annotated",
          title: "Annotated Incident Timeline",
          useCase: "Investigation closeout",
          sourceLabel: "Curated visual",
          tone: "curated",
          image: evidenceImage("incident-timeline-annotated"),
          description: "Shows stitched incident progression from first signal through containment decision."
        }
      ]
    }
  ],
  scenarios: [
    {
      id: "identity_account_takeover",
      title: "Identity Account Takeover",
      labFit: "Identity + SaaS admin correlation",
      executionTruth: "Uses identity and workspace context proof plus synthetic Datadog validation for repeatable rule testing.",
      logic: [
        "Identity session starts from novel geo, device, or velocity context",
        "MFA reset, push fatigue, or forced follow-on authentication pattern",
        "Privileged workspace action follows the risky identity path",
        "Suppress declared admin maintenance windows or approved service identities"
      ],
      proof: [
        "Identity system-log visual",
        "Workspace admin audit visual",
        "Query examples in the CLI appendix"
      ],
      image: evidenceImage("okta-system-log-view"),
      query: "source IN (\"identity-provider\",\"workspace-admin\") AND user_or_service=\"admin.user\" AND timestamp BETWEEN \"2026-04-08T08:00:00Z\" AND \"2026-04-08T08:30:00Z\"",
      operatorJudgment: "The identity anomaly matters because the privileged SaaS action follows quickly enough to establish a coherent admin-impact chain.",
      response: "Validate ownership, revoke sessions, review privileged changes, and confirm no persistence remains."
    },
    {
      id: "aws_iam_key_misuse",
      title: "AWS Credential Misuse",
      labFit: "Cloud control-plane misuse against privileged roles and protected secrets",
      executionTruth: "Uses CloudTrail-style events and Datadog-style signal review captured as sanitized public evidence.",
      logic: [
        "CloudTrail discovery burst across IAM and Secrets Manager from a first-seen access path",
        "Novel source context against a privileged identity",
        "Privilege growth or follow-on access that changes blast radius, not just inventory noise",
        "Touch of a protected secret, KMS key, or other high-value cloud path"
      ],
      proof: [
        "CloudTrail key misuse visual",
        "Datadog signal review visual",
        "CLI example for IAM misuse investigation"
      ],
      image: evidenceImage("aws-cloudtrail-key-misuse-view"),
      query: "aws cloudtrail lookup-events --lookup-attributes AttributeKey=AccessKeyId,AttributeValue=EXAMPLE_ACCESS_KEY_ID --max-results 10",
      operatorJudgment: "The shift from enumeration into privilege or secret access is what turns odd cloud activity into a true business-risk incident.",
      response: "Disable or constrain the key, diff IAM changes, rotate touched secrets, and scope adjacent roles before closing."
    },
    {
      id: "eks_secret_access_chain",
      title: "EKS Secret Access Chain",
      labFit: "Runtime to cloud credential and secret access chain",
      executionTruth: "Uses EKS, STS, Secrets Manager, and KMS-style evidence to explain the workload identity chain.",
      logic: [
        "Unexpected pod, token, or service-account activity inside the cluster",
        "AWS API access through workload identity or secret retrieval",
        "KMS or secret usage showing operational value, not harmless noise",
        "Faster escalation when protected namespaces or service-facing workloads are touched"
      ],
      proof: [
        "EKS cluster overview visual",
        "EKS compute and workload visuals",
        "Secrets Manager visual",
        "CLI example for EKS secret-access investigation"
      ],
      image: evidenceImage("eks-cluster-active-live-view"),
      query: "aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=GetSecretValue --max-results 10",
      operatorJudgment: "Runtime noise becomes a real incident once workload identity reaches secrets or KMS outside an explainable deployment window.",
      response: "Contain the namespace or service account, preserve workload evidence, and rotate touched secrets before the identity can be reused."
    },
    {
      id: "endpoint_to_mongodb_pivot",
      title: "Endpoint to MongoDB Pivot",
      labFit: "Endpoint compromise flowing into database access",
      executionTruth: "Uses endpoint process-tree support, MongoDB context, and a synthetic Datadog test harness for endpoint-to-data detection validation.",
      logic: [
        "Endpoint execution or process lineage indicates suspicious tooling",
        "Credential access or host compromise signal occurs on the same path",
        "MongoDB authentication follows from the compromised host context",
        "Collection, export, or unusual read behavior appears against sensitive data"
      ],
      proof: [
        "Endpoint process-tree visual",
        "MongoDB activity visual",
        "Query example for endpoint-to-database pivot"
      ],
      image: evidenceImage("crowdstrike-process-tree-view"),
      query: "hostname=\"workstation-lab-22\" AND (process_name=\"mongosh.exe\" OR network_destination CONTAINS \"mongo-lab\")",
      operatorJudgment: "The key is to show the pivot path clearly and distinguish endpoint support from database-context proof.",
      response: "Contain the host, preserve process lineage, and verify whether sensitive collections, credentials, or exports were touched."
    },
    {
      id: "s3_data_access_exfiltration",
      title: "S3 Data Access Exfiltration",
      labFit: "Sensitive bucket access and data movement review for high-value cloud data",
      executionTruth: "Uses S3, CloudTrail-style audit events, and Datadog-style signal review as the proof set.",
      logic: [
        "Sensitive bucket list and get-object activity",
        "Novel principal, source path, or time window",
        "Signal correlation showing unusual retrieval or movement",
        "Escalation based on object sensitivity, prefix scope, and downstream impact"
      ],
      proof: [
        "S3 object access visual",
        "Datadog signal review visual",
        "Cloud investigation CLI examples reused for S3 review"
      ],
      image: evidenceImage("aws-s3-console-view"),
      query: "aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=GetObject --max-results 10",
      operatorJudgment: "Object access becomes an exfiltration story only when source novelty, sensitivity, and access volume line up together.",
      response: "Validate the principal, scope touched objects, and constrain bucket access when the path stays novel and material."
    }
  ],
  demoPlan: {
    openSequence: [
      "Open the dashboard first and frame it as an evidence-led technical review.",
      "Move to Environment Status and set expectations around validated, contextual, and supporting surfaces.",
      "Use Evidence Catalog to prove the public-safe artifact map, then call out the Detection Test Harness as synthetic validation.",
      "Use Detection Engineering to walk the five scenarios in the lab order.",
      "Close on demo controls, query pivots, and the backup evidence archive."
    ],
    liveTabs: [
      "Dashboard local view",
      "Datadog-style logs for source:test-harness",
      "Datadog-style monitor validation",
      "AWS CloudTrail-style event history",
      "Lambda detection test harness",
      "EKS and Secrets Manager scenario visuals"
    ],
    relaunch: [
      "Use the public-safe dashboard as the primary run surface",
      "Keep source:test-harness visible when showing synthetic replay",
      "Refresh evidence visuals only if a new public-safe capture improves the story",
      "Use the harness for safe replay instead of claiming unavailable vendor-native feeds",
      "Remove any environment-specific screenshots, tenant names, or secret values before publishing"
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
      image: evidenceImage("architecture-coverage-map")
    },
    demo: {
      kicker: "Review backup proof",
      title: "Annotated investigation timeline",
      note: "A preserved visual closeout if any live tab is slow, gated, or unavailable during the demo.",
      image: evidenceImage("incident-timeline-annotated")
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
