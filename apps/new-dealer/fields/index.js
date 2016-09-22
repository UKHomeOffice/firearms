'use strict';

module.exports = {
  company: {
    mixin: 'radio-group',
    validate: ['required'],
    className: ['form-group'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'true',
      toggle: 'company-name',
      child: 'partials/company'
    }, {
      value: 'false',
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
  'weapons-ammunition': {
    mixin: 'checkbox-group',
    validate: 'required',
    options: [
      'weapons',
      'ammunition'
    ]
  }
};
