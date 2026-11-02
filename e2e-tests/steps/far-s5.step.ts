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
const validationActions: Record<string, (steps: FarStepLib) => Promise<void>> = {
  'I select what will be handled under the authority and click continue': steps => steps.selectWhatWillBeHandled(),
  'I select how the prohibited items will be obtained and click continue': steps => steps.selectHowProhibitedItemsWillBeObtained(),
  'I select import prohibited items and click continue': steps => steps.willProhibitedItemsBeImported(),
  'I answer will prohibited items be stored in business premises and click continue': steps => steps.prohibitedItemsStoredInBusPremises(),
  'I select what business activities to be carried out and click continue': steps => steps.selectBusinessActivities(),
  'I select weapons sections and click continue': steps => steps.selectAmmunitionOrWeaponsSection(),
  'I select ammunition sections and click continue': steps => steps.selectAmmunitionOrWeaponsSection(),
  'I enter full name of authority holder and click continue': steps => steps.enterFullNameOfAuthHolder(),
  'I enter birth details and click continue': steps => steps.enterDateOfBirthDetails(),
  'I enter country of nationality and click continue': steps => steps.enterCountryOfNationality(),
  'I select who to contact and click continue': steps => steps.selectWhoToContact(),
  'I enter contact email address and click continue': steps => steps.enterContactEmailAddress(),
  'I select address to use and click continue': steps => steps.selectAddressForContact(),
};
for (const [phrase, action] of Object.entries(validationActions)) {
  When(phrase, async ({ pages, page }) => { await action(farSteps(pages, page)); });
}
