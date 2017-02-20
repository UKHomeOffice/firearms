'use strict';

module.exports = {
  name: {
    mixin: 'input-text',
    validate: 'required'
  },
  'contact-name': {
    mixin: 'input-text',
    validate: 'required'
  },
  'contact-email': {
    mixin: 'input-text',
    validate: ['required', 'email']
  },
  'contact-phone': {
    mixin: 'input-text',
    validate: ['required', 'phonenumber']
  },
  'same-contact-address': {
    mixin: 'radio-group',
    legend: {
      className: 'visuallyhidden'
    },
    options: ['yes', 'no'],
    validate: 'required'
  },
  'contact-address': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    }
  }
};
