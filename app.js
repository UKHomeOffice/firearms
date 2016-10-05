'use strict';

const bootstrap = require('hof-bootstrap');
const config = require('./config.js');
const mockPostcode = require('./mock-postcode.js');

const options = {
  views: false,
  fields: false,
  routes: [
    require('./apps/new-dealer')
  ]
};

if (config.env === 'ci') {
  options.middleware = [
    mockPostcode
  ];
}

bootstrap(options);
