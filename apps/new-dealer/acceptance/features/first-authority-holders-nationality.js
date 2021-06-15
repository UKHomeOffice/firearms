'use strict';

const steps = require('../../');

Feature('First authority holders nationality step');

Before((
  I,
  firstAuthorityHoldersNationalityPage
) => {
  I.visitPage(firstAuthorityHoldersNationalityPage, steps);
});

Scenario('The correct form elements are present', (
  I,
  firstAuthorityHoldersNationalityPage
) => {
  I.seeElements([
    firstAuthorityHoldersNationalityPage['first-nationality'],
    //firstAuthorityHoldersNationalityPage['multi-nationality']
  ]);
});

Scenario('An error is shown if first-authority-holders-nationality step is not completed', (
  I,
  firstAuthorityHoldersNationalityPage
) => {
  I.submitForm();
  I.seeErrors(firstAuthorityHoldersNationalityPage['first-nationality-group']);
});

Scenario('First-authority-holders name is in the page header', function *(
  I,
  firstAuthorityHoldersNationalityPage
) {
  yield I.setSessionData(steps.name, {
    'first-authority-holders-name': 'Sterling Archer'
  });
  yield I.refreshPage();
  I.see(firstAuthorityHoldersNationalityPage.content.header);
});

Scenario('Selecting Add another nationality toggles second and third nationality fields', (
  I,
  firstAuthorityHoldersNationalityPage
) => {
  I.click(firstAuthorityHoldersNationalityPage['multi-nationality']);
  I.seeElements([
    firstAuthorityHoldersNationalityPage['second-nationality'],
    firstAuthorityHoldersNationalityPage['third-nationality']
  ]);
});

Scenario('An error is shown if first nationality and second nationality are the same', (
  I,
  firstAuthorityHoldersNationalityPage
) => {
  firstAuthorityHoldersNationalityPage.sameValueInFields(
    firstAuthorityHoldersNationalityPage['first-nationality'],
    firstAuthorityHoldersNationalityPage['second-nationality']
  );
});

Scenario('An error is shown if first nationality and third nationality are the same', (
  I,
  firstAuthorityHoldersNationalityPage
) => {
  firstAuthorityHoldersNationalityPage.sameValueInFields(
    firstAuthorityHoldersNationalityPage['first-nationality'],
    firstAuthorityHoldersNationalityPage['third-nationality']
  );
});

Scenario('An error is shown if I enter a country in the second nationality not in the list', (
  I
) => {
  I.click('#first-authority-holders-nationality-multi');
  I.fillField('#first-authority-holders-nationality', 'United Kingdom');
  I.fillField('#first-authority-holders-nationality-second', 'Scotland');
  I.submitForm();
  I.seeErrors('#first-authority-holders-nationality-second');
});

Scenario('An error is shown if I enter a country in the third nationality not in the list', (
  I
) => {
  I.click('#first-authority-holders-nationality-multi');
  I.fillField('#first-authority-holders-nationality', 'United Kingdom');
  I.fillField('#first-authority-holders-nationality-third', 'Scotland');
  I.submitForm();
  I.seeErrors('#first-authority-holders-nationality-third');
});

// Scenario('An error is shown if second nationality and third nationality are the same', (
//   I,
//   firstAuthorityHoldersNationalityPage
// ) => {
//   I.fillField(
//     firstAuthorityHoldersNationalityPage['first-nationality'],
//     firstAuthorityHoldersNationalityPage.content['nationality-two']
//   );
//   firstAuthorityHoldersNationalityPage.sameValueInFields(
//     firstAuthorityHoldersNationalityPage['second-nationality'],
//     firstAuthorityHoldersNationalityPage['third-nationality']
//   );
// });

Scenario('Im taken to the first-authority-holders-address step', (
  I,
  firstAuthorityHoldersNationalityPage,
  firstAuthorityHoldersAddressPage
) => {
  firstAuthorityHoldersNationalityPage.fillFormAndSubmit();
  I.seeInCurrentUrl(firstAuthorityHoldersAddressPage.url);
});
