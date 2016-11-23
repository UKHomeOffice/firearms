'use strict';

const _ = require('lodash');
const BaseController = require('./base');
const PostcodesModel = require('../models/postcodes');

module.exports = class StoragePostcodeController extends BaseController {
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
    let id = '';
    if (req.params.action === 'edit') {
      id = req.params.id;
    }
    return Object.assign({}, locals, {storageAddresses, hasStorageAddresses, id});
  }

  getValues(req, res, callback) {
    super.getValues(req, res, (err, values) => {
      if (err) {
        return callback(err);
      }
      if (req.params.action === 'edit') {
        const address = values.storageAddresses[req.params.id];
        this.addressId = req.params.id;
        return callback(null, Object.assign({}, values, {
          'storage-postcode': address.postcode
        }));
      }
      this.addressId = '';
      return callback(null, values);
    });
  }

  saveValues(req, res, cb) {
    const saveValues = super.saveValues(req, res, cb);
    this.postcodeChanged = req.form.values['storage-postcode'] !== req.sessionModel.get('storage-postcode');
    return saveValues;
  }

  getNextStep(req, res) {
    const nextStep = super.getNextStep(req, res);
    if (req.method === 'POST') {
      return `${nextStep}/${this.addressId}`;
    }
    return nextStep;
  }

  process(req, res, callback) {
    const postcodesModel = new PostcodesModel();
    const postcode = req.form.values['storage-postcode'];
    const previousPostcode = req.sessionModel.get('storage-postcode');
    if (!postcode
      || previousPostcode && previousPostcode === postcode) {
      return callback();
    }

    if (_.startsWith(postcode, 'BT')) {
      req.sessionModel.unset('postcodeApiMeta');
      req.sessionModel.unset('storage-addresses');
      return callback();
    }

    postcodesModel.fetch(postcode)
      .then(data => {
        if (data.length) {
          req.sessionModel.set('storage-addresses', data);
        } else {
          req.sessionModel.unset('storage-addresses');
          req.sessionModel.set('postcodeApiMeta', {
            messageKey: 'not-found'
          });
        }
        return callback();
      })
      .catch(err => {
        req.sessionModel.set('postcodeApiMeta', {
          messageKey: 'cant-connect'
        });
        // eslint-disable-next-line no-console
        console.error('Postcode lookup error: ',
          `Code: ${err.status}; Detail: ${err.detail}`);
        return callback();
      });
  }
};
