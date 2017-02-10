'use strict';

const controllers = require('hof-confirm-controller');

module.exports = class ConfirmController extends controllers {

  locals(req, res) {
    const content = req.rawTranslate('pages.confirm');
    return Object.assign({}, super.locals(req, res), {content});
  }

};
