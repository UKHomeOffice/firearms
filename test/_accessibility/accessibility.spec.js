'use strict';

const AxeBuilder = require('@axe-core/playwright').default;
const {chromium} = require('playwright');

const baseUrl = process.env.ACCESSIBILITY_BASE_URL || process.env.INTEGRATION_BASE_URL;
const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

describe('Application accessibility', function () {
  let browser;
  let context;
  let page;

  before(async function () {
    browser = await chromium.launch();
  });

  beforeEach(async function () {
    context = await browser.newContext();
    page = await context.newPage();
  });

  afterEach(async function () {
    await context.close();
  });

  after(async function () {
    await browser.close();
  });

  const expectNoViolations = async () => {
    const results = await new AxeBuilder({page})
      .withTags(wcagTags)
      .analyze();
    const violations = results.violations.map(violation => ({
      id: violation.id,
      impact: violation.impact,
      targets: violation.nodes.map(node => node.target)
    }));

    expect(violations).to.deep.equal([]);
  };

  it('meets WCAG A and AA on the museums privacy page', async function () {
    await page.goto(`${baseUrl}/museums`);

    await expectNoViolations();
    expect(await page.title()).to.include('Privacy Notice');
    expect(await page.locator('h1').innerText()).to.include('Privacy Notice');

    await page.keyboard.press('Tab');
    expect(await page.locator(':focus').count()).to.equal(1);
  });

  it('meets WCAG A and AA on the accessibility statement', async function () {
    await page.goto(`${baseUrl}/accessibility`);

    await expectNoViolations();
    expect(await page.locator('h1').innerText()).to.match(/accessibility/i);
  });
});
