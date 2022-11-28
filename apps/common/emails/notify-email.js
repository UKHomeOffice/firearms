/* eslint-disable no-console */
'use strict';

const NotifyClient = require('notifications-node-client').NotifyClient;
const config = require('../../../config');
const notifyClient = new NotifyClient(config.govukNotify.notifyApiKey);

const sendEmail = (templateId, emailAddress, personalisation, emailReplyToId) => {
  notifyClient
    .sendEmail(templateId, emailAddress, {
      personalisation: personalisation,
      emailReplyToId: emailReplyToId
    })
    .then(response => console.log(`email sent to ${emailAddress} with response: `, response))
    .catch(err => console.error(`Gov Notify error: ${err}`));
};

exports.sendEmail = sendEmail;
