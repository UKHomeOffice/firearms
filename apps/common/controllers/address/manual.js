'use strict';

const AddressController = require('./base');

module.exports = class ManualAddressController extends AddressController {

  configure(req, res, callback) {
    const defaults = {
      validate: 'required',
      mixin: 'textarea',
      formatter: ['trim', 'hyphens'],
      label: req.translate(`fields.${req.form.options.prefix}-address-manual.label`)
    };
    const name = `${req.form.options.prefix}-address`;
    req.form.options.fields[name] = Object.assign(defaults, req.form.options.fieldSettings);

    callback();
  }

  locals(req, res) {
    return Object.assign({}, super.locals(req, res), {
      postcode: req.form.values[`${req.form.options.prefix}-postcode`],
      postcodeApiMessageKey: (req.sessionModel.get('postcodeApiMeta') || {}).messageKey
    });
  }

  setErrors(errors, req, res) {
    if (errors) {
      const key = `${req.form.options.prefix}-address`;
      if (errors[key]) {
        errors[key].type += '-manual';
      }
    }
    super.setErrors(errors, req, res);
  }

};
