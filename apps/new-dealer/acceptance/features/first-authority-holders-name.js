'use strict';

const steps = require('../../');

Feature('First authority holders name step');

Before((
  I,
  firstAuthorityHoldersNamePage
) => {
  I.visitPage(firstAuthorityHoldersNamePage, steps);
});

Scenario('The correct form elements are present', (
  I,
  firstAuthorityHoldersNamePage
) => {
  I.seeElement(firstAuthorityHoldersNamePage['holders-name']);
});

Scenario('An error is shown if first-authority-holders-name step is not completed', (
  I,
  firstAuthorityHoldersNamePage
) => {
  I.submitForm();
  I.seeErrors(firstAuthorityHoldersNamePage['holders-name']);
});

Scenario('When I select one on the authority-holders step I see the one authority holder translations', function *(
  I,
  firstAuthorityHoldersNamePage
) {
  yield I.setSessionData(steps.name, {
    'authority-holders': 'one'
  });
  yield I.refreshPage();
  firstAuthorityHoldersNamePage.pageShowsCorrectAuthorityTranslations('one');
});

Scenario('When I select two on the authority-holders step I see the two authority holder translations', function *(
  I,
  firstAuthorityHoldersNamePage
) {
  yield I.setSessionData(steps.name, {
    'authority-holders': 'two'
  });
  yield I.refreshPage();
  firstAuthorityHoldersNamePage.pageShowsCorrectAuthorityTranslations('two');
});

Scenario('Im taken to the first-authority-holders-birth step', (
  I,
  firstAuthorityHoldersNamePage,
  firstAuthorityHoldersBirthPage
) => {
  firstAuthorityHoldersNamePage.fillFormAndSubmit();
  I.seeInCurrentUrl(firstAuthorityHoldersBirthPage.url);
});
