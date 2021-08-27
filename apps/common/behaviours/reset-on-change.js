'use strict';

/**
 * Delete supplied fields from session
 *
 * @param {object} req - request object
 * @param {object} config - object containing configuration details for function
 * for example config = { fieldsForRemoval ['supporting-document'], currentField: 'activity'}
 *
 * @returns {void}
 */

module.exports = config => superclass => class extends superclass {
  process(req, res, cb) {
    const {fieldsForRemoval, currentField} = config;
    const currentValue = req.sessionModel.get(currentField);
    if (currentValue) {
      // Clears session model when switching routes
      if (req.form.values[config.currentField] !== req.sessionModel.get(currentField)) {
        // delete each field from the session
        fieldsForRemoval.forEach(field => {
          req.sessionModel.unset(field);
        });
      }
    }
    super.process(req, res, cb);
  }
};
