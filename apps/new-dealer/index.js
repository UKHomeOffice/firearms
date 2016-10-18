'use strict';

const _ = require('lodash');
const controllers = require('hof').controllers;

const ammunition = req => _.includes(req.sessionModel.get('weapons-ammunition'), 'ammunition');
const weapons = req => _.includes(req.sessionModel.get('weapons-ammunition'), 'weapons');
const storedOnPremises = req=> req.sessionModel.get('stored-on-premises') === 'true';

module.exports = {
  name: 'new-dealer',
  params: '/:action?',
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
      next: '/ammunition',
      forks: [{
        target: '/storage-weapons-ammo',
        condition(req) {
          const stored = storedOnPremises(req);
          const weaponsAndAmmo = weapons(req) && ammunition(req);
          return stored && weaponsAndAmmo;
        }
      }, {
        target: '/storage-address',
        condition(req) {
          const stored = storedOnPremises(req);
          const weaponsAndAmmo = weapons(req) && ammunition(req);
          return stored && !weaponsAndAmmo;
        }
      }, {
        target: '/weapons',
        condition(req) {
          const stored = storedOnPremises(req);
          return !stored && weapons(req);
        }
      }]
    },
    '/storage-weapons-ammo': {
      fields: [
        'storage-weapons-ammo'
      ],
      next: '/storage-address',
      locals: {
        section: 'storage-weapons-ammo'
      }
    },
    '/storage-address': {
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
        section: 'ammunition',
        subsection: 'ammunition-all-that-apply'
      }
    },
    '/authority-holders': {
      fields: [
        'authority-holders'
      ],
      next: '/first-authority-holders-name',
      locals: {
        section: 'authority-holders'
      }
    },
    '/first-authority-holders-name': {
      fields: [
        'first-authority-holders-name'
      ],
      next: '/first-authority-holders-birth',
      locals: {
        section: 'first-authority-holders-name'
      }
    },
    '/first-authority-holders-birth': {
      controller: require('./controllers/first-authority-holders-birth'),
      fields: [
        'first-authority-dob',
        'first-authority-dob-day',
        'first-authority-dob-month',
        'first-authority-dob-year',
        'first-authority-town-birth',
        'first-authority-country-birth'
      ],
      next: '/first-authority-holders-nationality',
      locals: {
        section: 'first-authority-holders-birth'
      }
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
        section: 'first-authority-holders-nationality'
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
          const addresses = req.sessionModel.get('addresses');
          return addresses && addresses.length;
        }
      }],
      locals: {
        section: 'first-authority-holders-address',
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
        section: 'first-authority-holders-address',
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
        section: 'first-authority-holders-address',
        field: 'first-authority-holders'
      }
    },
    '/second-authority-holders-name': {
      fields: [
        'second-authority-holders-name'
      ],
      next: '/second-authority-holders-birth',
      locals: {
        section: 'second-authority-holders-name'
      }
    },
    '/second-authority-holders-birth': {
      controller: require('./controllers/second-authority-holders-birth'),
      fields: [
        'second-authority-dob',
        'second-authority-dob-day',
        'second-authority-dob-month',
        'second-authority-dob-year',
        'second-authority-town-birth',
        'second-authority-country-birth'
      ],
      next: '/second-authority-holders-nationality',
      locals: {
        section: 'second-authority-holders-birth'
      }
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
        section: 'second-authority-holders-nationality'
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
          const addresses = req.sessionModel.get('addresses');
          return addresses && addresses.length;
        }
      }],
      locals: {
        section: 'second-authority-holders-address',
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
        section: 'second-authority-holders-address',
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
        section: 'second-authority-holders-address',
        field: 'second-authority-holders'
      }
    },
    '/contact': {
      fields: [
        'contact-holder',
        'someone-else-name'
      ],
      controller: require('./controllers/contact'),
      locals: {
        section: 'contact'
      },
      next: '/contact-details'
    }
  }
};
