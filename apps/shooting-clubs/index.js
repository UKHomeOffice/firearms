'use strict';

const controllers = require('hof-controllers');

const AddressLookup = require('../common/controllers/address/helper');

const clubAddressLookup = AddressLookup({
  prefix: 'club',
  start: '/club-address',
  select: '/club-address-select',
  manual: '/club-address-manual',
  next: '/club-secretary-name'
});
const clubSecretaryAddressLookup = AddressLookup({
  prefix: 'club-secretary',
  start: '/club-secretary-address',
  select: '/club-secretary-address-select',
  manual: '/club-secretary-address-manual',
  next: '/club-secretary-email'
});
const secondContactAddressLookup = AddressLookup({
  prefix: 'second-contact',
  start: '/second-contact-address',
  select: '/second-contact-address-select',
  manual: '/second-contact-address-manual',
  next: '/second-contact-email'
});
const locationAddressLookup = AddressLookup({
  prefix: 'location',
  start: '/location-address',
  select: '/location-address-select',
  manual: '/location-address-manual',
  next: '/location-address-category'
});

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
    '/club-address': Object.assign(clubAddressLookup.start, {
      formatAddress: (address) => address.formatted_address.split('\n').join(', ')
    }),
    '/club-address-select': Object.assign(clubAddressLookup.select, {
      fieldSettings: {
        className: 'address'
      }
    }),
    '/club-address-manual': clubAddressLookup.manual,
    '/club-secretary-name': {
      fields: [
        'club-secretary-name'
      ],
      next: '/club-secretary-address'
    },
    '/club-secretary-address': Object.assign(clubSecretaryAddressLookup.start, {
      formatAddress: (address) => address.formatted_address.split('\n').join(', ')
    }),
    '/club-secretary-address-select': Object.assign(clubSecretaryAddressLookup.select, {
      fieldSettings: {
        className: 'address'
      }
    }),
    '/club-secretary-address-manual': clubSecretaryAddressLookup.manual,
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
    '/second-contact-address': Object.assign(secondContactAddressLookup.start, {
      formatAddress: (address) => address.formatted_address.split('\n').join(', ')
    }),
    '/second-contact-address-select': Object.assign(secondContactAddressLookup.select, {
      fieldSettings: {
        className: 'address'
      }
    }),
    '/second-contact-address-manual': secondContactAddressLookup.manual,
    '/second-contact-email': {
      fields: [
        'second-contact-email',
        'second-contact-phone'
      ],
      next: '/location-address'
    },
    '/location-address': Object.assign(locationAddressLookup.start, {
      formatAddress: (address) => address.formatted_address.split('\n').join(', ')
    }),
    '/location-address-select': Object.assign(locationAddressLookup.select, {
      fieldSettings: {
        className: 'address'
      }
    }),
    '/location-address-manual': locationAddressLookup.manual,
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
