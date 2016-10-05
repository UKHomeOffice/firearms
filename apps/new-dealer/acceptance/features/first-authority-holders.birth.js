'use strict';

const steps = require('../../');

Feature('First authority holders birth step');

Before((
  I,
  firstAuthorityHoldersBirthPage
) => {
  I.visitPage(firstAuthorityHoldersBirthPage, steps);
});

Scenario('The correct form elements are present', (
  I,
  firstAuthorityHoldersBirthPage
) => {
  I.seeElements([
    firstAuthorityHoldersBirthPage.day,
    firstAuthorityHoldersBirthPage.month,
    firstAuthorityHoldersBirthPage.year,
    firstAuthorityHoldersBirthPage.town,
    firstAuthorityHoldersBirthPage.country
  ]);
});

Scenario('An error is shown if first-authority-holders-birth step is not completed', (
  I,
  firstAuthorityHoldersBirthPage
) => {
  I.submitForm();
  I.seeErrors([
    firstAuthorityHoldersBirthPage.groups.dob,
    firstAuthorityHoldersBirthPage.groups.town,
    firstAuthorityHoldersBirthPage.groups.country
  ])
});

Scenario('An error is shown if date of birth is in the future', (
  I,
  firstAuthorityHoldersBirthPage
) => {
  firstAuthorityHoldersBirthPage.fillFormAndSubmit('future-dob');
  I.seeErrors(firstAuthorityHoldersBirthPage.groups.dob);
});

Scenario('An error is shown if date of birth entered is not numeric', (
  I,
  firstAuthorityHoldersBirthPage
) => {
  firstAuthorityHoldersBirthPage.fillFormAndSubmit('alpha-dob');
  I.seeErrors(firstAuthorityHoldersBirthPage.groups.dob);
});

Scenario('First-authority-holders name is in the page header', function *(
  I,
  firstAuthorityHoldersBirthPage
) {
  yield I.setSessionData(steps.name, {
    'first-authority-holders-name': 'Sterling Archer'
  });
  yield I.refreshPage();
  I.see(firstAuthorityHoldersBirthPage.content.header);
});

Scenario('Im taken to the first-authority-holders-nationality step', (
  I,
  firstAuthorityHoldersBirthPage,
  firstAuthorityHoldersNationalityPage
) => {
  firstAuthorityHoldersBirthPage.fillFormAndSubmit('valid-dob');
  I.seeInCurrentUrl(firstAuthorityHoldersNationalityPage.url);
});
