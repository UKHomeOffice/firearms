'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'first-authority-holders-address',
  'address-url': 'first-authority-holders-address',
  'address-lookup-url': 'first-authority-holders-address-lookup',

  fields: {
    'first-authority-holders-building': '#first-authority-holders-building',
    'first-authority-holders-street': '#first-authority-holders-street',
    'first-authority-holders-townOrCity': '#first-authority-holders-townOrCity',
    'first-authority-holders-postcodeOrZIPCode': '#first-authority-holders-postcodeOrZIPCode'
  },

  links: {
    'manual-entry': '#manual-entry',
    'cant-find-address': '#cant-find'
  },

  content: {
    header: 'What is Sterling Archer\'s main business address?',
    building: '49 Sydenham Road',
    town: 'Croydon',
    postcode: 'CR0 2EU',
    'first-authority-holders-building': 'Test Building',
    'first-authority-holders-street': '49 Sydenham Road',
    'first-authority-holders-townOrCity': 'Croydon',
    'first-authority-holders-postcodeOrZIPCode': 'CR0 2EU'
  },

  fillFormAndSubmit(field) {
    I.fillField(field, this.content.postcode);
    I.submitForm();
  },

  fillAllAddressFieldsAndSubmit() {
    I.fillField(this.fields['first-authority-holders-building'], this.content['first-authority-holders-building']);
    I.fillField(this.fields['first-authority-holders-street'], this.content['first-authority-holders-street']);
    I.fillField(this.fields['first-authority-holders-townOrCity'], this.content['first-authority-holders-townOrCity']);
    I.fillField(this.fields['first-authority-holders-postcodeOrZIPCode'], this.content['first-authority-holders-postcodeOrZIPCode']);
    I.submitForm();
  }
};
