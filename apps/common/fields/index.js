'use strict';

module.exports = {
  activity: {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'new',
      'renew',
      'vary'
    ]
  },
  'reference-number': {
    mixin: 'input-text',
    validate: 'required'
  },
  'supporting-document-upload': {
    mixin: 'input-file',
    validate: 'required'
  },
  'supporting-document-description': {
    mixin: 'textarea'
  },
  'supporting-document-add-another': {
    mixin: 'radio-group',
    validate: 'required',
    options: [
      'yes',
      'no'
    ],
    legend: {
      className: 'visuallyhidden'
    }
  }
};
