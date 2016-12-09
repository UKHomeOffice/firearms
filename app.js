'use strict';

const _ = require('lodash');
const path = require('path');
const bootstrap = require('hof-bootstrap');
const config = require('./config.js');
const mockPostcode = require('./mock-postcode.js');
const BaseController = require('./apps/common/controllers/base');

const options = {
  views: path.resolve(__dirname, './apps/common/views'),
  fields: path.resolve(__dirname, './apps/common/fields'),
  routes: [
    require('./apps/new-dealer'),
    require('./apps/shooting-clubs')
  ],
  baseController: BaseController
};

if (config.env === 'ci') {
  options.routes.unshift({
    name: 'common',
    params: '/:action?',
    steps: _.mapValues(Object.assign({}, require('./apps/common'), {
      '/empty': {}
    }), value => Object.assign(value, {next: '/blank'}))
  });

  options.middleware = [
    mockPostcode
  ];
}

bootstrap(options);
