'use strict';

const steps = require('../../');

Feature('Usage step');

Before((
  I,
  usagePage
) => {
  I.visitPage(usagePage, steps);
});

Scenario('The correct form elements are present', (
  I,
  usagePage
) => {
  I.seeElement(usagePage['usage-group']);
  I.click(usagePage.sell);
  I.click(usagePage.transport);
  I.click(usagePage.transfer);
  I.click(usagePage['arm-guards']);
  I.click(usagePage.training);
  I.click(usagePage.research);
  I.click(usagePage.deactivation);
  I.click(usagePage.other);
});

Scenario('When I select renew on the activity, I see the renew message icon', function *(
  I,
  usagePage
) {
  yield I.setSessionData(steps.name, {
    'activity': 'renew'
  });
  yield I.refreshPage();
  I.seeElement(usagePage['important-icon']);
});

Scenario('An error is shown if usage step is not completed', (
  I,
  usagePage
) => {
  I.submitForm();
  I.seeErrors(usagePage['usage-group']);
});

Scenario('Selecting Other toggles further details field', (
  I,
  usagePage
) => {
  I.click(usagePage.other);
  I.seeElement(usagePage['other-details']);
});

Scenario('An error is shown if usage step is not completed after selecting Other', (
  I,
  usagePage
) => {
  I.click(usagePage.other);
  I.submitForm();
  I.seeErrors(usagePage['other-details']);
});

Scenario('When I select weapons on the handle step, I am taken to the weapons page', function *(
  I,
  usagePage,
  weaponsPage
) {
  yield I.setSessionData(steps.name, {
    'weapons-ammunition': 'weapons'
  });
  yield I.refreshPage();
  usagePage.fillFormAndSubmit();
  I.seeInCurrentUrl(weaponsPage.url);
});

Scenario('When I select ammunition on the handle step, I am taken to the ammunition page', function *(
  I,
  usagePage,
  ammunitionsPage
) {
  yield I.setSessionData(steps.name, {
    'weapons-ammunition': 'ammunition'
  });
  yield I.refreshPage();
  usagePage.fillFormAndSubmit();
  I.seeInCurrentUrl(ammunitionsPage.url);
});

Scenario('When I select weapons and ammunition on the handle step, I am taken to the weapons page', function *(
  I,
  usagePage,
  weaponsPage
) {
  yield I.setSessionData(steps.name, {
    'weapons-ammunition': 'weapons,ammunition'
  });
  yield I.refreshPage();
  usagePage.fillFormAndSubmit();
  I.seeInCurrentUrl(weaponsPage.url);
});
