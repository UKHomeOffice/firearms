'use strict';

const _ = require('lodash');
const config = require('../../config');
const formatAddress = require('../common/behaviours/format-address');
const getPageCustomBackLink = require('./behaviours/custom-back-links');
const existingAuthorityController = require('../common/controllers/existing-authority-documents-add-another');
const existingAuthorityBehaviour = require('../common/behaviours/existing-authority-documents-add');
const supportingDocumentsBehaviour = require('../common/behaviours/supporting-documents-add');
const resetUploadedDocuments = require('../common/behaviours/reset-on-change');
const renewOrVaryWarningBehaviour = require('./behaviours/renew-vary-warning');

const ammunition = req => _.includes(req.sessionModel.get('weapons-ammunition'), 'ammunition');
const weapons = req => _.includes(req.sessionModel.get('weapons-ammunition'), 'weapons');
const storedOnPremises = req => req.sessionModel.get('stored-on-premises') === 'true';

const Submission = require('../common/behaviours/casework-submission');
const submission = Submission({
  prepare: require('./models/submission')
});

const pdf = require('../common/behaviours/pdf-upload');
const templateId = config.govukNotify.templateSection5;
const replyTo = config.govukNotify.emailReplyToFirearms;
const getContactSendEmail = require('./behaviours/get-contact-send-email')({
  templateId: templateId,
  recipient: 'contact-email',
  nameKey: 'contact-holder',
  replyTo: replyTo
});

module.exports = {
  name: 'new-dealer',
  baseUrl: '/s5',
  params: '/:action?/:id?',
  steps: {
    '/privacy': {
      template: 'privacy',
      next: '/before-you-start'
    },
    '/before-you-start': {
      next: '/activity'
    },
    '/activity': {
      behaviours: resetUploadedDocuments({
        currentField: 'activity',
        fieldsForRemoval: [
          'existing-authority-documents',
          'supporting-documents'
        ]
      }),
      fields: [
        'activity'
      ],
      next: '/supporting-documents',
      forks: [{
        target: '/existing-authority',
        condition: req => {
          return _.includes(['vary', 'renew'], req.sessionModel.get('activity'));
        }
      }]
    },
    '/existing-authority': {
      behaviours: getPageCustomBackLink('existing-authority'),
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
      behaviours: [existingAuthorityBehaviour, getPageCustomBackLink('existing-authority-add-another')],
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
      next: '/supporting-documents'
    },
    '/supporting-documents': {
      behaviours: getPageCustomBackLink('supporting-documents'),
      controller: require('../common/controllers/supporting-documents'),
      fields: [
        'supporting-document-upload',
        'supporting-document-description'
      ],
      continueOnEdit: true,
      next: '/supporting-documents-add-another'
    },
    '/supporting-documents-add-another': {
      controller: require('../common/controllers/supporting-documents-add-another'),
      behaviours: [supportingDocumentsBehaviour, getPageCustomBackLink('supporting-documents-add-another')],
      fields: [
        'supporting-document-add-another'
      ],
      forks: [{
        target: '/supporting-documents',
        condition: {
          field: 'supporting-document-add-another',
          value: 'yes'
        }
      }],
      continueOnEdit: true,
      next: '/company-name'
    },
    '/company-name': {
      fields: [
        'organisation',
        'company-name',
        'company-house-number',
        'sole-trader-name',
        'shooting-club-name',
        'charity-name',
        'charity-number',
        'museum-name',
        'other-name'
      ],
      next: '/handle',
      locals: {
        section: 'business-details'
      }
    },
    '/handle': {
      behaviours: [renewOrVaryWarningBehaviour],
      fields: [
        'weapons-ammunition'
      ],
      next: '/obtain',
      locals: {
        renew: true,
        section: 'authority-details',
        step: 'handle'
      }
    },
    '/obtain': {
      behaviours: [renewOrVaryWarningBehaviour],
      fields: [
        'obtain',
        'other-means-details'
      ],
      next: '/import',
      locals: {
        renew: true,
        section: 'authority-details',
        step: 'obtain'
      }
    },
    '/import': {
      behaviours: [renewOrVaryWarningBehaviour],
      fields: [
        'import',
        'import-country'
      ],
      next: '/storage',
      locals: {
        renew: true,
        section: 'authority-details',
        step: 'import'
      }
    },
    '/storage': {
      behaviours: [renewOrVaryWarningBehaviour],
      fields: [
        'stored-on-premises',
        'no-storage-details'
      ],
      next: '/usage',
      forks: [{
        target: '/storage-address',
        condition(req) {
          return storedOnPremises(req);
        }
      }],
      locals: {
        renew: true,
        step: 'storage'
      }
    },
    '/storage-address': {
      behaviours: [formatAddress('storage', 'storage-address'), renewOrVaryWarningBehaviour],
      template: 'storage-address',
      fields: [
        'storage-building',
        'storage-street',
        'storage-townOrCity',
        'storage-postcodeOrZIPCode'
      ],
      locals: { section: 'storage-details', renew: true, step: 'storage-address'},
      fieldSettings: { className: 'address' },
      next: '/storage-add-another-address',
      backLinks: '/storage',
      continueOnEdit: true
    },
    '/storage-add-another-address': {
      template: 'storage-add-another-address',
      controller: require('./controllers/storage-address-loop'),
      next: '/usage',
      returnTo: '/storage-address',
      aggregateTo: 'storageAddresses',
      aggregateFields: [
        'storage-building',
        'storage-street',
        'storage-townOrCity',
        'storage-postcodeOrZIPCode',
        'storage-address'
      ],
      fieldSettings: {
        isPageHeading: true
      },
      locals: { section: 'storage-details', renew: true, step: 'storage-address'}
    },
    '/usage': {
      behaviours: [renewOrVaryWarningBehaviour],
      fields: [
        'usage',
        'other-details'
      ],
      next: '/ammunition',
      forks: [{
        target: '/weapons',
        condition: weapons
      }],
      locals: {
        renew: true,
        section: 'authority-details',
        step: 'usage'
      }
    },
    '/weapons': {
      template: 'weapons-ammunition.html',
      fields: [
        'weapons-types',
        'weapons-unspecified-details',
        'fully-automatic-quantity',
        'self-loading-quantity',
        'short-pistols-quantity',
        'short-self-loading-quantity',
        'large-revolvers-quantity',
        'rocket-launchers-quantity',
        'air-rifles-quantity',
        'fire-noxious-substance-quantity',
        'disguised-firearms-quantity',
        'military-use-rockets-quantity',
        'projecting-launchers-quantity'
      ],
      next: '/authority-holders',
      forks: [{
        target: '/ammunition',
        condition: ammunition
      }],
      locals: {
        weaponsOrAmmunition: 'weapons'
      }
    },
    '/ammunition': {
      template: 'weapons-ammunition.html',
      fields: [
        'ammunition-types',
        'ammunition-unspecified-details',
        'explosive-cartridges-quantity',
        'incendiary-missile-quantity',
        'armour-piercing-quantity',
        'expanding-missile-quantity',
        'missiles-for-above-quantity'
      ],
      next: '/authority-holders',
      locals: {
        weaponsOrAmmunition: 'ammunition'
      }
    },
    '/authority-holders': {
      behaviours: [renewOrVaryWarningBehaviour],
      fields: [
        'authority-holders'
      ],
      next: '/first-authority-holders-name',
      locals: {
        renew: true,
        step: 'authority-holders'
      }
    },
    '/first-authority-holders-name': {
      fields: [
        'first-authority-holders-name'
      ],
      next: '/first-authority-holders-birth',
      locals: {
        section: 'first-authority-holder'
      }
    },
    '/first-authority-holders-birth': {
      fields: [
        'first-authority-dob',
        'first-authority-town-birth',
        'first-authority-country-birth'
      ],
      next: '/first-authority-holders-nationality',
      locals: {
        key: 'first-authority-country-birth',
        section: 'first-authority-holder'
      }
    },
    '/first-authority-holders-nationality': {
      template: 'authority-holders-nationality.html',
      controller: require('./controllers/authority-holders-nationality'),
      fields: [
        'first-authority-holders-nationality',
        'first-authority-holders-nationality-multi',
        'first-authority-holders-nationality-second',
        'first-authority-holders-nationality-third'
      ],
      next: '/first-authority-holders-address',
      locals: {
        key: 'first-authority-holders-nationality',
        section: 'first-authority-holder'
      }
    },
    '/first-authority-holders-address': {
      behaviours: formatAddress('first-authority-holders', 'first-authority-holders-address-manual'),
      fields: [
        'first-authority-holders-building',
        'first-authority-holders-street',
        'first-authority-holders-townOrCity',
        'first-authority-holders-postcodeOrZIPCode'
      ],
      locals: {
        step: '/first-authority-holders-address',
        field: 'first-authority-holders-address-manual',
        useOriginalValue: true,
        section: 'first-authority-holder'
      },
      fieldSettings: { className: 'address' },
      next: '/contact',
      forks: [{
        target: '/second-authority-holders-name',
        condition(req) {
          return req.sessionModel.get('authority-holders') === 'two';
        }
      }]
    },
    '/second-authority-holders-name': {
      fields: [
        'second-authority-holders-name'
      ],
      next: '/second-authority-holders-birth',
      locals: {
        section: 'second-authority-holder'
      }
    },
    '/second-authority-holders-birth': {
      fields: [
        'second-authority-dob',
        'second-authority-town-birth',
        'second-authority-country-birth'
      ],
      next: '/second-authority-holders-nationality',
      locals: {
        key: 'second-authority-country-birth',
        section: 'second-authority-holder'
      }
    },
    '/second-authority-holders-nationality': {
      template: 'authority-holders-nationality.html',
      controller: require('./controllers/authority-holders-nationality'),
      fields: [
        'second-authority-holders-nationality',
        'second-authority-holders-nationality-multi',
        'second-authority-holders-nationality-second',
        'second-authority-holders-nationality-third'
      ],
      next: '/second-authority-holders-address',
      locals: {
        key: 'second-authority-holders-nationality',
        section: 'second-authority-holder'
      }
    },
    '/second-authority-holders-address': {
      behaviours: formatAddress('second-authority-holders', 'second-authority-holders-address-manual'),
      fields: [
        'second-authority-holders-building',
        'second-authority-holders-street',
        'second-authority-holders-townOrCity',
        'second-authority-holders-postcodeOrZIPCode'
      ],
      locals: {
        field: 'second-authority-holders-address-manual',
        section: 'second-authority-holder'
      },
      fieldSettings: { className: 'address' },
      next: '/contact'
    },
    '/contact': {
      behaviours: [renewOrVaryWarningBehaviour],
      fields: [
        'contact-holder',
        'someone-else-name'
      ],
      controller: require('./controllers/contact'),
      next: '/contact-details',
      locals: {
        renew: true,
        section: 'contacts-details',
        step: 'contact'
      },
      continueOnEdit: true
    },
    '/contact-details': {
      fields: [
        'contact-email',
        'contact-phone'
      ],
      next: '/authority-holder-contact-postcode',
      forks: [{
        target: '/contact-address',
        condition(req) {
          return req.sessionModel.get('contact-holder') === 'other';
        }
      }],
      locals: {
        section: 'contacts-details'
      },
      continueOnEdit: true
    },
    '/authority-holder-contact-postcode': {
      fields: [
        'use-different-address'
      ],
      next: '/authority-holder-contact-address',
      forks: [{
        target: '/invoice-contact-details',
        condition: {
          field: 'use-different-address',
          value: 'false'
        }
      }, {
        target: '/authority-holder-contact-address',
        condition(req) {
          const addresses = req.sessionModel.get('authority-holder-contact-addresses');
          return addresses && addresses.length;
        }
      }],
      locals: {
        field: 'authority-holder-contact',
        section: 'contacts-details'
      }
    },
    '/authority-holder-contact-address': {
      behaviours: formatAddress('authority-holder-contact', 'authority-holder-contact-address-manual'),
      template: 'address.html',
      fields: [
        'authority-holder-contact-building',
        'authority-holder-contact-street',
        'authority-holder-contact-townOrCity',
        'authority-holder-contact-postcodeOrZIPCode'
      ],
      locals: { section: 'contacts-details', field: 'authority-holder-contact-address-manual' },
      fieldSettings: { className: 'address' },
      next: '/invoice-contact-details'
    },
    '/contact-address': {
      behaviours: formatAddress('contact', 'contact-address-manual'),
      fields: ['contact-building', 'contact-street', 'contact-townOrCity', 'contact-postcodeOrZIPCode'],
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
      controller: require('./controllers/confirm'),
      fieldsConfig: require('./fields'),
      behaviours: [pdf],
      next: '/declaration'
    },
    '/declaration': {
      template: 'declaration',
      behaviours: ['complete', submission, getContactSendEmail],
      next: '/confirmation'
    },
    '/confirmation': {
      locals: {
        'survey-url': config.survey.urls['new-dealer']
      },
      backLink: false
    }
  }
};
