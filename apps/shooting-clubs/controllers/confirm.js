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

    const clubDetails = this.addClubDetails(data, translate, result.filter(a => a));
    result.splice(0, 0, clubDetails);

    const clubSecretaryDetails = this.addClubSecretaryDetails(data, translate, result.filter(a => a));
    result.splice(1, 0, clubSecretaryDetails);

    const secondaryContactsDetails = this.addSecondaryContactDetails(data, translate, result.filter(a => a));
    result.splice(2, 0, secondaryContactsDetails);

    const shootingRanges = this.addShootingRangeDetails(data, translate);
    result.splice(6, 0, shootingRanges);

    const storageAddresses = this.addStorageAddresses(data, translate, result.filter(a => a));
    result.splice(8, 0, storageAddresses);

    const invoiceAddress = this.addInvoiceAddressDetails(data, translate, result.filter(a => a));
    result.splice(10, 0, invoiceAddress);

    const existingAuthorityDocuments = this.getExistingAuthorityDocuments(data, translate);
    result.splice(11, 0, existingAuthorityDocuments);

    return result;
  }

  addClubDetails(data, translate, result) {
    const newClub = data['new-club'] === 'yes' ? 'Yes' : 'No';
    result.map(section => {
      if (section.section === translate('pages.club-details.header')) {
        return section.fields.push({
          label: translate('fields.club-address-manual.label'),
          value: data['club-address'],
          step: '/club-address'
        },{
          label: translate('fields.new-club.legend'),
          value: newClub,
          step: '/new-club'
        });
      }
    });
  };

  addClubSecretaryDetails(data, translate, result) {
    result.map(section => {
      if (section.section === translate('pages.club-secretary-details.header')) {
        return section.fields.push({
          label: translate('fields.club-secretary-address-manual.label'),
          value: data['storage-address-secretary'],
          step: '/club-secretary-address'
        });
      }
    });
  };

  addSecondaryContactDetails(data, translate, result) {
    result.map(section => {
      if (section.section === translate('pages.club-second-contact.header')) {
        return section.fields.push({
          label: translate('fields.second-contact-address-manual.label'),
          value: data['second-contact-address'],
          step: '/second-contact-address'
        });
      }
    });
  };

  calculateAddressCategory(value, translate) {
    return Array.isArray(value) ? value.map(category =>
        translate(`fields.location-address-category.options.${category}.label`)).join('\n') :
        translate(`fields.location-address-category.options.${value}.label`) ;
  }

  addShootingRangeDetails(data, translate) {
    const items = data['location-addresses'].map(doc => ({
      fields: {
        label: doc.address,
        value: this.calculateAddressCategory(doc['address-category'], translate)
      }
    }));
    return {
      items,
      hasMultipleFields: true,
      section: translate('pages.range-addresses.header'),
      step: '/location-add-another-address'
    };
  };

  addStorageAddresses(data, translate, result) {
    const allStorageAddresses = data['all-storage-addresses'].map(doc => doc['address']).join('\n');
    result.map(section => {
      if (section.section === translate('pages.storage-addresses.header')) {
        return section.fields.push({
          label: translate('fields.additional-storage.label'),
          value: allStorageAddresses,
          section: translate('pages.storage-addresses.header'),
          step: '/storage-add-another-address'
        });
      }
    });
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
