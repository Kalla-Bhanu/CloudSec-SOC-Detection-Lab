const { test } = require("@playwright/test");
const {
  STAGES,
  collectPageProblems,
  expectCleanPage,
  gotoDashboard,
  openStage
} = require("./helpers");

test("emits no console errors or page errors during a full dashboard sweep", async ({ page }) => {
  const problems = collectPageProblems(page);

  await gotoDashboard(page);

  for (const stage of STAGES) {
    await openStage(page, stage.title);
  }

  await openStage(page, "Evidence Catalog");
  await page.locator('[data-group-id="cloud"]').click();
  await page.locator('[data-group-id="runtime"]').click();
  await openStage(page, "Detection Engineering");
  await page.locator('[data-scenario-id="eks_secret_access_chain"]').click();
  await page.locator('[data-logic-view="query"]').click();
  await openStage(page, "Validation Closeout");
  await page.locator('[data-closeout-view="backups"]').click();

  expectCleanPage(problems);
});
