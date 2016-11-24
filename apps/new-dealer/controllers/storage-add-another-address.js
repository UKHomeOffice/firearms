'use strict';

const _ = require('lodash');
const BaseController = require('./base');

module.exports = class AddNewAddress extends BaseController {
  locals(req, res, callback) {
    const locals = super.locals(req, res, callback);
    const addresses = req.sessionModel.get('storageAddresses');
    const hasStorageAddresses = req.sessionModel.get('storageAddresses') ? true : false;
    const storageAddresses = [];
    _.forEach(addresses, (value, key) => {
      const address = {
        id: key,
        address: value.address
      };
      storageAddresses.push(address);
    });
    return Object.assign({}, locals, {
      storageAddresses,
      hasStorageAddresses
    });
  }

  getBackLink(req, res, callback) {
    const addresses = req.sessionModel.get('storageAddresses');
    const id = _.last(Object.keys(addresses));
    return `${super.getBackLink(req, res, callback)}/edit/${id}`;
  }
};
