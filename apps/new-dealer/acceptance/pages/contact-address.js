'use strict';

let steps = require('../../').steps;

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'contact-postcode',
  'address-url': 'contact-address',
  'address-lookup-url': 'contact-address-lookup',

  next: steps['/contact-address'].next,

  fields: {
    postcode: '#contact-postcode',
    'address-manual': '#contact-address-manual',
    'address-lookup': '#contact-address-lookup'
  },

  links: {
    'manual-entry': '#manual-entry',
    'cant-find-address': '#cant-find'
  },

  content: {
    header: 'What is Sterling Archer\'s address?',
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
