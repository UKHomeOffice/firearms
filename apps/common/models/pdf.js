'use strict';

const Model = require('hof').model;
const isPdf = require('is-pdf');
const config = require('../../../config');
const debug = require('debug')('pdf-model');
const _ = require('lodash');

module.exports = class PDFModel extends Model {
  requestConfig(options) {
    console.debug("jdkshfkjs")
    console.debug(options)
    const settings = super.requestConfig(options);
    settings.responseType = 'arraybuffer';
    settings.encoding = null;
    settings.rejectUnauthorized = false;
    console.debug("settings><><><", settings)
    return settings;
  }

  url() {
    return config.pdf.url;
  }

  auth() {
    console.log("FIREARMS AUTH PDF")
    if (!config.keycloak.token) {
      // eslint-disable-next-line no-console
      console.error('keycloak token url is not defined');
      return Promise.resolve({
        bearer: 'abc123'
      });
    }
    const tokenReq = {
      url: config.keycloak.token,
      //headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        username: config.keycloak.username,
        password: config.keycloak.password,
        grant_type: 'password',
        client_id: config.keycloak.clientId,
        client_secret: config.keycloak.secret
      },
      method: 'POST'
    };
    console.log("%%%%%%%%%%%%%%")
    console.log(tokenReq)
    console.log("%%%%%%%%%%%%%%%%")
    return new Promise((resolve, reject) => {
      return this._request(tokenReq, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    })
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
