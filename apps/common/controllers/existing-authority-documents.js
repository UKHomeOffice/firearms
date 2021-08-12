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
    const file = req.files['existing-authority-upload'];
    if (file && file.truncated) {
      const err = new this.ValidationError('existing-authority-upload', {
        type: 'filesize',
        arguments: [config.upload.maxfilesize]
      }, req, res);
      return next({
        'existing-authority-upload': err
      });
    }
    if (file && file.data && file.data.length) {
      req.form.values['existing-authority-filename'] = file.name;
      const model = new UploadModel(file);
      model.save()
        .then((result) => {
          req.form.values['existing-authority-upload'] = result.url;
          req.form.values['existing-authority-type'] = file.mimetype;
        })
        .then(() => next())
        .catch(e => {
          if (e.code === 'FileExtensionNotAllowed') {
            const err = new this.ValidationError('existing-authority-upload', {
              type: 'filetype',
              arguments: [path.extname(file.name)]
            }, req, res);
            return next({
              'existing-authority-upload': err
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
      url: req.form.values['existing-authority-upload'],
      description:
        req.form.values['existing-authority-description'] || req.form.values['existing-authority-filename'],
      type: req.form.values['existing-authority-type']
    });
    req.sessionModel.set('existing-authority-documents', files);
    super.saveValues(req, res, (err) => {
      req.sessionModel.unset('existing-authority-add-another');
      req.sessionModel.unset('existing-authority-description');
      req.sessionModel.unset('existing-authority-filename');
      req.sessionModel.unset('existing-authority-upload');
      req.sessionModel.unset('existing-authority-type');
      next(err);
    });
  }
};
