'use strict';

const _ = require('lodash');
const BaseController = require('./base');

module.exports = class AddAnotherAddressController extends BaseController {
  locals(req, res, callback) {
    const locals = super.locals(req, res, callback);
    const field = locals.field;
    const addresses = req.sessionModel.get(`${field}Addresses`);
    const hasAddresses = req.sessionModel.get(`${field}Addresses`) ? true : false;
    const items = [];
    _.forEach(addresses, (value, key) => {
      const address = {
        id: key,
        address: value.address
      };
      items.push(address);
    });
    return Object.assign({}, locals, {
      items,
      hasAddresses
    });
  }

  get(req, res, callback) {
    if (req.params.action === 'delete' && req.params.id) {
      const field = this.options.locals.field;
      return this.removeItem(req, res, field);
    }
    return super.get(req, res, callback);
  }

  removeItem(req, res, field) {
    const items = req.sessionModel.get(`${field}Addresses`);
    req.sessionModel.set(`${field}Addresses`, _.omit(items, req.params.id));
    const step = _.size(items) > 1 ? `/${field}-add-another-address` : `/${field}-postcode`;
    return res.redirect(`${req.baseUrl}${step}`);
  }

  getBackLink(req) {
    const field = this.options.locals.field;
    const app = this.options.locals.app;
    const addresses = req.sessionModel.get(`${field}Addresses`);
    const id = _.last(Object.keys(addresses));
    return `/${app}/${field}-postcode/edit/${id}`;
  }
};
