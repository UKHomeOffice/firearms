'use strict';

const Controller = require('hof-form-controller');

module.exports = class BaseController extends Controller {
  locals(req, res) {
    const locals = super.locals(req, res);
    const renew = req.sessionModel.get('activity') === 'renew' && locals.renew === true;
    return Object.assign({}, locals, {
      renew
    });
  }
};
