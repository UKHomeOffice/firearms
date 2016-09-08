'use strict';

const bootstrap = require('hof-bootstrap');

bootstrap({
  views: false,
  fields: false,
  routes: [
    require('./apps/new-dealer')
  ]
});
