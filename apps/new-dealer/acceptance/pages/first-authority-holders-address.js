'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'first-authority-holders-postcode',
  'address-url': 'first-authority-holders-address',
  'address-lookup-url': 'first-authority-holders-address-lookup',

  fields: {
    postcode: '#first-authority-holders-postcode',
    'address-manual': '#first-authority-holders-address-manual',
    'address-lookup': '#first-authority-holders-address-lookup'
  },

  links: {
    'manual-entry': '#manual-entry',
    'cant-find-address': '#cant-find'
  },

  content: {
    header: 'What is Sterling Archer\'s home address?',
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
