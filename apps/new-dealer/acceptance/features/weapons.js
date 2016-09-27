'use strict';

const steps = require('../../');

Feature('Weapons step');

Before((
  I,
  weaponsPage
) => {
  I.visitPage(weaponsPage, steps);
});

Scenario('The correct form elements are present', (
  I,
  weaponsPage
) => {
  I.seeElements([
    weaponsPage.unspecified,
    weaponsPage['fully-automatic'],
    weaponsPage['self-loading'],
    weaponsPage['short-pistols'],
    weaponsPage['short-self-loading'],
    weaponsPage['large-revolvers'],
    weaponsPage['rocket-launchers'],
    weaponsPage['air-rifles'],
    weaponsPage['fire-noxious-substance'],
    weaponsPage['disguised-firearms'],
    weaponsPage['military-rockets'],
    weaponsPage['projecting-launchers']
  ]);
});

Scenario('An error is shown if weapons step is not completed', (
  I,
  weaponsPage
) => {
  I.submitForm();
  I.seeErrors(weaponsPage['weapons-group']);
});

Scenario('Selecting unspecified toggles unspecified details field', (
  weaponsPage
) => {
  weaponsPage.checkboxTogglesField(weaponsPage.unspecified, weaponsPage['quantity-details'].unspecified);
});

Scenario('Selecting fully-automatic toggles quantity field', (
  weaponsPage
) => {
  weaponsPage.checkboxTogglesField(weaponsPage['fully-automatic'], weaponsPage['quantity-details']['fully-automatic']);
});

Scenario('Selecting self-loading toggles quantity field', (
  weaponsPage
) => {
  weaponsPage.checkboxTogglesField(weaponsPage['self-loading'], weaponsPage['quantity-details']['self-loading']);
});

Scenario('Selecting short-pistols toggles quantity field', (
  weaponsPage
) => {
  weaponsPage.checkboxTogglesField(weaponsPage['short-pistols'], weaponsPage['quantity-details']['short-pistols']);
});

Scenario('Selecting short-self-loading toggles quantity field', (
  weaponsPage
) => {
  weaponsPage.checkboxTogglesField(weaponsPage['short-self-loading'], weaponsPage['quantity-details']['short-self-loading']);
});

Scenario('Selecting large-revolvers toggles quantity field', (
  weaponsPage
) => {
  weaponsPage.checkboxTogglesField(weaponsPage['large-revolvers'], weaponsPage['quantity-details']['large-revolvers']);
});

Scenario('Selecting rocket-launchers toggles quantity field', (
  weaponsPage
) => {
  weaponsPage.checkboxTogglesField(weaponsPage['rocket-launchers'], weaponsPage['quantity-details']['rocket-launchers']);
});

Scenario('Selecting air-rifles toggles quantity field', (
  weaponsPage
) => {
  weaponsPage.checkboxTogglesField(weaponsPage['air-rifles'], weaponsPage['quantity-details']['air-rifles']);
});

Scenario('Selecting fire-noxious-substance toggles quantity field', (
  weaponsPage
) => {
  weaponsPage.checkboxTogglesField(weaponsPage['fire-noxious-substance'], weaponsPage['quantity-details']['fire-noxious-substance']);
});

Scenario('Selecting disguised-firearms toggles quantity field', (
  weaponsPage
) => {
  weaponsPage.checkboxTogglesField(weaponsPage['disguised-firearms'], weaponsPage['quantity-details']['disguised-firearms']);
});

Scenario('Selecting military-rockets toggles quantity field', (
  weaponsPage
) => {
  weaponsPage.checkboxTogglesField(weaponsPage['military-rockets'], weaponsPage['quantity-details']['military-rockets']);
});

Scenario('Selecting projecting-launchers toggles quantity field', (
  weaponsPage
) => {
  weaponsPage.checkboxTogglesField(weaponsPage['projecting-launchers'], weaponsPage['quantity-details']['projecting-launchers']);
});

Scenario('An error is shown if weapons step is not completed after selecting unspecified', (
  weaponsPage
) => {
  weaponsPage.toggledFieldShowsError(weaponsPage.unspecified, weaponsPage['quantity-details'].unspecified);
});

Scenario('An error is shown if a number is not entered into the fully-automatic quantity field', (
  weaponsPage
) => {
  weaponsPage.fieldShowsNonNumericError(weaponsPage['fully-automatic'], weaponsPage['quantity-details']['fully-automatic']);
});

Scenario('An error is shown if a number is not entered into the self-loading quantity field', (
  weaponsPage
) => {
  weaponsPage.fieldShowsNonNumericError(weaponsPage['self-loading'], weaponsPage['quantity-details']['self-loading']);
});

Scenario('An error is shown if a number is not entered into the short-pistols quantity field', (
  weaponsPage
) => {
  weaponsPage.fieldShowsNonNumericError(weaponsPage['short-pistols'], weaponsPage['quantity-details']['short-pistols']);
});

Scenario('An error is shown if a number is not entered into the short-self-loading quantity field', (
  weaponsPage
) => {
  weaponsPage.fieldShowsNonNumericError(weaponsPage['short-self-loading'], weaponsPage['quantity-details']['short-self-loading']);
});

Scenario('An error is shown if a number is not entered into the large-revolvers quantity field', (
  weaponsPage
) => {
  weaponsPage.fieldShowsNonNumericError(weaponsPage['large-revolvers'], weaponsPage['quantity-details']['large-revolvers']);
});

Scenario('An error is shown if a number is not entered into the rocket-launchers quantity field', (
  weaponsPage
) => {
  weaponsPage.fieldShowsNonNumericError(weaponsPage['rocket-launchers'], weaponsPage['quantity-details']['rocket-launchers']);
});

Scenario('An error is shown if a number is not entered into the air-rifles quantity field', (
  weaponsPage
) => {
  weaponsPage.fieldShowsNonNumericError(weaponsPage['air-rifles'], weaponsPage['quantity-details']['air-rifles']);
});

Scenario('An error is shown if a number is not entered into the fire-noxious-substance quantity field', (
  weaponsPage
) => {
  weaponsPage.fieldShowsNonNumericError(weaponsPage['fire-noxious-substance'], weaponsPage['quantity-details']['fire-noxious-substance']);
});

Scenario('An error is shown if a number is not entered into the disguised-firearms quantity field', (
  weaponsPage
) => {
  weaponsPage.fieldShowsNonNumericError(weaponsPage['disguised-firearms'], weaponsPage['quantity-details']['disguised-firearms']);
});

Scenario('An error is shown if a number is not entered into the military-rockets quantity field', (
  weaponsPage
) => {
  weaponsPage.fieldShowsNonNumericError(weaponsPage['military-rockets'], weaponsPage['quantity-details']['military-rockets']);
});

Scenario('An error is shown if a number is not entered into the projecting-launchers quantity field', (
  weaponsPage
) => {
  weaponsPage.fieldShowsNonNumericError(weaponsPage['projecting-launchers'], weaponsPage['quantity-details']['projecting-launchers']);
});

Scenario('An error is shown if unspecified and another option is selected', (
  weaponsPage
) => {
  weaponsPage.unspecifiedOptionShowsError();
});

Scenario('When I select Weapons and Ammunition on the handle step I am taken to the ammuition step', function *(
  I,
  weaponsPage,
  ammunitionsPage
) {
  yield I.setSessionData(steps.name, {
    'weapons-ammunition': 'weapons,ammunition'
  });
  yield I.refreshPage();
  weaponsPage.fillFormAndSubmit();
  I.seeInCurrentUrl(ammunitionsPage.url);
});

Scenario('When I select Weapons on the handle step I am taken to the authority-holders step', function *(
  I,
  weaponsPage,
  authorityHoldersPage
) {
  yield I.setSessionData(steps.name, {
    'weapons-ammunition': 'weapons'
  });
  yield I.refreshPage();
  weaponsPage.fillFormAndSubmit();
  I.seeInCurrentUrl(authorityHoldersPage.url);
});
