'use strict';

module.exports = superclass => class extends superclass {
  get(req, res, next) {
    const items = req.sessionModel.get('existing-authority-documents') || [];
    if (!items.length) {
      const action = req.params.action ? `/${req.params.action}` : '';
      res.redirect(`${req.baseUrl}/${res.locals.backLink}${action}`);
      return;
    }
    super.get(req, res, next);
  }
};
