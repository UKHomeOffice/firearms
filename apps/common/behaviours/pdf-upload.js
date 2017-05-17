'use strict';

const UploadModel = require('../../common/models/file-upload');
const PDFModel = require('../../common/models/pdf');

module.exports = superclass => class PDFUpload extends superclass {

  process(req, res, next) {
    this._render(req, res)
      .then(html => this._create(html))
      .then(pdfBuffer => this._upload({
        name: 'application_form.pdf',
        data: pdfBuffer,
        mimetype: 'application/pdf'
      }))
      .then(result => {
        req.form.values['pdf-upload'] = result.url;
      })
      .then(() => {
        super.process(req, res, next);
      }, next)
      .catch((err) => {
        next(err);
      });
  }

  _render(req, res) {
    return new Promise((resolve, reject) => {
      const locals = Object.assign({}, this.locals(req, res), {
        title: 'Firearms Application'
      });
      res.render('pdf.html', locals, (err, html) => {
        if (err) {
          return reject(err);
        }
        resolve(html);
      });
    });
  }

  _upload(file) {
    const model = new UploadModel();
    model.set(file);
    return model.save();
  }

  _create(html) {
    const pdfModel = new PDFModel();
    pdfModel.set({template: html});
    return pdfModel.save();
  }
};
