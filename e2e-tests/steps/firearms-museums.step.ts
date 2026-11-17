import { expect } from '@playwright/test';
import { Then, When, type Pages } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export async function completeMuseumsApplicationForm(pages: Pages, scenario: string, context: string): Promise<void> {
  if (context !== 'journey') {
    throw new Error(`Unsupported Firearms application form context: FARMuseum/${context}`);
  }

  await pages.firearmsChooseAJourneyHomePage.chooseJourneyWithTitleCheck('Museums');
  await pages.firearmsPrivacyNoticePage.continueWithTitleCheck();
  await pages.firearmsWhatDoYouWantToDoPage.assertPageTitle(pages.firearmsWhatDoYouWantToDoPage.page, await pages.firearmsWhatDoYouWantToDoPage.expectedPageTitle());

  switch (scenario) {
    case "Apply for a new authority": {
      await pages.firearmsWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Apply for a new authority");
      await pages.firearmsMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(c.MUSEUM_NAME);
      await pages.firearmsMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsMuseumAnotherAddressForStoragePage.assertPageTitle(pages.firearmsMuseumAnotherAddressForStoragePage.page, await pages.firearmsMuseumAnotherAddressForStoragePage.expectedPageTitle());
      expect(await pages.firearmsMuseumAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.firearmsMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
      await pages.firearmsMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContactWithTitleCheck("MuseumTest");
      await pages.firearmsMuseumWhatAreTheirContactDetailsPage.answerTheirContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsMuseumContactAddressSameAsPreviousPage.assertPageTitle(pages.firearmsMuseumContactAddressSameAsPreviousPage.page, await pages.firearmsMuseumContactAddressSameAsPreviousPage.expectedPageTitle());
      await pages.firearmsMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameYes();
      await pages.firearmsMuseumSelectTheContactAddressPage.answerSelectContactAddressWithTitleCheck();
      await pages.firearmsWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.firearmsWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsDoYouHavePurchaseOrderPage.assertPageTitle(pages.firearmsDoYouHavePurchaseOrderPage.page, await pages.firearmsDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.firearmsDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
      break;
    }
    case "Apply for a new authority - Another Storage address": {
      await pages.firearmsWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Apply for a new authority");
      await pages.firearmsMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(c.MUSEUM_NAME);
      await pages.firearmsMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsMuseumAnotherAddressForStoragePage.assertPageTitle(pages.firearmsMuseumAnotherAddressForStoragePage.page, await pages.firearmsMuseumAnotherAddressForStoragePage.expectedPageTitle());
      expect(await pages.firearmsMuseumAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.firearmsMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressYes();
      await pages.firearmsMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorage(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
      await pages.firearmsMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
      await pages.firearmsMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContactWithTitleCheck("MuseumTester");
      await pages.firearmsMuseumWhatAreTheirContactDetailsPage.answerTheirContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsMuseumContactAddressSameAsPreviousPage.assertPageTitle(pages.firearmsMuseumContactAddressSameAsPreviousPage.page, await pages.firearmsMuseumContactAddressSameAsPreviousPage.expectedPageTitle());
      await pages.firearmsMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameNo();
      await pages.firearmsMuseumWhatIsTheirContactAddressPage.answerContactAddressWithTitleCheck(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
      await pages.firearmsWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.firearmsWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsDoYouHavePurchaseOrderPage.assertPageTitle(pages.firearmsDoYouHavePurchaseOrderPage.page, await pages.firearmsDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.firearmsDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    case "Renew existing authority": {
      await pages.firearmsWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Renew an existing authority");
      await pages.firearmsUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.firearmsUploadAdditionalExistingDocsPage.assertPageTitle(pages.firearmsUploadAdditionalExistingDocsPage.page, await pages.firearmsUploadAdditionalExistingDocsPage.expectedPageTitle());
      await pages.firearmsUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(c.MUSEUM_NAME);
      await pages.firearmsMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsMuseumAnotherAddressForStoragePage.assertPageTitle(pages.firearmsMuseumAnotherAddressForStoragePage.page, await pages.firearmsMuseumAnotherAddressForStoragePage.expectedPageTitle());
      expect(await pages.firearmsMuseumAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.firearmsMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
      await pages.firearmsMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContactWithTitleCheck("Test");
      await pages.firearmsMuseumWhatAreTheirContactDetailsPage.answerTheirContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsMuseumContactAddressSameAsPreviousPage.assertPageTitle(pages.firearmsMuseumContactAddressSameAsPreviousPage.page, await pages.firearmsMuseumContactAddressSameAsPreviousPage.expectedPageTitle());
      await pages.firearmsMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameYes();
      await pages.firearmsMuseumSelectTheContactAddressPage.answerSelectContactAddressWithTitleCheck();
      await pages.firearmsWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.firearmsWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsDoYouHavePurchaseOrderPage.assertPageTitle(pages.firearmsDoYouHavePurchaseOrderPage.page, await pages.firearmsDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.firearmsDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
      break;
    }
    case "Renew existing authority - additional Supporting doc - Yes": {
      await pages.firearmsWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Renew an existing authority");
      await pages.firearmsUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.firearmsUploadAdditionalExistingDocsPage.assertPageTitle(pages.firearmsUploadAdditionalExistingDocsPage.page, await pages.firearmsUploadAdditionalExistingDocsPage.expectedPageTitle());
      await pages.firearmsUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.firearmsUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.firearmsUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(c.MUSEUM_NAME);
      await pages.firearmsMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsMuseumAnotherAddressForStoragePage.assertPageTitle(pages.firearmsMuseumAnotherAddressForStoragePage.page, await pages.firearmsMuseumAnotherAddressForStoragePage.expectedPageTitle());
      expect(await pages.firearmsMuseumAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.firearmsMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressYes();
      await pages.firearmsMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorage(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
      await pages.firearmsMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
      await pages.firearmsMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContactWithTitleCheck("Test");
      await pages.firearmsMuseumWhatAreTheirContactDetailsPage.answerTheirContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsMuseumContactAddressSameAsPreviousPage.assertPageTitle(pages.firearmsMuseumContactAddressSameAsPreviousPage.page, await pages.firearmsMuseumContactAddressSameAsPreviousPage.expectedPageTitle());
      await pages.firearmsMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameNo();
      await pages.firearmsMuseumWhatIsTheirContactAddressPage.answerContactAddressWithTitleCheck(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
      await pages.firearmsWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.firearmsWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsDoYouHavePurchaseOrderPage.assertPageTitle(pages.firearmsDoYouHavePurchaseOrderPage.page, await pages.firearmsDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.firearmsDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    case "Amend existing authority": {
      await pages.firearmsWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Amend an existing authority");
      await pages.firearmsUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.firearmsUploadAdditionalExistingDocsPage.assertPageTitle(pages.firearmsUploadAdditionalExistingDocsPage.page, await pages.firearmsUploadAdditionalExistingDocsPage.expectedPageTitle());
      await pages.firearmsUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(c.MUSEUM_NAME);
      await pages.firearmsMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsMuseumAnotherAddressForStoragePage.assertPageTitle(pages.firearmsMuseumAnotherAddressForStoragePage.page, await pages.firearmsMuseumAnotherAddressForStoragePage.expectedPageTitle());
      expect(await pages.firearmsMuseumAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.firearmsMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
      await pages.firearmsMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContactWithTitleCheck("Test");
      await pages.firearmsMuseumWhatAreTheirContactDetailsPage.answerTheirContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsMuseumContactAddressSameAsPreviousPage.assertPageTitle(pages.firearmsMuseumContactAddressSameAsPreviousPage.page, await pages.firearmsMuseumContactAddressSameAsPreviousPage.expectedPageTitle());
      await pages.firearmsMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameYes();
      await pages.firearmsMuseumSelectTheContactAddressPage.answerSelectContactAddressWithTitleCheck();
      await pages.firearmsWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.firearmsWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsDoYouHavePurchaseOrderPage.assertPageTitle(pages.firearmsDoYouHavePurchaseOrderPage.page, await pages.firearmsDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.firearmsDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
      break;
    }
    case "Amend existing authority - additional Supporting doc - Yes": {
      await pages.firearmsWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Amend an existing authority");
      await pages.firearmsUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.firearmsUploadAdditionalExistingDocsPage.assertPageTitle(pages.firearmsUploadAdditionalExistingDocsPage.page, await pages.firearmsUploadAdditionalExistingDocsPage.expectedPageTitle());
      await pages.firearmsUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.firearmsUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.firearmsUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(c.MUSEUM_NAME);
      await pages.firearmsMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsMuseumAnotherAddressForStoragePage.assertPageTitle(pages.firearmsMuseumAnotherAddressForStoragePage.page, await pages.firearmsMuseumAnotherAddressForStoragePage.expectedPageTitle());
      expect(await pages.firearmsMuseumAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.firearmsMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressYes();
      await pages.firearmsMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorage(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
      await pages.firearmsMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
      await pages.firearmsMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContactWithTitleCheck("Test");
      await pages.firearmsMuseumWhatAreTheirContactDetailsPage.answerTheirContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsMuseumContactAddressSameAsPreviousPage.assertPageTitle(pages.firearmsMuseumContactAddressSameAsPreviousPage.page, await pages.firearmsMuseumContactAddressSameAsPreviousPage.expectedPageTitle());
      await pages.firearmsMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameNo();
      await pages.firearmsMuseumWhatIsTheirContactAddressPage.answerContactAddressWithTitleCheck(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
      await pages.firearmsWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.firearmsWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsDoYouHavePurchaseOrderPage.assertPageTitle(pages.firearmsDoYouHavePurchaseOrderPage.page, await pages.firearmsDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.firearmsDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    default:
      throw new Error(`Unknown Firearms scenario description: FARMuseum/journey/${JSON.stringify(scenario)}`);
  }
}

When('I enter museum name and click continue', async ({ pages }) => {
  await pages.firearmsMuseumTheMuseumNamePage.answerEnterMuseumName(c.MUSEUM_NAME);
});

When('I select No to another address to store or exhibit firearms and click continue', async ({ pages }) => {
  await pages.firearmsMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
});

When('I select Yes to contact address same as previous and click continue', async ({ pages }) => {
  await pages.firearmsMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameYes();
});

When('I enter a museum contact name for scenario {string} in context {string} and click continue', async ({ pages }, scenario: string, context: string) => {
  if (context === 'validation') {
    switch (scenario) {
      case 'Apply for a new authority':
        await pages.firearmsMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContact('MuseumTest');
        return;
      case 'Renew existing authority':
        await pages.firearmsMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContact('MuseumTester');
        return;
      default:
        throw new Error(`Unknown Firearms scenario description: FARMuseum/${context}/${JSON.stringify(scenario)}`);
    }
  }
  switch (scenario) {
    case 'Apply for a new authority':
      await pages.firearmsMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContact('MuseumTest');
      break;
    case 'Apply for a new authority - Another Storage address':
      await pages.firearmsMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContact('MuseumTester');
      break;
    case 'Renew existing authority':
    case 'Renew existing authority - additional Supporting doc - Yes':
    case 'Amend existing authority':
    case 'Amend existing authority - additional Supporting doc - Yes':
      await pages.firearmsMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContact('Test');
      break;
    default:
      throw new Error(`Unknown Firearms scenario description: FARMuseum/${context}/${JSON.stringify(scenario)}`);
  }
});

When('I select address and click continue', async ({ pages }) => {
  await pages.firearmsMuseumSelectTheContactAddressPage.answerSelectContactAddress();
});

Then('I change the museum name to {string} and museum address number to {string} and continue', async ({ pages }, museumName: string, museumAddressNo: string) => {
  await pages.firearmsMuseumCheckYourAnswersPage.clickToChangeMuseumName();
  await pages.firearmsMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(museumName);
  await pages.firearmsMuseumCheckYourAnswersPage.changeMuseumAddressNum();
  await pages.firearmsMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorage(museumAddressNo, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  await pages.basePage.clickContinueButton();
});

Then('I check the museum details changes {string} and {string} are updated on the Check your answers page', async ({ pages }, name: string, address: string) => {
  await pages.firearmsMuseumCheckYourAnswersPage.assertPageTitle(pages.firearmsMuseumCheckYourAnswersPage.page, await pages.firearmsMuseumCheckYourAnswersPage.expectedPageTitle());
  const details = await pages.firearmsMuseumCheckYourAnswersPage.getUpdatedMuseumDetailsChanges();
  expect(details.Name).toBe(name);
  expect(details.Address.split(',')[0]).toBe(address);
});