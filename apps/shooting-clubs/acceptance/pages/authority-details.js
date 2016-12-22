'use strict';

let I;

module.exports = {
  _init(){
    I = require('so-acceptance/steps')();
  },

  url: 'authority-details',
  field: {
    referenceNumber: '#reference-number',
    referenceNumberGroup: '#reference-number-group'
  },
  content: 'LotsOfLove <3',

  fillFormAndSubmit(){
    I.fillField(this.field.referenceNumber, this.content);
    I.submitForm();
  }
};
