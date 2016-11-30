'use strict';

const _ = require('lodash');
const BaseController = require('./base');

module.exports = class AddressController extends BaseController {
  locals(req, res, callback) {
    const isManual = req.params.action === 'manual';
    const locals = super.locals(req, res, callback);
    const postcode = req.sessionModel.get('storage-postcode');
    const addresses = req.sessionModel.get('storageAddresses');
    const hasStorageAddresses = _.size(addresses) > 0 ? true : false;
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
      hasStorageAddresses,
      postcode,
      postcodeApiMessageKey: isManual ? '' : (req.sessionModel.get('postcodeApiMeta') || {}).messageKey
    });
  }

  getBackLink(req, res, callback) {
    const backLink = super.getBackLink(req, res, callback);
    if (req.params.id && req.params.id !== undefined) {
      const id = req.params.id;
      const back = req.params.action === 'edit' ? `${backLink}/${id}` : `${backLink}/edit/${id}`;
      return back;
    }
    return backLink;
  }

  getValues(req, res, callback) {
    super.getValues(req, res, (err, values) => {
      if (err) {
        return callback(err);
      }
      if (req.params.action === 'manual') {
            req.sessionModel.unset([
              'storage-postcode',
              'postcodeApiMeta'
            ]);
        if (req.params.id !== undefined) {
          const storageAddresses = req.sessionModel.get('storageAddresses');
          const addresses = storageAddresses[req.params.id].address;
          const addressLines = addresses.split(', ').join('\n');
          return callback(null, Object.assign({}, values, {
            'storage-address-manual': addressLines
          }));
        }
      }
      return callback(null, values);
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

  saveValues(req, res, callback) {
    const address = req.form.values['storage-address-manual'];
    const postcode = req.sessionModel.get('storage-postcode');
    let storageAddresses = req.sessionModel.get('storageAddresses') || {};
    let id = req.params.id;
    if (id === undefined) {
      const currentIndex = req.sessionModel.get('currentIndex') || 0;
      id = parseInt(currentIndex, 10);
      req.sessionModel.set('currentIndex', id + 1);
    }
    storageAddresses[id] = {
      address,
      postcode
    };
    req.sessionModel.set({storageAddresses});
    req.sessionModel.unset('storage-postcode');
    super.saveValues(req, res, callback);
  }
};
