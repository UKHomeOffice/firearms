'use strict';

const Model = require('./i-casework');
const crypto = require('crypto');

const config = require('../../../config');

module.exports = class DocumentModel extends Model {

  url() {
    return config.icasework.url + config.icasework.getcasepath;
  }

  sign() {
    const date = (new Date()).toISOString().split('T')[0];
    return crypto.createHash('md5').update(this.get('reference-number') + date + config.icasework.secret).digest('hex');
  }

  prepare(data) {
    const props = super.prepare(data);
    props.CaseId = this.get('reference-number');
    return props;
  }

  parse(data) {
    return {
      name: data['MainParty.FullName'],
      email: data['MainParty.EmailAddress']
    };
  }

  fetch() {
    const options = this.requestConfig({});
    options.qs = this.prepare();
    options.method = 'GET';
    return this.request(options);
  }

};
