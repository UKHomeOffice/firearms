'use strict';

const _ = require('lodash');
const ErrorController = require('hof-controllers').error;
const BaseController = require('./base');

module.exports = class AddressLookupLoopController extends BaseController {
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
    const hasAddresses = _.size(addresses);
    const hasCategories = hasAddresses ? _.sample(addresses).categories !== undefined : false;
    let postcode;
    let id;
    const items = _.map(addresses, (value, key) => ({
      id: key,
      address: value.address,
      categories: this.translateCategories(req, value.categories)
    }));
    if (req.params.action === 'edit') {
      id = req.params.id;
      postcode = req.sessionModel.get(`${this.field}-postcode`) || addresses[id].postcode;
    } else {
      postcode = req.sessionModel.get(`${this.field}-postcode`);
    }
    return Object.assign({}, locals, {
      items,
      hasAddresses,
      postcode,
      id,
      hasCategories
    });
  }

  translateCategories(req, values) {
    if (!Array.isArray(values)) {
      values = [values];
    }
    const categories = values.map(value => {
      let key = `fields.location-address-category.options.${value}.label`;
      let result = req.translate(key);
      return result === key ? value : result;
    }).join('\n');
    return categories;
  }

  getBackLink(req, res, callback) {
    const id = req.params.action === 'edit' ? req.params.id : '';
    return `${super.getBackLink(req, res, callback)}/${id}`;
  }

  getValues(req, res, callback) {
    if (req.params.action === 'edit') {
      const steps = req.sessionModel.get('steps');
      _.remove(steps, step => {
        return step === `/${this.field}-add-another-address`;
      });
      req.sessionModel.set('steps', steps);
      req.sessionModel.unset(`${this.field}-add-another-address`);
    }
    const addresses = req.sessionModel.get(`${this.field}-addresses`);
    const formattedlist = _.map(_.map(addresses, 'formatted_address'), address => {
      address = address.split('\n').join(', ');
      return {
        value: address,
        label: address
      };
    });

    const count = `${formattedlist.length} addresses`;
    this.options.fields[`${this.field}-address-lookup`].options = [{value: count, label: count}].concat(formattedlist);
    super.getValues(req, res, callback);
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

  saveValues(req, res, callback) {
    const address = req.form.values[`${this.field}-address-lookup`].split(', ').join('\n');
    let postcode;
    const addressIndex = `${this.field}Addresses`;
    let addresses = req.sessionModel.get(addressIndex) || {};
    let id = req.params.id;
    if (id === undefined) {
      const currentIndex = req.sessionModel.get('currentIndex') || 0;
      id = parseInt(currentIndex, 10);
      req.sessionModel.set('currentIndex', id + 1);
    }
    postcode = req.sessionModel.get(`${this.field}-postcode`) || addresses[id].postcode;
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

  post(req, res, cb) {
    this.getValues(req, res, () => {});
    super.post(req, res, cb);
  }

  validateField(key, req) {
    if (req.form.values[key] === this.options.fields[`${this.field}-address-lookup`].options[0].value) {
      return new ErrorController(`${this.field}-address-lookup`, {
        key: `${this.field}-address-lookup`,
        type: 'required',
        redirect: undefined
      });
    }
  }
};
