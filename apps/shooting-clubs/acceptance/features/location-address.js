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

Scenario('from address lookup step: I am taken to the next step, location category page', (
  I,
  locationAddressPage
) => {
  locationAddressPage.selectAddressAndSubmit();
  I.seeInCurrentUrl(locationAddressPage.category.url);
});

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

Scenario('from manual entry step: I am taken to the location-category step', (
  I,
  locationAddressPage
) => {
  I.click(locationAddressPage.postcode.manualEntryLink);
  locationAddressPage.fillFormAndSubmit(locationAddressPage.manualEntry.field.addressManual, locationAddressPage.manualEntry.content.address);
  I.seeInCurrentUrl(locationAddressPage.category.url);
});


Scenario('category step: the correct form elements are present', (
  I,
  locationAddressPage
) => {
  locationAddressPage.selectAddressAndSubmit();
  I.seeElements(
    [locationAddressPage.category.field.fullBoreRifles],
    [locationAddressPage.category.field.smallBoreRifles],
    [locationAddressPage.category.field.muzzleLoadingPistols]
  )
});

Scenario('category step: I see an error when I submit an empty form', (
  I,
  locationAddressPage
) => {
  locationAddressPage.selectAddressAndSubmit();
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
  locationAddressPage.selectAddressAndSubmit();
  I.click(locationAddressPage.category.field.fullBoreRifles);
  I.click(locationAddressPage.category.field.smallBoreRifles);
  I.submitForm();
  I.see(locationAddressPage.category.content.fullBoreRifles, locationAddressPage.addAnotherAddress.field.summary)
  I.see(locationAddressPage.category.content.smallBoreRifles, locationAddressPage.addAnotherAddress.field.summary)
});

Scenario('category step: when I select 3 categories: full-bore rifles, small-bore rifles, muzzle-loading pistols categories, I see these categories against the address', (
  I,
  locationAddressPage
) => {
  locationAddressPage.selectAddressAndSubmit();
  I.click(locationAddressPage.category.field.fullBoreRifles);
  I.click(locationAddressPage.category.field.smallBoreRifles);
  I.click(locationAddressPage.category.field.muzzleLoadingPistols);
  I.submitForm();
  I.see(locationAddressPage.category.content.fullBoreRifles, locationAddressPage.addAnotherAddress.field.summary)
  I.see(locationAddressPage.category.content.smallBoreRifles, locationAddressPage.addAnotherAddress.field.summary)
  I.see(locationAddressPage.category.content.muzzleLoadingPistols, locationAddressPage.addAnotherAddress.field.summary)
});

Scenario('add another address step: the correct form elements are present', (
  I,
  locationAddressPage
) => {
  locationAddressPage.selectAddressCategoryAndSubmit();
  I.seeElements([
    locationAddressPage.addAnotherAddress.field.yes,
    locationAddressPage.addAnotherAddress.field.no
  ])
});

Scenario('add another address step: an error is present when I submit form the form without selecting an option', (
  I,
  locationAddressPage
) => {
  locationAddressPage.selectAddressCategoryAndSubmit();
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

Scenario.only('add another address page: When I select No I am taken to the storage address list page', (
  I,
  locationAddressPage,
  shootingClubStorageAddressListPage
) => {
  locationAddressPage.selectAddressCategoryAndSubmit();
  I.click(locationAddressPage.addAnotherAddress.field.no);
  I.submitForm();
  I.seeInCurrentUrl(shootingClubStorageAddressListPage.url);
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
  I.dontSee(locationAddressPage.category.content.fullBoreRifles, locationAddressPage.addAnotherAddress.field.summary)
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

Scenario('add another address page: When I click edit location, I can enter a new location', (
  I,
  locationAddressPage
) => {
  locationAddressPage.selectAddressCategoryAndSubmit();
  I.click(locationAddressPage.addAnotherAddress.field.editLocationLink);
  I.click(locationAddressPage.postcode.manualEntryLink);
  locationAddressPage.fillFormAndSubmit(locationAddressPage.manualEntry.field.addressManual, locationAddressPage.manualEntry.content.address);
  I.click(locationAddressPage.category.field.smallBoreRifles);
  I.submitForm();
  I.see(locationAddressPage.manualEntry.content.address, locationAddressPage.addAnotherAddress.field.summary);
});

Scenario('add another address page: When I click edit categories, I can choose different categories', (
  I,
  locationAddressPage
) => {
  locationAddressPage.selectAddressCategoryAndSubmit();
  I.click(locationAddressPage.addAnotherAddress.field.editCategoriesLink);
  I.click(locationAddressPage.category.field.fullBoreRifles);
  I.click(locationAddressPage.category.field.smallBoreRifles);
  I.submitForm();
  I.see(locationAddressPage.category.content.smallBoreRifles, locationAddressPage.addAnotherAddress.field.summary);
  I.dontSee(locationAddressPage.category.content.fullBoreRifles, locationAddressPage.addAnotherAddress.field.summary);
});
