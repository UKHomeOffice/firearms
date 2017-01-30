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
      next: '/location-address'
    },
    '/location-address': {
      template: 'postcode.html',
      controller: require('../common/controllers/address/postcode'),
      prefix: 'location',
      manual: '/location-address-manual',
      select: '/location-address-select',
      formatAddress: (address) => address.formatted_address.split('\n').join(', ')
    },
    '/location-address-manual': {
      template: 'address.html',
      controller: require('../common/controllers/address/manual'),
      prefix: 'location',
      next: '/location-address-category',
      backLink: 'location-address'
    },
    '/location-address-select': {
      template: 'address-lookup.html',
      controller: require('../common/controllers/address/select'),
      prefix: 'location',
      manual: '/location-address-manual',
      next: '/location-address-category',
      fieldSettings: {
        className: 'address'
      },
      prereqs: ['/location-address'],
      backLink: 'location-address'
    },
    '/location-address-category': {
      template: '../common/views/add-another-address-loop.html',
      fields: [
        'location-address-category'
      ],
      continueOnEdit: true,
      next: '/location-add-another-address'
    },
    '/location-add-another-address': {
      addressKey: 'locationAddresses',
      template: 'add-another-address-loop.html',
      controller: require('../common/controllers/loop'),
      next: '/storage-address',
      returnTo: '/location-address',
      aggregateTo: 'location-addresses',
      aggregateFields: [
        'location-address',
        'location-address-category'
      ],
      fieldSettings: {
        legend: {
          className: 'visuallyhidden'
        }
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
