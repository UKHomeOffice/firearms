import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixture/fixtures';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { chooseJourney, evidencePath } from '../utility-helper/common-flows';
import type { Journey } from '../test-data/far-data';

const { When, Then } = createBdd(test);

When('I navigate and select {string} journey to start my application', async ({ pages }, journey: Journey) => {
  await pages.chooseJourney.open();
  await chooseJourney(pages, journey);
});

When('I fill out my answers to Supporting doc questionnaire', async ({ pages, data }) => {
  expect(data.applicationReference).not.toBe('');
  await pages.reference.complete(data.applicationReference);
  await pages.originalEmail.complete(ConstantsLib.email);
  await pages.supportingUpload.complete(evidencePath(), ConstantsLib.uploadDescription);
  await pages.additional.answer('No');
});

Then('I check the application details on Check your answers page', async ({ pages, data }) => {
  const values = await pages.summary.sectionValues('Application details');
  expect(values['Reference number']).toBe(data.applicationReference);
  expect(values.Email).toBe(ConstantsLib.email);
});

Then('I am able to submit the supporting documents', async ({ pages }) => {
  await pages.summary.continue();
  await pages.importantInformation.submit();
  await pages.submission.uploadComplete();
});

When('I enter reference application number and click continue', async ({ pages, data }) => {
  expect(data.applicationReference).not.toBe('');
  await pages.reference.complete(data.applicationReference);
});

When('I enter the email {string} not used in original application and click continue', async ({ pages }, email: string) => { await pages.originalEmail.complete(email); });
When('I enter the email {string} used in original application and click continue', async ({ pages }, email: string) => { await pages.originalEmail.complete(email); });