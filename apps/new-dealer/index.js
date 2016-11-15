'use strict';

const _ = require('lodash');
const controllers = require('hof').controllers;

const ammunition = req => _.includes(req.sessionModel.get('weapons-ammunition'), 'ammunition');
const weapons = req => _.includes(req.sessionModel.get('weapons-ammunition'), 'weapons');
const storedOnPremises = req=> req.sessionModel.get('stored-on-premises') === 'true';

module.exports = {
  name: 'new-dealer',
  params: '/:action?/:id?',
  steps: {
    '/': {
      controller: controllers.start,
      next: '/activity'
    },
    '/activity': {
      fields: [
        'activity'
      ],
      next: '/company-name',
      forks: [{
        target: '/authority-number-renew-vary',
        condition: {
          field: 'activity',
          value: 'renew'
        }
      }]
    },
    '/authority-number-renew-vary': {
      fields: [
        'authority-number',
        'reference-number'
      ],
      next: '/expiration-renew-vary'
    },
    '/expiration-renew-vary': {
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
        'other-specify'
      ],
      next: '/handle'
    },
    '/handle': {
      fields: [
        'weapons-ammunition'
      ],
      next: '/obtain'
    },
    '/obtain': {
      fields: [
        'obtain',
        'other-means-details'
      ],
      next: '/import'
    },
    '/import': {
      fields: [
        'import',
        'import-country'
      ],
      next: '/storage'
    },
    '/storage': {
      fields: [
        'stored-on-premises',
        'no-storage-details'
      ],
      next: '/usage'
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
      next: '/supporting-docs'
    },
    '/supporting-docs': {
      next: '/ammunition',
      forks: [{
        target: '/storage-postcode',
        condition(req) {
          return storedOnPremises(req);
        }
      }, {
        target: '/weapons',
        condition(req) {
          return !storedOnPremises(req) && weapons(req);
        }
      }]
    },
    '/storage-postcode': {
      controller: require('./controllers/storage-postcode'),
      fields: [
        'storage-postcode'
      ],
      next: '/storage-address',
      continueOnEdit: true,
      forks: [{
        target: '/storage-address-lookup',
        condition(req) {
          const addresses = req.sessionModel.get('storage-addresses');
          return addresses && addresses.length;
        }
      }],
      locals: {
        field: 'storage'
      }
    },
    '/storage-address-lookup': {
      controller: require('./controllers/storage-address-lookup'),
      fields: [
        'storage-address-lookup'
      ],
      next: '/storage-add-another-address',
      continueOnEdit: true,
      locals: {
        field: 'storage'
      }
    },
    '/storage-address': {
      controller: require('./controllers/storage-address'),
      fields: [
        'storage-address-manual'
      ],
      prereqs: ['/storage-postcode', '/supporting-docs'],
      backLink: 'storage-postcode',
      next: '/storage-add-another-address',
      continueOnEdit: true,
      locals: {
        field: 'storage'
      }
    },
    '/storage-add-another-address': {
      controller: require('./controllers/storage-add-another-address'),
      fields: [
        'storage-add-another-address'
      ],
      next: '/ammunition',
      forks: [{
        target: '/storage-postcode',
        condition: {
          field: 'storage-add-another-address',
          value: 'yes'
        }
      }, {
        target: '/weapons',
        condition(req) {
          const noMoreAddresses = req.form.values['storage-add-another-address'] === 'no';
          return noMoreAddresses && weapons(req);
        }
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
        section: 'weapons'
      }
    },
    '/ammunition': {
      fields: [
        'ammunition-types',
        'ammunition-unspecified-details',
        'explosive-cartridges-quantity',
        'incendiary-missile-quantity',
        'armour-piercing-quantity',
        'expanding-missile-quantity',
        'missiles-for-above-quantity'
      ],
      next: '/authority-holders'
    },
    '/authority-holders': {
      fields: [
        'authority-holders'
      ],
      next: '/first-authority-holders-name'
    },
    '/first-authority-holders-name': {
      fields: [
        'first-authority-holders-name'
      ],
      next: '/first-authority-holders-birth'
    },
    '/first-authority-holders-birth': {
      controller: controllers.date,
      dateKey: 'first-authority-dob',
      fields: [
        'first-authority-dob',
        'first-authority-dob-day',
        'first-authority-dob-month',
        'first-authority-dob-year',
        'first-authority-town-birth',
        'first-authority-country-birth'
      ],
      next: '/first-authority-holders-nationality'
    },
    '/first-authority-holders-nationality': {
      controller: require('./controllers/authority-holders-nationality'),
      fields: [
        'first-authority-holders-nationality',
        'first-authority-holders-nationality-multi',
        'first-authority-holders-nationality-second',
        'first-authority-holders-nationality-third',
      ],
      next: '/first-authority-holders-postcode',
      locals: {
        key: 'first-authority-holders-nationality'
      }
    },
    '/first-authority-holders-postcode': {
      template: 'postcode.html',
      controller: require('./controllers/postcode'),
      fields: [
        'first-authority-holders-postcode'
      ],
      next: '/first-authority-holders-address',
      forks: [{
        target: '/first-authority-holders-address-lookup',
        condition(req) {
          const addresses = req.sessionModel.get('first-authority-holders-addresses');
          return addresses && addresses.length;
        }
      }],
      locals: {
        field: 'first-authority-holders'
      }
    },
    '/first-authority-holders-address-lookup': {
      template: 'address-lookup.html',
      controller: require('./controllers/address-lookup'),
      fields: [
        'first-authority-holders-address-lookup'
      ],
      next: '/contact',
      forks: [{
        target: '/second-authority-holders-name',
        condition(req) {
          return req.sessionModel.get('authority-holders') === 'two';
        }
      }],
      locals: {
        field: 'first-authority-holders'
      }
    },
    '/first-authority-holders-address': {
      template: 'address.html',
      controller: require('./controllers/address'),
      fields: [
        'first-authority-holders-address-manual'
      ],
      next: '/contact',
      prereqs: ['/first-authority-holders-postcode', '/first-authority-holders-nationality'],
      backLink: 'first-authority-holders-postcode',
      forks: [{
        target: '/second-authority-holders-name',
        condition(req) {
          return req.sessionModel.get('authority-holders') === 'two';
        }
      }],
      locals: {
        field: 'first-authority-holders'
      }
    },
    '/second-authority-holders-name': {
      fields: [
        'second-authority-holders-name'
      ],
      next: '/second-authority-holders-birth'
    },
    '/second-authority-holders-birth': {
      controller: controllers.date,
      dateKey: 'second-authority-dob',
      fields: [
        'second-authority-dob',
        'second-authority-dob-day',
        'second-authority-dob-month',
        'second-authority-dob-year',
        'second-authority-town-birth',
        'second-authority-country-birth'
      ],
      next: '/second-authority-holders-nationality'
    },
    '/second-authority-holders-nationality': {
      controller: require('./controllers/authority-holders-nationality'),
      fields: [
        'second-authority-holders-nationality',
        'second-authority-holders-nationality-multi',
        'second-authority-holders-nationality-second',
        'second-authority-holders-nationality-third',
      ],
      next: '/second-authority-holders-postcode',
      locals: {
        key: 'second-authority-holders-nationality'
      }
    },
    '/second-authority-holders-postcode': {
      template: 'postcode.html',
      controller: require('./controllers/postcode'),
      fields: [
        'second-authority-holders-postcode'
      ],
      next: '/second-authority-holders-address',
      forks: [{
        target: '/second-authority-holders-address-lookup',
        condition(req) {
          const addresses = req.sessionModel.get('second-authority-holders-addresses');
          return addresses && addresses.length;
        }
      }],
      locals: {
        field: 'second-authority-holders'
      }
    },
    '/second-authority-holders-address-lookup': {
      template: 'address-lookup.html',
      controller: require('./controllers/address-lookup'),
      fields: [
        'second-authority-holders-address-lookup'
      ],
      next: '/contact',
      locals: {
        field: 'second-authority-holders'
      }
    },
    '/second-authority-holders-address': {
      template: 'address.html',
      controller: require('./controllers/address'),
      fields: [
        'second-authority-holders-address-manual'
      ],
      next: '/contact',
      prereqs: ['/second-authority-holders-postcode', '/second-authority-holders-nationality'],
      backLink: 'second-authority-holders-postcode',
      locals: {
        field: 'second-authority-holders'
      }
    },
    '/contact': {
      fields: [
        'contact-holder',
        'someone-else-name'
      ],
      controller: require('./controllers/contact'),
      next: '/contact-details'
    },
    '/contact-details': {
      fields: [
        'contact-email',
        'contact-phone'
      ],
      next: '/authority-holder-contact-postcode',
      forks: [{
        target: '/contact-postcode',
        condition(req) {
          return req.sessionModel.get('contact-holder') === 'other';
        }
      }]
    },
    '/authority-holder-contact-postcode': {
      controller: require('./controllers/postcode'),
      fields: [
        'use-different-address',
        'authority-holder-contact-postcode'
      ],
      next: '/authority-holder-contact-address',
      forks: [{
        target: '/summary',
        condition: {
          field: 'use-different-address',
          value: 'false'
        }
      }, {
        target: '/authority-holder-contact-address-lookup',
        condition(req) {
          const addresses = req.sessionModel.get('authority-holder-contact-addresses');
          return addresses && addresses.length;
        }
      }],
      locals: {
        field: 'authority-holder-contact'
      }
    },
    '/authority-holder-contact-address-lookup': {
      template: 'address-lookup.html',
      controller: require('./controllers/address-lookup'),
      fields: [
        'authority-holder-contact-address-lookup'
      ],
      next: '/summary',
      locals: {
        field: 'authority-holder-contact'
      }
    },
    '/authority-holder-contact-address': {
      template: 'address.html',
      controller: require('./controllers/address'),
      fields: [
        'authority-holder-contact-address-manual'
      ],
      next: '/summary',
      prereqs: ['/authority-holder-contact-postcode', '/contact-details'],
      backLink: 'authority-holder-contact-postcode',
      locals: {
        field: 'authority-holder-contact'
      }
    },
    '/contact-postcode': {
      template: 'postcode.html',
      controller: require('./controllers/postcode'),
      fields: [
        'contact-postcode'
      ],
      next: '/contact-address',
      forks: [{
        target: '/contact-address-lookup',
        condition(req) {
          const addresses = req.sessionModel.get('contact-addresses');
          return addresses && addresses.length;
        }
      }],
      locals: {
        field: 'contact'
      }
    },
    '/contact-address-lookup': {
      template: 'address-lookup.html',
      controller: require('./controllers/address-lookup'),
      fields: [
        'contact-address-lookup'
      ],
      next: '/summary',
      locals: {
        field: 'contact'
      }
    },
    '/contact-address': {
      template: 'address.html',
      controller: require('./controllers/address'),
      fields: [
        'contact-address-manual'
      ],
      next: '/summary',
      prereqs: ['/contact-postcode', '/contact-details'],
      backLink: 'contact-postcode',
      locals: {
        field: 'contact'
      }
    },
    '/summary': {
      clearSession: false
    }
  }
};
