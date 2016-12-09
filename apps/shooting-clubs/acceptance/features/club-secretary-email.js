'use strict';

const steps = require('../../');
const _ = require('lodash');

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
  I.seeElements(_.values(clubSecretaryEmailPage.fields));
});

Scenario('check that an error appears if I submit empty fields', (
  I,
  clubSecretaryEmailPage
) => {
  I.submitForm();
  I.seeErrors(_.values(clubSecretaryEmailPage.fields));
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
