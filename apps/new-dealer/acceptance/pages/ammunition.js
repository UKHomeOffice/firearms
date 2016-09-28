'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'ammunition',
  'ammunition-group': '#ammunition-types-group',
  unspecified: '#ammunition-types-unspecified',
  'explosive-cartridges': '#ammunition-types-explosive-cartridges',
  'incendiary-missile': '#ammunition-types-incendiary-missile',
  'armour-piercing': '#ammunition-types-armour-piercing',
  'expanding-missile': '#ammunition-types-expanding-missile',
  'missiles-for-above': '#ammunition-types-missiles-for-above',

  'quantity-details': {
    unspecified: '#ammunition-unspecified-details',
    'explosive-cartridges': '#explosive-cartridges-quantity',
    'incendiary-missile': '#incendiary-missile-quantity',
    'armour-piercing': '#armour-piercing-quantity',
    'expanding-missile': '#expanding-missile-quantity',
    'missiles-for-above': '#missiles-for-above-quantity',
  },

  content: {
    text: 'abcdefgh',
    number: '1234'
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

  fieldShowsNonNumericError(checkbox, field) {
    I.click(checkbox);
    I.fillField(field, this.content.text);
    I.submitForm();
    I.seeErrors(field);
  },

  unspecifiedOptionShowsError() {
    I.click(this.unspecified);
    I.fillField(this['quantity-details'].unspecified, this.content.text);
    I.click(this['explosive-cartridges']);
    I.fillField(this['quantity-details']['explosive-cartridges'], this.content.number);
    I.submitForm();
    I.seeErrors(this['ammunition-group']);
  },

  fillFormAndSubmit(){
    I.click(this.unspecified);
    I.fillField(this['quantity-details'].unspecified, this.content.text);
    I.submitForm();
  }
};
