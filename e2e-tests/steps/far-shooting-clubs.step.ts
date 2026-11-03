import { expect } from '@playwright/test';
import { Given, When } from './far.step';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

When('I fill out my answers to the Firearms {string} questionnaire', async ({ pages, page }, journey: string) => {
  const steps = pages.farPage;
  await steps.uploadSupportAndAdditionalDocs(journey);
  await steps.answerEnterClubName();
  await steps.answerEnterClubAndSecAddressDetails();
  await steps.answerClubUseAnotherShootingRange();
  await steps.answerAnotherAddressForGunStorage();
  await steps.answerInvoiceContactAddressDetailsAndPurchaseOrder();
});
Given('I change the club name to {string} and club address number to {string} and continue', async ({ pages, page }, name: string, address: string) => {
  await pages.farPage.changeYourAnsForShootClub(name, address);
});

Given('I check the club details changes {string} and {string} are updated on the Check your answers page', async ({ pages, page }, name: string, address: string) => {
  const details = await pages.farPage.getUpdatedSClubDetails();
  expect(details['Club name']).toBe(name);
  expect(details.Address.split(',')[0]).toBe(address);
});

When('I enter the club name and click continue', async ({ pages, page }) => {
  await pages.farShootClubWhatIsTheNamePage.answerEnterClubName(c.BUSINESS_OR_COMPANY_NAME);
});

When('I select No for a new club and click continue', async ({ pages, page }) => {
  await pages.farShootClubIsTheClubNewPage.answerClubIsNewNo();
});

When('I enter the name of the club secretary and click continue', async ({ pages, page }) => {
  await pages.farShootClubWhatIsTheClubSecNamePage.answerEnterClubSecName(c.CLUB_SEC_NAME);
});

When('I enter the club secretary address and click continue', async ({ pages, page }) => {
  await pages.farShootClubSecContactAddressPage.answerClubSecContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
});

When('I enter the club email and click continue', async ({ pages, page }) => {
  await pages.farShootClubSecContactDetailsPage.answerClubSecContactDetails(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
});

When('I enter the second person name and click continue', async ({ pages, page }) => {
  await pages.farShootClubWhoToContactInAbsencePage.answerEnterClubName(c.CLUB_SEC_DEPUTY_NAME);
});

When('I enter the second person contact address and click continue', async ({ pages, page }) => {
  await pages.farShootClubSecContactAddressPage.answerClubSecContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
});

When('I enter the second person email and click continue', async ({ pages, page }) => {
  await pages.farWhatAreContactDetailsPage.answerHoldersContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
});

When('I enter the club shooting ranges address and click continue', async ({ pages, page }) => {
  await pages.farShootClubShootingRangesToUsePage.answerShootingRangesAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
});

When('I select firearms category to use and click continue', async ({ pages, page }) => {
  await pages.farShootClubFirearmsCategoriesToUsePage.answerSelectFirearmsCategoriesRange();
});

When('I select No to use another shooting range and click continue', async ({ pages, page }) => {
  await pages.farShootClubUseAnotherShootingRangePage.answerUseAnotherShootingRangeNo();
});

When('I select No to use another address for gun storage and click continue', async ({ pages, page }) => {
  await pages.farShootClubAnotherAddressGunStoragePage.answerUseAnotherAddressNo();
});