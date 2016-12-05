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
  I.seeElement('#second-person-name');
});

Scenario('there is an error if I submit an empty form element', (
  I,
  secondPersonNamePage
) => {
  I.submitForm();
  I.seeErrors('#second-person-name');
});

Scenario('I am taken to the appropriate next page', (
  I,
  secondPersonNamePage
) => {
  secondPersonNamePage.fillFormAndSubmit();
});
