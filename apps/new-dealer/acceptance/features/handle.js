'use strict';

const steps = require('../../');

Feature('Handle step');

Before((
  I,
  handlePage
) => {
  I.visitPage(handlePage, steps);
});

Scenario('The correct form elements are present', (
  I,
  handlePage
) => {
  I.seeElements([
    handlePage['handle-weapons'],
    handlePage['handle-ammunition']
  ]);
});

Scenario('An error is shown if handle step is not completed', (
  I,
  handlePage
) => {
  I.submitForm();
  I.seeErrors(handlePage['weapons-ammunition-group']);
});

Scenario('Im taken to the obtain step', (
  I,
  handlePage,
  obtainPage
) => {
  I.click(handlePage['handle-weapons']);
  I.submitForm();
  I.seeInCurrentUrl(obtainPage.url);
});
