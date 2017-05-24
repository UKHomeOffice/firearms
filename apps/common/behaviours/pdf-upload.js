'use strict';

const UploadModel = require('../../common/models/file-upload');
const PDFModel = require('../../common/models/pdf');

module.exports = superclass => class PDFUpload extends superclass {

  process(req, res, next) {
    this.renderHTML(req, res)
      .then(html => this.createPDF(html))
      .then(pdfBuffer => this.uploadPDF({
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

  renderHTML(req, res) {
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

  uploadPDF(file) {
    const model = new UploadModel();
    model.set(file);
    return model.save();
  }

  createPDF(html) {
    const pdfModel = new PDFModel();
    pdfModel.set({template: html});
    return pdfModel.save();
  }
};
