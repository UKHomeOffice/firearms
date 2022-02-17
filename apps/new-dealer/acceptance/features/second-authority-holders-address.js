'use strict';

const steps = require('../../');

Feature('Second authority holders Address step');

Before((
  I,
  secondAuthorityHoldersAddressPage
) => {
  I.visitPage(secondAuthorityHoldersAddressPage, steps);
});

Scenario('The correct form elements are present on second-authority-holders-postcode step', (
  I,
  secondAuthorityHoldersAddressPage
) => {
  I.seeElements([
    secondAuthorityHoldersAddressPage.fields['second-authority-holders-building'],
    secondAuthorityHoldersAddressPage.fields['second-authority-holders-street'],
    secondAuthorityHoldersAddressPage.fields['second-authority-holders-townOrCity'],
    secondAuthorityHoldersAddressPage.fields['second-authority-holders-postcodeOrZIPCode']
  ]);
});

Scenario('An error is shown if second-authority-holders-postcode is not completed', (
  I,
  secondAuthorityHoldersAddressPage
) => {
  secondAuthorityHoldersAddressPage.fillFormAndSubmit(secondAuthorityHoldersAddressPage.fields['second-authority-holders-townOrCity']);
  I.seeErrors(secondAuthorityHoldersAddressPage.fields['second-authority-holders-townOrCity']);
});

Scenario('An error is shown if second-authority-holders address is not completed', (
  I,
  secondAuthorityHoldersAddressPage
) => {
  I.submitForm();
  I.seeErrors(secondAuthorityHoldersAddressPage.fields['second-authority-holders-postcodeOrZIPCode']);
});

Scenario('First-authority-holders name is in the page header of the postcode step', function *(
  I,
  secondAuthorityHoldersAddressPage
) {
  yield I.setSessionData(steps.name, {
    'second-authority-holders-name': 'Barry Dylan'
  });
  yield I.refreshPage();
  I.see(secondAuthorityHoldersAddressPage.content.header);
});

Scenario('I am taken to the contact step from the address step', (
  I,
  secondAuthorityHoldersAddressPage,
  contactPage
) => {
  secondAuthorityHoldersAddressPage.fillAllAddressFieldsAndSubmit();
  I.seeInCurrentUrl(contactPage.url);
});
