'use strict';

const BaseController = require('../base');
const path = require('path');

module.exports = class AddressController extends BaseController {

  constructor(options) {
    if (!options.prefix) {
      throw new Error('options.prefix is required');
    }
    super(options);
  }

  locals(req, res) {
    return Object.assign({}, super.locals(req, res), {
      'manual-entry': path.join(req.form.options.manual || '', req.params.action || '')
    });
  }

};
