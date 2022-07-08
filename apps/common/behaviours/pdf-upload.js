'use strict';

const AuthToken = require('../../common/models/auth-token');
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
        }).catch(err => next(new Error(err.body)));
      })
      .then(result => {
        const model = new AuthToken();
        return model.auth()
          .then(token => {
            return `${result.url.replace('/file', '/vault')}&token=${token}`;
          });
      })
      .then(url => {
        req.log('info', 'Saved PDF document to S3');
        req.form.values['pdf-upload'] = url;
        super.process(req, res, next);
      }, next)
      .catch(err => {
        next(new Error(err.body));
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
