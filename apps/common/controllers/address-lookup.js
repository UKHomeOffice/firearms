'use strict';

const _ = require('lodash');
const BaseController = require('./base');

module.exports = class AddressLookup extends BaseController {

  locals(req, res) {
    const locals = super.locals(req, res);
    const postcode = req.sessionModel.get(`${locals.field}-postcode`);
    return Object.assign({}, locals, {postcode});
  }

  configure(req, res, callback) {
    const field = this.options.locals.field;
    const addresses = req.sessionModel.get(`${field}-addresses`);
    const formattedlist = _.map(_.map(addresses, 'formatted_address'), address => {
      address = address.split('\n').join(', ');
      return {
        value: address,
        label: address
      };
    });

    const count = `${formattedlist.length} addresses`;
    req.form.options.fields[`${field}-address-lookup`].options = [{value: '', label: count}].concat(formattedlist);
    callback();
  }

  saveValues(req, res, callback) {
    const field = this.options.locals.field;
    req.form.values[`${field}-address-lookup`] = req.form.values[`${field}-address-lookup`].split(', ').join('\n');
    req.sessionModel.unset('addresses');
    super.saveValues(req, res, callback);
  }

};
