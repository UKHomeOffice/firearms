'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'first-authority-holders-birth',
  groups: {
    dob: '#first-authority-dob-group',
    town: '#first-authority-town-birth-group',
    country: '#first-authority-country-birth-group'
  },
  day: '#first-authority-dob-day',
  month: '#first-authority-dob-month',
  year: '#first-authority-dob-year',
  town: '#first-authority-town-birth',
  country: '#first-authority-country-birth',

  content: {
    header: 'What are Sterling Archer\'s birth details?',
    'future-dob': {
      day: '1',
      month: '1',
      year: '2050'
    },
    'alpha-dob': {
      day: 'd',
      month: 'm',
      year: 'y'
    },
    'valid-dob': {
      day: '31',
      month: '3',
      year: '1980'
    },
    town: 'New York',
    country: 'USA'
  },


  fillDateOfBirth(dob) {
    I.fillField(this.day, this.content[dob].day);
    I.fillField(this.month, this.content[dob].month);
    I.fillField(this.year, this.content[dob].year);
    I.submitForm();
  },

  fillFormAndSubmit(dob) {
    this.fillDateOfBirth(dob);
    I.fillField(this.town, this.content.town);
    I.fillField(this.country, this.content.country);
    I.submitForm();
  }
};
