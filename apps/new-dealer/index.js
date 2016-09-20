'use strict';

const controllers = require('hof').controllers;

module.exports = {
  name: 'new-dealer',
  steps: {
    '/': {
      controller: controllers.start,
      next: '/company-name'
    },
    '/company-name': {
      fields: [
        'company',
        'company-name',
        'company-house-number',
        'sole-trader-name'
      ],
      next: '/handle',
      locals: {
        section: 'company-name'
      }
    },
    '/handle': {
      fields: [
        'handle-weapons',
        'handle-ammunition'
      ],
      next: '/obtain',
      locals: {
        section: 'handle',
        subsection: 'all-that-apply'
      }
    },
    '/obtain': {
      fields: ['obtain'],
      next: '/storage',
      locals: {
        section: 'obtain'
      }
    }
  }
};
