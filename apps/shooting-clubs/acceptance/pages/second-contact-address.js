'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'second-contact-address',
  'address-url': 'second-contact-address-manual',
  'address-lookup-url': 'second-contact-address-select',

  fields: {
    postcode: '#second-contact-postcode',
    'address-manual': '#second-contact-address',
    'address-lookup': '#second-contact-address',
    'second-contact-building': '#second-contact-building',
    'second-contact-street': '#second-contact-street',
    'second-contact-townOrCity': '#second-contact-townOrCity',
    'second-contact-postcodeOrZIPCode': '#second-contact-postcodeOrZIPCode'
  },

  links: {
    'manual-entry': '#manual-entry',
    'cant-find-address': '#cant-find'
  },

  content: {
    postcode: 'CR0 2EU',
    address: '49 Sydenham Road, Croydon, CR0 2EU',
    'second-contact-building': 'Test Building',
    'second-contact-street': '49 Sydenham Road',
    'second-contact-townOrCity': 'Croydon',
    'second-contact-postcodeOrZIPCode': 'CR0 2EU'
  },

  fillFormAndSubmit(field) {
    I.fillField(field, this.content.postcode);
    I.submitForm();
  },

  fillAllAddressFieldsAndSubmit() {
    I.fillField(this.fields['second-contact-building'], this.content['second-contact-building']);
    I.fillField(this.fields['second-contact-street'], this.content['second-contact-street']);
    I.fillField(this.fields['second-contact-townOrCity'], this.content['second-contact-townOrCity']);
    I.fillField(this.fields['second-contact-postcodeOrZIPCode'], this.content['second-contact-postcodeOrZIPCode']);
    I.submitForm();
  }
};
