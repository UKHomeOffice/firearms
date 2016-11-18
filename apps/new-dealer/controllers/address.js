'use strict';

const BaseController = require('./base');

module.exports = class AddressController extends BaseController {
  getValues(req, res, callback) {
    const field = this.options.locals.field;
    if (req.params.action === 'manual') {
      req.sessionModel.unset([
        `${field}-postcode`,
        'postcodeApiMeta'
      ]);
    }
    super.getValues(req, res, callback);
  }

  locals(req, res, callback) {
    const isManual = req.params.action === 'manual';
    const locals = super.locals(req, res, callback);
    const postcode = req.sessionModel.get(`${locals.field}-postcode`);
    return Object.assign({}, locals, {
      postcode,
      postcodeApiMessageKey: isManual ? '' : (req.sessionModel.get('postcodeApiMeta') || {}).messageKey
    });
  }
};
