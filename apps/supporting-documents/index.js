'use strict';

const path = require('path');

const GetCase = require('./behaviours/get-case');
const CheckEmail = require('./behaviours/check-email');

const Submission = require('../common/behaviours/casework-submission');
const submission = Submission({
  prepare: require('./models/submission'),
  Model: require('../common/models/i-casework-documents')
});

const Emailer = require('../common/behaviours/emailer');
const emailer = Emailer({
  template: path.resolve(__dirname, './emails/confirm.html'),
  recipient: 'original-email',
  subject: data => `Ref: ${data['reference-number']} - Supporting documents`,
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
      controller: require('hof-confirm-controller'),
      next: '/declaration',
      sections: {
        reference: ['reference-number'],
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
      behaviours: ['complete', submission, emailer],
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    }
  }
};
