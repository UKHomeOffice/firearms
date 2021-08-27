'use strict';

const config = require('../../config');
const _ = require('lodash');

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
const invoiceAddressLookup = AddressLookup({
  prefix: 'invoice',
  start: '/invoice-address-input',
  select: '/invoice-address-input-select',
  manual: '/invoice-address-input-manual',
  next: '/purchase-order'
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
        target: '/existing-authority',
        condition: req => {
          return _.includes(['vary', 'renew'], req.sessionModel.get('activity'));
        }
      }]
    },
    '/new-club': {
      fields: ['new-club'],
      locals: { section: 'club-details' },
      next: '/club-name'
    },
    '/existing-authority': {
      controller: require('../common/controllers/existing-authority-documents'),
      fields: [
        'existing-authority-upload',
        'existing-authority-description'
      ],
      continueOnEdit: true,
      next: '/existing-authority-add-another'
    },
    '/existing-authority-add-another': {
      controller: require('../common/controllers/existing-authority-documents-add-another'),
      behaviours: [require('../common/behaviours/existing-authority-documents-add')],
      fields: [
        'existing-authority-add-another'
      ],
      forks: [{
        isLoop: true,
        target: '/existing-authority',
        condition: {
          field: 'existing-authority-add-another',
          value: 'yes'
        }
      }],
      continueOnEdit: true,
      next: '/club-name'
    },
    '/club-name': {
      fields: [
        'club-name'
      ],
      locals: { section: 'club-details' },
      next: '/club-address'
    },
    '/club-address': Object.assign(clubAddressLookup.start, {
      formatAddress: address => address.formatted_address.split('\n').join(', ')
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
      locals: { section: 'club-secretary-details' },
      next: '/club-secretary-address'
    },
    '/club-secretary-address': Object.assign(clubSecretaryAddressLookup.start, {
      formatAddress: address => address.formatted_address.split('\n').join(', ')
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
      locals: { section: 'club-secretary-details' },
      next: '/second-contact-name'
    },
    '/second-contact-name': {
      fields: [
        'second-contact-name'
      ],
      locals: { section: 'club-second-contact' },
      next: '/second-contact-address'
    },
    '/second-contact-address': Object.assign(secondContactAddressLookup.start, {
      formatAddress: address => address.formatted_address.split('\n').join(', ')
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
      locals: { section: 'club-second-contact' },
      next: '/location-address'
    },
    '/location-address': Object.assign(locationAddressLookup.start, {
      formatAddress: address => address.formatted_address.split('\n').join(', ')
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
      locals: { section: 'storage-addresses' },
      continueOnEdit: true,
      next: '/storage-add-another-address'
    },
    '/storage-add-another-address': {
      template: 'add-another-address-loop.html',
      controller: require('./controllers/storage-address-loop'),
      next: '/invoice-contact-details',
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
      formatAddress: address => address.formatted_address.split('\n').join(', ')
    }),
    '/storage-address-add-select': Object.assign(storageAddressLookup.select, {
      fieldSettings: {
        className: 'address'
      }
    }),
    '/storage-address-add-manual': storageAddressLookup.manual,
    '/invoice-contact-details': {
      fields: ['invoice-contact-name', 'invoice-contact-email', 'invoice-contact-phone'],
      locals: { section: 'invoice-details' },
      next: '/invoice-address-input'
    },
    '/invoice-address-input': Object.assign(invoiceAddressLookup.start, {
      formatAddress: address => address.formatted_address.split('\n').join(', ')
    }),
    '/invoice-address-input-select': Object.assign(invoiceAddressLookup.select, {
      locals: { section: 'invoice-details' },
      fieldSettings: {
        className: 'address'
      }
    }),
    '/invoice-address-input-manual': invoiceAddressLookup.manual,
    '/purchase-order': {
      fields: [
        'purchase-order',
        'purchase-order-number'
      ],
      next: '/confirm',
      locals: {
        renew: true,
        section: 'invoice-details',
        step: 'purchase-order'
      }
    },
    '/confirm': {
      behaviours: [require('hof').components.summary, pdf],
      controller: require('../common/controllers/confirm'),
      sections: require('./sections/summary-data-sections'),
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
