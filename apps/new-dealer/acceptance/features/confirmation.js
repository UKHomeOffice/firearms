'use strict';

const steps = require('../../');

Feature('Confirmation page');

Scenario('I see the contact holders email address on the page', function *(
  I,
  confirmationPage
) {
  I.amOnPage('/s5/');
  yield I.setSessionData(steps.name, {
    'contact-email': confirmationPage.content.email
  });
  yield I.setSessionSteps(steps.name, ['/confirm']);
  yield I.amOnPage('/s5/' + confirmationPage.url);
  I.see(confirmationPage.content.email);
});
