'use strict';

module.exports = {
  'reference-number': {
    validate: ['required'],
    invalidates: ['email']
  },
  'email': {
    validate: [
      'required',
      'email'
    ]
  }
};
