'use strict';

const http = require('http');
const {spawn} = require('child_process');

const port = process.env.INTEGRATION_PORT || '8081';
const baseUrl = `http://127.0.0.1:${port}`;
const testPattern = process.env.TEST_PATTERN || 'test/_integration/**/*.spec.js';
const environment = Object.assign({}, process.env, {
  NODE_ENV: 'ci',
  PORT: port,
  REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
  REDIS_PORT: process.env.REDIS_PORT || '6379',
  SESSION_SECRET: process.env.SESSION_SECRET || 'integration-test-session-secret1',
  NOTIFY_KEY: process.env.NOTIFY_KEY || 'USE_MOCK',
  INTEGRATION_BASE_URL: baseUrl
});

const app = spawn(process.execPath, ['server.js'], {
  env: environment,
  stdio: 'inherit'
});

const waitForReady = () => new Promise((resolve, reject) => {
  const deadline = Date.now() + 30000;

  const check = () => {
    const request = http.get(`${baseUrl}/healthz/readiness`, response => {
      response.resume();
      if (response.statusCode === 200) {
        resolve();
      } else if (Date.now() >= deadline) {
        reject(new Error(`Application readiness returned ${response.statusCode}`));
      } else {
        setTimeout(check, 250);
      }
    });

    request.on('error', error => {
      if (Date.now() >= deadline) {
        reject(error);
      } else {
        setTimeout(check, 250);
      }
    });
  };

  check();
});

const runTests = () => new Promise(resolve => {
  const mocha = spawn(process.execPath, [
    require.resolve('mocha/bin/mocha.js'),
    '--require',
    'test/setup.js',
    testPattern
  ], {
    env: environment,
    stdio: 'inherit'
  });

  mocha.on('exit', exitCode => resolve(exitCode || 0));
});

const stopApp = () => new Promise(resolve => {
  if (app.exitCode !== null) {
    resolve();
    return;
  }

  app.once('exit', resolve);
  app.kill('SIGTERM');
  setTimeout(() => {
    if (app.exitCode === null) {
      app.kill('SIGKILL');
    }
  }, 5000).unref();
});

const main = async () => {
  let exitCode = 1;

  try {
    await waitForReady();
    exitCode = await runTests();
  } catch (error) {
    process.stderr.write(`${error.stack || error}\n`);
  } finally {
    await stopApp();
  }

  process.exitCode = exitCode;
};

app.once('exit', exitCode => {
  if (exitCode && process.exitCode === undefined) {
    process.exitCode = exitCode;
  }
});

main();
