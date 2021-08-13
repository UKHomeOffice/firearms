'use strict';

const BaseController = require('../../common/controllers/base');

module.exports = class UploadController extends BaseController {
  get(req, res, callback) {
    if (req.query.delete) {
      return this.removeItem(req, res);
    }
    return super.get(req, res, callback);
  }

  removeItem(req, res) {
    const items = req.sessionModel.get('supporting-documents') || [];
    req.sessionModel.set('supporting-documents', items.filter(file => file.id !== req.query.delete));
    res.redirect(req.get('referer'));
  }
};
