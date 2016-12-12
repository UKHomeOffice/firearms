'use strict';

const _ = require('lodash');
const BaseController = require('./base');

module.exports = class AddressLoopController extends BaseController {
  locals(req, res, callback) {
    const isManual = req.params.action === 'manual';
    const locals = super.locals(req, res, callback);
    const field = locals.field;
    const postcode = req.sessionModel.get(`${field}-postcode`);
    const addresses = req.sessionModel.get(`${field}Addresses`);
    const hasAddresses = _.size(addresses);
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
      hasAddresses,
      postcode,
      postcodeApiMessageKey: isManual ? '' : (req.sessionModel.get('postcodeApiMeta') || {}).messageKey
    });
  }

  getBackLink(req, res, callback) {
    const backLink = super.getBackLink(req, res, callback);
    if (req.params.id && req.params.id !== undefined) {
      const id = req.params.id;
      const back = req.params.action === 'edit' ? `${backLink}/${id}` : `${backLink}/edit/${id}`;
      return back;
    }
    return backLink;
  }

  getValues(req, res, callback) {
    const field = this.options.locals.field;
    super.getValues(req, res, (err, values) => {
      if (err) {
        return callback(err);
      }
      if (req.params.action === 'manual') {
            req.sessionModel.unset([
              `${field}-postcode`,
              'postcodeApiMeta'
            ]);
        if (req.params.id !== undefined) {
          const addresses = req.sessionModel.get(`${field}Addresses`);
          const value = addresses[req.params.id].address;
          const addressLines = value.split(', ').join('\n');
          const addressIndex = `${field}-address-manual`;
          const addressItems = {};
          addressItems[addressIndex] = addressLines;
          return callback(null, Object.assign({}, values,
              addressItems
          ));
        }
      }
      return callback(null, values);
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

  saveValues(req, res, callback) {
    const field = this.options.locals.field;
    const address = req.form.values[`${field}-address-manual`];
    const postcode = req.sessionModel.get(`${field}-postcode`) || '';
    const addressIndex = `${field}Addresses`;
    let addresses = req.sessionModel.get(addressIndex) || {};
    let id = req.params.id;
    if (id === undefined) {
      const currentIndex = req.sessionModel.get('currentIndex') || 0;
      id = parseInt(currentIndex, 10);
      req.sessionModel.set('currentIndex', id + 1);
    }
    addresses[id] = {
      address,
      postcode
    };
    const items = {};
    items[addressIndex] = addresses;
    req.sessionModel.set(items);
    req.sessionModel.unset(`${field}-postcode`);
    super.saveValues(req, res, callback);
  }
};
