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
  I.seeElement(clubAddressPage.fields.postcode);
});

Scenario('An error is shown if club-postcode is not completed', (
  I,
  clubAddressPage
) => {
  I.submitForm();
  I.seeErrors(clubAddressPage.fields.postcode);
});

Scenario('I am taken to the club-address-lookup step from postcode', (
  I,
  clubAddressPage
) => {
  clubAddressPage.fillFormAndSubmit(clubAddressPage.fields.postcode);
  I.seeInCurrentUrl(clubAddressPage['address-lookup-url']);
});

Scenario('I am taken to the club-manual-address step when I click the link', (
  I,
  clubAddressPage
) => {
  I.click(clubAddressPage.links['manual-entry']);
  I.seeInCurrentUrl(clubAddressPage['address-url']);
});

Scenario('The correct form elements are present for club manual address step', (
  I,
  clubAddressPage
) => {
  I.click(clubAddressPage.links['manual-entry']);
  I.seeElements(clubAddressPage.fields['address-manual']);
});

Scenario('An error is shown if club manual address is not completed', (
  I,
  clubAddressPage
) => {
  I.click(clubAddressPage.links['manual-entry']);
  I.submitForm();
  I.seeErrors(clubAddressPage.fields['address-manual']);
});

Scenario('An error is shown if club-address-lookup is not completed', (
  I,
  clubAddressPage
) => {
  clubAddressPage.fillFormAndSubmit(clubAddressPage.fields.postcode);
  I.submitForm();
  I.seeErrors(clubAddressPage.fields['address-lookup']);
});

Scenario('I am taken to the club manual address step if I cant find my address', (
  I,
  clubAddressPage
) => {
  clubAddressPage.fillFormAndSubmit(clubAddressPage.fields.postcode);
  I.click(clubAddressPage.links['cant-find-address']);
  I.seeInCurrentUrl(clubAddressPage['address-url']);
});

Scenario('When I click cant find my address link, I will see the postcode I entered in the club manual address step', (
  I,
  clubAddressPage
) => {
  clubAddressPage.fillFormAndSubmit(clubAddressPage.fields.postcode);
  I.click(clubAddressPage.links['cant-find-address']);
  I.see(clubAddressPage.content.postcode);
});

Scenario('I am taken to the contact step from the manual-address step', (
  I,
  clubAddressPage,
  clubSecretaryPage
) => {
  I.click(clubAddressPage.links['manual-entry']);
  clubAddressPage.fillFormAndSubmit(clubAddressPage.fields['address-manual']);
  I.seeInCurrentUrl(clubSecretaryPage.url);
});

Scenario('When an address is selected I am taken to the contact step', (
  I,
  clubAddressPage,
  clubSecretaryPage
) => {
  clubAddressPage.selectAddressAndSubmit();
  I.seeInCurrentUrl(clubSecretaryPage.url);
});
