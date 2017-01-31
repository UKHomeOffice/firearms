'use strict';

const _ = require('lodash');
const LoopController = require('../../common/controllers/loop');

module.exports = class LocationAddressLoopController extends LoopController {

  getLoopFields(req, res) {
    return _.mapKeys(super.getLoopFields(req, res), (value, key) => key.replace(/^location\-/, ''));
  }

  locals(req, res) {
    const locals = super.locals(req, res);
    const items = locals.items.map((address) => {
      return {
        address: address.address,
        categories: this.translateCategories(req, address['address-category'])
      };
    });
    return Object.assign({}, locals, {
      items: items,
      hasCategories: _.some(items, (address) => address.categories.length)
    });
  }

  translateCategories(req, values) {
    return _.castArray(values).map(value => {
      const key = `fields.location-address-category.options.${value}.label`;
      const result = req.translate(key);
      return result === key ? value : result;
    }).join('\n');
  }

};
