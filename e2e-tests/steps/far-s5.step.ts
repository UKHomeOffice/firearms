import { expect } from '@playwright/test';
import { Given, When, farSteps, FarStepLib } from './far.step';

When('I fill out my answers to the Firearms S5 {string} questionnaire', async ({ pages, page }, journey: string) => {
  const steps = farSteps(pages, page);
  await steps.uploadSupportAndAdditionalDocs(journey);
  await steps.answerSelectAuthTypeOfOrgWhatToHandleAndHowtoObtainTheItems();
  await steps.answerWhoToContactAbtThisApplication();
  await steps.answerInvoiceContactAddressDetailsAndPurchaseOrder();
});

Given('I change the company name to {string} and company house number to {string} and continue', async ({ pages, page }, name: string, number: string) => {
  await farSteps(pages, page).changeYourAnsForS5(name, number);
});

Given('I check the company details changes {string} and {string} are updated on the Check your answers page', async ({ pages, page }, name: string, number: string) => {
  const details = await farSteps(pages, page).getUpdatedBusDetails();
  expect(details['Company name']).toBe(name);
  expect(details['Companies House number']).toBe(number);
});

When('I select the organisation type {string} and click continue', async ({ pages, page }, type: string) => {
  await farSteps(pages, page).selectOrgType(type);
});

When('I answer how many individual will be named {string} and click continue', async ({ pages, page }, holder: string) => {
  await farSteps(pages, page).selectHowManyIndividualToBeNamed(holder);
});

When('I select what will be handled under the authority and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).selectWhatWillBeHandled();
});

When('I select how the prohibited items will be obtained and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).selectHowProhibitedItemsWillBeObtained();
});

When('I select import prohibited items and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).willProhibitedItemsBeImported();
});

When('I answer will prohibited items be stored in business premises and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).prohibitedItemsStoredInBusPremises();
});

When('I select what business activities to be carried out and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).selectBusinessActivities();
});

When('I select weapons sections and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).selectAmmunitionOrWeaponsSection();
});

When('I select ammunition sections and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).selectAmmunitionOrWeaponsSection();
});

When('I enter full name of authority holder and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).enterFullNameOfAuthHolder();
});

When('I enter birth details and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).enterDateOfBirthDetails();
});

When('I enter country of nationality and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).enterCountryOfNationality();
});

When('I select who to contact and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).selectWhoToContact();
});

When('I enter contact email address and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).enterContactEmailAddress();
});

When('I select address to use and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).selectAddressForContact();
});