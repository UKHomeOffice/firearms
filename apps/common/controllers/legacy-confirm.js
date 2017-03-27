'use strict';

const _ = require('lodash');
const i18nLookup = require('i18n-lookup');
const BaseController = require('./base');
const Mustache = require('mustache');
const helpers = require('hof-controllers/lib/util/helpers');

/**
 * Extends the BaseController extending res.locals
 * with tableSections - a formatted representation
 * of the sessionModel for contructing a confirm page
 * @class
 * @extends BaseController
 */
module.exports = class ConfirmController extends BaseController {
  /**
   * utility function to format data from steps config,
   * fields config, and sessionModel into an array of sections
   * each containing an array of fields, this is for displaying
   * in the confirm table and the confirmation email
   * @param {Object} data - JSON representation of the sessionModel
   * @param {Function} translate - the translate function
   * @returns {Object} the formatted data
   */
  formatData(data, translate) {
    const steps = this.options.steps;
    const fields = this.options.fieldsConfig;
    const lookup = i18nLookup(translate, Mustache.render);
    return _(steps)
      .reject(step => !step.locals || !step.fields || _.every(
        step.fields,
        field => helpers.isEmptyValue(data[field])
      ))
      .groupBy(step => step.locals.section)
      .map((groupedSteps, section) => ({
        section: helpers.getTranslation(lookup, section),
        fields: _(groupedSteps)
          .map('fields')
          .flatten()
          .reject(field => (fields[field] &&
            fields[field].includeInSummary === false) ||
            helpers.isEmptyValue(data[field]))
          .uniq()
          .map(field => ({
            field,
            step: helpers.getStepFromFieldName(field, steps, data.steps),
            label: helpers.getTranslation(lookup, field, true),
            value: helpers.hasOptions(fields[field].mixin) ?
              helpers.getValue(translate, field, data[field]) :
              data[field]
          }))
          .value()
      }))
      .value();
  }

  /**
   * extends super.locals with rows - a formatted representation
   * of the user entered data grouped by section.
   * @param {Object} req - the HTTP request object
   * @param {Object} res - the HTTP response object
   * @returns {Object} return value of super.locals extended with rows
   */
  locals(req, res) {
    return Object.assign({}, super.locals(req, res), {
      rows: this.formatData(req.sessionModel.toJSON(), req.translate)
    });
  }
};
