'use strict';

const _ = require('lodash');
const BaseController = require('./base');
const PostcodesModel = require('../models/postcodes');
const path = require('path');

module.exports = class PostcodeController extends BaseController {
  locals(req, res) {
    const locals = super.locals(req, res);
    return Object.assign(locals, {
      'manual-entry': path.join(req.baseUrl, `${locals.field}-address`, req.params.action || '')
    });
  }

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
        req.log('error', 'Postcode lookup error: ',
          `Code: ${err.status}; Detail: ${err.detail}`);
        return callback();
      });
  }
};
