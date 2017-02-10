'use strict';

const _ = require('lodash');
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

  saveValues(req, res, callback) {
    const addresses = []
      .concat(req.form.values['storage-address-range'])
      .concat(req.form.values['storage-address-secretary']);
    req.form.values['storage-addresses'] = addresses;
    super.saveValues(req, res, callback);
  }
};
