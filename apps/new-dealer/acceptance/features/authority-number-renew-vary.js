'use strict';

const steps = require('../../');

Feature('Authority number renew vary step');

Before((
  I,
  authorityNumberRenewPage
) => {
  I.visitPage(authorityNumberRenewPage, steps);
});

Scenario('The correct form elements are present', (
  I,
  authorityNumberRenewPage
) => {
  I.seeElements([
    authorityNumberRenewPage['authority-number'],
    authorityNumberRenewPage['reference-number']
  ]);
});

Scenario('An error is shown if authority-number-renew-vary step is not completed', (
  I,
  authorityNumberRenewPage
) => {
  I.submitForm();
  I.seeErrors([
    authorityNumberRenewPage['authority-number-group'],
    authorityNumberRenewPage['reference-number-group']
  ]);
});

Scenario('I am taken to the existing-authority-document step', (
  I,
  authorityNumberRenewPage,
  existingAuthorityS5Page
) => {
  I.fillField(authorityNumberRenewPage['authority-number'], authorityNumberRenewPage.content.number);
  I.fillField(authorityNumberRenewPage['reference-number'], authorityNumberRenewPage.content.number);
  I.submitForm();
  I.seeInCurrentUrl(existingAuthorityS5Page.url);
});
