'use strict';

const BaseController = require('../controllers/base');
const UploadModel = require('../models/file-upload');

const config = require('../../../config');

const uuid = require('uuid');
const path = require('path');

module.exports = class UploadController extends BaseController {

  get(req, res, next) {
    const docs = req.sessionModel.get('existing-authority-documents') || [];
    if (docs.length) {
      this.emit('complete', req, res);
    }
    super.get(req, res, next);
  }

  process(req, res, next) {
    const file = req.files['existing-authority-doc-upload'];
    if (file && file.truncated) {
      const err = new this.ValidationError('existing-authority-doc-upload', {
        type: 'filesize',
        arguments: [config.upload.maxfilesize]
      }, req, res);
      return next({
        'existing-authority-doc-upload': err
      });
    }
    if (file && file.data && file.data.length) {
      req.form.values['existing-authority-doc-filename'] = file.name;
      const model = new UploadModel(file);
      model.save()
        .then((result) => {
          req.form.values['existing-authority-doc-upload'] = result.url;
          req.form.values['existing-authority-doc-type'] = file.mimetype;
        })
        .then(() => next())
        .catch(e => {
          if (e.code === 'FileExtensionNotAllowed') {
            const err = new this.ValidationError('existing-authority-doc-upload', {
              type: 'filetype',
              arguments: [path.extname(file.name)]
            }, req, res);
            return next({
              'existing-authority-doc-upload': err
            });
          }
          next(e);
        });
    } else {
      next();
    }
  }

  saveValues(req, res, next) {
    const files = req.sessionModel.get('existing-authority-documents') || [];
    files.push({
      id: uuid.v1(),
      url: req.form.values['existing-authority-doc-upload'],
      description:
        req.form.values['existing-authority-doc-description'] || req.form.values['existing-authority-doc-filename'],
      type: req.form.values['existing-authority-doc-type']
    });
    req.sessionModel.set('existing-authority-documents', files);
    super.saveValues(req, res, (err) => {
      req.sessionModel.unset('existing-authority-doc-add-another');
      req.sessionModel.unset('existing-authority-doc-description');
      req.sessionModel.unset('existing-authority-doc-filename');
      req.sessionModel.unset('existing-authority-doc-upload');
      req.sessionModel.unset('existing-authority-doc-type');
      next(err);
    });
  }
};
