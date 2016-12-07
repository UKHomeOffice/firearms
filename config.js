'use strict';

/* eslint no-process-env: 0 */
module.exports = {
  env: process.env.NODE_ENV,
  postcode: {
    hostname: process.env.NODE_ENV === 'ci' ?
      `http://${process.env.LISTEN_HOST || '0.0.0.0'}:${process.env.PORT || 8080}/api/postcode-test` :
      'https://postcodeinfo.service.justice.gov.uk',
    authorization: process.env.POSTCODE_AUTH,
    addresses: {
      path: '/addresses',
      param: 'postcode'
    }
  },
  email: {
    from: process.env.FROM_ADDRESS || '',
    replyTo: process.env.REPLY_TO || '',
    accessKeyId: process.env.AWS_USER || '',
    secretAccessKey: process.env.AWS_PASSWORD || '',
    transportType: process.env.EMAIL_TRANSPORT,
    region: process.env.EMAIL_REGION || '',
    ignoreTLS: process.env.IGNORE_TLS === 'true',
    secure: process.env.EMAIL_SECURE === 'true',
    port: process.env.EMAIL_PORT || '',
    host: process.env.EMAIL_HOST || '',
  }
};
