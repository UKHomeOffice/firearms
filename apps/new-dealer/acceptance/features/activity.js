'use strict';

const steps = require('../../');

Feature('Activity step');

Before((
  I,
  activityPage
) => {
  I.visitPage(activityPage, steps);
});

Scenario('The correct form elements are present', (
  I,
  activityPage
) => {
  I.seeElements([
    activityPage.activity,
    activityPage.new,
    activityPage.renew
  ]);
});

Scenario('An error is shown if activity step is not completed', (
  I,
  activityPage
) => {
  I.submitForm();
  I.seeErrors(activityPage.activity);
});

Scenario('When I select new, I am taken to the company-name step', (
  I,
  activityPage,
  companyNamePage
) => {
  I.click(activityPage.new);
  I.submitForm();
  I.seeInCurrentUrl(companyNamePage.url);
});

Scenario('When I select renew, I am taken to the authority-number-renew-vary step', (
  I,
  activityPage,
  authorityNumberRenewPage
) => {
  I.click(activityPage.renew);
  I.submitForm();
  I.seeInCurrentUrl(authorityNumberRenewPage.url);
});
