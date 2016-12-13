'use strict';

const _ = require('lodash');
const BaseController = require('./base');
const PostcodesModel = require('../models/postcodes');

module.exports = class PostcodeLoopController extends BaseController {
  constructor(options) {
    super(options);
    if (options.locals.field) {
      this.field = options.locals.field;
    } else {
      // eslint-disable-next-line no-console
      console.error('No field set in locals');
    }
  }

  locals(req, res) {
    const locals = super.locals(req, res);
    const addresses = req.sessionModel.get(`${this.field}Addresses`);
    const hasAddresses = _.size(addresses);
    const items = [];
    _.forEach(addresses, (value, key) => {
      const address = {
        id: key,
        address: value.address
      };
      items.push(address);
    });
    let id = '';
    if (req.params.action === 'edit') {
      id = req.params.id;
    }
    return Object.assign({}, locals, {items, hasAddresses, id});
  }

  getValues(req, res, callback) {
    super.getValues(req, res, (err, values) => {
      if (err) {
        return callback(err);
      }
      if (req.params.action === 'edit') {
        const address = values[`${this.field}Addresses`][req.params.id];
        const postcode = {};
        postcode[`${this.field}-postcode`] = address.postcode;
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
    this.postcodeChanged = req.form.values[`${this.field}-postcode`] !== req.sessionModel.get(`${this.field}-postcode`);
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
      return this.removeItem(req, res, this.field);
    }
    return super.get(req, res, callback);
  }

  removeItem(req, res, field) {
    const items = req.sessionModel.get(`${field}Addresses`);
    req.sessionModel.set(`${field}Addresses`, _.omit(items, req.params.id));
    const step = _.size(items) > 1 ? `/${field}-add-another-address` : `/${field}-postcode`;
    return res.redirect(`${req.baseUrl}${step}`);
  }

  process(req, res, callback) {
    const postcodesModel = new PostcodesModel();
    const postcode = req.form.values[`${this.field}-postcode`];
    const previousPostcode = req.sessionModel.get(`${this.field}-postcode`);
    if (!postcode
      || previousPostcode && previousPostcode === postcode) {
      return callback();
    }

    if (_.startsWith(postcode, 'BT')) {
      req.sessionModel.unset('postcodeApiMeta');
      req.sessionModel.unset(`${this.field}-addresses`);
      return callback();
    }

    postcodesModel.fetch(postcode)
      .then(data => {
        if (data.length) {
          req.sessionModel.set(`${this.field}-addresses`, data);
        } else {
          req.sessionModel.unset(`${this.field}-addresses`);
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
