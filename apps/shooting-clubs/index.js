'use strict';

const config = require('../../config');
const _ = require('lodash');

const formatAddress = require('../common/behaviours/format-address');
const getPageCustomBackLink = require('../common/behaviours/custom-back-links.js');
const existingAuthorityController = require('../common/controllers/existing-authority-documents-add-another');
const existingAuthorityBehaviour = require('../common/behaviours/existing-authority-documents-add');
const Submission = require('../common/behaviours/casework-submission');
const submission = Submission({
  prepare: require('./models/submission')
});

const pdf = require('../common/behaviours/pdf-upload');
const templateId = config.govukNotify.templateShootingClub;
const replyTo = config.govukNotify.emailReplyToDefault;
const sendEmail = require('../common/behaviours/send-email')({
  templateId: templateId,
  recipient: 'club-secretary-email',
  nameKey: 'club-secretary-name',
  replyTo: replyTo
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
      controller: existingAuthorityController,
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
      next: '/club-name'
    },
    '/club-name': {
      fields: [
        'club-name'
      ],
      locals: { section: 'club-details' },
      next: '/club-address'
    },
    '/club-address': {
      behaviours: formatAddress('club', 'club-address'),
      fields: ['club-building', 'club-street', 'club-townOrCity', 'club-postcodeOrZIPCode'],
      locals: { section: 'club-details' },
      fieldSettings: { className: 'address' },
      next: '/club-secretary-name'
    },
    '/club-secretary-name': {
      fields: [
        'club-secretary-name'
      ],
      locals: { section: 'club-secretary-details' },
      next: '/club-secretary-address'
    },
    '/club-secretary-address': {
      behaviours: formatAddress('club-secretary', 'club-secretary-address'),
      fields: [
        'club-secretary-building',
        'club-secretary-street',
        'club-secretary-townOrCity',
        'club-secretary-postcodeOrZIPCode'
      ],
      locals: { section: 'club-secretary-details' },
      fieldSettings: { className: 'address' },
      next: '/club-secretary-email'
    },
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
    '/second-contact-address': {
      behaviours: formatAddress('second-contact', 'second-contact-address'),
      fields: [
        'second-contact-building',
        'second-contact-street',
        'second-contact-townOrCity',
        'second-contact-postcodeOrZIPCode'
      ],
      locals: { section: 'second-contact-details' },
      fieldSettings: { className: 'address' },
      next: '/second-contact-email'
    },
    '/second-contact-email': {
      fields: [
        'second-contact-email',
        'second-contact-phone'
      ],
      locals: { section: 'club-second-contact' },
      next: '/location-address'
    },
    '/location-address': {
      behaviours: formatAddress('location', 'location-address'),
      fields: ['location-building', 'location-street', 'location-townOrCity', 'location-postcodeOrZIPCode'],
      locals: { section: 'location-details' },
      fieldSettings: { className: 'address' },
      next: '/location-address-category'
    },
    '/location-address-category': {
      template: 'location-address-category.html',
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
        'location-building',
        'location-street',
        'location-townOrCity',
        'location-postcodeOrZIPCode',
        'location-address',
        'location-address-category'
      ],
      fieldSettings: {
        isPageHeading: true
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
        'storage-building',
        'storage-street',
        'storage-townOrCity',
        'storage-postcodeOrZIPCode',
        'storage-address'
      ],
      fieldSettings: {
        isPageHeading: true
      }
    },
    '/storage-address-add': {
      behaviours: formatAddress('storage', 'storage-address'),
      fields: [
        'storage-building',
        'storage-street',
        'storage-townOrCity',
        'storage-postcodeOrZIPCode'
      ],
      locals: { section: 'storage-details' },
      fieldSettings: { className: 'address' },
      next: '/storage-add-another-address',
      continueOnEdit: true
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
        'survey-url': config.survey.urls['shooting-clubs']
      },
      backLink: false
    }
  }
};
