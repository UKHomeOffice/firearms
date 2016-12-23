'use strict';

const steps = require('../../');

Feature('Shooting club Storage Address step');

Before((
  I,
  shootingClubStorageAddressPage
) => {
  I.visitPage(shootingClubStorageAddressPage, steps);
});

Scenario('The correct form elements are present on storage-postcode step', (
  I,
  shootingClubStorageAddressPage
) => {
  I.seeElement(shootingClubStorageAddressPage.fields.postcode);
});

Scenario('An error is shown if address-postcode is not completed', (
  I,
  shootingClubStorageAddressPage
) => {
  I.submitForm();
  I.seeErrors(shootingClubStorageAddressPage.fields.postcode);
});

Scenario('I am taken to the storage-lookup step from postcode', (
  I,
  shootingClubStorageAddressPage
) => {
  shootingClubStorageAddressPage.fillFormAndSubmit(shootingClubStorageAddressPage.fields.postcode, shootingClubStorageAddressPage.content.postcode);
  I.seeInCurrentUrl(shootingClubStorageAddressPage['address-lookup-url']);
});

Scenario('I am taken to the storage-manual-address step when I click the link', (
  I,
  shootingClubStorageAddressPage
) => {
  I.click(shootingClubStorageAddressPage.links['manual-entry']);
  I.seeInCurrentUrl(shootingClubStorageAddressPage['address-url']);
});

Scenario('The correct form elements are present for storage-manual address step', (
  I,
  shootingClubStorageAddressPage
) => {
  I.click(shootingClubStorageAddressPage.links['manual-entry']);
  I.seeElement(shootingClubStorageAddressPage.fields['address-manual']);
});

Scenario('An error is shown if storage-manual-address is not completed', (
  I,
  shootingClubStorageAddressPage
) => {
  I.click(shootingClubStorageAddressPage.links['manual-entry']);
  I.submitForm();
  I.seeErrors(shootingClubStorageAddressPage.fields['address-manual']);
});

Scenario('An error is shown if storage-address-lookup is not completed', (
  I,
  shootingClubStorageAddressPage
) => {
  shootingClubStorageAddressPage.fillFormAndSubmit(shootingClubStorageAddressPage.fields.postcode, shootingClubStorageAddressPage.content.postcode);
  I.submitForm();
  I.seeErrors(shootingClubStorageAddressPage.fields['address-lookup']);
});

Scenario('I am taken to the storage-manual-address step if I cant find my address', (
  I,
  shootingClubStorageAddressPage
) => {
  shootingClubStorageAddressPage.fillFormAndSubmit(shootingClubStorageAddressPage.fields.postcode, shootingClubStorageAddressPage.content.postcode);
  I.click(shootingClubStorageAddressPage.links['cant-find-address']);
  I.seeInCurrentUrl(shootingClubStorageAddressPage['address-url']);
});

Scenario('When I click cant find my address link, I will see the postcode I entered in the storage-manual-address step', (
  I,
  shootingClubStorageAddressPage
) => {
  shootingClubStorageAddressPage.fillFormAndSubmit(shootingClubStorageAddressPage.fields.postcode, shootingClubStorageAddressPage.content.postcode);
  I.click(shootingClubStorageAddressPage.links['cant-find-address']);
  I.see(shootingClubStorageAddressPage.content.postcode);
});

Scenario('I am taken to the storage-add-another-address step from the address-lookup step', (
  I,
  shootingClubStorageAddressPage
) => {
  shootingClubStorageAddressPage.selectAddressAndSubmit();
  I.seeInCurrentUrl(shootingClubStorageAddressPage['another-address-url']);
});

Scenario('I am taken to the storage-add-another-address step from the manual-address step', (
  I,
  shootingClubStorageAddressPage
) => {
  I.click(shootingClubStorageAddressPage.links['manual-entry']);
  shootingClubStorageAddressPage.fillFormAndSubmit(shootingClubStorageAddressPage.fields['address-manual'], shootingClubStorageAddressPage.content.address);
  I.seeInCurrentUrl(shootingClubStorageAddressPage['another-address-url']);
});

Scenario('The correct form elements are present on storage-add-another-address step', (
  I,
  shootingClubStorageAddressPage
) => {
  shootingClubStorageAddressPage.selectAddressAndSubmit();
  I.seeElements([
    shootingClubStorageAddressPage.fields.add,
    shootingClubStorageAddressPage.fields.yes,
    shootingClubStorageAddressPage.fields.no
  ]);
});

Scenario('An error is shown if storage-add-another-address step is not completed', (
  I,
  shootingClubStorageAddressPage
) => {
  shootingClubStorageAddressPage.selectAddressAndSubmit();
  I.submitForm();
  I.seeErrors(shootingClubStorageAddressPage.fields.add);
});

Scenario('I see the storage-address that was added previously', (
  I,
  shootingClubStorageAddressPage
) => {
  shootingClubStorageAddressPage.selectAddressAndSubmit();
  I.see(shootingClubStorageAddressPage.content['display-address']);
});

Scenario('When I select yes on the add-another-address page, I am taken to the storage-postcode step', (
  I,
  shootingClubStorageAddressPage
) => {
  shootingClubStorageAddressPage.selectAddressAndSubmit();
  I.click(shootingClubStorageAddressPage.fields.yes);
  I.submitForm();
  I.seeInCurrentUrl(shootingClubStorageAddressPage.url);
});

Scenario('When I add another address, I can see both addresses on the add-another-address step', (
  I,
  shootingClubStorageAddressPage
) => {
  shootingClubStorageAddressPage.addMultipleAddresses();
  I.seeEach([
    shootingClubStorageAddressPage.content['display-address'],
    shootingClubStorageAddressPage.content['another-address']
  ])
});

Scenario('When I click Delete and there are no addresses to display, I am taken back to the storage-postcode page', (
  I,
  shootingClubStorageAddressPage
) => {
  shootingClubStorageAddressPage.selectAddressAndSubmit();
  I.click(shootingClubStorageAddressPage.links.delete);
  I.seeInCurrentUrl(shootingClubStorageAddressPage.url);
});

Scenario('When I click Delete, the address is removed from the storage-addresses table', (
  I,
  shootingClubStorageAddressPage
) => {
  shootingClubStorageAddressPage.addMultipleAddresses();
  I.click(shootingClubStorageAddressPage.links.delete);
  I.dontSee(shootingClubStorageAddressPage.content['display-address']);
});

Scenario('When I select No on add-another-address I am taken to the confirm page', (
  I,
  shootingClubStorageAddressPage,
  confirmPage
) => {
  shootingClubStorageAddressPage.selectAddressAndSubmit();
  I.click(shootingClubStorageAddressPage.fields.no);
  I.submitForm();
  I.seeInCurrentUrl(confirmPage.url);
});
