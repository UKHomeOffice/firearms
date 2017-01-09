'use strict';

const Model = require('hmpo-model');

module.exports = class UploadModel extends Model {
  save() {
    return new Promise((resolve, reject) => {
      this.set('upload-url', `http://s3-url/${this.get('name')}`);
      resolve(this.toJSON());
    });
  }
};
