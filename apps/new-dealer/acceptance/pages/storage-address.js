'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'storage-postcode',
  'address-url': 'storage-address',
  'address-lookup-url': 'storage-address-lookup',
  'another-address-url': 'storage-add-another-address',

  fields: {
    postcode: '#storage-postcode',
    'address-manual': '#storage-address-manual',
    'address-lookup': '#storage-address-lookup',
    add: '#storage-add-another-address-group',
    yes: '#storage-add-another-address-yes',
    no: '#storage-add-another-address-no',
  },

  links: {
    'manual-entry': '#manual-entry',
    'cant-find-address': '#cant-find',
    change: 'Change'
  },

  content: {
    postcode: 'CR0 2EU',
    address: '49 Sydenham Road, Croydon, CR0 2EU',
    'another-address': '2 Marsham Street, London'
  },

  fillFormAndSubmit(field, content) {
    I.fillField(field, content);
    I.submitForm();
  },

  selectAddressAndSubmit() {
    this.fillFormAndSubmit(this.fields.postcode, this.content.postcode);
    I.selectOption(this.fields['address-lookup'], this.content.address);
    I.submitForm();
  }
};
