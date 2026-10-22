import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixture/fixtures';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { invoice } from '../utility-helper/common-flows';
import { isYes } from '../test-data/far-data';

const { When, Then } = createBdd(test);

When('I fill out my answers to the Firearms Museums questionnaire', async ({ pages, data }) => {
  const applicant = data.applicant;
  await pages.museumName.complete(ConstantsLib.museumName);
  await pages.museumStorage.complete(ConstantsLib.address);
  if (isYes(applicant.anotherStorage)) {
    await pages.museumAnotherStorage.answer('Yes');
    await pages.museumStorage.complete(ConstantsLib.secondAddress);
  }
  await pages.museumAnotherStorage.answer('No');
  await pages.museumContactName.complete(applicant.museumContact!);
  await pages.museumContact.complete(ConstantsLib.email, ConstantsLib.phone);
  await pages.museumSameContact.answer(isYes(applicant.sameContactAddress) ? 'Yes' : 'No');
  if (isYes(applicant.sameContactAddress)) {
    await pages.museumSelectContact.complete();
  } else {
    await pages.museumContactAddress.complete(ConstantsLib.secondAddress);
  }
  await invoice(pages, applicant);
});

When('I change the museum name to {string} and museum address number to {string} and continue', async ({ pages }, name: string, number: string) => {
  await pages.summary.change('name');
  await pages.museumName.complete(name);
  await pages.summary.change('exhibit-addresses');
  await pages.summary.deleteMuseumAddress();
  await pages.museumStorage.complete({ ...ConstantsLib.address, line1: number });
  await pages.museumAnotherStorage.continue();
});

Then('I check the museum details changes {string} and {string} are updated on the Check your answers page', async ({ pages }, name: string, number: string) => {
  const values = await pages.summary.sectionValues('Museum details');
  expect(values.Name).toBe(name);
  expect(values.Address.split(',')[0]).toBe(number);
});

When('I enter museum name and click continue', async ({ pages }) => { await pages.museumName.complete(ConstantsLib.museumName); });
When('I select No to another address to store or exhibit firearms and click continue', async ({ pages }) => { await pages.museumAnotherStorage.answer('No'); });
When('I select Yes to contact address same as previous and click continue', async ({ pages }) => { await pages.museumSameContact.answer('Yes'); });
When('I enter a contact name and click continue', async ({ pages, data }) => { await pages.museumContactName.complete(data.applicant.museumContact!); });
When('I select address and click continue', async ({ pages }) => {
  await pages.museumSelectContact.complete();
});