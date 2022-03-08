'use strict';
const config = require('../../../config');

module.exports = superclass => class extends superclass {
  validate(req, res, next) {
    const acceptanceTestEmail = config.skipEmail && config.allowSkip ? config.skipEmail : '';
    const validEmail = req.sessionModel.get('original-email');

    if (validEmail || acceptanceTestEmail !== req.form.values.email) {
      next({
        email: new this.ValidationError('email', { type: 'incorrect' })
      });
    } else {
      super.validate(req, res, next);
    }
  }
};
