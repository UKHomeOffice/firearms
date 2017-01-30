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
      next: '/club-name',
      forks: [{
        target: '/authority-details',
        condition: {
          field: 'activity',
          value: 'renew'
        }
      }]
    },
    '/authority-details': {
      fields: [
        'reference-number'
      ],
      next: '/club-name'
    },
    '/club-name': {
      fields: [
        'club-name'
      ],
      next: '/club-address'
    },
    '/club-address': {
      template: 'postcode.html',
      controller: require('../common/controllers/address/postcode'),
      prefix: 'club',
      manual: '/club-address-manual',
      select: '/club-address-select',
      formatAddress: (address) => address.formatted_address.split('\n').join(', ')
    },
    '/club-address-select': {
      template: 'address-lookup.html',
      controller: require('../common/controllers/address/select'),
      prefix: 'club',
      manual: '/club-address-manual',
      next: '/club-secretary-name',
      fieldSettings: {
        className: 'address'
      },
      prereqs: ['/club-address'],
      backLink: 'club-address'
    },
    '/club-address-manual': {
      template: 'address.html',
      controller: require('../common/controllers/address/manual'),
      prefix: 'club',
      next: '/club-secretary-name',
      backLink: 'club-address'
    },
    '/club-secretary-name': {
      fields: [
        'club-secretary-name'
      ],
      next: '/club-secretary-address'
    },
    '/club-secretary-address': {
      template: 'postcode.html',
      controller: require('../common/controllers/address/postcode'),
      prefix: 'club-secretary',
      manual: '/club-secretary-address-manual',
      select: '/club-secretary-address-select',
      formatAddress: (address) => address.formatted_address.split('\n').join(', ')
    },
    '/club-secretary-address-manual': {
      template: 'address.html',
      controller: require('../common/controllers/address/manual'),
      prefix: 'club-secretary',
      next: '/club-secretary-email',
      backLink: 'club-secretary-address'
    },
    '/club-secretary-address-select': {
      template: 'address-lookup.html',
      controller: require('../common/controllers/address/select'),
      prefix: 'club-secretary',
      manual: '/club-secretary-address-manual',
      next: '/club-secretary-email',
      fieldSettings: {
        className: 'address'
      },
      prereqs: ['/club-secretary-address'],
      backLink: 'club-secretary-address'
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
      next: '/second-contact-address'
    },
    '/second-contact-address': {
      template: 'postcode.html',
      controller: require('../common/controllers/address/postcode'),
      prefix: 'second-contact',
      manual: '/second-contact-address-manual',
      select: '/second-contact-address-select',
      formatAddress: (address) => address.formatted_address.split('\n').join(', ')
    },
    '/second-contact-address-manual': {
      template: 'address.html',
      controller: require('../common/controllers/address/manual'),
      prefix: 'second-contact',
      next: '/second-contact-email',
      backLink: 'second-contact-address'
    },
    '/second-contact-address-select': {
      template: 'address-lookup.html',
      controller: require('../common/controllers/address/select'),
      prefix: 'second-contact',
      manual: '/second-contact-address-manual',
      next: '/second-contact-email',
      fieldSettings: {
        className: 'address'
      },
      prereqs: ['/second-contact-address'],
      backLink: 'second-contact-address'
    },
    '/second-contact-email': {
      fields: [
        'second-contact-email',
        'second-contact-phone'
      ],
      next: '/location-postcode'
    },
    '/location-postcode': {
      addressKey: 'locationAddresses',
      template: 'postcode-loop.html',
      controller: require('../common/controllers/postcode-loop'),
      fields: [
        'location-postcode'
      ],
      next: '/location-address',
      backlink: 'second-contact-email',
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
      addressKey: 'locationAddresses',
      template: 'address-loop.html',
      controller: require('../common/controllers/address-loop'),
      fields: [
        'location-address-manual'
      ],
      next: '/location-address-category',
      prereqs: ['/location-postcode', '/second-contact-email'],
      backlink: 'location-postcode',
      locals: {
        field: 'location'
      }
    },
    '/location-address-lookup': {
      addressKey: 'locationAddresses',
      template: 'address-lookup-loop.html',
      controller: require('../common/controllers/address-lookup-loop'),
      fields: [
        'location-address-lookup'
      ],
      next: '/location-address-category',
      locals: {
        field: 'location'
      }
    },
    '/location-address-category': {
      template: '../common/views/add-another-address-loop.html',
      addressKey: 'locationAddresses',
      controller: require('./controllers/location-address-category'),
      fields: [
        'location-address-category'
      ],
      continueOnEdit: true,
      next: '/location-add-another-address',
      locals: {
        field: 'location'
      }
    },
    '/location-add-another-address': {
      addressKey: 'locationAddresses',
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
    '/confirm': {
      controller: controllers.confirm,
      next: '/confirmation'
    },
    '/confirmation': {
    }
  }
};
