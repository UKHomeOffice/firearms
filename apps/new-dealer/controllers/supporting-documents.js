'use strict';

const BaseController = require('../../common/controllers/base');
const UploadModel = require('../../common/models/file-upload');

module.exports = class UploadController extends BaseController {
  process(req, res, next) {
    const file = req.files['supporting-document-upload'];
    if (file && file.data && file.data.length) {
      const model = new UploadModel(file);
      model.save()
        .then(() => {
          req.form.values['supporting-document-upload'] = model.get('upload-url');
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
      url: req.form.values['supporting-document-upload'],
      description: req.form.values['supporting-document-description']
    });
    req.sessionModel.set('supporting-documents', files);
    super.saveValues(req, res, (err) => {
      req.sessionModel.unset('supporting-document-add-another');
      req.sessionModel.unset('supporting-document-description');
      req.sessionModel.unset('supporting-document-upload');
      next(err);
    });
  }
};
