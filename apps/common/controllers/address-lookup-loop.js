'use strict';

const _ = require('lodash');
const BaseAddressController = require('./base-address');

module.exports = class AddressLookupLoopController extends BaseAddressController {

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

  saveValues(req, res, callback) {
    const address = req.form.values[`${this.options.locals.field}-address-lookup`].split(', ').join('\n');
    let postcode;
    const addressKey = this.options.addressKey;
    let addresses = req.sessionModel.get(addressKey) || {};
    const currentIndex = req.sessionModel.get('currentIndex') || 0;
    const id = parseInt(currentIndex, 10);
    req.sessionModel.set('currentIndex', id + 1);
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
