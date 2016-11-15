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
    usagePage.deactivation,
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
  I.seeErrors(usagePage['other-details'])
});

Scenario('Im taken to the upload supporting documents step', (
  I,
  usagePage,
  supportingDocsPage
) => {
  usagePage.fillFormAndSubmit();
  I.seeInCurrentUrl(supportingDocsPage.url);
});
