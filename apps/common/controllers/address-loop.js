'use strict';

const _ = require('lodash');
const BaseController = require('./base');

module.exports = class AddressLoopController extends BaseController {
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
    const isManual = req.params.action === 'manual';
    const locals = super.locals(req, res);
    const postcode = req.sessionModel.get(`${this.field}-postcode`);
    const addresses = req.sessionModel.get(`${this.field}Addresses`);
    const hasAddresses = _.size(addresses);
    const items = _.map(addresses, (value, key) => ({
      id: key,
      address: value.address
    }));
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
    super.getValues(req, res, (err, values) => {
      if (err) {
        return callback(err);
      }
      if (req.params.action === 'manual') {
            req.sessionModel.unset([
              `${this.field}-postcode`,
              'postcodeApiMeta'
            ]);
        if (req.params.id !== undefined) {
          const addresses = req.sessionModel.get(`${this.field}Addresses`);
          const value = addresses[req.params.id].address;
          const addressLines = value.split(', ').join('\n');
          const addressIndex = `${this.field}-address-manual`;
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

  saveValues(req, res, callback) {
    const address = req.form.values[`${this.field}-address-manual`];
    const postcode = req.sessionModel.get(`${this.field}-postcode`) || '';
    const addressIndex = `${this.field}Addresses`;
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
    req.sessionModel.unset(`${this.field}-postcode`);
    super.saveValues(req, res, callback);
  }
};
