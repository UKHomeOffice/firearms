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
  deactivation: '#usage-deactivation',
  other: '#usage-other',
  'other-details': '#other-details',

  fillFormAndSubmit() {
    I.click(this['arm-guards']);
    I.submitForm();
  }
};
