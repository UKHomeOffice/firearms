'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'contact-details',
  email: '#contact-email',
  phone: '#contact-phone',

  content: {
    'valid-email': 'test@test.com',
    'invalid-email': 'Invalid email',
    phone: '123456789',
    'first-contact': 'What are Sterling Archer\'s contact details',
    'second-contact': 'What are Barry Dylan\'s contact details',
    'other-contact': 'What are Lana Kane\'s contact details'
  },

  fillFormAndSubmit(email) {
    I.fillField(this.email, email);
    I.fillField(this.phone, this.content.phone);
    I.submitForm();
  }
};
