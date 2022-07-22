'use strict';

module.exports = {
  'choose-a-journey': {
    isPageHeading: true,
    mixin: 'radio-group',
    validate: 'required',
    options: [
      'museums',
      'new-dealer',
      'shooting-clubs',
      'supporting-documents'
    ]
  },
  activity: {
    isPageHeading: true,
    mixin: 'radio-group',
    validate: 'required',
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
    className: 'govuk-file-upload',
    validate: ['required']
  },
  'supporting-document-description': {
    mixin: 'textarea',
    validate: [{type: 'maxlength', arguments: [250]}],
    attributes: [{ attribute: 'spellcheck', value: 'true' }, {attribute: 'rows', value: 5}]
  },
  'supporting-document-add-another': {
    isPageHeading: true,
    mixin: 'radio-group',
    validate: 'required',
    options: [
      'yes',
      'no'
    ]
  },
  'existing-authority-upload': {
    mixin: 'input-file',
    className: 'govuk-file-upload',
    validate: 'required'
  },
  'existing-authority-description': {
    mixin: 'textarea',
    validate: [{type: 'maxlength', arguments: [250]}],
    attributes: [{ attribute: 'spellcheck', value: 'true' }, {attribute: 'rows', value: 5}]
  },
  'existing-authority-add-another': {
    isPageHeading: true,
    mixin: 'radio-group',
    validate: 'required',
    options: [
      'yes',
      'no'
    ]
  }
};
