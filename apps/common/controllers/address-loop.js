'use strict';

const _ = require('lodash');
const BaseAddressController = require('./base-address');

module.exports = class AddressLoopController extends BaseAddressController {
  locals(req, res) {
    const isManual = req.params.action === 'manual';
    const postcode = req.sessionModel.get(`${this.options.locals.field}-postcode`);
    return Object.assign({}, super.locals(req, res), {
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
    super.getValues(req, res, (err, values) => {
      if (err) {
        return callback(err);
      }
      if (req.params.action === 'manual') {
            req.sessionModel.unset([
              `${this.options.locals.field}-postcode`,
              'postcodeApiMeta'
            ]);
        if (req.params.id !== undefined) {
          const addresses = req.sessionModel.get(`${this.options.locals.field}Addresses`);
          const value = addresses[req.params.id].address;
          const addressLines = value.split(', ').join('\n');
          const addressIndex = `${this.options.locals.field}-address-manual`;
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
      return this.removeItem(req, res);
    }
    return super.get(req, res, callback);
  }

  removeItem(req, res) {
    const items = req.sessionModel.get(`${this.options.locals.field}Addresses`);
    req.sessionModel.set(`${this.options.locals.field}Addresses`, _.omit(items, req.params.id));
    const step = _.size(items) > 1 ? `/${this.options.locals.field}-add-another-address` :
      `/${this.options.locals.field}-postcode`;
    return res.redirect(`${req.baseUrl}${step}`);
  }

  saveValues(req, res, callback) {
    const address = req.form.values[`${this.options.locals.field}-address-manual`];
    const postcode = req.sessionModel.get(`${this.options.locals.field}-postcode`) || '';
    const addressIndex = `${this.options.locals.field}Addresses`;
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
    req.sessionModel.unset(`${this.options.locals.field}-postcode`);
    super.saveValues(req, res, callback);
  }
};
