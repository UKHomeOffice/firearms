'use strict';

const steps = require('../../');

Feature('Shooting club - location address');

Before((
  I,
  locationAddressPage
) => {
  I.visitPage(locationAddressPage, steps)
});

Scenario('postcode step: The correct form element is present', (
  I,
  locationAddressPage
) => {
  I.seeElements([
    locationAddressPage.fields['location-building'],
    locationAddressPage.fields['location-street'],
    locationAddressPage.fields['location-townOrCity'],
    locationAddressPage.fields['location-postcodeOrZIPCode']
  ]);
});

Scenario('An error is shown if location-postcode is not completed', (
  I,
  locationAddressPage
) => {
  I.submitForm();
  I.seeErrors(locationAddressPage.fields['location-postcodeOrZIPCode']);
});

Scenario('I see errors if town city fields contains numbers for location address step', (
  I,
  locationAddressPage
) => {
  locationAddressPage.fillFormAndSubmit(locationAddressPage.fields['location-townOrCity']);
  I.seeErrors(locationAddressPage.fields['location-townOrCity']);
});

Scenario('from location address entry step: I am taken to the location-category step', (
  I,
  locationAddressPage
) => {
  locationAddressPage.fillAllAddressFieldsAndSubmit();
  I.seeInCurrentUrl(locationAddressPage.category.url);
});


Scenario('category step: the correct form elements are present', (
  I,
  locationAddressPage
) => {
  locationAddressPage.fillAllAddressFieldsAndSubmit();
  I.seeElement(locationAddressPage.category.field.locationAddressCategory);
  I.click(locationAddressPage.category.field.fullBoreRifles);
  I.click(locationAddressPage.category.field.smallBoreRifles);
  I.click(locationAddressPage.category.field.muzzleLoadingPistols);
});

Scenario('category step: I see an error when I submit an empty form', (
  I,
  locationAddressPage
) => {
  locationAddressPage.fillAllAddressFieldsAndSubmit();
  I.submitForm();
  I.seeErrors(locationAddressPage.category.field.locationAddressCategory)
});

Scenario('category step: when I select full-bore rifles category, I see this category against the address', (
  I,
  locationAddressPage
) => {
  locationAddressPage.selectAddressCategoryAndSubmit();
  I.see(locationAddressPage.category.content.fullBoreRifles, locationAddressPage.addAnotherAddress.field.summary)
});

Scenario('category step: when I select 2 categories: full-bore rifles, small-bore rifles category, I see these categories against the address', (
  I,
  locationAddressPage
) => {
  locationAddressPage.fillAllAddressFieldsAndSubmit();
  I.click(locationAddressPage.category.field.fullBoreRifles);
  I.click(locationAddressPage.category.field.smallBoreRifles);
  I.submitForm();
  I.see(locationAddressPage.category.content.fullBoreRifles, locationAddressPage.addAnotherAddress.field.summary);
  I.see(locationAddressPage.category.content.smallBoreRifles, locationAddressPage.addAnotherAddress.field.summary);
});

Scenario('category step: when I select 3 categories: full-bore rifles, small-bore rifles, muzzle-loading pistols categories, I see these categories against the address', (
  I,
  locationAddressPage
) => {
  locationAddressPage.fillAllAddressFieldsAndSubmit();
  I.click(locationAddressPage.category.field.fullBoreRifles);
  I.click(locationAddressPage.category.field.smallBoreRifles);
  I.click(locationAddressPage.category.field.muzzleLoadingPistols);
  I.submitForm();
  I.see(locationAddressPage.category.content.fullBoreRifles, locationAddressPage.addAnotherAddress.field.summary);
  I.see(locationAddressPage.category.content.smallBoreRifles, locationAddressPage.addAnotherAddress.field.summary);
  I.see(locationAddressPage.category.content.muzzleLoadingPistols, locationAddressPage.addAnotherAddress.field.summary);
});

Scenario('add another address step: the correct form elements are present', (
  I,
  locationAddressPage
  ) => {
  locationAddressPage.selectAddressCategoryAndSubmit();
  I.seeElements(locationAddressPage.addAnotherAddress.field.group)
});

Scenario('add another address step: an error is present when I submit form the form without selecting an option', (
  I,
  locationAddressPage
) => {
  locationAddressPage.fillAllAddressFieldsAndSubmit();
  I.submitForm();
});

Scenario('add another address step: the previous address is present', (
  I,
  locationAddressPage
) => {
  locationAddressPage.selectAddressCategoryAndSubmit();
  I.see(locationAddressPage.addAnotherAddress.content.address, locationAddressPage.addAnotherAddress.field.summary);
});

Scenario('add-another-address page step: I select yes I am taken to the location-postcode step', (
  I,
  locationAddressPage
) => {
  locationAddressPage.selectAddressCategoryAndSubmit();
  I.click(locationAddressPage.addAnotherAddress.field.yes);
  I.submitForm();
  I.seeInCurrentUrl(locationAddressPage.url);
});

Scenario('add another address page: When I select No I am taken to the storage address page', (
  I,
  locationAddressPage,
  clubsStorageAddressPage
) => {
  locationAddressPage.selectAddressCategoryAndSubmit();
  I.click(locationAddressPage.addAnotherAddress.field.no);
  I.submitForm();
  I.seeInCurrentUrl(clubsStorageAddressPage.url);
});

Scenario('add another address page: When I click Remove, I am taken back to the location-postcode page', (
  I,
  locationAddressPage
) => {
  locationAddressPage.selectAddressCategoryAndSubmit();
  I.click(locationAddressPage.addAnotherAddress.field.delete);
  I.seeInCurrentUrl(locationAddressPage.url);
});

Scenario('add another address page: When I click Remove, the address is removed from the summary table and the associated category', (
  I,
  locationAddressPage
) => {
  locationAddressPage.addMultipleAddresses();
  I.click(locationAddressPage.addAnotherAddress.field.delete);
  I.dontSee(locationAddressPage.addAnotherAddress.content.address, locationAddressPage.addAnotherAddress.field.summary);
  I.dontSee(locationAddressPage.category.content.fullBoreRifles, locationAddressPage.addAnotherAddress.field.summary);
});

Scenario('add another address page: When I add two addresses I can see both addresses on the add-another-address step', (
  I,
  locationAddressPage
) => {
  locationAddressPage.addMultipleAddresses();
  I.seeEach([
    locationAddressPage.manualEntry.content.address,
    locationAddressPage.addAnotherAddress.content.address
  ])
});
