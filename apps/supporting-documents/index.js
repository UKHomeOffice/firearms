'use strict';

const Submission = require('../common/behaviours/casework-submission');
const submission = Submission({
  prepare: require('./models/submission'),
  Model: require('../common/models/i-casework-documents')
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
      behaviours: ['complete', submission],
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    }
  }
};
