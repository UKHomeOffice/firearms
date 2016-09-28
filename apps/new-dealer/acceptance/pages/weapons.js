'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'weapons',
  'weapons-group': '#weapon-types-group',
  unspecified: '#weapon-types-unspecified',
  'fully-automatic': '#weapon-types-fully-automatic',
  'self-loading': '#weapon-types-self-loading',
  'short-pistols': '#weapon-types-short-pistols',
  'short-self-loading': '#weapon-types-short-self-loading',
  'large-revolvers': '#weapon-types-large-revolvers',
  'rocket-launchers': '#weapon-types-rocket-launchers',
  'air-rifles': '#weapon-types-air-rifles',
  'fire-noxious-substance': '#weapon-types-fire-noxious-substance',
  'disguised-firearms': '#weapon-types-disguised-firearms',
  'military-rockets': '#weapon-types-military-use-rockets',
  'projecting-launchers': '#weapon-types-projecting-launchers',

  'quantity-details': {
    unspecified: '#weapons-unspecified-details',
    'fully-automatic': '#fully-automatic-quantity',
    'self-loading': '#self-loading-quantity',
    'short-pistols': '#short-pistols-quantity',
    'short-self-loading': '#short-self-loading-quantity',
    'large-revolvers': '#large-revolvers-quantity',
    'rocket-launchers': '#rocket-launchers-quantity',
    'air-rifles': '#air-rifles-quantity',
    'fire-noxious-substance': '#fire-noxious-substance-quantity',
    'disguised-firearms': '#disguised-firearms-quantity',
    'military-rockets': '#military-use-quantity',
    'projecting-launchers': '#projecting-launchers-quantity',
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
    I.click(this['fully-automatic']);
    I.fillField(this['quantity-details']['fully-automatic'], this.content.number);
    I.submitForm();
    I.seeErrors(this['weapons-group']);
  },

  fillFormAndSubmit(){
    I.click(this.unspecified);
    I.fillField(this['quantity-details'].unspecified, this.content.text);
    I.submitForm();
  }
};
