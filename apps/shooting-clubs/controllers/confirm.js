'use strict';

const Controller = require('../../common/controllers/confirm');

module.exports = class ConfirmController extends Controller {

  getFieldData(field, req) {
    const defaults = super.getFieldData(field, req);

    if (field.field === 'location-addresses') {
      return defaults.value.map(address => {
        return Object.assign({}, defaults, {
          label: address.address,
          value: [].concat(address['address-category'])
            .map(category => req.translate(`fields.location-address-category.options.${category}.label`))
            .join('\n')
        });
      });
    }
    return defaults;
  }

};
