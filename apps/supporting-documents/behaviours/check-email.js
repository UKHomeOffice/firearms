'use strict';

module.exports = superclass => class extends superclass {
  validate(req, res, next) {
    if (req.sessionModel.get('original-email') !== req.form.values.email) {
      next({
        email: new this.ValidationError('email', { type: 'incorrect' })
      });
    } else {
      super.validate(req, res, next);
    }
  }
};
