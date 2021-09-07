'use strict';

const path = require('path');

/**
 * Get Custom Back links for existing authority and supporting document pages
 * on museums and shooting-clubs.
 *
 * @param {Object} req - request parameters
 * @param {string} pageName - name of the page to want to navigate to
 *
 * @returns {string} - the back link string of the url to be directed to.
 */

module.exports = pageName => {
  return superclass => class extends superclass {
    getBackLink(req) {
      return (req.params && req.params.action && req.params.action === 'edit') ?
        path.join(req.baseUrl, 'confirm') : path.join(req.baseUrl, pageName);
    }
  };
};
