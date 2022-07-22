'use strict';

const _ = require('lodash');
const uuid = require('uuid/v1');
const path = require('path');
const express = require('express');
const BaseController = require('./base');

module.exports = class LoopController extends BaseController {
  constructor(options) {
    if (!options.returnTo) {
      throw new Error('options.returnTo is required for loops');
    }
    if (!options.aggregateTo) {
      throw new Error('options.aggregateTo is required for loops');
    }
    if (!options.aggregateFields || !options.aggregateFields.length) {
      throw new Error('options.aggregateField is required for loops');
    }
    super(options);
  }

  get(req, res, callback) {
    if (req.query.delete) {
      const router = express.Router({ mergeParams: true });
      router.use([
        // eslint-disable-next-line no-underscore-dangle
        this._configure.bind(this),
        this.removeItem.bind(this),
        this.reload.bind(this)
      ]);
      return router.handle(req, res, callback);
    }
    return super.get(req, res, callback);
  }

  removeItem(req, res, callback) {
    const id = req.query.delete;
    const items = req.sessionModel.get(req.form.options.aggregateTo).filter(item => item.id !== id);
    req.sessionModel.set(req.form.options.aggregateTo, items);
    callback();
  }

  // eslint-disable-next-line no-unused-vars
  reload(req, res, callback) {
    const items = req.sessionModel.get(req.form.options.aggregateTo);
    if (!items.length) {
      req.sessionModel.set(`${req.form.options.aggregateTo}-saved`, false);
      req.form.options.aggregateFields.forEach(field => {
        req.sessionModel.unset(field);
      });
    }
    const target = items.length ? req.form.options.route : req.form.options.returnTo;
    const action = req.params.action || '';
    res.redirect(path.join(req.baseUrl, target, action));
  }

  configure(req, res, callback) {
    const field = `${req.form.options.aggregateTo}-add-another`;
    // add yes/no field
    req.form.options.fields[field] = Object.assign({
      mixin: 'radio-group',
      validate: ['required'],
      options: [
        'yes', 'no'
      ]
    }, req.form.options.fieldSettings);

    // add conditonal fork
    req.form.options.forks = req.form.options.forks || [];
    req.form.options.forks.push({
      target: req.form.options.returnTo,
      continueOnEdit: true,
      condition: {
        field: field,
        value: 'yes'
      }
    });

    // add renew warning for new-dealer
    if (req.sessionModel.options.key === 'hof-wizard-new-dealer') {
      if (req.sessionModel.get('activity') === 'renew' || req.sessionModel.get('activity') === 'vary') {
        Object.keys(req.form.options.fields).forEach(key => {
          req.form.options.fields[key].isWarning = true;
        });
      }
    }
    callback();
  }

  getValues(req, res, callback) {
    const aggregate = req.sessionModel.get(req.form.options.aggregateTo) || [];
    const added = req.sessionModel.get(`${req.form.options.aggregateTo}-saved`);
    return super.getValues(req, res, (err, values) => {
      if (err) {
        return callback(err);
      }
      if (!added) {
        const fields = this.getLoopFields(req, res);
        if (!_.isEmpty(fields)) {
          aggregate.push(Object.assign({ id: uuid() }, fields));
          req.sessionModel.set(req.form.options.aggregateTo, aggregate);
          values[req.form.options.aggregateTo] = aggregate;
          req.form.options.aggregateFields.forEach(f => {
            req.sessionModel.unset(f);
          });
          req.sessionModel.set(`${req.form.options.aggregateTo}-saved`, true);
        }
      }
      return callback(null, values);
    });
  }

  // eslint-disable-next-line no-unused-vars
  getLoopFields(req, res) {
    return _.pick(req.sessionModel.toJSON(), req.form.options.aggregateFields);
  }

  locals(req, res) {
    const items = req.form.values[req.form.options.aggregateTo] || [];
    return Object.assign({}, super.locals(req, res), {
      items,
      hasItems: items.length > 0,
      field: req.form.options.aggregateTo
    });
  }

  saveValues(req, res, callback) {
    // remove "yes" value from session so it is no pre-populated next time around
    super.saveValues(req, res, err => {
      const field = `${req.form.options.aggregateTo}-add-another`;
      if (req.form.values[field] === 'yes') {
        req.sessionModel.unset(field);
        req.sessionModel.set(`${req.form.options.aggregateTo}-saved`, false);
      }
      callback(err);
    });
  }
};
