'use strict';

const pdf = require('html-pdf');
const UploadModel = require('../../common/models/file-upload');
const concat = require('concat-stream');
const path = require('path');

module.exports = superclass => class extends superclass {
  saveValues(req, res, callback) {
    super.saveValues(req, res, (err, values) => {
      this.generatePDF(req, res, (pdfBuffer) => {
        const file = {
          name: 'application_form.pdf',
          data: pdfBuffer,
          mimetype: 'application/pdf'
        };
        if (file && file.data && file.data.length) {
          const model = new UploadModel(file);
          model.save()
            .then((result) => {
              req.form.values['pdf-upload'] = result.url;
            })
            .then(() => callback(err, values))
            .catch(e => callback(e));
        } else {
          callback(err, values);
        }
      });
    });
  }

  generatePDF(req, res, next) {
    res.render('pdf.html', Object.assign({}, this.locals(req, res), {
      title: 'Firearms Application'
    }), (err, html) => {
      if (err) {
        next(err);
      }
      let concatStream = concat(next);
      // phantom is weird about paths it doesn't read things like a webserver
      html = html.replace(/href="\//g, 'href="./');
      pdf.create(html, {
        base: 'file://' + path.resolve(__dirname, '../../../') + '/',
        border: '1cm'
      }).toStream((e, stream) => {
        if (e) {
          next(e);
        }
        stream.pipe(concatStream);
      });
    });
  }
};
