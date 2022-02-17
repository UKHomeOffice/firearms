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
  I.seeElements(storagePage['storage-group']);
});

Scenario('When I select renew on the activity, I see the renew message icon', function *(
  I,
  storagePage
) {
  yield I.setSessionData(steps.name, {
    'activity': 'renew'
  });
  yield I.refreshPage();
  I.seeElement(storagePage['important-icon']);
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
  I.checkOption(storagePage.no);
  I.seeElements(storagePage['no-details']);
});

Scenario('An error is shown if storage step is not completed after selecting No', (
  I,
  storagePage
) => {
  I.checkOption(storagePage.no);
  I.submitForm();
  I.seeErrors(storagePage['no-details']);
});

Scenario('Im taken to the storage-postcode step', (
  I,
  storagePage,
  storageAddressPage
) => {
  I.click(storagePage.yes);
  I.submitForm();
  I.seeInCurrentUrl(storageAddressPage.url);
});
