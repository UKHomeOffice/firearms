import { expect } from '@playwright/test';
import { Given, When, Then } from '../fixture/fixtures';
import { parseFarProduct } from '../test-data/far-applicant';
import { ConstantsLib as c } from '../utility-helper/constants-lib';
import { checkFarAnswers } from './far-check-answers';
import type { Pages } from '../fixture/fixtures';

async function answerChooseAJourney(pages: Pages, journey: string) {
  await pages.farChooseAJourneyHomePage.assertPageTitle();
  await pages.farChooseAJourneyHomePage.answerSelectAJourney(journey);
  if (journey.toLowerCase() !== 'supporting documents') {
    await pages.farPrivacyNoticePage.assertPageTitle();
    await pages.basePage.clickContinueButton();

    if (journey.toLowerCase() === 'new dealer') {
      await pages.farBeforeYouStartPage.assertPageTitle();
      await pages.farBeforeYouStartPage.clickContinueBtn();
    }
  }
}

async function answerUploadExistingDoc(pages: Pages) {
  await pages.farUploadExistingAuthDocsPage.assertPageTitle();
  await pages.farUploadExistingAuthDocsPage.uploadExistingFile(c.UPLOAD_FILE);
}

export async function answerInvoiceContactAddressDetailsAndPurchaseOrder(pages: Pages) {
  await pages.farWhoShouldWeContactAbtTheInvoicePage.assertPageTitle();
  await enterContactForInvoicing(pages, c.CONTACT_EMAIL_ADDRESS);
  await pages.farWhatIsTheirInvoiceAddressPage.assertPageTitle();
  await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetails(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  await pages.farDoYouHavePurchaseOrderPage.assertPageTitle();
  if (pages.basePage.isYes(pages.basePage.data('purchaseOrder'))) await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
  else await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
}

async function answerEnterRefNumber(pages: Pages) {
  await pages.farSupportDocAppRefNumberPage.assertPageTitle();
  await enterApplicationRefNo(pages);
}

async function getSupportingApplicationDetails(pages: Pages) {
  return pages.farSupportingDocCheckAnswersPage.getApplicationDetails();
}

async function chooseFirearmsJourneyToStart(pages: Pages, journey: string) {
  await pages.farChooseAJourneyHomePage.answerSelectAJourney(journey);
  await pages.basePage.clickContinueButton();
  // Only the S5 journey has a before-you-start page.
  if (journey.toLowerCase() === 'new dealer') await pages.farBeforeYouStartPage.clickContinueBtn();
}

async function selectWhatToDo(pages: Pages, whatToDo: string) {
  await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo(whatToDo);
}

async function selectUploadFileBtn(pages: Pages) {
  await pages.basePage.page.getByRole('button', { name: 'Upload file', exact: true })
    .and(pages.basePage.page.locator('button, input[type="submit"]')).click();
}


async function uploadAdditionalDoc(pages: Pages, option: string) {
  await pages.basePage.page.getByRole('radio', { name: option, exact: true }).check();
  await pages.basePage.clickContinueButton();
}

async function enterContactForInvoicing(pages: Pages, email: string) {
  await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetails(email, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
}

async function enterApplicationRefNo(pages: Pages) {
  if (!pages.basePage.applicationRef) throw new Error('No reference from a submitted application is available');
  await pages.farSupportDocAppRefNumberPage.answerEnterAppRefNumber(pages.basePage.applicationRef);
}

async function answerWhatYouWantToDoAndUploadDocs(pages: Pages, journey: string) {
  await pages.farWhatDoYouWantToDoPage.assertPageTitle();
  const whatToDo = pages.basePage.data('whatYouWantToDo');
  switch (whatToDo) {
    case 'Apply for a new authority':
      await selectWhatToDo(pages, whatToDo);
      if (journey === 'New Dealer') {
        await answerUploadSupportingDocForSecretaryOfState(pages);
        await answerUploadAdditionalDocs(pages, journey);
      } else if (journey === 'Shooting Clubs') {
        await answerUploadSupportingDocForApproval_ShootClubs(pages);
        await answerUploadAdditionalDocs_ShootClub(pages);
      }
      break;
    case 'Renew an existing authority':
    case 'Amend an existing authority':
      await selectWhatToDo(pages, whatToDo);
      await answerUploadExistingDoc(pages);
      await pages.farUploadAdditionalExistingDocsPage.assertPageTitle();
      if (pages.basePage.isYes(pages.basePage.data('uploadAdditionalExistingDoc'))) {
        await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
        await answerUploadExistingDoc(pages);
      }
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      break;
    default: throw new Error(`Unknown FAR activity: ${whatToDo}`);
  }
}

async function answerUploadSupportingDocForSecretaryOfState(pages: Pages) {
  await pages.farS5UploadSupportingDocsPage.assertPageTitle();
  await pages.farS5UploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
}

async function answerUploadAdditionalDocs(pages: Pages, journey: string) {
  await pages.farDoYouWantToUploadAdditionalDocsPage.assertPageTitle();
  if (pages.basePage.isYes(pages.basePage.data('uploadAdditionalDoc'))) {
    await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
    if (journey === 'New Dealer' && pages.basePage.data('whatYouWantToDo') !== 'Apply for a new authority') {
      await answerUploadSupportingDocForSecretaryOfState(pages);
    }
    if (journey === 'Shooting Clubs') await answerUploadSupportingDocForApproval_ShootClubs(pages);
  }
  await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
}

async function answerUploadSupportingDocForApproval_ShootClubs(pages: Pages) {
  await pages.farShootClubUploadSupportingDocsPage.assertPageTitle();
  await pages.farShootClubUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
}

async function answerUploadAdditionalDocs_ShootClub(pages: Pages) {
  await pages.farDoYouWantToUploadAdditionalDocsPage.assertPageTitle();
  if (pages.basePage.isYes(pages.basePage.data('uploadAdditionalDoc'))) {
    await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
    await answerUploadSupportingDocForApproval_ShootClubs(pages);
  }
  await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
  await answerIsClubNewClub(pages);
}

export async function uploadSupportAndAdditionalDocs(pages: Pages, journey: string) {
  if (pages.basePage.data('whatYouWantToDo') !== 'Apply for a new authority') {
    if (journey === 'New Dealer') await answerUploadSupportingDocForSecretaryOfState(pages);
    else await answerUploadSupportingDocForApproval_ShootClubs(pages);
    await answerUploadAdditionalDocs(pages, journey);
  }
}

async function answerIsClubNewClub(pages: Pages) {
  const club = pages.farShootClubIsTheClubNewPage;
  await club.assertPageTitle();
  if (pages.basePage.isYes(pages.basePage.data('clubANewClub'))) await club.answerClubIsNewYes();
  else await club.answerClubIsNewNo();
}



Given('Test data has been created for {string} scenarios', async ({ pages, page }, product: string) => {
  pages.basePage.product = parseFarProduct(product);
});

Given('I selected the data for scenario {string} - {string}', async ({ pages, page }, id: string, _description: string) => {
  pages.basePage.selectApplicant(id);
});

When('I visit the Firearms page', async ({ pages, page }) => {
  await pages.farChooseAJourneyHomePage.openFirearmsHomePage('/');
  await pages.farChooseAJourneyHomePage.acceptCookies();
});

When('I select Firearms {string} journey to start my application', async ({ pages, page }, journey: string) => {
  await answerChooseAJourney(pages, journey);
  await answerWhatYouWantToDoAndUploadDocs(pages, journey);
});

Given('I check my answers for Firearms {string} - {string}', async ({ pages, page }, journey: string, activity: string) => {
  await pages.farCheckYourAnswersPage.assertPageTitle();
  expect(await pages.farCheckYourAnswersPage.isAbleToCheckAnswers()).toBe(true);
  await checkFarAnswers(pages, pages.basePage, journey, activity);
});

Given('I am able to submit the Firearms questionnaire', async ({ pages, page }) => {
  await pages.basePage.clickContinueButton();

  await pages.farImportantInformationPage.assertPageTitle();
  await pages.farImportantInformationPage.answerSubmitApplication();
  expect(await pages.farSubmissionNotificationsPage.isApplicationCompleteDisplayed()).toBe(true);
  expect(await pages.farSubmissionNotificationsPage.isApplicationRefDisplayed()).toBe(true);
  pages.basePage.applicationRef = await pages.farSubmissionNotificationsPage.getApplicationRef();

  expect(await pages.farSubmissionNotificationsPage.emailNotification()).toContain(`We have sent an email to ${c.CONTACT_EMAIL_ADDRESS} to confirm receipt of your application.`);
});

When('I fill out my answers to Supporting doc questionnaire', async ({ pages, page }) => {
  await answerEnterRefNumber(pages);
  await pages.farSupportingDocEnterEmailInOriginalAppPage.assertPageTitle();
  await pages.farSupportingDocEnterEmailInOriginalAppPage.answerEnterEmailInOriginalApplication(c.SAS_HOF_EMAIL);
  await pages.farSDocUploadSupportingDocsPage.uploadSupportingDoc(c.UPLOAD_FILE);
  await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
});

Given('I navigate and select {string} journey to start my application', async ({ pages, page }, journey: string) => {
  pages.farChooseAJourneyHomePage.openFirearmsHomePage('/');
  await answerChooseAJourney(pages, journey);
});

Given('I am able to submit the supporting documents', async ({ pages, page }) => {
  await pages.basePage.clickContinueButton();

  await pages.farImportantInformationPage.assertPageTitle();
  await pages.farImportantInformationPage.answerSubmitApplication();
  expect(await pages.farSubmissionNotificationsPage.isUploadCompleteDisplayed()).toBe(true);
  expect(await pages.farSubmissionNotificationsPage.isApplicationRefDisplayed()).toBe(true);

  expect(await pages.farSubmissionNotificationsPage.isWillReviewYourApplicationDisplayed()).toContain('We will review your application. If more information is required, we shall email the contact address provided with your original application.');
});

Given('I check the application details on Check your answers page', async ({ pages, page }) => {
  const details = await getSupportingApplicationDetails(pages);
  expect(details['Reference number']).toBe(pages.basePage.applicationRef);
  expect(details.Email).toBe(c.CONTACT_EMAIL_ADDRESS);
});

Then('I choose Firearms {string} journey to start my application', async ({ pages, page }, journey: string) => {
  await chooseFirearmsJourneyToStart(pages, journey);
});

When('I select continue', async ({ pages, page }) => {
  await pages.basePage.clickContinueButton();
});

Then('I see {string} error header message displayed for firearms', async ({ pages, page }, expected: string) => {
  expect(await pages.basePage.getErrorSummaryHeaderText()).toBe(expected);
});

Then('I see {string} error message displayed for firearms', async ({ pages, page }, expected: string) => {
  expect(await pages.basePage.getErrorMessageDetailText()).toBe(expected);
});

Then('I see error message displayed for firearms', async ({ pages, page }, expected: string) => {
  expect(await pages.basePage.getErrorMessageDetailText()).toBe(expected.trim());
});

Then('I see {string} error link message displayed for firearms', async ({ pages, page }, expected: string) => {
  expect(await pages.basePage.getLinkByText(expected)).toBe(expected);
});

Then('I select What to do {string} option and click continue', async ({ pages, page }, option: string) => {
  await selectWhatToDo(pages, option);
});

When("I select 'upload file' button for firearms", async ({ pages, page }) => {
  await selectUploadFileBtn(pages);
});

When('I upload Firearms evidence file and click continue', async ({ pages, page }) => {
  await pages.farS5UploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
  await pages.basePage.clickContinueButton();
});

When('I select {string} to upload additional doc and click continue', async ({ pages, page }, option: string) => {
  await uploadAdditionalDoc(pages, option);
});

When('I enter reference application number and click continue', async ({ pages, page }) => {
  await enterApplicationRefNo(pages);
});

When('I enter the email {string} not used in original application and click continue', async ({ pages, page }, email: string) => {
  await pages.farSupportingDocEnterEmailInOriginalAppPage.answerEnterEmailInOriginalApplication(email);
});

When('I enter the email {string} used in original application and click continue', async ({ pages, page }, email: string) => {
  await pages.farSupportingDocEnterEmailInOriginalAppPage.answerEnterEmailInOriginalApplication(email);
});

When('I enter the club address and click continue', async ({ pages, page }) => {
  await pages.farS5WhatIsHolderMainBusinessPage.answerBusinessDetails(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
});

When('I enter exhibition or storage address and click continue', async ({ pages, page }) => {
  await pages.farS5WhatIsHolderMainBusinessPage.answerBusinessDetails(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
});

When('I enter main business address and click continue', async ({ pages, page }) => {
  await pages.farS5WhatIsHolderMainBusinessPage.answerBusinessDetails(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
});

When('I enter invoice address and click continue', async ({ pages, page }) => {
  await pages.farS5WhatIsHolderMainBusinessPage.answerBusinessDetails(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
});

When('I enter invoice contact details {string} and click continue', async ({ pages, page }, email: string) => {
  await enterContactForInvoicing(pages, email);
});

When('I enter invoice contact email {string} and click continue', async ({ pages, page }, email: string) => {
  await enterContactForInvoicing(pages, email);
});
