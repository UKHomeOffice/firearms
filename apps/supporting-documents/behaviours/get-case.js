'use strict';

const Model = require('../../common/models/i-casework-getcase');

module.exports = superclass => class extends superclass {

  saveValues(req, res, next) {
    const model = new Model(req.form.values);
    model.fetch()
      .catch(e => {
        if (e.code.match(/TIMEDOUT/)) {
          throw e;
        }
        return {};
      })
      .then(data => {
        req.sessionModel.set('original-email', data.email);
        req.sessionModel.set('original-name', data.name);
        super.saveValues(req, res, next);
      })
      .catch(e => next(e));
  }

};
