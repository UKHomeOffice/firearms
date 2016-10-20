'use strict';

const steps = require('../../');

Feature('Contact address authority holder step');

Before((
  I,
  contactAddressAuthorityHolderPage
) => {
  I.visitPage(contactAddressAuthorityHolderPage, steps);
});

Scenario('The correct form elements are present', (
  I,
  contactAddressAuthorityHolderPage
) => {
  I.seeElements([
    contactAddressAuthorityHolderPage['contact-address-group'],
    contactAddressAuthorityHolderPage['different-address'],
    contactAddressAuthorityHolderPage['same-address']
  ]);
});

Scenario('An error is shown if contact-address-authority-holder step is not completed', (
  I,
  contactAddressAuthorityHolderPage
) => {
  I.submitForm();
  I.seeErrors(contactAddressAuthorityHolderPage['contact-address-group']);
});

Scenario('Postcode field is toggled when use a different address is selected', (
  I,
  contactAddressAuthorityHolderPage
) => {
    I.click(contactAddressAuthorityHolderPage['different-address']);
    I.seeElement(contactAddressAuthorityHolderPage.postcode);
});

Scenario('An error is shown if ammunition step is not completed after selecting use a different address', (
  I,
  contactAddressAuthorityHolderPage
) => {
  I.click(contactAddressAuthorityHolderPage['different-address']);
  I.submitForm();
  I.seeErrors(contactAddressAuthorityHolderPage['postcode-group']);
});

Scenario('First-authority-holder\'s name is in the header', function *(
  I,
  contactAddressAuthorityHolderPage
) {
  yield I.setSessionData(steps.name, {
    'contact-holder': 'first',
    'first-authority-holders-name': 'Sterling Archer',
  });
  yield I.refreshPage();
  I.see(contactAddressAuthorityHolderPage.content['first-contact']);
});

Scenario('Second-authority-holder\'s name is in the header', function *(
  I,
  contactAddressAuthorityHolderPage
) {
  yield I.setSessionData(steps.name, {
    'contact-holder': 'second',
    'second-authority-holders-name': 'Barry Dylan',
  });
  yield I.refreshPage();
  I.see(contactAddressAuthorityHolderPage.content['second-contact']);
});

Scenario('I am taken to the contact manual-address step when I click the link', (
  I,
  contactAddressAuthorityHolderPage,
  contactAddressPage
) => {
  I.click(contactAddressAuthorityHolderPage['different-address']);
  I.click(contactAddressAuthorityHolderPage.links['manual-entry']);
  I.seeInCurrentUrl(contactAddressPage['address-url'])
});

Scenario('I am taken to the contact-address-lookup step when use-different-address is selected and postcode is provided', (
  I,
  contactAddressAuthorityHolderPage,
  contactAddressPage
) => {
  I.click(contactAddressAuthorityHolderPage['different-address']);
  I.fillField(contactAddressAuthorityHolderPage.postcode, contactAddressAuthorityHolderPage.content.postcode);
  I.submitForm();
  I.seeInCurrentUrl(contactAddressPage['address-lookup-url'])
});

Scenario('I am taken to the summary step when use-same-address is selected', (
  I,
  contactAddressAuthorityHolderPage,
  summaryPage
) => {
  I.click(contactAddressAuthorityHolderPage['same-address']);
  I.submitForm();
  I.seeInCurrentUrl(summaryPage.url)
});
