/* eslint-disable node/no-deprecated-api */
'use strict';

const Model = require('hof').model;
const config = require('../../../config');
const axios = require('axios');

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
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        username: config.keycloak.username,
        password: config.keycloak.password,
        grant_type: 'password',
        client_id: config.keycloak.clientId,
        client_secret: config.keycloak.secret
      },
      method: 'POST'
    };

    return axios(tokenReq).then(response => {
      return { tokenReq: {
        url: config.keycloak.token,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        bearer: response.data.access_token,
        data: {
          client_id: config.keycloak.clientId,
          client_secret: config.keycloak.secret,
          grant_type: 'password',
          password: config.keycloak.password,
          username: config.keycloak.username,
        }, 
        method: 'POST'
        }
      };
    });
  }
};
