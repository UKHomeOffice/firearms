'use strict';

module.exports = {
  company: {
    mixin: 'radio-group',
    validate: 'required',
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
    validate: 'required',
    dependent: {
      field: 'company',
      value: 'false'
    }
  },
  'company-name': {
    validate: 'required',
    dependent: {
      field: 'company',
      value: 'true'
    }
  },
  'company-house-number': {
    validate: 'required',
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
  },
  obtain: {
    mixin: 'checkbox-group',
    validate: 'required',
    options: [{
      label: 'fields.obtain.options.buy',
      value: 'buy',
      toggle: 'buy-details',
      child: 'partials/obtain-buy'
    }, {
      label: 'fields.obtain.options.temporary-possession',
      value: 'temporary-possession',
      toggle: 'temporary-details',
      child: 'textarea'
    }, {
      label: 'fields.obtain.options.manufacture',
      value: 'manufacture'
    }, {
      label: 'fields.obtain.options.other-means',
      value: 'other-means',
      toggle: 'other-means-details',
      child: 'textarea'
    }, {
      label: 'fields.obtain.options.wont-take-possession',
      value: 'wont-take-possession',
      toggle: 'wont-take-details',
      child: 'textarea'
    }]
  },
  'buy-details': {
    validate: 'required',
    dependent: {
      field: 'obtain',
      value: 'buy'
    }
  },
  'buy-import': {
    className: 'form-checkbox'
  },
  'temporary-details': {
    validate: 'required',
    dependent: {
      field: 'obtain',
      value: 'temporary-possession'
    }
  },
  'other-means-details': {
    validate: 'required',
    dependent: {
      field: 'obtain',
      value: 'other-means'
    }
  },
  'wont-take-details': {
    validate: 'required',
    dependent: {
      field: 'obtain',
      value: 'wont-take-possession'
    }
  }
};
