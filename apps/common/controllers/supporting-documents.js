'use strict';

const BaseController = require('../controllers/base');
const UploadModel = require('../models/file-upload');

const config = require('../../../config');

const uuid = require('uuid');
const path = require('path');

module.exports = class UploadController extends BaseController {
  locals(req, res) {
    const content = req.rawTranslate('pages.supporting-documents');
    // Only show the header if we're in the NEW journey
    return Object.assign({}, super.locals(req, res), { optionalSubheader:
        (req.sessionModel.get('activity') === 'new' ? content.optionalSubheader : '') });
  }

  get(req, res, next) {
    const docs = req.sessionModel.get('supporting-documents') || [];
    if (docs.length) {
      this.emit('complete', req, res);
    }
    super.get(req, res, next);
  }

  process(req, res, next) {
    const file = req.files['supporting-document-upload'];
    if (file && file.truncated) {
      const err = new this.ValidationError('supporting-document-upload', {
        type: 'filesize',
        arguments: [config.upload.maxfilesize]
      }, req, res);
      return next({
        'supporting-document-upload': err
      });
    }
    if (file && file.data && file.data.length) {
      req.form.values['supporting-document-filename'] = file.name;
      const model = new UploadModel(file);
      return model.save()
        .then(result => {
          req.form.values['supporting-document-upload'] = result.url;
          req.form.values['supporting-document-type'] = file.mimetype;
        })
        .then(() => next())
        .catch(e => {
          if (e.code === 'FileExtensionNotAllowed') {
            const err = new this.ValidationError('supporting-document-upload', {
              type: 'filetype',
              arguments: [path.extname(file.name)]
            }, req, res);
            return next({
              'supporting-document-upload': err
            });
          }
          return next(e);
        });
    }
    return next();
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
    super.saveValues(req, res, err => {
      req.sessionModel.unset('supporting-document-add-another');
      req.sessionModel.unset('supporting-document-description');
      req.sessionModel.unset('supporting-document-filename');
      req.sessionModel.unset('supporting-document-upload');
      req.sessionModel.unset('supporting-document-type');
      next(err);
    });
  }
};
