'use strict';

const _ = require('lodash');
const addressFields = ['building', 'street', 'townOrCity', 'postcodeOrZIPCode'];

/**
 * Formats and concatenates all address fields into one value in the session model
 *
 * @param {Object} req - request parameters
 * @param {string} pageName - name of the page containing the address fields
 * @param {string} concatAddress - address value name created in the session model
 */

module.exports = (pageName, concatAddress) => {
  return superclass => class extends superclass {
    saveValues(req, res, next) {
      super.saveValues(req, res, err => {
        req.sessionModel.set(concatAddress, _.filter(addressFields.map(field =>
          req.sessionModel.get(pageName + '-' + field))).join(', '));
        next(err);
      });
    }
  };
};
