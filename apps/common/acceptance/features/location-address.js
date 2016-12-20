'use strict';

const steps = require('../../../../apps/shooting-clubs/');

Feature('Shooting club - location address');

Before((
  I,
  locationAddressPage
) => {
  I.visitPage(locationAddressPage, steps)
});

// Location postcode step

Scenario('Location postcode step: The correct form element is present', (
  I,
  locationAddressPage
) => {
  I.seeElement(locationAddressPage.postcode.field.postcode);
});

Scenario('Location postcode step: I\'m taken to the location manual address entry page when I click on the link', (
  I,
  locationAddressPage
) => {
  I.click(locationAddressPage.postcode.manualEntryLink);
  I.seeInCurrentUrl(locationAddressPage.manualEntry.url)
});

Scenario('Location postcode step: an error appears for not entering anything and submitting the form', (
  I,
  locationAddressPage
) => {
  I.submitForm();
  I.seeErrors(locationAddressPage.postcode.field.postcodeGroup)
});

Scenario('Location postcode step: an error appears for not entering anything and submitting the form', (
  I,
  locationAddressPage
) => {
  I.submitForm();
  I.seeErrors(locationAddressPage.postcode.field.postcodeGroup)
});

Scenario('Location postcode step: I go to the address look up page when I enter a valid postcode', (
  I,
  locationAddressPage
) => {
  locationAddressPage.fillFormAndSubmit(locationAddressPage.postcode.field.postcode, locationAddressPage.postcode.content.valid);
  I.seeInCurrentUrl(locationAddressPage.lookUpAddress.url);
});

Scenario('Location postcode step: I get an error when I enter an invalid postcode', (
  I,
  locationAddressPage
) => {
  locationAddressPage.fillFormAndSubmit(locationAddressPage.postcode.field.postcode, locationAddressPage.postcode.content.invalid);
  I.seeErrors(locationAddressPage.postcode.field.postcodeGroup);
});

Scenario('Location postcode step: I\'m taken to the location manual address entry page when my postcode can\'t be found', (
  I,
  locationAddressPage
) => {
  locationAddressPage.fillFormAndSubmit(locationAddressPage.postcode.field.postcode, locationAddressPage.postcode.content.notFound);
  I.seeInCurrentUrl(locationAddressPage.manualEntry.url)
});
