module.exports =
  superclass => class extends superclass {
    configure(req, res, next) {
      // eslint-disable-next-line max-len
      // Sets the warning message depending on whether user is varying/renewing the application as warning is not needed for a new application.
      if (req.sessionModel.get('activity') === 'renew' || req.sessionModel.get('activity') === 'vary') {
        Object.keys(req.form.options.fields).forEach(key => {
          req.form.options.fields[key].isWarning = true;
        });
      }
      next();
    }
  };
