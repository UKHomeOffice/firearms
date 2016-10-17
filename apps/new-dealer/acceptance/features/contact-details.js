'use strict';

const steps = require('../../');

Feature('Contact details step');

Before((
  I,
  contactDetailsPage
) => {
  I.visitPage(contactDetailsPage, steps);
});

Scenario('The correct form elements are present', (
  I,
  contactDetailsPage
) => {
  I.seeElements([
    contactDetailsPage.email,
    contactDetailsPage.phone
  ]);
});

Scenario('An error is shown if contact-details step is not completed', (
  I,
  contactDetailsPage
) => {
  I.submitForm();
  I.seeErrors([
    contactDetailsPage.email,
    contactDetailsPage.phone
  ]);
});

Scenario('An error is shown if an invalid email address is entered', (
  I,
  contactDetailsPage
) => {
  contactDetailsPage.fillFormAndSubmit(contactDetailsPage.content['invalid-email']);
  I.seeErrors(contactDetailsPage.email);
});

Scenario('First-authority-holders name is in the page header', function *(
  I,
  contactDetailsPage
) {
  yield I.setSessionData(steps.name, {
    'first-authority-holders-name': 'Sterling Archer',
    'contact-holder': 'first'
  });
  yield I.refreshPage();
  I.see(contactDetailsPage.content['first-contact']);
});

Scenario('Second-authority-holders name is in the page header', function *(
  I,
  contactDetailsPage
) {
  yield I.setSessionData(steps.name, {
    'second-authority-holders-name': 'Barry Dylan',
    'contact-holder': 'second'
  });
  yield I.refreshPage();
  I.see(contactDetailsPage.content['second-contact']);
});

Scenario('Other contact holder name is in the page header', function *(
  I,
  contactDetailsPage
) {
  yield I.setSessionData(steps.name, {
    'contact-holder': 'other',
    'someone-else-name': 'Lana Kane'
  });
  yield I.refreshPage();
  I.see(contactDetailsPage.content['other-contact']);
});


Scenario('When I select someone-else on contact-holder step, I am taken to the contact-postcode step', function *(
  I,
  contactDetailsPage,
  contactAddressPage
) {
  yield I.setSessionData(steps.name, {
    'contact-holder': 'other'
  });
  yield I.refreshPage();
  contactDetailsPage.fillFormAndSubmit(contactDetailsPage.content['valid-email']);
  I.seeInCurrentUrl(contactAddressPage.url);
});

Scenario('When I select an authority holder on contact-holder step, I am taken to the contact-address-authority-holder step', function *(
  I,
  contactDetailsPage,
  contactAddressAuthorityHolderPage
) {
  yield I.setSessionData(steps.name, {
    'contact-holder': 'one'
  });
  yield I.refreshPage();
  contactDetailsPage.fillFormAndSubmit(contactDetailsPage.content['valid-email']);
  I.seeInCurrentUrl(contactAddressAuthorityHolderPage.url);
});
