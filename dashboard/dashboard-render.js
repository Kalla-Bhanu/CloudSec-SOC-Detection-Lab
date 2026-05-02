(() => {
const { APP_DATA, STAGES, stageById } = window.DashboardData;

const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

const listHtml = (items) => `
  <ul class="bullet-list">
    ${items.map((item) => `<li>${item}</li>`).join("")}
  </ul>
`;

const buttonGroup = (items, activeValue, attr) => `
  <div class="button-group">
    ${items.map((item) => `
      <button class="segmented-button${item.value === activeValue ? " active" : ""}" type="button" ${attr}="${item.value}">
        ${item.label}
      </button>
    `).join("")}
  </div>
`;

const flowTrack = (items) => `
  <div class="flow-track">
    ${items.map((item) => `
      <article class="flow-step">
        <strong>${item.title || item}</strong>
        ${item.note ? `<span>${item.note}</span>` : ""}
      </article>
    `).join("")}
  </div>
`;

const pillGrid = (items) => `
  <div class="pill-grid">
    ${items.map((item) => `<span class="pill">${item}</span>`).join("")}
  </div>
`;

const contextBar = (items) => `
  <div class="context-bar">
    ${items.map((item) => `
      <div class="context-chip">
        <span>${item.label}</span>
        <strong>${item.value}</strong>
      </div>
    `).join("")}
  </div>
`;

const stackedMeter = (items) => {
  const total = items.reduce((sum, item) => sum + item.value, 0) || 1;
  return `
    <div class="stacked-meter-shell">
      <div class="stacked-meter" aria-hidden="true">
        ${items.map((item) => `
          <span class="stacked-segment tone-${item.tone}" style="width:${(item.value / total) * 100}%"></span>
        `).join("")}
      </div>
      <div class="stacked-legend">
        ${items.map((item) => `
          <div class="stacked-legend-item">
            <span class="legend-dot tone-${item.tone}"></span>
            <strong>${item.label}</strong>
            <small>${item.value}</small>
          </div>
        `).join("")}
      </div>
    </div>
  `;
};

const statGrid = (items) => `
  <div class="stat-grid">
    ${items.map((item) => `
      <article class="stat-tile">
        <span>${item.label}</span>
        <strong>${item.value}</strong>
        ${item.note ? `<small>${item.note}</small>` : ""}
      </article>
    `).join("")}
  </div>
`;

const matrixTable = (columns, rows) => `
  <div class="matrix-table" role="table" aria-label="coverage matrix">
    <div class="matrix-row matrix-head" role="row">
      <div class="matrix-cell matrix-label" role="columnheader">Surface</div>
      ${columns.map((column) => `<div class="matrix-cell" role="columnheader">${column}</div>`).join("")}
    </div>
    ${rows.map((row) => `
      <div class="matrix-row" role="row">
        <div class="matrix-cell matrix-label" role="rowheader">${row.label}</div>
        ${row.values.map((value) => `<div class="matrix-cell" role="cell">${value}</div>`).join("")}
      </div>
    `).join("")}
  </div>
`;

const signalChain = (items) => `
  <div class="signal-chain">
    ${items.map((item, index) => `
      <article class="signal-node">
        <span class="signal-index">${String(index + 1).padStart(2, "0")}</span>
        <strong>${item.title}</strong>
        <small>${item.note}</small>
      </article>
    `).join("")}
  </div>
`;

const taxonomyGrid = (items) => `
  <div class="taxonomy-grid">
    ${items.map((item) => `
      <article class="taxonomy-card">
        <span>${item.label}</span>
        <strong>${item.value}</strong>
        ${item.note ? `<small>${item.note}</small>` : ""}
      </article>
    `).join("")}
  </div>
`;

const compactTable = (columns, rows) => `
  <div class="compact-table" role="table">
    <div class="compact-row compact-head" role="row">
      ${columns.map((column) => `<div class="compact-cell" role="columnheader">${column}</div>`).join("")}
    </div>
    ${rows.map((row) => `
      <div class="compact-row" role="row">
        ${row.map((cell) => `<div class="compact-cell" role="cell">${cell}</div>`).join("")}
      </div>
    `).join("")}
  </div>
`;

const card = (title, body, kicker = "") => `
  <section class="card">
    ${kicker ? `<span class="card-kicker">${kicker}</span>` : ""}
    <h3>${title}</h3>
    ${body}
  </section>
`;

const mediaPanel = (item) => `
  <button
    class="media-panel"
    type="button"
    data-lightbox-image="${item.image}"
    data-lightbox-title="${item.title}"
    data-lightbox-description="${item.description || item.note || ""}"
  >
    <img src="${item.image}" alt="${item.title}">
    <div class="media-panel-copy">
      <strong>${item.title}</strong>
      <span>${item.description || item.note || ""}</span>
    </div>
  </button>
`;

const renderBrief = () => `
  ${contextBar([
    { label: "Lab scope", value: "Locked" },
    { label: "Proof package", value: "Mapped" },
    { label: "Surface count", value: "10" },
    { label: "Review mode", value: "Technical" }
  ])}
  ${card("Executive Snapshot", statGrid([
    { label: "Scenario coverage", value: "100%", note: "Five of five lab paths are implemented" },
    { label: "Surface spread", value: "10", note: "Identity, cloud, runtime, endpoint, and data" },
    { label: "Artifact mapping", value: "18", note: "Mapped into the evidence manifest" },
    { label: "Review stages", value: "5", note: "Scope, environment, evidence, logic, and closeout" }
  ]), "Overview")}
  ${card("Domain Matrix", compactTable(
    ["Domain", "Primary surfaces", "Proof posture", "Review role"],
    [
      ["Identity", "Identity provider / workspace admin", "Context + synthetic", "Privileged SaaS path"],
      ["Cloud", "CloudTrail / S3 / Datadog", "Validated lab", "Control-plane misuse"],
      ["Runtime", "EKS / Secrets Manager / Lambda", "Runtime model", "Workload-to-secret chain"],
      ["Endpoint / Data", "CrowdStrike / MongoDB / Tenable", "Support + context", "Pivot and exposure review"]
    ]
  ), "Coverage")}
  <div class="grid two-col">
    ${card("Lab Scope", listHtml(APP_DATA.systemScope), "System Scope")}
    ${card("Technical Assets", listHtml(APP_DATA.technicalAssets), "Delivery Package")}
  </div>
  <div class="grid two-col">
    ${card("Platform Coverage", listHtml(APP_DATA.stackCoverage), "Platforms")}
    ${card("Implementation Cross-Check", listHtml(APP_DATA.packageCrossCheck), "Validation")}
  </div>
  ${card("Review Flow", flowTrack([
    { title: "Scope", note: "Lab boundaries and delivery package" },
    { title: "Environment", note: "Validated surfaces and current runtime posture" },
    { title: "Evidence", note: "Artifacts mapped to use cases" },
    { title: "Logic", note: "Scenario engineering and query pivots" },
    { title: "Closeout", note: "Validation sequence, controlled replay path, and evidence archive" }
  ]), "Flow")}
  ${card("Signal Architecture", signalChain([
    { title: "Identity context", note: "Identity and workspace admin context support the human-side review when available" },
    { title: "Cloud control plane", note: "CloudTrail, S3, and Secrets access surfaces" },
    { title: "Correlation layer", note: "Datadog signals and cross-platform context" },
    { title: "Runtime path", note: "EKS cluster, workload, and secret retrieval chain" },
      { title: "Analyst closeout", note: "Evidence archive, appendix, and response packet" }
  ]), "Architecture")}
  ${card("Architecture Decisions", listHtml(APP_DATA.architectureHighlights), "Design")}
  <div class="grid two-col">
    ${card("Review Standards", listHtml(APP_DATA.reviewNotes), "Posture")}
    ${card("Platform Map", pillGrid(APP_DATA.platformNames), "Coverage")}
  </div>
  ${card("Scenario Coverage Matrix", matrixTable(
    ["Identity", "Cloud", "Runtime", "Endpoint", "Data"],
    [
      { label: "Identity takeover", values: ["Yes", "-", "-", "-", "Admin impact"] },
      { label: "AWS IAM misuse", values: ["-", "Yes", "-", "-", "Secrets touch"] },
      { label: "EKS secret chain", values: ["-", "Yes", "Yes", "-", "Secret access"] },
      { label: "Endpoint to MongoDB", values: ["-", "-", "-", "Yes", "Database pivot"] },
      { label: "S3 data access", values: ["-", "Yes", "-", "-", "Object retrieval"] }
    ]
  ), "Lab Matrix")}
`;

const renderExecution = (state, actions) => {
  const platform = APP_DATA.platformStatus.find((item) => item.name === state.executionPlatform) || APP_DATA.platformStatus[0];
  const postureCounts = [
    { label: "Validated", tone: "live", value: APP_DATA.platformStatus.filter((item) => item.tone === "live").length },
    { label: "Archived", tone: "paused", value: APP_DATA.platformStatus.filter((item) => item.tone === "paused").length },
    { label: "Context", tone: "context", value: APP_DATA.platformStatus.filter((item) => item.tone === "context").length },
    { label: "Support", tone: "curated", value: APP_DATA.platformStatus.filter((item) => item.tone === "curated").length }
  ];
  const executionTabs = buttonGroup([
    { label: "Overview", value: "overview" },
    { label: "Surface Detail", value: "surfaces" },
    { label: "Runtime Control", value: "relaunch" }
  ], state.executionView, "data-execution-view");

  const overviewView = `
    ${contextBar([
      { label: "AWS runtime", value: "Rebuilt" },
      { label: "Residual cost", value: "Controlled" },
      { label: "Archive state", value: "Ready" },
      { label: "Review mode", value: "Validated + synthetic" }
    ])}
    <div class="grid two-col">
      ${card("Runtime Metrics", statGrid(APP_DATA.awsCurrentMetrics), "AWS State")}
      ${card("Proof Posture", `
        ${stackedMeter(postureCounts)}
        <p class="section-intro">The environment is intentionally split between validated lab surfaces, synthetic replay, contextual panels, and supplementary support.</p>
      `, "Coverage")}
    </div>
    <div class="grid two-col">
      ${card("Environment Posture", `
        <div class="status-grid">
          ${APP_DATA.truthCards.map((item) => `
            <article class="status-box tone-${item.tone}">
              <span>${item.label}</span>
              <strong>${item.value}</strong>
              <small>${item.note}</small>
            </article>
          `).join("")}
        </div>
      `, "Current State")}
      ${card("AWS Runtime Status", `
        ${flowTrack(APP_DATA.currentAwsState.map((item) => ({ title: item })))}
      `, "AWS")}
    </div>
    ${card("Runtime Decision Path", signalChain([
      { title: "Prepare surfaces", note: "Confirm the audit, secrets, runtime, and forwarding path" },
      { title: "Verify telemetry", note: "Confirm logs, secrets access, and workload telemetry are real" },
      { title: "Archive proof", note: "Keep archived screenshots and mapped evidence as the fallback layer" },
      { title: "Control cost", note: "Keep teardown-ready notes for billable runtime after the review" }
    ]), "Operations")}
  `;

  const surfaceView = `
    ${contextBar([
      { label: "Selected surface", value: platform.name },
      { label: "Status", value: platform.status },
      { label: "Tone", value: platform.tone === "live" ? "Validated" : platform.tone === "paused" ? "Archived" : platform.tone === "context" ? "Context" : "Support" },
      { label: "Proof image", value: "Available" }
    ])}
    ${card("Platform Inventory", `
      <div class="platform-layout">
        <div class="platform-list">
          ${APP_DATA.platformStatus.map((item) => `
            <button class="list-button${item.name === platform.name ? " active" : ""}" type="button" data-platform-name="${item.name}">
              <strong>${item.name}</strong>
              <span>${item.status}</span>
            </button>
          `).join("")}
        </div>
        <div class="platform-detail">
          ${mediaPanel({ ...platform, title: platform.name, description: platform.detail })}
          <div class="detail-copy">
            <h4>${platform.name}</h4>
            <p>${platform.status}</p>
            <p>${platform.detail}</p>
          </div>
        </div>
      </div>
    `, "Platforms")}
    <div class="grid two-col">
      ${card("Execution Constraints", listHtml(APP_DATA.executionCautions), "Operator Rules")}
      ${card("Guardrails", `
        ${listHtml(APP_DATA.guardrails)}
        ${pillGrid(APP_DATA.platformNames)}
      `, "Integrity")}
    </div>
    ${card("Surface State Table", compactTable(
      ["Surface", "State", "Purpose"],
      APP_DATA.platformStatus.map((item) => [item.name, item.status, item.detail])
    ), "Inventory")}
  `;

  const relaunchView = `
    ${contextBar([
      { label: "Runtime control", value: "Focused" },
      { label: "Cloud rebuild", value: "Completed" },
      { label: "Runtime target", value: "AWS + Datadog lab path" },
      { label: "Cleanup rule", value: "Delete after validation" }
    ])}
    <div class="grid two-col">
      ${card("AWS Runtime Sequence", `
        <ol class="number-list">
          ${APP_DATA.closeoutPlan.relaunch.map((item) => `<li>${item}</li>`).join("")}
        </ol>
      `, "Runbook")}
      ${card("Runtime Scope", taxonomyGrid([
        { label: "Keep live", value: "CloudTrail / Secrets / EKS", note: "These rebuilt surfaces now support technical validation directly" },
        { label: "Keep honest", value: "Identity / workspace feeds", note: "Datadog-style queries, monitors, and signals are verified; context panels are not native feed claims" },
        { label: "Do not overclaim", value: "Detection content restored", note: "Data sources existing is not the same as rule coverage" },
        { label: "Retirement", value: "Delete again", note: "Return the account to a lower-cost baseline after validation" }
      ]), "Control")}
    </div>
    ${card("Review Control Board", matrixTable(
      ["Before review", "During review", "After review"],
      [
        { label: "AWS state", values: ["Validated lab surfaces", "Dashboard plus optional console proof", "Public-safe archive remains"] },
        { label: "Proof source", values: ["Dashboard plus evidence visuals", "Dashboard plus query pivots", "Evidence map remains primary record"] },
        { label: "Risk posture", values: ["Cost watched", "Controlled live exposure", "Account returns to safe baseline"] }
      ]
    ), "Operations")}
  `;

  return `
    ${executionTabs}
    ${state.executionView === "overview" ? overviewView : ""}
    ${state.executionView === "surfaces" ? surfaceView : ""}
    ${state.executionView === "relaunch" ? relaunchView : ""}
  `;
};

const renderEvidence = (state, actions) => {
  const group = APP_DATA.evidenceGroups.find((item) => item.id === state.evidenceGroupId) || APP_DATA.evidenceGroups[0];
  const evidence = group.items.find((item) => item.id === state.evidenceItemId) || group.items[0];

  return `
    ${contextBar([
      { label: "Evidence group", value: group.label },
      { label: "Artifacts", value: String(group.items.length) },
      { label: "Selected item", value: evidence.title },
      { label: "Use case", value: evidence.useCase }
    ])}
    <div class="grid two-col">
      ${card("Catalog Metrics", statGrid([
        { label: "Evidence groups", value: String(APP_DATA.evidenceGroups.length), note: "Identity, cloud, runtime, endpoint, and workflow" },
        { label: "Group artifacts", value: String(group.items.length), note: "Items available in the selected group" },
        { label: "Mapped archive", value: "18", note: "Artifacts mapped across the full proof package" },
        { label: "Selected use case", value: evidence.useCase, note: "Current drill-down target" }
      ]), "Inventory")}
      ${card("Artifact Table", compactTable(
        ["Artifact", "Use case", "Group"],
        group.items.map((item) => [item.title, item.useCase, group.label])
      ), "Selection Grid")}
    </div>
    ${card("Evidence Group Navigation", `
      <div class="evidence-layout">
        <div class="group-list">
          ${APP_DATA.evidenceGroups.map((item) => `
            <button class="list-button${item.id === group.id ? " active" : ""}" type="button" data-group-id="${item.id}">
              <strong>${item.label}</strong>
              <span>${item.summary}</span>
            </button>
          `).join("")}
        </div>
        <div class="evidence-detail">
          ${mediaPanel(evidence)}
          <div class="detail-copy">
            <h4>${evidence.title}</h4>
            <p>${evidence.description}</p>
            <div class="meta-grid">
              <div><span>Use case</span><strong>${evidence.useCase}</strong></div>
              <div><span>Group</span><strong>${group.label}</strong></div>
            </div>
          </div>
        </div>
      </div>
    `, "Evidence")}
    ${card("Artifacts In Group", `
      <div class="thumb-grid">
        ${group.items.map((item) => `
          <button class="thumb-card${item.id === evidence.id ? " active" : ""}" type="button" data-item-id="${item.id}">
            <img src="${item.image}" alt="${item.title}">
            <div>
              <strong>${item.title}</strong>
              <span>${item.useCase}</span>
            </div>
          </button>
        `).join("")}
      </div>
    `, "Selection")}
    ${card("Evidence Handling Rules", `
      <div class="callout-list">
        <article class="callout">Map the artifact to the scenario before opening any live tabs.</article>
        <article class="callout">Use the archive when re-authentication or runtime cost would interrupt the review.</article>
        <article class="callout">Treat screenshots as proof anchors that support the technical explanation.</article>
      </div>
    `, "Process")}
    ${card("Evidence Flow", flowTrack([
      { title: "Select group", note: "Identity, cloud, runtime, endpoint, or workflow" },
      { title: "Review artifact", note: "Read the screenshot in technical context" },
      { title: "Map use case", note: "Tie the proof to the correct scenario" },
      { title: "Open live tab", note: "Only if it strengthens the explanation" }
    ]), "Flow")}
    ${card("Artifact Distribution", taxonomyGrid([
      { label: "Identity artifacts", value: "2", note: "Identity and workspace admin proof" },
      { label: "Cloud artifacts", value: "4", note: "CloudTrail, S3, and Datadog" },
      { label: "Runtime artifacts", value: "4", note: "EKS and Secrets capture set" },
      { label: "Endpoint and workflow", value: "9", note: "MongoDB, support panels, and review visuals" }
    ]), "Catalog")}
  `;
};

const renderLogic = (state) => {
  const scenario = APP_DATA.scenarios.find((item) => item.id === state.scenarioId) || APP_DATA.scenarios[0];
  const inferredSurfaces = scenario.proof.length;

  const tabContent = {
    logic: listHtml(scenario.logic),
    proof: listHtml(scenario.proof),
    query: `<pre class="code-block"><code>${scenario.query}</code></pre>`,
    response: `<div class="text-block"><p>${scenario.response}</p></div>`
  };

  return `
    ${contextBar([
      { label: "Scenario", value: scenario.title },
      { label: "Domain fit", value: scenario.labFit },
      { label: "Proof items", value: String(inferredSurfaces) },
      { label: "Current view", value: state.logicView.charAt(0).toUpperCase() + state.logicView.slice(1) }
    ])}
    <div class="grid two-col">
      ${card("Scenario Metrics", statGrid([
        { label: "Logic steps", value: String(scenario.logic.length), note: "Trigger to escalation path" },
        { label: "Proof points", value: String(scenario.proof.length), note: "Mapped evidence items" },
        { label: "Response model", value: "Defined", note: "Judgment and response included" },
        { label: "Query readiness", value: "Ready", note: "CLI or query path is included" }
      ]), "Engineering")}
      ${card("Scenario Summary Grid", compactTable(
        ["Component", "Detail"],
        [
          ["Lab fit", scenario.labFit],
          ["Execution truth", scenario.executionTruth],
          ["Operator judgment", scenario.operatorJudgment],
          ["Response posture", scenario.response]
        ]
      ), "Scenario Board")}
    </div>
    ${card("Scenario Selector", `
      <div class="scenario-grid">
        ${APP_DATA.scenarios.map((item) => `
          <button class="scenario-card${item.id === scenario.id ? " active" : ""}" type="button" data-scenario-id="${item.id}">
            <strong>${item.title}</strong>
            <span>${item.labFit}</span>
          </button>
        `).join("")}
      </div>
    `, "Scenarios")}
    ${card(scenario.title, `
      <p class="section-intro">${scenario.executionTruth}</p>
      ${flowTrack(scenario.logic.map((item) => ({ title: item })))}
      ${buttonGroup([
        { label: "Logic", value: "logic" },
        { label: "Proof", value: "proof" },
        { label: "Query", value: "query" },
        { label: "Response", value: "response" }
      ], state.logicView, "data-logic-view")}
      <div class="grid two-col align-start">
        <div>
          ${tabContent[state.logicView]}
        </div>
        <div class="side-panel">
          <h4>Operator Judgment</h4>
          <p>${scenario.operatorJudgment}</p>
          ${mediaPanel({ title: scenario.title, image: scenario.image, description: scenario.labFit })}
        </div>
      </div>
    `, scenario.labFit)}
    ${card("Scenario Engineering Map", signalChain([
      { title: "Trigger", note: scenario.logic[0] || "" },
      { title: "Correlate", note: scenario.logic[1] || "" },
      { title: "Materialize", note: scenario.logic[2] || "" },
      { title: "Escalate", note: scenario.logic[3] || "" }
    ]), "Detection Path")}
  `;
};

const renderCloseout = (state) => {
  const currentItems =
    state.closeoutView === "run" ? APP_DATA.closeoutPlan.openSequence :
    state.closeoutView === "relaunch" ? APP_DATA.closeoutPlan.relaunch :
    APP_DATA.closeoutPlan.backups;

  return `
    ${contextBar([
      { label: "Mode", value: state.closeoutView === "run" ? "Review sequence" : state.closeoutView === "relaunch" ? "Runtime control" : "Archive" },
      { label: "Primary surface", value: "Dashboard" },
      { label: "Fallback", value: "Evidence archive" },
      { label: "Review risk", value: "Controlled" }
    ])}
    <div class="grid two-col">
      ${card("Readiness Metrics", statGrid([
        { label: "Review stages", value: "5", note: "Scope to closeout" },
        { label: "Primary proof tabs", value: String(APP_DATA.closeoutPlan.liveTabs.length), note: "Only open when they add proof" },
        { label: "Archive artifacts", value: String(APP_DATA.closeoutPlan.backups.length), note: "Ready if any external tab slows down" },
        { label: "Control tasks", value: String(APP_DATA.closeoutPlan.relaunch.length), note: "Concrete runtime-control tasks for the public lab environment" }
      ]), "Control")}
      ${card("Execution Board", compactTable(
        ["Step", "Primary surface", "Fallback"],
        [
          ["Open", "Dashboard home and stage navigation", "None needed"],
          ["Evidence", "Evidence Catalog", "Archived screenshots"],
          ["Logic", "Detection Engineering", "Query appendix"],
          ["Closeout", "Validation Closeout", "Timeline and archive"]
        ]
      ), "Sequence")}
    </div>
    ${card("Review Runbook", `
      ${buttonGroup([
        { label: "Review Sequence", value: "run" },
        { label: "Runtime Control", value: "relaunch" },
        { label: "Archive", value: "backups" }
      ], state.closeoutView, "data-closeout-view")}
      <ol class="number-list">
        ${currentItems.map((item) => `<li>${item}</li>`).join("")}
      </ol>
    `, "Runbook")}
    ${card("Review Sequence", flowTrack([
      { title: "Open dashboard", note: "Use this as the main review surface" },
      { title: "Evidence drill-in", note: "Show artifacts before external tabs" },
      { title: "Detection logic", note: "Walk scenarios in lab order" },
      { title: "Optional context", note: "External tabs only where helpful" },
      { title: "Closeout", note: "Runtime-control and fallback plan" }
    ]), "Flow")}
    <div class="grid two-col">
      ${card("Primary Proof Tabs", listHtml(APP_DATA.closeoutPlan.liveTabs), "Proof Tabs")}
      ${card("Operational Constraints", `
        <ul class="bullet-list">
          <li>Use the dashboard as the primary review surface.</li>
          <li>Open vendor tabs only when they add proof or context.</li>
          <li>Keep validated, context, supporting, and synthetic surfaces labeled before opening tabs.</li>
          <li>Keep the screenshot archive ready as the fallback proof package.</li>
        </ul>
      `, "Constraints")}
    </div>
    ${card("Review Control Model", matrixTable(
      ["Primary surface", "Optional live tab", "Fallback"],
      [
        { label: "Identity review", values: ["Dashboard + evidence group", "Identity / workspace context", "Evidence archive"] },
        { label: "Cloud review", values: ["Dashboard + logic stage", "AWS / Datadog-style proof", "Cloud proof visuals"] },
        { label: "Runtime review", values: ["Dashboard + runtime status", "EKS live view", "Archived EKS proof"] },
        { label: "Closeout", values: ["Validation closeout stage", "None required", "Timeline visual"] }
      ]
    ), "Run Control")}
  `;
};

const bindLightbox = () => {
  const lightbox = document.getElementById("lightbox");
  const image = document.getElementById("lightbox-image");
  const title = document.getElementById("lightbox-title");
  const description = document.getElementById("lightbox-description");

  document.body.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-lightbox-image]");
    if (!trigger) return;
    image.src = trigger.dataset.lightboxImage;
    image.alt = trigger.dataset.lightboxTitle || "";
    title.textContent = trigger.dataset.lightboxTitle || "";
    description.textContent = trigger.dataset.lightboxDescription || "";
    lightbox.showModal();
  });
};

const renderSummaryStrip = () => {
  const node = document.getElementById("summary-strip");
  const accents = ["blue", "teal", "amber", "red"];
  node.innerHTML = APP_DATA.overviewStats.map((item, index) => `
    <article class="summary-card accent-${accents[index] || "blue"}">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
      <small>${item.note}</small>
      <div class="mini-bars" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
    </article>
  `).join("");
};

const renderStageRail = (state, goToStage) => {
  const node = document.getElementById("stage-rail");
  node.replaceChildren();

  STAGES.forEach((stage) => {
    const button = el("button", `nav-item${stage.id === state.stageId ? " active" : ""}`);
    button.type = "button";
    button.innerHTML = `
      <span class="nav-item-index">${String(stage.index).padStart(2, "0")}</span>
      <span class="nav-item-copy">
        <strong>${stage.title}</strong>
        <small>${stage.summary}</small>
      </span>
    `;
    button.addEventListener("click", () => goToStage(stage.id));
    node.append(button);
  });
};

const renderStageFrame = (state) => {
  const stage = stageById(state.stageId);
  document.getElementById("stage-kicker").textContent = `Stage ${String(stage.index).padStart(2, "0")}`;
  document.getElementById("stage-title").textContent = stage.title;
  document.getElementById("stage-summary").textContent = stage.summary;
  document.getElementById("stage-progress-label").textContent = `Stage ${stage.index} of ${STAGES.length}`;
  document.getElementById("prev-stage").disabled = stage.index === 1;
  document.getElementById("next-stage").disabled = stage.index === STAGES.length;
};

const renderStageBody = (state, actions) => {
  const node = document.getElementById("stage-body");
  let html = "";

  switch (state.stageId) {
    case "brief":
      html = renderBrief();
      break;
    case "execution":
      html = renderExecution(state, actions);
      break;
    case "evidence":
      html = renderEvidence(state, actions);
      break;
    case "logic":
      html = renderLogic(state);
      break;
    case "closeout":
      html = renderCloseout(state);
      break;
    default:
      html = renderBrief();
  }

  node.innerHTML = html;

  node.querySelectorAll("[data-platform-name]").forEach((button) => {
    button.addEventListener("click", () => actions.selectExecutionPlatform(button.dataset.platformName));
  });
  node.querySelectorAll("[data-execution-view]").forEach((button) => {
    button.addEventListener("click", () => actions.selectExecutionView(button.dataset.executionView));
  });
  node.querySelectorAll("[data-group-id]").forEach((button) => {
    button.addEventListener("click", () => actions.selectEvidenceGroup(button.dataset.groupId));
  });
  node.querySelectorAll("[data-item-id]").forEach((button) => {
    button.addEventListener("click", () => actions.selectEvidenceItem(button.dataset.itemId));
  });
  node.querySelectorAll("[data-scenario-id]").forEach((button) => {
    button.addEventListener("click", () => actions.selectScenario(button.dataset.scenarioId));
  });
  node.querySelectorAll("[data-logic-view]").forEach((button) => {
    button.addEventListener("click", () => actions.selectLogicView(button.dataset.logicView));
  });
  node.querySelectorAll("[data-closeout-view]").forEach((button) => {
    button.addEventListener("click", () => actions.selectCloseoutView(button.dataset.closeoutView));
  });
};

window.DashboardRender = {
  bindLightbox,
  renderSummaryStrip,
  renderStageRail,
  renderStageFrame,
  renderStageBody
};
})();
