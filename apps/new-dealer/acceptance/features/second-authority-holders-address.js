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
    secondAuthorityHoldersAddressPage.fields.postcode
  ]);
});

Scenario('An error is shown if second-authority-holders-postcode is not completed', (
  I,
  secondAuthorityHoldersAddressPage
) => {
  I.submitForm();
  I.seeErrors(secondAuthorityHoldersAddressPage.fields.postcode);
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

Scenario('I am taken to the second-authority-holders-address-lookup step from postcode', (
  I,
  secondAuthorityHoldersAddressPage
) => {
  secondAuthorityHoldersAddressPage.fillFormAndSubmit(secondAuthorityHoldersAddressPage.fields.postcode);
  I.seeInCurrentUrl(secondAuthorityHoldersAddressPage['address-lookup-url']);
});

Scenario('I am taken to the second-authority-holders manual-address step when I click the link', (
  I,
  secondAuthorityHoldersAddressPage
) => {
  I.click(secondAuthorityHoldersAddressPage.links['manual-entry']);
  I.seeInCurrentUrl(secondAuthorityHoldersAddressPage['address-url']);
});

Scenario('The correct form elements are present for second-authority-holders manual address step', (
  I,
  secondAuthorityHoldersAddressPage
) => {
  I.click(secondAuthorityHoldersAddressPage.links['manual-entry']);
  I.seeElements([
    secondAuthorityHoldersAddressPage.fields['address-manual']
  ]);
});

Scenario('First-authority-holders name is in the page header of the manual-address step', function *(
  I,
  secondAuthorityHoldersAddressPage
) {
  I.click(secondAuthorityHoldersAddressPage.links['manual-entry']);
  yield I.setSessionData(steps.name, {
    'second-authority-holders-name': 'Barry Dylan'
  });
  yield I.refreshPage();
  I.see(secondAuthorityHoldersAddressPage.content.header);
});

Scenario('An error is shown if second-authority-holders manual address is not completed', (
  I,
  secondAuthorityHoldersAddressPage
) => {
  I.click(secondAuthorityHoldersAddressPage.links['manual-entry']);
  I.submitForm();
  I.seeErrors(secondAuthorityHoldersAddressPage.fields['address-manual']);
});

Scenario('An error is shown if second-authority-holders-address-lookup is not completed', (
  I,
  secondAuthorityHoldersAddressPage
) => {
  secondAuthorityHoldersAddressPage.fillFormAndSubmit(secondAuthorityHoldersAddressPage.fields.postcode);
  I.submitForm();
  I.seeErrors(secondAuthorityHoldersAddressPage.fields['address-lookup']);
});

Scenario('First-authority-holders name is in the page header of the address-lookup step', function *(
  I,
  secondAuthorityHoldersAddressPage
) {
  secondAuthorityHoldersAddressPage.fillFormAndSubmit(secondAuthorityHoldersAddressPage.fields.postcode);
  yield I.setSessionData(steps.name, {
    'second-authority-holders-name': 'Barry Dylan'
  });
  yield I.refreshPage();
  I.see(secondAuthorityHoldersAddressPage.content.header);
});

Scenario('I am taken to the second-authority-holders manual address step if I cant find my address', (
  I,
  secondAuthorityHoldersAddressPage
) => {
  secondAuthorityHoldersAddressPage.fillFormAndSubmit(secondAuthorityHoldersAddressPage.fields.postcode);
  I.click(secondAuthorityHoldersAddressPage.links['cant-find-address']);
  I.seeInCurrentUrl(secondAuthorityHoldersAddressPage['address-url']);
});

Scenario('When I click cant find my address link, I will see the postcode I entered in the second-authority-holders manual address step', (
  I,
  secondAuthorityHoldersAddressPage
) => {
  secondAuthorityHoldersAddressPage.fillFormAndSubmit(secondAuthorityHoldersAddressPage.fields.postcode);
  I.click(secondAuthorityHoldersAddressPage.links['cant-find-address']);
  I.see(secondAuthorityHoldersAddressPage.content.postcode);
});

Scenario('I am taken to the contact step from the manual-address step', (
  I,
  secondAuthorityHoldersAddressPage,
  contactPage
) => {
  I.click(secondAuthorityHoldersAddressPage.links['manual-entry']);
  secondAuthorityHoldersAddressPage.fillFormAndSubmit(secondAuthorityHoldersAddressPage.fields['address-manual']);
  I.seeInCurrentUrl(contactPage.url);
});

Scenario('When an address is selected I am taken to the contact step', (
  I,
  secondAuthorityHoldersAddressPage,
  contactPage
) => {
  secondAuthorityHoldersAddressPage.selectAddressAndSubmit();
  I.seeInCurrentUrl(contactPage.url);
});
