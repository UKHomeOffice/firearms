'use strict';
const notifyEmailer = require('../../common/emails/notify-email');
const moment = require('moment');

module.exports = opts => {
  return superclass => class extends superclass {
    saveValues(req, res, next) {
      return super.saveValues(req, res, err => {
        const personalisation = {
          caseid: req.sessionModel.get('caseid'),
          user: req.sessionModel.get(opts.nameKey),
          date: moment().format('LLL')
        };
        notifyEmailer.sendEmail(opts.templateId, req.sessionModel.get(opts.recipient), personalisation, opts.replyTo);
        return next(err);
      });
    }
  };
};
