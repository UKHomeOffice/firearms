'use strict';

const AuthToken = require('../models/auth-token');
const CaseworkModel = require('../models/i-casework');
const StatsD = require('hot-shots');
const client = new StatsD();

const Compose = func => superclass => class extends superclass {
  prepare() {
    console.log("^^^^^^^^^^^^^^^^^^^^^^^")
    console.log("^^^^^^^^^^^^^^^^^^^^^^^")
    console.log(func)
    console.log("^^^^^^^^^^^^^^^^^^^^^^^")
    console.log("^^^^^^^^^^^^^^^^^^^^^^^")
    if (typeof func === 'function') {
      const model = new AuthToken();
      return model.auth().then(token => {
        console.log("^^^^^^^^^^^^^^^^^^^^^^^")
        console.log(token)
        console.log("^^^^^^^^^^^^^^^^^^^^^^^")
        return Object.assign(super.prepare(token), func(this.toJSON(), token));
      });
    }
    return super.prepare();
  }
};

module.exports = conf => {
  const config = conf || {};

  // allow a custom model override
  config.Model = config.Model || CaseworkModel;

  // compose custom per-app prepare methods onto the standard model
  const Model = Compose(config.prepare)(config.Model);

  return superclass => class extends superclass {
    saveValues(req, res, next) {
      req.log('info', 'Submitting case to icasework');
      return super.saveValues(req, res, err => {
        if (err) {
          return next(err);
        }
        const model = new Model(req.sessionModel.toJSON());
        console.debug("sihfhsdfh><><><><><><><io")
        console.dir(model)
        console.debug("sihfhsdfh><><><><><><><io")
        req.log('info', `Sending icasework submission to ${model.url()}`);
        return model.save()
          .then(data => {
            console.debug("sihfhsdfhsdkhfsdifhsdio")
            console.debug(data)
            console.debug("sihfhsdfhsdkhfsdifhsdio")
            req.log('info', `Successfully submitted case to icasework (${data.createcaseresponse.caseid})`);
            req.sessionModel.set('caseid', data.createcaseresponse.caseid);
            client.increment('casework.submission.success');
            next();
          })
          .catch(e => {
            req.log('error', `Casework submission failed: ${e.status}`);
            req.log('error', e.response.headers['x-application-error-info']);
            
            client.increment('casework.submission.failed');
            next(new Error(e.response.data));
          });
      });
    }
  };
};
