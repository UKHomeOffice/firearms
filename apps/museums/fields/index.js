'use strict';

module.exports = {
  name: {
    mixin: 'input-text',
    validate: ['required', {'type': 'maxlength', 'arguments': [200]}]
  },
  'contact-name': {
    mixin: 'input-text',
    validate: ['required', {'type': 'maxlength', 'arguments': [200]}]
  },
  'contact-email': {
    mixin: 'input-text',
    validate: ['required', 'email', { type: 'maxlength', arguments: 320 }]
  },
  'contact-phone': {
    mixin: 'input-text',
    validate: ['required', 'internationalPhoneNumber', {'type': 'maxlength', 'arguments': [200]}]
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
    validate: ['required', {'type': 'maxlength', 'arguments': [200]}],
    dependent: {
      field: 'purchase-order',
      value: 'Yes'
    }
  },
  'invoice-contact-name': {
    mixin: 'input-text',
    validate: ['required', {'type': 'maxlength', 'arguments': [200]}]
  },
  'invoice-contact-email': {
    mixin: 'input-text',
    validate: ['required', 'email', { type: 'maxlength', arguments: 320 }]
  },
  'invoice-contact-phone': {
    mixin: 'input-text',
    validate: ['required', 'internationalPhoneNumber', {'type': 'maxlength', 'arguments': [200]}]
  },
  'exhibit-building': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 200 }]
  },
  'exhibit-street': {
    validate: ['notUrl', { type: 'maxlength', arguments: 200 }],
    labelClassName: 'visuallyhidden'
  },
  'exhibit-townOrCity': {
    validate: ['required', 'notUrl',
      { type: 'regex', arguments: /^([^0-9]*)$/ },
      { type: 'maxlength', arguments: 200 }
    ]
  },
  'exhibit-postcodeOrZIPCode': {
    validate: ['required', {'type': 'maxlength', 'arguments': [200]}],
    formatter: ['removespaces', 'uppercase']
  },
  'contact-building': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 200 }]
  },
  'contact-street': {
    validate: ['notUrl', { type: 'maxlength', arguments: 200 }],
    labelClassName: 'visuallyhidden'
  },
  'contact-townOrCity': {
    validate: ['required', 'notUrl',
      { type: 'regex', arguments: /^([^0-9]*)$/ },
      { type: 'maxlength', arguments: 200 }
    ]
  },
  'contact-postcodeOrZIPCode': {
    validate: ['required', {'type': 'maxlength', 'arguments': [200]}],
    formatter: ['removespaces', 'uppercase']
  },
  'invoice-building': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 200 }]
  },
  'invoice-street': {
    validate: ['notUrl', { type: 'maxlength', arguments: 200 }],
    labelClassName: 'visuallyhidden'
  },
  'invoice-townOrCity': {
    validate: ['required', 'notUrl',
      { type: 'regex', arguments: /^([^0-9]*)$/ },
      { type: 'maxlength', arguments: 200 }
    ]
  },
  'invoice-postcodeOrZIPCode': {
    validate: ['required', {'type': 'maxlength', 'arguments': [200]}],
    formatter: ['removespaces', 'uppercase']
  }
};
