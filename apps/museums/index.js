'use strict';

const config = require('../../config');

const AddressLookup = require('../common/controllers/address/helper');
const exhibitAddressLookup = AddressLookup({
  prefix: 'exhibit',
  start: '/exhibit-address',
  select: '/exhibit-address-select',
  manual: '/exhibit-address-manual',
  next: '/exhibit-add-another-address',
  continueOnEdit: true
});

const contactAddressLookup = AddressLookup({
  prefix: 'contact',
  start: '/contact-address-input',
  select: '/contact-address-input-select',
  manual: '/contact-address-input-manual',
  next: '/confirm'
});

const Submission = require('../common/behaviours/casework-submission');
const submission = Submission({
  prepare: require('./models/submission')
});

const pdf = require('../common/behaviours/pdf-upload');

const Emailer = require('../common/behaviours/emailer');
const emailer = Emailer({
  recipient: 'contact-email',
  subject: data => `Ref: ${data.caseid} - Museums firearms licence application`,
  type: 'museum firearms licence',
  nameKey: 'contact-name'
});

module.exports = {
  name: 'museums',
  params: '/:action?/:id?',
  baseUrl: '/museums',
  steps: {
    '/activity': {
      fields: ['activity'],
      next: '/name',
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
      next: '/name'
    },
    '/name': {
      fields: ['name'],
      next: '/exhibit-address'
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
      next: '/contact-details'
    },
    '/contact-details': {
      fields: ['contact-email', 'contact-phone'],
      next: '/contact-address'
    },
    '/contact-address': {
      fields: ['same-contact-address'],
      next: '/contact-address-select',
      forks: [{
        target: '/contact-address-input',
        condition: {
          field: 'same-contact-address',
          value: 'no'
        }
      }],
      continueOnEdit: true
    },
    '/contact-address-select': {
      controller: require('./controllers/contact-address-select'),
      fields: ['contact-address'],
      next: '/confirm'
    },
    '/contact-address-input': Object.assign(contactAddressLookup.start, {
      formatAddress: (address) => address.formatted_address.split('\n').join(', ')
    }),
    '/contact-address-input-select': Object.assign(contactAddressLookup.select, {
      fieldSettings: {
        className: 'address'
      }
    }),
    '/contact-address-input-manual': contactAddressLookup.manual,
    '/confirm': {
      template: 'confirm',
      behaviours: [pdf],
      controller: require('../common/controllers/confirm'),
      sections: {
        'museum-details': [
          'name',
          {
            field: 'exhibit-addresses',
            parse: (value) => value.map(a => a.address).join('\n'),
            step: '/exhibit-add-another-address'
          },
          'reference-number'
        ],
        'contact-details': [
          'contact-name',
          'contact-email',
          'contact-phone',
          {
            field: 'contact-address',
            step: '/contact-address'
          }
        ]
      },
      next: '/declaration'
    },
    '/declaration': {
      template: 'declaration',
      behaviours: ['complete', submission, emailer],
      next: '/confirmation'
    },
    '/confirmation': {
      locals: {
        'survey-url': config.survey.urls.museums
      },
      backLink: false
    }
  }
};
