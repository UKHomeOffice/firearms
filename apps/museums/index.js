'use strict';

const config = require('../../config');
const _ = require('lodash');
const formatAddress = require('../common/behaviours/format-address');
const getPageCustomBackLink = require('../common/behaviours/custom-back-links.js');
const existingAuthorityBehaviour = require('../common/behaviours/existing-authority-documents-add');
const AddressSelect = require('./controllers/contact-address-select');

const Submission = require('../common/behaviours/casework-submission');
const submission = Submission({
  prepare: require('./models/submission')
});

const pdf = require('../common/behaviours/pdf-upload');

const templateId = config.govukNotify.templateMuseum;
const replyTo = config.govukNotify.emailReplyToDefault;
const sendEmail = require('../common/behaviours/send-email')({
  templateId: templateId,
  recipient: 'contact-email',
  nameKey: 'contact-name',
  replyTo: replyTo
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
      behaviours: getPageCustomBackLink('activity'),
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
      behaviours: [existingAuthorityBehaviour, getPageCustomBackLink('existing-authority')],
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
    '/exhibit-address': {
      behaviours: formatAddress('exhibit', 'exhibit-address'),
      fields: ['exhibit-building', 'exhibit-street', 'exhibit-townOrCity', 'exhibit-postcodeOrZIPCode'],
      locals: { section: 'exhibit-details-details' },
      fieldSettings: { className: 'address' },
      next: '/exhibit-add-another-address',
      continueOnEdit: true
    },
    '/exhibit-add-another-address': {
      controller: require('./controllers/exhibit-address-loop'),
      template: 'add-another-address-loop.html',
      next: '/contact-name',
      returnTo: '/exhibit-address',
      aggregateTo: 'exhibit-addresses',
      aggregateFields: [
        'exhibit-building',
        'exhibit-street',
        'exhibit-townOrCity',
        'exhibit-postcodeOrZIPCode',
        'exhibit-address'
      ],
      fieldSettings: {
        isPageHeading: true,
        legend: {
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
    '/contact-address-input': {
      behaviours: formatAddress('contact', 'contact-address'),
      fields: ['contact-building', 'contact-street', 'contact-townOrCity', 'contact-postcodeOrZIPCode'],
      locals: { section: 'contact-details-section' },
      fieldSettings: { className: 'address' },
      next: '/invoice-contact-details'
    },
    '/invoice-contact-details': {
      fields: ['invoice-contact-name', 'invoice-contact-email', 'invoice-contact-phone'],
      locals: { section: 'invoice-details' },
      next: '/invoice-address-input'
    },
    '/invoice-address-input': {
      behaviours: formatAddress('invoice', 'invoice-address'),
      fields: ['invoice-building', 'invoice-street', 'invoice-townOrCity', 'invoice-postcodeOrZIPCode'],
      locals: { section: 'invoice-details' },
      fieldSettings: { className: 'address' },
      next: '/purchase-order'
    },
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
      behaviours: ['complete', submission, sendEmail],
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
