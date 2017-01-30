'use strict';

const _ = require('lodash');
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
      condition: {
        field: field,
        value: 'yes'
      }
    });
    callback();
  }

  getValues(req, res, callback) {
    const aggregate = req.sessionModel.get(req.form.options.aggregateTo) || [];
    const added = req.sessionModel.get(`${req.form.options.aggregateTo}-saved`);
    super.getValues(req, res, (err, values) => {
      if (err) {
        return callback(err);
      }
      if (!added) {
        aggregate.push(_.pick(req.sessionModel.toJSON(), req.form.options.aggregateFields));
        req.sessionModel.set(req.form.options.aggregateTo, aggregate);
        values[req.form.options.aggregateTo] = aggregate;
        req.sessionModel.set(`${req.form.options.aggregateTo}-saved`, true);
      }
      callback(null, values);
    });
  }

  saveValues(req, res, callback) {
    // remove "yes" value from session so it is no pre-populated next time around
    super.saveValues(req, res, (err) => {
      const field = `${req.form.options.aggregateTo}-add-another`;
      if (req.form.values[field] === 'yes') {
        req.sessionModel.unset(field);
        req.sessionModel.unset(req.form.options.aggregateFields);
        req.sessionModel.set(`${req.form.options.aggregateTo}-saved`, false);
      }
      callback(err);
    });
  }

};
