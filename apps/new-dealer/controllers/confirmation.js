'use strict';

const BaseController = require('./base');

module.exports = class ConfirmationController extends BaseController {
  locals(req, res, callback) {
    const locals = super.locals(req, res, callback);
    const content = req.rawTranslate('pages.confirmation.evidence-list');
    const armedGuardsContent = req.rawTranslate('pages.confirmation.armed-guards-list');
    const isArmedGuards = req.form.values.usage === 'arm-guards';
    return Object.assign({}, locals, {
      content,
      isArmedGuards,
      armedGuardsContent
    });
  }
};
