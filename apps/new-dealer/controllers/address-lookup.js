'use strict';
const BaseController = require('hof').controllers.base;
const ErrorController = require('hof').controllers.error;
const _ = require('lodash');

module.exports = class AddressLookup extends BaseController {

  locals(req, res) {
    const locals = super.locals(req, res);
    const postcode = req.sessionModel.get(`${locals.field}-postcode`);
    return Object.assign({}, locals, {postcode});
  }

  getValues(req, res, callback) {
    const addresses = req.sessionModel.get('addresses');
    const formattedlist = _.map(_.map(addresses, 'formatted_address'), address => {
      address = address.split('\n').join(', ');
      return {
        value: address,
        label: address
      };
    });

    const field = this.options.locals.field;
    const count = `${formattedlist.length} addresses`;
    this.options.fields[`${field}-address-lookup`].options = [{value: count, label: count}].concat(formattedlist);
    super.getValues(req, res, callback);
  }

  saveValues(req, res, callback) {
    const field = this.options.locals.field;
    const addressLines = req.form.values[`${field}-address-lookup`].split(', ').join('\n');
    req.sessionModel.set(`${field}-address-manual`, addressLines);
    req.sessionModel.unset('addresses');

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
