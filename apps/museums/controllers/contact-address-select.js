'use strict';

const BaseController = require('../../common/controllers/base');

module.exports = class ContactAddressSelectController extends BaseController {

  configure(req, res, next) {
    req.form.options.fields['contact-address'].options = req.sessionModel.get('exhibit-addresses').map(a => {
      return {label: a.address, value: a.address};
    });
    next();
  }
};
