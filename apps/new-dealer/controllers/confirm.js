'use strict';

const _ = require('lodash');
const Controller = require('../../common/controllers/legacy-confirm');

module.exports = class ConfirmController extends Controller {
  locals(req, res) {
    const content = req.rawTranslate('pages.confirm');
    const locals = super.locals(req, res);
    const rows = locals.rows.filter(row => row.fields === undefined || row.fields.length);
    if (req.sessionModel.get('usage') && req.sessionModel.get('usage').indexOf('other') > -1) {
      const other = req.sessionModel.get('other-details');
      this.modifyField(rows, 'usage', val => val.replace('Other', `Other (${other})`));
    }
    return Object.assign({}, locals, {
      content,
      rows
    });
  }

  formatData(data, translate) {
    let result = super.formatData(data, translate);
    const address = this.addAddressLoopSection(data, translate);
    result.splice(2, 0, address);

    const weapons = this.getWeaponsAmmunitionQuantity(data, translate, 'weapons');
    result.splice(3, 0, weapons);

    const ammo = this.getWeaponsAmmunitionQuantity(data, translate, 'ammunition');
    result.splice(4, 0, ammo);

    const firstAuthAddress = this.addFirstAuthorityAddressDetails(data, translate, result.filter(a => a));
    result.splice(5, 0, firstAuthAddress);

    const secondAuthAddress = this.addSecondAuthorityAddressDetails(data, translate, result.filter(a => a));
    result.splice(6, 0, secondAuthAddress);

    const docs = this.getSupportingDocuments(data, translate);
    result.splice(11, 0, docs);

    const existingAuthorityDocuments = this.getExistingAuthorityDocuments(data, translate);
    result.splice(12, 0, existingAuthorityDocuments);

    const invoiceAddress = this.addInvoiceAddressDetails(data, translate, result.filter(a => a));
    result.splice(13, 0, invoiceAddress);

    result = this.addContactDetailsSection(data, translate, result.filter(a => a));

    return result;
  }

  modifyField(output, key, modify) {
    output.forEach(section => {
      if (!section.fields) {
        return;
      }
      section.fields.forEach(field => {
        if (field.field === key) {
          field.value = modify(field.value);
        }
      });
    });
  }

  getValues(req, res, callback) {
    return super.getValues(req, res, callback);
  }

  saveValues(req, res, callback) {
    return super.saveValues(req, res, callback);
  }

  addAddressLoopSection(data, translate) {
    let addresses = data.storageAddresses;
    if (!addresses) {
      return addresses;
    }

    addresses = _.map(_.values(addresses), 'address');
    const items = addresses.map(value => ({
      fields: [{
        value,
        field: 'storage-address'
      }]
    }));
    const section = {
      items,
      section: translate('pages.storage-address.summary'),
      hasMultipleFields: true,
      step: 'storage-add-another-address'
    };
    return section;
  }

  getWeaponsAmmunitionQuantity(data, translate, key) {
    let types = data[`${key}-types`];
    let section;
    if (types !== undefined && types !== 'unspecified') {
      types = _.castArray(types);
      const items = types.map(value => ({
        fields: [{
          value: data[`${value}-quantity`],
          field: 'quantity-base'
        }, {
          value: translate(`fields.${key}-types.options.${value}.label`),
          field: `${key}-types`
        }]
      }));
      const headers = items[0].fields.map(item => {
        return translate(`fields.${item.field}.summary`);
      });
      section = {
        items,
        headers,
        section: translate(`pages.${key}.summary`),
        hasMultipleFields: true,
        step: key,
        moreThanOneField: items[0].fields.length > 1
      };
    } else if (types === 'unspecified') {
      const items = {
        fields: [{
          value: translate(`fields.${key}-types.options.${types}.label`),
          field: `${key}-types`
        }, {
          value: data[`${key}-unspecified-details`],
          field: 'further-details'
        }]
      };
      const headers = items.fields.map(item => {
        return translate(`fields.${item.field}.summary`);
      });
      section = {
        items,
        headers,
        section: translate(`pages.${key}.summary`),
        hasMultipleFields: true,
        step: key,
        moreThanOneField: items.fields.length > 1
      };
    }
    return section;
  }

  addFirstAuthorityAddressDetails(data, translate, result) {
    const contactAddress = data['first-authority-holders-address-manual'];
    result.map(section => {
      const authorityHolder = translate('pages.first-authority-holder.header.authority-holders.one');
      const firstAuthorityHolder = translate('pages.first-authority-holder.header.authority-holders.two');
      if (section.section === authorityHolder || section.section === firstAuthorityHolder) {
        section.fields.push({
          label: translate('fields.first-authority-holders-address-manual.summary'),
          value: contactAddress,
          step: '/first-authority-holders-address'
        });
      }
      return section;
    });
  }

  addSecondAuthorityAddressDetails(data, translate, result) {
    const contactAddress = data['second-authority-holders-address-manual'];
    result.map(section => {
      if (section.section === translate('pages.second-authority-holder.header')) {
        section.fields.push({
          label: translate('fields.second-authority-holders-address-manual.summary'),
          value: contactAddress,
          step: '/second-authority-holders-address'
        });
      }
      return section;
    });
  }

  getSupportingDocuments(data, translate) {
    if (!data['supporting-documents'] || !data['supporting-documents'].length) {
      return null;
    }
    const items = data['supporting-documents'].map(doc => ({
      fields: {
        field: 'supporting-documents',
        value: doc.description
      }
    }));
    const section = {
      items,
      hasMultipleFields: true,
      section: translate('pages.supporting-documents-add.header'),
      step: '/supporting-documents-add-another'
    };

    return section;
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
      step: '/existing-authority-add-another'
    };
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

        section.fields.push({
          label: translate('fields.invoice-address-manual.label'),
          value: contactAddress,
          step: '/invoice-address-input'
        });
      }
      return section;
    });
  }

  getContactHoldersName(data) {
    const contactHolder = data['contact-holder'];
    const contactName = contactHolder !== 'other' ?
      data[`${contactHolder}-authority-holders-name`] :
      data['someone-else-name'];
    return contactName;
  }

  addContactDetailsSection(data, translate, result) {
    const contactName = this.getContactHoldersName(data);
    const contactHolder = data['contact-holder'];
    let key;
    if (contactHolder === 'other') {
      key = 'contact-address';
    } else {
      const contactHolderKey = `${contactHolder}-authority-holders-address`;
      const authorityHolderKey = 'authority-holder-contact-address';
      key = data['use-different-address'] === 'true' ? authorityHolderKey : contactHolderKey;
    }
    const contactAddress = data[`${key}-manual`] || data[`${key}-lookup`];
    return result.map(section => {
      if (section.section === translate('pages.contacts-details.header')) {
        section.fields.forEach(field => {
          if (field.field === 'contact-holder') {
            field.value = contactName;
          }
        });

        section.fields.push({
          label: translate('fields.authority-holder-contact-address-manual.summary'),
          value: contactAddress,
          step: '/contact'
        });
      }
      return section;
    });
  }
};
