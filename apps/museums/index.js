'use strict';

const config = require('../../config');
const _ = require('lodash');
const addressFormatter = require('./util/address-formatter');

const AddressLookup = require('../common/controllers/address/helper');
const AddressSelect = require('./controllers/contact-address-select');
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
  next: '/invoice-contact-details'
});

const invoiceAddressLookup = AddressLookup({
  prefix: 'invoice',
  start: '/invoice-address-input',
  select: '/invoice-address-input-select',
  manual: '/invoice-address-input-manual',
  next: '/purchase-order'
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
    '/privacy': {
      template: 'privacy',
      next: '/activity'
    },
    '/activity': {
      fields: ['activity'],
      next: '/name',
      forks: [{
        target: '/existing-authority',
        condition: req => {
          return _.includes(['vary', 'renew'], req.sessionModel.get('activity'));
        }
      }]
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
      next: '/name'
    },
    '/name': {
      fields: ['name'],
      next: '/exhibit-address',
      locals: {
        section: 'exhibit-details-section'
      }
    },
    '/exhibit-address': Object.assign(exhibitAddressLookup.start, {
      formatAddress: address => addressFormatter(address)
    }),
    '/exhibit-address-select': Object.assign(exhibitAddressLookup.select, {
      fieldSettings: {
        className: 'address',
        section: 'exhibit-details-section'
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
          className: 'visuallyhidden',
          section: 'exhibit-details-section'
        }
      }
    },
    '/contact-name': {
      fields: ['contact-name'],
      next: '/contact-details',
      locals: {
        section: 'contact-details-section'
      }
    },
    '/contact-details': {
      fields: ['contact-email', 'contact-phone'],
      next: '/contact-address',
      locals: { section: 'contact-details-section' }
    },
    '/contact-address': {
      fields: ['same-contact-address'],
      locals: { section: 'contact-details-section' },
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
      controller: AddressSelect,
      fields: ['contact-address'],
      locals: { section: 'contact-details-section' },
      next: '/invoice-contact-details'
    },
    '/contact-address-input': Object.assign(contactAddressLookup.start, {
      formatAddress: address => addressFormatter(address),
      section: 'contact-details-section'
    }),
    '/contact-address-input-select': Object.assign(contactAddressLookup.select, {
      fieldSettings: {
        className: 'address',
        section: 'contact-details-section'
      }
    }),
    '/contact-address-input-manual': contactAddressLookup.manual,
    '/invoice-contact-details': {
      fields: ['invoice-contact-name', 'invoice-contact-email', 'invoice-contact-phone'],
      locals: { section: 'invoice-details' },
      next: '/invoice-address-input'
    },
    '/invoice-address-input': Object.assign(invoiceAddressLookup.start, {
      formatAddress: address => addressFormatter(address)
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
      template: 'confirm',
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
        'survey-url': config.survey.urls.museums
      },
      backLink: false
    }
  }
};
