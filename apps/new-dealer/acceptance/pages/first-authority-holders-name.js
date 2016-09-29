'use strict';

const TRANSLATIONS = require('../../translations/en/default');
const FIELDS = TRANSLATIONS.fields;
const PAGES = TRANSLATIONS.pages;

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'first-authority-holders-name',
  'holders-name': '#first-authority-holders-name',
  content: {
    'holders-name': 'Sterling Archer'
  },

  pageShowsCorrectAuthorityTranslations(authorityHolder){
    I.seeEach([
      PAGES['first-authority-holders-name'].header['authority-holders'][authorityHolder],
      FIELDS['first-authority-holders-name'].label['authority-holders'][authorityHolder]
    ])
  },

  fillFormAndSubmit(){
    I.fillField(this['holders-name'], this.content['holders-name']);
    I.submitForm();
  }
};
