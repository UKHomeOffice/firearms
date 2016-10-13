'use strict';

const steps = require('../../');

Feature('Storage Address step');

Before((
  I,
  storageAddressPage
) => {
  I.visitPage(storageAddressPage, steps);
});

Scenario('The correct form elements are present on storage-postcode step', (
  I,
  storageAddressPage
) => {
  I.seeElements([
    storageAddressPage.fields.postcode
  ]);
});

Scenario('An error is shown if address-postcode is not completed', (
  I,
  storageAddressPage
) => {
  I.submitForm();
  I.seeErrors(storageAddressPage.fields.postcode);
});

Scenario('I am taken to the storage-lookup step from postcode', (
  I,
  storageAddressPage
) => {
  storageAddressPage.fillFormAndSubmit(storageAddressPage.fields.postcode);
  I.seeInCurrentUrl(storageAddressPage['address-lookup-url']);
});

Scenario('I am taken to the storage-manual-address step when I click the link', (
  I,
  storageAddressPage
) => {
  I.click(storageAddressPage.links['manual-entry']);
  I.seeInCurrentUrl(storageAddressPage['address-url']);
});

Scenario('The correct form elements are present for storage-manual address step', (
  I,
  storageAddressPage
) => {
  I.click(storageAddressPage.links['manual-entry']);
  I.seeElements([
    storageAddressPage.fields['address-manual']
  ]);
});

Scenario('An error is shown if storage-manual-address is not completed', (
  I,
  storageAddressPage
) => {
  I.click(storageAddressPage.links['manual-entry']);
  I.submitForm();
  I.seeErrors(storageAddressPage.fields['address-manual']);
});

Scenario('An error is shown if storage-address-lookup is not completed', (
  I,
  storageAddressPage
) => {
  storageAddressPage.fillFormAndSubmit(storageAddressPage.fields.postcode);
  I.submitForm();
  I.seeErrors(storageAddressPage.fields['address-lookup']);
});

Scenario('I am taken to the storage-manual-address step if I cant find my address', (
  I,
  storageAddressPage
) => {
  storageAddressPage.fillFormAndSubmit(storageAddressPage.fields.postcode);
  I.click(storageAddressPage.links['cant-find-address']);
  I.seeInCurrentUrl(storageAddressPage['address-url']);
});

Scenario('When I click cant find my address link, I will see the postcode I entered in the storage-manual-address step', (
  I,
  storageAddressPage
) => {
  storageAddressPage.fillFormAndSubmit(storageAddressPage.fields.postcode);
  I.click(storageAddressPage.links['cant-find-address']);
  I.see(storageAddressPage.content.postcode);
});

Scenario('When I select weapons and ammunition on the handle step and then weapons on the storage step, all headers use weapons translations', function *(
  I,
  storageAddressPage
) {
  yield I.setSessionData(steps.name, {
    'weapons-ammunition': 'weapons,ammunition',
    'storage-weapons-ammo': 'weapons'
  });
  yield I.refreshPage();
  storageAddressPage.correctTranslationsShown('weapons,ammunition', 'weapons');
});

Scenario('When I select weapons and ammunition on the handle step and then ammunition on the storage step, all headers use ammunition translations', function *(
  I,
  storageAddressPage
) {
  yield I.setSessionData(steps.name, {
    'weapons-ammunition': 'weapons,ammunition',
    'storage-weapons-ammo': 'ammunition'
  });
  yield I.refreshPage();
  storageAddressPage.correctTranslationsShown('weapons,ammunition', 'ammunition');
});

Scenario('When I select weapons and ammunition on the handle step and then weapons and ammunition on the storage step, all headers use weapons and ammunition translations', function *(
  I,
  storageAddressPage
) {
  yield I.setSessionData(steps.name, {
    'weapons-ammunition': 'weapons,ammunition',
    'storage-weapons-ammo': 'weapons,ammunition'
  });
  yield I.refreshPage();
  storageAddressPage.correctTranslationsShown('weapons,ammunition', 'weapons,ammunition');
});

Scenario('When I select weapons on the handle step then all headers use weapons translations', function *(
  I,
  storageAddressPage
) {
  yield I.setSessionData(steps.name, {
    'weapons-ammunition': 'weapons'
  });
  yield I.refreshPage();
  storageAddressPage.correctTranslationsShown('weapons', 'weapons');
});

Scenario('When I select ammunition on the handle step then all headers use ammunition translations', function *(
  I,
  storageAddressPage
) {
  yield I.setSessionData(steps.name, {
    'weapons-ammunition': 'ammunition'
  });
  yield I.refreshPage();
  storageAddressPage.correctTranslationsShown('ammunition', 'ammunition');
});

Scenario('I am taken to the storage-add-another-address step from the address-lookup step', (
  I,
  storageAddressPage,
  storageAnotherAddressPage
) => {
  storageAddressPage.selectAddressAndSubmit();
  I.seeInCurrentUrl(storageAnotherAddressPage.url);
});

Scenario('I am taken to the storage-add-another-address step from the manual-address step', (
  I,
  storageAddressPage,
  storageAnotherAddressPage
) => {
  I.click(storageAddressPage.links['manual-entry']);
  storageAddressPage.fillFormAndSubmit(storageAddressPage.fields['address-manual']);
  I.seeInCurrentUrl(storageAnotherAddressPage.url);
});
