'use strict';

const steps = require('../../');

Feature('Club Address step');

Before((
  I,
  clubAddressPage
) => {
  I.visitPage(clubAddressPage, steps);
});

Scenario('The correct form elements are present on club-postcode step', (
  I,
  clubAddressPage
) => {
  I.seeElements([
    clubAddressPage.fields['club-building'],
    clubAddressPage.fields['club-street'],
    clubAddressPage.fields['club-townOrCity'],
    clubAddressPage.fields['club-postcodeOrZIPCode']
  ]);
});

Scenario('An error is shown if club-postcode is not completed', (
  I,
  clubAddressPage
) => {
  I.submitForm();
  I.seeErrors(clubAddressPage.fields['club-postcodeOrZIPCode']);
});

Scenario('I see errors if town city fields contains numbers for contact holders address step', (
  I,
  clubAddressPage
) => {
  clubAddressPage.fillFormAndSubmit(clubAddressPage.fields['club-townOrCity']);
  I.seeErrors(clubAddressPage.fields['club-townOrCity']);
});

Scenario('I am taken to the contact step from the club-address step', (
  I,
  clubAddressPage,
  clubSecretaryPage
) => {
  clubAddressPage.fillAllAddressFieldsAndSubmit();
  I.seeInCurrentUrl(clubSecretaryPage.url);
});
