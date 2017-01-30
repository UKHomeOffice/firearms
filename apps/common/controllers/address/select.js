'use strict';

const AddressController = require('./base');

module.exports = class AddressSelectController extends AddressController {

  configure(req, res, callback) {
    const addresses = req.sessionModel.get(`${req.form.options.prefix}-addresses`);
    const list = addresses.map(add => ({value: add, label: add}));

    const defaults = {
      validate: 'required',
      mixin: 'select',
      label: req.translate(`fields.${req.form.options.prefix}-address-select.label`)
    };
    const name = `${req.form.options.prefix}-address`;
    req.form.options.fields[name] = Object.assign(defaults, req.form.options.fieldSettings, {
      options: list
    });

    if (req.form.options.fields[`${req.form.options.prefix}-address`].mixin === 'select') {
      const count = `${list.length} address${list.length > 1 ? 'es' : ''}`;
      req.form.options.fields[`${req.form.options.prefix}-address`].options.unshift({value: '', label: count});
    }
    callback();
  }

  locals(req, res) {
    return Object.assign({}, super.locals(req, res), {
      postcode: req.form.values[`${req.form.options.prefix}-postcode`]
    });
  }

};
