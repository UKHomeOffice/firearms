'use strict';

const _ = require('lodash');
const AddressController = require('./base');
const PostcodesModel = require('../../models/postcodes');

module.exports = class PostcodeController extends AddressController {

  configure(req, res, callback) {
    const field = `${req.form.options.prefix}-postcode`;
    // add postcode field
    req.form.options.fields[field] = Object.assign({
      mixin: 'input-text-code',
      formatter: 'uppercase',
      validate: ['required', 'postcode']
    }, req.form.options.fieldSettings);

    // add conditonal fork
    req.form.options.forks = req.form.options.forks || [];
    req.form.options.forks.push({
      target: req.form.options.select,
      condition(r) {
        const addresses = r.sessionModel.get(`${r.form.options.prefix}-addresses`);
        return addresses && addresses.length;
      }
    });

    // set default (manual) next step
    req.form.options.next = req.form.options.manual;
    callback();
  }

  getValues(req, res, callback) {
    req.sessionModel.unset('postcodeApiMeta');
    super.getValues(req, res, callback);
  }

  saveValues(req, res, callback) {
    const field = `${req.form.options.prefix}-postcode`;
    const postcode = req.form.values[field];

    if (!postcode) {
      return callback();
    }

    if (_.startsWith(postcode, 'BT')) {
      req.sessionModel.unset('postcodeApiMeta');
      req.sessionModel.unset(`${req.form.options.prefix}-addresses`);
      return callback();
    }

    const postcodesModel = new PostcodesModel();
    postcodesModel.fetch(postcode)
      .then(data => {
        if (data.length) {
          const mapper = req.form.options.formatAddress || (a => a);
          req.sessionModel.set(`${req.form.options.prefix}-addresses`, data.map(mapper));
        } else {
          req.sessionModel.unset(`${req.form.options.prefix}-addresses`);
          req.sessionModel.set('postcodeApiMeta', {
            messageKey: 'not-found'
          });
        }
      }, callback)
      .then(() => {
        super.saveValues(req, res, callback);
      });
  }

};
