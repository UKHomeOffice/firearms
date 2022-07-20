'use strict';

module.exports = {
  'choose-a-journey': {
    mixin: 'radio-group',
    validate: 'required',
    options: [
      'museums',
      'new-dealer',
      'shooting-clubs',
      'supporting-documents'
    ],
    legend: {
      className: 'visuallyhidden'
    }
  },
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
    validate: ['required', {type: 'maxlength', arguments: [200]}]
  },
  'supporting-document-upload': {
    mixin: 'input-file',
    validate: ['required']
  },
  'supporting-document-description': {
    mixin: 'textarea',
    validate: [{type: 'maxlength', arguments: [250]}]
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
  },
  'existing-authority-upload': {
    mixin: 'input-file',
    validate: 'required'
  },
  'existing-authority-description': {
    mixin: 'textarea',
    validate: [{type: 'maxlength', arguments: [250]}]
  },
  'existing-authority-add-another': {
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
