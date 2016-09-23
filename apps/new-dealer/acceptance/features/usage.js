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
  I.seeElements([
    usagePage.sell,
    usagePage.transport,
    usagePage.transfer,
    usagePage['arm-guards'],
    usagePage.training,
    usagePage.research,
    usagePage.other
  ]);
});

Scenario('An error is shown if usage step is not completed', (
  I,
  usagePage
) => {
  I.submitForm();
  I.seeErrors(usagePage['usage-group']);
});

Scenario('Selecting Sell toggles further details field', (
  usagePage
) => {
  usagePage.checkboxTogglesField(usagePage.sell, usagePage['further-details'].sell);
});

Scenario('Selecting Transport toggles further details field', (
  usagePage
) => {
  usagePage.checkboxTogglesField(usagePage.transport, usagePage['further-details'].transport);
});

Scenario('Selecting Transfer toggles further details field', (
  usagePage
) => {
  usagePage.checkboxTogglesField(usagePage.transfer, usagePage['further-details'].transfer);
});

Scenario('Selecting Training and demonstration toggles further details field', (
  usagePage
) => {
  usagePage.checkboxTogglesField(usagePage.training, usagePage['further-details'].training);
});

Scenario('Selecting Research,forensics and testing toggles further details field', (
  usagePage
) => {
  usagePage.checkboxTogglesField(usagePage.research, usagePage['further-details'].research);
});

Scenario('Selecting Other toggles further details field', (
  usagePage
) => {
  usagePage.checkboxTogglesField(usagePage.other, usagePage['further-details'].other);
});

Scenario('An error is shown if usage step is not completed after selecting Sell', (
  usagePage
) => {
  usagePage.toggledFieldShowsError(usagePage.sell, usagePage['further-details'].sell);
});

Scenario('An error is shown if usage step is not completed after selecting Transport', (
  usagePage
) => {
  usagePage.toggledFieldShowsError(usagePage.transport, usagePage['further-details'].transport);
});

Scenario('An error is shown if usage step is not completed after selecting Transfer', (
  usagePage
) => {
  usagePage.toggledFieldShowsError(usagePage.transfer, usagePage['further-details'].transfer);
});

Scenario('An error is shown if usage step is not completed after selecting Training', (
  usagePage
) => {
  usagePage.toggledFieldShowsError(usagePage.training, usagePage['further-details'].training);
});

Scenario('An error is shown if usage step is not completed after selecting Research', (
  usagePage
) => {
  usagePage.toggledFieldShowsError(usagePage.research, usagePage['further-details'].research);
});

Scenario('An error is shown if usage step is not completed after selecting Other', (
  usagePage
) => {
  usagePage.toggledFieldShowsError(usagePage.other, usagePage['further-details'].other);
});

Scenario('When I select Ammunition on the handle step, all headers and field labels use ammunition translations', function *(
  I,
  usagePage
) {
  yield I.setSessionData(steps.name, {
    company: 'true',
    'weapons-ammunition': 'ammunition'
  });
  yield I.refreshPage();
  usagePage.pageShowsCorrectHandleType('ammunition');
});

Scenario('When I select Weapons on the handle step, all headers and field labels use Weapons translations', function *(
  I,
  usagePage
) {
  yield I.setSessionData(steps.name, {
    company: 'true',
    'weapons-ammunition': 'weapons'
  });
  yield I.refreshPage();
  usagePage.pageShowsCorrectHandleType('weapons');
});

Scenario('When I select Weapons and Ammunition on the handle step, all headers and field labels use Weapons and Ammunition translations', function *(
  I,
  usagePage
) {
  yield I.setSessionData(steps.name, {
    company: 'true',
    'weapons-ammunition': 'weapons,ammunition'
  });
  yield I.refreshPage();
  usagePage.pageShowsCorrectHandleType('weapons,ammunition');
});

Scenario('Im taken to the upload supporting documents step', (
  I,
  usagePage,
  supportingDocsPage
) => {
  usagePage.fillFormAndSubmit();
  I.seeInCurrentUrl(supportingDocsPage.url);
});
