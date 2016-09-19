'use strict';

const path = require('path');

const pagesPath = page => path.resolve(__dirname,
  `./apps/new-dealer/acceptance/pages/${page}`);

module.exports = {
  name: 'hmpo-enquiries',
  features: './**/acceptance/features/**/*.js',
  include: {
    companyNamePage: pagesPath('company-name.js'),
    handlePage: pagesPath('handle.js'),
    obtainPage: pagesPath('obtain.js')
  }
};
