import { expect } from '@playwright/test';
import { Given, When } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';
import { answerInvoiceContactAddressDetailsAndPurchaseOrder } from './far-common.step';
import type { Pages } from '../fixture/fixtures';

async function answerWhatIsTheMuseumsName(pages: Pages) {
    await pages.farMuseumTheMuseumNamePage.assertPageTitle();
    await pages.farMuseumTheMuseumNamePage.answerEnterMuseumName(c.MUSEUM_NAME);
  }

async function answerWhereToStoreFirearms(pages: Pages) {
    await pages.farMuseumWhereWillFirearmsBeStoredPage.assertPageTitle();
    await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  }

async function answerAnotherAddressToStoreFirearms(pages: Pages) {
    const storage = pages.farMuseumAnotherAddressForStoragePage;
    await storage.assertPageTitle();
    expect(await storage.isStorageAddressAdded()).toBe(true);
    if (pages.basePage.isYes(pages.basePage.data('anotherAddressToStoreFirearms'))) {
      await storage.answerFirearmsInAnotherAddressYes();
      await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorage(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
    }
    await storage.answerFirearmsInAnotherAddressNo();
  }

async function answerWhoToContactAndTheirContactDetails(pages: Pages) {
    await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.assertPageTitle();
    await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContact(pages.basePage.data('whoShouldWeContact'));
    await pages.farMuseumWhatAreTheirContactDetailsPage.assertPageTitle();
    await pages.farMuseumWhatAreTheirContactDetailsPage.answerTheirContactDetails(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
  }

async function answerIsContactAddressSameAsPrevious(pages: Pages) {
    const address = pages.farMuseumContactAddressSameAsPreviousPage;
    await address.assertPageTitle();
    if (pages.basePage.isYes(pages.basePage.data('contactSameAsPreviousAddress'))) {
      await address.answerContactAddressTheSameYes();
      await pages.farMuseumSelectTheContactAddressPage.assertPageTitle();
      await pages.farMuseumSelectTheContactAddressPage.answerSelectContactAddress();
    } else {
      await address.answerContactAddressTheSameNo();
      await pages.farMuseumWhatIsTheirContactAddressPage.assertPageTitle();
      await pages.farMuseumWhatIsTheirContactAddressPage.answerContactAddress(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
    }
  }

async function changeYourAnsForMuseum(pages: Pages, museumName: string, museumAddressNo: string) {
    await pages.farMuseumCheckYourAnswersPage.clickToChangeMuseumName();
    await pages.farMuseumTheMuseumNamePage.assertPageTitle();
    await pages.farMuseumTheMuseumNamePage.answerEnterMuseumName(museumName);
    await pages.farMuseumCheckYourAnswersPage.changeMuseumAddressNum();
    await pages.farMuseumWhereWillFirearmsBeStoredPage.assertPageTitle();
    await pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorage(museumAddressNo, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
    await pages.basePage.clickContinueButton();
  }

async function getUpdatedMuseumDetails(pages: Pages) {
    await pages.farMuseumCheckYourAnswersPage.assertPageTitle();
    return pages.farMuseumCheckYourAnswersPage.getUpdatedMuseumDetailsChanges();
  }



When('I fill out my answers to the Firearms Museums questionnaire', async ({ pages, page }) => {
  await answerWhatIsTheMuseumsName(pages);
  await answerWhereToStoreFirearms(pages);
  await answerAnotherAddressToStoreFirearms(pages);
  await answerWhoToContactAndTheirContactDetails(pages);
  await answerIsContactAddressSameAsPrevious(pages);
  await answerInvoiceContactAddressDetailsAndPurchaseOrder(pages);
});

Given('I change the museum name to {string} and museum address number to {string} and continue', async ({ pages, page }, name: string, address: string) => {
  await changeYourAnsForMuseum(pages, name, address);
});

Given('I check the museum details changes {string} and {string} are updated on the Check your answers page', async ({ pages, page }, name: string, address: string) => {
  const details = await getUpdatedMuseumDetails(pages);
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
