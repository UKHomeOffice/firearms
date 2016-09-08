'use strict';

module.exports = {
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
