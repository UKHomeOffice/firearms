'use strict';

const path = require('path');
const hof = require('hof');
const bodyParser = require('busboy-body-parser');
const config = require('./config.js');
const mockAPIs = require('./mock-apis.js');
const BaseController = require('./apps/common/controllers/base');

let serviceName = '';

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
  getCookies: false,
  start: false,
  redis: config.redis
};

const addGenericLocals = (req, res, next) => {
  // Set HTML Language
  res.locals.htmlLang = 'en';
  // Set feedback and footer links
  res.locals.serviceName = serviceName;
  res.locals.feedbackUrl = '/feedback';
  res.locals.footerSupportLinks = [
    { path: '/cookies', property: 'base.cookies' },
    { path: '/terms-and-conditions', property: 'base.terms' },
  ];
  next();
};

const app = hof(options);

app.use((req, res, next) => addGenericLocals(req, res, next));

// set serviceName to appear on the cookie banner for each service
app.use('/s5', (req, res, next) => {
  res.locals.serviceName = 'Prohibited weapons and ammunition licensing';
  serviceName = res.locals.serviceName;
  next();
});

app.use('/museums', (req, res, next) => {
  res.locals.serviceName = 'Apply for Museum Firearms Licence';
  serviceName = res.locals.serviceName;
  next();
});

app.use('/shooting-clubs', (req, res, next) => {
  res.locals.serviceName = 'Apply for Shooting Club Approval';
  serviceName = res.locals.serviceName;
  next();
});

if (config.env !== 'production') {
  app.use(mockAPIs);
}

app.use('/cookies', (req, res) => {
  res.locals = Object.assign({}, res.locals, req.translate('cookies'));
  res.render('cookies');
});

app.use(bodyParser({limit: config.upload.maxfilesize}));

app.start();
