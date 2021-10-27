'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'second-authority-holders-address',
  'address-url': 'second-authority-holders-address',
  'address-lookup-url': 'second-authority-holders-address-lookup',

  fields: {
    postcode: '#second-authority-holders-postcode',
    'address-manual': '#second-authority-holders-address-manual',
    'address-lookup': '#second-authority-holders-address-lookup',
    'second-authority-holders-building': '#second-authority-holders-building',
    'second-authority-holders-street': '#second-authority-holders-street',
    'second-authority-holders-townOrCity': '#second-authority-holders-townOrCity',
    'second-authority-holders-postcodeOrZIPCode': '#second-authority-holders-postcodeOrZIPCode'
  },

  links: {
    'manual-entry': '#manual-entry',
    'cant-find-address': '#cant-find'
  },

  content: {
    header: 'What is Barry Dylan\'s main business address?',
    postcode: 'CR0 2EU',
    address: '49 Sydenham Road, Croydon, CR0 2EU',
    'second-authority-holders-building': 'Test Building',
    'second-authority-holders-street': '49 Sydenham Road',
    'second-authority-holders-townOrCity': 'Croydon',
    'second-authority-holders-postcodeOrZIPCode': 'CR0 2EU'
  },

  fillFormAndSubmit(field) {
    I.fillField(field, this.content.postcode);
    I.submitForm();
  },

  fillAllAddressFieldsAndSubmit() {
    I.fillField(this.fields['second-authority-holders-building'], this.content['second-authority-holders-building']);
    I.fillField(this.fields['second-authority-holders-street'], this.content['second-authority-holders-street']);
    I.fillField(this.fields['second-authority-holders-townOrCity'], this.content['second-authority-holders-townOrCity']);
    I.fillField(this.fields['second-authority-holders-postcodeOrZIPCode'], this.content['second-authority-holders-postcodeOrZIPCode']);
    I.submitForm();
  },

  selectAddressAndSubmit() {
    this.fillFormAndSubmit(this.fields.postcode);
    I.selectOption(this.fields['address-lookup'], this.content.address);
    I.submitForm();
  }
};
