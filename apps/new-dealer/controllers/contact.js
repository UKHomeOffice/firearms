'use strict';

const _ = require('lodash');
const BaseController = require('../../common/controllers/base');
const fields = _.cloneDeep(require('../fields'));

module.exports = class ContactController extends BaseController {
  getValues(req, res, callback) {
    req.form.options.fields['contact-holder'].options = _.cloneDeep(fields['contact-holder'].options);
    if (req.sessionModel.get('authority-holders') === 'one') {
      req.form.options.fields['contact-holder'].options =
        _.without(_.cloneDeep(fields['contact-holder'].options), 'second');
    }

    super.getValues(req, res, callback);
  }
};
