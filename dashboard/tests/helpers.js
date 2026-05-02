const { expect } = require("@playwright/test");

const STAGES = [
  { title: "System Scope", progress: "Stage 1 of 5" },
  { title: "Environment Status", progress: "Stage 2 of 5" },
  { title: "Evidence Catalog", progress: "Stage 3 of 5" },
  { title: "Detection Engineering", progress: "Stage 4 of 5" },
  { title: "Validation Closeout", progress: "Stage 5 of 5" }
];

function collectPageProblems(page) {
  const problems = [];

  // Console policy: fail on console.error and unhandled page errors only.
  page.on("console", (message) => {
    if (message.type() === "error") {
      problems.push(`console.error: ${message.text()}`);
    }
  });

  page.on("pageerror", (error) => {
    problems.push(`pageerror: ${error.message}`);
  });

  return problems;
}

function expectCleanPage(problems) {
  expect(problems).toEqual([]);
}

async function gotoDashboard(page) {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Security Operations Detection Lab" })).toBeVisible();
  await expect(page.locator("#stage-rail .nav-item")).toHaveCount(STAGES.length);
}

async function expectStageFrame(page, stageIndex) {
  const stage = STAGES[stageIndex];

  await expect(page.locator("#stage-title")).toHaveText(stage.title);
  await expect(page.locator("#stage-progress-label")).toHaveText(stage.progress);
}

async function openStage(page, title) {
  await page.locator("#stage-rail .nav-item").filter({ hasText: title }).click();
  await expect(page.locator("#stage-title")).toHaveText(title);
}

async function expectImagesLoaded(images) {
  const count = await images.count();
  expect(count).toBeGreaterThan(0);

  for (let index = 0; index < count; index += 1) {
    const image = images.nth(index);
    await expect(image).toBeVisible();
    await expect(image).toHaveJSProperty("complete", true);

    const size = await image.evaluate((node) => ({
      width: node.naturalWidth,
      height: node.naturalHeight
    }));

    expect(size.width).toBeGreaterThan(0);
    expect(size.height).toBeGreaterThan(0);
  }
}

module.exports = {
  STAGES,
  collectPageProblems,
  expectCleanPage,
  gotoDashboard,
  expectStageFrame,
  expectImagesLoaded,
  openStage
};
