const { test, expect } = require("@playwright/test");
const {
  collectPageProblems,
  expectCleanPage,
  expectImagesLoaded,
  gotoDashboard,
  openStage
} = require("./helpers");

const evidenceGroups = [
  { id: "identity", label: "Identity and Admin", firstTitle: "Identity System Log" },
  { id: "cloud", label: "Cloud and Detection", firstTitle: "CloudTrail Key Misuse View" },
  { id: "runtime", label: "Runtime and Secrets", firstTitle: "EKS Active Cluster" },
  { id: "endpoint", label: "Endpoint and Data", firstTitle: "Endpoint Process Tree" },
  { id: "harness", label: "Detection Test Harness", firstTitle: "Datadog Test Harness View" },
  { id: "workflow", label: "Coverage and Workflow", firstTitle: "Architecture Coverage Map" }
];

test("switches evidence groups and keeps artifact images loadable", async ({ page }) => {
  const problems = collectPageProblems(page);

  await gotoDashboard(page);
  await openStage(page, "Evidence Catalog");

  for (const group of evidenceGroups) {
    await page.locator(`[data-group-id="${group.id}"]`).click();

    await expect(page.locator(".context-chip").filter({ hasText: "Evidence group" })).toContainText(group.label);
    await expect(page.locator(".evidence-detail h4")).toHaveText(group.firstTitle);
    await expectImagesLoaded(page.locator("#stage-body .evidence-detail img"));
    await expectImagesLoaded(page.locator("#stage-body .thumb-card img"));
  }

  expectCleanPage(problems);
});
