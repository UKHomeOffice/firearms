import { createBdd } from 'playwright-bdd';
import { test } from '../fixture/fixtures';

export const { Given, When, Then, After } = createBdd(test);

After(async ({ page, $testInfo: testInfo }) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await testInfo.attach('failure-route', {
      body: Buffer.from(page.url()),
      contentType: 'text/plain',
    });
  }
});
