'use strict';

const BaseController = require('hof').controllers.base;
const _ = require('lodash');

module.exports = class ContactController extends BaseController {
  getValues(req, res, callback) {
    if (req.sessionModel.get('authority-holders') === 'one') {
      this.options.fields['contact-holder'].options =
        _.without(_.clone(require('../fields')['contact-holder'].options), 'second');
    } else {
      this.options.fields['contact-holder'].options = require('../fields')['contact-holder'].options;
    }
    super.getValues(req, res, callback);
  }
};
