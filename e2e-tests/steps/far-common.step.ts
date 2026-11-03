import { expect } from '@playwright/test';
import { Given, When, Then } from '../fixture/fixtures';
import { parseFarProduct } from '../test-data/far-applicant';
import { ConstantsLib as c } from '../utility-helper/constants-lib';
import { checkFarAnswers } from './far-check-answers';

Given('Test data has been created for {string} scenarios', async ({ pages, page }, product: string) => {
  pages.farPage.product = parseFarProduct(product);
});

Given('I selected the data for scenario {string} - {string}', async ({ pages, page }, id: string, _description: string) => {
  pages.farPage.selectApplicant(id);
});

When('I visit the Firearms page', async ({ pages, page }) => {
  await pages.farChooseAJourneyHomePage.openFirearmsHomePage('/');
  await pages.farChooseAJourneyHomePage.acceptCookies();
});

When('I select Firearms {string} journey to start my application', async ({ pages, page }, journey: string) => {
  const steps = pages.farPage;
  await steps.answerChooseAJourney(journey);
  await steps.answerWhatYouWantToDoAndUploadDocs(journey);
});

Given('I check my answers for Firearms {string} - {string}', async ({ pages, page }, journey: string, activity: string) => {
  const steps = pages.farPage;
  await steps.checkYourAnswers();
  await checkFarAnswers(steps, journey, activity);
});

Given('I am able to submit the Firearms questionnaire', async ({ pages, page }) => {
  const steps = pages.farPage;
  await steps.selectContinueBtn();
  expect(await steps.confirmSubmission()).toContain(`We have sent an email to ${c.CONTACT_EMAIL_ADDRESS} to confirm receipt of your application.`);
});

When('I fill out my answers to Supporting doc questionnaire', async ({ pages, page }) => {
  const steps = pages.farPage;
  await steps.answerEnterRefNumber();
  await steps.answerEnterEmailUsedInOriginalApplication();
  await steps.uploadSupportingDocs();
  await steps.uploadAdditionalSupportingDoc();
});

Given('I navigate and select {string} journey to start my application', async ({ pages, page }, journey: string) => {
  const steps = pages.farPage;
  pages.farChooseAJourneyHomePage.openFirearmsHomePage('/');
  await steps.answerChooseAJourney(journey);
});

Given('I am able to submit the supporting documents', async ({ pages, page }) => {
  const steps = pages.farPage;
  await steps.selectContinueBtn();
  expect(await steps.confirmSubmissionSupportingDoc()).toContain('We will review your application. If more information is required, we shall email the contact address provided with your original application.');
});

Given('I check the application details on Check your answers page', async ({ pages, page }) => {
  const steps = pages.farPage;
  const details = await steps.getSupportingApplicationDetails();
  expect(details['Reference number']).toBe(steps.applicationRef);
  expect(details.Email).toBe(c.CONTACT_EMAIL_ADDRESS);
});

Then('I choose Firearms {string} journey to start my application', async ({ pages, page }, journey: string) => {
  await pages.farPage.chooseFirearmsJourneyToStart(journey);
});

When('I select continue', async ({ pages, page }) => {
  await pages.farPage.selectContinueBtn();
});

Then('I see {string} error header message displayed for firearms', async ({ pages, page }, expected: string) => {
  expect(await pages.farPage.getErrorSummaryHeaderText()).toBe(expected);
});

Then('I see {string} error message displayed for firearms', async ({ pages, page }, expected: string) => {
  expect(await pages.farPage.getErrorMessageDetailText()).toBe(expected);
});

Then('I see error message displayed for firearms', async ({ pages, page }, expected: string) => {
  expect(await pages.farPage.getErrorMessageDetailText()).toBe(expected.trim());
});

Then('I see {string} error link message displayed for firearms', async ({ pages, page }, expected: string) => {
  expect(await pages.farPage.getLinkByText(expected)).toBe(expected);
});

Then('I select What to do {string} option and click continue', async ({ pages, page }, option: string) => {
  await pages.farPage.selectWhatToDo(option);
});

When("I select 'upload file' button for firearms", async ({ pages, page }) => {
  await pages.farPage.selectUploadFileBtn();
});

When('I upload Firearms evidence file and click continue', async ({ pages, page }) => {
  await pages.farS5UploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
  await pages.basePage.clickContinueButton();
});

When('I select {string} to upload additional doc and click continue', async ({ pages, page }, option: string) => {
  await pages.farPage.uploadAdditionalDoc(option);
});

When('I enter reference application number and click continue', async ({ pages, page }) => {
  await pages.farPage.enterApplicationRefNo();
});

When('I enter the email {string} not used in original application and click continue', async ({ pages, page }, email: string) => {
  await pages.farPage.enterApplicationEmail(email);
});

When('I enter the email {string} used in original application and click continue', async ({ pages, page }, email: string) => {
  await pages.farPage.enterApplicationEmail(email);
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
  await pages.farPage.enterContactForInvoicing(email);
});

When('I enter invoice contact email {string} and click continue', async ({ pages, page }, email: string) => {
  await pages.farPage.enterContactForInvoicing(email);
});
