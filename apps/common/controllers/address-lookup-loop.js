'use strict';

const _ = require('lodash');
const ErrorController = require('hof-controllers').error;
const BaseController = require('./base');

module.exports = class AddressLookupLoopController extends BaseController {
  locals(req, res) {
    const locals = super.locals(req, res);
    const field = locals.field;
    const addresses = req.sessionModel.get(`${field}Addresses`);
    const hasAddresses = _.size(addresses);
    const items = [];
    let postcode;
    let id;
    _.forEach(addresses, (value, key) => {
      const address = {
        id: key,
        address: value.address
      };
      items.push(address);
    });
    if (req.params.action === 'edit') {
      id = req.params.id;
      postcode = req.sessionModel.get(`${field}-postcode`) || addresses[id].postcode;
    } else {
      postcode = req.sessionModel.get(`${field}-postcode`);
    }
    return Object.assign({}, locals, {
      items,
      hasAddresses,
      postcode,
      id
    });
  }

  getBackLink(req, res, callback) {
    const id = req.params.action === 'edit' ? req.params.id : '';
    return `${super.getBackLink(req, res, callback)}/${id}`;
  }

  getValues(req, res, callback) {
    const field = this.options.locals.field;
    if (req.params.action === 'edit') {
      const steps = req.sessionModel.get('steps');
      _.remove(steps, step => {
        return step === `/${field}-add-another-address`;
      });
      req.sessionModel.set('steps', steps);
      req.sessionModel.unset(`${field}-add-another-address`);
    }
    const addresses = req.sessionModel.get(`${field}-addresses`);
    const formattedlist = _.map(_.map(addresses, 'formatted_address'), address => {
      address = address.split('\n').join(', ');
      return {
        value: address,
        label: address
      };
    });

    const count = `${formattedlist.length} addresses`;
    this.options.fields[`${field}-address-lookup`].options = [{value: count, label: count}].concat(formattedlist);
    super.getValues(req, res, callback);
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
    const address = req.form.values[`${field}-address-lookup`].split(', ').join('\n');
    let postcode;
    const addressIndex = `${field}Addresses`;
    let addresses = req.sessionModel.get(addressIndex) || {};
    let id = req.params.id;
    if (id === undefined) {
      const currentIndex = req.sessionModel.get('currentIndex') || 0;
      id = parseInt(currentIndex, 10);
      req.sessionModel.set('currentIndex', id + 1);
    }
    postcode = req.sessionModel.get(`${field}-postcode`) || addresses[id].postcode;
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

  post(req, res, cb) {
    this.getValues(req, res, () => {});
    super.post(req, res, cb);
  }

  validateField(key, req) {
    const field = this.options.locals.field;
    if (req.form.values[key] === this.options.fields[`${field}-address-lookup`].options[0].value) {
      return new ErrorController(`${field}-address-lookup`, {
        key: `${field}-address-lookup`,
        type: 'required',
        redirect: undefined
      });
    }
  }
};
