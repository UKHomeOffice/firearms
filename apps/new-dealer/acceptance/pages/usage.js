'use strict';

const TRANSLATIONS = require('../../translations/en/default');
const FIELDS = TRANSLATIONS.fields;
const PAGES = TRANSLATIONS.pages;

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'usage',
  'usage-group': '#usage-group',
  sell: '#usage-sell',
  transport: '#usage-transport',
  transfer: '#usage-transfer',
  'arm-guards': '#usage-arm-guards',
  training: '#usage-training',
  research: '#usage-research',
  other: '#usage-other',

  'further-details': {
    sell: '#sell-details',
    transport: '#transport-details',
    transfer: '#transfer-details',
    training: '#training-details',
    research: '#research-details',
    other: '#other-details'
  },

  getHeaderTranslations(handleType) {
    return PAGES.usage.header['weapons-ammunition'][handleType];
  },

  getSellDetailsTranslations(handleType) {
    return FIELDS['sell-details'].label['weapons-ammunition'][handleType];
  },

  getTransportDetailsTranslations(handleType) {
    return FIELDS['transport-details'].label['weapons-ammunition'][handleType];
  },

  getTransferDetailsTranslations(handleType) {
    return FIELDS['transfer-details'].label['weapons-ammunition'][handleType];
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
    I.click(this.sell);
    I.click(this.transport);
    I.click(this.transfer);
    I.seeEach([
      this.getHeaderTranslations(handleType),
      this.getSellDetailsTranslations(handleType),
      this.getTransportDetailsTranslations(handleType),
      this.getTransferDetailsTranslations(handleType)
    ]);
  },

  fillFormAndSubmit() {
    I.click(this['arm-guards']);
    I.submitForm();
  }
};
