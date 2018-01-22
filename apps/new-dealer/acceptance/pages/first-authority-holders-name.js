'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'first-authority-holders-name',
  'holders-name': '#first-authority-holders-name',
  content: {
    'holders-name': 'Sterling Archer'
  },

  fillFormAndSubmit(){
    I.fillField(this['holders-name'], this.content['holders-name']);
    I.submitForm();
  }
};
