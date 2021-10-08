'use strict';

const steps = require('../../');

Feature('Contact address');

Before((
  I,
  contactAddressPage
) => {
  I.visitPage(contactAddressPage, steps);
});

Scenario('The correct form elements are present', (
  I,
  contactAddressPage
) => {
  I.seeElements([
    contactAddressPage.fields['contact-building'],
    contactAddressPage.fields['contact-street'],
    contactAddressPage.fields['contact-townOrCity'],
    contactAddressPage.fields['contact-postcodeOrZIPCode']
  ]);
});

Scenario('I see errors if town city fields contains numbers for contact holders address step', (
  I,
  contactAddressPage
) => {
  contactAddressPage.fillFormAndSubmit(contactAddressPage.fields['contact-townOrCity']);
  I.seeErrors(contactAddressPage.fields['contact-townOrCity']);
});

Scenario('An error is shown if contact-postcode step is not completed', (
  I,
  contactAddressPage
) => {
  I.submitForm();
  I.seeErrors(contactAddressPage.fields['contact-townOrCity']);
});

Scenario('Contact\'s name is in the header of postcode step', function *(
  I,
  contactAddressPage
) {
  yield I.setSessionData(steps.name, {
    'someone-else-name': 'Sterling Archer'
  });
  yield I.refreshPage();
  I.see(contactAddressPage.content.header);
});

Scenario('When an address is entered I am taken to the configured next step', (
  I,
  contactAddressPage
) => {
  contactAddressPage.fillAllAddressFieldsAndSubmit();
  I.seeInCurrentUrl(contactAddressPage.next);
});
