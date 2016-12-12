'use strict';

let I;
module.exports = {
  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'second-contact-email',

  fields: {
    'second-contact-email-id': '#second-contact-email',
    'second-contact-phone-id': '#second-contact-phone'
  },

  content: {
    'valid-email': 'pokemon@gogo.com',
    'invalid-email': 'pikachu!',
    phone: '0207-343-8323'
  },

  fillFormAndSubmit(email) {
    I.fillField(this.fields['second-contact-email-id'], this.content[email]);
    I.fillField(this.fields['second-contact-phone-id'], this.content.phone);
    I.submitForm();
  }
};
