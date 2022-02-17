'use strict';

const steps = require('../../');

Feature('Storage Address step');

Before((
  I,
  storageAddressPage
) => {
  I.visitPage(storageAddressPage, steps);
});

Scenario('The correct form elements are present on storage-address step', (
  I,
  storageAddressPage
) => {
  I.seeElements([
    storageAddressPage.fields['storage-building'],
    storageAddressPage.fields['storage-street'],
    storageAddressPage.fields['storage-townOrCity'],
    storageAddressPage.fields['storage-postcodeOrZIPCode']
  ]);
});

Scenario('When I select renew on the activity, I see the renew message icon on the storage-postcode step', function *(
  I,
  storageAddressPage
) {
  yield I.setSessionData(steps.name, {
    'activity': 'renew'
  });
  yield I.refreshPage();
  I.seeElement(storageAddressPage['important-icon']);
});

Scenario('An error is shown if address-postcode is not completed', (
  I,
  storageAddressPage
) => {
  I.submitForm();
  I.seeErrors(storageAddressPage.fields['storage-postcodeOrZIPCode']);
});

Scenario('An error is shown if storage-townOrCity is completed with value including numbers', (
  I,
  storageAddressPage
) => {
  storageAddressPage.fillFormAndSubmit(storageAddressPage.fields['storage-townOrCity']);
  I.seeErrors(storageAddressPage.fields['storage-townOrCity']);
});

Scenario('I am taken to the storage-add-another-address step from the storage-address step', (
  I,
  storageAddressPage
) => {
  storageAddressPage.fillAllAddressFieldsAndSubmit();
  I.seeInCurrentUrl(storageAddressPage['another-address-url']);
});

Scenario('The correct form elements are present on storage-add-another-address step', (
  I,
  storageAddressPage
) => {
  storageAddressPage.fillAllAddressFieldsAndSubmit();
  I.seeElement(storageAddressPage.fields.add);
});

Scenario('When I select renew on the activity, I see the renew message icon on the storage-add-another-address step', function *(
  I,
  storageAddressPage
) {
  storageAddressPage.fillAllAddressFieldsAndSubmit();
  yield I.setSessionData(steps.name, {
    'activity': 'renew'
  });
  yield I.refreshPage();
  I.seeElement(storageAddressPage['important-icon']);
});

Scenario('An error is shown if storage-add-another-address step is not completed', (
  I,
  storageAddressPage
) => {
  storageAddressPage.fillAllAddressFieldsAndSubmit();
  I.submitForm();
  I.seeErrors(storageAddressPage.fields.add);
});

Scenario('I see the storage-address that was added previously', (
  I,
  storageAddressPage
) => {
  storageAddressPage.fillAllAddressFieldsAndSubmit();
  I.see(storageAddressPage.content['display-address']);
});

Scenario('When I select yes on the add-another-address page, I am taken to the storage-address step', (
  I,
  storageAddressPage
) => {
  storageAddressPage.fillAllAddressFieldsAndSubmit();
  I.click(storageAddressPage.fields.yes);
  I.submitForm();
  I.seeInCurrentUrl(storageAddressPage.url);
});

Scenario('When I add another address, I can see both addresses on the add-another-address step', (
  I,
  storageAddressPage
) => {
  storageAddressPage.addMultipleAddresses();
  I.seeEach([
    storageAddressPage.content['display-address'],
    storageAddressPage.content['another-address']
  ])
});

Scenario('When I click Delete and there are no addresses to display, I am taken back to the storage-address page', (
  I,
  storageAddressPage
) => {
  storageAddressPage.fillAllAddressFieldsAndSubmit();
  I.click(storageAddressPage.links.delete);
  I.seeInCurrentUrl(storageAddressPage.url);
});

Scenario('When I click Delete, the address is removed from the storage-addresses table', (
  I,
  storageAddressPage
) => {
  storageAddressPage.addMultipleAddresses();
  I.click(storageAddressPage.links.delete);
  I.dontSee(storageAddressPage.content['display-address']);
});

Scenario('When I select No on add-another-address I am taken to the usage page', (
  I,
  storageAddressPage,
  usagePage
) => {
  storageAddressPage.fillAllAddressFieldsAndSubmit();
  I.click(storageAddressPage.fields.no);
  I.submitForm();
  I.seeInCurrentUrl(usagePage.url);
});
