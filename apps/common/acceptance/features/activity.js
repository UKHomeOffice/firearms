'use strict';

const steps = {
  name: 'common',
  steps: require('../../')
};

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
