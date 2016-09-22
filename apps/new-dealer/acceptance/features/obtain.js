'use strict';

const steps = require('../../');

Feature('Obtain step');

Before((
  I,
  obtainPage
) => {
  I.visitPage(obtainPage, steps);
});

Scenario('The correct form elements are present', (
  I,
  obtainPage
) => {
  I.seeElements([
    obtainPage.buy,
    obtainPage['temporary-possession'],
    obtainPage.manufacture,
    obtainPage['other-means'],
    obtainPage['wont-take-possession']
  ]);
});

Scenario('An error is shown if obtain step is not completed', (
  I,
  obtainPage
) => {
  I.submitForm();
  I.seeErrors(obtainPage['obtain-group']);
});

Scenario('Selecting Buy toggles further details field', (
  obtainPage
) => {
    obtainPage.checkboxTogglesField(obtainPage.buy, obtainPage['further-details'].buy);
});

Scenario('Selecting Take temporary possession toggles further details field', (
  obtainPage
) => {
  obtainPage.checkboxTogglesField(obtainPage['temporary-possession'], obtainPage['further-details']['temporary-possession']);
});

Scenario('Selecting Acquire through other means toggles further details field', (
  obtainPage
) => {
  obtainPage.checkboxTogglesField(obtainPage['other-means'], obtainPage['further-details']['other-means']);
});

Scenario('Selecting Won\'t take possession toggles further details field', (
  obtainPage
) => {
  obtainPage.checkboxTogglesField(obtainPage['wont-take-possession'], obtainPage['further-details']['wont-take-possession']);
});

Scenario('An error is shown if obtain step is not completed after selecting Buy', (
  obtainPage
) => {
  obtainPage.toggledFieldShowsError(obtainPage.buy, obtainPage['further-details'].buy);
});

Scenario('An error is shown if obtain step is not completed after selecting Take temporary possession', (
  obtainPage
) => {
  obtainPage.toggledFieldShowsError(obtainPage['temporary-possession'], obtainPage['further-details']['temporary-possession']);
});

Scenario('An error is shown if obtain step is not completed after selecting Acquire through other means', (
  obtainPage
) => {
  obtainPage.toggledFieldShowsError(obtainPage['other-means'], obtainPage['further-details']['other-means']);
});

Scenario('An error is shown if obtain step is not completed after selecting Won\'t take possession', (
  obtainPage
) => {
  obtainPage.toggledFieldShowsError(obtainPage['wont-take-possession'], obtainPage['further-details']['wont-take-possession']);
});

Scenario('When I select Ammunition on the handle step, all headers and field labels use ammunition translations', function *(
  I,
  obtainPage
) {
  yield I.setSessionData(steps.name, {
    company: 'true',
    'weapons-ammunition': 'ammunition'
  });
  yield I.refreshPage();
  obtainPage.pageShowsCorrectHandleType('ammunition');
});

Scenario('When I select Weapons on the handle step, all headers and field labels use Weapons translations', function *(
  I,
  obtainPage
) {
  yield I.setSessionData(steps.name, {
    company: 'true',
    'weapons-ammunition': 'weapons'
  });
  yield I.refreshPage();
  obtainPage.pageShowsCorrectHandleType('weapons');
});

Scenario('When I select Weapons and Ammunition on the handle step, all headers and field labels use Weapons and Ammunition translations', function *(
  I,
  obtainPage
) {
  yield I.setSessionData(steps.name, {
    company: 'true',
    'weapons-ammunition': 'weapons,ammunition'
  });
  yield I.refreshPage();
  obtainPage.pageShowsCorrectHandleType('weapons,ammunition');
});

Scenario('When I select Company on the company step, all headers and field labels use Company translations', function *(
  I,
  obtainPage
) {
  yield I.setSessionData(steps.name, {
    company: 'true',
    'weapons-ammunition': 'weapons'
  });
  yield I.refreshPage();
  obtainPage.pageShowsCompanyOrTrader('true');
});

Scenario('When I select Sole-trader on the company step, all headers and field labels use Sole-trader translations', function *(
  I,
  obtainPage
) {
  yield I.setSessionData(steps.name, {
    company: 'false',
    'weapons-ammunition': 'weapons'
  });
  yield I.refreshPage();
  obtainPage.pageShowsCompanyOrTrader('false');
});

Scenario('Im taken to the storage step', (
  I,
  obtainPage,
  storagePage
) => {
  obtainPage.fillFormAndSubmit();
  I.seeInCurrentUrl(storagePage.url);
});
