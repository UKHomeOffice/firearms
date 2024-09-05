'use strict';

const { model: Model } = require('hof');
const crypto = require('crypto');
const config = require('../../../config');
const logger = require('hof/lib/logger')({ env: config.env });

module.exports = class CaseworkModel extends Model {
  url() {
    return `${config.icasework.url}${config.icasework.createpath}?db=${encodeURIComponent(config.icasework.dbName)}`;
  }

  sign() {
    const date = (new Date()).toISOString().split('T')[0];
    return crypto.createHash('md5').update(date + config.icasework.secret).digest('hex');
  }

  prepare(token) {
    const params = {
      Key: config.icasework.key,
      Signature: this.sign(),
      Type: 'Firearms',
      Format: 'json',
      db: config.icasework.dbName,
      RequestMethod: 'Online form'
    };

    if (this.get('pdf-upload')) {
      params['Document1.Name'] = 'full application data';
      params['Document1.URL'] = `${this.get('pdf-upload').replace('/file', '/vault')}&token=${token.bearer}`;
      params['Document1.MimeType'] = 'application/pdf';
      params['Document1.URLLoadContent'] = true;
    }
    return params;
  }

  async save() {
    try {
      return Promise.resolve(this.prepare()).then(async data => {
      // const data = this.prepare();
      const data = await (async () => await this.prepare())();
      const params = {
        url: this.url(),
        data,
        timeout: config.icasework.timeout,
        method: 'POST'
      };

      if (!config.icasework.secret || !config.icasework.key && config.env !== 'production') {
        return {
          data: {
            createcaseresponse: {
              caseid: 'mock caseid'
            }
          }
        };
      }

      const response = await this._request(params);
      return response;
      });
    } catch (err) {
      logger.error(`Error saving data: ${err.message}`);
      throw new Error(`Failed to save data: ${err.message || 'Unknown error'}`);
    }
  }
};
