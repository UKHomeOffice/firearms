'use strict';

let I;

const items = [
  'Full names (and any previous names)',
  'Date and place of birth',
  'Nationalities',
  'Residential addresses covering the last 5 years',
  'Scanned copies of passports',
  'DBS certificate (optional) - must be no more than 4 months old'
];

module.exports = {

  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'confirmation',
  content: {
    email: 'SterlingArcher@SecretService.com'
  },

  showsArmGuardsContent() {
    I.seeEach(items);
  },

  doesntShowArmGuardsContent() {
    I.dontSeeEach(items);
  }
};
