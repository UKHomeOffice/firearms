'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'second-authority-holders-name',
  'holders-name': '#second-authority-holders-name',
  content: {
    'holders-name': 'Barry Dylan'
  },

  fillFormAndSubmit(){
    I.fillField(this['holders-name'], this.content['holders-name']);
    I.submitForm();
  }
};
