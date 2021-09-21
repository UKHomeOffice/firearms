'use strict';

const steps = require('../../');

Feature('Contact address authority holder step');

Before((
  I,
  contactAddressAuthorityHolderPage
) => {
  I.visitPage(contactAddressAuthorityHolderPage, steps);
});

// Scenario('The correct form elements are present', (
//   I,
//   contactAddressAuthorityHolderPage
// ) => {
//   I.seeElements([
//     contactAddressAuthorityHolderPage.fields['contact-address-group'],
//     contactAddressAuthorityHolderPage.fields['different-address'],
//     contactAddressAuthorityHolderPage.fields['same-address']
//   ]);
// });

Scenario('An error is shown if contact-address-authority-holder step is not completed', (
  I,
  contactAddressAuthorityHolderPage
) => {
  I.submitForm();
  I.seeErrors(contactAddressAuthorityHolderPage.fields['contact-address-group']);
});

Scenario('Postcode field is toggled when use a different address is selected', (
  I,
  contactAddressAuthorityHolderPage
) => {
    I.click(contactAddressAuthorityHolderPage.fields['different-address']);
    I.seeElement(contactAddressAuthorityHolderPage.fields.postcode);
});

Scenario('An error is shown if the step is not completed after selecting use a different address', (
  I,
  contactAddressAuthorityHolderPage
) => {
  I.click(contactAddressAuthorityHolderPage.fields['different-address']);
  I.submitForm();
  I.seeErrors(contactAddressAuthorityHolderPage.fields['postcode-group']);
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

Scenario('I am taken to the contact manual-address step when I click the link', (
  I,
  contactAddressAuthorityHolderPage
) => {
  I.click(contactAddressAuthorityHolderPage.fields['different-address']);
  I.click(contactAddressAuthorityHolderPage.links['manual-entry']);
  I.seeInCurrentUrl(contactAddressAuthorityHolderPage.next)
});

Scenario('I am taken to the contact-address-lookup step when use-different-address is selected and postcode is provided', (
  I,
  contactAddressAuthorityHolderPage
) => {
  I.click(contactAddressAuthorityHolderPage.fields['different-address']);
  I.fillField(contactAddressAuthorityHolderPage.fields.postcode, contactAddressAuthorityHolderPage.content.postcode);
  I.submitForm();
  I.seeInCurrentUrl(contactAddressAuthorityHolderPage['next-address-select'])
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
  I.click(contactAddressAuthorityHolderPage.links['manual-entry']);
  I.seeElements(contactAddressAuthorityHolderPage.fields['address-manual']);
});

Scenario('First-authority-holders name is in the page header of the manual-address step', function *(
  I,
  contactAddressAuthorityHolderPage
) {
  I.click(contactAddressAuthorityHolderPage.fields['different-address']);
  I.click(contactAddressAuthorityHolderPage.links['manual-entry']);
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
  I.click(contactAddressAuthorityHolderPage.links['manual-entry']);
  yield I.setSessionData(steps.name, {
    'contact-holder': contactAddressAuthorityHolderPage.sessionData.second,
    'second-authority-holders-name': contactAddressAuthorityHolderPage.sessionData.barry,
  });
  yield I.refreshPage();
  I.see(contactAddressAuthorityHolderPage.content['second-contact']);
});

Scenario('An error is shown if authority-holders-contact manual address is not completed', (
  I,
  contactAddressAuthorityHolderPage
) => {
  I.click(contactAddressAuthorityHolderPage.fields['different-address']);
  I.click(contactAddressAuthorityHolderPage.links['manual-entry']);
  I.submitForm();
  I.seeErrors(contactAddressAuthorityHolderPage.fields['address-manual']);
});

Scenario('An error is shown if authority-holders-contact-address-lookup is not completed', (
  I,
  contactAddressAuthorityHolderPage
) => {
  I.click(contactAddressAuthorityHolderPage.fields['different-address'])
  contactAddressAuthorityHolderPage.fillFormAndSubmit(contactAddressAuthorityHolderPage.fields.postcode);
  I.submitForm();
  I.seeErrors(contactAddressAuthorityHolderPage.fields['address-lookup']);
});

Scenario('First-authority-holders name is in the page header of the address-lookup step', function *(
  I,
  contactAddressAuthorityHolderPage
) {
  I.click(contactAddressAuthorityHolderPage.fields['different-address'])
  contactAddressAuthorityHolderPage.fillFormAndSubmit(contactAddressAuthorityHolderPage.fields.postcode);
  yield I.setSessionData(steps.name, {
    'contact-holder': contactAddressAuthorityHolderPage.sessionData.first,
    'first-authority-holders-name': contactAddressAuthorityHolderPage.sessionData.archer
  });
  yield I.refreshPage();
  I.see(contactAddressAuthorityHolderPage.content['first-contact']);
});

Scenario('Second-authority-holders name is in the page header of the address-lookup step', function *(
  I,
  contactAddressAuthorityHolderPage
) {
  I.click(contactAddressAuthorityHolderPage.fields['different-address'])
  contactAddressAuthorityHolderPage.fillFormAndSubmit(contactAddressAuthorityHolderPage.fields.postcode);
  yield I.setSessionData(steps.name, {
    'contact-holder': contactAddressAuthorityHolderPage.sessionData.second,
    'second-authority-holders-name': contactAddressAuthorityHolderPage.sessionData.barry
  });
  yield I.refreshPage();
  I.see(contactAddressAuthorityHolderPage.content['second-contact']);
});

Scenario('I am taken to the authority-holders-contact manual address step if I cant find my address', (
  I,
  contactAddressAuthorityHolderPage
) => {
  I.click(contactAddressAuthorityHolderPage.fields['different-address'])
  contactAddressAuthorityHolderPage.fillFormAndSubmit(contactAddressAuthorityHolderPage.fields.postcode);
  I.click(contactAddressAuthorityHolderPage.links['cant-find-address']);
  I.seeInCurrentUrl(contactAddressAuthorityHolderPage['address-url']);
});

Scenario('When I click cant find my address link, I will see the postcode I entered in the authority-holders-contact manual address step', (
  I,
  contactAddressAuthorityHolderPage
) => {
  I.click(contactAddressAuthorityHolderPage.fields['different-address'])
  contactAddressAuthorityHolderPage.fillFormAndSubmit(contactAddressAuthorityHolderPage.fields.postcode);
  I.click(contactAddressAuthorityHolderPage.links['cant-find-address']);
  I.see(contactAddressAuthorityHolderPage.content.postcode);
});

Scenario('I am taken to the next configured step from the manual-address step', (
  I,
  contactAddressAuthorityHolderPage
) => {
  I.click(contactAddressAuthorityHolderPage.fields['different-address']);
  I.click(contactAddressAuthorityHolderPage.links['manual-entry']);
  contactAddressAuthorityHolderPage.fillFormAndSubmit(contactAddressAuthorityHolderPage.fields['address-manual']);
  I.seeInCurrentUrl(contactAddressAuthorityHolderPage['next-with-address']);
});

Scenario('When an address is selected I am taken to the next configured step', (
  I,
  contactAddressAuthorityHolderPage
) => {
  I.click(contactAddressAuthorityHolderPage.fields['different-address']);
  contactAddressAuthorityHolderPage.selectAddressAndSubmit();
  I.seeInCurrentUrl(contactAddressAuthorityHolderPage['next-with-address']);
});
