'use strict';

const Model = require('hof').model;
const crypto = require('crypto-js');

const config = require('../../../config');
const axios = require("axios");

module.exports = class CaseworkModel extends Model {
  constructor(attributes, options) {
    super(attributes, options);
    this.options.timeout = this.options.timeout || config.icasework.timeout;
  }

  base64object(input) {
    const inputWords = crypto.enc.Utf8.parse(JSON.stringify(input));
    const base64 = crypto.enc.Base64.stringify(inputWords);
    return this.removeIllegalCharacters(base64);
  };

  url() {
    return config.icasework.url + config.icasework.createpath + `?db=${config.icasework.db}`;
  }

  prepare(keycloakToken) {
    const params = {
      Type: 'Firearms',
      Format: 'json',
      RequestMethod: 'Online form'
    };

    if (this.get('pdf-upload')) {
      params['Document1.Name'] = 'full application data';
      params['Document1.URL'] = `${this.get('pdf-upload').replace('/file', '/vault')}&token=${keycloakToken.bearer}`;
      params['Document1.MimeType'] = 'application/pdf';
      params['Document1.URLLoadContent'] = true;
    }
    console.debug("params", params)
    return params;
  }

  auth() {
    return new Promise((resolve, reject) => {
      if (config.icasework.accessToken) {
        resolve({bearer: config.icasework.accessToken})
      }
      /**
       * Generates an access token for iCasework
       * */
      const header = {'alg': 'HS256', 'typ': 'JWT'};
      const currentTime = Math.floor(Date.now() / 1000);
      const secret = config.icasework.secret;
      const iss = config.icasework.key
      const nbf = currentTime
      const exp = currentTime + 3600;
      const ait = currentTime
      const jti = config.icasework.key
      const typ = "icw"
      const payload = {iss, nbf, exp, ait, jti, typ};

      const unsignedToken = this.base64object(header) + "." + this.base64object(payload);
      const signatureHash = crypto.HmacSHA256(unsignedToken, secret);
      const signature = crypto.enc.Base64.stringify(signatureHash);
      const assertion = unsignedToken + '.' + signature;
      const grant_type = "urn:ietf:params:oauth:grant-type:jwt-bearer"
      axios.get(`${config.icasework.url}/token?db=${config.icasework.db}&grant_type=${grant_type}&assertion=${assertion}`)
        .then(response => {
          const data = response.data;
          console.table(data);
          resolve({bearer: data["access_token"]});
        })
        .catch(error => {
          console.error(error.response);
          reject(error)
        });
    })
  }

  sign() {
    const date = (new Date()).toISOString().split('T')[0];
    return crypto.createHash('md5').update(date + config.icasework.secret).digest('hex');
  }

  async save() {
    try {
      const formData = await Promise.resolve(this.prepare())
      const options = this.requestConfig({});
      console.log("OPTIONS");
      console.log(options);
      console.log("-----------------------------------------------");
      console.log("FORM DATA");
      console.log(formData);
      options.method = 'POST';

      if (!config.icasework.secret || !config.icasework.key && config.env !== 'production') {
        return Promise.resolve({
          createcaseresponse: {
            caseid: 'mock caseid'
          }
        });
      }
      return await this.request(options, formData);
    } catch (err) {
      console.error(err.response);
      throw err;
    }
  }

  removeIllegalCharacters(input) {
    return input
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };
};
