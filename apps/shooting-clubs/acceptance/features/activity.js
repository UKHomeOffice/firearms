'use strict';

const steps = require('../../');

Feature('Activity step');

Before((
  I,
  activityPage
) => {
  I.visitPage(activityPage, steps);
});

Scenario('When I select Apply for an authority, I am taken to the new club step', (
  I,
  activityPage,
  newClubPage
) => {
  I.click(activityPage.new);
  I.submitForm();
  I.seeInCurrentUrl(newClubPage.url);
});

Scenario('When I select renew, I am taken to the existing authority upload page', (
  I,
  activityPage,
  existingAuthorityPage
) => {
  I.click(activityPage.renew);
  I.submitForm();
  I.seeInCurrentUrl(existingAuthorityPage.url);
});
