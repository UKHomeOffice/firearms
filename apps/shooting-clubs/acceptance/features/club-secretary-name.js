'use strict';

const steps = require('../../');

Feature('Club secretary step');

Before((
    I,
    clubSecretaryPage
) => {
    I.visitPage(clubSecretaryPage, steps);
});

Scenario('check there is the correct form elements', (
    I,
    clubSecretaryPage
) => {
    I.seeElement('#club-secretary-name')
});

Scenario('an error message appears if I submit an empty input field', (
    I,
    clubSecretaryPage
) => {
    I.submitForm();
    I.seeErrors(clubSecretaryPage['club-secretary-name']);
});

Scenario('I am taken to the appropriate next page', (
    I,
    clubSecretaryPage,
    clubSecretaryAddAddress
) => {
    clubSecretaryPage.fillFormAndSubmit();
    I.seeInCurrentUrl(clubSecretaryAddAddress.url);
});


