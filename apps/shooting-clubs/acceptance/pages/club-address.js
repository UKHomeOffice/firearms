'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'club-address',
  'address-url': 'club-address-manual',
  'address-lookup-url': 'club-address-select',

  fields: {
    postcode: '#club-postcode',
    'address-manual': '#club-address',
    'address-lookup': '#club-address',
    'club-building': '#club-building',
    'club-street': '#club-street',
    'club-townOrCity': '#club-townOrCity',
    'club-postcodeOrZIPCode': '#club-postcodeOrZIPCode'
  },

  links: {
    'manual-entry': '#manual-entry',
    'cant-find-address': '#cant-find'
  },

  content: {
    postcode: 'CR0 2EU',
    address: '49 Sydenham Road, Croydon, CR0 2EU',
    'club-building': 'Test Building',
    'club-street': '49 Sydenham Road',
    'club-townOrCity': 'Croydon',
    'club-postcodeOrZIPCode': 'CR0 2EU'
  },

  fillFormAndSubmit(field) {
    I.fillField(field, this.content.postcode);
    I.submitForm();
  },

  fillAllAddressFieldsAndSubmit() {
    I.fillField(this.fields['club-building'], this.content['club-building']);
    I.fillField(this.fields['club-street'], this.content['club-street']);
    I.fillField(this.fields['club-townOrCity'], this.content['club-townOrCity']);
    I.fillField(this.fields['club-postcodeOrZIPCode'], this.content['club-postcodeOrZIPCode']);
    I.submitForm();
  },
};
