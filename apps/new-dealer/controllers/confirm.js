'use strict';

const _ = require('lodash');
const path = require('path');
const controllers = require('hof-controllers').confirm;

module.exports = class ConfirmController extends controllers {

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
    this.addAddressLoopSection(req);
    this.getWeaponsAmmunitionQuantity(req, 'weapons', 3);
    this.getWeaponsAmmunitionQuantity(req, 'ammunition', 4);
    this.addContactDetailsSection(req);
    return super.getValues(req, res, callback);
  }

  saveValues(req, res, callback) {
    this.addAddressLoopSection(req);
    this.getWeaponsAmmunitionQuantity(req, 'weapons', 3);
    this.getWeaponsAmmunitionQuantity(req, 'ammunition', 4);
    this.addContactDetailsSection(req);
    return super.saveValues(req, res, callback);
  }

  addAddressLoopSection(req) {
    let addresses = req.sessionModel.get('storageAddresses');
    if (addresses !== undefined) {
      addresses = _.map(_.values(addresses), 'address');
      const items = addresses.map(value => ({
        fields: [{
          value,
          field: 'storage-address'
        }]
      }));
      const section = {
        items,
        section: req.translate('pages.storage-address.summary'),
        hasMultipleFields: true,
        step: 'storage-add-another-address'
      };
      this.formattedData.splice(2, 0, section);
    }
  }

  getWeaponsAmmunitionQuantity(req, weaponsOrAmmunition, order) {
    let types = req.sessionModel.get(`${weaponsOrAmmunition}-types`);
    if (types !== undefined && types !== 'unspecified') {
      types = _.castArray(types);
      const items = types.map(value => ({
        fields: [{
          value: req.sessionModel.get(`${value}-quantity`),
          field: 'quantity-base'
        }, {
          value: req.translate(`fields.${weaponsOrAmmunition}-types.options.${value}.label`),
          field: `${weaponsOrAmmunition}-types`
        }]
      }));
      const headers = items[0].fields.map(item => {
        return req.translate(`fields.${item.field}.summary`);
      });
      const section = {
        items,
        headers,
        section: req.translate(`pages.${weaponsOrAmmunition}.summary`),
        hasMultipleFields: true,
        step: weaponsOrAmmunition,
        moreThanOneField: items[0].fields.length > 1
      };
      this.formattedData.splice(order, 0, section);
    } else if (types === 'unspecified') {
      const items = {
        fields: [{
          value: req.translate(`fields.${weaponsOrAmmunition}-types.options.${types}.label`),
          field: `${weaponsOrAmmunition}-types`
        }, {
          value: req.sessionModel.get(`${weaponsOrAmmunition}-unspecified-details`),
          field: 'further-details'
        }]
      };
      const headers = items.fields.map(item => {
        return req.translate(`fields.${item.field}.summary`);
      });
      const section = {
        items,
        headers,
        section: req.translate(`pages.${weaponsOrAmmunition}.summary`),
        hasMultipleFields: true,
        step: weaponsOrAmmunition,
        moreThanOneField: items.fields.length > 1
      };
      this.formattedData.splice(order, 0, section);
    }
  }

  getContactHoldersName(req) {
    const contactHolder = req.sessionModel.get('contact-holder');
    const contactName = contactHolder === 'first' || contactHolder === 'second' ?
      req.sessionModel.get(`${contactHolder}-authority-holders-name`) :
      req.sessionModel.get('someone-else-name');
    return contactName;
  }

  addContactDetailsSection(req) {
    const contactHolder = req.sessionModel.get('contact-holder');
    const contactName = this.getContactHoldersName(req);
    const contactAddress = req.sessionModel.get(`${contactHolder}-authority-holders-address-manual`);
    this.formattedData = this.formattedData.map(section => {
      if (section.fields !== undefined) {
        section.fields = section.fields.map(field => {
          if (field.field === 'contact-holder') {
            field.value = contactName;
          } else if (field.field === 'use-different-address') {
            field.label = req.translate('fields.authority-holder-contact-address-manual.summary');
            field.value = contactAddress;
          }
          return field;
        });
      }
      return section;
    });
  }

  getEmailerConfig(req) {
    const config = super.getEmailerConfig(req);
    const organisation = req.sessionModel.get('organisation');
    const customViews = path.resolve(__dirname, '../views/email/');
    const greeting = `${req.translate('pages.email.greeting')} ${this.getContactHoldersName(req)}`;
    config.customerIntro = [greeting].concat(config.customerIntro);
    const data = {
      organisation: req.sessionModel.get(`${organisation}-name`),
      date: (new Date()).toUTCString()
    };
    if (req.sessionModel.get('activity') === 'renew') {
      data.reference = req.sessionModel.get('reference-number');
    }
    const emailData = _.map(data, (value, index) => ({
      subheader: req.translate(`pages.email.data.${index}`),
      value
    }));
    config.data.push({emailData});
    return Object.assign({}, config, {
      customViews
    });
  }
};
