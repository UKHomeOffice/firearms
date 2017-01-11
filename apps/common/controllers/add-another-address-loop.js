'use strict';

const _ = require('lodash');
const BaseAddressController = require('./base-address');

module.exports = class AddAnotherAddressController extends BaseAddressController {
  constructor(options) {
    super(options);
    if (options.locals.field) {
      this.field = options.locals.field;
    } else {
      throw new Error('Field need to be defined in locals');
    }
  }

  locals(req, res) {
    const locals = super.locals(req, res);
    const addresses = req.sessionModel.get(`${this.field}Addresses`);
    const hasAddresses = req.sessionModel.get(`${this.field}Addresses`) ? true : false;
    const items = this.mapAddress(addresses, req);
    return Object.assign({}, locals, {
      items,
      hasAddresses,
      hasCategories: _.sample(addresses).categories !== undefined
    });
  }

  get(req, res, callback) {
    if (req.params.action === 'delete' && req.params.id) {
      return this.removeItem(req, res);
    }
    return super.get(req, res, callback);
  }

  removeItem(req, res) {
    const items = req.sessionModel.get(`${this.field}Addresses`);
    req.sessionModel.set(`${this.field}Addresses`, _.omit(items, req.params.id));
    const step = _.size(items) > 1 ? `/${this.field}-add-another-address` : `/${this.field}-postcode`;
    return res.redirect(`${req.baseUrl}${step}`);
  }

  getBackLink(req) {
    const addresses = req.sessionModel.get(`${this.field}Addresses`);
    const id = _.last(Object.keys(addresses));
    const app = req.app.mountpath;
    return `/${app}/${this.field}-postcode/edit/${id}`;
  }
};
