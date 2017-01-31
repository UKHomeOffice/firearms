'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'club-secretary-address',
  'address-url': 'club-secretary-address-manual',
  'address-lookup-url': 'club-secretary-address-select',

  fields: {
    postcode: '#club-secretary-postcode',
    'address-manual': '#club-secretary-address',
    'address-lookup': '#club-secretary-address'
  },

  links: {
    'manual-entry': '#manual-entry',
    'cant-find-address': '#cant-find'
  },

  content: {
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
