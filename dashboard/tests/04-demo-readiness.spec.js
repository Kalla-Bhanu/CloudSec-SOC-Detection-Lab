const { test, expect } = require("@playwright/test");
const {
  collectPageProblems,
  expectCleanPage,
  gotoDashboard,
  openStage
} = require("./helpers");

const demoViews = [
  {
    id: "run",
    mode: "Run order",
    expectedText: "Open the dashboard first and frame it as an evidence-led technical review."
  },
  {
    id: "relaunch",
    mode: "Runtime control",
    expectedText: "Use the public-safe dashboard as the primary run surface"
  },
  {
    id: "backups",
    mode: "Backups",
    expectedText: "okta-system-log-view.png"
  }
];

test("switches demo readiness runbook views", async ({ page }) => {
  const problems = collectPageProblems(page);

  await gotoDashboard(page);
  await openStage(page, "Demo Readiness");

  for (const view of demoViews) {
    await page.locator(`[data-demo-view="${view.id}"]`).click();

    await expect(page.locator(".context-chip").filter({ hasText: "Mode" })).toContainText(view.mode);
    await expect(page.locator(".number-list")).toContainText(view.expectedText);
  }

  expectCleanPage(problems);
});
