'use strict';

const Model = require('hof').model;
const isPdf = require('is-pdf');
const config = require('../../../config');
const debug = require('debug')('pdf-model');
const _ = require('lodash');

module.exports = class PDFModel extends Model {
  requestConfig(options) {
    console.debug("sdhiodshfiodshf")
    console.debug(options)
    const settings = super.requestConfig(options);
    settings.encoding = null;
    console.debug("settings: <><><><><<><>><><><", settings)
    return settings;
  }

  url() {
    return config.pdf.url;
  }

  handleResponse(response, callback) {
    if (_.isPlainObject(response.body)) {
      debug('Response: %O', response.body);
    } else {
      debug('Response: %s', response.body);
    }
    if (isPdf(Buffer.from(response.body))) {
      return this.parseResponse(response.statusCode, response.body, callback);
    }
    const err = new Error();
    if (parseInt(response.statusCode, 10) === 400) {
      err.title = response.body.code;
      err.message = response.body.message;
    } else {
      err.body = response.body;
    }
    err.status = response.statusCode;
    return callback(err, null, response.statusCode);
  }
};
