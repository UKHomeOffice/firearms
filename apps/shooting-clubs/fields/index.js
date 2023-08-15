'use strict';

module.exports = {
  'new-club': {
    isPageHeading: true,
    mixin: 'radio-group',
    includeInSummary: false,
    validate: 'required',
    options: [
      'yes',
      'no'
    ]
  },
  'club-name': {
    mixin: 'input-text',
    validate: ['required', {type: 'maxlength', arguments: [200]}]
  },
  'second-contact-name': {
    mixin: 'input-text',
    validate: ['required', {type: 'maxlength', arguments: [200]}]
  },
  'second-contact-email': {
    mixin: 'input-text',
    validate: ['required', 'email', { type: 'maxlength', arguments: 320 }]
  },
  'second-contact-phone': {
    mixin: 'input-text',
    validate: ['internationalPhoneNumber', {type: 'maxlength', arguments: [200]}],
    className: ['govuk-input', 'govuk-input--width-20']
  },
  'club-secretary-name': {
    mixin: 'input-text',
    validate: ['required', {type: 'maxlength', arguments: [200]}]
  },
  'club-postcode': {
    mixin: 'input-text-code',
    validate: ['required', 'postcode', {type: 'maxlength', arguments: [200]}],
    formatter: 'uppercase',
    className: ['govuk-input', 'govuk-input--width-10'],
    includeInSummary: false
  },
  'club-address-lookup': {
    className: 'address',
    validate: ['required', {type: 'maxlength', arguments: [200]}],
    includeInSummary: false
  },
  'club-address-manual': {
    mixin: 'textarea',
    validate: ['required', {type: 'maxlength', arguments: [15000]}],
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    attributes: [{
      attribute: 'rows',
      value: 5
    }]
  },
  'club-secretary-postcode': {
    mixin: 'input-text-code',
    validate: ['required', 'postcode', {type: 'maxlength', arguments: [200]}],
    formatter: 'uppercase',
    className: ['govuk-input', 'govuk-input--width-10'],
    includeInSummary: false
  },
  'club-secretary-address-lookup': {
    className: 'address',
    validate: ['required', {type: 'maxlength', arguments: [200]}],
    includeInSummary: false
  },
  'club-secretary-address-manual': {
    mixin: 'textarea',
    validate: ['required', {type: 'maxlength', arguments: [15000]}],
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    attributes: [{
      attribute: 'rows',
      value: 5
    }]
  },
  'club-secretary-email': {
    mixin: 'input-text',
    validate: ['required', 'email', { type: 'maxlength', arguments: 320 }]
  },
  'club-secretary-phone': {
    mixin: 'input-text',
    validate: ['internationalPhoneNumber', {type: 'maxlength', arguments: [200]}],
    className: ['govuk-input', 'govuk-input--width-20']
  },
  'second-contact-postcode': {
    mixin: 'input-text-code',
    validate: ['required', 'postcode', {type: 'maxlength', arguments: [200]}],
    formatter: 'uppercase',
    className: ['govuk-input', 'govuk-input--width-10'],
    includeInSummary: false
  },
  'second-contact-address-lookup': {
    className: 'address',
    validate: ['required', {type: 'maxlength', arguments: [200]}],
    includeInSummary: false
  },
  'second-contact-address-manual': {
    mixin: 'textarea',
    validate: ['required', {type: 'maxlength', arguments: [15000]}],
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    attributes: [{
      attribute: 'rows',
      value: 5
    }]
  },
  'location-postcode': {
    mixin: 'input-text-code',
    validate: ['required', 'postcode', {type: 'maxlength', arguments: [200]}],
    formatter: 'uppercase',
    className: ['govuk-input', 'govuk-input--width-10'],
    includeInSummary: false
  },
  'location-address-manual': {
    mixin: 'textarea',
    validate: ['required', {type: 'maxlength', arguments: [15000]}],
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    attributes: [{
      attribute: 'rows',
      value: 5
    }]
  },
  'location-address-lookup': {
    validate: ['required', {type: 'maxlength', arguments: [200]}],
    className: 'address'
  },
  'location-add-another-address': {
    mixin: 'radio-group',
    validate: 'required',
    options: [
      'yes',
      'no'
    ]
  },
  'location-address-category': {
    isPageHeading: true,
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
    isPageHeading: true,
    mixin: 'radio-group',
    includeInSummary: false,
    validate: 'required',
    className: 'govuk-form-group',
    options: [{
      value: 'Yes',
      toggle: 'purchase-order-number',
      child: 'input-text'
    }, {
      value: 'No'
    }]
  },
  'purchase-order-number': {
    validate: ['required', {type: 'maxlength', arguments: [200]}],
    dependent: {
      field: 'purchase-order',
      value: 'Yes'
    }
  },
  'invoice-contact-name': {
    mixin: 'input-text',
    validate: ['required', {type: 'maxlength', arguments: [200]}]
  },
  'invoice-contact-email': {
    mixin: 'input-text',
    validate: ['required', 'email', { type: 'maxlength', arguments: 320 }]
  },
  'invoice-contact-phone': {
    mixin: 'input-text',
    validate: ['internationalPhoneNumber', {type: 'maxlength', arguments: [200]}],
    className: ['govuk-input', 'govuk-input--width-20']
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
    ],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'invoice-postcodeOrZIPCode': {
    validate: ['required'],
    formatter: ['removespaces', 'uppercase', {type: 'maxlength', arguments: [200]}],
    className: ['govuk-input', 'govuk-input--width-10']
  },
  'club-building': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 200 }]
  },
  'club-street': {
    validate: ['notUrl', { type: 'maxlength', arguments: 200 }],
    labelClassName: 'visuallyhidden'
  },
  'club-townOrCity': {
    validate: ['required', 'notUrl',
      { type: 'regex', arguments: /^([^0-9]*)$/ },
      { type: 'maxlength', arguments: 200 }
    ],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'club-postcodeOrZIPCode': {
    validate: ['required', {type: 'maxlength', arguments: [200]}],
    formatter: ['removespaces', 'uppercase'],
    className: ['govuk-input', 'govuk-input--width-10']
  },
  'club-secretary-building': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 200 }]
  },
  'club-secretary-street': {
    validate: ['notUrl', { type: 'maxlength', arguments: 200 }],
    labelClassName: 'visuallyhidden'
  },
  'club-secretary-townOrCity': {
    validate: ['required', 'notUrl',
      { type: 'regex', arguments: /^([^0-9]*)$/ },
      { type: 'maxlength', arguments: 200 }
    ],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'club-secretary-postcodeOrZIPCode': {
    validate: ['required'],
    formatter: ['removespaces', 'uppercase', {type: 'maxlength', arguments: [200]}],
    className: ['govuk-input', 'govuk-input--width-10']
  },
  'second-contact-building': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 200 }]
  },
  'second-contact-street': {
    validate: ['notUrl', { type: 'maxlength', arguments: 200 }],
    labelClassName: 'visuallyhidden'
  },
  'second-contact-townOrCity': {
    validate: ['required', 'notUrl',
      { type: 'regex', arguments: /^([^0-9]*)$/ },
      { type: 'maxlength', arguments: 200 }
    ],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'second-contact-postcodeOrZIPCode': {
    validate: ['required'],
    formatter: ['removespaces', 'uppercase', {type: 'maxlength', arguments: [200]}],
    className: ['govuk-input', 'govuk-input--width-10']
  },
  'location-building': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 200 }]
  },
  'location-street': {
    validate: ['notUrl', { type: 'maxlength', arguments: 200 }],
    labelClassName: 'visuallyhidden'
  },
  'location-townOrCity': {
    validate: ['required', 'notUrl',
      { type: 'regex', arguments: /^([^0-9]*)$/ },
      { type: 'maxlength', arguments: 200 }
    ],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'location-postcodeOrZIPCode': {
    validate: ['required'],
    formatter: ['removespaces', 'uppercase', {type: 'maxlength', arguments: [200]}],
    className: ['govuk-input', 'govuk-input--width-10']
  },
  'storage-building': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 200 }]
  },
  'storage-street': {
    validate: ['notUrl', { type: 'maxlength', arguments: 200 }],
    labelClassName: 'visuallyhidden'
  },
  'storage-townOrCity': {
    validate: ['required', 'notUrl',
      { type: 'regex', arguments: /^([^0-9]*)$/ },
      { type: 'maxlength', arguments: 200 }
    ],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'storage-postcodeOrZIPCode': {
    validate: ['required'],
    formatter: ['removespaces', 'uppercase', {type: 'maxlength', arguments: [200]}],
    className: ['govuk-input', 'govuk-input--width-10']
  }
};
