'use strict';

const CaseworkModel = require('../models/i-casework');

const Compose = func => superclass => class extends superclass {

  prepare() {
    if (typeof func === 'function') {
      return Object.assign(super.prepare(), func(this.toJSON()));
    }
    return super.prepare();
  }

};

module.exports = config => {

  config = config || {};

  // compose custom per-app prepare methods onto the standard model
  const Model = Compose(config.prepare)(CaseworkModel);

  return superclass => class extends superclass {

    saveValues(req, res, next) {
      const model = new Model(req.sessionModel.toJSON());
      model.save()
        .then(data => {
          req.form.values.caseid = data.createcaseresponse.caseid;
          super.saveValues(req, res, next);
        }, next);
    }

  };

};
