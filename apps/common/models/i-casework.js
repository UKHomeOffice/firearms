'use strict';

const Model = require('hof').model;
const crypto = require('crypto');

const config = require('../../../config');

module.exports = class CaseworkModel extends Model {
  constructor(attributes, options) {
    super(attributes, options);
    this.options.timeout = this.options.timeout || config.icasework.timeout;
  }

  url() {
    return config.icasework.url + config.icasework.createpath;
  }

  prepare(token) {
    console.log("prepareeeeeeee")
    const params = {
      Key: config.icasework.key,
      Signature: this.sign(),
      Type: 'Firearms',
      Format: 'json',
      db: 'flcms',
      RequestMethod: 'Online form'
    };

    if (this.get('pdf-upload')) {
      params['Document1.Name'] = 'full application data';
      params['Document1.URL'] = `${this.get('pdf-upload').replace('/file', '/vault')}&token=${token.bearer}`;
      params['Document1.MimeType'] = 'application/pdf';
      params['Document1.URLLoadContent'] = true;
    }
    console.debug("params", params)
    return params;
  }

  sign() {
    console.log("signnnnnnnnnnnn")
    const date = (new Date()).toISOString().split('T')[0];
    return crypto.createHash('md5').update(date + config.icasework.secret).digest('hex');
  }

  save() {
    return Promise.resolve(this.prepare()).then(formData => {
      console.log("_++_+_+_+__+_+_")
      console.log(formData)
      console.log("_++_+_+_+__+_+_")
      const options = this.requestConfig({});
      options.form = formData;
      options.method = 'POST';

      if (!config.icasework.secret || !config.icasework.key && config.env !== 'production') {
        return Promise.resolve({
          createcaseresponse: {
            caseid: 'mock caseid'
          }
        });
      }
      console.log("_+_+_+_+_+_+_+_+_+_+__+7383")
      return this.request(options);
    });
  }
};
