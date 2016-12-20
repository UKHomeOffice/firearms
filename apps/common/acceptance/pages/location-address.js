'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'location-postcode',
  postcode: {
    field: {
      postcode:'#location-postcode',
      postcodeGroup: '#location-postcode-group'
    },
    manualEntryLink: '#manual-entry',
    content: {
      invalid: 'kowabunga',
      valid: 'CR0 2EU',
      notFound: 'AA1 1AA'
    }
  },

  manualEntry: {
    url: 'location-address'
  },

  lookUpAddress: {
    url: '/location-address-lookup/'
  },

  fillFormAndSubmit(field, content) {
    I.fillField(field, content);
    I.submitForm();
  }
};
