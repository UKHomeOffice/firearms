'use strict';

const steps = require('../../');

Feature('Second authority holders name step');

Before((
  I,
  secondAuthorityHoldersNamePage
) => {
  I.visitPage(secondAuthorityHoldersNamePage, steps);
});

Scenario('The correct form elements are present', (
  I,
  secondAuthorityHoldersNamePage
) => {
  I.seeElement(secondAuthorityHoldersNamePage['holders-name']);
});

Scenario('An error is shown if second-authority-holders-name step is not completed', (
  I,
  secondAuthorityHoldersNamePage
) => {
  I.submitForm();
  I.seeErrors(secondAuthorityHoldersNamePage['holders-name']);
});

Scenario('Im taken to the second-authority-holders-birth step', (
  I,
  secondAuthorityHoldersNamePage,
  secondAuthorityHoldersBirthPage
) => {
  secondAuthorityHoldersNamePage.fillFormAndSubmit();
  I.seeInCurrentUrl(secondAuthorityHoldersBirthPage.url);
});
