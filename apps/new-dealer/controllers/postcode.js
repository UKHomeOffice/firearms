'use strict';

const BaseController = require('./base');
const PostcodesModel = require('../models/postcodes');
const logger = require('../../../node_modules/hof-bootstrap/lib/logger');
const _ = require('lodash');

module.exports = class PostcodeController extends BaseController {
  process(req, res, callback) {
    const postcodesModel = new PostcodesModel();
    const field = this.options.locals.field;
    const postcode = req.form.values[`${field}-postcode`];
    const previousPostcode = req.sessionModel.get(`${field}-postcode`);
    if (!postcode
      || previousPostcode && previousPostcode === postcode) {
      return callback();
    }

    if (_.startsWith(postcode, 'BT')) {
      req.sessionModel.unset('postcodeApiMeta');
      req.sessionModel.unset(`${field}-addresses`);
      return callback();
    }

    postcodesModel.fetch(postcode)
      .then(data => {
        if (data.length) {
          req.sessionModel.set(`${field}-addresses`, data);
        } else {
          req.sessionModel.unset(`${field}-addresses`);
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
        logger.error('Postcode lookup error: ',
          `Code: ${err.status}; Detail: ${err.detail}`);
        return callback();
      });
  }
};
