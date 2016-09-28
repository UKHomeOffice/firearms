'use strict';

const _ = require('lodash');
const controllers = require('hof').controllers;

const ammunition = req => _.includes(req.sessionModel.get('weapons-ammunition'), 'ammunition');

module.exports = {
  name: 'new-dealer',
  steps: {
    '/': {
      controller: controllers.start,
      next: '/company-name'
    },
    '/company-name': {
      fields: [
        'company',
        'company-name',
        'company-house-number',
        'sole-trader-name'
      ],
      next: '/handle',
      locals: {
        section: 'company-name'
      }
    },
    '/handle': {
      fields: [
        'weapons-ammunition'
      ],
      next: '/obtain',
      locals: {
        section: 'handle'
      }
    },
    '/obtain': {
      fields: [
        'obtain',
        'buy-details',
        'buy-import',
        'temporary-details',
        'other-means-details',
        'wont-take-details'
      ],
      next: '/storage',
      locals: {
        section: 'obtain'
      }
    },
    '/storage': {
      fields: [
        'stored-on-premises',
        'no-storage-details'
      ],
      next: '/usage',
      locals: {
        section: 'storage'
      }
    },
    '/usage': {
      fields: [
        'usage',
        'sell-details',
        'transport-details',
        'transfer-details',
        'training-details',
        'research-details',
        'other-details'
      ],
      next: '/supporting-docs',
      locals: {
        section: 'usage'
      }
    },
    '/supporting-docs': {
      next: 'weapons',
      forks: [{
        target: '/ammunition',
        condition: ammunition
      }]
    },
    '/weapons': {
      fields: [
        'weapon-types',
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
        'military-use-quantity',
        'projecting-launchers-quantity'
      ],
      next: '/authority-holders',
      forks: [{
        target: '/ammunition',
        condition: ammunition
      }],
      locals: {
        section: 'weapons',
        subsection: 'weapons-all-that-apply'
      }
    },
    '/ammunition': {
      next: '/authority-holders',
    },
    '/authority-holders': {

    }
  }
};
