'use strict';

const steps = require('../../');

Feature('Club-name step');

Before((
  I,
  clubNamePage
) => {
  I.visitPage(clubNamePage, steps)
});

Scenario('The correct form element appears', (
  I,
  clubNamePage
) => {
  I.seeElement(clubNamePage.clubName);
});

Scenario('I see an error when I submit an empty form', (
  I,
  clubNamePage
) => {
  I.submitForm();
  I.seeErrors(clubNamePage.clubName);
});

Scenario('When I correctly submit the form I am taken to club-postcode step', (
  I,
  clubNamePage,
  clubPostCodePage
) => {
  I.fillField(clubNamePage.clubName, clubNamePage.name)
  I.submitForm();
  I.seeInCurrentUrl(clubPostCodePage.url);
});
