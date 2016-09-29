'use strict';

const steps = require('../../');

Feature('Authority Holder step');

Before((
  I,
  authorityHoldersPage
) => {
  I.visitPage(authorityHoldersPage, steps);
});

Scenario('The correct form elements are present', (
  I,
  authorityHoldersPage
) => {
  I.seeElements([
    authorityHoldersPage['authority-holders-group'],
    authorityHoldersPage.one,
    authorityHoldersPage.two
  ]);
});

Scenario('An error is shown if authority-holders step is not completed', (
  I,
  authorityHoldersPage
) => {
  I.submitForm();
  I.seeErrors(authorityHoldersPage['authority-holders-group']);
});

Scenario('Im taken to the first-authority-holders-name step', (
  I,
  authorityHoldersPage,
  firstAuthorityHoldersNamePage
) => {
  I.click(authorityHoldersPage.one);
  I.submitForm();
  I.seeInCurrentUrl(firstAuthorityHoldersNamePage.url);
});
