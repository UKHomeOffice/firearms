import { expect } from '@playwright/test';
import { Given, When, farSteps } from './far.step';

When('I fill out my answers to the Firearms {string} questionnaire', async ({ pages, page }, journey: string) => {
  const steps = farSteps(pages, page);
  await steps.uploadSupportAndAdditionalDocs(journey);
  await steps.answerEnterClubName();
  await steps.answerEnterClubAndSecAddressDetails();
  await steps.answerClubUseAnotherShootingRange();
  await steps.answerAnotherAddressForGunStorage();
  await steps.answerInvoiceContactAddressDetailsAndPurchaseOrder();
});
Given('I change the club name to {string} and club address number to {string} and continue', async ({ pages, page }, name: string, address: string) => {
  await farSteps(pages, page).changeYourAnsForShootClub(name, address);
});

Given('I check the club details changes {string} and {string} are updated on the Check your answers page', async ({ pages, page }, name: string, address: string) => {
  const details = await farSteps(pages, page).getUpdatedSClubDetails();
  expect(details['Club name']).toBe(name);
  expect(details.Address.split(',')[0]).toBe(address);
});

When('I enter the club name and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).enterClubName();
});

When('I select No for a new club and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).selectNoForNewClub();
});

When('I enter the name of the club secretary and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).enterClubSecName();
});

When('I enter the club secretary address and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).enterClubSecAddress();
});

When('I enter the club email and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).enterClubEmail();
});

When('I enter the second person name and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).enterSecondPersonName();
});

When('I enter the second person contact address and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).enterSecondPersonContactAddress();
});

When('I enter the second person email and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).enterSecondPersonEmail();
});

When('I enter the club shooting ranges address and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).enterShootingRangesAddress();
});

When('I select firearms category to use and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).selectFirearmsCategory();
});

When('I select No to use another shooting range and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).selectNoAnotherShootingRange();
});

When('I select No to use another address for gun storage and click continue', async ({ pages, page }) => {
  await farSteps(pages, page).selectNoAnotherAddressForGunStorage();
});