'use strict';

const Model = require('hof-model');
const config = require('../../../config');

module.exports = class PDFModel extends Model {

  url() {
    return config.pdf.url;
  }

  handleResponse(response, callback) {
    try {
      JSON.parse(response.body || '{}');
      let err = new Error();
      err.body = response.body;
      err.status = response.statusCode;
      return callback(err, null, response.statusCode);
    } catch (err) {
      this.parseResponse(response.statusCode, response.body, callback);
    }
  }

};
