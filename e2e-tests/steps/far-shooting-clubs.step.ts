import { expect } from '@playwright/test';
import { Given, When } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';
import { answerInvoiceContactAddressDetailsAndPurchaseOrder, uploadSupportAndAdditionalDocs } from './far-common.step';
import type { Pages } from '../fixture/fixtures';

async function answerEnterClubName(pages: Pages) {
    await pages.farShootClubWhatIsTheNamePage.assertPageTitle();
    await pages.farShootClubWhatIsTheNamePage.answerEnterClubName(c.BUSINESS_OR_COMPANY_NAME);
  }

async function answerEnterClubAndSecAddressDetails(pages: Pages) {
    await pages.farShootClubWhatIsClubAddressPage.assertPageTitle();
    await pages.farShootClubWhatIsClubAddressPage.answerEnterClubAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
    await pages.farShootClubWhatIsTheClubSecNamePage.assertPageTitle();
    await pages.farShootClubWhatIsTheClubSecNamePage.answerEnterClubSecName(c.CLUB_SEC_NAME);
    await pages.farShootClubSecContactAddressPage.expectClubSecretaryContactAddress();
    await pages.farShootClubSecContactAddressPage.assertPageTitle();
    await pages.farShootClubSecContactAddressPage.answerClubSecContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
    await pages.farShootClubSecContactDetailsPage.expectClubSecretaryContactDetails();
    await pages.farShootClubSecContactDetailsPage.assertPageTitle();
    await pages.farShootClubSecContactDetailsPage.answerClubSecContactDetails(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
    await pages.farShootClubWhoToContactInAbsencePage.assertPageTitle();
    await pages.farShootClubWhoToContactInAbsencePage.answerEnterClubName(c.CLUB_SEC_DEPUTY_NAME);
    await pages.farShootClubSecContactAddressPage.expectDeputyContactAddress();
    await pages.farShootClubSecContactAddressPage.assertPageTitle();
    await pages.farShootClubSecContactAddressPage.answerClubSecContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
    await pages.farShootClubSecContactDetailsPage.expectDeputyContactDetails();
    await pages.farShootClubSecContactDetailsPage.assertPageTitle();
    await pages.farShootClubSecContactDetailsPage.answerClubSecContactDetails(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
    await shootingRangesAndFirearmsCategoriesToUse(pages);
  }

async function shootingRangesAndFirearmsCategoriesToUse(pages: Pages) {
    await pages.farShootClubShootingRangesToUsePage.assertPageTitle();
    await pages.farShootClubShootingRangesToUsePage.answerShootingRangesAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
    await pages.farShootClubFirearmsCategoriesToUsePage.assertPageTitle();
    await pages.farShootClubFirearmsCategoriesToUsePage.answerSelectFirearmsCategoriesRange();
  }

async function answerClubUseAnotherShootingRange(pages: Pages) {
    const ranges = pages.farShootClubUseAnotherShootingRangePage;
    expect(await ranges.isFirearmsCategoriesAdded()).toBe(true);
    await ranges.assertPageTitle();
    if (pages.basePage.isYes(pages.basePage.data('useAnotherShootingRange'))) {
      await ranges.answerUseAnotherShootingRangeYes();
      await shootingRangesAndFirearmsCategoriesToUse(pages);
    }
    await ranges.answerUseAnotherShootingRangeNo();
    await answerFirearmsStorageAddress(pages);
  }

async function answerFirearmsStorageAddress(pages: Pages) {
    await pages.farShootClubFirearmsStorageAddressesPage.assertPageTitle();
    await pages.farShootClubFirearmsStorageAddressesPage.answerSelectStorageAddress();
  }

async function answerAnotherAddressForGunStorage(pages: Pages) {
    const storage = pages.farShootClubAnotherAddressGunStoragePage;
    expect(await storage.isFirearmsCategoriesAdded()).toBe(true);
    await storage.assertPageTitle();
    if (pages.basePage.isYes(pages.basePage.data('anotherGunStorageAddress'))) {
      await storage.answerUseAnotherAddressYes();
      await answerWhereElseGunsBeStored(pages);
    }
    await storage.answerUseAnotherAddressNo();
  }

async function answerWhereElseGunsBeStored(pages: Pages) {
    await pages.farShootClubWhereElseWillGunBeStoredPage.assertPageTitle();
    await pages.farShootClubWhereElseWillGunBeStoredPage.answerEnterGunStorageAddress(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
  }



When('I fill out my answers to the Firearms {string} questionnaire', async ({ pages, page }, journey: string) => {
  await uploadSupportAndAdditionalDocs(pages, journey);
  await answerEnterClubName(pages);
  await answerEnterClubAndSecAddressDetails(pages);
  await answerClubUseAnotherShootingRange(pages);
  await answerAnotherAddressForGunStorage(pages);
  await answerInvoiceContactAddressDetailsAndPurchaseOrder(pages);
});
Given('I change the club name to {string} and club address number to {string} and continue', async ({ pages, page }, clubName: string, clubAddress: string) => {
  await pages.farShootClubCheckYourAnswersPage.changeClubDetails();
  await pages.farShootClubWhatIsTheNamePage.assertPageTitle();
  await pages.farShootClubWhatIsTheNamePage.answerEnterClubName(clubName);
  await pages.farShootClubCheckYourAnswersPage.changeClubAddressNumb();
  await pages.farShootClubWhatIsClubAddressPage.assertPageTitle();
  await pages.farShootClubWhatIsClubAddressPage.answerEnterClubAddress(clubAddress, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
});

Given('I check the club details changes {string} and {string} are updated on the Check your answers page', async ({ pages, page }, name: string, address: string) => {
  const details = await pages.farShootClubCheckYourAnswersPage.getUpdatedSClubDetails();
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