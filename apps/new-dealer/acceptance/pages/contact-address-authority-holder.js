'use strict';

let I;

let steps = require('../../').steps;

module.exports = {

  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'authority-holder-contact-postcode',
  'address-url': 'authority-holder-contact-postcode',
  'address-lookup-url': 'authority-holder-contact-address-lookup',

  next: steps['/authority-holder-contact-address'].next,
  'next-with-address': '/invoice-contact-details',
  'next-different-address': '/authority-holder-contact-address',
  'next-address-select': '/authority-holder-contact-address-lookup',

  fields: {
    'contact-address-group':' #use-different-address-group',
    'different-address': '#use-different-address-true',
    'same-address': '#use-different-address-false',
    'postcode-group': '#authority-holder-contact-postcode-group',
    postcode: '#authority-holder-contact-postcode',
    'address-manual': '#authority-holder-contact-address-manual',
    'address-lookup': '#authority-holder-contact-address-lookup',
    'authority-holder-contact-building': '#authority-holder-contact-building',
    'authority-holder-contact-street': '#authority-holder-contact-street',
    'authority-holder-contact-townOrCity': '#authority-holder-contact-townOrCity',
    'authority-holder-contact-postcodeOrZIPCode': '#authority-holder-contact-postcodeOrZIPCode'
  },

  sessionData: {
    archer: 'Sterling Archer',
    barry: 'Barry Dylan',
    first: 'first',
    second: 'second'
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
