'use strict';

let I;
module.exports = {
  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'club-secretary-email',

  fields: {
    'club-secretary-email-id': '#club-secretary-email',
    'club-secretary-phone-id': '#club-secretary-phone'
  },

  content: {
    'valid-email': 'smellydog@poodle.com',
    'invalid-email': 'who let the dogs out?',
    phone: '0207-343-8323'
  },

  fillFormAndSubmit(email) {
    I.fillField(this.fields['club-secretary-email-id'], this.content[email]);
    I.fillField(this.fields['club-secretary-phone-id'], this.content.phone);
    I.submitForm();
  }
};
