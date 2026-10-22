import fs from 'node:fs';
import path from 'node:path';
import { createBdd } from 'playwright-bdd';
import { test, expect, type Pages } from '../fixture/fixtures';
import { ConstantsLib } from '../utility-helper/constants-lib';
import { supportingUploads, invoice } from '../utility-helper/common-flows';
import { isYes } from '../test-data/far-data';

const { When, Then } = createBdd(test);

const contactAddressOptions: Record<string, string> = {
  'address already provided': 'Use the address already provided',
  'different address': 'Use a different address',
};

function contactAddressOption(sourceOption: string): string {
  return contactAddressOptions[sourceOption] ?? sourceOption;
}

function organisationFields(organisation: string): Record<string, string> {
  switch (organisation) {
    case 'Company': return { 'company-name': ConstantsLib.companyName, 'company-house-number': ConstantsLib.companyNumber };
    case 'Sole trader': return { 'sole-trader-name': ConstantsLib.traderName };
    case 'Shooting club (section 7(3))': return { 'shooting-club-name': ConstantsLib.shootingClubName };
    case 'Charity': return { 'charity-name': ConstantsLib.charityName, 'charity-number': ConstantsLib.charityNumber };
    case 'Museum': return { 'museum-name': ConstantsLib.museumName };
    case 'Other': return { 'other-name': ConstantsLib.otherOrganisation };
    default: throw new Error(`Unknown source organisation: ${organisation}`);
  }
}

function sectionDetails(section: string): string {
  return section.includes('Max Characters 15000')
    ? fs.readFileSync(path.resolve('e2e-tests/test-data/largeText.txt'), 'utf8')
    : ConstantsLib.inputText;
}

async function birthAndNationality(pages: Pages): Promise<void> {
  await pages.birth.complete(ConstantsLib.birthDate, ConstantsLib.address.town, ConstantsLib.countryOfBirth);
  await pages.nationality.completeNationality(ConstantsLib.nationality);
  await pages.holderBusinessAddress.complete(ConstantsLib.address);
}

When('I fill out my answers to the Firearms S5 {string} questionnaire', async ({ pages, data }, journey: 'New Dealer') => {
  const applicant = data.applicant;
  if (applicant.activity !== 'Apply for a new authority') await supportingUploads(pages, applicant, journey);
  await pages.organisation.complete(applicant.organisation!, organisationFields(applicant.organisation!));
  await pages.handle.complete();
  await pages.obtain.complete(ConstantsLib.obtainText);
  await pages.imported.complete(isYes(applicant.imported), ConstantsLib.importCountry);
  await pages.businessStorage.complete(isYes(applicant.businessStorage), ConstantsLib.noStorageDetails);
  if (isYes(applicant.businessStorage)) {
    await pages.s5Storage.complete(ConstantsLib.address);
    if (isYes(applicant.anotherStorage)) {
      await pages.s5AnotherStorage.answer('Yes');
      await pages.s5Storage.complete(ConstantsLib.address);
    }
    await pages.s5AnotherStorage.answer('No');
  }
  await pages.businessActivities.complete(ConstantsLib.inputText);
  await pages.weapons.complete(applicant.weapons!, sectionDetails(applicant.weapons!), applicant.weapons!.includes('Fully automatic') ? ConstantsLib.automaticQuantity : ConstantsLib.launcherQuantity);
  await pages.ammunition.complete(applicant.ammunition!, sectionDetails(applicant.ammunition!), applicant.ammunition!.includes('Actual missiles') ? ConstantsLib.missileQuantities : ConstantsLib.cartridgeQuantities);
  await pages.individuals.answer(applicant.individuals!);
  if (applicant.individuals === 'Two') {
    await pages.firstHolderName.complete(applicant.firstHolder!);
    await birthAndNationality(pages);
    await pages.secondHolderName.complete(applicant.secondHolder!);
    await birthAndNationality(pages);
  } else {
    await pages.holderName.complete(applicant.holder!);
    await birthAndNationality(pages);
  }
  const holder = applicant.contact === 'Someone' ? 'other' : applicant.contact === 'Test2' ? 'second' : 'first';
  await pages.whoToContact.complete(holder, applicant.contact);
  await pages.s5Contact.complete(ConstantsLib.email, ConstantsLib.phone);
  if (holder === 'other') {
    await pages.s5ContactAddress.complete(ConstantsLib.address);
  } else {
    await pages.s5ContactAddressChoice.answer(contactAddressOption(applicant.contactAddress!));
    if (applicant.contactAddress === 'different address') await pages.s5ContactAddress.complete(ConstantsLib.address);
  }
  await invoice(pages, applicant);
});

When('I change the company name to {string} and company house number to {string} and continue', async ({ pages }, name: string, number: string) => {
  await pages.summary.change('company-name');
  await pages.organisation.complete('Company', { 'company-name': name, 'company-house-number': number });
});

Then('I check the company details changes {string} and {string} are updated on the Check your answers page', async ({ pages }, name: string, number: string) => {
  const values = await pages.summary.sectionValues('Business details');
  expect(values['Company name']).toBe(name);
  expect(values['Companies House number']).toBe(number);
});

When('I select the organisation type {string} and click continue', async ({ pages }, organisation: string) => { await pages.organisation.complete(organisation, organisationFields(organisation)); });
When('I select what will be handled under the authority and click continue', async ({ pages }) => { await pages.handle.complete(); });
When('I select how the prohibited items will be obtained and click continue', async ({ pages }) => { await pages.obtain.complete(ConstantsLib.obtainText); });
When('I select import prohibited items and click continue', async ({ pages }) => { await pages.imported.complete(false, ConstantsLib.importCountry); });
When('I answer will prohibited items be stored in business premises and click continue', async ({ pages }) => { await pages.businessStorage.complete(false, ConstantsLib.noStorageDetails); });
When('I select what business activities to be carried out and click continue', async ({ pages }) => { await pages.businessActivities.complete(ConstantsLib.inputText); });
When('I select weapons sections and click continue', async ({ pages }) => { await pages.weapons.complete('Unspecified', ConstantsLib.inputText, ConstantsLib.automaticQuantity); });
When('I select ammunition sections and click continue', async ({ pages }) => { await pages.ammunition.complete('Unspecified', ConstantsLib.inputText, ConstantsLib.cartridgeQuantities); });
When('I answer how many individual will be named {string} and click continue', async ({ pages }, number: string) => { await pages.individuals.answer(number); });
When('I enter full name of authority holder and click continue', async ({ pages }) => { await pages.holderName.complete(ConstantsLib.fullName); });
When('I enter birth details and click continue', async ({ pages }) => { await pages.birth.complete(ConstantsLib.birthDate, ConstantsLib.address.town, ConstantsLib.countryOfBirth); });
When('I enter country of nationality and click continue', async ({ pages }) => { await pages.nationality.completeNationality(ConstantsLib.nationality); });
When('I select who to contact and click continue', async ({ pages }) => { await pages.whoToContact.complete('first'); });
When('I select address to use and click continue', async ({ pages, data }) => { await pages.s5ContactAddressChoice.answer(contactAddressOption(data.applicant.contactAddress!)); });