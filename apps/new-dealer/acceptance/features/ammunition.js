'use strict';

const steps = require('../../');

Feature('Ammunition step');

Before((
  I,
  ammunitionsPage
) => {
  I.visitPage(ammunitionsPage, steps);
});

// Scenario('The correct form elements are present', (
//   I,
//   ammunitionsPage
// ) => {
//   I.seeElements([
//     ammunitionsPage.unspecified,
//     ammunitionsPage['explosive-cartridges'],
//     ammunitionsPage['incendiary-missile'],
//     ammunitionsPage['armour-piercing'],
//     ammunitionsPage['expanding-missile'],
//     ammunitionsPage['missiles-for-above']
//   ]);
// });

Scenario('An error is shown if ammunition step is not completed', (
  I,
  ammunitionsPage
) => {
  I.submitForm();
  I.seeErrors(ammunitionsPage['ammunition-group']);
});

Scenario('Selecting unspecified toggles unspecified details field', (
  ammunitionsPage
) => {
  ammunitionsPage.checkboxTogglesField(ammunitionsPage.unspecified, ammunitionsPage['quantity-details'].unspecified);
});

Scenario('Selecting explosive-cartridges toggles quantity field', (
  ammunitionsPage
) => {
  ammunitionsPage.checkboxTogglesField(ammunitionsPage['explosive-cartridges'], ammunitionsPage['quantity-details']['explosive-cartridges']);
});

Scenario('Selecting incendiary-missile toggles quantity field', (
  ammunitionsPage
) => {
  ammunitionsPage.checkboxTogglesField(ammunitionsPage['incendiary-missile'], ammunitionsPage['quantity-details']['incendiary-missile']);
});

Scenario('Selecting armour-piercing toggles quantity field', (
  ammunitionsPage
) => {
  ammunitionsPage.checkboxTogglesField(ammunitionsPage['armour-piercing'], ammunitionsPage['quantity-details']['armour-piercing']);
});

Scenario('Selecting expanding-missile toggles quantity field', (
  ammunitionsPage
) => {
  ammunitionsPage.checkboxTogglesField(ammunitionsPage['expanding-missile'], ammunitionsPage['quantity-details']['expanding-missile']);
});

Scenario('Selecting missiles-for-above toggles quantity field', (
  ammunitionsPage
) => {
  ammunitionsPage.checkboxTogglesField(ammunitionsPage['missiles-for-above'], ammunitionsPage['quantity-details']['missiles-for-above']);
});

Scenario('An error is shown if ammunition step is not completed after selecting unspecified', (
  ammunitionsPage
) => {
  ammunitionsPage.toggledFieldShowsError(ammunitionsPage.unspecified, ammunitionsPage['quantity-details'].unspecified);
});

Scenario('An error is shown if a number is not entered into the explosive-cartridges quantity field', (
  ammunitionsPage
) => {
  ammunitionsPage.fieldShowsNonNumericError(ammunitionsPage['explosive-cartridges'], ammunitionsPage['quantity-details']['explosive-cartridges']);
});

Scenario('An error is shown if a number is not entered into the incendiary-missile quantity field', (
  ammunitionsPage
) => {
  ammunitionsPage.fieldShowsNonNumericError(ammunitionsPage['incendiary-missile'], ammunitionsPage['quantity-details']['incendiary-missile']);
});

Scenario('An error is shown if a number is not entered into the armour-piercing quantity field', (
  ammunitionsPage
) => {
  ammunitionsPage.fieldShowsNonNumericError(ammunitionsPage['armour-piercing'], ammunitionsPage['quantity-details']['armour-piercing']);
});

Scenario('An error is shown if a number is not entered into the expanding-missile quantity field', (
  ammunitionsPage
) => {
  ammunitionsPage.fieldShowsNonNumericError(ammunitionsPage['expanding-missile'], ammunitionsPage['quantity-details']['expanding-missile']);
});

Scenario('An error is shown if a number is not entered into the missiles-for-above quantity field', (
  ammunitionsPage
) => {
  ammunitionsPage.fieldShowsNonNumericError(ammunitionsPage['missiles-for-above'], ammunitionsPage['quantity-details']['missiles-for-above']);
});

Scenario('An error is shown if unspecified and another option is selected', (
  ammunitionsPage
) => {
  ammunitionsPage.unspecifiedOptionShowsError();
});

Scenario('When I select Weapons on the handle step I am taken to the authority-holders step', (
  I,
  ammunitionsPage,
  authorityHoldersPage
) => {
  ammunitionsPage.fillFormAndSubmit();
  I.seeInCurrentUrl(authorityHoldersPage.url);
});

