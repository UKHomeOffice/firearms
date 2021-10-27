'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'storage-address',
  'address-url': 'storage-address',
  'address-lookup-url': 'storage-address-lookup',
  'another-address-url': 'storage-add-another-address',
  'important-icon': {css: '.icon-important'},

  fields: {
    postcode: '#storage-postcode',
    'address-manual': '#storage-address-manual',
    'address-lookup': '#storage-address-lookup',
    add: '#storageAddresses-add-another-group',
    yes: '#storageAddresses-add-another-yes',
    no: '#storageAddresses-add-another-no',
    'storage-building' : '#storage-building',
    'storage-street': '#storage-street',
    'storage-townOrCity': '#storage-townOrCity',
    'storage-postcodeOrZIPCode': '#storage-postcodeOrZIPCode'
  },

  links: {
    'manual-entry': '#manual-entry',
    'cant-find-address': '#cant-find',
    delete: 'Delete'
  },

  content: {
    postcode: 'CR0 2EU',
    address: '49 Sydenham Road, Croydon, CR0 2EU',
    'another-address': 'Test Building, 2 Marsham Street, London, SE15LP',
    'display-address': 'Test Building, 49 Sydenham Road, Croydon, CR02EU',
    'storage-building': 'Test Building',
    'storage-street': '49 Sydenham Road',
    'another-storage-street': '2 Marsham Street',
    'storage-townOrCity': 'Croydon',
    'another-storage-townOrCity': 'London',
    'storage-postcodeOrZIPCode': 'CR0 2EU',
    'another-storage-postcodeOrZIPCode': 'SE1 5LP'
  },

  fillFormAndSubmit(field) {
    I.fillField(field, this.content.postcode);
    I.submitForm();
  },

  fillAllAddressFieldsAndSubmit() {
    I.fillField(this.fields['storage-building'], this.content['storage-building']);
    I.fillField(this.fields['storage-street'], this.content['storage-street']);
    I.fillField(this.fields['storage-townOrCity'], this.content['storage-townOrCity']);
    I.fillField(this.fields['storage-postcodeOrZIPCode'], this.content['storage-postcodeOrZIPCode']);
    I.submitForm();
  },

  addMultipleAddresses() {
    this.fillAllAddressFieldsAndSubmit();
    I.click(this.fields.yes);
    I.submitForm();
    I.fillField(this.fields['storage-building'], this.content['storage-building']);
    I.fillField(this.fields['storage-street'], this.content['another-storage-street']);
    I.fillField(this.fields['storage-townOrCity'], this.content['another-storage-townOrCity']);
    I.fillField(this.fields['storage-postcodeOrZIPCode'], this.content['another-storage-postcodeOrZIPCode']);
    I.submitForm();
  }
};
