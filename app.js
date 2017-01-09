'use strict';

const _ = require('lodash');
const path = require('path');
const bootstrap = require('hof-bootstrap');
const bodyParser = require('busboy-body-parser');
const config = require('./config.js');
const mockAPIs = require('./mock-apis.js');
const BaseController = require('./apps/common/controllers/base');

const options = {
  views: path.resolve(__dirname, './apps/common/views'),
  fields: path.resolve(__dirname, './apps/common/fields'),
  routes: [
    require('./apps/new-dealer'),
    require('./apps/shooting-clubs')
  ],
  baseController: BaseController,
  start: false
};

if (config.env === 'ci') {
  options.routes.unshift({
    name: 'common',
    params: '/:action?',
    steps: _.mapValues(Object.assign({}, require('./apps/common'), {
      '/empty': {}
    }), value => Object.assign(value, {next: '/blank'}))
  });
}

const app = bootstrap(options);
if (config.env === 'ci' || config.env === 'development') {
  app.use(mockAPIs);
}
app.use(bodyParser());
app.start();
