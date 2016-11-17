'use strict';

let I;

module.exports =  {

  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'first-authority-holders-nationality',
  'first-nationality-group': '#first-authority-holders-nationality-group',
  'first-nationality': '#first-authority-holders-nationality',
  'multi-nationality': '#first-authority-holders-nationality-multi',
  'second-nationality': '#first-authority-holders-nationality-second',
  'third-nationality': '#first-authority-holders-nationality-third',

  content: {
    header: 'What is Sterling Archer\'s country of nationality?',
    'nationality-one': 'United Kingdom',
    'nationality-two': 'Spain'
  },

  sameValueInFields(fieldOne, fieldTwo) {
    I.click(this['multi-nationality']);
    I.fillField(fieldOne, this.content['nationality-one']);
    I.fillField(fieldTwo, this.content['nationality-one']);
    I.submitForm();
    I.seeErrors(fieldTwo);
  },

  fillFormAndSubmit() {
    I.fillField(this['first-nationality'], this.content['nationality-one']);
    I.submitForm();
  }
};
