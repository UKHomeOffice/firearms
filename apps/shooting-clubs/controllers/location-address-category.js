'use strict';

const _ = require('lodash');
const BaseController = require('../../common/controllers/base');

module.exports = class LocationAddressCategoryController extends BaseController {
  saveValues(req, res, callback) {
    const addresses = req.sessionModel.get('storageAddresses');
    const categories = {categories: req.form.values['location-address-category']};
    const id = _.last(Object.keys(addresses));
    const storageAddresses = Object.assign(addresses[id], categories);
    req.sessionModel.set(storageAddresses);
    super.saveValues(req, res, callback);
  }
};
