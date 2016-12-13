'use strict';

const _ = require('lodash');
const BaseController = require('./base');

module.exports = class AddAnotherAddressController extends BaseController {
  constructor(options) {
    super(options);
    if (options.locals.field) {
      this.field = options.locals.field;
    } else {
      // eslint-disable-next-line no-console
      console.error('No field set in locals');
    }
  }

  locals(req, res) {
    const locals = super.locals(req, res);
    const addresses = req.sessionModel.get(`${this.field}Addresses`);
    const hasAddresses = req.sessionModel.get(`${this.field}Addresses`) ? true : false;
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
      return this.removeItem(req, res, this.field);
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
    const app = this.options.locals.app;
    const addresses = req.sessionModel.get(`${this.field}Addresses`);
    const id = _.last(Object.keys(addresses));
    return `/${app}/${this.field}-postcode/edit/${id}`;
  }
};
