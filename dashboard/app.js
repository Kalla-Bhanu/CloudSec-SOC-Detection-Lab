(() => {
const {
  APP_DATA,
  STAGES,
  firstEvidenceGroupId,
  firstEvidenceItemId,
  firstScenarioId
} = window.DashboardData;
const {
  bindLightbox,
  renderStageBody,
  renderStageFrame,
  renderStageRail,
  renderSummaryStrip
} = window.DashboardRender;

const state = {
  stageId: STAGES[0].id,
  evidenceGroupId: firstEvidenceGroupId,
  evidenceItemId: firstEvidenceItemId,
  scenarioId: firstScenarioId,
  executionPlatform: APP_DATA.platformStatus[0].name,
  executionView: "overview",
  demoView: "run",
  logicView: "logic"
};

const currentIndex = () => STAGES.findIndex((stage) => stage.id === state.stageId);

const render = () => {
  renderSummaryStrip();
  renderStageRail(state, goToStage);
  renderStageFrame(state);
  renderStageBody(state, {
    selectExecutionPlatform,
    selectExecutionView,
    selectEvidenceGroup,
    selectEvidenceItem,
    selectScenario,
    selectLogicView,
    selectDemoView
  });
};

const goToStage = (stageId) => {
  if (stageId === state.stageId) return;
  state.stageId = stageId;
  render();
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
};

const stepStage = (direction) => {
  const nextIndex = Math.min(STAGES.length - 1, Math.max(0, currentIndex() + direction));
  goToStage(STAGES[nextIndex].id);
};

const selectExecutionPlatform = (platformName) => {
  state.executionPlatform = platformName;
  render();
};

const selectExecutionView = (executionView) => {
  state.executionView = executionView;
  render();
};

const selectEvidenceGroup = (groupId) => {
  state.evidenceGroupId = groupId;
  const group = APP_DATA.evidenceGroups.find((item) => item.id === groupId);
  state.evidenceItemId = group?.items[0]?.id || firstEvidenceItemId;
  render();
};

const selectEvidenceItem = (itemId) => {
  state.evidenceItemId = itemId;
  render();
};

const selectScenario = (scenarioId) => {
  state.scenarioId = scenarioId;
  render();
};

const selectLogicView = (logicView) => {
  state.logicView = logicView;
  render();
};

const selectDemoView = (demoView) => {
  state.demoView = demoView;
  render();
};

const bindControls = () => {
  document.getElementById("prev-stage").addEventListener("click", () => stepStage(-1));
  document.getElementById("next-stage").addEventListener("click", () => stepStage(1));

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") stepStage(1);
    if (event.key === "ArrowLeft") stepStage(-1);
  });
};

const init = () => {
  bindLightbox();
  bindControls();
  render();
};

init();
})();
