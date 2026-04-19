const http = require('http');
const path = require('path');
const { spawn } = require('child_process');
const { chromium } = require('@playwright/test');

const frontendDir = path.resolve(__dirname, '..');
const port = 5179;
const baseUrl = `http://127.0.0.1:${port}`;

function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const tryRequest = () => {
      const request = http.get(url, (response) => {
        response.resume();
        if (response.statusCode && response.statusCode < 500) {
          resolve();
          return;
        }

        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Timed out waiting for ${url}. Last status: ${response.statusCode}`));
          return;
        }

        setTimeout(tryRequest, 500);
      });

      request.on('error', () => {
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Timed out waiting for ${url}.`));
          return;
        }

        setTimeout(tryRequest, 500);
      });
    };

    tryRequest();
  });
}

async function run() {
  const viteBin = path.join(frontendDir, 'node_modules', 'vite', 'bin', 'vite.js');
  const devServer = spawn(process.execPath, [viteBin, '--host', '127.0.0.1'], {
    cwd: frontendDir,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: false
  });

  let browser;

  try {
    devServer.stderr.on('data', (chunk) => {
      const output = chunk.toString();
      if (!output.includes('VITE')) {
        process.stderr.write(output);
      }
    });

    await waitForServer(baseUrl);

    browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    const heading = page.getByRole('heading', { name: 'ToDo App (React + Node)' });
    const titleInput = page.getByLabel('Task title');

    await heading.waitFor();
    await titleInput.waitFor();

    console.log('Smoke test passed: frontend dev server started and the page loaded.');
  } finally {
    if (browser) {
      await browser.close();
    }

    if (!devServer.killed) {
      devServer.kill();
    }
  }
}

run().catch((error) => {
  console.error('Smoke test failed.');
  console.error(error);
  process.exitCode = 1;
});
