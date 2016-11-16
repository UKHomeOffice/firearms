'use strict';

const steps = require('../../');

Feature('Contact step');

Before((
  I,
  contactPage) => {
  I.visitPage(contactPage, steps);
});

Scenario('The correct form elements are present', (
  I,
  contactPage
) => {
  I.seeElements([
    contactPage['contact-first'],
    contactPage['contact-second'],
    contactPage['contact-other']
  ]);
});

Scenario('When I select renew on the activity, I see the renew message icon', function *(
  I,
  contactPage
) {
  yield I.setSessionData(steps.name, {
    'activity': 'renew'
  });
  yield I.refreshPage();
  I.seeElement(contactPage['important-icon']);
});

Scenario('An error is shown if contact step is not completed', (
  I,
  contactPage
) => {
  I.submitForm();
  I.seeErrors(contactPage['contact-group']);
});

Scenario('first-authority-holders name is the first radio option', function *(
  I,
  contactPage
) {
  yield I.setSessionData(steps.name, {
    'authority-holders': 'one',
    'first-authority-holders-name': contactPage.content['first-contact-name']
  });
  yield I.refreshPage();
  I.seeElements([
    contactPage['contact-first'],
    contactPage['contact-other']
  ]);
  I.dontSeeElement(contactPage['contact-second']);
  I.see(contactPage.content['first-contact-name']);
});

Scenario('both authority-holders names are in the radio options', function *(
  I,
  contactPage
) {
  yield I.setSessionData(steps.name, {
    'authority-holders': 'two',
    'first-authority-holders-name': contactPage.content['first-contact-name'],
    'second-authority-holders-name': contactPage.content['second-contact-name']
  });
  yield I.refreshPage();
  I.seeElements([
    contactPage['contact-first'],
    contactPage['contact-second'],
    contactPage['contact-other']
  ]);
  I.see(contactPage.content['first-contact-name']);
  I.see(contactPage.content['second-contact-name']);
});

Scenario('An error is shown if other person name is not completed', (
  I,
  contactPage
) => {
  I.checkOption(contactPage['contact-other']);
  I.submitForm();
  I.seeErrors(contactPage['other-name-group']);
});


Scenario('Im taken to the contact-details step', (
  I,
  contactPage,
  contactDetailsPage
) => {
  contactPage.fillFormAndSubmit();
  I.seeInCurrentUrl(contactDetailsPage.url);
});
