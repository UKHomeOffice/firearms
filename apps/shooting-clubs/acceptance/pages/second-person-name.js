'use strict';

let I;
module.exports = {
  _init(){
    I = require('so-acceptance/steps.js')()
  },

  url: 'second-person-name',
  'second-person-name-id': '#second-person-name',

  fillFormAndSubmit(){
    I.fillField('#second-person-name', 'David Hasselhoff');
    I.submitForm();
  }
};
