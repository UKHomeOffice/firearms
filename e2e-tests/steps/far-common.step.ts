import { expect } from '@playwright/test';
import { Given, When, Then, type Pages } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';
import { checkFarAnswers } from './far-check-answers';
import { completeS5Questionnaire, validateS5Scenario } from './far-s5.step';
import { completeMuseumsQuestionnaire, validateMuseumsScenario } from './far-museums.step';
import { completeShootingClubsQuestionnaire, validateShootingClubsScenario } from './far-shooting-clubs.step';


Given('I visit the Firearms page', async ({ pages, page }) => {
  await pages.farChooseAJourneyHomePage.openFirearmsHomePage('/');
  await pages.farChooseAJourneyHomePage.acceptCookies();
});

When('I select the data for {string} pertaining to scenario {string} in context {string}', async ({ }, product: string, scenario: string, context: string) => {
  switch (product) {
    case 'FARS5':
      validateS5Scenario(scenario, context);
      break;
    case 'FARMuseum':
      validateMuseumsScenario(scenario, context);
      break;
    case 'FARShootingClub':
      validateShootingClubsScenario(scenario, context);
      break;
    default:
      throw new Error(`Unknown FAR product: ${product}`);
  }
});

When('I complete the Firearms {string} questionnaire for product {string} pertaining to scenario {string} in context {string}', async ({ pages }, journey: string, product: string, scenario: string, context: string) => {
  switch (product) {
    case 'FARS5':
      if (journey !== 'New Dealer') {
        throw new Error(`FAR journey does not match product: ${journey}/${product}`);
      }
      await completeS5Questionnaire(pages, scenario, context);
      break;
    case 'FARMuseum':
      if (journey !== 'Museums') {
        throw new Error(`FAR journey does not match product: ${journey}/${product}`);
      }
      await completeMuseumsQuestionnaire(pages, scenario, context);
      break;
    case 'FARShootingClub':
      if (journey !== 'Shooting Clubs') {
        throw new Error(`FAR journey does not match product: ${journey}/${product}`);
      }
      await completeShootingClubsQuestionnaire(pages, scenario, context);
      break;
    default: throw new Error(`Unknown FAR product: ${product}`);
  }
});

Given('I check my answers for Firearms {string} - {string}', async ({ pages, page }, journey: string, activity: string) => {
  await pages.farCheckYourAnswersPage.assertPageTitle();
  expect(await pages.farCheckYourAnswersPage.isAbleToCheckAnswers()).toBe(true);
  await checkFarAnswers(pages, journey, activity);
});

Given('I am able to submit the Firearms questionnaire', async ({ pages, page }) => {
  await pages.basePage.clickContinueButton();

  await pages.farImportantInformationPage.submitApplicationWithConfirmation();
  expect(await pages.farSubmissionNotificationsPage.isApplicationCompleteDisplayed()).toBe(true);
  expect(await pages.farSubmissionNotificationsPage.isApplicationRefDisplayed()).toBe(true);
  pages.basePage.applicationRef = await pages.farSubmissionNotificationsPage.getApplicationRef();

  expect(await pages.farSubmissionNotificationsPage.emailNotification()).toContain(`We have sent an email to ${c.CONTACT_EMAIL_ADDRESS} to confirm receipt of your application.`);
});

When('I fill out my answers to Supporting doc questionnaire', async ({ pages, page }) => {
  await pages.farSupportDocAppRefNumberPage.assertPageTitle();
  if (!pages.basePage.applicationRef) throw new Error('No reference from a submitted application is available');
  await pages.farSupportDocAppRefNumberPage.answerEnterAppRefNumber(pages.basePage.applicationRef);
  await pages.farSupportingDocEnterEmailInOriginalAppPage.answerEnterEmailInOriginalApplicationWithTitleCheck(c.SAS_HOF_EMAIL);
  await pages.farSDocUploadSupportingDocsPage.uploadSupportingDoc(c.UPLOAD_FILE);
  await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
});

Given('I navigate and select {string} journey to start my application', async ({ pages, page }, journey: string) => {
  await pages.farChooseAJourneyHomePage.openFirearmsHomePage('/');
  await pages.farChooseAJourneyHomePage.chooseJourney(journey);
  if (journey.toLowerCase() !== 'supporting documents') {
    await pages.farPrivacyNoticePage.continueWithTitleCheck();
    if (journey.toLowerCase() === 'new dealer') {
      await pages.farBeforeYouStartPage.clickContinueBtnWithTitleCheck();
    }
  }
});

Given('I am able to submit the supporting documents', async ({ pages, page }) => {
  await pages.basePage.clickContinueButton();
  await pages.farImportantInformationPage.submitApplicationWithConfirmation();
  expect(await pages.farSubmissionNotificationsPage.isUploadCompleteDisplayed()).toBe(true);
  expect(await pages.farSubmissionNotificationsPage.isApplicationRefDisplayed()).toBe(true);
  expect(await pages.farSubmissionNotificationsPage.isWillReviewYourApplicationDisplayed()).toContain('We will review your application. If more information is required, we shall email the contact address provided with your original application.');
});

Given('I check the application details on Check your answers page', async ({ pages, page }) => {
  const details = await pages.farSupportingDocCheckAnswersPage.getApplicationDetails();
  expect(details['Reference number']).toBe(pages.basePage.applicationRef);
  expect(details.Email).toBe(c.CONTACT_EMAIL_ADDRESS);
});

Then('I choose Firearms {string} journey to start my application', async ({ pages, page }, journey: string) => {
  await pages.farChooseAJourneyHomePage.chooseJourney(journey);
  await pages.basePage.clickContinueButton();
  if (journey.toLowerCase() === 'new dealer') {
    await pages.farBeforeYouStartPage.clickContinueButton();
  }
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

Then('I select What to do {string} option and click continue', async ({ pages, page }, option: string) => {
  await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo(option);
});

When("I select 'upload file' button for firearms", async ({ pages, page }) => {
  await pages.basePage.page.getByRole('button', { name: 'Upload file', exact: true })
    .and(pages.basePage.page.locator('button, input[type="submit"]')).click();
});

When('I upload Firearms evidence file and click continue', async ({ pages, page }) => {
  await pages.farS5UploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
  await pages.basePage.clickContinueButton();
});

When('I select {string} to upload additional doc and click continue', async ({ pages, page }, option: string) => {
  await pages.basePage.page.getByRole('radio', { name: option, exact: true }).check();
  await pages.basePage.clickContinueButton();
});

When('I enter reference application number and click continue', async ({ pages, page }) => {
  if (!pages.basePage.applicationRef) throw new Error('No reference from a submitted application is available');
  await pages.farSupportDocAppRefNumberPage.answerEnterAppRefNumber(pages.basePage.applicationRef);
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
  await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetails(email, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
});

When('I enter invoice contact email {string} and click continue', async ({ pages, page }, email: string) => {
  await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetails(email, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
});
