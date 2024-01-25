/* eslint-disable node/no-deprecated-api */
'use strict';

const { model: Model } = require('hof');
const config = require('../../../config');
const logger = require('hof/lib/logger')({ env: config.env });

module.exports = class AuthToken extends Model {
  async auth() {
    /* eslint-disable no-console */
    try {
      if (!config.keycloak.token) {
        logger.error('keycloak token url is not defined');
        return {
          bearer: 'abc123'
        };
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
      const response = await this._request(tokenReq);
      return { bearer: response.data.access_token };
    } catch (error) {
      logger.error('Error in auth method:', error);
      throw error;
    }
  }
};
