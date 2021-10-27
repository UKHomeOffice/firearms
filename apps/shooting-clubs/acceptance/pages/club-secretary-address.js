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
    'address-lookup': '#club-secretary-address',
    'club-secretary-building': '#club-secretary-building',
    'club-secretary-street': '#club-secretary-street',
    'club-secretary-townOrCity': '#club-secretary-townOrCity',
    'club-secretary-postcodeOrZIPCode': '#club-secretary-postcodeOrZIPCode'
  },

  links: {
    'manual-entry': '#manual-entry',
    'cant-find-address': '#cant-find'
  },

  content: {
    postcode: 'CR0 2EU',
    address: '49 Sydenham Road, Croydon, CR0 2EU',
    'club-secretary-building': 'Test Building',
    'club-secretary-street': '49 Sydenham Road',
    'club-secretary-townOrCity': 'Croydon',
    'club-secretary-postcodeOrZIPCode': 'CR0 2EU'
  },

  fillFormAndSubmit(field) {
    I.fillField(field, this.content.postcode);
    I.submitForm();
  },

  fillAllAddressFieldsAndSubmit() {
    I.fillField(this.fields['club-secretary-building'], this.content['club-secretary-building']);
    I.fillField(this.fields['club-secretary-street'], this.content['club-secretary-street']);
    I.fillField(this.fields['club-secretary-townOrCity'], this.content['club-secretary-townOrCity']);
    I.fillField(this.fields['club-secretary-postcodeOrZIPCode'], this.content['club-secretary-postcodeOrZIPCode']);
    I.submitForm();
  },

  selectAddressAndSubmit() {
    this.fillFormAndSubmit(this.fields.postcode);
    I.selectOption(this.fields['address-lookup'], this.content.address);
    I.submitForm();
  }
};
