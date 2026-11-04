import { expect } from '@playwright/test';
import { Given, When } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export function selectMuseumsScenario(description: string, context = 'journey'): Record<string, string> {
  if (context !== 'journey' && context !== 'validation') {
    throw new Error(`Unsupported FAR data context: FARMuseum/${context}`);
  }
  if (context === 'validation') {
    switch (description) {
      case "Apply for a new authority":
        return {
          whatYouWantToDo: "Apply for a new authority",
          uploadAdditionalExistingDoc: "Yes",
          whatIsTheMuseumName: "Museum1",
          anotherAddressToStoreFirearms: "No",
          whoShouldWeContact: "MuseumTest",
          contactSameAsPreviousAddress: "Yes",
          purchaseOrder: "No",
        };
      case "Renew existing authority":
        return {
          whatYouWantToDo: "Apply for a new authority",
          uploadAdditionalExistingDoc: "Yes",
          whatIsTheMuseumName: "Museum1",
          anotherAddressToStoreFirearms: "Yes",
          whoShouldWeContact: "MuseumTester",
          contactSameAsPreviousAddress: "No",
          purchaseOrder: "Yes",
        };
      default:
        throw new Error(`Unknown FAR scenario description: FARMuseum/${context}/${JSON.stringify(description)}`);
    }
  }
  switch (description) {
    case "Apply for a new authority":
      return {
        whatYouWantToDo: "Apply for a new authority",
        uploadAdditionalExistingDoc: "Yes",
        whatIsTheMuseumName: "Museum1",
        anotherAddressToStoreFirearms: "No",
        whoShouldWeContact: "MuseumTest",
        contactSameAsPreviousAddress: "Yes",
        purchaseOrder: "No",
      };
    case "Apply for a new authority - Another Storage address":
      return {
        whatYouWantToDo: "Apply for a new authority",
        uploadAdditionalExistingDoc: "Yes",
        whatIsTheMuseumName: "Museum1",
        anotherAddressToStoreFirearms: "Yes",
        whoShouldWeContact: "MuseumTester",
        contactSameAsPreviousAddress: "No",
        purchaseOrder: "Yes",
      };
    case "Renew existing authority":
      return {
        whatYouWantToDo: "Renew an existing authority",
        uploadAdditionalExistingDoc: "No",
        whatIsTheMuseumName: "Museum1",
        anotherAddressToStoreFirearms: "No",
        whoShouldWeContact: "Test",
        contactSameAsPreviousAddress: "Yes",
        purchaseOrder: "No",
      };
    case "Renew existing authority - additional Supporting doc - Yes":
      return {
        whatYouWantToDo: "Renew an existing authority",
        uploadAdditionalExistingDoc: "Yes",
        whatIsTheMuseumName: "Museum1",
        anotherAddressToStoreFirearms: "Yes",
        whoShouldWeContact: "Test",
        contactSameAsPreviousAddress: "No",
        purchaseOrder: "Yes",
      };
    case "Amend existing authority":
      return {
        whatYouWantToDo: "Amend an existing authority",
        uploadAdditionalExistingDoc: "No",
        whatIsTheMuseumName: "Museum1",
        anotherAddressToStoreFirearms: "No",
        whoShouldWeContact: "Test",
        contactSameAsPreviousAddress: "Yes",
        purchaseOrder: "No",
      };
    case "Amend existing authority - additional Supporting doc - Yes":
      return {
        whatYouWantToDo: "Amend an existing authority",
        uploadAdditionalExistingDoc: "Yes",
        whatIsTheMuseumName: "Museum1",
        anotherAddressToStoreFirearms: "Yes",
        whoShouldWeContact: "Test",
        contactSameAsPreviousAddress: "No",
        purchaseOrder: "Yes",
      };
    default:
      throw new Error(`Unknown FAR scenario description: FARMuseum/${context}/${JSON.stringify(description)}`);
  }
}

When('I fill out my answers to the Firearms Museums questionnaire pertaining to {string}', async ({ pages }, scenario: string) => {
  pages.basePage.assertScenario('FARMuseum', scenario);
  await pages.farMuseumTheMuseumNamePage.answerEnterMuseumNameWithTitleCheck(c.MUSEUM_NAME);
  await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  await pages.farMuseumAnotherAddressForStoragePage.assertPageTitle();
  expect(await pages.farMuseumAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
  if (pages.basePage.isYes(pages.basePage.data('anotherAddressToStoreFirearms'))) {
    await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressYes();
    await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorage(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
  }
  await pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
  await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContactWithTitleCheck(pages.basePage.data('whoShouldWeContact'));
  await pages.farMuseumWhatAreTheirContactDetailsPage.answerTheirContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
  await pages.farMuseumContactAddressSameAsPreviousPage.assertPageTitle();
  if (pages.basePage.isYes(pages.basePage.data('contactSameAsPreviousAddress'))) {
    await pages.farMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameYes();
    await pages.farMuseumSelectTheContactAddressPage.answerSelectContactAddressWithTitleCheck();
  } else {
    await pages.farMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameNo();
    await pages.farMuseumWhatIsTheirContactAddressPage.answerContactAddressWithTitleCheck(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
  }
  await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
  await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  await pages.farDoYouHavePurchaseOrderPage.assertPageTitle();
  if (pages.basePage.isYes(pages.basePage.data('purchaseOrder'))) await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
  else await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
});

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
