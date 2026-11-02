import { expect } from '@playwright/test';
import { Given, When, farSteps, FarStepLib } from './far.step';

When('I fill out my answers to the Firearms Museums questionnaire', async ({ pages, page }) => {
  const steps = farSteps(pages, page);
  await steps.answerWhatIsTheMuseumsName();
  await steps.answerWhereToStoreFirearms();
  await steps.answerAnotherAddressToStoreFirearms();
  await steps.answerWhoToContactAndTheirContactDetails();
  await steps.answerIsContactAddressSameAsPrevious();
  await steps.answerInvoiceContactAddressDetailsAndPurchaseOrder();
});
Given('I change the museum name to {string} and museum address number to {string} and continue', async ({ pages, page }, name: string, address: string) => {
  await farSteps(pages, page).changeYourAnsForMuseum(name, address);
});
Given('I check the museum details changes {string} and {string} are updated on the Check your answers page', async ({ pages, page }, name: string, address: string) => {
  const details = await farSteps(pages, page).getUpdatedMuseumDetails();
  expect(details.Name).toBe(name);
  expect(details.Address.split(',')[0]).toBe(address);
});
const validationActions: Record<string, (steps: FarStepLib) => Promise<void>> = {
  'I enter museum name and click continue': steps => steps.enterMuseumName(),
  'I select No to another address to store or exhibit firearms and click continue': steps => steps.selectNoForAnotherAddress(),
  'I select Yes to contact address same as previous and click continue': steps => steps.selectYesForAnotherAddress(),
  'I enter a contact name and click continue': steps => steps.selectContactName(),
  'I select address and click continue': steps => steps.selectAddress(),
};
for (const [phrase, action] of Object.entries(validationActions)) {
  When(phrase, async ({ pages, page }) => { await action(farSteps(pages, page)); });
}
