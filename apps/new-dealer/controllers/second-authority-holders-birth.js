'use strict';

const DateController = require('hof').controllers.date;

module.exports = class DobController extends DateController {
  constructor(options) {
    super(options);
    this.dateKey = 'second-authority-dob';
  }
};
