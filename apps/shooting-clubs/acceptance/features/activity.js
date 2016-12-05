'use strict';

const steps = require('../../');

Feature('Activity step');

Before((
  I,
  activityPage
) => {
  I.visitPage(activityPage, steps);
});

Scenario('When I submit the page, I am taken to the club name step', (
  I,
  activityPage,
  clubNamePage
) => {
  I.click(activityPage.new);
  I.submitForm();
  I.seeInCurrentUrl(clubNamePage.url);
});
