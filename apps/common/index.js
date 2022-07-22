'use strict';

module.exports = {
  name: 'common',
  pages: {
    '/privacy': 'privacy',
    '/accessibility': 'accessibility',
    '/cookies': 'cookies',
    '/terms-and-conditions': 'terms'
  },
  steps: {
    '/choose': {
      fields: [
        'choose-a-journey'
      ],
      locals: {
        section: 'choose-a-journey'
      },
      forks: [
        {
          target: '/museums',
          condition: {
            field: 'choose-a-journey',
            value: 'museums'
          }
        },
        {
          target: '/s5',
          condition: {
            field: 'choose-a-journey',
            value: 'new-dealer'
          }
        },
        {
          target: '/supporting-documents',
          condition: {
            field: 'choose-a-journey',
            value: 'supporting-documents'
          }
        },
        {
          target: '/shooting-clubs',
          condition: {
            field: 'choose-a-journey',
            value: 'shooting-clubs'
          }
        }
      ],
      next: '/privacy'
    },
    '/privacy': {},
    '/accessibility': {},
    '/cookies': {}
  }
};
