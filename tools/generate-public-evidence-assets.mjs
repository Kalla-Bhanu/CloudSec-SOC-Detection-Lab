import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync
} from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const htmlDir = path.join(repoRoot, "evidence-templates", "public-safe");
const pngDir = path.join(repoRoot, "dashboard", "assets", "evidence");
const args = new Set(process.argv.slice(2));
const checkMode = args.has("--check");
const renderPngDuringCheck = args.has("--render-png");

const chromeCandidates = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
].filter(Boolean);

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const assets = [
  {
    file: "architecture-coverage-map",
    title: "Architecture Coverage Map",
    subtitle: "Public-safe SOC lab coverage across identity, cloud, runtime, endpoint, and data surfaces.",
    accent: "#2359a6",
    status: "Coverage",
    metrics: [["Scenarios", "5"], ["Surfaces", "10"], ["Evidence", "18"]],
    rows: [
      ["Identity", "Risky sign-in", "Workspace admin action"],
      ["Cloud", "CloudTrail", "S3 and IAM misuse"],
      ["Runtime", "EKS service account", "Secret access"],
      ["Endpoint", "Process tree", "Database pivot"],
      ["Response", "Evidence packet", "Escalation path"]
    ],
    steps: ["Signal", "Correlate", "Validate", "Escalate", "Close"]
  },
  {
    file: "analyst-checklist",
    title: "First Five Minutes",
    subtitle: "Analyst actions that turn an alert into a defensible response decision.",
    accent: "#1f8a70",
    status: "Triage",
    metrics: [["Actions", "6"], ["Bias", "Contain"], ["Owner", "Named"]],
    rows: [
      ["1", "Confirm entity", "User, workload, host, or service account"],
      ["2", "Measure novelty", "Source, geography, API path, or process chain"],
      ["3", "Preserve proof", "Keep the strongest event before pivoting"],
      ["4", "Estimate blast radius", "Asset criticality and touched data"],
      ["5", "Choose next move", "Contain, validate, or escalate"],
      ["6", "Assign owner", "Set next proof target and time expectation"]
    ],
    steps: ["Entity", "Novelty", "Proof", "Blast Radius", "Action"]
  },
  {
    file: "escalation-packet-outline",
    title: "Escalation Packet Outline",
    subtitle: "A concise packet structure for handing a validated detection to responders or leadership.",
    accent: "#b7791f",
    status: "Escalation",
    metrics: [["Packet", "Ready"], ["Evidence", "Mapped"], ["Decision", "Named"]],
    rows: [
      ["Incident summary", "What happened", "One sentence impact statement"],
      ["Evidence anchors", "Why we believe it", "Alert, audit event, timeline link"],
      ["Scope", "What could be touched", "Accounts, assets, secrets, data paths"],
      ["Action", "What to do next", "Containment, rotation, review owner"],
      ["Comms", "Who needs it", "SOC lead, cloud owner, app owner"]
    ],
    steps: ["Summary", "Evidence", "Scope", "Action", "Owner"]
  },
  {
    file: "incident-timeline-annotated",
    title: "Annotated Incident Timeline",
    subtitle: "A stitched view from first signal through containment decision using synthetic lab events.",
    accent: "#a23d52",
    status: "Timeline",
    metrics: [["Events", "16"], ["Incidents", "5"], ["Closeout", "Mapped"]],
    rows: [
      ["08:02", "MFA failures", "Novel identity signal"],
      ["08:21", "Admin change", "Privileged follow-on action"],
      ["12:39", "Policy attach", "Cloud escalation threshold"],
      ["15:05", "Secret read", "Runtime identity reached protected secret"],
      ["02:05", "DB auth", "Endpoint path reached data store"],
      ["10:33", "Object read", "Sensitive S3 access"]
    ],
    steps: ["First signal", "Material event", "Proof anchor", "Response"]
  },
  {
    file: "okta-system-log-view",
    title: "Identity System Log",
    subtitle: "Risky sign-in pattern followed by privileged activity, represented with placeholder actors.",
    accent: "#2359a6",
    status: "Context",
    metrics: [["Actor", "admin.user"], ["MFA", "Failed x2"], ["Follow-on", "Admin"]],
    rows: [
      ["08:02", "mfa.verify", "Failure from TEST-NET source"],
      ["08:04", "mfa.verify", "Second failure on same session"],
      ["08:09", "user.authentication.sso", "Success after failures"],
      ["08:21", "admin.role.update", "Privileged action within window"],
      ["08:24", "group.member.add", "Admin group touched"]
    ],
    steps: ["Novel sign-in", "MFA pressure", "Session success", "Admin action"]
  },
  {
    file: "google-admin-audit-view",
    title: "Workspace Admin Audit",
    subtitle: "Privileged SaaS action modeled as follow-on activity after the identity anomaly.",
    accent: "#6b46c1",
    status: "Context",
    metrics: [["Actor", "admin.user"], ["Target", "admin group"], ["Window", "15 min"]],
    rows: [
      ["08:21", "admin_role_granted", "Admin capability added"],
      ["08:24", "group_membership_changed", "Privileged group updated"],
      ["08:27", "audit_review_started", "Analyst opened case"],
      ["08:31", "session_revoked", "Containment step queued"]
    ],
    steps: ["Identity risk", "Admin change", "Proof link", "Session review"]
  },
  {
    file: "aws-cloudtrail-key-misuse-view",
    title: "CloudTrail Key Misuse View",
    subtitle: "First-seen cloud credential path moves from discovery into privilege-impacting API activity.",
    accent: "#2f6fdd",
    status: "Validated",
    metrics: [["Access key", "EXAMPLE_ACCESS_KEY_ID"], ["Account", "EXAMPLE_ACCOUNT"], ["Severity", "High"]],
    rows: [
      ["12:31", "ListUsers", "Discovery from first-seen source"],
      ["12:33", "GetAccountAuthorizationDetails", "Authorization inventory"],
      ["12:39", "AttachUserPolicy", "Privilege-impacting change"],
      ["12:41", "GetSecretValue", "Protected path reviewed"]
    ],
    steps: ["Discovery", "Privilege change", "Secret touch", "Rotate"]
  },
  {
    file: "aws-s3-console-view",
    title: "S3 Object Access View",
    subtitle: "Sensitive bucket activity with placeholder bucket and object names.",
    accent: "#c05621",
    status: "Validated",
    metrics: [["Bucket", "sensitive-reporting"], ["Objects", "2"], ["Status", "Review"]],
    rows: [
      ["10:28", "ListBucket", "Prefix enumerated"],
      ["10:31", "GetObject", "reports/q2/operations-summary.csv"],
      ["10:33", "GetObject", "reports/q2/report-summary.csv"],
      ["10:34", "Alert", "Volume and novelty threshold crossed"]
    ],
    steps: ["List", "Read", "Correlate", "Constrain"]
  },
  {
    file: "datadog-open-signals-view",
    title: "Datadog Signal Review",
    subtitle: "Cloud and data-access alerts converted into response-ready signal context.",
    accent: "#632ca6",
    status: "Validated",
    metrics: [["Signals", "3"], ["MTTD", "53 sec"], ["Owner", "Cloud SOC"]],
    rows: [
      ["High", "New key source plus IAM change", "AWS Credential Misuse"],
      ["High", "Sensitive S3 retrieval spike", "S3 Data Access Exfiltration"],
      ["Critical", "Workload identity secret access", "EKS Secret Access Chain"],
      ["Info", "source:test-harness replay", "Synthetic validation"]
    ],
    steps: ["Log", "Rule", "Signal", "Owner", "Response"]
  },
  {
    file: "datadog-cloud-siem-view",
    title: "Datadog Cloud SIEM",
    subtitle: "Coverage posture and source visibility without tenant-specific details.",
    accent: "#364fc7",
    status: "Coverage",
    metrics: [["Sources", "5"], ["Rules", "8"], ["Validated", "Yes"]],
    rows: [
      ["CloudTrail", "Control plane", "Active lab source"],
      ["Kubernetes", "Runtime audit", "Scenario support"],
      ["GuardDuty", "Cloud context", "Review context"],
      ["test-harness", "Synthetic replay", "Rule validation"],
      ["S3", "Object access", "Data scenario"]
    ],
    steps: ["Sources", "Rules", "Signals", "Cases"]
  },
  {
    file: "datadog-test-harness-view",
    title: "Detection Test Harness",
    subtitle: "Synthetic replay feed scoped with source:test-harness and synthetic:true.",
    accent: "#087f5b",
    status: "Synthetic",
    metrics: [["Replay", "Manual"], ["Tag", "synthetic:true"], ["Source", "test-harness"]],
    rows: [
      ["identity_account_takeover", "6 events", "MFA and admin chain"],
      ["aws_iam_key_misuse", "4 events", "New key and IAM change"],
      ["eks_secret_access_chain", "4 events", "Workload secret chain"],
      ["endpoint_to_mongodb_pivot", "5 events", "Process and DB chain"],
      ["s3_data_access_exfiltration", "3 events", "Object-access chain"],
      ["asset_context_enrichment", "8 assets", "Criticality support"],
      ["all", "Replay bundle", "Demo-safe validation"]
    ],
    steps: ["CSV row", "Lambda", "Datadog log", "Monitor"]
  },
  {
    file: "eks-cluster-active-live-view",
    title: "EKS Active Cluster",
    subtitle: "Runtime scenario view using placeholder cluster, namespace, and workload names.",
    accent: "#0b7285",
    status: "Runtime",
    metrics: [["Cluster", "workload-demo"], ["Region", "us-east-1"], ["Mode", "Lab"]],
    rows: [
      ["Cluster", "workload-demo", "Active control-plane model"],
      ["Namespace", "critical-service", "Scenario scope"],
      ["Service account", "app-runtime-sa", "Identity under review"],
      ["Audit", "token activity", "Mapped to CloudTrail path"]
    ],
    steps: ["Pod", "Service account", "STS", "Secret"]
  },
  {
    file: "eks-compute-live-view",
    title: "EKS Compute Plane",
    subtitle: "Compute context used to explain workload placement and blast radius.",
    accent: "#0b7285",
    status: "Runtime",
    metrics: [["Node group", "demo-nodes"], ["Pods", "4"], ["Namespace", "critical-service"]],
    rows: [
      ["node-a", "Ready", "Workload capable"],
      ["node-b", "Ready", "Replica placement"],
      ["pod/api-1", "Running", "Uses app-runtime-sa"],
      ["pod/api-2", "Running", "Same namespace"]
    ],
    steps: ["Node", "Pod", "Identity", "API call"]
  },
  {
    file: "eks-resources-live-view",
    title: "EKS Running Workload",
    subtitle: "Workload view that can be tied back to service-account and secret-access events.",
    accent: "#0b7285",
    status: "Runtime",
    metrics: [["Pods", "2"], ["SA", "app-runtime-sa"], ["Risk", "Secret read"]],
    rows: [
      ["Deployment", "critical-api", "Public-safe workload name"],
      ["Service account", "app-runtime-sa", "Bound to IAM role"],
      ["Secret path", "critical-service/db", "Name only, no value"],
      ["Control", "Rotate + isolate", "Response action"]
    ],
    steps: ["Workload", "Token", "Role", "Secret", "Rotate"]
  },
  {
    file: "secretsmanager-access-view",
    title: "Secrets Manager View",
    subtitle: "Secret-access context using placeholder names and no secret values.",
    accent: "#9c6644",
    status: "Protected",
    metrics: [["Secrets", "3"], ["Values", "Hidden"], ["Access", "Reviewed"]],
    rows: [
      ["critical-service/db", "Read event", "Scenario secret"],
      ["critical-service/api", "No value shown", "Rotation candidate"],
      ["ops/notification-token", "Context", "Not in incident scope"],
      ["KMS decrypt", "Follow-on event", "Materiality signal"]
    ],
    steps: ["Secret read", "KMS use", "Impact", "Rotate"]
  },
  {
    file: "mongodb-auth-log-view",
    title: "MongoDB Activity View",
    subtitle: "Database context for endpoint-to-data pivot using placeholder collection names.",
    accent: "#2b8a3e",
    status: "Context",
    metrics: [["User", "analyst.user"], ["Database", "records-lab"], ["Action", "Export"]],
    rows: [
      ["02:05", "auth.success", "New host context"],
      ["02:08", "collection.find", "records.accounts"],
      ["02:12", "collection.export", "records.summary"],
      ["02:19", "access.review", "Owner validation requested"]
    ],
    steps: ["Host signal", "DB auth", "Read", "Export", "Contain"]
  },
  {
    file: "crowdstrike-process-tree-view",
    title: "Endpoint Process Tree",
    subtitle: "Endpoint support panel for the pivot scenario with placeholder host and user.",
    accent: "#c92a2a",
    status: "Support",
    metrics: [["Host", "workstation-lab-22"], ["User", "analyst.user"], ["Containment", "Queued"]],
    rows: [
      ["winword.exe", "parent", "User opened document"],
      ["powershell.exe", "child", "Encoded command indicator"],
      ["rundll32.exe", "credential access", "Suspicious memory access"],
      ["mongosh.exe", "database pivot", "Outbound database session"],
      ["contain_host", "response", "Containment requested"]
    ],
    steps: ["Execution", "Credential access", "Pivot", "Contain"]
  },
  {
    file: "tenable-criticality-view",
    title: "Asset Criticality View",
    subtitle: "Exposure and asset-priority context for escalation decisions.",
    accent: "#b7791f",
    status: "Support",
    metrics: [["Assets", "8"], ["Critical", "4"], ["Internet-facing", "2"]],
    rows: [
      ["workload-demo-cluster", "Critical", "Runtime exposure"],
      ["critical-service/db", "Critical", "Secret-backed path"],
      ["records-lab", "Critical", "Data-store context"],
      ["sensitive-reporting", "High", "Object storage scenario"],
      ["identity-admin", "High", "Privileged SaaS surface"]
    ],
    steps: ["Asset", "Exposure", "Criticality", "Priority"]
  }
];

function renderHtml(asset) {
  const metrics = asset.metrics
    .map(([label, value]) => `
      <div class="metric">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
      </div>
    `).join("");

  const rows = asset.rows
    .map((row) => `
      <div class="row">
        ${row.map((cell) => `<div>${escapeHtml(cell)}</div>`).join("")}
      </div>
    `).join("");

  const steps = asset.steps
    .map((step, index) => `
      <div class="step">
        <b>${String(index + 1).padStart(2, "0")}</b>
        <span>${escapeHtml(step)}</span>
      </div>
    `).join("");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(asset.title)}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      width: 1400px;
      height: 900px;
      overflow: hidden;
      font-family: "Aptos", "Segoe UI", Arial, sans-serif;
      color: #14202e;
      background: #eef3f8;
    }
    .frame {
      width: 1400px;
      height: 900px;
      padding: 42px;
      background:
        linear-gradient(135deg, rgba(255,255,255,0.92), rgba(244,247,251,0.86)),
        linear-gradient(90deg, ${asset.accent} 0 1.2%, transparent 1.2%);
    }
    .shell {
      height: 816px;
      display: grid;
      grid-template-columns: 0.92fr 1.08fr;
      gap: 26px;
    }
    .panel {
      border: 1px solid #d5dde8;
      border-radius: 12px;
      background: #ffffff;
      box-shadow: 0 24px 52px rgba(20, 32, 46, 0.10);
      overflow: hidden;
    }
    .hero {
      padding: 28px 30px 22px;
      background: linear-gradient(180deg, #ffffff, #f7fafc);
      border-bottom: 1px solid #d5dde8;
    }
    .status {
      display: inline-flex;
      align-items: center;
      min-height: 30px;
      padding: 0 12px;
      border-radius: 999px;
      background: color-mix(in srgb, ${asset.accent} 12%, white);
      color: ${asset.accent};
      font-weight: 700;
      font-size: 15px;
    }
    h1 {
      margin: 18px 0 10px;
      font-size: 44px;
      line-height: 1;
      letter-spacing: 0;
    }
    p {
      margin: 0;
      color: #5d6a7a;
      font-size: 18px;
      line-height: 1.45;
    }
    .metrics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      padding: 18px;
    }
    .metric {
      padding: 14px;
      border: 1px solid #d5dde8;
      border-radius: 10px;
      background: #f8fafc;
    }
    .metric span {
      display: block;
      color: #5d6a7a;
      font-size: 14px;
    }
    .metric strong {
      display: block;
      margin-top: 6px;
      font-size: 24px;
      color: #14202e;
    }
    .flow {
      padding: 18px;
      display: grid;
      gap: 10px;
    }
    .step {
      display: grid;
      grid-template-columns: 46px 1fr;
      align-items: center;
      gap: 14px;
      padding: 10px 12px;
      border: 1px solid #d5dde8;
      border-radius: 10px;
      background: #ffffff;
    }
    .step b {
      width: 36px;
      height: 36px;
      display: grid;
      place-items: center;
      border-radius: 10px;
      background: ${asset.accent};
      color: white;
    }
    .step span {
      font-size: 18px;
      font-weight: 700;
    }
    .table {
      padding: 26px;
      display: grid;
      gap: 12px;
      align-content: start;
    }
    .row {
      display: grid;
      grid-template-columns: 0.82fr 1fr 1.35fr;
      gap: 10px;
      min-height: 70px;
    }
    .row div {
      display: flex;
      align-items: center;
      padding: 14px;
      border: 1px solid #d5dde8;
      border-radius: 10px;
      background: #f8fafc;
      font-size: 17px;
      line-height: 1.25;
    }
    .row div:first-child {
      color: ${asset.accent};
      font-weight: 800;
      background: color-mix(in srgb, ${asset.accent} 9%, white);
    }
    .footer {
      padding: 18px 26px;
      border-top: 1px solid #d5dde8;
      color: #5d6a7a;
      font-size: 15px;
      background: #f8fafc;
    }
  </style>
</head>
<body>
  <main class="frame">
    <div class="shell">
      <section class="panel">
        <div class="hero">
          <span class="status">${escapeHtml(asset.status)}</span>
          <h1>${escapeHtml(asset.title)}</h1>
          <p>${escapeHtml(asset.subtitle)}</p>
        </div>
        <div class="metrics">${metrics}</div>
        <div class="flow">${steps}</div>
      </section>
      <section class="panel">
        <div class="table">${rows}</div>
        <div class="footer">Synthetic public-safe evidence visual. No private tenant names, company names, credentials, private user data, or secret values.</div>
      </section>
    </div>
  </main>
</body>
</html>`;
}

async function findChrome() {
  const browser = chromeCandidates.find((candidate) => existsSync(candidate));
  if (browser) {
    return browser;
  }

  try {
    const { chromium } = await import("@playwright/test");
    const playwrightBrowser = chromium.executablePath();
    if (existsSync(playwrightBrowser)) {
      return playwrightBrowser;
    }
  } catch {
    // Playwright is optional for one-off local generation; system Chrome is enough.
  }

  return null;
}

function sha256(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function normalizedText(filePath) {
  return readFileSync(filePath, "utf8")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+$/gm, "")
    .trimEnd();
}

function listBasenames(directory, extension) {
  if (!existsSync(directory)) {
    return [];
  }
  return readdirSync(directory)
    .filter((file) => file.endsWith(extension))
    .sort();
}

function readPngDimensions(filePath) {
  const data = readFileSync(filePath);
  const signature = "89504e470d0a1a0a";
  if (data.length < 24 || data.subarray(0, 8).toString("hex") !== signature) {
    throw new Error("not a valid PNG file");
  }
  return {
    width: data.readUInt32BE(16),
    height: data.readUInt32BE(20)
  };
}

function verifyCommittedAssets(generatedHtmlDir, generatedPngDir) {
  const failures = [];
  const expectedHtml = assets.map((asset) => `${asset.file}.html`).sort();
  const expectedPng = assets.map((asset) => `${asset.file}.png`).sort();
  const committedHtml = listBasenames(htmlDir, ".html");
  const committedPng = listBasenames(pngDir, ".png");

  for (const htmlFile of expectedHtml) {
    const generatedPath = path.join(generatedHtmlDir, htmlFile);
    const committedPath = path.join(htmlDir, htmlFile);
    if (!existsSync(committedPath)) {
      failures.push(`Missing committed template: ${htmlFile}`);
      continue;
    }
    if (normalizedText(generatedPath) !== normalizedText(committedPath)) {
      failures.push(`Template drift: ${htmlFile}`);
    }
  }

  for (const htmlFile of committedHtml) {
    if (!expectedHtml.includes(htmlFile)) {
      failures.push(`Unexpected committed template: ${htmlFile}`);
    }
  }

  for (const pngFile of expectedPng) {
    const committedPath = path.join(pngDir, pngFile);
    if (!existsSync(committedPath)) {
      failures.push(`Missing committed PNG: ${pngFile}`);
      continue;
    }
    try {
      const dimensions = readPngDimensions(committedPath);
      if (dimensions.width !== 1400 || dimensions.height !== 900) {
        failures.push(
          `Unexpected PNG dimensions for ${pngFile}: ${dimensions.width}x${dimensions.height}`
        );
      }
    } catch (error) {
      failures.push(`Invalid committed PNG ${pngFile}: ${error.message}`);
    }
  }

  for (const pngFile of committedPng) {
    if (!expectedPng.includes(pngFile)) {
      failures.push(`Unexpected committed PNG: ${pngFile}`);
    }
  }

  if (renderPngDuringCheck) {
    for (const pngFile of expectedPng) {
      const generatedPath = path.join(generatedPngDir, pngFile);
      const committedPath = path.join(pngDir, pngFile);
      if (existsSync(generatedPath) && existsSync(committedPath)) {
        if (sha256(generatedPath) !== sha256(committedPath)) {
          failures.push(`Rendered PNG byte drift: ${pngFile}`);
        }
      }
    }
  }

  if (failures.length > 0) {
    throw new Error(
      `Evidence asset verification failed:\n- ${failures.join("\n- ")}\nRun npm run generate:evidence-assets to refresh generated assets.`
    );
  }
}

const outputRoot = checkMode
  ? mkdtempSync(path.join(tmpdir(), "cloudsec-evidence-"))
  : repoRoot;
const outputHtmlDir = checkMode
  ? path.join(outputRoot, "evidence-templates", "public-safe")
  : htmlDir;
const outputPngDir = checkMode
  ? path.join(outputRoot, "dashboard", "assets", "evidence")
  : pngDir;

try {
  await mkdir(outputHtmlDir, { recursive: true });
  await mkdir(outputPngDir, { recursive: true });

  for (const asset of assets) {
    const htmlPath = path.join(outputHtmlDir, `${asset.file}.html`);
    await writeFile(htmlPath, renderHtml(asset), "utf8");
  }

  if (!checkMode || renderPngDuringCheck) {
    const chrome = await findChrome();
    if (!chrome) {
      throw new Error(
        "Chrome, Edge, or Playwright Chromium was not found. Set CHROME_PATH and rerun this script."
      );
    }

    for (const asset of assets) {
      const htmlPath = path.join(outputHtmlDir, `${asset.file}.html`);
      const pngPath = path.join(outputPngDir, `${asset.file}.png`);
      const result = spawnSync(chrome, [
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--no-first-run",
        "--window-size=1400,900",
        `--screenshot=${pngPath}`,
        pathToFileURL(htmlPath).href
      ], { stdio: "inherit" });

      if (result.status !== 0) {
        throw new Error(`Failed to render ${asset.file}.png`);
      }
    }
  }

  if (checkMode) {
    verifyCommittedAssets(outputHtmlDir, outputPngDir);
    console.log(`PASS evidence asset verification completed for ${assets.length} assets.`);
  } else {
    console.log(`Rendered ${assets.length} public-safe evidence assets to ${pngDir}`);
  }
} finally {
  if (checkMode) {
    rmSync(outputRoot, { recursive: true, force: true });
  }
}
