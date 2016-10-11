'use strict';

const BaseController = require('hof').controllers.base;
const _ = require('lodash');

module.exports = class ContactController extends BaseController {
  getValues(req, res, callback) {
    if (req.sessionModel.get('authority-holders') === 'one') {
      this.options.fields['contact-holder'].options =
        _.without(this.options.fields['contact-holder'].options, 'second');
    }
    super.getValues(req, res, callback);
  }
};
