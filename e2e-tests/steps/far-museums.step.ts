import { expect } from '@playwright/test';
import { Then, When, type Pages } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export async function completeMuseumsQuestionnaire(pages: Pages, scenario: string, context: string): Promise<void> {
  if (context !== 'journey') {
    throw new Error(`Unsupported FAR questionnaire context: FARMuseum/${context}`);
  }

  await pages.farChooseAJourneyHomePage.chooseJourneyWithTitleCheck('Museums');
  await pages.farPrivacyNoticePage.continueWithTitleCheck();
  await pages.farWhatDoYouWantToDoPage.assertPageTitle(pages.farWhatDoYouWantToDoPage.page, await pages.farWhatDoYouWantToDoPage.expectedPageTitle());

  switch (scenario) {
    case "Apply for a new authority": {
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Apply for a new authority");
      await pages.farMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(c.MUSEUM_NAME);
      await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farMuseumAnotherAddressForStoragePage.assertPageTitle(pages.farMuseumAnotherAddressForStoragePage.page, await pages.farMuseumAnotherAddressForStoragePage.expectedPageTitle());
      expect(await pages.farMuseumAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
      await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContactWithTitleCheck("MuseumTest");
      await pages.farMuseumWhatAreTheirContactDetailsPage.answerTheirContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
      await pages.farMuseumContactAddressSameAsPreviousPage.assertPageTitle(pages.farMuseumContactAddressSameAsPreviousPage.page, await pages.farMuseumContactAddressSameAsPreviousPage.expectedPageTitle());
      await pages.farMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameYes();
      await pages.farMuseumSelectTheContactAddressPage.answerSelectContactAddressWithTitleCheck();
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle(pages.farDoYouHavePurchaseOrderPage.page, await pages.farDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
      break;
    }
    case "Apply for a new authority - Another Storage address": {
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Apply for a new authority");
      await pages.farMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(c.MUSEUM_NAME);
      await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farMuseumAnotherAddressForStoragePage.assertPageTitle(pages.farMuseumAnotherAddressForStoragePage.page, await pages.farMuseumAnotherAddressForStoragePage.expectedPageTitle());
      expect(await pages.farMuseumAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressYes();
      await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorage(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
      await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
      await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContactWithTitleCheck("MuseumTester");
      await pages.farMuseumWhatAreTheirContactDetailsPage.answerTheirContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
      await pages.farMuseumContactAddressSameAsPreviousPage.assertPageTitle(pages.farMuseumContactAddressSameAsPreviousPage.page, await pages.farMuseumContactAddressSameAsPreviousPage.expectedPageTitle());
      await pages.farMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameNo();
      await pages.farMuseumWhatIsTheirContactAddressPage.answerContactAddressWithTitleCheck(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle(pages.farDoYouHavePurchaseOrderPage.page, await pages.farDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    case "Renew existing authority": {
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Renew an existing authority");
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.assertPageTitle(pages.farUploadAdditionalExistingDocsPage.page, await pages.farUploadAdditionalExistingDocsPage.expectedPageTitle());
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(c.MUSEUM_NAME);
      await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farMuseumAnotherAddressForStoragePage.assertPageTitle(pages.farMuseumAnotherAddressForStoragePage.page, await pages.farMuseumAnotherAddressForStoragePage.expectedPageTitle());
      expect(await pages.farMuseumAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
      await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContactWithTitleCheck("Test");
      await pages.farMuseumWhatAreTheirContactDetailsPage.answerTheirContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
      await pages.farMuseumContactAddressSameAsPreviousPage.assertPageTitle(pages.farMuseumContactAddressSameAsPreviousPage.page, await pages.farMuseumContactAddressSameAsPreviousPage.expectedPageTitle());
      await pages.farMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameYes();
      await pages.farMuseumSelectTheContactAddressPage.answerSelectContactAddressWithTitleCheck();
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle(pages.farDoYouHavePurchaseOrderPage.page, await pages.farDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
      break;
    }
    case "Renew existing authority - additional Supporting doc - Yes": {
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Renew an existing authority");
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.assertPageTitle(pages.farUploadAdditionalExistingDocsPage.page, await pages.farUploadAdditionalExistingDocsPage.expectedPageTitle());
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(c.MUSEUM_NAME);
      await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farMuseumAnotherAddressForStoragePage.assertPageTitle(pages.farMuseumAnotherAddressForStoragePage.page, await pages.farMuseumAnotherAddressForStoragePage.expectedPageTitle());
      expect(await pages.farMuseumAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressYes();
      await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorage(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
      await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
      await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContactWithTitleCheck("Test");
      await pages.farMuseumWhatAreTheirContactDetailsPage.answerTheirContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
      await pages.farMuseumContactAddressSameAsPreviousPage.assertPageTitle(pages.farMuseumContactAddressSameAsPreviousPage.page, await pages.farMuseumContactAddressSameAsPreviousPage.expectedPageTitle());
      await pages.farMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameNo();
      await pages.farMuseumWhatIsTheirContactAddressPage.answerContactAddressWithTitleCheck(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle(pages.farDoYouHavePurchaseOrderPage.page, await pages.farDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    case "Amend existing authority": {
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Amend an existing authority");
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.assertPageTitle(pages.farUploadAdditionalExistingDocsPage.page, await pages.farUploadAdditionalExistingDocsPage.expectedPageTitle());
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(c.MUSEUM_NAME);
      await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farMuseumAnotherAddressForStoragePage.assertPageTitle(pages.farMuseumAnotherAddressForStoragePage.page, await pages.farMuseumAnotherAddressForStoragePage.expectedPageTitle());
      expect(await pages.farMuseumAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
      await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContactWithTitleCheck("Test");
      await pages.farMuseumWhatAreTheirContactDetailsPage.answerTheirContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
      await pages.farMuseumContactAddressSameAsPreviousPage.assertPageTitle(pages.farMuseumContactAddressSameAsPreviousPage.page, await pages.farMuseumContactAddressSameAsPreviousPage.expectedPageTitle());
      await pages.farMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameYes();
      await pages.farMuseumSelectTheContactAddressPage.answerSelectContactAddressWithTitleCheck();
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle(pages.farDoYouHavePurchaseOrderPage.page, await pages.farDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
      break;
    }
    case "Amend existing authority - additional Supporting doc - Yes": {
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Amend an existing authority");
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.assertPageTitle(pages.farUploadAdditionalExistingDocsPage.page, await pages.farUploadAdditionalExistingDocsPage.expectedPageTitle());
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(c.MUSEUM_NAME);
      await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farMuseumAnotherAddressForStoragePage.assertPageTitle(pages.farMuseumAnotherAddressForStoragePage.page, await pages.farMuseumAnotherAddressForStoragePage.expectedPageTitle());
      expect(await pages.farMuseumAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressYes();
      await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorage(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
      await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
      await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContactWithTitleCheck("Test");
      await pages.farMuseumWhatAreTheirContactDetailsPage.answerTheirContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
      await pages.farMuseumContactAddressSameAsPreviousPage.assertPageTitle(pages.farMuseumContactAddressSameAsPreviousPage.page, await pages.farMuseumContactAddressSameAsPreviousPage.expectedPageTitle());
      await pages.farMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameNo();
      await pages.farMuseumWhatIsTheirContactAddressPage.answerContactAddressWithTitleCheck(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle(pages.farDoYouHavePurchaseOrderPage.page, await pages.farDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    default:
      throw new Error(`Unknown FAR scenario description: FARMuseum/journey/${JSON.stringify(scenario)}`);
  }
}

When('I enter museum name and click continue', async ({ pages }) => {
  await pages.farMuseumTheMuseumNamePage.answerEnterMuseumName(c.MUSEUM_NAME);
});

When('I select No to another address to store or exhibit firearms and click continue', async ({ pages }) => {
  await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
});

When('I select Yes to contact address same as previous and click continue', async ({ pages }) => {
  await pages.farMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameYes();
});

When('I enter a museum contact name for scenario {string} in context {string} and click continue', async ({ pages }, scenario: string, context: string) => {
  if (context === 'validation') {
    switch (scenario) {
      case 'Apply for a new authority':
        await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContact('MuseumTest');
        return;
      case 'Renew existing authority':
        await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContact('MuseumTester');
        return;
      default:
        throw new Error(`Unknown FAR scenario description: FARMuseum/${context}/${JSON.stringify(scenario)}`);
    }
  }
  switch (scenario) {
    case 'Apply for a new authority':
      await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContact('MuseumTest');
      break;
    case 'Apply for a new authority - Another Storage address':
      await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContact('MuseumTester');
      break;
    case 'Renew existing authority':
    case 'Renew existing authority - additional Supporting doc - Yes':
    case 'Amend existing authority':
    case 'Amend existing authority - additional Supporting doc - Yes':
      await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContact('Test');
      break;
    default:
      throw new Error(`Unknown FAR scenario description: FARMuseum/${context}/${JSON.stringify(scenario)}`);
  }
});

When('I select address and click continue', async ({ pages }) => {
  await pages.farMuseumSelectTheContactAddressPage.answerSelectContactAddress();
});

Then('I change the museum name to {string} and museum address number to {string} and continue', async ({ pages }, museumName: string, museumAddressNo: string) => {
  await pages.farMuseumCheckYourAnswersPage.clickToChangeMuseumName();
  await pages.farMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(museumName);
  await pages.farMuseumCheckYourAnswersPage.changeMuseumAddressNum();
  await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorage(museumAddressNo, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  await pages.basePage.clickContinueButton();
});

Then('I check the museum details changes {string} and {string} are updated on the Check your answers page', async ({ pages }, name: string, address: string) => {
  await pages.farMuseumCheckYourAnswersPage.assertPageTitle(pages.farMuseumCheckYourAnswersPage.page, await pages.farMuseumCheckYourAnswersPage.expectedPageTitle());
  const details = await pages.farMuseumCheckYourAnswersPage.getUpdatedMuseumDetailsChanges();
  expect(details.Name).toBe(name);
  expect(details.Address.split(',')[0]).toBe(address);
});