'use strict';

const Controller = require('hof').controller;

module.exports = class ConfirmController extends Controller {
  locals(req, res) {
    const content = req.rawTranslate('pages.confirm');
    const locals = super.locals(req, res);
    const rows = locals.rows.filter(row => row.fields === undefined || row.fields.length);
    return Object.assign({}, locals, {
      content,
      rows
    });
  }
};
