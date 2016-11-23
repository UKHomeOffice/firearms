'use strict';

const _ = require('lodash');
let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps')();
  },

  url: 'confirm',
  declaration: '#declaration',
  data: {
    'company-name': 'International Secret Intelligence Service',
    'company-house-number': '123',
    obtain: 'Buy',
    'import-country': 'Spain',
    usage: 'Selling',
    'self-loading-quantity': '3',
    'fully-automatic-quantity': '1',
    'first-authority-holders-name': 'Sterling Archer',
    'first-authority-dob': '31-03-1980',
    'first-authority-town-birth': 'New York',
    'first-authority-country-birth': 'USA',
    'first-authority-holders-nationality': 'United States of America',
    'first-authority-holders-address-manual': '2 Marsham Street, London',
    'second-authority-holders-name': 'Barry Dylan',
    'second-authority-dob': '31-03-1980',
    'second-authority-town-birth': 'New York',
    'second-authority-country-birth': 'USA',
    'second-authority-holders-nationality': 'United States of America',
    'second-authority-holders-address-manual': '2 Marsham Street, London',
    'contact-email': 'SterlingArcher@Archer.com',
    'contact-phone': '123456789'
  },

  content: {
    'address-one': 'Address one',
    'address-two': 'Address two'
  },

  storageAddresses: [{
    address: 'Address one'
  }, {
    address: 'Address two'
  }],

  setSessionData(name) {
    return I.setSessionData(name, this.data);
  },

  checkData() {
    const values = _.values(
      _.omit(this.data, 'tenants')
    ).concat(
      _.flatten(
        _.map(this.data.tenants, field => _.map(field, value => value))
      )
    );
    values.forEach(value => {
      I.see(value);
    });
  }
};
