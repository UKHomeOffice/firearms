const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const crypto = require('node:crypto');
const dotenv = require('dotenv');
const { chromium } = require('playwright');

dotenv.config({ quiet: true });
const repository = path.resolve(__dirname, '../..');
const manifestPath = path.join(repository, 'e2e-tests/validation-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const cli = path.join(path.dirname(require.resolve('@playwright/test/package.json')), 'cli.js');
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://localhost:${process.env.PLAYWRIGHT_PORT || 8080}`;
const resultsRoot = path.join(repository, 'test-results/isolated');
const results = { baseURL, cases: [], fullRun: { result: 'NOT_RUN' } };

function save() {
  fs.mkdirSync(resultsRoot, { recursive: true });
  fs.writeFileSync(path.join(resultsRoot, 'validation-results.json'), JSON.stringify(results, null, 2) + '\n');
}

function run(id, selector) {
  const directory = path.join(resultsRoot, id);
  fs.mkdirSync(directory, { recursive: true });
  const reportPath = path.join(directory, 'report.json');
  const fullRun = !selector;
  const timeout = fullRun ? 60 * 60 * 1000 : 210_000;
  const args = [cli, 'test', ...(selector ? [selector] : []), '--project=chromium', '--workers=1', '--retries=0', `--global-timeout=${fullRun ? 0 : 180000}`, '--reporter=line,json', `--output=${path.join(directory, 'artifacts')}`];
  const started = Date.now();
  const result = spawnSync(process.execPath, args, {
    cwd: repository,
    env: { ...process.env, PLAYWRIGHT_BASE_URL: baseURL, PLAYWRIGHT_JSON_OUTPUT_NAME: reportPath },
    encoding: 'utf8',
    timeout,
    maxBuffer: 10 * 1024 * 1024,
  });
  const output = `${result.stdout || ''}\n${result.stderr || ''}`;
  process.stdout.write(output);
  fs.writeFileSync(path.join(directory, 'output.log'), output);
  return { result: result.status === 0 ? 'PASS' : 'FAIL', durationMs: Date.now() - started, report: reportPath, log: path.join(directory, 'output.log'), hung: result.error?.code === 'ETIMEDOUT' || /global timeout of/.test(output), environmentOutage: /ERR_CONNECTION_REFUSED|ECONNREFUSED|ENOTFOUND/.test(output), output };
}

async function main() {
  for (const feature of manifest.sourceFeatureHashes) {
    const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(repository, 'e2e-tests/features', feature.file))).digest('hex');
    if (hash !== feature.sha256) throw new Error('Feature inventory changed; rerun yarn test:e2e:parity before validation');
  }
  if (!fs.existsSync(chromium.executablePath())) throw new Error('Chromium is missing. Run yarn playwright install chromium.');
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const response = await page.goto(baseURL, { timeout: 15_000, waitUntil: 'domcontentloaded' });
    if (!response?.ok()) throw new Error(`Environment browser preflight returned HTTP ${response?.status() ?? 'no response'}; verify the app and its dependencies`);
  } finally {
    await browser.close();
  }
  console.log(`Preflight passed: ${baseURL}; ${manifest.cases.length} isolated cases`);
  if (process.argv.includes('--preflight')) return;
  for (const entry of manifest.cases) {
    console.log(`Running ${entry.id}: ${entry.scenario}; ${entry.dataSelection}`);
    const attempts = [run(entry.id, entry.selector)];
    if (attempts[0].hung) attempts.push(run(`${entry.id}-retry`, entry.selector));
    const final = attempts.at(-1);
    results.cases.push({ ...entry, result: final.result, retryUsed: attempts.length > 1, attempts: attempts.map(({ output, ...attempt }) => attempt) });
    save();
    if (final.environmentOutage) {
      results.environmentBlocker = 'Application unavailable; remaining cases and full run were not executed';
      break;
    }
  }
  if (results.cases.length === manifest.cases.length && results.cases.every(entry => entry.result === 'PASS')) {
    const { output, ...fullRun } = run('full-run');
    results.fullRun = fullRun;
  }
  save();
  if (results.fullRun.result !== 'PASS') process.exitCode = 1;
}

main().catch(error => {
  results.environmentBlocker = error.message;
  save();
  console.error(`Validation blocked: ${error.message}`);
  process.exitCode = 1;
});