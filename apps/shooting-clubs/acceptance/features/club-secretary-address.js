'use strict';

const steps = require('../../');

Feature('Club Secretary Address step');

Before((
  I,
  clubSecretaryAddressPage
) => {
  I.visitPage(clubSecretaryAddressPage, steps);
});

Scenario('The correct form elements are present on club-secretary-postcode step', (
  I,
  clubSecretaryAddressPage
) => {
  I.seeElements([
    clubSecretaryAddressPage.fields['club-secretary-building'],
    clubSecretaryAddressPage.fields['club-secretary-street'],
    clubSecretaryAddressPage.fields['club-secretary-townOrCity'],
    clubSecretaryAddressPage.fields['club-secretary-postcodeOrZIPCode']
  ]);
});

Scenario('An error is shown if club-secretary-postcode is not completed', (
  I,
  clubSecretaryAddressPage
) => {
  I.submitForm();
  I.seeErrors(clubSecretaryAddressPage.fields['club-secretary-postcodeOrZIPCode']);
});

Scenario('I see errors if town city fields contains numbers for contact holders address step', (
  I,
  clubSecretaryAddressPage
) => {
  clubSecretaryAddressPage.fillFormAndSubmit(clubSecretaryAddressPage.fields['club-secretary-townOrCity']);
  I.seeErrors(clubSecretaryAddressPage.fields['club-secretary-townOrCity']);
});

Scenario('I am taken to the club-secretary-email step from the club-secretary-address step', (
  I,
  clubSecretaryAddressPage,
  clubSecretaryEmailPage
) => {
  clubSecretaryAddressPage.fillAllAddressFieldsAndSubmit();
  I.seeInCurrentUrl(clubSecretaryEmailPage.url);
});
