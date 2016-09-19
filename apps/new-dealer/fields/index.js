'use strict';

module.exports = {
  'company': {
    mixin: 'radio-group',
    validate: ['required'],
    className: ['form-group'],
    options: [{
      value: 'true',
      label: 'fields.company.options.true',
      toggle: 'company-name',
      child: 'partials/company'
    }, {
      value: 'false',
      label: 'fields.company.options.false',
      toggle: 'sole-trader-name',
      child: 'input-text'
    }]
  },
  'sole-trader-name': {
    validate: ['required'],
    dependent: {
      field: 'company',
      value: 'false'
    }
  },
  'company-name': {
    validate: ['required'],
    dependent: {
      field: 'company',
      value: 'true'
    }
  },
  'company-house-number': {
    validate: ['required'],
    dependent: {
      field: 'company',
      value: 'true'
    }
  },
  'handle-weapons': {
    mixin: 'checkbox',
    validate: ['required'],
    dependent: {
      field: 'handle-ammunition',
      value: ''
    }
  },
  'handle-ammunition': {
    mixin: 'checkbox',
    validate: ['required'],
    dependent: {
      field: 'handle-weapons',
      value: ''
    }
  }
};
