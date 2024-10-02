'use strict';

const UploadModel = require('../../common/models/file-upload');
const PDFModel = require('../../common/models/pdf');

module.exports = superclass => class PDFUpload extends superclass {
  process(req, res, next) {
    this.renderHTML(req, res)
      .then(html => {
        req.log('info', 'Creating PDF document');
        return this.createPDF(html);
      })
      .then(pdfBuffer => {
        req.log('info', 'Created PDF document. Uploading.');
        return this.uploadPDF({
          name: 'application_form.pdf',
          data: pdfBuffer,
          mimetype: 'application/pdf'
        }).catch(err => {
          req.log('error', `Error during PDF processing: ${err.message || err}`);
          // Pass a new Error to next, ensuring that err.body is checked and a fallback message is provided
          next(new Error(err.body || 'An unknown error occurred during PDF processing.'));
        });
      })
      .then(result => {
        req.log('info', 'Saved PDF document to S3');
        req.form.values['pdf-upload'] = result.url;
        super.process(req, res, next);
      }, next)
      .catch(err => {
        req.log('error', `Error during saving PDF: ${err.message || err}`);
        // Pass a new Error to next, ensuring that err.body is checked and a fallback message is provided
        next(new Error(err.body || 'An unknown error occurred while saving PDF.'));
      });
  }

  renderHTML(req, res) {
    return new Promise((resolve, reject) => {
      const locals = Object.assign({}, this.locals(req, res), {
        title: 'Firearms Application'
      });
      return res.render('pdf.html', locals, (err, html) => {
        if (err) {
          return reject(err);
        }
        return resolve(html);
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
