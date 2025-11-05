'use strict';

const AuthToken = require('../models/auth-token');
const CaseworkModel = require('../models/i-casework');
const StatsD = require('hot-shots');
const client = new StatsD();
const { env: configEnv } = require('../../../config');
const logger = require('hof/lib/logger')({ env: configEnv });

const Compose = func => superclass => class extends superclass {
  async prepare() {
    try {
      if (typeof func === 'function') {
        const model = new AuthToken();
        const token = await model.auth();
        const prepareToken = await super.prepare(token);
        logger.log('info', 'Token successfully prepared');
        return Object.assign(prepareToken, func(this.toJSON(), token));
      }
      return await super.prepare();
    } catch (e) {
      logger.error('Error in prepare method:', e);
      throw e;
    }
  }
};

module.exports = conf => {
  const config = conf || {};

  // allow a custom model override
  config.Model = config.Model || CaseworkModel;

  // compose custom per-app prepare methods onto the standard model
  const Model = Compose(config.prepare)(config.Model);

  return superclass => class extends superclass {
    async saveValues(req, res, next) {
      const sessionId = req.sessionID || req.session?.id || req.sessionModel?.get('sessionId') || 'unknown';
      req.log('info', `sessionId=${sessionId} Submitting case to icasework`);
      const model = new Model(req.sessionModel.toJSON());
      req.log('info', `sessionId=${sessionId} Sending icasework submission to ${model.url()}`);
      try {
        const response = await model.save(sessionId);
        req.log('info', `sessionId=${sessionId} Successfully submitted case to icasework (${response.createcaseresponse.caseid})`);
        req.sessionModel.set('caseid', response.createcaseresponse.caseid);
        client.increment('casework.submission.success');
        await super.saveValues(req, res, next);
      } catch (e) {
        req.log('error', `sessionId=${sessionId} Casework submission failed: ${e.message}`, e.response?.status || e);
        if (e.response?.headers && e.response?.headers['x-application-error-info']) {
          req.log('error', `sessionId=${sessionId} x-application-error-info: ${e.response.headers['x-application-error-info']}`);
        }
        req.log('error', `sessionId=${sessionId} Error details:`, {
          error: e,
          response: e.response && {
            status: e.response.status,
            headers: e.response.headers,
            data: e.response.data
          }
        });
        client.increment('casework.submission.failed');
        next(new Error(e.body || 'An unknown error occurred during casework submission.'));
      }
    }
  };
};
