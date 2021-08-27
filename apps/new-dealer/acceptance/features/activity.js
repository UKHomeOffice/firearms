'use strict';

const steps = require('../../');

Feature('Activity step');

Before((
  I,
  activityPage
) => {
  I.visitPage(activityPage, steps);
});

Scenario('When I select new, I am taken to the supporting-document step', (
  I,
  activityPage,
  supportingDocumentsPage
) => {
  I.click(activityPage.new);
  I.submitForm();
  I.seeInCurrentUrl(supportingDocumentsPage.url);
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
