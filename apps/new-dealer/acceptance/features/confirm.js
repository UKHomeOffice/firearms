
'use strict';

const steps = require('../../');

Feature('Confirm Page');

Before((
  I,
  confirmPage
) => {
  I.visitPage(confirmPage, steps);
});

Scenario('I see the declaration field', (
  I,
  confirmPage
) => {
  I.seeElement(confirmPage.declaration);
});

Scenario('I see an error if I submit the form without accepting the declaration', (
  I,
  confirmPage
) => {
  I.submitForm();
  I.seeErrors(confirmPage.declaration);
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

Scenario('I am taken to the confirmation page when I agree to the declaration', function *(
  I,
  confirmPage,
  confirmationPage
) {
  yield confirmPage.setSessionData(steps.name);
  I.click(confirmPage.declaration);
  I.submitForm();
  I.seeInCurrentUrl(confirmationPage.url);
});


