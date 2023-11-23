/* eslint-disable node/no-deprecated-api */
'use strict';

const Model = require('hof').model;
const config = require('../../../config');

module.exports = class AuthToken extends Model {
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
        console.debug("resssyyyyy")
        console.debug(response)
        console.debug("resssyyyyy")
        return resolve({ bearer: JSON.parse(response.body).access_token });
      });
    });
  }
};
