'use strict';

const steps = require('../../');

Feature('Contact address authority holder step');

Before((
  I,
  contactAddressAuthorityHolderPage
) => {
  I.visitPage(contactAddressAuthorityHolderPage, steps);
});

Scenario('The correct form elements are present', (
   I,
   contactAddressAuthorityHolderPage
) => {
   I.seeElements(contactAddressAuthorityHolderPage.fields['contact-address-group']);
});

Scenario('An error is shown if contact-address-authority-holder step is not completed', (
  I,
  contactAddressAuthorityHolderPage
) => {
  I.submitForm();
  I.seeErrors(contactAddressAuthorityHolderPage.fields['contact-address-group']);
});

Scenario('Next page is selected when different address is selected', (
  I,
  contactAddressAuthorityHolderPage
) => {
    I.click(contactAddressAuthorityHolderPage.fields['different-address']);
    I.submitForm();
    I.seeInCurrentUrl(contactAddressAuthorityHolderPage['next-different-address'])
});

Scenario('First-authority-holder\'s name is in the header', function *(
  I,
  contactAddressAuthorityHolderPage
) {
  yield I.setSessionData(steps.name, {
    'contact-holder': contactAddressAuthorityHolderPage.sessionData.first,
    'first-authority-holders-name': contactAddressAuthorityHolderPage.sessionData.archer,
  });
  yield I.refreshPage();
  I.see(contactAddressAuthorityHolderPage.content['first-contact']);
});

Scenario('Second-authority-holder\'s name is in the header', function *(
  I,
  contactAddressAuthorityHolderPage
) {
  yield I.setSessionData(steps.name, {
    'contact-holder': contactAddressAuthorityHolderPage.sessionData.second,
    'second-authority-holders-name': contactAddressAuthorityHolderPage.sessionData.barry,
  });
  yield I.refreshPage();
  I.see(contactAddressAuthorityHolderPage.content['second-contact']);
});

Scenario('I am taken to the address step when I click different address and continue', (
  I,
  contactAddressAuthorityHolderPage
) => {
  I.click(contactAddressAuthorityHolderPage.fields['different-address']);
  I.submitForm();
  I.seeInCurrentUrl(contactAddressAuthorityHolderPage['next-different-address'])
});

Scenario('I am taken to the invoice contact details page when use-same-address is selected', (
  I,
  contactAddressAuthorityHolderPage
) => {
  I.click(contactAddressAuthorityHolderPage.fields['same-address']);
  I.submitForm();
  I.seeInCurrentUrl(contactAddressAuthorityHolderPage['next-with-address'])
});

Scenario('The correct form elements are present for authority holders contact manual address step', (
  I,
  contactAddressAuthorityHolderPage
) => {
  I.click(contactAddressAuthorityHolderPage.fields['different-address']);
  I.submitForm();
  I.seeElements([
    contactAddressAuthorityHolderPage.fields['authority-holder-contact-building'],
    contactAddressAuthorityHolderPage.fields['authority-holder-contact-street'],
    contactAddressAuthorityHolderPage.fields['authority-holder-contact-townOrCity'],
    contactAddressAuthorityHolderPage.fields['authority-holder-contact-postcodeOrZIPCode']
  ]);
});

Scenario('First-authority-holders name is in the page header of the manual-address step', function *(
  I,
  contactAddressAuthorityHolderPage
) {
  I.click(contactAddressAuthorityHolderPage.fields['different-address']);
  I.submitForm();
  yield I.setSessionData(steps.name, {
    'contact-holder': contactAddressAuthorityHolderPage.sessionData.first,
    'first-authority-holders-name': contactAddressAuthorityHolderPage.sessionData.archer,
  });
  yield I.refreshPage();
  I.see(contactAddressAuthorityHolderPage.content['first-contact']);
});

Scenario('Second-authority-holders name is in the page header of the manual-address step', function *(
  I,
  contactAddressAuthorityHolderPage
) {
  I.click(contactAddressAuthorityHolderPage.fields['different-address']);
  I.submitForm();
  yield I.setSessionData(steps.name, {
    'contact-holder': contactAddressAuthorityHolderPage.sessionData.second,
    'second-authority-holders-name': contactAddressAuthorityHolderPage.sessionData.barry,
  });
  yield I.refreshPage();
  I.see(contactAddressAuthorityHolderPage.content['second-contact']);
});

Scenario('I see errors if elements are not completed for authority holders contact manual address step', (
  I,
  contactAddressAuthorityHolderPage
) => {
  I.click(contactAddressAuthorityHolderPage.fields['different-address']);
  I.submitForm();
  contactAddressAuthorityHolderPage.fillFormAndSubmit(contactAddressAuthorityHolderPage.fields['authority-holder-contact-townOrCity']);
  I.seeErrors(contactAddressAuthorityHolderPage.fields['authority-holder-contact-townOrCity']);
});

Scenario('I am taken to the next configured step from the manual-address step', (
  I,
  contactAddressAuthorityHolderPage
) => {
  I.click(contactAddressAuthorityHolderPage.fields['different-address']);
  I.submitForm();
  I.seeInCurrentUrl(contactAddressAuthorityHolderPage['next-different-address']);
});
