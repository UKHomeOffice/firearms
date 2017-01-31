'use strict';

const controllers = require('hof-controllers');

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
      next: '/address-loop',
      locals: {
        section: 'name'
      }
    },
    '/address-loop': {
      next: '/contact-name'
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
      next: '/contact-address-select',
      forks: [{
        target: '/contact-address-postcode',
        condition: {
          field: 'same-contact-address',
          value: 'no'
        }
      }]
    },
    '/contact-address-postcode': {
      next: '/contact-address-select'
    },
    '/contact-address-select': {
      next: '/confirm'
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
