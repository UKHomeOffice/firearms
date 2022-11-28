/* eslint-disable node/no-deprecated-api */
'use strict';

const req = require('express/lib/request');
const url = require('url');

const Model = require('hof').model;
const config = require('../../../config');

module.exports = class UploadModel extends Model {
  save() {
    return new Promise((resolve, reject) => {
      const attributes = {
        url: config.upload.hostname
      };
      const reqConf = url.parse(this.url(attributes));
      /*
      reqConf.formData = {
        document: {
          value: this.get('data'),
          options: {
            filename: this.get('name'),
            contentType: this.get('mimetype')
          }
        }
      };
      */
      const formData = new FormData();
      formData.append('document', new Blob(this.get('data'), { type: this.get('mimetype') }), this.get('name'));
      /*
      const formData = new FormData();
      formData.append("name", this.get('name'));
      formData.append("filename", "test.txt");
      formData.append("document", this.get('data'));
      */
      reqConf.body = formData;
      reqConf.method = 'POST';
      reqConf.isUpload = false;
      this.request(reqConf, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    }).then(data => {
      return this.auth().then(bearer => {
        data.url = (data.url.replace('/file', '/vault')) + '&token=' + bearer.bearer;
        return data;
      });
    });
  }

  auth() {
    if (!config.keycloak.token) {
      // eslint-disable-next-line no-console
      console.error('keycloak token url is not defined');
      return Promise.resolve({
        bearer: 'abc123'
      });
    }
    
    var authHeaders = new Headers();
    authHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("username", config.keycloak.username);
    urlencoded.append("password", config.keycloak.password);
    urlencoded.append("client_id", config.keycloak.clientId);
    urlencoded.append("client_secret", config.keycloak.secret);
    urlencoded.append("grant_type", "password");


    
    const tokenReq = {
      url: config.keycloak.token,
      body: urlencoded,
      headers: authHeaders,
      method: 'POST'
    };

    return new Promise((resolve, reject) => {
      this._request(tokenReq, (err, response) => {
        if (err) {
          console.log('err: ' + err);
          return reject(err);
        }
        console.log(response.body);
        return resolve({
          bearer: JSON.parse(response.body).access_token
        });
      });
    });
  }
};
