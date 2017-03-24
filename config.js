'use strict';
/* eslint no-process-env: 0 */

const env = process.env.NODE_ENV || 'production';
const localhost = () => `${process.env.LISTEN_HOST || '0.0.0.0'}:${process.env.PORT || 8080}`;

module.exports = {
  env: env,
  postcode: {
    hostname: env !== 'production' ?
      `http://${localhost()}/api/postcode-test` :
      'https://postcodeinfo.service.justice.gov.uk',
    authorization: process.env.POSTCODE_AUTH,
    addresses: {
      path: '/addresses',
      param: 'postcode'
    }
  },
  upload: {
    hostname: env !== 'production' ?
      `http://${localhost()}/api/file-upload` :
      process.env.FILE_VAULT_URL
  },
  keycloak: {
    token: process.env.KEYCLOAK_TOKEN_URL,
    username: process.env.KEYCLOAK_USERNAME,
    password: process.env.KEYCLOAK_PASSWORD,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    secret: process.env.KEYCLOAK_SECRET
  },
  email: {
    from: process.env.FROM_ADDRESS || '',
    replyTo: process.env.REPLY_TO || '',
    accessKeyId: process.env.AWS_USER || '',
    secretAccessKey: process.env.AWS_PASSWORD || '',
    transportType: 'ses',
    region: process.env.EMAIL_REGION || '',
    ignoreTLS: process.env.IGNORE_TLS === 'true',
    secure: process.env.EMAIL_SECURE === 'true',
    port: process.env.EMAIL_PORT || '',
    host: process.env.EMAIL_HOST || ''
  },
  icasework: {
    url: process.env.ICASEWORK_URL || 'https://uat.icasework.com/createcase',
    key: process.env.ICASEWORK_KEY,
    secret: process.env.ICASEWORK_SECRET
  }
};
