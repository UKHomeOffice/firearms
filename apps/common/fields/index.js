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
      'renew'
    ]
  },
  'reference-number': {
    mixin: 'input-text',
    validate: 'required'
  }
};
