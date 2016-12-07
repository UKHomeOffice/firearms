'use strict';

const controllers = require('hof-controllers');

module.exports = {
  name: 'shooting-clubs',
  baseUrl: '/shooting-clubs',
  params: '/:action?/:id?',
  steps: {
    '/': {
      controller: controllers.start,
      next: '/activity'
    },
    '/activity': {
      fields: [
        'activity'
      ],
      next: '/club-name'
    },
    '/club-name': {
      fields: [
        'club-name'
      ],
      next: '/club-postcode'
    },
    '/club-postcode': {
    }
  }
};
