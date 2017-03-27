'use strict';

const BaseController = require('../controllers/base');
const UploadModel = require('../models/file-upload');

const uuid = require('uuid');

module.exports = class UploadController extends BaseController {
  process(req, res, next) {
    const file = req.files['supporting-document-upload'];
    if (file && file.data && file.data.length) {
      req.form.values['supporting-document-filename'] = file.name;
      const model = new UploadModel(file);
      model.save()
        .then((result) => {
          req.form.values['supporting-document-upload'] = result.url;
          req.form.values['supporting-document-type'] = file.mimetype;
        })
        .then(() => next())
        .catch(e => next(e));
    } else {
      next();
    }
  }

  saveValues(req, res, next) {
    const files = req.sessionModel.get('supporting-documents') || [];
    files.push({
      id: uuid.v1(),
      url: req.form.values['supporting-document-upload'],
      description:
        req.form.values['supporting-document-description'] || req.form.values['supporting-document-filename'],
      type: req.form.values['supporting-document-type']
    });
    req.sessionModel.set('supporting-documents', files);
    super.saveValues(req, res, (err) => {
      req.sessionModel.unset('supporting-document-add-another');
      req.sessionModel.unset('supporting-document-description');
      req.sessionModel.unset('supporting-document-filename');
      req.sessionModel.unset('supporting-document-upload');
      req.sessionModel.unset('supporting-document-type');
      next(err);
    });
  }
};
