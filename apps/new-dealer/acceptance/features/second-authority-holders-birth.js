'use strict';

const steps = require('../../');

Feature('Second authority holders birth step');

Before((
  I,
  secondAuthorityHoldersBirthPage
) => {
  I.visitPage(secondAuthorityHoldersBirthPage, steps);
});

Scenario('The correct form elements are present', (
  I,
  secondAuthorityHoldersBirthPage
) => {
  I.seeElements([
    secondAuthorityHoldersBirthPage.day,
    secondAuthorityHoldersBirthPage.month,
    secondAuthorityHoldersBirthPage.year,
    secondAuthorityHoldersBirthPage.town,
    secondAuthorityHoldersBirthPage.country
  ]);
});

Scenario('An error is shown if second-authority-holders-birth step is not completed', (
  I,
  secondAuthorityHoldersBirthPage
) => {
  I.submitForm();
  I.seeErrors([
    secondAuthorityHoldersBirthPage.groups.dob,
    secondAuthorityHoldersBirthPage.groups.town,
    secondAuthorityHoldersBirthPage.groups.country
  ])
});

Scenario('An error is shown if date of birth is in the future', (
  I,
  secondAuthorityHoldersBirthPage
) => {
  secondAuthorityHoldersBirthPage.fillFormAndSubmit('future-dob');
  I.seeErrors(secondAuthorityHoldersBirthPage.groups.dob);
});

Scenario('An error is shown if date of birth entered is not numeric', (
  I,
  secondAuthorityHoldersBirthPage
) => {
  secondAuthorityHoldersBirthPage.fillFormAndSubmit('alpha-dob');
  I.seeErrors(secondAuthorityHoldersBirthPage.groups.dob);
});

Scenario('Second-authority-holders name is in the page header', function *(
  I,
  secondAuthorityHoldersBirthPage
) {
  yield I.setSessionData(steps.name, {
    'second-authority-holders-name': 'Barry Dylan'
  });
  yield I.refreshPage();
  I.see(secondAuthorityHoldersBirthPage.content.header);
});

Scenario('Im taken to the seocnd-authority-holders-nationality step', (
  I,
  secondAuthorityHoldersBirthPage,
  secondAuthorityHoldersNationalityPage
) => {
  secondAuthorityHoldersBirthPage.fillFormAndSubmit('valid-dob');
  I.seeInCurrentUrl(secondAuthorityHoldersNationalityPage.url);
});
