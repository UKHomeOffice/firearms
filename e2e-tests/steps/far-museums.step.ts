import { expect } from '@playwright/test';
import { Given, When, type Pages } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

async function startMuseumsQuestionnaire(pages: Pages): Promise<void> {
  await pages.farChooseAJourneyHomePage.chooseJourneyWithTitleCheck('Museums');
  await pages.farPrivacyNoticePage.continueWithTitleCheck();
  await pages.farWhatDoYouWantToDoPage.assertPageTitle();
}

export async function completeMuseumsQuestionnaire(pages: Pages, scenario: string, dataOnly = false, context = 'journey'): Promise<void> {
  if (context !== 'journey' && context !== 'validation') {
    throw new Error(`Unsupported FAR data context: FARMuseum/${context}`);
  }
  if (context === 'validation') {
    switch (scenario) {
      case "Apply for a new authority":
        pages.basePage.applicant = {
          whatYouWantToDo: "Apply for a new authority",
          uploadAdditionalExistingDoc: "Yes",
          whatIsTheMuseumName: "Museum1",
          anotherAddressToStoreFirearms: "No",
          whoShouldWeContact: "MuseumTest",
          contactSameAsPreviousAddress: "Yes",
          purchaseOrder: "No",
        };
        return;
      case "Renew existing authority":
        pages.basePage.applicant = {
          whatYouWantToDo: "Apply for a new authority",
          uploadAdditionalExistingDoc: "Yes",
          whatIsTheMuseumName: "Museum1",
          anotherAddressToStoreFirearms: "Yes",
          whoShouldWeContact: "MuseumTester",
          contactSameAsPreviousAddress: "No",
          purchaseOrder: "Yes",
        };
        return;
      default:
        throw new Error(`Unknown FAR scenario description: FARMuseum/${context}/${JSON.stringify(scenario)}`);
    }
  }
  switch (scenario) {
    case "Apply for a new authority": {
      const answers = {
        whatYouWantToDo: "Apply for a new authority",
        uploadAdditionalExistingDoc: "Yes",
        whatIsTheMuseumName: "Museum1",
        anotherAddressToStoreFirearms: "No",
        whoShouldWeContact: "MuseumTest",
        contactSameAsPreviousAddress: "Yes",
        purchaseOrder: "No",
      };
      pages.basePage.applicant = answers;
      if (dataOnly) return;
      await startMuseumsQuestionnaire(pages);
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo(answers.whatYouWantToDo);
      await pages.farMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(c.MUSEUM_NAME);
      await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farMuseumAnotherAddressForStoragePage.assertPageTitle();
      expect(await pages.farMuseumAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
      await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContactWithTitleCheck(answers.whoShouldWeContact);
      await pages.farMuseumWhatAreTheirContactDetailsPage.answerTheirContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
      await pages.farMuseumContactAddressSameAsPreviousPage.assertPageTitle();
      await pages.farMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameYes();
      await pages.farMuseumSelectTheContactAddressPage.answerSelectContactAddressWithTitleCheck();
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle();
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
      break;
    }
    case "Apply for a new authority - Another Storage address": {
      const answers = {
        whatYouWantToDo: "Apply for a new authority",
        uploadAdditionalExistingDoc: "Yes",
        whatIsTheMuseumName: "Museum1",
        anotherAddressToStoreFirearms: "Yes",
        whoShouldWeContact: "MuseumTester",
        contactSameAsPreviousAddress: "No",
        purchaseOrder: "Yes",
      };
      pages.basePage.applicant = answers;
      if (dataOnly) return;
      await startMuseumsQuestionnaire(pages);
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo(answers.whatYouWantToDo);
      await pages.farMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(c.MUSEUM_NAME);
      await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farMuseumAnotherAddressForStoragePage.assertPageTitle();
      expect(await pages.farMuseumAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressYes();
      await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorage(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
      await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
      await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContactWithTitleCheck(answers.whoShouldWeContact);
      await pages.farMuseumWhatAreTheirContactDetailsPage.answerTheirContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
      await pages.farMuseumContactAddressSameAsPreviousPage.assertPageTitle();
      await pages.farMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameNo();
      await pages.farMuseumWhatIsTheirContactAddressPage.answerContactAddressWithTitleCheck(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle();
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    case "Renew existing authority": {
      const answers = {
        whatYouWantToDo: "Renew an existing authority",
        uploadAdditionalExistingDoc: "No",
        whatIsTheMuseumName: "Museum1",
        anotherAddressToStoreFirearms: "No",
        whoShouldWeContact: "Test",
        contactSameAsPreviousAddress: "Yes",
        purchaseOrder: "No",
      };
      pages.basePage.applicant = answers;
      if (dataOnly) return;
      await startMuseumsQuestionnaire(pages);
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo(answers.whatYouWantToDo);
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.assertPageTitle();
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(c.MUSEUM_NAME);
      await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farMuseumAnotherAddressForStoragePage.assertPageTitle();
      expect(await pages.farMuseumAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
      await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContactWithTitleCheck(answers.whoShouldWeContact);
      await pages.farMuseumWhatAreTheirContactDetailsPage.answerTheirContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
      await pages.farMuseumContactAddressSameAsPreviousPage.assertPageTitle();
      await pages.farMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameYes();
      await pages.farMuseumSelectTheContactAddressPage.answerSelectContactAddressWithTitleCheck();
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle();
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
      break;
    }
    case "Renew existing authority - additional Supporting doc - Yes": {
      const answers = {
        whatYouWantToDo: "Renew an existing authority",
        uploadAdditionalExistingDoc: "Yes",
        whatIsTheMuseumName: "Museum1",
        anotherAddressToStoreFirearms: "Yes",
        whoShouldWeContact: "Test",
        contactSameAsPreviousAddress: "No",
        purchaseOrder: "Yes",
      };
      pages.basePage.applicant = answers;
      if (dataOnly) return;
      await startMuseumsQuestionnaire(pages);
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo(answers.whatYouWantToDo);
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.assertPageTitle();
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(c.MUSEUM_NAME);
      await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farMuseumAnotherAddressForStoragePage.assertPageTitle();
      expect(await pages.farMuseumAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressYes();
      await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorage(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
      await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
      await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContactWithTitleCheck(answers.whoShouldWeContact);
      await pages.farMuseumWhatAreTheirContactDetailsPage.answerTheirContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
      await pages.farMuseumContactAddressSameAsPreviousPage.assertPageTitle();
      await pages.farMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameNo();
      await pages.farMuseumWhatIsTheirContactAddressPage.answerContactAddressWithTitleCheck(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle();
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    case "Amend existing authority": {
      const answers = {
        whatYouWantToDo: "Amend an existing authority",
        uploadAdditionalExistingDoc: "No",
        whatIsTheMuseumName: "Museum1",
        anotherAddressToStoreFirearms: "No",
        whoShouldWeContact: "Test",
        contactSameAsPreviousAddress: "Yes",
        purchaseOrder: "No",
      };
      pages.basePage.applicant = answers;
      if (dataOnly) return;
      await startMuseumsQuestionnaire(pages);
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo(answers.whatYouWantToDo);
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.assertPageTitle();
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(c.MUSEUM_NAME);
      await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farMuseumAnotherAddressForStoragePage.assertPageTitle();
      expect(await pages.farMuseumAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
      await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContactWithTitleCheck(answers.whoShouldWeContact);
      await pages.farMuseumWhatAreTheirContactDetailsPage.answerTheirContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
      await pages.farMuseumContactAddressSameAsPreviousPage.assertPageTitle();
      await pages.farMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameYes();
      await pages.farMuseumSelectTheContactAddressPage.answerSelectContactAddressWithTitleCheck();
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle();
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
      break;
    }
    case "Amend existing authority - additional Supporting doc - Yes": {
      const answers = {
        whatYouWantToDo: "Amend an existing authority",
        uploadAdditionalExistingDoc: "Yes",
        whatIsTheMuseumName: "Museum1",
        anotherAddressToStoreFirearms: "Yes",
        whoShouldWeContact: "Test",
        contactSameAsPreviousAddress: "No",
        purchaseOrder: "Yes",
      };
      pages.basePage.applicant = answers;
      if (dataOnly) return;
      await startMuseumsQuestionnaire(pages);
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo(answers.whatYouWantToDo);
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.assertPageTitle();
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(c.MUSEUM_NAME);
      await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farMuseumAnotherAddressForStoragePage.assertPageTitle();
      expect(await pages.farMuseumAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressYes();
      await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorage(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
      await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
      await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContactWithTitleCheck(answers.whoShouldWeContact);
      await pages.farMuseumWhatAreTheirContactDetailsPage.answerTheirContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
      await pages.farMuseumContactAddressSameAsPreviousPage.assertPageTitle();
      await pages.farMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameNo();
      await pages.farMuseumWhatIsTheirContactAddressPage.answerContactAddressWithTitleCheck(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle();
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    default:
      throw new Error(`Unknown FAR scenario description: FARMuseum/${context}/${JSON.stringify(scenario)}`);
  }
}

Given('I change the museum name to {string} and museum address number to {string} and continue', async ({ pages, page }, museumName: string, museumAddressNo: string) => {
  await pages.farMuseumCheckYourAnswersPage.clickToChangeMuseumName();
  await pages.farMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(museumName);
  await pages.farMuseumCheckYourAnswersPage.changeMuseumAddressNum();
  await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorage(museumAddressNo, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  await pages.basePage.clickContinueButton();
});

Given('I check the museum details changes {string} and {string} are updated on the Check your answers page', async ({ pages, page }, name: string, address: string) => {
  await pages.farMuseumCheckYourAnswersPage.assertPageTitle();
  const details = await pages.farMuseumCheckYourAnswersPage.getUpdatedMuseumDetailsChanges();
  expect(details.Name).toBe(name);
  expect(details.Address.split(',')[0]).toBe(address);
});

When('I enter museum name and click continue', async ({ pages, page }) => {
  await pages.farMuseumTheMuseumNamePage.answerEnterMuseumName(c.MUSEUM_NAME);
});

When('I select No to another address to store or exhibit firearms and click continue', async ({ pages, page }) => {
  await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
});

When('I select Yes to contact address same as previous and click continue', async ({ pages, page }) => {
  await pages.farMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameYes();
});

When('I enter a contact name and click continue', async ({ pages, page }) => {
  await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContact(pages.basePage.data('whoShouldWeContact'));
});

When('I select address and click continue', async ({ pages, page }) => {
  await pages.farMuseumSelectTheContactAddressPage.answerSelectContactAddress();
});
