'use strict';

module.exports = superclass => class extends superclass {
  get(req, res, next) {
    const items = req.sessionModel.get('supporting-documents') || [];
    if (items.length === 0) {
      const action = req.params.action ? `/${req.params.action}` : '';
      res.redirect(`${req.baseUrl}/${res.locals.backLink}${action}`);
      return;
    }
    super.get(req, res, next);
  }
};
