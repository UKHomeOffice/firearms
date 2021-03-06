'use strict';

const config = require('../../config');

const AddressLookup = require('../common/controllers/address/helper');

const Submission = require('../common/behaviours/casework-submission');
const submission = Submission({
  prepare: require('./models/submission')
});

const pdf = require('../common/behaviours/pdf-upload');

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
  next: '/location-address-category',
  continueOnEdit: true
});
const storageAddressLookup = AddressLookup({
  prefix: 'storage',
  start: '/storage-address-add',
  select: '/storage-address-add-select',
  manual: '/storage-address-add-manual',
  next: '/storage-add-another-address',
  continueOnEdit: true
});

const Emailer = require('../common/behaviours/emailer');
const emailer = Emailer({
  recipient: 'club-secretary-email',
  subject: data => `Ref: ${data.caseid} - Shooting club firearms licence application`,
  type: 'shooting club approval',
  nameKey: 'club-secretary-name'
});

module.exports = {
  name: 'shooting-clubs',
  baseUrl: '/shooting-clubs',
  params: '/:action?/:id?',
  steps: {
    '/privacy': {
      template: 'privacy',
      next: '/activity'
    },
    '/activity': {
      fields: [
        'activity'
      ],
      next: '/new-club',
      forks: [{
        target: '/authority-details',
        condition: {
          field: 'activity',
          value: 'renew'
        }
      }]
    },
    '/new-club': {
      fields: [
        'new-club'
      ],
      next: '/club-name'
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
      template: 'add-another-address-loop.html',
      controller: require('./controllers/location-address-loop'),
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
    '/storage-address': {
      controller: require('./controllers/storage-address'),
      fields: [
        'storage-address-range',
        'storage-address-secretary'
      ],
      continueOnEdit: true,
      next: '/storage-add-another-address'
    },
    '/storage-add-another-address': {
      template: 'add-another-address-loop.html',
      controller: require('./controllers/storage-address-loop'),
      next: '/confirm',
      returnTo: '/storage-address-add',
      aggregateTo: 'all-storage-addresses',
      aggregateFields: [
        'storage-address'
      ],
      fieldSettings: {
        legend: {
          className: 'visuallyhidden'
        }
      }
    },
    '/storage-address-add': Object.assign(storageAddressLookup.start, {
      formatAddress: (address) => address.formatted_address.split('\n').join(', ')
    }),
    '/storage-address-add-select': Object.assign(storageAddressLookup.select, {
      fieldSettings: {
        className: 'address'
      }
    }),
    '/storage-address-add-manual': storageAddressLookup.manual,
    '/confirm': {
      controller: require('./controllers/confirm'),
      behaviours: [pdf],
      sections: {
        authority: ['reference-number'],
        club: [
          'club-name',
          {
            field: 'club-address',
            step: '/club-address'
          },
          'new-club'
        ],
        secretary: [
          'club-secretary-name',
          {
            field: 'club-secretary-address',
            step: '/club-secretary-address'
          },
          'club-secretary-email',
          'club-secretary-phone'
        ],
        'second-contact': [
          'second-contact-name',
          {
            field: 'second-contact-address',
            step: '/second-contact-address'
          },
          'second-contact-email',
          'second-contact-phone'
        ],
        'range-addresses': [
          {
            field: 'location-addresses',
            step: '/location-add-another-address'
          }
        ],
        'storage-addresses': [
          {
            field: 'all-storage-addresses',
            parse: list => list.map(a => a.address).join('\n'),
            step: '/storage-address'
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
        'survey-url': config.survey.urls['shooting-clubs']
      },
      backLink: false
    }
  }
};
