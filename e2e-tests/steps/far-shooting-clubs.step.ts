import { expect } from '@playwright/test';
import { Given, When, farSteps, FarStepLib } from './far.step';

When('I fill out my answers to the Firearms {string} questionnaire', async ({ pages, page }, journey: string) => {
  const steps = farSteps(pages, page);
  await steps.uploadSupportAndAdditionalDocs(journey);
  await steps.answerEnterClubName();
  await steps.answerEnterClubAndSecAddressDetails();
  await steps.answerClubUseAnotherShootingRange();
  await steps.answerAnotherAddressForGunStorage();
  await steps.answerInvoiceContactAddressDetailsAndPurchaseOrder();
});
Given('I change the club name to {string} and club address number to {string} and continue', async ({ pages, page }, name: string, address: string) => {
  await farSteps(pages, page).changeYourAnsForShootClub(name, address);
});
Given('I check the club details changes {string} and {string} are updated on the Check your answers page', async ({ pages, page }, name: string, address: string) => {
  const details = await farSteps(pages, page).getUpdatedSClubDetails();
  expect(details['Club name']).toBe(name);
  expect(details.Address.split(',')[0]).toBe(address);
});
const validationActions: Record<string, (steps: FarStepLib) => Promise<void>> = {
  'I enter the club name and click continue': steps => steps.enterClubName(),
  'I select No for a new club and click continue': steps => steps.selectNoForNewClub(),
  'I enter the name of the club secretary and click continue': steps => steps.enterClubSecName(),
  'I enter the club secretary address and click continue': steps => steps.enterClubSecAddress(),
  'I enter the club email and click continue': steps => steps.enterClubEmail(),
  'I enter the second person name and click continue': steps => steps.enterSecondPersonName(),
  'I enter the second person contact address and click continue': steps => steps.enterSecondPersonContactAddress(),
  'I enter the second person email and click continue': steps => steps.enterSecondPersonEmail(),
  'I enter the club shooting ranges address and click continue': steps => steps.enterShootingRangesAddress(),
  'I select firearms category to use and click continue': steps => steps.selectFirearmsCategory(),
  'I select No to use another shooting range and click continue': steps => steps.selectNoAnotherShootingRange(),
  'I select No to use another address for gun storage and click continue': steps => steps.selectNoAnotherAddressForGunStorage(),
};
for (const [phrase, action] of Object.entries(validationActions)) {
  When(phrase, async ({ pages, page }) => { await action(farSteps(pages, page)); });
}
