'use strict';

const _ = require('lodash');

module.exports = superclass => class extends superclass {
  configure(req, res, next) {
    req.form.options.fieldsConfig['contact-address'].mixin = 'text-input';
    next();
  }
};
