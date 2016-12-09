'use strict';

const ErrorController = require('hof-controllers').error;
const BaseController = require('../../common/controllers/base');

module.exports = class AuthorityHolderNationalityController extends BaseController {

  validateField(key, req) {
    if (key === this.options.locals.key) {

      const firstNationality = req.form.values[key].toLowerCase();
      const secondNationality = req.form.values[`${key}-second`].toLowerCase();
      const thirdNationality = req.form.values[`${key}-third`].toLowerCase();

      if (firstNationality === secondNationality && firstNationality !== '') {
        return new ErrorController(`${key}-second`, {
          key: `${key}-second`,
          type: 'same-first-nationality',
          redirect: undefined
        });
      } else if (firstNationality === thirdNationality && firstNationality !== '') {
        return new ErrorController(`${key}-third`, {
          key: `${key}-third`,
          type: 'same-first-nationality',
          redirect: undefined
        });
      } else if (secondNationality === thirdNationality && secondNationality !== '') {
        return new ErrorController(`${key}-third`, {
          key: `${key}-third`,
          type: 'same-multi-nationality',
          redirect: undefined
        });
      }
    }
    return super.validateField(key, req);
  }
};
