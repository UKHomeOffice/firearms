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
          next(new Error(err));
        });
      })
      .then(result => {
        req.log('info', 'Saved PDF document to S3');
        console.debug("hellooooo")
        console.debug(result)
        console.debug("hellooooo")
        req.form.values['pdf-upload'] = result.url;
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
    console.log("{}{}{}{}{}{}{}{}{}{}{{}{}{%%%%%%%}{}{}{}")
    console.log(model)
    console.log("{}{}{}{}{}{}{}{}{}{}{{}{}{%%%%%%%}{}{}{}")
    return model.save();
  }

  createPDF(html) {
    const pdfModel = new PDFModel();
    pdfModel.set({template: html});
    return pdfModel.save();
  }
};
