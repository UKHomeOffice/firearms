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
      req.log('debug', 'Submitting case to icasework');
      super.saveValues(req, res, err => {
        if (err) {
          return next(err);
        }
        const model = new Model(req.sessionModel.toJSON());
        model.save()
          .then(data => {
            req.log('debug', `Successfully submitted case to icasework (${data.createcaseresponse.caseid})`);
            req.sessionModel.set('caseid', data.createcaseresponse.caseid);
            next();
          })
          .catch(e => {
            req.log('error', `Casework submission failed: ${e.status}`);
            req.log('error', e.body);
            next(e);
          });
      });
    }

  };

};
