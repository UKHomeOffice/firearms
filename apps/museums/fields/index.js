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
    validate: 'required'
  },
  'same-contact-address': {
    mixin: 'radio-group',
    includeInSummary: false,
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
  },
  'purchase-order': {
    mixin: 'radio-group',
    includeInSummary: false,
    validate: 'required',
    className: 'form-group',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'Yes',
      toggle: 'purchase-order-number',
      child: 'input-text'
    }, {
      value: 'No'
    }]
  },
  'purchase-order-number': {
    validate: 'required',
    dependent: {
      field: 'purchase-order',
      value: 'Yes'
    }
  },
  'invoice-contact-name': {
    mixin: 'input-text',
    validate: 'required'
  },
  'invoice-contact-email': {
    mixin: 'input-text',
    validate: ['required', 'email']
  },
  'invoice-contact-phone': {
    mixin: 'input-text',
    validate: 'required'
  }
};
