'use strict';

const Model = require('./i-casework');
const crypto = require('crypto');
const config = require('../../../config');
const logger = require('hof/lib/logger')({ env: config.env });

module.exports = class DocumentModel extends Model {
  url() {
    return config.icasework.url + config.icasework.getcasepath;
  }

  sign() {
    const date = (new Date()).toISOString().split('T')[0];
    return crypto.createHash('md5').update(this.get('reference-number') + date + config.icasework.secret).digest('hex');
  }

  prepare() {
    const props = {
      Key: config.icasework.key,
      Signature: this.sign(),
      Type: 'Firearms',
      Format: 'json',
      db: config.icasework.dbName,
      RequestMethod: 'Online form',
      CaseId: this.get('reference-number'),
    };
    console.log('THIS IS PROPS ', props);
    return props;
    // const props = super.prepare();
    // props.CaseId = this.get('reference-number');
    // return props;
  }

  parse(data) {
    return {
      name: data['MainParty.FullName'],
      email: data['MainParty.EmailAddress']
    };
  }

  async fetch() {
    try {
      const params = {
        url: this.url(),
        method: 'GET',
        params: this.prepare()
      };
      const response = await this._request(params);
      console.log(response);
      return response;
      // return await this._request(params).then(response => {
      // return this.parse(response.data);
      // })
    }
    catch (err) {
      logger.error(`Error fetching data from ${params.url}: ${err.message}`);
      throw new Error(`Failed to fetch data: ${err.message || 'Unknown error'}`);
    };
  }
};
