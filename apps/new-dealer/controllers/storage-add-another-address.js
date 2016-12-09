'use strict';

const _ = require('lodash');
const BaseController = require('../../common/controllers/base');

module.exports = class StorageAddAnotherAddress extends BaseController {
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

  get(req, res, callback) {
    if (req.params.action === 'delete' && req.params.id) {
      return this.removeItem(req, res);
    }
    return super.get(req, res, callback);
  }

  removeItem(req, res) {
    const items = req.sessionModel.get('storageAddresses');
    req.sessionModel.set('storageAddresses', _.omit(items, req.params.id));
    const step = _.size(items) > 1 ? '/storage-add-another-address' : '/storage-postcode';
    return res.redirect(`${req.baseUrl}${step}`);
  }

  getBackLink(req) {
    const addresses = req.sessionModel.get('storageAddresses');
    const id = _.last(Object.keys(addresses));
    return `/s5/storage-postcode/edit/${id}`;
  }
};
