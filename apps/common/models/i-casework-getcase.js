'use strict';

const Model = require('./i-casework');
const crypto = require('crypto');
const config = require('../../../config');
const logger = require('hof/lib/logger')({ env: config.env });

module.exports = class DocumentModel extends Model {
  url() {
    return `${config.icasework.url}${config.icasework.getcasepath}`;
  }

  sign() {
    const date = (new Date()).toISOString().split('T')[0];
    return crypto.createHash('md5').update(this.get('reference-number') + date + config.icasework.secret).digest('hex');
  }

  prepare() {
    const props = super.prepare();
    props.CaseId = this.get('reference-number');
    console.log('PROPS ', props);
    return props;
  }

  parse(data) {
    console.log('PARSE DATA ', (data));
    return {
      name: data['MainParty.FullName'],
      email: data['MainParty.EmailAddress']
    };
  }

  async fetch() {
    try {
      const options = this.requestConfig({});
      options.params = this.prepare();
      options.method = 'GET';
      const response = await this.request(options);
      console.log('RESPONSE ', response);
      return this.parse(response);
    } catch (err) {
      logger.error(`Error fetching data from ${this.url()}: ${err.message}`);
      throw new Error(`Failed to fetch data: ${err.message || 'Unknown error'}`);
    }
  }
};
