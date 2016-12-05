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
      next: '/club-address',
      forks: [{
        target: '/club-address-lookup',
        condition(req) {
          const addresses = req.sessionModel.get('club-addresses');
          return addresses && addresses.length;
        }
      }]
    },
    '/club-address': {
      next: '/club-secretary-name'
    },
    '/club-address-lookup': {
      next: '/club-secretary-name'
    },
    '/club-secretary-name': {
      next: '/club-secretary-postcode'
    },
    '/club-secretary-postcode': {
      next: '/club-secretary-address',
      forks: [{
        target: '/club-address-lookup',
        condition(req) {
          const addresses = req.sessionModel.get('club-secretary-addresses');
          return addresses && addresses.length;
        }
      }]
    },
    '/club-secretary-address': {
      next: '/club-secretary-email'
    },
    '/club-secretary-address-lookup': {
      next: '/club-secretary-email'
    },
    '/club-secretary-email': {
      next: '/second-person-name'
    },
    '/second-person-name': {
      fields: [
        'second-person-name'
      ],
      next: '/second-contact-postcode'
    },
    '/second-contact-postcode': {
      next: '/second-contact-address',
      forks: [{
        target: '/second-contact-address-lookup',
        condition(req) {
          const addresses = req.sessionModel.get('second-contact-addresses');
          return addresses && addresses.length;
        }
      }]
    },
    '/second-contact-address': {
      next: '/second-contact-email'
    },
    '/second-contact-address-lookup': {
      next: '/second-contact-email'
    },
    '/second-contact-email': {
      next: '/location-postcode'
    },
    '/location-postcode': {
    },
    '/location-address': {
    },
    '/location-address-lookup': {
    },
    '/location-address-category': {
    },
    '/location-add-another-address': {
    },
    '/storage-address-list': {
    },
    '/storage-add-another-address': {
    },
    '/confirm': {
    },
    '/confirmation': {
    }
  }
};
