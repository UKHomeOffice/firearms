'use strict';

const Controller = require('hof').controller;

module.exports = class ConfirmController extends Controller {
  locals(req, res) {
    const content = req.rawTranslate('pages.confirm');
    const locals = super.locals(req, res);
    const rows = locals.rows.filter(row => row.fields === undefined || row.fields.length);
    return Object.assign({}, locals, {
      content,
      rows
    });
  }

  getValues(req, res, callback) {
    return super.getValues(req, res, callback);
  }

  saveValues(req, res, callback) {
    return super.saveValues(req, res, callback);
  }

  formatData(data, translate) {
    let result = super.formatData(data, translate);
    const docs = this.getExistingAuthorityDocuments(data, translate);
    result.splice(9, 0, docs);
    return result;
  }

  getExistingAuthorityDocuments(data, translate) {
    if (!data['existing-authority-documents'] || !data['existing-authority-documents'].length) {
      return null;
    }
    const items = data['existing-authority-documents'].map(doc => ({
      fields: {
        field: 'existing-authority-documents',
        value: doc.description
      }
    }));
    const section = {
      items,
      hasMultipleFields: true,
      section: translate('pages.existing-authority-documents-add.header'),
      step: '/existing-authority-documents-add-another'
    };

    return section;
  }
};
