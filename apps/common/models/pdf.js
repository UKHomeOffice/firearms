'use strict';

const Model = require('hof').model;
const isPdf = require('is-pdf');
const config = require('../../../config');
const debug = require('debug')('pdf-model');
const _ = require('lodash');

module.exports = class PDFModel extends Model {
  requestConfig(options) {
    const settings = super.requestConfig(options);
    settings.encoding = null;
    console.log("Firearms settings:::",settings)
    return settings;
  }

  url() {
    console.log("config.pdf.url:::",config.pdf.url)
    return config.pdf.url;
  }

  handleResponse(response, callback) {
    if (_.isPlainObject(response.body)) {
      debug('Response: %O', response.body);
    } else {
      debug('Response: %s', response.body);
    }
    console.log("response:: ", response);
    
    /*const customObjectify = (data) => {
      try {
          if(typeof data === "string"){
              JSON.parse(data);
          }
          return data;
      } catch (error) {
          return data;
      }
    }
    console.log("response.data::", customObjectify(response.data))*/
    //console.log("response.data::", Buffer.from(response.data, 'binary'));
    if (isPdf(Buffer.from(response.data, 'binary'))) {
      console.log("********response.statusCode********", response.status);
      return this.parseResponse(response.status, Buffer.from(response.data, 'binary'), callback);
    }
    const err = new Error();
    if (parseInt(response.status, 10) === 400) {
      console.log("********response.statusCode parseInt********", parseInt(response.status, 10));
      err.title = response.body.code;
      err.message = response.body.message;
    } else {
      err.body = response.body;
    }
    err.status = response.statusCode;
    console.log("********err********", err);
    return callback(err, null, response.statusCode);
  }
};
