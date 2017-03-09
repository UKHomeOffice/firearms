'use strict';

// create a function that returns the next item of an array every time it is called
const iterate = (arr) => {
  let count = 0;
  return () => {
    const value = arr[count];
    count++;
    return value || arr[arr.length - 1];
  };
};

const values = {
  activity: 'new',
  organisation: 'company',
  'weapons-types': 'fully-automatic',
  'ammunition-types': 'explosive-cartridges',
  'first-authority-holders-nationality-multi': null,
  'contact-holder': 'first',
  'supporting-document-add-another': iterate(['yes', 'no']),
  'supporting-document-upload': __filename
};

Feature('Happy path');

Before((
  I
) => {
  I.amOnPage('/s5/activity');
});

Scenario('An applicaton can be completed end-to-end', (
  I
) => {
  I.completeToStep('/s5/confirmation', values);
});

