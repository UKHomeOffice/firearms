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
      template: 'postcode.html',
      controller: require('../common/controllers/postcode'),
      fields: [
        'club-postcode'
      ],
      next: '/club-address',
      forks: [{
        target: '/club-address-lookup',
        condition(req) {
          const addresses = req.sessionModel.get('club-addresses');
          return addresses && addresses.length;
        }
      }],
      locals: {
        field: 'club'
      }
    },
    '/club-address': {
      template: 'address.html',
      controller: require('../common/controllers/address'),
      fields: [
        'club-address-manual'
      ],
      next: '/club-secretary-name',
      prereqs: ['/club-postcode', '/club-name'],
      backLink: 'club-postcode',
      locals: {
        field: 'club'
      }
    },
    '/club-address-lookup': {
      template: 'address-lookup.html',
      controller: require('../common/controllers/address-lookup'),
      fields: [
        'club-address-lookup'
      ],
      next: '/club-secretary-name',
      locals: {
        field: 'club'
      }
    },
    '/club-secretary-name': {
      fields: [
        'club-secretary-name'
      ],
      next: '/club-secretary-postcode'
    },
    '/club-secretary-postcode': {
      template: 'postcode.html',
      controller: require('../common/controllers/postcode'),
      fields: [
        'club-secretary-postcode'
      ],
      next: '/club-secretary-address',
      forks: [{
        target: '/club-secretary-address-lookup',
        condition(req) {
          const addresses = req.sessionModel.get('club-secretary-addresses');
          return addresses && addresses.length;
        }
      }],
      locals: {
        field: 'club-secretary'
      }
    },
    '/club-secretary-address': {
      template: 'address.html',
      controller: require('../common/controllers/address'),
      fields: [
        'club-secretary-address-manual'
      ],
      next: '/club-secretary-email',
      prereqs: ['/club-secretary-postcode', '/club-secretary-name'],
      backLink: 'club-secretary-postcode',
      locals: {
        field: 'club-secretary'
      }
    },
    '/club-secretary-address-lookup': {
      template: 'address-lookup.html',
      controller: require('../common/controllers/address-lookup'),
      fields: [
        'club-secretary-address-lookup'
      ],
      next: '/club-secretary-email',
      locals: {
        field: 'club-secretary'
      }
    },
    '/club-secretary-email': {
      fields: [
        'club-secretary-email',
        'club-secretary-phone'
      ],
      next: '/second-contact-name'
    },
    '/second-contact-name': {
      fields: [
        'second-contact-name'
      ],
      next: '/second-contact-postcode'
    },
    '/second-contact-postcode': {
      template: 'postcode.html',
      controller: require('../common/controllers/postcode'),
      fields: [
        'second-contact-postcode'
      ],
      next: '/second-contact-address',
      forks: [{
        target: '/second-contact-address-lookup',
        condition(req) {
          const addresses = req.sessionModel.get('second-contact-addresses');
          return addresses && addresses.length;
        }
      }],
      locals: {
        field: 'second-contact'
      }
    },
    '/second-contact-address': {
      template: 'address.html',
      controller: require('../common/controllers/address'),
      fields: [
        'second-contact-address-manual'
      ],
      next: '/second-contact-email',
      prereqs: ['/second-contact-postcode', '/second-contact-name'],
      backLink: 'second-contact-postcode',
      locals: {
        field: 'second-contact'
      }
    },
    '/second-contact-address-lookup': {
      template: 'address-lookup.html',
      controller: require('../common/controllers/address-lookup'),
      fields: [
        'second-contact-address-lookup'
      ],
      next: '/second-contact-email',
      locals: {
        field: 'second-contact'
      }
    },
    '/second-contact-email': {
      fields: [
        'second-contact-email',
        'second-contact-phone'
      ],
      next: '/location-postcode'
    },
    '/location-postcode': {
      template: 'postcode-loop.html',
      controller: require('../common/controllers/postcode-loop'),
      fields: [
        'location-postcode'
      ],
      next: '/location-address',
      forks: [{
        target: '/location-address-lookup',
        condition(req) {
          const addresses = req.sessionModel.get('location-addresses');
          return addresses && addresses.length;
        }
      }],
      locals: {
        field: 'location'
      }
    },
    '/location-address': {
      template: 'address-loop.html',
      controller: require('../common/controllers/address-loop'),
      fields: [
        'location-address-manual'
      ],
      next: '/location-add-another-address',
      prereqs: ['/location-postcode', '/second-contact-email'],
      backlink: 'location-postcode',
      locals: {
        field: 'location'
      }
    },
    '/location-address-lookup': {
      template: 'address-lookup-loop.html',
      controller: require('../common/controllers/address-lookup-loop'),
      fields: [
        'location-address-lookup'
      ],
      next: '/location-add-another-address',
      locals: {
        field: 'location'
      }
    },
    '/location-address-category': {
    },
    '/location-add-another-address': {
      template: 'add-another-address-loop.html',
      controller: require('../common/controllers/add-another-address-loop'),
      fields: [
        'location-add-another-address'
      ],
      prereqs: ['/second-contact-email'],
      next: '/confirm',
      forks: [{
        target: '/location-postcode',
        condition: {
          field: 'location-add-another-address',
          value: 'yes'
        }
      }],
      locals: {
        field: 'location'
      }
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
