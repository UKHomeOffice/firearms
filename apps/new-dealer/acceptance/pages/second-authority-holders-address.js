'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'second-authority-holders-postcode',
  'address-url': 'second-authority-holders-address',
  'address-lookup-url': 'second-authority-holders-address-lookup',

  fields: {
    postcode: '#second-authority-holders-postcode',
    'address-manual': '#second-authority-holders-address-manual',
    'address-lookup': '#second-authority-holders-address-lookup'
  },

  links: {
    'manual-entry': '#manual-entry',
    'cant-find-address': '#cant-find'
  },

  content: {
    header: 'What is Barry Dylan\'s main business address?',
    postcode: 'CR0 2EU',
    address: '49 Sydenham Road, Croydon, CR0 2EU'
  },

  fillFormAndSubmit(field) {
    I.fillField(field, this.content.postcode);
    I.submitForm();
  },

  selectAddressAndSubmit() {
    this.fillFormAndSubmit(this.fields.postcode);
    I.selectOption(this.fields['address-lookup'], this.content.address);
    I.submitForm();
  }
};
