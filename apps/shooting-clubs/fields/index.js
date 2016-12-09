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
      attribute: 'height',
      value: 6
    }]
  },
};
