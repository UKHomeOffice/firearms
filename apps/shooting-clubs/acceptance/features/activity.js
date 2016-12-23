'use strict';

const steps = require('../../');

Feature('Activity step');

Before((
  I,
  activityPage
) => {
  I.visitPage(activityPage, steps);
});

Scenario('When I select Apply for an authority, I am taken to the club name step', (
  I,
  activityPage,
  clubNamePage
) => {
  I.click(activityPage.new);
  I.submitForm();
  I.seeInCurrentUrl(clubNamePage.url);
});

Scenario('When I select renew, I am taken to the authority details page', (
  I,
  activityPage,
  authorityDetailsPage
) => {
  I.click(activityPage.renew);
  I.submitForm();
  I.seeInCurrentUrl(authorityDetailsPage.url);
});
