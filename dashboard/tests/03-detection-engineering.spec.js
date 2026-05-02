const { test, expect } = require("@playwright/test");
const {
  collectPageProblems,
  expectCleanPage,
  gotoDashboard,
  openStage
} = require("./helpers");

const scenarios = [
  {
    id: "identity_account_takeover",
    title: "Identity Account Takeover",
    fit: "Identity + SaaS admin correlation"
  },
  {
    id: "aws_iam_key_misuse",
    title: "AWS Credential Misuse",
    fit: "Cloud control-plane misuse against privileged roles and protected secrets"
  },
  {
    id: "eks_secret_access_chain",
    title: "EKS Secret Access Chain",
    fit: "Runtime to cloud credential and secret access chain"
  },
  {
    id: "endpoint_to_mongodb_pivot",
    title: "Endpoint to MongoDB Pivot",
    fit: "Endpoint compromise flowing into database access"
  },
  {
    id: "s3_data_access_exfiltration",
    title: "S3 Data Access Exfiltration",
    fit: "Sensitive bucket access and data movement review for high-value cloud data"
  }
];

test("switches detection scenarios and exposes logic proof query and response views", async ({ page }) => {
  const problems = collectPageProblems(page);

  await gotoDashboard(page);
  await openStage(page, "Detection Engineering");

  for (const scenario of scenarios) {
    await page.locator(`[data-scenario-id="${scenario.id}"]`).click();

    await expect(page.locator(".context-chip").filter({ hasText: "Scenario" })).toContainText(scenario.title);
    await expect(page.locator("#stage-body")).toContainText(scenario.fit);
  }

  await page.locator('[data-scenario-id="eks_secret_access_chain"]').click();

  await page.locator('[data-logic-view="logic"]').click();
  await expect(page.locator("#stage-body")).toContainText("Unexpected pod, token, or service-account activity");

  await page.locator('[data-logic-view="proof"]').click();
  await expect(page.locator("#stage-body")).toContainText("Secrets Manager visual");

  await page.locator('[data-logic-view="query"]').click();
  await expect(page.locator(".code-block")).toBeVisible();
  await expect(page.locator(".code-block")).toContainText("GetSecretValue");

  await page.locator('[data-logic-view="response"]').click();
  await expect(page.locator("#stage-body")).toContainText("Contain the namespace or service account");

  expectCleanPage(problems);
});
