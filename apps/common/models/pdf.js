'use strict';

const Model = require('hof-model');
const isPdf = require('is-pdf');
const config = require('../../../config');

module.exports = class PDFModel extends Model {

  url() {
    return config.pdf.url;
  }

  handleResponse(response, callback) {
    if (isPdf(Buffer.from(response.body))) {
      return this.parseResponse(response.statusCode, response.body, callback);
    }
    let err = new Error();
    err.body = response.body;
    err.status = response.statusCode;
    callback(err, null, response.statusCode);
  }

};
