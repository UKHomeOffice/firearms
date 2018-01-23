
'use strict';

const steps = require('../../');

Feature('Confirm Page');

Before((
  I,
  confirmPage
) => {
  I.visitPage(confirmPage, steps);
});

Scenario('I see the correct table information', function *(
  I,
  confirmPage
) {
  yield confirmPage.setSessionData(steps.name);
  yield I.refreshPage();
  confirmPage.checkData();
});

Scenario('I see a list of storage address in table', function *(
  I,
  confirmPage
) {
  yield I.setSessionData(steps.name, {
    'storageAddresses': confirmPage.storageAddresses
  });
  yield I.refreshPage();
  I.seeEach([
    confirmPage.content['address-one'],
    confirmPage.content['address-two']
  ]);
});

// Scenario('I am taken to the confirmation page when I click submit', function *(
//   I,
//   confirmPage,
//   confirmationPage
// ) {
//   yield I.setSessionData(steps.name, {
//     'weapons-ammunition': [],
//     obtain: [],
//     usage: []
//   });
//   I.submitForm();
//   I.seeInCurrentUrl(confirmationPage.url);
// });


