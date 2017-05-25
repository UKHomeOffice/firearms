'use strict';

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
    require('./apps/museums'),
    require('./apps/new-dealer'),
    require('./apps/shooting-clubs'),
    require('./apps/supporting-documents')
  ],
  baseController: BaseController,
  behaviours: [superclass => class extends superclass {
    _checkEmpty(req, res, next) {
      next();
    }
  }],
  start: false,
  redis: config.redis
};

const app = bootstrap(options);
if (config.env === 'ci' || config.env === 'development') {
  app.use(mockAPIs);
}
app.use(bodyParser({limit: config.upload.maxfilesize}));

app.start();
