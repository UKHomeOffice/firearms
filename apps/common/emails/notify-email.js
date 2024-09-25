'use strict';

const NotifyClient = require('notifications-node-client').NotifyClient;
const config = require('../../../config');
const notifyClient = new NotifyClient(config.govukNotify.notifyApiKey);
const logger = require('hof/lib/logger')({ env: config.env });

const sendEmail = (templateId, emailAddress, personalisation, emailReplyToId) => {
  notifyClient
    .sendEmail(templateId, emailAddress, {
      personalisation: personalisation,
      emailReplyToId: emailReplyToId
    })
    .then(response => logger.log('info', `email sent to ${emailAddress} with response: `, response))
    .catch(err => logger.error(`Gov Notify error: ${err}`));
};

exports.sendEmail = sendEmail;
