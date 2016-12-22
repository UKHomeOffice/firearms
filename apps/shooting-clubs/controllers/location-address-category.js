'use strict';

const _ = require('lodash');
const BaseController = require('../../common/controllers/base');

module.exports = class LocationAddressCategoryController extends BaseController {
  locals(req, res) {
    const locals = super.locals(req, res);
    const addresses = req.sessionModel.get('locationAddresses');
    const hasAddresses = _.size(addresses) && addresses[0].categories !== undefined;
    const hasCategories = hasAddresses ? addresses[0].categories !== undefined : false;
    const items = _.map(_.filter(addresses, (value) => {
      return value.categories !== undefined;
    }), (value, key) => ({
      id: key,
      address: value.address,
      categories: this.translateCategories(req, value.categories)
    }));
    return Object.assign({}, locals, {
      items,
      hasAddresses,
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
    const addresses = req.sessionModel.get('locationAddresses');
    const categories = {categories: req.form.values['location-address-category']};
    const id = req.params.action === 'edit' ? req.params.id : _.last(Object.keys(addresses));
    const locationAddresses = Object.assign(addresses[id], categories);
    req.sessionModel.set(locationAddresses);
    super.saveValues(req, res, callback);
  }
};
