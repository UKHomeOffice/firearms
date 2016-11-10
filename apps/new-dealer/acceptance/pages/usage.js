'use strict';

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

  checkboxTogglesField(checkbox, field) {
    I.click(checkbox);
    I.seeElements(field);
  },

  toggledFieldShowsError(checkbox, field) {
    I.click(checkbox);
    I.submitForm();
    I.seeErrors(field);
  },

  fillFormAndSubmit() {
    I.click(this['arm-guards']);
    I.submitForm();
  }
};
