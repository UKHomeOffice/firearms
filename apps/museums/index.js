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
      next: '/name'
    },
    '/name': {
      fields: ['name'],
      next: '/confirm',
      locals: {
        section: 'exhibit-details-section'
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
