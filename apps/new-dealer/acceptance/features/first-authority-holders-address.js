'use strict';

const steps = require('../../');

Feature('First authority holders Address step');

Before((
  I,
  firstAuthorityHoldersAddressPage
) => {
  I.visitPage(firstAuthorityHoldersAddressPage, steps);
});

Scenario('The correct form elements are present on first-authority-holders-postcode step', (
  I,
  firstAuthorityHoldersAddressPage
) => {
  I.seeElements([
    firstAuthorityHoldersAddressPage.fields['first-authority-holders-building'],
    firstAuthorityHoldersAddressPage.fields['first-authority-holders-street'],
    firstAuthorityHoldersAddressPage.fields['first-authority-holders-townOrCity'],
    firstAuthorityHoldersAddressPage.fields['first-authority-holders-postcodeOrZIPCode']
  ]);
});

Scenario('I see errors if town city fields contains numbers for contact holders address step', (
  I,
  firstAuthorityHoldersAddressPage
) => {
  firstAuthorityHoldersAddressPage.fillFormAndSubmit(firstAuthorityHoldersAddressPage.fields['first-authority-holders-townOrCity']);
  I.seeErrors(firstAuthorityHoldersAddressPage.fields['first-authority-holders-townOrCity']);
});

Scenario('An error is shown if first-authority-holders address is not completed', (
  I,
  firstAuthorityHoldersAddressPage
) => {
  I.submitForm();
  I.seeErrors(firstAuthorityHoldersAddressPage.fields['first-authority-holders-postcodeOrZIPCode']);
});

Scenario('First-authority-holders name is in the page header of the postcode step', function *(
  I,
  firstAuthorityHoldersAddressPage
) {
  yield I.setSessionData(steps.name, {
    'first-authority-holders-name': 'Sterling Archer'
  });
  yield I.refreshPage();
  I.see(firstAuthorityHoldersAddressPage.content.header);
});

Scenario('I am taken to the contact step when address is entered and one authority-holder is selected', function *(
  I,
  firstAuthorityHoldersAddressPage,
  contactPage
) {
  yield I.setSessionData(steps.name, {
    'authority-holders': 'one'
  });
  yield I.refreshPage();
  firstAuthorityHoldersAddressPage.fillAllAddressFieldsAndSubmit();
  I.seeInCurrentUrl(contactPage.url);
});

Scenario('I am taken to the second-authority-holders-name step when address is entered and two authority-holder is selected', function *(
  I,
  firstAuthorityHoldersAddressPage,
  secondAuthorityHoldersNamePage
) {
  yield I.setSessionData(steps.name, {
    'authority-holders': 'two'
  });
  yield I.refreshPage();
  firstAuthorityHoldersAddressPage.fillAllAddressFieldsAndSubmit();
  I.seeInCurrentUrl(secondAuthorityHoldersNamePage.url);
});


