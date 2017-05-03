'use strict';

const _ = require('lodash');

module.exports = superclass => class extends superclass {
  get(req, res, callback) {
    if (req.query.delete) {
      return this.removeItem(req, res);
    }
    return super.get(req, res, callback);
  }

  removeItem(req, res) {
    const items = req.sessionModel.get(this.options.addressKey);
    const action = req.params.action ? `/${req.params.action}` : '';
    req.sessionModel.set(this.options.addressKey, _.omit(items, req.query.delete));
    const step = _.size(items) > 1 ?
      `/${this.options.locals.field}-add-another-address` : `/${this.options.locals.field}-postcode`;
    return res.redirect(`${req.baseUrl}${step}${action}`);
  }
};
