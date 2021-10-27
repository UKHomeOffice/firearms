'use strict';

const steps = require('../../');

Feature('Second Contact Address step');

Before((
  I,
  secondContactAddressPage
) => {
  I.visitPage(secondContactAddressPage, steps);
});

Scenario('The correct form elements are present on second-contact-postcode step', (
  I,
  secondContactAddressPage
) => {
  I.seeElements([
    secondContactAddressPage.fields['second-contact-building'],
    secondContactAddressPage.fields['second-contact-street'],
    secondContactAddressPage.fields['second-contact-townOrCity'],
    secondContactAddressPage.fields['second-contact-postcodeOrZIPCode']
  ]);
});

Scenario('An error is shown if location-postcode is not completed', (
  I,
  secondContactAddressPage
) => {
  I.submitForm();
  I.seeErrors(secondContactAddressPage.fields['second-contact-postcodeOrZIPCode']);
});

Scenario('I see errors if town city fields contains numbers for location address step', (
  I,
  secondContactAddressPage
) => {
  secondContactAddressPage.fillFormAndSubmit(secondContactAddressPage.fields['second-contact-townOrCity']);
  I.seeErrors(secondContactAddressPage.fields['second-contact-townOrCity']);
});

Scenario('I am taken to the second-contact-email step from the address step', (
  I,
  secondContactAddressPage,
  secondContactEmailPage
) => {
  secondContactAddressPage.fillAllAddressFieldsAndSubmit();
  I.seeInCurrentUrl(secondContactEmailPage.url);
});
