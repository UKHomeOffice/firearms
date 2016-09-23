'use strict';

module.exports = {
  company: {
    mixin: 'radio-group',
    validate: 'required',
    className: 'form-group',
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
      value: 'buy',
      toggle: 'buy-details',
      child: 'partials/obtain-buy'
    }, {
      value: 'temporary-possession',
      toggle: 'temporary-details',
      child: 'textarea'
    }, {
      value: 'manufacture'
    }, {
      value: 'other-means',
      toggle: 'other-means-details',
      child: 'textarea'
    }, {
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
  },
  'stored-on-premises': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'true',
    }, {
      value: 'false',
      toggle: 'no-storage-details',
      child: 'textarea'
    }]
  },
  'no-storage-details': {
    validate: 'required',
    dependent: {
      field: 'stored-on-premises',
      value: 'false'
    }
  },
  usage: {
    mixin: 'checkbox-group',
    validate: 'required',
    options: [{
      value: 'sell',
      toggle: 'sell-details',
      child: 'textarea'
    }, {
      value: 'transport',
      toggle: 'transport-details',
      child: 'textarea'
    }, {
      value: 'transfer',
      toggle: 'transfer-details',
      child: 'textarea'
    }, {
      value: 'arm-guards'
    }, {
      value: 'training',
      toggle: 'training-details',
      child: 'textarea'
    }, {
      value: 'research',
      toggle: 'research-details',
      child: 'textarea'
    }, {
      value: 'other',
      toggle: 'other-details',
      child: 'textarea'
    }]
  },
  'sell-details': {
    validate: 'required',
    dependent: {
      field: 'usage',
      value: 'sell'
    }
  },
  'transport-details': {
    validate: 'required',
    dependent: {
      field: 'usage',
      value: 'transport'
    }
  },
  'transfer-details': {
    validate: 'required',
    dependent: {
      field: 'usage',
      value: 'transfer'
    }
  },
  'training-details': {
    validate: 'required',
    dependent: {
      field: 'usage',
      value: 'training'
    }
  },
  'research-details': {
    validate: 'required',
    dependent: {
      field: 'usage',
      value: 'research'
    }
  },
  'other-details': {
    validate: 'required',
    dependent: {
      field: 'usage',
      value: 'other'
    }
  }
};
