import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixture/fixtures';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { chooseJourney, startApplication, evidencePath } from '../utility-helper/common-flows';
import { checkAnswers } from '../utility-helper/expected-answers';
import type { Journey, Product } from '../test-data/far-data';

const { Given, When, Then } = createBdd(test);

Given('Test data has been created for {string} scenarios', async ({ data }, product: string) => {
  if (!['FARMuseum', 'FARS5', 'FARShootingClub'].includes(product)) throw new Error(`Unknown data family: ${product}`);
  data.product = product as Product;
});

Given('I selected the data for scenario {string} - {string}', async ({ data }, id: string, description: string) => {
  data.select(id, description);
});

When('I visit the Firearms page', async ({ pages }) => {
  await pages.chooseJourney.open(true);
});

When('I select Firearms {string} journey to start my application', async ({ pages, data }, journey: Journey) => {
  await startApplication(pages, data.applicant, journey);
});

When('I choose Firearms {string} journey to start my application', async ({ pages }, journey: Journey) => {
  await chooseJourney(pages, journey);
  if (journey !== 'New Dealer') await pages.activity.continue();
});

Then('I check my answers for Firearms {string} - {string}', async ({ pages, data }, journey: Journey, activity: string) => {
  await checkAnswers(pages, data.applicant, journey, activity);
});

Then('I am able to submit the Firearms questionnaire', async ({ pages, data }) => {
  await pages.summary.continue();
  await pages.importantInformation.submit();
  data.applicationReference = await pages.submission.applicationComplete(ConstantsLib.email);
});

When('I select continue', async ({ pages }) => { await pages.basePage.continue(); });

Then('I see {string} error header message displayed for firearms', async ({ page }, message: string) => {
  await expect(page.locator('#error-summary-title')).toHaveText(message);
});

Then('I see {string} error message displayed for firearms', async ({ pages }, message: string) => {
  await pages.basePage.assertErrors(message);
});

Then('I see error message displayed for firearms', async ({ pages }, message: string) => {
  await pages.basePage.assertErrors(message);
});

Then('I see {string} error link message displayed for firearms', async ({ page }, message: string) => {
  await expect(page.getByRole('link', { name: message, exact: true })).toBeVisible();
});

When('I select What to do {string} option and click continue', async ({ pages }, activity: string) => {
  await pages.activity.answer(activity);
});

When("I select 'upload file' button for firearms", async ({ pages }) => { await pages.s5Upload.clickUpload(); });

When('I upload Firearms evidence file and click continue', async ({ pages }) => {
  await pages.s5Upload.uploadFile(evidencePath(), ConstantsLib.uploadDescription);
  await pages.basePage.continue();
});

When('I select {string} to upload additional doc and click continue', async ({ pages }, option: string) => {
  await pages.basePage.choose(option);
  await pages.basePage.continue();
});

When('I enter contact email address and click continue', async ({ pages, data }) => {
  const contactPage = data.product === 'FARMuseum' ? pages.museumContact : pages.s5Contact;
  await contactPage.complete(ConstantsLib.email, ConstantsLib.phone);
});

When('I enter invoice contact details {string} and click continue', async ({ pages }, email: string) => {
  await pages.invoiceContact.complete(email, ConstantsLib.contactName, ConstantsLib.phone);
});

When('I enter invoice contact email {string} and click continue', async ({ pages }, email: string) => {
  await pages.invoiceContact.complete(email, ConstantsLib.contactName, ConstantsLib.phone);
});

When('I enter invoice address and click continue', async ({ pages }) => { await pages.invoiceAddress.complete(ConstantsLib.address); });

When('I enter main business address and click continue', async ({ pages }) => { await pages.holderBusinessAddress.complete(ConstantsLib.address); });

When('I enter exhibition or storage address and click continue', async ({ pages }) => { await pages.museumStorage.complete(ConstantsLib.address); });

When('I enter the club address and click continue', async ({ pages }) => { await pages.clubAddress.complete(ConstantsLib.address); });