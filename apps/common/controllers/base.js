'use strict';

const Controller = require('hof-form-controller');

module.exports = class BaseController extends Controller {

  locals(req, res) {
    const locals = super.locals(req, res);
    const renew = req.sessionModel.get('activity') === 'renew' && locals.renew === true;
    const fields = locals.fields.filter(field => !req.form.options.fields[field.key].dependent);
    return Object.assign({}, locals, {
      fields,
      renew
    });
  }

};
