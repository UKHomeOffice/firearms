'use strict';

const steps = require('../../index');

Feature('Shooting club - location address');

Before((
  I,
  locationAddressPage
) => {
  I.visitPage(locationAddressPage, steps)
});

// Location postcode step

Scenario('postcode step: The correct form element is present', (
  I,
  locationAddressPage
) => {
  I.seeElement(locationAddressPage.postcode.field.postcode);
});

Scenario('postcode step: I\'m taken to the location manual address entry page when I click on the link', (
  I,
  locationAddressPage
) => {
  I.click(locationAddressPage.postcode.manualEntryLink);
  I.seeInCurrentUrl(locationAddressPage.manualEntry.url)
});

Scenario('postcode step: an error appears for not entering anything and submitting the form', (
  I,
  locationAddressPage
) => {
  I.submitForm();
  I.seeErrors(locationAddressPage.postcode.field.postcodeGroup)
});

Scenario('postcode step: an error appears for not entering anything and submitting the form', (
  I,
  locationAddressPage
) => {
  I.submitForm();
  I.seeErrors(locationAddressPage.postcode.field.postcodeGroup)
});

Scenario('postcode step: I go to the address look up page when I enter a valid postcode', (
  I,
  locationAddressPage
) => {
  locationAddressPage.fillFormAndSubmit(locationAddressPage.postcode.field.postcode, locationAddressPage.postcode.content.valid);
  I.seeInCurrentUrl(locationAddressPage.addressLookUp.url);
});

Scenario('postcode step: I get an error when I enter an invalid postcode', (
  I,
  locationAddressPage
) => {
  locationAddressPage.fillFormAndSubmit(locationAddressPage.postcode.field.postcode, locationAddressPage.postcode.content.invalid);
  I.seeErrors(locationAddressPage.postcode.field.postcodeGroup);
});

Scenario('postcode step: I\'m taken to the location manual address entry page when my postcode can\'t be found', (
  I,
  locationAddressPage
) => {
  locationAddressPage.fillFormAndSubmit(locationAddressPage.postcode.field.postcode, locationAddressPage.postcode.content.notFound);
  I.seeInCurrentUrl(locationAddressPage.manualEntry.url)
});

Scenario('postcode step: I\'m taken to the location manual address entry page when my postcode can\'t be found', (
  I,
  locationAddressPage
) => {
  locationAddressPage.fillFormAndSubmit(locationAddressPage.postcode.field.postcode, locationAddressPage.postcode.content.notFound);
  I.seeInCurrentUrl(locationAddressPage.manualEntry.url)
});

// address Lookup step

Scenario('address lookup step: when I click can\'t find my address link, I go to the location manual entry page', (
  I,
  locationAddressPage
) => {
  locationAddressPage.fillFormAndSubmit(locationAddressPage.postcode.field.postcode, locationAddressPage.postcode.content.valid);
  I.click(locationAddressPage.addressLookUp.cantFindLink);
  I.seeInCurrentUrl(locationAddressPage.manualEntry.url);
});

Scenario('address lookup step: the correct form element is present', (
  I,
  locationAddressPage
) => {
  locationAddressPage.fillFormAndSubmit(locationAddressPage.postcode.field.postcode, locationAddressPage.postcode.content.valid);
  I.seeElement(locationAddressPage.addressLookUp.field.addressLookUp)
});

Scenario('address lookup step: error appears when I click submit the form without selecting an option', (
  I,
  locationAddressPage
) => {
  locationAddressPage.fillFormAndSubmit(locationAddressPage.postcode.field.postcode, locationAddressPage.postcode.content.valid);
  I.submitForm();
  I.seeErrors(locationAddressPage.addressLookUp.field.addressLookUpGroup);
});

Scenario('from address lookup step: I am taken to the next step, add another location address', (
  I,
  locationAddressPage
) => {
  locationAddressPage.selectAddressAndSubmit();
  I.seeInCurrentUrl(locationAddressPage.addAnotherAddress.url);
});

// Enter address manually step

Scenario('Manual entry step: The correct form elements are present for location-manual address step', (
  I,
  locationAddressPage
) => {
  I.click(locationAddressPage.postcode.manualEntryLink);
  I.seeElement(locationAddressPage.manualEntry.field.addressManual);
});

Scenario('manual entry step: an error appears for not entering anything and submitting the form', (
  I,
  locationAddressPage
) => {
  I.click(locationAddressPage.postcode.manualEntryLink);
  I.submitForm();
  I.seeErrors(locationAddressPage.manualEntry.field.addressManual)
});

Scenario('from manual entry step: I am taken to the location-add-another-address step', (
  I,
  locationAddressPage
) => {
  I.click(locationAddressPage.postcode.manualEntryLink);
  locationAddressPage.fillFormAndSubmit(locationAddressPage.manualEntry.field.addressManual, locationAddressPage.manualEntry.content.address);
  I.seeInCurrentUrl(locationAddressPage.addAnotherAddress.url);
});

// Add another address

Scenario('add another address step: the correct form elements are present', (
  I,
  locationAddressPage
) => {
  locationAddressPage.selectAddressAndSubmit();
  I.seeElements([
    locationAddressPage.addAnotherAddress.field.yes,
    locationAddressPage.addAnotherAddress.field.no
  ])
});

Scenario('add another address step: an error is present when I submit form the form without selecting an option', (
  I,
  locationAddressPage
) => {
  locationAddressPage.selectAddressAndSubmit();
  I.submitForm();
});

Scenario('add another address step: the previous address is present', (
  I,
  locationAddressPage
) => {
  locationAddressPage.selectAddressAndSubmit();
  I.see(locationAddressPage.addAnotherAddress.content.address, locationAddressPage.addAnotherAddress.field.summary)
});

Scenario('add-another-address page step: I select yes I am taken to the location-postcode step', (
  I,
  locationAddressPage
) => {
  locationAddressPage.selectAddressAndSubmit();
  I.click(locationAddressPage.addAnotherAddress.field.yes);
  I.submitForm();
  I.seeInCurrentUrl(locationAddressPage.url);
});

Scenario('add another address page: When I select No I am taken to the confirm page', (
  I,
  locationAddressPage,
  confirmPage
) => {
  locationAddressPage.selectAddressAndSubmit();
  I.click(locationAddressPage.addAnotherAddress.field.no);
  I.submitForm();
  I.seeInCurrentUrl(confirmPage.url);
});

Scenario('add another address page: When I click Delete, I am taken back to the location-postcode page', (
  I,
  locationAddressPage
) => {
  locationAddressPage.selectAddressAndSubmit();
  I.click(locationAddressPage.addAnotherAddress.field.delete);
  I.seeInCurrentUrl(locationAddressPage.url);
});

Scenario('add another address page: When I click Delete, the address is removed from the summary table', (
  I,
  locationAddressPage
) => {
  locationAddressPage.addMultipleAddresses();
  I.click(locationAddressPage.addAnotherAddress.field.delete);
  I.dontSee(locationAddressPage.addAnotherAddress.content.address, locationAddressPage.addAnotherAddress.field.summary)
});

Scenario('add another address page: When I add two addresses I can see both addresses on the add-another-address step', (
  I,
  locationAddressPage
) => {
  locationAddressPage.addMultipleAddresses();
  I.seeEach([
    locationAddressPage.addAnotherAddress.content.address,
    locationAddressPage.manualEntry.content.address
  ])
});
