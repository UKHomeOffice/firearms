'use strict';

const steps = require('../../');

Feature('Obtain step');

Before((
  I,
  obtainPage
) => {
  I.visitPage(obtainPage, steps);
});

Scenario('The correct form elements are present', (
  I,
  obtainPage
) => {
  I.seeElements([
    obtainPage.buy,
    obtainPage['temporary-possession'],
    obtainPage.manufacture,
    obtainPage['other-means'],
    obtainPage['wont-take-possession']
  ]);
});

Scenario('When I select renew on the activity, I see the renew message icon', function *(
  I,
  obtainPage
) {
  yield I.setSessionData(steps.name, {
    'activity': 'renew'
  });
  yield I.refreshPage();
  I.seeElement(obtainPage['important-icon']);
});

Scenario('An error is shown if obtain step is not completed', (
  I,
  obtainPage
) => {
  I.submitForm();
  I.seeErrors(obtainPage['obtain-group']);
});

Scenario('Selecting Acquire through other means toggles further details field', (
  obtainPage
) => {
  obtainPage.checkboxTogglesField(obtainPage['other-means'], obtainPage['further-details']['other-means']);
});

Scenario('An error is shown if obtain step is not completed after selecting Acquire through other means', (
  obtainPage
) => {
  obtainPage.toggledFieldShowsError(obtainPage['other-means'], obtainPage['further-details']['other-means']);
});

Scenario('Im taken to the import step', (
  I,
  obtainPage,
  importPage
) => {
  obtainPage.fillFormAndSubmit();
  I.seeInCurrentUrl(importPage.url);
});
