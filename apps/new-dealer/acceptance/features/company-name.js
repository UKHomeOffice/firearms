'use strict';

const steps = require('../../');

Feature('Company name step');

Before((
  I,
  companyNamePage
) => {
  I.visitPage(companyNamePage, steps);
});

Scenario('The correct form elements are present', (
  I,
  companyNamePage
) => {
  I.seeElements([
    companyNamePage['company-group'],
    companyNamePage.company,
    companyNamePage['sole-trader']
  ]);
});

Scenario('An error is shown if company-name step is not completed', (
  I,
  companyNamePage
) => {
  I.submitForm();
  I.seeErrors(companyNamePage['company-group']);
});

Scenario('Selecting company toggles company-name and company-house-number fields', (
  I,
  companyNamePage
) => {
  I.checkOption(companyNamePage.company);
  I.seeElements([
    companyNamePage['company-name'],
    companyNamePage['company-house-number']
  ]);
});

Scenario('An error is shown if company-name step is not completed after selecting company', (
  I,
  companyNamePage
) => {
  I.checkOption(companyNamePage.company);
  I.submitForm();
  I.seeErrors(companyNamePage['company-name']);
});

Scenario('Selecting sole-trader toggles sole-trader-name field', (
  I,
  companyNamePage
) => {
  I.checkOption(companyNamePage['sole-trader']);
  I.seeElements(companyNamePage['sole-trader-name']);
});

Scenario('An error is shown if company-name step is not completed after selecting sole-trader', (
  I,
  companyNamePage
) => {
  I.checkOption(companyNamePage['sole-trader']);
  I.submitForm();
  I.seeErrors(companyNamePage['sole-trader-name']);
});

Scenario('Im taken to the handle step', (
  I,
  companyNamePage,
  handlePage
) => {
  companyNamePage.fillFormAndSubmit();
  I.seeInCurrentUrl(handlePage.url);
});
