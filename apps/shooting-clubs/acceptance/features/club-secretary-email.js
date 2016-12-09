'use strict';

const steps = require('../../');

Feature('Club secretary email step');

Before((
  I,
  clubSecretaryEmailPage
) => {
  I.visitPage(clubSecretaryEmailPage, steps);
});

Scenario('check there is the correct form elements', (
  I,
  clubSecretaryEmailPage
) => {
  I.seeElement(clubSecretaryEmailPage['club-secretary-email-id']);
  I.seeElement(clubSecretaryEmailPage['club-secretary-phone-id']);
});

Scenario('check that an error appears if I submit empty fields', (
  I,
  clubSecretaryEmailPage
) => {
  I.submitForm();
  I.seeErrors(clubSecretaryEmailPage['club-secretary-email-id']);
  I.seeErrors(clubSecretaryEmailPage['club-secretary-phone-id']);
});

Scenario('I can go to the next page, second contact name page', (
  I,
  clubSecretaryEmailPage,
  secondContactNamePage
) => {
  clubSecretaryEmailPage.fillFormAndSubmit('valid-email');
  I.seeInCurrentUrl(secondContactNamePage.url);
});

Scenario('An error is shown if an invalid email address is entered', (
  I,
  clubSecretaryEmailPage
) => {
  clubSecretaryEmailPage.fillFormAndSubmit('invalid-email');
  I.seeErrors(clubSecretaryEmailPage['club-secretary-email-id']);
});
