import { defineConfig, devices } from '@playwright/test';
import * as os from 'os';

export default defineConfig({
  testDir: './tests',
  outputDir: './output/test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['line'],
    ['html', { open: 'on-failure', outputFolder: './output/test-reports' }],
    ['allure-playwright', {
      resultsDir: './output/allure-results', // Dossier où les résultats bruts seront stockés
      outputFolder: './output/allure-reports', // Dossier où le rapport final sera généré
      environmentInfo: {
        framework: 'Sauce Demo Playwright',
        os_platform: os.platform(),
        os_release: os.release(),
        os_version: os.version(),
        os_architecture: os.arch(),
        node_version: process.version,
      }
    }]
    ],
    
    use: {
    baseURL: 'https://www.saucedemo.com/',
    testIdAttribute: 'data-test',
  

    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

});
