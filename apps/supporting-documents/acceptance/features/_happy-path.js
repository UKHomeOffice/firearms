'use strict';

const baseUrl = require('../../').baseUrl || '';

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
  'supporting-document-add-another': iterate(['yes', 'no']),
  'supporting-document-upload': __filename
};

Feature('Happy path');

Before((
  I
) => {
  I.amOnPage(`${baseUrl}`);
});

Scenario('An applicaton can be completed end-to-end', (
  I
) => {
  I.completeToStep(`${baseUrl}/confirmation`, values);
});

