module.exports = {
  testDir: '.',
  timeout: 60000,
  retries: 2,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: '/app/test-results/e2e', open: 'never' }],
    ['junit', { outputFile: '/app/test-results/e2e/results.xml' }]
  ],
  use: {
    baseURL: 'http://frontend:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...require('@playwright/test').devices['Desktop Chrome'],
      },
    },
  ],
  webServer: null,
};
