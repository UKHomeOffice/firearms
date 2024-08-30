'use strict';

const Model = require('../../common/models/i-casework-getcase');

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    console.log('********** message ', req.form.values);
    const model = new Model(req.form.values);
    console.log('******************************  get case  ', model);
    console.log('******************************  get case  ', model.url());
    console.log('******************************  get case  ', model.prepare());
    console.log('******************************  get case  ', model.sign());
    console.log('******************************  get case  ', model.fetch());
    model.fetch()
      .catch(e => {
        if (e.code && e.code.match(/TIMEDOUT/)) {
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
