'use strict';

const controllers = require('hof-controllers');

module.exports = class BaseController extends controllers.base {
  locals(req, res) {
    const locals = super.locals(req, res);
    const renew = req.sessionModel.get('activity') === 'renew' && locals.renew === true;
    return Object.assign({}, locals, {
      renew
    });
  }
};
