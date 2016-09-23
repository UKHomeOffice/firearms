'use strict';

const TRANSLATIONS = require('../../translations/en/default');
const FIELDS = TRANSLATIONS.fields;
const PAGES = TRANSLATIONS.pages;

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'storage',
  'storage-group': '#stored-on-premises-group',
  yes: '#stored-on-premises-true',
  no: '#stored-on-premises-false',
  'no-details': '#no-storage-details',

  getHeaderTranslations(handleType, isCompany) {
    return PAGES.storage.header.company[isCompany]['weapons-ammunition'][handleType];
  },

  getNoStorageDetailsTranslations(handleType) {
    return FIELDS['no-storage-details'].label['weapons-ammunition'][handleType];
  },

  pageShowsCorrectHandleType(handleType) {
    I.click(this.no);
    I.seeEach([
      this.getHeaderTranslations(handleType, true),
      this.getNoStorageDetailsTranslations(handleType)
    ]);
  },

  pageShowsCompanyOrTrader(isCompany){
    I.see(this.getHeaderTranslations('weapons', isCompany));
  }
};
