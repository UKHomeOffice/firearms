'use strict';

const pdf = require('html-pdf');
const UploadModel = require('../../common/models/file-upload');
const path = require('path');

module.exports = superclass => class extends superclass {
  process(req, res, next) {
    this.generatePDF(req, res, (err, pdfBuffer) => {
      if (err) {
        return next(err);
      }
      const file = {
        name: 'application_form.pdf',
        data: pdfBuffer,
        mimetype: 'application/pdf'
      };
      const model = new UploadModel(file);
      model.save()
        .then((result) => {
          req.form.values['pdf-upload'] = result.url;
        })
        .then(() => {
          super.process(req, res, next);
        }, next);
    });
  }

  generatePDF(req, res, next) {
    const locals = Object.assign({}, this.locals(req, res), {
      title: 'Firearms Application'
    });
    res.render('pdf.html', locals, (err, html) => {
      if (err) {
        return next(err);
      }

      // phantom is weird about paths it doesn't read things like a webserver
      html = html.replace(/href="\//g, 'href="./');
      pdf.create(html, {
        base: 'file://' + path.resolve(__dirname, '../../../') + '/',
        border: '1cm'
      }).toBuffer((e, buffer) => {
        if (e) {
          return next(e);
        }
        next(null, buffer);
      });
    });
  }
};
