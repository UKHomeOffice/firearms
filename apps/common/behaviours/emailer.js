'use strict';

const path = require('path');
const emailer = require('hof-behaviour-emailer');
const config = require('../../../config');
const moment = require('moment-timezone');

module.exports = conf => {
  const defaults = {
    template: path.resolve(__dirname, '../emails/confirm.html'),
    parse: data => {
      const nameKey = typeof conf.nameKey === 'function' ? conf.nameKey(data) : conf.nameKey;
      return {
        reference: data.caseid,
        type: conf.type,
        name: data[nameKey],
        date: moment().tz('Europe/London').format('LLL')
      };
    }
  };
  const settings = Object.assign({}, config.email, defaults, conf);
  return emailer(settings);
};
