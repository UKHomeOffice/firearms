'use strict';

let I;

module.exports = {

  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'second-authority-holders-birth',
  groups: {
    dob: '#second-authority-dob-group',
    town: '#second-authority-town-birth-group',
    country: '#second-authority-country-birth-group'
  },
  day: '#second-authority-dob-day',
  month: '#second-authority-dob-month',
  year: '#second-authority-dob-year',
  town: '#second-authority-town-birth',
  country: '#second-authority-country-birth',

  content: {
    header: 'What are Barry Dylan\'s birth details?',
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
    country: 'United States of America'
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
