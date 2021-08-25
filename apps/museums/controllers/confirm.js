'use strict';

const _ = require('lodash');
const Controller = require('../../common/controllers/legacy-confirm');

module.exports = class ConfirmController extends Controller {
  locals(req, res) {
    const content = req.rawTranslate('pages.confirm');
    const locals = super.locals(req, res);
    const rows = locals.rows.filter(row => row !== undefined);
    return Object.assign({}, locals, { content, rows });
  }

  formatData(data, translate) {
    let result = super.formatData(data, translate);

    const exhibitAddresses = this.addExhibitDetails(data, translate);
    result.splice(1, 0, exhibitAddresses);

    const invoiceAddress = this.addInvoiceAddressDetails(data, translate, result.filter(a => a));
    result.splice(4, 0, invoiceAddress);

    const existingAuthorityDocuments = this.getExistingAuthorityDocuments(data, translate);
    result.splice(5, 0, existingAuthorityDocuments);

    return result;
  }

  addInvoiceAddressDetails(data, translate, result) {
    const contactAddress = data['invoice-address'];
    result.map(section => {
      if (section.section === translate('pages.invoice-details.header')) {
        section.fields.forEach(field => {
          if (field.field === 'contact-holder') {
            field.value = data['invoice-contact-name'];
          }
        });
        return section.fields.push({
          label: translate('fields.invoice-address-manual.label'),
          value: contactAddress,
          step: '/invoice-address-input'
        });
      }
    });
  };

  addExhibitDetails(data, translate) {
    let addresses = data['exhibit-addresses'];
    if (!addresses) { return addresses; }
    addresses = _.map(_.values(addresses), 'address');
    const items = addresses.map(value => ({
      fields: [{
        value,
        field: 'exhibit-addresses'
      }]
    }));
    return {
      items,
      section: translate('pages.exhibit-addresses.summary'),
      hasMultipleFields: true,
      step: 'exhibit-add-another-address'
    };
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
    return {
      items,
      hasMultipleFields: true,
      section: translate('pages.existing-authority-documents-add.header'),
      step: '/existing-authority-documents-add-another'
    };
  }
};
