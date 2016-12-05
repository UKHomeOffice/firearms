'use strict';

const pages = require('../../translations/en/default').pages;
let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'confirmation',
  content: {
    email: 'SterlingArcher@SecretService.com'
  },

  showsArmGuardsContent() {
    I.seeEach(pages.confirmation['armed-guards-list'].items);
  },

  doesntShowArmGuardsContent() {
    I.dontSeeEach(pages.confirmation['armed-guards-list'].items);
  }
};
