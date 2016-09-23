'use strict';

const steps = require('../../');

Feature('Storage step');

Before((
  I,
  storagePage
) => {
  I.visitPage(storagePage, steps);
});

Scenario('The correct form elements are present', (
  I,
  storagePage
) => {
  I.seeElements([
    storagePage['storage-group'],
    storagePage.yes,
    storagePage.no
  ]);
});

Scenario('An error is shown if storage step is not completed', (
  I,
  storagePage
) => {
  I.submitForm();
  I.seeErrors(storagePage['storage-group']);
});

Scenario('Selecting no toggles no-storage-details field', (
  I,
  storagePage
) => {
  I.checkOption(storagePage.no)
  I.seeElements(storagePage['no-details']);
});

Scenario('An error is shown if storage step is not completed after selecting No', (
  I,
  storagePage
) => {
  I.checkOption(storagePage.no)
  I.submitForm();
  I.seeErrors(storagePage['no-details']);
});

Scenario('When I select Weapons on the handle step, all headers and field labels use Weapons translations', function *(
  I,
  storagePage
) {
  yield I.setSessionData(steps.name, {
    company: 'true',
    'weapons-ammunition': 'weapons'
  });
  yield I.refreshPage();
  storagePage.pageShowsCorrectHandleType('weapons');
});

Scenario('When I select Ammunition on the handle step, all headers and field labels use Ammunition translations', function *(
  I,
  storagePage
) {
  yield I.setSessionData(steps.name, {
    company: 'true',
    'weapons-ammunition': 'ammunition'
  });
  yield I.refreshPage();
  storagePage.pageShowsCorrectHandleType('ammunition');
});

Scenario('When I select Weapons and Ammunition on the handle step, all headers and field labels use Weapons and Ammunition translations', function *(
  I,
  storagePage
) {
  yield I.setSessionData(steps.name, {
    company: 'true',
    'weapons-ammunition': 'weapons,ammunition'
  });
  yield I.refreshPage();
  storagePage.pageShowsCorrectHandleType('weapons,ammunition');
});

Scenario('When I select Company on the company step, all headers and field labels use Company translations', function *(
  I,
  storagePage
) {
  yield I.setSessionData(steps.name, {
    company: 'true',
    'weapons-ammunition': 'weapons'
  });
  yield I.refreshPage();
  storagePage.pageShowsCompanyOrTrader('true');
});

Scenario('When I select Sole-trader on the company step, all headers and field labels use Sole-trader translations', function *(
  I,
  storagePage
) {
  yield I.setSessionData(steps.name, {
    company: 'false',
    'weapons-ammunition': 'weapons'
  });
  yield I.refreshPage();
  storagePage.pageShowsCompanyOrTrader('false');
});

Scenario('Im taken to the usage step', (
  I,
  storagePage,
  usagePage
) => {
  I.click(storagePage.yes);
  I.submitForm();
  I.seeInCurrentUrl(usagePage.url);
});
