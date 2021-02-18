'use strict';

const steps = require('../../');

Feature('Company name step');

Before((
  I,
  companyNamePage
) => {
  I.visitPage(companyNamePage, steps);
});

// Scenario('The correct form elements are present', (
//   I,
//   companyNamePage
// ) => {
//   I.seeElements([
//     companyNamePage['organisation-group'],
//     companyNamePage.company,
//     companyNamePage['sole-trader']
//   ]);
// });

//Scenario('An error is shown if company-name step is not completed', (
//  I,
//  companyNamePage
//) => {
//  I.submitForm();
//  I.seeErrors(companyNamePage['organisation-group']);
//});

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

Scenario('Selecting shooting-clubs toggles shooting-club-name field', (
  I,
  companyNamePage
) => {
  I.checkOption(companyNamePage['shooting-club']);
  I.seeElements(companyNamePage['shooting-club-name']);
});

Scenario('An error is shown if company-name step is not completed after selecting shooting-clubs', (
  I,
  companyNamePage
) => {
  I.checkOption(companyNamePage['shooting-club']);
  I.submitForm();
  I.seeErrors(companyNamePage['shooting-club-name']);
});

Scenario('Selecting charity toggles charity-name and charity-number fields', (
  I,
  companyNamePage
) => {
  I.checkOption(companyNamePage['charity']);
  I.seeElements([
    companyNamePage['charity-name'],
    companyNamePage['charity-number']
  ]);
});

Scenario('An error is shown if company-name step is not completed after selecting charity', (
  I,
  companyNamePage
) => {
  I.checkOption(companyNamePage['charity']);
  I.submitForm();
  I.seeErrors([
    companyNamePage['charity-name'],
    companyNamePage['charity-number']
  ]);
});

Scenario('Selecting museum toggles museum-name field', (
  I,
  companyNamePage
) => {
  I.checkOption(companyNamePage['museum']);
  I.seeElements(companyNamePage['museum-name']);
});

Scenario('An error is shown if company-name step is not completed after selecting museum', (
  I,
  companyNamePage
) => {
  I.checkOption(companyNamePage['museum']);
  I.submitForm();
  I.seeErrors(companyNamePage['museum-name']);
});

Scenario('Selecting other toggles other-name field', (
  I,
  companyNamePage
) => {
  I.checkOption(companyNamePage.other);
  I.seeElements(companyNamePage['other-name']);
});

Scenario('An error is shown if company-name step is not completed after selecting other', (
  I,
  companyNamePage
) => {
  I.checkOption(companyNamePage.other);
  I.submitForm();
  I.seeErrors(companyNamePage['other-name']);
});

Scenario('Im taken to the handle step', (
  I,
  companyNamePage,
  handlePage
) => {
  companyNamePage.fillFormAndSubmit();
  I.seeInCurrentUrl(handlePage.url);
});
