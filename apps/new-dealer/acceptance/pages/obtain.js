'use strict';

const TRANSLATIONS = require('../../translations/en/default');
const FIELDS = TRANSLATIONS.fields;
const PAGES = TRANSLATIONS.pages;

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'obtain',
  'obtain-group': '#obtain-group',
  buy: '#obtain-buy',
  'temporary-possession': '#obtain-temporary-possession',
  manufacture: '#obtain-manufacture',
  'other-means': '#obtain-other-means',
  'wont-take-possession': '#obtain-wont-take-possession',

  'further-details': {
    buy: '#buy-details',
    'temporary-possession': '#temporary-details',
    'other-means': '#other-means-details',
    'wont-take-possession': '#wont-take-details'
  },

  getHeaderTranslations(handleType) {
    return PAGES.obtain.header['weapons-ammunition'][handleType];
  },

  getWontTakePossessionTranslations(handleType, isCompany) {
    return FIELDS.obtain.options['wont-take-possession'].label.company[isCompany]['weapons-ammunition'][handleType];
  },

  getBuyDetailsTranslations(handleType) {
    return FIELDS['buy-details'].label['weapons-ammunition'][handleType];
  },

  getBuyImportTranslations(handleType) {
    return FIELDS['buy-import'].label['weapons-ammunition'][handleType];
  },

  getOtherMeansTranslations(handleType) {
    return FIELDS['other-means-details'].label['weapons-ammunition'][handleType]
  },

  content: {
    buy: 'I bought some guns'
  },

  checkboxTogglesField(checkbox, field) {
    I.click(checkbox);
    I.seeElements(field);
  },

  toggledFieldShowsError(checkbox, field) {
    I.click(checkbox);
    I.submitForm();
    I.seeErrors(field);
  },

  pageShowsCorrectHandleType(handleType){
    I.click(this.buy);
    I.click(this['other-means']);
    I.seeEach([
      this.getHeaderTranslations(handleType),
      this.getWontTakePossessionTranslations(handleType, 'true'),
      this.getBuyDetailsTranslations(handleType),
      this.getBuyImportTranslations(handleType),
      this.getOtherMeansTranslations(handleType)
    ]);
  },

  pageShowsCompanyOrTrader(isCompany) {
    I.see(this.getWontTakePossessionTranslations('weapons', isCompany));
  },

  fillFormAndSubmit() {
    I.click(this.buy);
    I.fillField(this['further-details'].buy, this.content.buy);
    I.submitForm();
  }
};
