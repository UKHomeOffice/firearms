'use strict';

const controllers = require('hof-controllers').confirm;
const _ = require('lodash');

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
        something: true
      };
      this.formattedData.splice(2, 0, section);
    }
  }

  getWeaponsAmmunitionQuantity(req, weaponsOrAmmunition, order) {
    let types = req.sessionModel.get(`${weaponsOrAmmunition}-types`);
    if (types !== undefined && types !== 'unspecified') {
      if (!Array.isArray(types)) {
        types = [types];
      }
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
        something: true,
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
        something: true,
        moreThanOneField: items.fields.length > 1
      };
      this.formattedData.splice(order, 0, section);
    }
  }

  addContactDetailsSection(req) {
    const contactHolder = req.sessionModel.get('contact-holder');
    const contactName = contactHolder === 'first' || contactHolder === 'second' ?
      req.sessionModel.get(`${contactHolder}-authority-holders-name`) :
      req.sessionModel.get('someone-else-name');
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
};
