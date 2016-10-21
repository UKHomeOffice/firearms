'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'authority-holder-contact-postcode',
  'address-url': 'authority-holder-contact-address',
  'address-lookup-url': 'authority-holder-contact-address-lookup',

  fields: {
    'contact-address-group':' #use-different-address-group',
    'different-address': '#use-different-address-true',
    'same-address': '#use-different-address-false',
    'postcode-group': '#authority-holder-contact-postcode-group',
    postcode: '#authority-holder-contact-postcode',
    'address-manual': '#authority-holder-contact-address-manual',
    'address-lookup': '#authority-holder-contact-address-lookup'
  },


  links: {
    'manual-entry': '#manual-entry',
    'cant-find-address': '#cant-find'
  },

  content: {
    'first-contact': 'Which address should we use to contact Sterling Archer?',
    'second-contact': 'Which address should we use to contact Barry Dylan?',
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
