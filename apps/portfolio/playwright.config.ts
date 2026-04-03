import { defineConfig, devices } from '@playwright/test'

/** Firefox project: Chromium headless-shell install is flaky in some CI/sandbox setups; overflow checks are engine-agnostic. */
export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'firefox', use: { ...devices['Desktop Firefox'] } }],
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  },
})
