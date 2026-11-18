import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export const AUTH_FILE = 'playwright/.auth/standard_user.json';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright'],
  ],
  use: {
    baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    // Logs in once through the UI and saves the session
    { name: 'setup', testMatch: /auth\.setup\.ts/ },

    // Authenticated tests reuse the saved session
    {
      name: 'chromium',
      testMatch: /(ui[\\/](inventory|cart|checkout)|hybrid[\\/].*)\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], storageState: AUTH_FILE },
      dependencies: ['setup'],
    },

    // Login tests start from a clean, logged out browser
    {
      name: 'chromium-anonymous',
      testMatch: /ui[\\/]login\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },

    { name: 'firefox', testMatch: /ui[\\/]login\.spec\.ts/, use: { ...devices['Desktop Firefox'] } },
  ],
});