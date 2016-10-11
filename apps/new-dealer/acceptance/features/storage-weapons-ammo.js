'use strict';

const steps = require('../../');

Feature('Storage for weapons and Ammunition step');

Before((
  I,
  storageWeaponsAndAmmoPage
) => {
  I.visitPage(storageWeaponsAndAmmoPage, steps);
});

Scenario('The correct form elements are present', (
  I,
  storageWeaponsAndAmmoPage
) => {
  I.seeElements([
    storageWeaponsAndAmmoPage.weapons,
    storageWeaponsAndAmmoPage.ammunition
  ]);
});

Scenario('An error is shown if storage-weapons-ammo step is not completed', (
  I,
  storageWeaponsAndAmmoPage
) => {
  I.submitForm();
  I.seeErrors(storageWeaponsAndAmmoPage['weapons-ammo-group']);
});

Scenario('Im taken to the storage-address step', (
  I,
  storageWeaponsAndAmmoPage,
  storageAddressPage
) => {
  I.click(storageWeaponsAndAmmoPage.weapons);
  I.submitForm();
  I.seeInCurrentUrl(storageAddressPage.url);
});
