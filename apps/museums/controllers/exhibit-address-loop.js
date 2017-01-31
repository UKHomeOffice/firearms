'use strict';

const _ = require('lodash');
const LoopController = require('../../common/controllers/loop');

module.exports = class LocationAddressLoopController extends LoopController {

  getLoopFields(req, res) {
    return _.mapKeys(super.getLoopFields(req, res), (value, key) => key.replace(/^exhibit\-/, ''));
  }

  locals(req, res) {
    const locals = super.locals(req, res);
    const items = locals.items.map((address) => {
      return {
        address: address.address
      };
    });
    return Object.assign({}, locals, {
      items: items
    });
  }
};
