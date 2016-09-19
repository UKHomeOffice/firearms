'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'company-name',
  'company-group': '#company-group',
  company: '#company-true',
  'company-name': '#company-name',
  'company-house-number': '#company-house-number',
  'sole-trader': '#company-false',
  'sole-trader-name': '#sole-trader-name',

  content: {
    name: 'Home Office',
    number: '123'
  },

  fillFormAndSubmit() {
    I.checkOption(this.company);
    I.fillField(this['company-name'], this.content.name);
    I.fillField(this['company-house-number'], this.content.number);
    I.submitForm();
  }
};
