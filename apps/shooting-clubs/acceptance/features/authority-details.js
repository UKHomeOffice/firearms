'use strict';
const steps = require('../../');

Feature('Authority details step');

/*
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
  I.fillField(authorityDetailsPage.field.referenceNumber, authorityDetailsPage.content);
  I.submitForm();
  I.seeInCurrentUrl(clubNamePage.url);
});
*/
