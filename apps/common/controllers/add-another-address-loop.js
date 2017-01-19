'use strict';

const _ = require('lodash');
const BaseAddressController = require('./base-address');

module.exports = class AddAnotherAddressController extends BaseAddressController {
  get(req, res, callback) {
    if (req.params.action === 'delete' && req.params.id) {
      return this.removeItem(req, res);
    }
    return super.get(req, res, callback);
  }

  removeItem(req, res) {
    const items = req.sessionModel.get(this.options.addressKey);
    req.sessionModel.set(this.options.addressKey, _.omit(items, req.params.id));
    const step = _.size(items) > 1 ?
      `/${this.options.locals.field}-add-another-address` : `/${this.options.locals.field}-postcode`;
    return res.redirect(`${req.baseUrl}${step}`);
  }

  getBackLink(req) {
    const addresses = req.sessionModel.get(this.options.addressKey);
    const id = _.last(Object.keys(addresses));
    const app = req.app.mountpath;
    return `/${app}/${this.options.locals.field}-postcode/edit/${id}`;
  }
};
