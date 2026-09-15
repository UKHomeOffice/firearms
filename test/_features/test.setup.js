const {Before, BeforeAll, AfterAll, After} = require('@cucumber/cucumber');
const {chromium} = require('playwright');

BeforeAll(async () => {
  const pwConfig = process.env.ACCEPTANCE_WITH_BROWSER ? { headless: false, slowMo: 500 } : {};
  global.browser = await chromium.launch(pwConfig);
});

AfterAll(async function () {
  await global.browser.close();
});

Before(async function () {
  this.context = await global.browser.newContext({ ignoreHTTPSErrors: true });
  this.page = await this.context.newPage();
});

After(async function () {
  await this.page.close();
  await this.context.close();
});
