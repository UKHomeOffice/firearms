'use strict';

module.exports = superclass => class extends superclass {
  getValues(req, res, callback) {
    super.getValues(req, res, (err, values) => {
      req.sessionModel.reset();
      callback(err, values);
    });
  }
};
