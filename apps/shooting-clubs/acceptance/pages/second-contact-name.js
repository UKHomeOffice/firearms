'use strict';

let I;
module.exports = {
  _init(){
    I = require('so-acceptance/steps.js')()
  },

  url: 'second-contact-name',
  'second-contact-name-id': '#second-contact-name',

  fillFormAndSubmit(){
    I.fillField(this['second-contact-name-id'], 'David Hasselhoff');
    I.submitForm();
  }
};
