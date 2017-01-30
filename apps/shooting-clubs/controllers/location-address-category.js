'use strict';

const _ = require('lodash');
const BaseAddressController = require('../../common/controllers/base-address');

module.exports = class LocationAddressCategoryController extends BaseAddressController {
  getValues(req, res, callback) {
    super.getValues(req, res, (err, values) => {
      if (err) {
        return callback(err);
      }
      if (req.params.action === 'edit') {
        const address = values.locationAddresses[req.params.id];
        const categories = {};
        categories['location-address-category'] = address.categories;
        return callback(null, Object.assign({}, values,
          categories
        ));
      }
      return callback(null, values);
    });
  }

  saveValues(req, res, callback) {
    const addresses = req.sessionModel.get(this.options.addressKey);
    const categories = {categories: req.form.values['location-address-category']};
    const id = req.params.action === 'edit' ? req.params.id : _.last(Object.keys(addresses));
    const locationAddresses = Object.assign(addresses[id], categories);
    req.sessionModel.set(locationAddresses);
    super.saveValues(req, res, callback);
  }
};
