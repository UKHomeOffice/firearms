'use strict';

module.exports = {
  'new-club': {
    mixin: 'radio-group',
    includeInSummary: false,
    legend: {
      className: 'visuallyhidden'
    },
    validate: 'required',
    options: [
      'yes',
      'no'
    ]
  },
  'club-name': {
    mixin: 'input-text',
    validate: 'required'
  },
  'second-contact-name': {
    mixin: 'input-text',
    validate: 'required'
  },
  'second-contact-email': {
    mixin: 'input-text',
    validate: ['required', 'email']
  },
  'second-contact-phone': {
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
    validate: 'required',
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
    validate: 'required',
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
    validate: 'required',
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
    }]
  },
  'location-postcode': {
    mixin: 'input-text-code',
    validate: ['required', 'postcode'],
    formatter: 'uppercase',
    includeInSummary: false
  },
  'location-address-manual': {
    mixin: 'textarea',
    validate: 'required',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    attributes: [{
      attribute: 'rows',
      value: 5
    }]
  },
  'location-address-lookup': {
    validate: 'required',
    className: 'address'
  },
  'location-add-another-address': {
    mixin: 'radio-group',
    legend: {
      className: 'visuallyhidden'
    },
    validate: 'required',
    options: [
      'yes',
      'no'
    ]
  },
  'location-address-category': {
    mixin: 'checkbox-group',
    validate: 'required',
    options: [
      'full-bore-rifles',
      'small-bore-rifles',
      'muzzle-loading-pistols'
    ]
  },
  'storage-address-range': {
    mixin: 'checkbox-group',
    options: []
  },
  'storage-address-secretary': {
    mixin: 'checkbox-group',
    options: []
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
  },
  'invoice-building': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 100 }]
  },
  'invoice-street': {
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }],
    labelClassName: 'visuallyhidden'
  },
  'invoice-townOrCity': {
    validate: ['required', 'notUrl',
      { type: 'regex', arguments: /^([^0-9]*)$/ },
      { type: 'maxlength', arguments: 100 }
    ]
  },
  'invoice-postcodeOrZIPCode': {
    validate: ['required'],
    formatter: ['removespaces', 'uppercase']
  },
  'club-building': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 100 }]
  },
  'club-street': {
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }],
    labelClassName: 'visuallyhidden'
  },
  'club-townOrCity': {
    validate: ['required', 'notUrl',
      { type: 'regex', arguments: /^([^0-9]*)$/ },
      { type: 'maxlength', arguments: 100 }
    ]
  },
  'club-postcodeOrZIPCode': {
    validate: ['required'],
    formatter: ['removespaces', 'uppercase']
  },
  'club-secretary-building': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 100 }]
  },
  'club-secretary-street': {
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }],
    labelClassName: 'visuallyhidden'
  },
  'club-secretary-townOrCity': {
    validate: ['required', 'notUrl',
      { type: 'regex', arguments: /^([^0-9]*)$/ },
      { type: 'maxlength', arguments: 100 }
    ]
  },
  'club-secretary-postcodeOrZIPCode': {
    validate: ['required'],
    formatter: ['removespaces', 'uppercase']
  },
  'second-contact-building': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 100 }]
  },
  'second-contact-street': {
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }],
    labelClassName: 'visuallyhidden'
  },
  'second-contact-townOrCity': {
    validate: ['required', 'notUrl',
      { type: 'regex', arguments: /^([^0-9]*)$/ },
      { type: 'maxlength', arguments: 100 }
    ]
  },
  'second-contact-postcodeOrZIPCode': {
    validate: ['required'],
    formatter: ['removespaces', 'uppercase']
  },
  'location-building': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 100 }]
  },
  'location-street': {
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }],
    labelClassName: 'visuallyhidden'
  },
  'location-townOrCity': {
    validate: ['required', 'notUrl',
      { type: 'regex', arguments: /^([^0-9]*)$/ },
      { type: 'maxlength', arguments: 100 }
    ]
  },
  'location-postcodeOrZIPCode': {
    validate: ['required'],
    formatter: ['removespaces', 'uppercase']
  },
  'storage-building': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 100 }]
  },
  'storage-street': {
    validate: ['notUrl', { type: 'maxlength', arguments: 50 }],
    labelClassName: 'visuallyhidden'
  },
  'storage-townOrCity': {
    validate: ['required', 'notUrl',
      { type: 'regex', arguments: /^([^0-9]*)$/ },
      { type: 'maxlength', arguments: 100 }
    ]
  },
  'storage-postcodeOrZIPCode': {
    validate: ['required'],
    formatter: ['removespaces', 'uppercase']
  }
};
