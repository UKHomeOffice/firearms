'use strict';

const steps = require('../../');
const _ = require('lodash');

Feature('second contact email step');

Before((
  I,
  secondContactEmailPage
) => {
  I.visitPage(secondContactEmailPage, steps);
});

Scenario('check there is the correct form elements', (
  I,
  secondContactEmailPage
) => {
  I.seeElements(_.values(secondContactEmailPage.fields));
});

Scenario('check that an error appears if I submit empty fields', (
  I,
  secondContactEmailPage
) => {
  I.submitForm();
  I.seeErrors(_.values(secondContactEmailPage.fields));
});

Scenario('I can go to the next page, location postcode page', (
  I,
  secondContactEmailPage,
  locationAddressPage
) => {
  secondContactEmailPage.fillFormAndSubmit('valid-email');
  I.seeInCurrentUrl(locationAddressPage.url);
});

Scenario('An error is shown if an invalid email address is entered', (
  I,
  secondContactEmailPage
) => {
  secondContactEmailPage.fillFormAndSubmit('invalid-email');
  I.seeErrors(secondContactEmailPage.fields['second-contact-email-id']);
});
