'use strict';

const steps = require('../../');

Feature('Second person name step');

Before((
  I,
  secondPersonNamePage
) => {
  I.visitPage(secondPersonNamePage, steps);
});

Scenario('The correct form element are present', (
  I,
  secondPersonNamePage
) => {
  I.seeElement(secondPersonNamePage['second-person-name-id']);
});

Scenario('there is an error if I submit an empty form element', (
  I,
  secondPersonNamePage
) => {
  I.submitForm();
  I.seeErrors(secondPersonNamePage['second-person-name-id']);
});

Scenario('I am taken to the appropriate next page', (
  secondPersonNamePage
) => {
  secondPersonNamePage.fillFormAndSubmit();
});
