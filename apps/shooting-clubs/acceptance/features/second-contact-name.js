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
  I.seeElement('#second-contact-name');
});

Scenario('there is an error if I submit an empty form element', (
  I,
  secondContactNamePage
) => {
  I.submitForm();
  I.seeErrors('#second-contact-name');
});

Scenario('I am taken to the appropriate next page', (
  I,
  secondContactNamePage
) => {
  secondContactNamePage.fillFormAndSubmit();
});
