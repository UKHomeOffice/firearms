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
  I.seeElement(clubSecretaryAddressPage.fields.postcode);
});

Scenario('An error is shown if club-secretary-postcode is not completed', (
  I,
  clubSecretaryAddressPage
) => {
  I.submitForm();
  I.seeErrors(clubSecretaryAddressPage.fields.postcode);
});

Scenario('I am taken to the club-secretary-address-lookup step from postcode', (
  I,
  clubSecretaryAddressPage
) => {
  clubSecretaryAddressPage.fillFormAndSubmit(clubSecretaryAddressPage.fields.postcode);
  I.seeInCurrentUrl(clubSecretaryAddressPage['address-lookup-url']);
});

Scenario('I am taken to the club-secretary-manual-address step when I click the link', (
  I,
  clubSecretaryAddressPage
) => {
  I.click(clubSecretaryAddressPage.links['manual-entry']);
  I.seeInCurrentUrl(clubSecretaryAddressPage['address-url']);
});

Scenario('The correct form elements are present for club secretary manual address step', (
  I,
  clubSecretaryAddressPage
) => {
  I.click(clubSecretaryAddressPage.links['manual-entry']);
  I.seeElements(clubSecretaryAddressPage.fields['address-manual']);
});

Scenario('An error is shown if club secretary manual address is not completed', (
  I,
  clubSecretaryAddressPage
) => {
  I.click(clubSecretaryAddressPage.links['manual-entry']);
  I.submitForm();
  I.seeErrors(clubSecretaryAddressPage.fields['address-manual']);
});

Scenario('An error is shown if club-secretary-address-lookup is not completed', (
  I,
  clubSecretaryAddressPage
) => {
  clubSecretaryAddressPage.fillFormAndSubmit(clubSecretaryAddressPage.fields.postcode);
  I.submitForm();
  I.seeErrors(clubSecretaryAddressPage.fields['address-lookup']);
});

Scenario('I am taken to the club secretary manual address step if I cant find my address', (
  I,
  clubSecretaryAddressPage
) => {
  clubSecretaryAddressPage.fillFormAndSubmit(clubSecretaryAddressPage.fields.postcode);
  I.click(clubSecretaryAddressPage.links['cant-find-address']);
  I.seeInCurrentUrl(clubSecretaryAddressPage['address-url']);
});

Scenario('When I click cant find my address link, I will see the postcode I entered in the club secretary manual address step', (
  I,
  clubSecretaryAddressPage
) => {
  clubSecretaryAddressPage.fillFormAndSubmit(clubSecretaryAddressPage.fields.postcode);
  I.click(clubSecretaryAddressPage.links['cant-find-address']);
  I.see(clubSecretaryAddressPage.content.postcode);
});

Scenario('I am taken to the club-secretary-email step from the manual-address step', (
  I,
  clubSecretaryAddressPage,
  clubSecretaryEmailPage
) => {
  I.click(clubSecretaryAddressPage.links['manual-entry']);
  clubSecretaryAddressPage.fillFormAndSubmit(clubSecretaryAddressPage.fields['address-manual']);
  I.seeInCurrentUrl(clubSecretaryEmailPage.url);
});

Scenario('When an address is selected I am taken to the club-secretary-email step', (
  I,
  clubSecretaryAddressPage,
  clubSecretaryEmailPage
) => {
  clubSecretaryAddressPage.selectAddressAndSubmit();
  I.seeInCurrentUrl(clubSecretaryEmailPage.url);
});
