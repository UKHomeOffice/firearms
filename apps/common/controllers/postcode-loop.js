'use strict';

const _ = require('lodash');
const BaseAddressController = require('./base-address');
const PostcodesModel = require('../models/postcodes');

module.exports = class PostcodeLoopController extends BaseAddressController {
  locals(req, res) {
    const id = req.params.action === 'edit' ? req.params.id : '';
    return Object.assign({}, super.locals(req, res), {
      id
    });
  }

  getValues(req, res, callback) {
    super.getValues(req, res, (err, values) => {
      if (err) {
        return callback(err);
      }
      if (req.params.action === 'edit') {
        const address = values[this.options.addressKey][req.params.id];
        const postcode = {};
        postcode[`${this.options.locals.field}-postcode`] = address.postcode;
        this.addressId = req.params.id;
        return callback(null, Object.assign({}, values,
          postcode
        ));
      }
      this.addressId = '';
      return callback(null, values);
    });
  }

  saveValues(req, res, cb) {
    const saveValues = super.saveValues(req, res, cb);
    this.postcodeChanged = req.form.values[`${this.options.locals.field}-postcode`]
      !== req.sessionModel.get(`${this.options.locals.field}-postcode`);
    return saveValues;
  }

  getNextStep(req, res) {
    const nextStep = super.getNextStep(req, res);
    if (req.method === 'POST') {
      return `${nextStep}/${this.addressId}`;
    }
    return nextStep;
  }

  get(req, res, callback) {
    if (req.params.action === 'delete' && req.params.id) {
      return this.removeItem(req, res);
    }
    return super.get(req, res, callback);
  }

  removeItem(req, res) {
    const items = req.sessionModel.get(this.options.addressKey);
    req.sessionModel.set(this.options.addressKey,
      _.omit(items, req.params.id));
    const step = _.size(items) > 1 ? `/${this.options.locals.field}-add-another-address` :
      `/${this.options.locals.field}-postcode`;
    return res.redirect(`${req.baseUrl}${step}`);
  }

  process(req, res, callback) {
    const postcodesModel = new PostcodesModel();
    const postcode = req.form.values[`${this.options.locals.field}-postcode`];
    const previousPostcode = req.sessionModel.get(`${this.options.locals.field}-postcode`);
    if (!postcode
      || previousPostcode && previousPostcode === postcode) {
      return callback();
    }

    if (_.startsWith(postcode, 'BT')) {
      req.sessionModel.unset('postcodeApiMeta');
      req.sessionModel.unset(`${this.options.locals.field}-addresses`);
      return callback();
    }

    postcodesModel.fetch(postcode)
      .then(data => {
        if (data.length) {
          req.sessionModel.set(`${this.options.locals.field}-addresses`, data);
        } else {
          req.sessionModel.unset(`${this.options.locals.field}-addresses`);
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
