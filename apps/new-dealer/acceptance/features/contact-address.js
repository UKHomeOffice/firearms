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
  I.seeElement(contactAddressPage.fields.postcode);
});

Scenario('An error is shown if contact-postcode step is not completed', (
  I,
  contactAddressPage
) => {
  I.submitForm();
  I.seeErrors(contactAddressPage.fields.postcode);
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

Scenario('I am taken to the contact manual-address step when I click the link', (
  I,
  contactAddressPage
) => {
  I.click(contactAddressPage.links['manual-entry']);
  I.seeInCurrentUrl(contactAddressPage['address-url'])
});

Scenario('I am taken to the contact-address-lookup step when postcode is entered', (
  I,
  contactAddressPage
) => {
  contactAddressPage.fillFormAndSubmit(contactAddressPage.fields.postcode)
  I.seeInCurrentUrl(contactAddressPage['address-lookup-url'])
});


Scenario('The correct form elements are present for contact manual address step', (
  I,
  contactAddressPage
) => {
  I.click(contactAddressPage.links['manual-entry']);
  I.seeElements(contactAddressPage.fields['address-manual']);
});

Scenario('Contact\'s name is in the page header of the manual-address step', function *(
  I,
  contactAddressPage
) {
  I.click(contactAddressPage.links['manual-entry']);
  yield I.setSessionData(steps.name, {
    'someone-else-name': 'Sterling Archer'
  });
  yield I.refreshPage();
  I.see(contactAddressPage.content.header);
});

Scenario('An error is shown if contact manual address is not completed', (
  I,
  contactAddressPage
) => {
  I.click(contactAddressPage.links['manual-entry']);
  I.submitForm();
  I.seeErrors(contactAddressPage.fields['address-manual']);
});

Scenario('An error is shown if contact-address-lookup is not completed', (
  I,
  contactAddressPage
) => {
  contactAddressPage.fillFormAndSubmit(contactAddressPage.fields.postcode);
  I.submitForm();
  I.seeErrors(contactAddressPage.fields['address-lookup']);
});

Scenario('Contact\'s name is in the page header of the address-lookup step', function *(
  I,
  contactAddressPage
) {
  contactAddressPage.fillFormAndSubmit(contactAddressPage.fields.postcode);
  yield I.setSessionData(steps.name, {
    'someone-else-name': 'Sterling Archer'
  });
  yield I.refreshPage();
  I.see(contactAddressPage.content.header);
});

Scenario('I am taken to the contact manual address step if I cant find my address', (
  I,
  contactAddressPage
) => {
  contactAddressPage.fillFormAndSubmit(contactAddressPage.fields.postcode);
  I.click(contactAddressPage.links['cant-find-address']);
  I.seeInCurrentUrl(contactAddressPage['address-url']);
});

Scenario('When I click cant find my address link, I will see the postcode I entered in the contact manual address step', (
  I,
  contactAddressPage
) => {
  contactAddressPage.fillFormAndSubmit(contactAddressPage.fields.postcode);
  I.click(contactAddressPage.links['cant-find-address']);
  I.see(contactAddressPage.content.postcode);
});

Scenario('I am taken to the summary step from the manual-address step', (
  I,
  contactAddressPage,
  confirmPage
) => {
  I.click(contactAddressPage.links['manual-entry']);
  contactAddressPage.fillFormAndSubmit(contactAddressPage.fields['address-manual']);
  I.seeInCurrentUrl(confirmPage.url);
});

Scenario('When an address is selected I am taken to the summary step', (
  I,
  contactAddressPage,
  confirmPage
) => {
  contactAddressPage.selectAddressAndSubmit();
  I.seeInCurrentUrl(confirmPage.url);
});
