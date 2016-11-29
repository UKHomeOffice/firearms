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
    firstAuthorityHoldersAddressPage.fields.postcode
  ]);
});

Scenario('An error is shown if first-authority-holders-postcode is not completed', (
  I,
  firstAuthorityHoldersAddressPage
) => {
  I.submitForm();
  I.seeErrors(firstAuthorityHoldersAddressPage.fields.postcode);
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

Scenario('I am taken to the first-authority-holders-address-lookup step from postcode', (
  I,
  firstAuthorityHoldersAddressPage
) => {
  firstAuthorityHoldersAddressPage.fillFormAndSubmit(firstAuthorityHoldersAddressPage.fields.postcode);
  I.seeInCurrentUrl(firstAuthorityHoldersAddressPage['address-lookup-url']);
});

Scenario('I am taken to the first-authority-holders manual-address step when I click the link', (
  I,
  firstAuthorityHoldersAddressPage
) => {
  I.click(firstAuthorityHoldersAddressPage.links['manual-entry']);
  I.seeInCurrentUrl(firstAuthorityHoldersAddressPage['address-url']);
});

Scenario('The correct form elements are present for first-authority-holders manual address step', (
  I,
  firstAuthorityHoldersAddressPage
) => {
  I.click(firstAuthorityHoldersAddressPage.links['manual-entry']);
  I.seeElements([
    firstAuthorityHoldersAddressPage.fields['address-manual']
  ]);
});

Scenario('First-authority-holders name is in the page header of the manual-address step', function *(
  I,
  firstAuthorityHoldersAddressPage
) {
  I.click(firstAuthorityHoldersAddressPage.links['manual-entry']);
  yield I.setSessionData(steps.name, {
    'first-authority-holders-name': 'Sterling Archer'
  });
  yield I.refreshPage();
  I.see(firstAuthorityHoldersAddressPage.content.header);
});

Scenario('An error is shown if first-authority-holders manual address is not completed', (
  I,
  firstAuthorityHoldersAddressPage
) => {
  I.click(firstAuthorityHoldersAddressPage.links['manual-entry']);
  I.submitForm();
  I.seeErrors(firstAuthorityHoldersAddressPage.fields['address-manual']);
});

Scenario('An error is shown if first-authority-holders-address-lookup is not completed', (
  I,
  firstAuthorityHoldersAddressPage
) => {
  firstAuthorityHoldersAddressPage.fillFormAndSubmit(firstAuthorityHoldersAddressPage.fields.postcode);
  I.submitForm();
  I.seeErrors(firstAuthorityHoldersAddressPage.fields['address-lookup']);
});

Scenario('First-authority-holders name is in the page header of the address-lookup step', function *(
  I,
  firstAuthorityHoldersAddressPage
) {
  firstAuthorityHoldersAddressPage.fillFormAndSubmit(firstAuthorityHoldersAddressPage.fields.postcode);
  yield I.setSessionData(steps.name, {
    'first-authority-holders-name': 'Sterling Archer'
  });
  yield I.refreshPage();
  I.see(firstAuthorityHoldersAddressPage.content.header);
});

Scenario('I am taken to the first-authority-holders manual address step if I cant find my address', (
  I,
  firstAuthorityHoldersAddressPage
) => {
  firstAuthorityHoldersAddressPage.fillFormAndSubmit(firstAuthorityHoldersAddressPage.fields.postcode);
  I.click(firstAuthorityHoldersAddressPage.links['cant-find-address']);
  I.seeInCurrentUrl(firstAuthorityHoldersAddressPage['address-url']);
});

Scenario('When I click cant find my address link, I will see the postcode I entered in the first-authority-holders manual address step', (
  I,
  firstAuthorityHoldersAddressPage
) => {
  firstAuthorityHoldersAddressPage.fillFormAndSubmit(firstAuthorityHoldersAddressPage.fields.postcode);
  I.click(firstAuthorityHoldersAddressPage.links['cant-find-address']);
  I.see(firstAuthorityHoldersAddressPage.content.postcode);
});

Scenario('I am taken to the contact step from the manual-address step when one authority-holder is selected', function *(
  I,
  firstAuthorityHoldersAddressPage,
  contactPage
) {
  yield I.setSessionData(steps.name, {
    'authority-holders': 'one'
  });
  yield I.refreshPage();
  I.click(firstAuthorityHoldersAddressPage.links['manual-entry']);
  firstAuthorityHoldersAddressPage.fillFormAndSubmit(firstAuthorityHoldersAddressPage.fields['address-manual']);
  I.seeInCurrentUrl(contactPage.url);
});

Scenario('I am taken to the second-authority-holders-name step from the manual-address step when two authority-holder is selected', function *(
  I,
  firstAuthorityHoldersAddressPage,
  secondAuthorityHoldersNamePage
) {
  yield I.setSessionData(steps.name, {
    'authority-holders': 'two'
  });
  yield I.refreshPage();
  I.click(firstAuthorityHoldersAddressPage.links['manual-entry']);
  firstAuthorityHoldersAddressPage.fillFormAndSubmit(firstAuthorityHoldersAddressPage.fields['address-manual']);
  I.seeInCurrentUrl(secondAuthorityHoldersNamePage.url);
});

Scenario('When an address is selected I am taken to the contact step when one authority-holders is selected', function *(
  I,
  firstAuthorityHoldersAddressPage,
  contactPage
) {
  yield I.setSessionData(steps.name, {
    'authority-holders': 'one'
  });
  yield I.refreshPage();
  firstAuthorityHoldersAddressPage.selectAddressAndSubmit();
  I.seeInCurrentUrl(contactPage.url);
});

Scenario('When an address is selected I am taken to the second-authority-holders-name step when two authority-holders is selected', function *(
  I,
  firstAuthorityHoldersAddressPage,
  secondAuthorityHoldersNamePage
) {
  yield I.setSessionData(steps.name, {
    'authority-holders': 'two'
  });
  yield I.refreshPage();
  firstAuthorityHoldersAddressPage.selectAddressAndSubmit();
  I.seeInCurrentUrl(secondAuthorityHoldersNamePage.url);
});


