/* eslint-disable node/no-deprecated-api */
'use strict';

const url = require('url');

const Model = require('hof').model;
const config = require('../../../config');

module.exports = class UploadModel extends Model {
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
    }).then(async data => {
      try {
        // auth retries possibly isn't needed but has been implemented as a failsafe
        // in case there are issues with requesting a bearer token first time.
        // This can potentially be removed in future.
        const token = await this.authWithRetries(config.keycloak.authTokenRetries);
        data.url = (data.url.replace('/file', '/vault')) + `&token=${token}`;
        return data;
      } catch (e) {
        throw e;
      }
    });
  }

  async authWithRetries(num) {
    let retries = num;
    let bearer = {};

    while (retries > 0) {
      try {
        bearer = await this.auth();
      } catch (e) {
        bearer = e;
      }
      retries--;

      if (bearer.bearer) {
        break;
      }

      if (retries <= 0) {
        throw new Error(`Failed to authenticate the upload. Please try again. Error: ${bearer}`);
      }
    }
    return bearer.bearer;
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
};
