'use strict';

const bootstrap = require('hof-bootstrap');

bootstrap({
  views: './apps/new-dealer/views/',
  fields: false,
  routes: [
    require('./apps/new-dealer')
  ]
});
