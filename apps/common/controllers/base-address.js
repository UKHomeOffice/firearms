'use strict';

const BaseController = require('./base');
const _ = require('lodash');

module.exports = class BaseAddressController extends BaseController {
	translateCategories(req, values) {
    return _.castArray(values).map(value => {
      let key = `fields.location-address-category.options.${value}.label`;
      let result = req.translate(key);
      return result === key ? value : result;
    }).join('\n');
  }
};
