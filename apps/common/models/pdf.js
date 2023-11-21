'use strict';

const Model = require('hof').model;
const isPdf = require('is-pdf');
const config = require('../../../config');
const debug = require('debug')('pdf-model');
const _ = require('lodash');

module.exports = class PDFModel extends Model {
  requestConfig(options) {
    console.log("jdkshfkjs")
    console.log(options)
    const settings = super.requestConfig(options);
    settings.responseType = 'arraybuffer';
    settings.encoding = null;
    settings.rejectUnauthorized = false;
    console.log("settings><><><", settings)
    return settings;
  }

  url() {
    return config.pdf.url;
  }


  handleResponse(response, callback) {
    if (_.isPlainObject(response.data)) {
      debug('Response: %O', response.data);
    } else {
      debug('Response: %s', response.data);
    }
    if (isPdf(Buffer.from(response.data))) {
      return this.parseResponse(response.status, response.data, callback);
    }
    const err = new Error();
    if (parseInt(response.status, 10) === 400) {
      err.title = response.data.code;
      err.message = response.data.message;
    } else {
      err.body = response.data;
    }
    err.status = response.status;
    return callback(err, null, response.status);
  }
};
