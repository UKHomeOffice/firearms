'use strict';
const steps = require('../../');

module.exports = {};

Feature('Authority details step');

Before((
  I,
  authorityDetailsPage
) => {
  I.visitPage(authorityDetailsPage, steps)
});

Scenario('the correct form elements are present', (
  I,
  authorityDetailsPage
) => {
  I.seeElement(authorityDetailsPage.field.referenceNumber);
});

Scenario('an error appears if I submit the form with an empty field', (
  I,
  authorityDetailsPage
) => {
  I.submitForm();
  I.seeErrors(authorityDetailsPage.field.referenceNumberGroup);
});

Scenario('I can go to the next page if I correctly fill the form', (
  I,
  authorityDetailsPage,
  clubNamePage
) => {
  authorityDetailsPage.fillFormAndSubmit();
  I.seeInCurrentUrl(clubNamePage.url);
});
