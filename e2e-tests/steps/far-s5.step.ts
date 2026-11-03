import { expect } from '@playwright/test';
import { Given, When } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

When('I fill out my answers to the Firearms S5 {string} questionnaire', async ({ pages, page }, journey: string) => {
  const steps = pages.farPage;
  await steps.uploadSupportAndAdditionalDocs(journey);
  await steps.answerSelectAuthTypeOfOrgWhatToHandleAndHowtoObtainTheItems();
  await steps.answerWhoToContactAbtThisApplication();
  await steps.answerInvoiceContactAddressDetailsAndPurchaseOrder();
});

Given('I change the company name to {string} and company house number to {string} and continue', async ({ pages, page }, name: string, number: string) => {
  await pages.farPage.changeYourAnsForS5(name, number);
});

Given('I check the company details changes {string} and {string} are updated on the Check your answers page', async ({ pages, page }, name: string, number: string) => {
  const details = await pages.farPage.getUpdatedBusDetails();
  expect(details['Company name']).toBe(name);
  expect(details['Companies House number']).toBe(number);
});

When('I select the organisation type {string} and click continue', async ({ pages, page }, type: string) => {
  await pages.farS5WhatTypeOfOrgIsTheAuthForPage.answerSelectCompany(type, c.COMPANY_NAME, c.COMPANY_HOUSE_NUMBER);
});

When('I answer how many individual will be named {string} and click continue', async ({ pages, page }, holder: string) => {
  await pages.farS5HowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder(holder);
});

When('I select what will be handled under the authority and click continue', async ({ pages, page }) => {
  await pages.farS5WhatToHandleUnderTheAuthPage.answerSelectAllWeapons();
});

When('I select how the prohibited items will be obtained and click continue', async ({ pages, page }) => {
  await pages.farS5HowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItems();
});

When('I select import prohibited items and click continue', async ({ pages, page }) => {
  await pages.farS5WillProhibitedBeImportedPage.answerProhibitedItemBeImportedNo();
});

When('I answer will prohibited items be stored in business premises and click continue', async ({ pages, page }) => {
  await pages.farS5ProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesNo();
});

When('I select what business activities to be carried out and click continue', async ({ pages, page }) => {
  await pages.farS5WhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivities();
});

When('I select weapons sections and click continue', async ({ pages, page }) => {
  await pages.farS5AmmunitionSectionsPage.answerSelectUnspecifiedSections();
});

When('I select ammunition sections and click continue', async ({ pages, page }) => {
  await pages.farS5AmmunitionSectionsPage.answerSelectUnspecifiedSections();
});

When('I enter full name of authority holder and click continue', async ({ pages, page }) => {
  await pages.farS5WhatsTheFullNameOfAuthorityHolderPage.answerEnterNameOfAuthorityHolder(c.FULL_NAME);
});

When('I enter birth details and click continue', async ({ pages, page }) => {
  await pages.farS5WhatAreBirthDayDetailsPage.answerDateOfBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
});

When('I enter country of nationality and click continue', async ({ pages, page }) => {
  await pages.farS5WhatIsCountryOfNationalityPage.answerEnterCountryOfNationality(c.COUNTRY_UK);
});

When('I select who to contact and click continue', async ({ pages, page }) => {
  await pages.farS5WhoDoWeContactAbtThisApplicationPage.answerContactHolderFirst();
});

When('I enter contact email address and click continue', async ({ pages, page }) => {
  await pages.farWhatAreContactDetailsPage.answerHoldersContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
});

When('I select address to use and click continue', async ({ pages, page }) => {
  await pages.farS5WhichAddressToContactYouPage.answerSelectAddress(pages.farPage.data('testContactAddress'));
});