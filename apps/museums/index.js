'use strict';

const controllers = require('hof-controllers');
const AddressLookup = require('../common/controllers/address/helper');
const exhibitAddressLookup = AddressLookup({
  prefix: 'exhibit',
  start: '/exhibit-address',
  select: '/exhibit-address-select',
  manual: '/exhibit-address-manual',
  next: '/exhibit-add-another-address'
});

module.exports = {
  name: 'museums',
  baseUrl: '/museums',
  steps: {
    '/': {
      controller: controllers.start,
      next: '/activity'
    },
    '/activity': {
      fields: ['activity'],
      next: '/name'
    },
    '/name': {
      fields: ['name'],
      next: '/exhibit-address',
      locals: {
        section: 'name'
      }
    },
    '/exhibit-address': Object.assign(exhibitAddressLookup.start, {
      formatAddress: (address) => address.formatted_address.split('\n').join(', ')
    }),
    '/exhibit-address-select': Object.assign(exhibitAddressLookup.select, {
      fieldSettings: {
        className: 'address'
      }
    }),
    '/exhibit-address-manual': exhibitAddressLookup.manual,
    '/exhibit-add-another-address': {
      controller: require('./controllers/exhibit-address-loop'),
      template: 'add-another-address-loop.html',
      next: '/contact-name',
      returnTo: '/exhibit-address',
      aggregateTo: 'exhibit-addresses',
      aggregateFields: [
        'exhibit-address'
      ],
      fieldSettings: {
        legend: {
          className: 'visuallyhidden'
        }
      }
    },
    '/contact-name': {
      fields: ['contact-name'],
      next: '/contact-details',
      locals: {
        section: 'contact-details'
      }
    },
    '/contact-details': {
      fields: ['contact-email', 'contact-phone'],
      next: '/contact-address',
      locals: {
        section: 'contact-details'
      }
    },
    '/contact-address': {
      fields: ['same-contact-address'],
      next: '/confirm',
      forks: [{
        target: '/confirm',
        condition: {
          field: 'same-contact-address',
          value: 'no'
        }
      }]
    },
    '/confirm': {
      template: 'confirm',
      controller: require('./controllers/confirm'),
      fieldsConfig: require('./fields'),
      next: '/confirmation'
    },
    '/confirmation': {
      clearSession: true,
      backLink: false
    }
  }
};
