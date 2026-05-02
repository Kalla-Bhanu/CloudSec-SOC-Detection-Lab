const { defineConfig, devices } = require("@playwright/test");

// Keep the smoke-test server clear of the dashboard's common local port.
const port = Number(process.env.DASHBOARD_TEST_PORT || 4175);
const baseURL = `http://127.0.0.1:${port}`;

module.exports = defineConfig({
  testDir: "./dashboard/tests",
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  retries: 0,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL,
    screenshot: "off",
    trace: "off",
    video: "off"
  },
  webServer: {
    command: "node dashboard/codex-static-server.js",
    env: {
      PORT: String(port)
    },
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});
