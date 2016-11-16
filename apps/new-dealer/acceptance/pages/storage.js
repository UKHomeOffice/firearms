'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'storage',
  'storage-group': '#stored-on-premises-group',
  yes: '#stored-on-premises-true',
  no: '#stored-on-premises-false',
  'no-details': '#no-storage-details',
  'important-icon': {css: '.icon-important'},

  pageShowsCompanyOrTrader(isCompany){
    I.see(this.getHeaderTranslations('weapons', isCompany));
  }
};
