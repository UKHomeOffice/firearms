'use strict';

module.exports = {
  'reference-number': {
    validate: ['required', {'type': 'maxlength', 'arguments': [200]}],
    invalidates: ['email']
  },
  email: {
    validate: [
      'required',
      'email',
      { type: 'maxlength', arguments: 320 }
    ]
  }
};
