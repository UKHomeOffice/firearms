'use strict';

let I;

module.exports = {
  _init(){
    I = require('so-acceptance/steps.js')();
  },

  url: 'club-secretary-name',
  'club-secretary-name-id': '#club-secretary-name',

  fillFormAndSubmit(){
    I.fillField(this['club-secretary-name-id'], 'BA baracus');
    I.submitForm();
  }
};
