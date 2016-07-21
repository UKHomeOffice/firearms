'use strict';

module.exports = {
  name: 'new-dealer',
  steps: {
    '/': {
      template: 'step',
      fields: ['name-text'],
      next: '/hi'
    },
    '/hi': {
      template: 'step',
      fields: ['name-text']
    }
  }
};
