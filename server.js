'use strict';

const path = require('path');
const hof = require('hof');
const bodyParser= require('busboy-body-parser');
const busboy = require('busboy');
const bytes = require('bytes');
const bl = require('bl');
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
  csp: {
    imgSrc: [
      'www.google-analytics.com',
      'ssl.gstatic.com',
      'www.google.co.uk/ads/ga-audiences'
    ],
    connectSrc: [
      'https://www.google-analytics.com',
      'https://region1.google-analytics.com',
      'https://region1.analytics.google.com'
    ]
  }
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

app.use((req, res, next) => {
  if (req.is('multipart/form-data')) {
    let bb;
    try {
      bb = busboy({
        headers: req.headers,
        limits: {
          fileSize: bytes('100mb')
        }
      });
    } catch (err) {
      return next(err);
    }
    bb.on('field', function (key, value) {
      req.body[key] = value;
    });

    bb.on('file', function (key, file, fileInfo) {
      file.pipe(bl(function (err, d) {
        if (err || !(d.length || fileInfo.filename)) {
          return;
        }
        const fileData = {
          data: file.truncated ? null : d,
          name: fileInfo.filename || null,
          encoding: fileInfo.encoding,
          mimetype: fileInfo.mimeType,
          truncated: file.truncated,
          size: file.truncated ? null : Buffer.byteLength(d, 'binary')
        };

        if (settings.multi) {
          req.files[key] = req.files[key] || [];
          req.files[key].push(fileData);
        } else {
          req.files[key] = fileData;
        }
      }));
    });

    let error;

    bb.on('error', function (err) {
      console.log("app err:::", err)
      error = err;
      next(err);
    });

    bb.on('finish', function () {
      if (error) {
        return;
      }
      next();
    });
    req.files = req.files || {};
    req.body = req.body || {};
    req.pipe(bb);
  } else {
    next();
  }
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
