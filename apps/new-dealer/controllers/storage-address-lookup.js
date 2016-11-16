'use strict';

const BaseController = require('./base');
const ErrorController = require('hof').controllers.error;
const _ = require('lodash');

module.exports = class StorageAddressLookup extends BaseController {
  locals(req, res) {
    const locals = super.locals(req, res);
    const addresses = req.sessionModel.get('storageAddresses');
    const hasStorageAddresses = req.sessionModel.get('storageAddresses') ? true : false;
    const storageAddresses = [];
    let postcode;
    let id;
    _.forEach(addresses, (value, key) => {
      const address = {
        id: key,
        address: value.address
      };
      storageAddresses.push(address);
    });
    if (req.params.action === 'edit') {
      id = req.params.id;
      postcode = req.sessionModel.get('storage-postcode') || addresses[id].postcode;
    } else {
      postcode = req.sessionModel.get('storage-postcode');
    }
    return Object.assign({}, locals, {storageAddresses, hasStorageAddresses, postcode, id});
  }

  getBackLink(req, res, callback) {
    const id = req.params.action === 'edit' ? req.params.id : '';
    return `${super.getBackLink(req, res, callback)}/${id}`;
  }

  getValues(req, res, callback) {
    if (req.params.action === 'edit') {
      const steps = req.sessionModel.get('steps');
      _.remove(steps, step => {
        return step === '/storage-add-another-address';
      });
      req.sessionModel.set('steps', steps);
      req.sessionModel.unset('storage-add-another-address');
    }
    const field = this.options.locals.field;
    const addresses = req.sessionModel.get('storage-addresses');
    const formattedlist = _.map(_.map(addresses, 'formatted_address'), address => {
      address = address.split('\n').join(', ');
      return {
        value: address,
        label: address
      };
    });

    const count = `${formattedlist.length} addresses`;
    this.options.fields[`${field}-address-lookup`].options = [{value: count, label: count}].concat(formattedlist);
    super.getValues(req, res, callback);
  }

  saveValues(req, res, callback) {
    const address = req.form.values['storage-address-lookup'];
    let postcode;
    let storageAddresses = req.sessionModel.get('storageAddresses') || {};
    let id = req.params.id;

    if (id === undefined) {
      const currentIndex = req.sessionModel.get('currentIndex') || 0;
      id = parseInt(currentIndex, 10);
      req.sessionModel.set('currentIndex', id + 1);
    }
    postcode = req.sessionModel.get('storage-postcode') || storageAddresses[id].postcode;
    storageAddresses[id] = {
      address,
      postcode
    };
    req.sessionModel.set({storageAddresses});
    req.sessionModel.unset('storage-postcode');
    super.saveValues(req, res, callback);
  }

  post(req, res, cb) {
    this.getValues(req, res, () => {});
    super.post(req, res, cb);
  }

  validateField(key, req) {
    if (req.form.values[key] === this.options.fields['storage-address-lookup'].options[0].value) {
      return new ErrorController('storage-address-lookup', {
        key: 'storage-address-lookup',
        type: 'required',
        redirect: undefined
      });
    }
  }
};
