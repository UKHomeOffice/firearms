'use strict';

const _ = require('lodash');
const BaseController = require('../../common/controllers/base');

module.exports = class LocationAddressCategoryController extends BaseController {
  getValues(req, res, callback) {
    super.getValues(req, res, (err, values) => {
      if (err) {
        return callback(err);
      }
      if (req.params.action === 'edit') {
        const address = values.storageAddresses[req.params.id];
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
    const addresses = req.sessionModel.get('storageAddresses');
    const categories = {categories: req.form.values['location-address-category']};
    const id = req.params.action === 'edit' ? req.params.id : _.last(Object.keys(addresses));
    const storageAddresses = Object.assign(addresses[id], categories);
    req.sessionModel.set(storageAddresses);
    super.saveValues(req, res, callback);
  }
};
