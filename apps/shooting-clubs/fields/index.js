'use strict';

module.exports = {
  'club-name': {
    mixin: 'input-text',
    validate: 'required'
  },
  'second-contact-name': {
    mixin: 'input-text',
    validate: 'required'
  },
  'club-secretary-name': {
    mixin: 'input-text',
    validate: 'required'
  },
  'club-postcode': {
    mixin: 'input-text-code',
    validate: ['required', 'postcode'],
    formatter: 'uppercase',
    includeInSummary: false
  },
  'club-address-lookup': {
    className: 'address',
    includeInSummary: false
  },
  'club-address-manual': {
    mixin: 'textarea',
    validate: 'required',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    attributes: [{
      attribute: 'rows',
      value: 5
    }, {
      attribute: 'cols',
      value: 10
    }]
  },
  'club-secretary-postcode': {
    mixin: 'input-text-code',
    validate: ['required', 'postcode'],
    formatter: 'uppercase',
    includeInSummary: false
  },
  'club-secretary-address-lookup': {
    className: 'address',
    includeInSummary: false
  },
  'club-secretary-address-manual': {
    mixin: 'textarea',
    validate: 'required',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    attributes: [{
      attribute: 'rows',
      value: 5
    }, {
      attribute: 'cols',
      value: 10
    }]
  },
  'club-secretary-email': {
    mixin: 'input-text',
    validate: ['required', 'email']
  },
  'club-secretary-phone': {
    mixin: 'input-text',
    validate: 'required'
  },
  'second-contact-postcode': {
    mixin: 'input-text-code',
    validate: ['required', 'postcode'],
    formatter: 'uppercase',
    includeInSummary: false
  },
  'second-contact-address-lookup': {
    className: 'address',
    includeInSummary: false
  },
  'second-contact-address-manual': {
    mixin: 'textarea',
    validate: 'required',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    attributes: [{
      attribute: 'rows',
      value: 5
    }, {
      attribute: 'cols',
      value: 10
    }]
  }
};
