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
  storageAddressPage.fillFormAndSubmit(storageAddressPage.fields.postcode, storageAddressPage.content.postcode);
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
  storageAddressPage.fillFormAndSubmit(storageAddressPage.fields.postcode, storageAddressPage.content.postcode);
  I.submitForm();
  I.seeErrors(storageAddressPage.fields['address-lookup']);
});

Scenario('I am taken to the storage-manual-address step if I cant find my address', (
  I,
  storageAddressPage
) => {
  storageAddressPage.fillFormAndSubmit(storageAddressPage.fields.postcode, storageAddressPage.content.postcode);
  I.click(storageAddressPage.links['cant-find-address']);
  I.seeInCurrentUrl(storageAddressPage['address-url']);
});

Scenario('When I click cant find my address link, I will see the postcode I entered in the storage-manual-address step', (
  I,
  storageAddressPage
) => {
  storageAddressPage.fillFormAndSubmit(storageAddressPage.fields.postcode, storageAddressPage.content.postcode);
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
  storageAddressPage
) => {
  storageAddressPage.selectAddressAndSubmit();
  I.seeInCurrentUrl(storageAddressPage['another-address-url']);
});

Scenario('I am taken to the storage-add-another-address step from the manual-address step', (
  I,
  storageAddressPage
) => {
  I.click(storageAddressPage.links['manual-entry']);
  storageAddressPage.fillFormAndSubmit(storageAddressPage.fields['address-manual']);
  I.seeInCurrentUrl(storageAddressPage['another-address-url']);
});

Scenario('The correct form elements are present on storage-add-another-address step', (
  I,
  storageAddressPage
) => {
  storageAddressPage.selectAddressAndSubmit();
  I.seeElements([
    storageAddressPage.fields.add,
    storageAddressPage.fields.yes,
    storageAddressPage.fields.no
  ]);
});

Scenario('An error is shown if storage-add-another-address step is not completed', (
  I,
  storageAddressPage
) => {
  storageAddressPage.selectAddressAndSubmit();
  I.submitForm();
  I.seeErrors(storageAddressPage.fields.add);
});

Scenario('I see the storage-address that was added previously', (
  I,
  storageAddressPage
) => {
  storageAddressPage.selectAddressAndSubmit();
  I.see(storageAddressPage.content.address);
});

Scenario('When I select yes on the add-another-address page, I am taken to the storage-postcode step', (
  I,
  storageAddressPage
) => {
  storageAddressPage.selectAddressAndSubmit();
  I.click(storageAddressPage.fields.yes);
  I.submitForm();
  I.seeInCurrentUrl(storageAddressPage.url);
});

Scenario('When I add another address, I can see both addresses on the add-another-address step', (
  I,
  storageAddressPage
) => {
  storageAddressPage.selectAddressAndSubmit();
  I.click(storageAddressPage.fields.yes);
  I.submitForm();
  I.click(storageAddressPage.links['manual-entry']);
  storageAddressPage.fillFormAndSubmit(storageAddressPage.fields['address-manual'], storageAddressPage.content['another-address']);
  I.seeEach([
    storageAddressPage.content.address,
    storageAddressPage.content['another-address']
  ])
});

Scenario('When I click Change, I am taken back to the storage-postcode page', (
  I,
  storageAddressPage
) => {
  storageAddressPage.selectAddressAndSubmit();
  I.click(storageAddressPage.links.change);
  I.seeInCurrentUrl(`${storageAddressPage.url}/edit/0`);
});

Scenario('When I change the address, I can see the new address on the storage-add-another-address page', (
  I,
  storageAddressPage
) => {
  storageAddressPage.selectAddressAndSubmit();
  I.see(storageAddressPage.content.address);
  I.click(storageAddressPage.links.change);
  I.click(storageAddressPage.links['manual-entry']);
  storageAddressPage.fillFormAndSubmit(storageAddressPage.fields['address-manual'], storageAddressPage.content['another-address']);
  I.dontSee(storageAddressPage.content.address);
  I.see(storageAddressPage.content['another-address']);
});

Scenario('When I select weapons on the handle step, when I select No I am taken to the weapons page', function *(
  I,
  storageAddressPage,
  weaponsPage
) {
  yield I.setSessionData(steps.name, {
    'weapons-ammunition': 'weapons'
  });
  yield I.refreshPage();
  storageAddressPage.selectAddressAndSubmit();
  I.click(storageAddressPage.fields.no);
  I.submitForm();
  I.seeInCurrentUrl(weaponsPage.url);
});

Scenario('When I select ammunition on the handle step, when I select No I am taken to the ammunition page', function *(
  I,
  storageAddressPage,
  ammunitionsPage
) {
  yield I.setSessionData(steps.name, {
    'weapons-ammunition': 'ammunition'
  });
  yield I.refreshPage();
  storageAddressPage.selectAddressAndSubmit();
  I.click(storageAddressPage.fields.no);
  I.submitForm();
  I.seeInCurrentUrl(ammunitionsPage.url);
});

Scenario('When I select weapons and ammunition on the handle step, when I select No I am taken to the ammunition page', function *(
  I,
  storageAddressPage,
  weaponsPage
) {
  yield I.setSessionData(steps.name, {
    'weapons-ammunition': 'weapons,ammunition'
  });
  yield I.refreshPage();
  storageAddressPage.selectAddressAndSubmit();
  I.click(storageAddressPage.fields.no);
  I.submitForm();
  I.seeInCurrentUrl(weaponsPage.url);
});
