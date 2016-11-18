'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'obtain',
  'obtain-group': '#obtain-group',
  buy: '#obtain-buy',
  'temporary-possession': '#obtain-temporary-possession',
  manufacture: '#obtain-manufacture',
  'other-means': '#obtain-other-means',
  'wont-take-possession': '#obtain-wont-take-possession',
  'important-icon': {css: '.icon-important'},

  'further-details': {
    buy: '#buy-details',
    'temporary-possession': '#temporary-details',
    'other-means': '#other-means-details',
    'wont-take-possession': '#wont-take-details'
  },

  content: {
    buy: 'I bought some guns'
  },

  checkboxTogglesField(checkbox, field) {
    I.click(checkbox);
    I.seeElements(field);
  },

  toggledFieldShowsError(checkbox, field) {
    I.click(checkbox);
    I.submitForm();
    I.seeErrors(field);
  },

  fillFormAndSubmit() {
    I.click(this.buy);
    I.submitForm();
  }
};
