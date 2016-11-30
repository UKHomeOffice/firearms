'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'company-name',
  'organisation-group': '#organisation-group',
  company: '#organisation-company',
  'company-name': '#company-name',
  'company-house-number': '#company-house-number',
  'sole-trader': '#organisation-sole-trader',
  'sole-trader-name': '#sole-trader-name',
  'shooting-club': '#organisation-shooting-club',
  'shooting-club-name': '#shooting-club-name',
  charity: '#organisation-charity',
  'charity-name': '#charity-name',
  'charity-number': '#charity-number',
  museum: '#organisation-museum',
  'museum-name': '#museum-name',
  other: '#organisation-other',
  'other-name': '#other-name',

  content: {
    name: 'Four-Five-Six Laundry',
    number: '123'
  },

  fillFormAndSubmit() {
    I.checkOption(this.company);
    I.fillField(this['company-name'], this.content.name);
    I.fillField(this['company-house-number'], this.content.number);
    I.submitForm();
  }
};
