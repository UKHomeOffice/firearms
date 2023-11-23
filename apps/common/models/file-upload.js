/* eslint-disable node/no-deprecated-api */
'use strict';

const url = require('url');
const FormData = require('form-data');
const AuthToken = require('./auth-token');
const config = require('../../../config');

module.exports = class UploadModel extends AuthToken {
  save() {
    return new Promise((resolve, reject) => {
      const attributes = {
        url: config.upload.hostname
      };
      const reqConf = url.parse(this.url(attributes));
      const formData = new FormData();
      formData.append( 'document', this.get('data'), {
        filename: this.get('name'),
        contentType: this.get('mimetype')
      });
      reqConf.data = formData;
      reqConf.method = 'POST';
      reqConf.headers = {
        ...formData.getHeaders()
      };
      console.debug("formdataaa")
      console.debug(reqConf.data)
      console.debug("formdataaa")

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
