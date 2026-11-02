import { createBdd } from 'playwright-bdd';
import { test, expect, type Pages } from '../fixture/fixtures';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { supportingUploads, invoice } from '../utility-helper/common-flows';
import { isYes } from '../test-data/far-data';

const { When, Then } = createBdd(test);

async function range(pages: Pages): Promise<void> {
  await pages.rangeAddress.complete(ConstantsLib.address);
  await pages.rangeCategories.complete();
}

When('I fill out my answers to the Firearms {string} questionnaire', async ({ pages, data }, journey: 'Shooting Clubs') => {
  const applicant = data.applicant;
  if (applicant.activity !== 'Apply for a new authority') await supportingUploads(pages, applicant, journey);
  await pages.clubName.complete(ConstantsLib.clubName);
  await pages.clubAddress.complete(ConstantsLib.address);
  await pages.secretaryName.complete(ConstantsLib.secretary);
  await pages.secretaryAddress.complete(ConstantsLib.address);
  await pages.secretaryContact.complete(ConstantsLib.email, ConstantsLib.phone);
  await pages.deputyName.complete(ConstantsLib.deputy);
  await pages.deputyAddress.complete(ConstantsLib.address);
  await pages.deputyContact.complete(ConstantsLib.email, ConstantsLib.phone);
  await range(pages);
  if (isYes(applicant.anotherRange)) {
    await pages.anotherRange.answer('Yes');
    await range(pages);
  }
  await pages.anotherRange.answer('No');
  await pages.storageAddresses.complete();
  if (isYes(applicant.anotherStorage)) {
    await pages.clubAnotherStorage.answer('Yes');
    await pages.clubStorage.complete(ConstantsLib.secondAddress);
  }
  await pages.clubAnotherStorage.answer('No');
  await invoice(pages, applicant);
});

When('I change the club name to {string} and club address number to {string} and continue', async ({ pages }, name: string, number: string) => {
  await pages.summary.change('club-name');
  await pages.clubName.complete(name);
  await pages.summary.change('club-address');
  await pages.clubAddress.complete({ ...ConstantsLib.address, line1: number });
});

Then('I check the club details changes {string} and {string} are updated on the Check your answers page', async ({ pages }, name: string, number: string) => {
  const values = await pages.summary.sectionValues('Club details');
  expect(values['Club name']).toBe(name);
  expect(values.Address.split(',')[0]).toBe(number);
});

When('I enter the club name and click continue', async ({ pages }) => { await pages.clubName.complete(ConstantsLib.clubName); });
When('I select No for a new club and click continue', async ({ pages }) => { await pages.newClub.answer('No'); });
When('I enter the name of the club secretary and click continue', async ({ pages }) => { await pages.secretaryName.complete(ConstantsLib.secretary); });
When('I enter the club secretary address and click continue', async ({ pages }) => { await pages.secretaryAddress.complete(ConstantsLib.address); });
When('I enter the club email and click continue', async ({ pages }) => { await pages.secretaryContact.complete(ConstantsLib.email, ConstantsLib.phone); });
When('I enter the second person name and click continue', async ({ pages }) => { await pages.deputyName.complete(ConstantsLib.deputy); });
When('I enter the second person contact address and click continue', async ({ pages }) => { await pages.deputyAddress.complete(ConstantsLib.address); });
When('I enter the second person email and click continue', async ({ pages }) => { await pages.deputyContact.complete(ConstantsLib.email, ConstantsLib.phone); });
When('I enter the club shooting ranges address and click continue', async ({ pages }) => { await pages.rangeAddress.complete(ConstantsLib.address); });
When('I select firearms category to use and click continue', async ({ pages }) => { await pages.rangeCategories.complete(); });
When('I select No to use another shooting range and click continue', async ({ pages }) => { await pages.anotherRange.answer('No'); });
When('I select No to use another address for gun storage and click continue', async ({ pages }) => { await pages.clubAnotherStorage.answer('No', false); });