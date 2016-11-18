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

Scenario('When I select renew on the activity, I see the renew message icon', function *(
  I,
  authorityHoldersPage
) {
  yield I.setSessionData(steps.name, {
    'activity': 'renew'
  });
  yield I.refreshPage();
  I.seeElement(authorityHoldersPage['important-icon']);
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
