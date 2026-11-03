import { expect } from '@playwright/test';
import { Given, When } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

When('I fill out my answers to the Firearms Museums questionnaire', async ({ pages, page }) => {
  const steps = pages.farPage;
  await steps.answerWhatIsTheMuseumsName();
  await steps.answerWhereToStoreFirearms();
  await steps.answerAnotherAddressToStoreFirearms();
  await steps.answerWhoToContactAndTheirContactDetails();
  await steps.answerIsContactAddressSameAsPrevious();
  await steps.answerInvoiceContactAddressDetailsAndPurchaseOrder();
});

Given('I change the museum name to {string} and museum address number to {string} and continue', async ({ pages, page }, name: string, address: string) => {
  await pages.farPage.changeYourAnsForMuseum(name, address);
});

Given('I check the museum details changes {string} and {string} are updated on the Check your answers page', async ({ pages, page }, name: string, address: string) => {
  const details = await pages.farPage.getUpdatedMuseumDetails();
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
  await pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContact(pages.farPage.data('whoShouldWeContact'));
});

When('I select address and click continue', async ({ pages, page }) => {
  await pages.farMuseumSelectTheContactAddressPage.answerSelectContactAddress();
});
