'use strict';

const Model = require('hof-model');
const isPdf = require('is-pdf');
const config = require('../../../config');

module.exports = class PDFModel extends Model {

  requestConfig(options) {
    const settings = super.requestConfig(options);
    settings.encoding = null;
    return settings;
  }

  url() {
    return config.pdf.url;
  }

  handleResponse(response, callback) {
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
    callback(err, null, response.statusCode);
  }

};
