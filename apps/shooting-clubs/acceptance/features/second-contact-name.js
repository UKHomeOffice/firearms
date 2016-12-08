'use strict';

const steps = require('../../');

Feature('Second contact name step');

Before((
  I,
  secondContactNamePage
) => {
  I.visitPage(secondContactNamePage, steps);
});

Scenario('The correct form element are present', (
  I,
  secondContactNamePage
) => {
  I.seeElement(secondContactNamePage['second-contact-name-id']);
});

Scenario('there is an error if I submit an empty form element', (
  I,
  secondContactNamePage
) => {
  I.submitForm();
  I.seeErrors(secondContactNamePage['second-contact-name-id']);
});

Scenario('I am taken to the appropriate next page', (
  secondContactNamePage
) => {
  secondContactNamePage.fillFormAndSubmit();
});
