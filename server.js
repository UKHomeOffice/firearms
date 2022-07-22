'use strict';

const path = require('path');
const hof = require('hof');
const bodyParser = require('busboy-body-parser');
const config = require('./config.js');
const mockAPIs = require('./mock-apis.js');
const BaseController = require('./apps/common/controllers/base');


let appName = '';

let settings = require('./hof.settings');

settings = Object.assign({}, settings, {
  routes: settings.routes.map(require),
  fields: path.resolve(__dirname, settings.fields),
  views: settings.views.map(view => path.resolve(__dirname, view)),
  baseController: BaseController,
  behaviours: [superclass => class extends superclass {
    _checkEmpty(req, res, next) {
      next();
    }
  }, require('hof/components/clear-session')
  ],
  redis: config.redis,
  getCookies: false,
  getAccessibility: false,
  getTerms: false
});

const app = hof(settings);

app.use((req, res, next) => {
  // Set HTML Language
  res.locals.htmlLang = 'en';
  res.locals.appName = appName;
  // Set feedback and footer links
  res.locals.feedbackUrl = config.survey.urls.root;
  next();
});

// Set feedback and phase banner on cookies, accessibility and terms pages
// along with the getTerms: false, getCookies: false, getAccessibility: false config
app.use('/cookies', (req, res, next) => {
  res.locals = Object.assign({}, res.locals, req.translate('cookies'));
  next();
});

app.use('/accessibility', (req, res, next) => {
  res.locals = Object.assign({}, res.locals, req.translate('accessibility'));
  next();
});

app.use('/terms-and-conditions', (req, res, next) => {
  res.locals = Object.assign({}, res.locals, req.translate('terms'));
  next();
});

// set appName to appear on the cookie banner for each service
app.use('/s5', (req, res, next) => {
  res.locals.appName = 'Prohibited weapons and ammunition licensing';
  appName = res.locals.appName;
  res.locals.feedbackUrl = config.survey.urls['new-dealer'];
  next();
});

app.use('/museums', (req, res, next) => {
  res.locals.appName = 'Apply for Museum Firearms Licence';
  appName = res.locals.appName;
  res.locals.feedbackUrl = config.survey.urls.museums;
  next();
});

app.use('/shooting-clubs', (req, res, next) => {
  res.locals.appName = 'Apply for Shooting Club Approval';
  appName = res.locals.appName;
  res.locals.feedbackUrl = config.survey.urls['shooting-clubs'];
  next();
});

app.use('/supporting-documents', (req, res, next) => {
  res.locals.appName = 'Submit Supporting Documents';
  appName = res.locals.appName;
  res.locals.feedbackUrl = config.survey.urls['supporting-documents'];
  next();
});

if (!config.env || config.env === 'ci') {
  app.use(mockAPIs);
}

app.use(bodyParser({limit: config.upload.maxfilesize}));

module.exports = app;
