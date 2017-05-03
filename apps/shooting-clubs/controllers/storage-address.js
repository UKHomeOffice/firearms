'use strict';

const _ = require('lodash');
const uuid = require('uuid');
const BaseController = require('../../common/controllers/base');

module.exports = class StorageAddressController extends BaseController {
  configure(req, res, callback) {
    const rangeAddresses = _.values(req.sessionModel.get('location-addresses')).map(o => {
      return {
        value: o.address,
        label: o.address
      };
    });
    req.form.options.fields['storage-address-range'].options = rangeAddresses;

    const secretaryAddress = req.sessionModel.get('club-secretary-address');
    req.form.options.fields['storage-address-secretary'].options = [{value: secretaryAddress, label: secretaryAddress}];
    callback();
  }

  getValues(req, res, callback) {
    super.getValues(req, res, (err, values) => {
      const fields = ['storage-address-range', 'storage-address-secretary'];
      // check address has not been deselected in a later step
      const allAddresses = values['all-storage-addresses'] || [];
      const isSelected = address => allAddresses.find(a => a.address === address);
      fields.forEach(field => {
        values[field] = [].concat(values[field]).filter(isSelected);
      });
      callback(err, values);
    });
  }

  saveValues(req, res, callback) {
    const addresses = []
      .concat(req.form.values['storage-address-range'])
      .concat(req.form.values['storage-address-secretary'])
      .filter(a => a);
    req.form.values['storage-addresses'] = addresses;

    // update the list of all storage addresses
    req.form.values['all-storage-addresses'] = req.sessionModel.get('all-storage-addresses') || [];

    // remove any pre-existing addresses to cover unchecking checkboxes
    req.form.values['all-storage-addresses'] = req.form.values['all-storage-addresses'].filter(a => !a.preentered);

    // then add back any that are checked now
    addresses.forEach((address) => {
      req.form.values['all-storage-addresses'].push({
        id: uuid.v1(),
        preentered: true,
        address: address
      });
    });

    super.saveValues(req, res, callback);
  }
};
