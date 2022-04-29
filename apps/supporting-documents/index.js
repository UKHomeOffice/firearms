'use strict';

const GetCase = require('./behaviours/get-case');
const CheckEmail = require('./behaviours/check-email');
const config = require('../../config');

const Submission = require('../common/behaviours/casework-submission');
const submission = Submission({
  prepare: require('./models/submission'),
  Model: require('../common/models/i-casework-documents')
});

const templateId = config.govukNotify.templateSupportingDocuments;
const sendEmail = require('../common/behaviours/send-email')({
  templateId: templateId,
  recipient: 'original-email',
  nameKey: 'original-name'
});


module.exports = {
  name: 'supporting-documents',
  baseUrl: '/supporting-documents',
  params: '/:action?/:id?',
  steps: {
    '/reference': {
      fields: [
        'reference-number'
      ],
      behaviours: [GetCase],
      next: '/email'
    },
    '/email': {
      fields: ['email'],
      behaviours: [CheckEmail],
      next: '/supporting-documents'
    },
    '/supporting-documents': {
      controller: require('../common/controllers/supporting-documents'),
      fields: [
        'supporting-document-upload',
        'supporting-document-description'
      ],
      continueOnEdit: true,
      next: '/supporting-documents-add'
    },
    '/supporting-documents-add': {
      template: 'supporting-documents-add-another',
      controller: require('../common/controllers/supporting-documents-add-another'),
      behaviours: [require('./behaviours/supporting-documents-add')],
      fields: [
        'supporting-document-add-another'
      ],
      forks: [{
        isLoop: true,
        target: '/supporting-documents',
        condition: {
          field: 'supporting-document-add-another',
          value: 'yes'
        }
      }],
      continueOnEdit: true,
      next: '/confirm'
    },
    '/confirm': {
      behaviours: require('hof').components.summary,
      next: '/declaration',
      sections: {
        reference: ['reference-number', 'email'],
        documents: [
          {
            field: 'supporting-documents',
            parse: list => list.map(a => a.description).join('\n'),
            step: '/supporting-documents-add'
          }
        ]
      }
    },
    '/declaration': {
      template: 'declaration',
      behaviours: ['complete', submission, sendEmail],
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    }
  }
};
