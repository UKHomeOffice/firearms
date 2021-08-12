'use strict';

const Model = require('./i-casework');
const crypto = require('crypto');

const config = require('../../../config');

module.exports = class DocumentModel extends Model {
  url() {
    return config.icasework.url + config.icasework.uploadpath;
  }

  sign() {
    const date = (new Date()).toISOString().split('T')[0];
    return crypto.createHash('md5').update(this.get('reference-number') + date + config.icasework.secret).digest('hex');
  }

  parse(data) {
    return {
      createcaseresponse: data.uploaddocumentsresponse
    };
  }
};
