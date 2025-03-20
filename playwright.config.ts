import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  snapshotPathTemplate: './tests/tests_visual/screenshots/{arg}{ext}',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com',
    testIdAttribute: 'data-test',
    video : 'retain-on-failure',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
        name: 'setup',
        use: { ...devices['Desktop Chrome'] },
        testMatch: '**/*.setup.ts',
    },
        {
            name: 'Standard User',
            testMatch: '**/tests_e2e/*.spec.ts', 
            testIgnore : '**/tests_e2e/login.spec.ts', 
            use: {
                ...devices['Desktop Chrome'],
                storageState: '.auth/standard_user.json',
            },
            dependencies: ['setup'],
        },
        {
            name: 'Error User',
            testMatch: '**/tests_e2e/*.spec.ts', 
            testIgnore : '**/tests_e2e/login.spec.ts',
            use: {
                ...devices['Desktop Chrome'],
                storageState: '.auth/error_user.json',
            },
            dependencies: ['setup'],
        },
        {
            name: 'Login Tests',
            testMatch: '**/tests_e2e/login.spec.ts',
            use: {
              ...devices['Desktop Chrome'],
            },
        },
        {
            name: 'Visual',
            testMatch : '**/tests_visual/visual-ui.spec.ts',
            testIgnore : '**/tests_visual/base-visual.spec.ts',
            use: {
              ...devices['Desktop Chrome'],
            },
        },
],
});
