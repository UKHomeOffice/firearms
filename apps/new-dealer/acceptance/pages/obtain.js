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

  header: {
    weapons: PAGES.obtain.header['weapons-ammunition'].weapons,
    ammunition: PAGES.obtain.header['weapons-ammunition'].ammunition,
    'weapons-ammunition': PAGES.obtain.header['weapons-ammunition']['weapons,ammunition']
  },

  labels: {
    obtain: {
      company: {
        weapons: FIELDS.obtain.options['wont-take-possession'].company.true['weapons-ammunition'].weapons,
        ammunition: FIELDS.obtain.options['wont-take-possession'].company.true['weapons-ammunition'].ammunition,
        'weapons-ammunition': FIELDS.obtain.options['wont-take-possession'].company.true['weapons-ammunition']['weapons,ammunition']
      },
      'sole-trader': {
        weapons: FIELDS.obtain.options['wont-take-possession'].company.false['weapons-ammunition'].weapons,
        ammunition: FIELDS.obtain.options['wont-take-possession'].company.false['weapons-ammunition'].ammunition,
        'weapons-ammunition': FIELDS.obtain.options['wont-take-possession'].company.false['weapons-ammunition']['weapons,ammunition']
      }
    },
    'buy-details': {
      weapons: FIELDS['buy-details'].label['weapons-ammunition'].weapons,
      ammunition: FIELDS['buy-details'].label['weapons-ammunition'].ammunition,
      'weapons-ammunition': FIELDS['buy-details'].label['weapons-ammunition']['weapons,ammunition']
    },
    'buy-import': {
      weapons: FIELDS['buy-import'].label['weapons-ammunition'].weapons,
      ammunition: FIELDS['buy-import'].label['weapons-ammunition'].ammunition,
      'weapons-ammunition': FIELDS['buy-import'].label['weapons-ammunition']['weapons,ammunition']
    },
    'other-means-details': {
      weapons: FIELDS['other-means-details'].label['weapons-ammunition'].weapons,
      ammunition: FIELDS['other-means-details'].label['weapons-ammunition'].ammunition,
      'weapons-ammunition': FIELDS['other-means-details'].label['weapons-ammunition']['weapons,ammunition']
    }
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
    I.see(this.header[handleType]);
    I.see(this.labels.obtain.company[handleType]);
    I.click(this.buy);
    I.see(this.labels['buy-details'][handleType]);
    I.see(this.labels['buy-import'][handleType]);
    I.click(this['other-means']);
    I.see(this.labels['other-means-details'][handleType]);
  },

  pageShowsCompanyOrTrader(companyOrTrader) {
    I.see(this.labels.obtain[companyOrTrader].weapons);
  },

  fillFormAndSubmit() {
    I.click(this.buy);
    I.fillField(this['further-details'].buy, this.content.buy);
    I.submitForm();
  }
};
