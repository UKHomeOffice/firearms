import { expect } from '@playwright/test';
import { Given, When, Then } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';
import { checkFarAnswers } from './far-check-answers';
import { completeNewDealerQuestionnaire } from './far-new-dealer.step';
import { completeMuseumsQuestionnaire } from './far-museums.step';
import { completeShootingClubsQuestionnaire } from './far-shooting-clubs.step';

Given('I visit the Firearms page', async ({ pages }) => {
  await pages.farChooseAJourneyHomePage.openFirearmsHomePage('/');
  await pages.farChooseAJourneyHomePage.acceptCookies();
});

Then('I check my answers for Firearms {string} - {string}', async ({ pages }, journey: string, activity: string) => {
  await pages.farCheckYourAnswersPage.assertPageTitle(pages.farCheckYourAnswersPage.page, await pages.farCheckYourAnswersPage.expectedPageTitle());
  expect(await pages.farCheckYourAnswersPage.isAbleToCheckAnswers()).toBe(true);
  await checkFarAnswers(pages, journey, activity);
});

Then('I am able to submit the Firearms questionnaire', async ({ pages }) => {
  pages.basePage.applicationRef = await pages.farSubmissionNotificationsPage.getApplicationRef();

  expect(await pages.farSubmissionNotificationsPage.isApplicationCompleteDisplayed()).toBe(true);
  expect(await pages.farSubmissionNotificationsPage.isApplicationRefDisplayed()).toBe(true);
  expect(await pages.farSubmissionNotificationsPage.emailNotification()).toContain(`We have sent an email to ${c.CONTACT_EMAIL_ADDRESS} to confirm receipt of your application.`);
});

Given('I navigate and select {string} journey to start my application', async ({ pages }, journey: string) => {
  await pages.farChooseAJourneyHomePage.openFirearmsHomePage('/');
  await pages.farChooseAJourneyHomePage.chooseJourney(journey);
  if (journey.toLowerCase() !== 'supporting documents') {
    await pages.farPrivacyNoticePage.continueWithTitleCheck();
    if (journey.toLowerCase() === 'new dealer') {
      await pages.farBeforeYouStartPage.clickContinueBtnWithTitleCheck();
    }
  }
});

When('I select continue', async ({ pages }) => {
  await pages.basePage.clickContinueButton();
});

When("I select 'upload file' button for firearms", async ({ pages }) => {
  await pages.basePage.page.getByRole('button', { name: 'Upload file', exact: true })
    .and(pages.basePage.page.locator('button, input[type="submit"]')).click();
});

When('I upload Firearms evidence file and click continue', async ({ pages }) => {
  await pages.farNewDealerUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
  await pages.basePage.clickContinueButton();
});

When('I select {string} to upload additional doc and click continue', async ({ pages }, option: string) => {
  await pages.basePage.page.getByRole('radio', { name: option, exact: true }).check();
  await pages.basePage.clickContinueButton();
});

When('I enter reference application number and click continue', async ({ pages }) => {
  if (!pages.basePage.applicationRef) throw new Error('No reference from a submitted application is available');
  await pages.farSupportDocAppRefNumberPage.answerEnterAppRefNumber(pages.basePage.applicationRef);
});

When('I enter the email {string} not used in original application and click continue', async ({ pages }, email: string) => {
  await pages.farSupportingDocEnterEmailInOriginalAppPage.answerEnterEmailInOriginalApplication(email);
});

When('I enter the email {string} used in original application and click continue', async ({ pages }, email: string) => {
  await pages.farSupportingDocEnterEmailInOriginalAppPage.answerEnterEmailInOriginalApplication(email);
});

When('I enter the club address and click continue', async ({ pages }) => {
  await pages.farNewDealerWhatIsHolderMainBusinessPage.answerBusinessDetails(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
});

When('I enter exhibition or storage address and click continue', async ({ pages }) => {
  await pages.farNewDealerWhatIsHolderMainBusinessPage.answerBusinessDetails(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
});

When('I enter main business address and click continue', async ({ pages }) => {
  await pages.farNewDealerWhatIsHolderMainBusinessPage.answerBusinessDetails(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
});

When('I enter invoice address and click continue', async ({ pages }) => {
  await pages.farNewDealerWhatIsHolderMainBusinessPage.answerBusinessDetails(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
});

When('I enter invoice contact details {string} and click continue', async ({ pages }, email: string) => {
  await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetails(email, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
});

When('I enter invoice contact email {string} and click continue', async ({ pages }, email: string) => {
  await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetails(email, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
});

When('I choose to complete Firearms questionnaire {string} for {string} pertaining to {string}', async ({ pages }, context: string, journeyName: string, scenario: string) => {
  switch (journeyName) {
    case 'New Dealer':
      await completeNewDealerQuestionnaire(pages, scenario);
      break;
    case 'Museums':
      await completeMuseumsQuestionnaire(pages, scenario, context);
      break;
    case 'Shooting Clubs':
      await completeShootingClubsQuestionnaire(pages, scenario);
      break;
    default: throw new Error(`Unknown FAR questionnaire journey: ${journeyName}`);
  }
});

When('I choose to submit the Firearms questionnaire', async ({ pages}) => {
  await pages.basePage.clickContinueButton();
  await pages.farImportantInformationPage.submitApplicationWithConfirmation();
});

When('I fill out my answers to Supporting doc questionnaire', async ({ pages }) => {
  await pages.farSupportDocAppRefNumberPage.assertPageTitle(pages.farSupportDocAppRefNumberPage.page, await pages.farSupportDocAppRefNumberPage.expectedPageTitle());
  if (!pages.basePage.applicationRef) throw new Error('No reference from a submitted application is available');
  await pages.farSupportDocAppRefNumberPage.answerEnterAppRefNumber(pages.basePage.applicationRef);
  await pages.farSupportingDocEnterEmailInOriginalAppPage.answerEnterEmailInOriginalApplicationWithTitleCheck(c.SAS_HOF_EMAIL);
  await pages.farSDocUploadSupportingDocsPage.uploadSupportingDoc(c.UPLOAD_FILE);
  await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
});

Then('I am able to submit the supporting documents', async ({ pages }) => {
  expect(await pages.farSubmissionNotificationsPage.isUploadCompleteDisplayed()).toBe(true);
  expect(await pages.farSubmissionNotificationsPage.isApplicationRefDisplayed()).toBe(true);
  expect(await pages.farSubmissionNotificationsPage.isWillReviewYourApplicationDisplayed()).toContain('We will review your application. If more information is required, we shall email the contact address provided with your original application.');
});

Then('I check the application details on Check your answers page', async ({ pages }) => {
  const details = await pages.farSupportingDocCheckAnswersPage.getApplicationDetails();
  expect(details['Reference number']).toBe(pages.basePage.applicationRef);
  expect(details.Email).toBe(c.CONTACT_EMAIL_ADDRESS);
});

Then('I choose Firearms {string} journey to start my application', async ({ pages }, journey: string) => {
  await pages.farChooseAJourneyHomePage.chooseJourney(journey);
  await pages.basePage.clickContinueButton();
  if (journey.toLowerCase() === 'new dealer') {
    await pages.farBeforeYouStartPage.clickContinueButton();
  }
});

Then('I see {string} error header message displayed for firearms', async ({ pages }, expected: string) => {
  expect(await pages.basePage.getErrorSummaryHeaderText()).toBe(expected);
});

Then('I see {string} error message displayed for firearms', async ({ pages }, expected: string) => {
  expect(await pages.basePage.getErrorMessageDetailText()).toBe(expected);
});

Then('I see error message displayed for firearms', async ({ pages }, expected: string) => {
  expect(await pages.basePage.getErrorMessageDetailText()).toBe(expected.trim());
});

Then('I select What to do {string} option and click continue', async ({ pages }, option: string) => {
  await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo(option);
});