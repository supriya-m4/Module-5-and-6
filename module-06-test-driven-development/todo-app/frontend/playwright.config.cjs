const path = require('path');
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  testMatch: /.*\.playwright\.spec\.js/,
  timeout: 30000,
  use: {
    baseURL: 'http://127.0.0.1:5179'
  },
  webServer: [
    {
      command: 'npm run start',
      cwd: path.resolve(__dirname, '../backend'),
      env: {
        ...process.env,
        PORT: '5100'
      },
      url: 'http://127.0.0.1:5100/tasks',
      reuseExistingServer: !process.env.CI,
      timeout: 30000
    },
    {
      command: 'npm run start -- --host 127.0.0.1 --port 5179',
      cwd: __dirname,
      env: {
        ...process.env,
        VITE_API_BASE: 'http://127.0.0.1:5100'
      },
      url: 'http://127.0.0.1:5179',
      reuseExistingServer: !process.env.CI,
      timeout: 30000
    }
  ]
});
