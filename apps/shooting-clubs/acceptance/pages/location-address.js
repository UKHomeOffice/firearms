'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'location-postcode',
  postcode: {
    field: {
      postcode:'#location-postcode',
      postcodeGroup: '#location-postcode-group'
    },
    manualEntryLink: '#manual-entry',
    content: {
      invalid: 'kowabunga',
      valid: 'CR0 2EU',
      notFound: 'AA1 1AA'
    }
  },

  manualEntry: {
    url: 'location-address',
    field: {
      addressManual: '#location-address-manual',
      addressManualGroup: '#location-address-manual-group'
    },
    content: {
      address: '7 Ramsey Street, London, SE1 5lp'
    }
  },

  addressLookUp: {
    url: 'location-address-lookup/',
    cantFindLink: '#cant-find',
    field: {
      addressLookUp: '#location-address-lookup',
      addressLookUpGroup: '#location-address-lookup-group'
    },
    content: {
      address: '49 Sydenham Road, Croydon, CR0 2EU'
    }
  },

  addAnotherAddress: {
    url: 'location-add-another-address',
    field: {
      yes: '#location-add-another-address-yes',
      no: '#location-add-another-address-no',
      summary: '.address-summary',
      delete: 'Remove',
      editLocationLink: 'a[href$="/shooting-clubs/location-postcode/edit/0"]',
      editCategoriesLink: 'a[href$="/shooting-clubs/location-address-category/edit/0"]'
    },
    content: {
      address: '49 Sydenham Road'
    }
  },

  category: {
    url: 'location-address-category',
    field: {
      locationAddressCategory: '#location-address-category',
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

  fillFormAndSubmit(field, content) {
    I.fillField(field, content);
    I.submitForm();
  },

  selectAddressAndSubmit() {
    this.fillFormAndSubmit(this.postcode.field.postcode, this.postcode.content.valid);
    I.selectOption(this.addressLookUp.field.addressLookUp, this.addressLookUp.content.address);
    I.submitForm();
  },

  selectAddressCategoryAndSubmit() {
    this.selectAddressAndSubmit();
    I.click(this.category.field.fullBoreRifles);
    I.submitForm();
  },

  addMultipleAddresses() {
    this.selectAddressCategoryAndSubmit();
    I.click(this.addAnotherAddress.field.yes);
    I.submitForm();
    I.click(this.postcode.manualEntryLink);
    this.fillFormAndSubmit(this.manualEntry.field.addressManual, this.manualEntry.content.address);
    // this is to untick the fullbore Rifles as it was ticked the first time
    I.click(this.category.field.fullBoreRifles);
    I.click(this.category.field.smallBoreRifles);
    I.submitForm();
  }
};
