const { test, expect } = require("@playwright/test");
const {
  STAGES,
  collectPageProblems,
  expectCleanPage,
  expectStageFrame,
  gotoDashboard
} = require("./helpers");

test("walks the dashboard stage frame from scope to demo readiness", async ({ page }) => {
  const problems = collectPageProblems(page);

  await gotoDashboard(page);
  await expectStageFrame(page, 0);
  await expect(page.locator("#prev-stage")).toBeDisabled();
  await expect(page.locator("#next-stage")).toBeEnabled();

  for (let index = 1; index < STAGES.length; index += 1) {
    await page.locator("#next-stage").click();
    await expectStageFrame(page, index);
  }

  await expect(page.locator("#prev-stage")).toBeEnabled();
  await expect(page.locator("#next-stage")).toBeDisabled();

  for (let index = STAGES.length - 2; index >= 0; index -= 1) {
    await page.locator("#prev-stage").click();
    await expectStageFrame(page, index);
  }

  await expect(page.locator("#prev-stage")).toBeDisabled();
  await expect(page.locator("#next-stage")).toBeEnabled();
  expectCleanPage(problems);
});
