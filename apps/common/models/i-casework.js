'use strict';

const Model = require('hof-model');
const crypto = require('crypto');

const config = require('../../../config').icasework;

module.exports = class CaseworkModel extends Model {

  url() {
    return config.url;
  }

  prepare() {
    const params = {
      Key: config.key,
      Signature: this.sign(),
      Type: 'Firearms',
      Format: 'json',
      db: 'flcms'
    };

    if (this.get('pdf-upload')) {
      params['Document1.Name'] = 'full application data';
      params['Document1.Url'] = this.get('pdf-upload');
    }

    return params;
  }

  sign() {
    const date = (new Date()).toISOString().split('T')[0];
    return crypto.createHash('md5').update(date + config.secret).digest('hex');
  }

  save() {
    const options = this.requestConfig({});
    options.qs = this.prepare();
    options.method = 'POST';
    return this.request(options);
  }

};
