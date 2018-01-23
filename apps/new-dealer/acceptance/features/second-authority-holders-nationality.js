'use strict';

const steps = require('../../');

Feature('Second authority holders nationality step');

Before((
  I,
  secondAuthorityHoldersNationalityPage
) => {
  I.visitPage(secondAuthorityHoldersNationalityPage, steps);
});

Scenario('The correct form elements are present', (
  I,
  secondAuthorityHoldersNationalityPage
) => {
  I.seeElements([
    secondAuthorityHoldersNationalityPage['first-nationality'],
    secondAuthorityHoldersNationalityPage['multi-nationality']
  ]);
});

Scenario('An error is shown if second-authority-holders-nationality step is not completed', (
  I,
  secondAuthorityHoldersNationalityPage
) => {
  I.submitForm();
  I.seeErrors(secondAuthorityHoldersNationalityPage['first-nationality-group']);
});

Scenario('Second-authority-holders name is in the page header', function *(
  I,
  secondAuthorityHoldersNationalityPage
) {
  yield I.setSessionData(steps.name, {
    'second-authority-holders-name': 'Barry Dylan'
  });
  yield I.refreshPage();
  I.see(secondAuthorityHoldersNationalityPage.content.header);
});

Scenario('Selecting Add another nationality toggles second and third nationality fields', (
  I,
  secondAuthorityHoldersNationalityPage
) => {
  I.click(secondAuthorityHoldersNationalityPage['multi-nationality']);
  I.seeElements([
    secondAuthorityHoldersNationalityPage['second-nationality'],
    secondAuthorityHoldersNationalityPage['third-nationality']
  ]);
});

Scenario('An error is shown if first nationality and second nationality are the same', (
  I,
  secondAuthorityHoldersNationalityPage
) => {
  secondAuthorityHoldersNationalityPage.sameValueInFields(
    secondAuthorityHoldersNationalityPage['first-nationality'],
    secondAuthorityHoldersNationalityPage['second-nationality']
  );
});

Scenario('An error is shown if first nationality and third nationality are the same', (
  I,
  secondAuthorityHoldersNationalityPage
) => {
  secondAuthorityHoldersNationalityPage.sameValueInFields(
    secondAuthorityHoldersNationalityPage['first-nationality'],
    secondAuthorityHoldersNationalityPage['third-nationality']
  );
});

// Scenario('An error is shown if second nationality and third nationality are the same', (
//   I,
//   secondAuthorityHoldersNationalityPage
// ) => {
//   I.fillField(
//     secondAuthorityHoldersNationalityPage['first-nationality'],
//     secondAuthorityHoldersNationalityPage.content['nationality-two']
//   );
//   secondAuthorityHoldersNationalityPage.sameValueInFields(
//     secondAuthorityHoldersNationalityPage['second-nationality'],
//     secondAuthorityHoldersNationalityPage['third-nationality']
//   );
// });

Scenario('Im taken to the first-authority-holders-address step', (
  I,
  secondAuthorityHoldersNationalityPage,
  secondAuthorityHoldersAddressPage
) => {
  secondAuthorityHoldersNationalityPage.fillFormAndSubmit();
  I.seeInCurrentUrl(secondAuthorityHoldersAddressPage.url);
});
