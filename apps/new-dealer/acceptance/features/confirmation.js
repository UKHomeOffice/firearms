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

Scenario('I see content relating to arm guards on the page when arm guards is selected on the usage step', function *(
  I,
  confirmationPage
) {
  I.amOnPage('/s5/');
  yield I.setSessionData(steps.name, {
    'usage': 'arm-guards'
  });
  yield I.setSessionSteps(steps.name, ['/confirm']);
  yield I.amOnPage('/s5/' + confirmationPage.url);
  confirmationPage.showsArmGuardsContent();
});

Scenario('I don\'t see content relating to arm guards on the page when arm guards is not selected on the usage step', function *(
  I,
  confirmationPage
) {
  I.amOnPage('/s5/');
  yield I.setSessionData(steps.name, {
    'usage': 'training'
  });
  yield I.setSessionSteps(steps.name, ['/confirm']);
  yield I.amOnPage('/s5/' + confirmationPage.url);
  confirmationPage.doesntShowArmGuardsContent();
});

Scenario('I am redirected to the start page when I refresh', function *(
  I,
  confirmationPage
) {
  yield I.visitPage(confirmationPage, steps);
  yield I.refreshPage();
  I.dontSeeInCurrentUrl(confirmationPage.url);
});
