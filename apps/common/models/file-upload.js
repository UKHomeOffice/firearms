/* eslint-disable node/no-deprecated-api */
'use strict';

const url = require('url');

const AuthToken = require('./auth-token');
const config = require('../../../config');

module.exports = class UploadModel extends AuthToken {
  save() {
    return new Promise((resolve, reject) => {
      const attributes = {
        url: config.upload.hostname
      };
      const reqConf = url.parse(this.url(attributes));
      reqConf.formData = {
        document: {
          value: this.get('data'),
          options: {
            filename: this.get('name'),
            contentType: this.get('mimetype')
          }
        }
      };
      console.debug("reqconfformdataa")
      console.debug(reqConf)
      console.debug("reqconfformdataaformdataa")
      reqConf.method = 'POST';
      // uses 'request' function available in HOF model. auth() is used by this process and
      // thus needs to be declared in the parent class which extends off the HOF model too.
      this.request(reqConf, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }
};
