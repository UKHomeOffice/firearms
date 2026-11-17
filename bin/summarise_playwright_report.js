'use strict';

const fs = require('node:fs');

function buildSummaryFromText(outputText) {
  const text = outputText.replace(/\u001b\[[0-9;]*m/g, '');
  const totals = [...text.matchAll(/^\s*(\d+)\s+(passed|failed|flaky|skipped|did not run)\b/gm)];
  if (totals.length === 0) {
    throw new Error('No Playwright result totals found; test setup or execution may have failed');
  }

  const counts = { passed: 0, failed: 0, flaky: 0, skipped: 0, 'did not run': 0 };
  for (const [, count, label] of totals) {
    counts[label] = Number(count);
  }
  const duration = text.match(/^\s*\d+\s+passed\s+\(([^)]+)\)/m)?.[1] || 'unknown';
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

  return [
    'Playwright Nightly Summary',
    `Total: ${total}`,
    `Passed: ${counts.passed}`,
    `Failed: ${counts.failed}`,
    `Flaky: ${counts.flaky}`,
    `Skipped: ${counts.skipped}`,
    `Did not run: ${counts['did not run']}`,
    `Duration: ${duration}`,
  ].join('\n');
}

function main() {
  const [inputPath, outputPath] = process.argv.slice(2);
  if (!inputPath || !outputPath) {
    console.error('Usage: node bin/summarise_playwright_report.js <input-text> <output-txt>');
    process.exitCode = 1;
    return;
  }

  let summary;
  try {
    summary = buildSummaryFromText(fs.readFileSync(inputPath, 'utf8'));
  } catch (error) {
    console.error(error.message);
    summary = `Playwright Nightly Summary\nUnable to parse run output: ${error.message}`;
    process.exitCode = 1;
  }
  fs.writeFileSync(outputPath, `${summary}\n`, 'utf8');
  console.log(summary);
}

if (require.main === module) {
  main();
}

module.exports = { buildSummaryFromText };
