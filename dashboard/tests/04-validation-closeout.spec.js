const { test, expect } = require("@playwright/test");
const {
  collectPageProblems,
  expectCleanPage,
  gotoDashboard,
  openStage
} = require("./helpers");

const closeoutViews = [
  {
    id: "run",
    mode: "Review sequence",
    expectedText: "The dashboard remains the evidence-led technical review surface."
  },
  {
    id: "relaunch",
    mode: "Runtime control",
    expectedText: "Use the public-safe dashboard as the primary run surface"
  },
  {
    id: "backups",
    mode: "Archive",
    expectedText: "okta-system-log-view.png"
  }
];

test("switches validation closeout runbook views", async ({ page }) => {
  const problems = collectPageProblems(page);

  await gotoDashboard(page);
  await openStage(page, "Validation Closeout");

  for (const view of closeoutViews) {
    await page.locator(`[data-closeout-view="${view.id}"]`).click();

    await expect(page.locator(".context-chip").filter({ hasText: "Mode" })).toContainText(view.mode);
    await expect(page.locator(".number-list")).toContainText(view.expectedText);
  }

  expectCleanPage(problems);
});
