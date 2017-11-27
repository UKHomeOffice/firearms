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
    maxfilesize: '100mb',
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
    transport: 'ses',
    transportOptions: {
      accessKeyId: process.env.HOF_SES_USER || process.env.AWS_USER || '',
      secretAccessKey: process.env.HOF_SES_PASSWORD || process.env.AWS_PASSWORD || ''
    }
  },
  redis: {
    password: process.env.REDIS_PASSWORD
  },
  icasework: {
    createpath: '/createcase',
    uploadpath: '/uploaddocuments',
    getcasepath: '/getcasedetails',
    key: process.env.ICASEWORK_KEY,
    secret: process.env.ICASEWORK_SECRET,
    timeout: process.env.ICASEWORK_TIMEOUT || 20000
  },
  survey: {
    urls: {
      'new-dealer': 'https://eforms.homeoffice.gov.uk/outreach/Feedback.ofml?FormName=s5firearms/',
      'shooting-clubs': 'https://eforms.homeoffice.gov.uk/outreach/Feedback.ofml?FormName=shootclub/',
      museums: 'https://eforms.homeoffice.gov.uk/outreach/Feedback.ofml?FormName=Museums/'
    }
  },
  pdf: {
    url: process.env.PDF_CONVERTER_URL
  }
};
