'use strict';

const _ = require('lodash');
const BaseAddressController = require('./base-address');

module.exports = class AddressLookupLoopController extends BaseAddressController {
  locals(req, res) {
    const id = req.params.id;
    const addresses = req.sessionModel.get(this.options.addressKey);
    let postcode = req.sessionModel.get(`${this.options.locals.field}-postcode`);
    if (req.params.action === 'edit') {
      postcode = postcode || addresses[id].postcode;
    }
    return Object.assign({}, super.locals(req, res), {
      postcode,
      id
    });
  }

  getBackLink(req, res, callback) {
    const id = req.params.action === 'edit' ? req.params.id : '';
    return `${super.getBackLink(req, res, callback)}/${id}`;
  }

  configure(req, res, callback) {
    if (req.params.action === 'edit') {
      const steps = req.sessionModel.get('steps');
      _.remove(steps, step => {
        return step === `/${this.options.locals.field}-add-another-address`;
      });
      req.sessionModel.set('steps', steps);
      req.sessionModel.unset(`${this.options.locals.field}-add-another-address`);
    }
    const addresses = req.sessionModel.get(`${this.options.locals.field}-addresses`);
    const formattedlist = _.map(_.map(addresses, 'formatted_address'), address => {
      address = address.split('\n').join(', ');
      return {
        value: address,
        label: address
      };
    });

    const count = `${formattedlist.length} addresses`;
    req.form.options.fields[`${this.options.locals.field}-address-lookup`].options =
      [{value: '', label: count}].concat(formattedlist);
    callback();
  }

  get(req, res, callback) {
    if (req.params.action === 'delete' && req.params.id) {
      return this.removeItem(req, res);
    }
    return super.get(req, res, callback);
  }

  removeItem(req, res) {
    const items = req.sessionModel.get(this.options.addressKey);
    req.sessionModel.set(this.options.addressKey,
      _.omit(items, req.params.id));
    const step = _.size(items) > 1 ?
      `/${this.options.locals.field}-add-another-address` : `/${this.options.locals.field}-postcode`;
    return res.redirect(`${req.baseUrl}${step}`);
  }

  saveValues(req, res, callback) {
    const address = req.form.values[`${this.options.locals.field}-address-lookup`].split(', ').join('\n');
    let postcode;
    const addressKey = this.options.addressKey;
    let addresses = req.sessionModel.get(addressKey) || {};
    let id = req.params.id;
    if (id === undefined) {
      const currentIndex = req.sessionModel.get('currentIndex') || 0;
      id = parseInt(currentIndex, 10);
      req.sessionModel.set('currentIndex', id + 1);
    }
    postcode = req.sessionModel.get(`${this.options.locals.field}-postcode`) || addresses[id].postcode;
    addresses[id] = {
      address,
      postcode
    };
    const items = {};
    items[addressKey] = addresses;
    req.sessionModel.set(items);
    req.sessionModel.unset(`${this.options.locals.field}-postcode`);
    super.saveValues(req, res, callback);
  }

};
