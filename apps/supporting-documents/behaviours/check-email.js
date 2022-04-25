'use strict';
const config = require('../../../config');

module.exports = superclass => class extends superclass {
  validate(req, res, next) {
    const acceptanceTestEmail = config.upload.skipEmail;
    const validEmail = req.sessionModel.get('original-email');

    if (validEmail === req.form.values.email || acceptanceTestEmail === req.form.values.email) {
      //Either our email matches or our acceptancetest email matches
      super.validate(req, res, next);
    }
    else 
    {
      next({
        email: new this.ValidationError('email', { type: 'incorrect' })
      });
    }
  }
};
