'use strict';

const Controller = require('hof').controller;

module.exports = class BaseController extends Controller {
  locals(req, res) {
    const locals = super.locals(req, res);
    const activity = req.sessionModel.get('activity');
    const renew = (activity === 'renew' || activity === 'vary') && locals.renew;
    const fields = locals.fields.filter(field => !req.form.options.fields[field.key].dependent);
    const usage = req.sessionModel.get('usage') || [];
    return Object.assign({}, locals, {
      fields,
      renew,
      armGuards: usage.indexOf('arm-guards') > -1
    });
  }
};
