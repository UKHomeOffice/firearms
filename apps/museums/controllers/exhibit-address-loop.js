'use strict';

const _ = require('lodash');
const LoopController = require('../../common/controllers/loop');

module.exports = class LocationAddressLoopController extends LoopController {

  getLoopFields(req, res) {
    return _.mapKeys(super.getLoopFields(req, res), (value, key) => key.replace(/^exhibit\-/, ''));
  }

};
