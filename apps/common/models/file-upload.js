/* eslint-disable node/no-deprecated-api */
'use strict';

const url = require('url');

const Model = require('hof').model;
const config = require('../../../config');

module.exports = class UploadModel extends Model {
  /*
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
      reqConf.method = 'POST';
      this.request(reqConf, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    }).then(data => {
      return this.auth().then(bearer => {
        data.url = (data.url.replace('/file', '/vault')) + '&token=' + bearer.bearer;
        return data;
      });
    });
  }

  auth() {
    if (!config.keycloak.token) {
      // eslint-disable-next-line no-console
      console.error('keycloak token url is not defined');
      return Promise.resolve({
        bearer: 'abc123'
      });
    }
    const tokenReq = {
      url: config.keycloak.token,
      form: {
        username: config.keycloak.username,
        password: config.keycloak.password,
        grant_type: 'password',
        client_id: config.keycloak.clientId,
        client_secret: config.keycloak.secret
      },
      method: 'POST'
    };

    return new Promise((resolve, reject) => {
      this._request(tokenReq, (err, response) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          bearer: JSON.parse(response.body).access_token
        });
      });
    });
  }
  */
};
