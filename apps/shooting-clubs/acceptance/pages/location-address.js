'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'location-address',
  postcode: {
    field: {
      postcode:'#location-address',
      postcodeGroup: '#location-postcode-group'
    },
    manualEntryLink: '#manual-entry',
    content: {
      invalid: 'kowabunga',
      valid: 'CR0 2EU',
      notFound: 'AA1 1AA'
    }
  },

  fields: {
    'location-building': '#location-building',
    'location-street': '#location-street',
    'location-townOrCity': '#location-townOrCity',
    'location-postcodeOrZIPCode': '#location-postcodeOrZIPCode'
  },

  content: {
    postcode: 'CR0 2EU',
    address: '49 Sydenham Road, Croydon, CR0 2EU',
    'another-address': 'Test Building, 2 Marsham Street, London, CR02EU',
    'display-address': 'Test Building, 49 Sydenham Road, Croydon, CR02EU',
    'location-building': 'Test Building',
    'location-street': '49 Sydenham Road',
    'another-location-street': '7 Ramsey Street',
    'location-townOrCity': 'Croydon',
    'another-location-townOrCity': 'London',
    'location-postcodeOrZIPCode': 'CR0 2EU',
    'another-location-postcodeOrZIPCode': 'SE1 5LP'
  },

  manualEntry: {
    url: 'location-address-manual',
    field: {
      addressManual: '#location-address',
      addressManualGroup: '#location-address-group'
    },
    content: {
      address: 'Test Building, 7 Ramsey Street, London, SE15LP'
    }
  },

  addressLookUp: {
    url: 'location-address-select',
    cantFindLink: '#cant-find',
    field: {
      addressLookUp: '#location-address',
      addressLookUpGroup: '#location-address-group'
    },
    content: {
      address: 'Test Building, 49 Sydenham Road, Croydon, CR02EU'
    }
  },

  addAnotherAddress: {
    url: 'location-add-another-address',
    field: {
      yes: '#location-addresses-add-another-yes',
      no: '#location-addresses-add-another-no',
      group: '#location-addresses-add-another-group',
      summary: '.address-summary',
      delete: 'Delete',
      editLocationLink: 'a[href$="/shooting-clubs/location-postcode/edit/0"]',
      editCategoriesLink: 'a[href$="/shooting-clubs/location-address-category/edit/0"]'
    },
    content: {
      address: 'Test Building, 49 Sydenham Road, Croydon, CR02EU'
    }
  },

  category: {
    url: 'location-address-category',
    field: {
      locationAddressCategory: '#location-address-category-group',
      fullBoreRifles: '#location-address-category-full-bore-rifles',
      smallBoreRifles: '#location-address-category-small-bore-rifles',
      muzzleLoadingPistols: '#location-address-category-muzzle-loading-pistols'
    },
    content: {
      fullBoreRifles: 'Full-bore rifles',
      smallBoreRifles: 'Small-bore rifles',
      muzzleLoadingPistols: 'Muzzle-loading pistols'
    }
  },

  fillFormAndSubmit(field) {
    I.fillField(field, this.content.postcode);
    I.submitForm();
  },

  fillAllAddressFieldsAndSubmit() {
    I.fillField(this.fields['location-building'], this.content['location-building']);
    I.fillField(this.fields['location-street'], this.content['location-street']);
    I.fillField(this.fields['location-townOrCity'], this.content['location-townOrCity']);
    I.fillField(this.fields['location-postcodeOrZIPCode'], this.content['location-postcodeOrZIPCode']);
    I.submitForm();
  },

  selectAddressCategoryAndSubmit() {
    this.fillAllAddressFieldsAndSubmit();
    I.click(this.category.field.fullBoreRifles);
    I.submitForm();
  },

  addMultipleAddresses() {
    this.selectAddressCategoryAndSubmit();
    I.click(this.addAnotherAddress.field.yes);
    I.submitForm();
    I.fillField(this.fields['location-building'], this.content['location-building']);
    I.fillField(this.fields['location-street'], this.content['another-location-street']);
    I.fillField(this.fields['location-townOrCity'], this.content['another-location-townOrCity']);
    I.fillField(this.fields['location-postcodeOrZIPCode'], this.content['another-location-postcodeOrZIPCode']);
    I.submitForm();
    I.click(this.category.field.smallBoreRifles);
    I.submitForm();
  }
};
