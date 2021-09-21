'use strict';
const steps = require('../../');

Feature('Existing Authority Upload step');

Before((
  I,
  existingAuthorityPage
) => {
  I.visitPage(existingAuthorityPage, steps)
});

Scenario('the correct form elements are present', (
  I,
  existingAuthorityPage
) => {
  I.seeElement(existingAuthorityPage.field.authorityUpload);
  I.seeElement(existingAuthorityPage.field.authorityUploadDescription);
});

Scenario('an error appears if I submit the form with an empty field', (
  I,
  existingAuthorityPage
) => {
  I.submitForm();
  I.seeErrors(existingAuthorityPage.field.authorityUpload);
});
