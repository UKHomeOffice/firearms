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
    return props;
  }

  parse(data) {
    return {
      name: data['MainParty.FullName'],
      email: data['MainParty.EmailAddress']
    };
  }

  async fetch() {
    // try {
    //   const options = {
    //     url: this.url(),
    //     method: 'GET',
    //     params: this.prepare()
    //   };
    //   const response = await this._request(options);
    const options = this.requestConfig({});
    options.params = this.prepare();
    options.method = 'GET';
    try {
      const response = await this.request(options);
      console.log('RESPONSE ', response);
      console.log('PARSE ', this.parse(response.data));
      return response;
    } catch (err) {
      logger.error(`Error fetching data from ${this.url()}: ${err.message}`);
      throw new Error(`Failed to fetch data: ${err.message || 'Unknown error'}`);
    }
  }
};
