'use strict';
/* eslint no-process-env: 0 */

const env = process.env.NODE_ENV || 'production';
const localhost = () => `${process.env.LISTEN_HOST || '0.0.0.0'}:${process.env.PORT || 8080}`;

module.exports = {
  env: env,
  upload: {
    skipEmail: env === 'production' ? '' : 'test@test.com',
    maxfilesize: '100mb',
    hostname: (!env || env === 'ci') ?
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
  govukNotify: {
    notifyApiKey: process.env.NOTIFY_KEY,
    templateMuseum: process.env.TEMPLATE_MUSEUM,
    templateSection5: process.env.TEMPLATE_SECTION5,
    templateShootingClub: process.env.TEMPLATE_SHOOTING_CLUB,
    templateSupportingDocuments: process.env.TEMPLATE_SUPPORTING_DOCUMENTS,
    emailReplyToDefault: process.env.EMAIL_REPLY_TO_DEFAULT,
    emailReplyToFirearms: process.env.EMAIL_REPLY_TO_FIREARMS
  },
  email: {
    emailerFallback: true,
    from: process.env.FROM_ADDRESS,
    transport: process.env.EMAIL_TRANSPORT,
    transportOptions: {
      accessKeyId: process.env.HOF_SES_USER || process.env.AWS_USER,
      secretAccessKey: process.env.HOF_SES_PASSWORD || process.env.AWS_PASSWORD
    }
  },
  hosts: {
    acceptanceTests: process.env.ACCEPTANCE_HOST_NAME || `http://localhost:${process.env.PORT || 8080}`
  },
  redis: {
    password: process.env.REDIS_PASSWORD
  },
  icasework: {
    url: process.env.ICASEWORK_URL,
    createpath: '/createcase',
    uploadpath: '/uploaddocuments',
    getcasepath: '/getcasedetails',
    key: process.env.ICASEWORK_KEY,
    secret: process.env.ICASEWORK_SECRET,
    timeout: process.env.ICASEWORK_TIMEOUT || 60000
  },
  survey: {
    urls: {
      root: 'https://eforms.homeoffice.gov.uk/outreach/Feedback.ofml',
      'new-dealer': 'https://eforms.homeoffice.gov.uk/outreach/Feedback.ofml?FormName=s5firearms/',
      'shooting-clubs': 'https://eforms.homeoffice.gov.uk/outreach/Feedback.ofml?FormName=shootclub/',
      museums: 'https://eforms.homeoffice.gov.uk/outreach/Feedback.ofml?FormName=Museums/',
      'supporting-documents': 'https://eforms.homeoffice.gov.uk/outreach/Feedback.ofml?FormName=SupportingDocs/'
    }
  },
  pdf: {
    url: process.env.PDF_CONVERTER_URL
  }
};
