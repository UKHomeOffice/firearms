'use strict';

const steps = require('../../');

Feature('Club secretary step');

Before((
  I,
  clubSecretaryPage
) => {
  I.visitPage(clubSecretaryPage, steps);
});

Scenario('check there is the correct form elements', (
  I,
  clubSecretaryPage
) => {
  I.seeElement(clubSecretaryPage['club-secretary-name-id'])
});

Scenario('an error message appears if I submit an empty input field', (
  I,
  clubSecretaryPage
) => {
  I.submitForm();
  I.seeErrors(clubSecretaryPage['club-secretary-name-id']);
});

Scenario('I am taken to the next page, club secretary postcode', (
  I,
  clubSecretaryPage,
  clubSecretaryAddressPage
) => {
  clubSecretaryPage.fillFormAndSubmit();
  I.seeInCurrentUrl(clubSecretaryAddressPage.url);
});
