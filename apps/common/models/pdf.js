'use strict';

const {model: Model} = require('hof');
const isPdf = require('is-pdf');
const config = require('../../../config');
const debug = require('debug')('pdf-model');
const _ = require('lodash');

module.exports = class PDFModel extends Model {
  requestConfig(options) {
    const settings = super.requestConfig(options);
    settings.encoding = null;
    settings.rejectUnauthorized = false;
    settings.responseType = 'arraybuffer';
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
