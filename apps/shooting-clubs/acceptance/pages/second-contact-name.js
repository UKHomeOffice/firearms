'use strict';

let I;
module.exports = {
  _init(){
    I = require('so-acceptance/steps.js')()
  },

  url: 'second-contact-name',
  'second-contact-name-id': '#second-contact-name',

  fillFormAndSubmit(){
    I.fillField('#second-contact-name', 'David Hasselhoff');
    I.submitForm();
  }
};
