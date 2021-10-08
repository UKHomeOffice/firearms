'use strict';

let steps = require('../../').steps;

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'contact-address',
  'address-url': 'contact-address',
  'address-lookup-url': 'contact-address-lookup',

  next: steps['/contact-address'].next,

  fields: {
    postcode: '#contact-postcode',
    'address-manual': '#contact-address-manual',
    'address-lookup': '#contact-address-lookup',
    'contact-building': '#contact-building',
    'contact-street': '#contact-street',
    'contact-townOrCity': '#contact-townOrCity',
    'contact-postcodeOrZIPCode': '#contact-postcodeOrZIPCode'

  },

  links: {
    'manual-entry': '#manual-entry',
    'cant-find-address': '#cant-find'
  },

  content: {
    header: 'What is Sterling Archer\'s address?',
    postcode: 'CR0 2EU',
    address: '49 Sydenham Road, Croydon, CR0 2EU',
    'contact-building': 'Test Building',
    'contact-street': '49 Sydenham Road',
    'contact-townOrCity': 'Croydon',
    'contact-postcodeOrZIPCode': 'CR0 2EU'
  },

  fillFormAndSubmit(field) {
    I.fillField(field, this.content.postcode);
    I.submitForm();
  },

  fillAllAddressFieldsAndSubmit() {
    I.fillField(this.fields['contact-building'], this.content['contact-building']);
    I.fillField(this.fields['contact-street'], this.content['contact-street']);
    I.fillField(this.fields['contact-townOrCity'], this.content['contact-townOrCity']);
    I.fillField(this.fields['contact-postcodeOrZIPCode'], this.content['contact-postcodeOrZIPCode']);
    I.submitForm();
  },

  selectAddressAndSubmit() {
    this.fillAllAddressFieldsAndSubmit();
    I.submitForm();
  }
};
