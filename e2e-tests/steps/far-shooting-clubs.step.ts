import { expect } from '@playwright/test';
import { Given, When } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export function selectShootingClubsScenario(description: string, context = 'journey'): Record<string, string> {
  if (context !== 'journey') {
    throw new Error(`Unsupported FAR data context: FARShootingClub/${context}`);
  }
  switch (description) {
    case "Apply for a new authority":
      return {
        whatYouWantToDo: "Apply for a new authority",
        uploadAdditionalExistingDoc: "N/A",
        uploadAdditionalDoc: "No",
        clubANewClub: "Yes",
        sourceFirstUseAnotherShootingRange: "Yes",
        useAnotherShootingRange: "No",
        atWhichOfAddressesWillFirearmsBeStored: "Shooting ranges",
        anotherGunStorageAddress: "No",
        purchaseOrder: "Yes",
      };
    case "Apply for a new authority - Another Gun Storage address":
      return {
        whatYouWantToDo: "Apply for a new authority",
        uploadAdditionalExistingDoc: "N/A",
        uploadAdditionalDoc: "No",
        clubANewClub: "No",
        sourceFirstUseAnotherShootingRange: "Yes",
        useAnotherShootingRange: "Yes",
        atWhichOfAddressesWillFirearmsBeStored: "Shooting ranges",
        anotherGunStorageAddress: "Yes",
        purchaseOrder: "No",
      };
    case "Renew existing authority":
      return {
        whatYouWantToDo: "Renew an existing authority",
        uploadAdditionalExistingDoc: "No",
        uploadAdditionalDoc: "No",
        clubANewClub: "N/A",
        sourceFirstUseAnotherShootingRange: "No",
        useAnotherShootingRange: "N/A",
        atWhichOfAddressesWillFirearmsBeStored: "Club secretary's contact address",
        anotherGunStorageAddress: "No",
        purchaseOrder: "Yes",
      };
    case "Renew existing authority - additional support doc - Yes":
      return {
        whatYouWantToDo: "Renew an existing authority",
        uploadAdditionalExistingDoc: "Yes",
        uploadAdditionalDoc: "Yes",
        clubANewClub: "N/A",
        sourceFirstUseAnotherShootingRange: "No",
        useAnotherShootingRange: "N/A",
        atWhichOfAddressesWillFirearmsBeStored: "Club secretary's contact address",
        anotherGunStorageAddress: "No",
        purchaseOrder: "Yes",
      };
    case "Amend existing authority":
      return {
        whatYouWantToDo: "Amend an existing authority",
        uploadAdditionalExistingDoc: "No",
        uploadAdditionalDoc: "No",
        clubANewClub: "N/A",
        sourceFirstUseAnotherShootingRange: "No",
        useAnotherShootingRange: "N/A",
        atWhichOfAddressesWillFirearmsBeStored: "Shooting ranges",
        anotherGunStorageAddress: "Yes",
        purchaseOrder: "No",
      };
    case "Amend existing authority - additional support doc - Yes":
      return {
        whatYouWantToDo: "Amend an existing authority",
        uploadAdditionalExistingDoc: "Yes",
        uploadAdditionalDoc: "yes",
        clubANewClub: "N/A",
        sourceFirstUseAnotherShootingRange: "No",
        useAnotherShootingRange: "N/A",
        atWhichOfAddressesWillFirearmsBeStored: "Shooting ranges",
        anotherGunStorageAddress: "No",
        purchaseOrder: "Yes",
      };
    default:
      throw new Error(`Unknown FAR scenario description: FARShootingClub/${context}/${JSON.stringify(description)}`);
  }
}

When('I fill out my answers to the Firearms {string} questionnaire pertaining to {string}', async ({ pages }, journey: string, scenario: string) => {
  pages.basePage.assertScenario('FARShootingClub', scenario);
  if (pages.basePage.data('whatYouWantToDo') !== 'Apply for a new authority') {
    if (journey === 'New Dealer') {
      await pages.farS5UploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
    } else {
      await pages.farShootClubUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
    }
    await pages.farDoYouWantToUploadAdditionalDocsPage.assertPageTitle();
    if (pages.basePage.isYes(pages.basePage.data('uploadAdditionalDoc'))) {
      await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      if (journey === 'New Dealer' && pages.basePage.data('whatYouWantToDo') !== 'Apply for a new authority') {
        await pages.farS5UploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      }
      if (journey === 'Shooting Clubs') {
        await pages.farShootClubUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      }
    }
    await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
  }
  await pages.farShootClubWhatIsTheNamePage.answerEnterClubNameWithTitleCheck(c.BUSINESS_OR_COMPANY_NAME);
  await pages.farShootClubWhatIsClubAddressPage.answerEnterClubAddressWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  await pages.farShootClubWhatIsTheClubSecNamePage.answerEnterClubSecNameWithTitleCheck(c.CLUB_SEC_NAME);
  await pages.farShootClubSecContactAddressPage.answerClubSecretaryContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  await pages.farShootClubSecContactDetailsPage.answerClubSecretaryContactDetails(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
  await pages.farShootClubWhoToContactInAbsencePage.answerEnterClubNameWithTitleCheck(c.CLUB_SEC_DEPUTY_NAME);
  await pages.farShootClubSecContactAddressPage.answerDeputyContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  await pages.farShootClubSecContactDetailsPage.answerDeputyContactDetails(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
  await pages.farShootClubShootingRangesToUsePage.answerShootingRangesAddressWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  await pages.farShootClubFirearmsCategoriesToUsePage.answerSelectFirearmsCategoriesRangeWithTitleCheck();
  expect(await pages.farShootClubUseAnotherShootingRangePage.isFirearmsCategoriesAdded()).toBe(true);
  await pages.farShootClubUseAnotherShootingRangePage.assertPageTitle();
  if (pages.basePage.isYes(pages.basePage.data('useAnotherShootingRange'))) {
    await pages.farShootClubUseAnotherShootingRangePage.answerUseAnotherShootingRangeYes();
    await pages.farShootClubShootingRangesToUsePage.answerShootingRangesAddressWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
    await pages.farShootClubFirearmsCategoriesToUsePage.answerSelectFirearmsCategoriesRangeWithTitleCheck();
  }
  await pages.farShootClubUseAnotherShootingRangePage.answerUseAnotherShootingRangeNo();
  await pages.farShootClubFirearmsStorageAddressesPage.answerSelectStorageAddressWithTitleCheck();
  expect(await pages.farShootClubAnotherAddressGunStoragePage.isFirearmsCategoriesAdded()).toBe(true);
  await pages.farShootClubAnotherAddressGunStoragePage.assertPageTitle();
  if (pages.basePage.isYes(pages.basePage.data('anotherGunStorageAddress'))) {
    await pages.farShootClubAnotherAddressGunStoragePage.answerUseAnotherAddressYes();
    await pages.farShootClubWhereElseWillGunBeStoredPage.answerEnterGunStorageAddressWithTitleCheck(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
  }
  await pages.farShootClubAnotherAddressGunStoragePage.answerUseAnotherAddressNo();
  await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
  await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  await pages.farDoYouHavePurchaseOrderPage.assertPageTitle();
  if (pages.basePage.isYes(pages.basePage.data('purchaseOrder'))) await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
  else await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
});

Given('I change the club name to {string} and club address number to {string} and continue', async ({ pages, page }, clubName: string, clubAddress: string) => {
  await pages.farShootClubCheckYourAnswersPage.changeClubDetails();
  await pages.farShootClubWhatIsTheNamePage.answerEnterClubNameWithTitleCheck(clubName);
  await pages.farShootClubCheckYourAnswersPage.changeClubAddressNumb();
  await pages.farShootClubWhatIsClubAddressPage.answerEnterClubAddressWithTitleCheck(clubAddress, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
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