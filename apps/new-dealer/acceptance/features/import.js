'use strict';

const steps = require('../../');

Feature('Import step');

Before((
  I,
  importPage
) => {
  I.visitPage(importPage, steps);
});

Scenario('The correct form elements are present', (
  I,
  importPage
) => {
  I.seeElement(importPage.import);
});

Scenario('When I select renew on the activity, I see the renew message icon', function *(
  I,
  importPage
) {
  yield I.setSessionData(steps.name, {
    'activity': 'renew'
  });
  yield I.refreshPage();
  I.seeElement(importPage['important-icon']);
});


Scenario('An error is shown if import step is not completed', (
  I,
  importPage
) => {
  I.submitForm();
  I.seeErrors(importPage.import);
});

Scenario('Selecting yes toggles import-country field', (
  I,
  importPage
) => {
  I.click(importPage.yes);
  I.seeElement(importPage.country);
});

Scenario('An error is shown if import step is not completed after selecting yes', (
  I,
  importPage
) => {
  I.click(importPage.yes);
  I.submitForm();
  I.seeErrors(importPage.country);
});

Scenario('I\'m taken to the import step', (
  I,
  importPage,
  storagePage
) => {
  I.click(importPage.yes);
  I.fillField(importPage.country, importPage.content.country);
  I.submitForm();
  I.seeInCurrentUrl(storagePage.url);
});
