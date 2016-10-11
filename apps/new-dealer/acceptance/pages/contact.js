'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'contact',
  'contact-group': '#contact-holder-group',
  'contact-first': '#contact-holder-first',
  'contact-second': '#contact-holder-second',
  'contact-other': '#contact-holder-other',
  'other-name': '#someone-else-name',
  'other-name-group': '#someone-else-name-group',

  content: {
    'first-contact-name': 'Sterling Archer',
    'second-contact-name': 'Barry Dylan',
    'someone-else-name': 'Dave Gorman'
  },

  fillFormAndSubmit() {
    I.checkOption(this['contact-first']);
    I.submitForm();
  }
};
