Firearms Licensing Application
------------------------------
Firearms Licensing Application built using HOF (Home Office Forms) framework.

# TESTING STAGE CREDENTIALS
## Getting Started

### Prerequisities

- [Node.js](https://nodejs.org/en/) - Tested against LTS
- NPM (installed with Node.js) - Works with versions 2 and 3
- [Redis server](http://redis.io/download) running on the default port

### Up & Running

You will need to set the following envs to run this application:
```
NOTIFY_KEY                     | Your GOV.UK notify key
TEMPLATE_MUSEUM                | GOV.UK notify template ID
TEMPLATE_SECTION5              | GOV.UK notify template ID
TEMPLATE_SHOOTING_CLUB         | GOV.UK notify template ID
TEMPLATE_SUPPORTING_DOCUMENTS  | GOV.UK notify template ID email
EMAIL_REPLY_TO_DEFAULT         | Default 'reply to'  email address
EMAIL_REPLY_TO_FIREARMS        | 'Reply to' email address
CASEWORKER_EMAIL               | Caseworker email
AWS_EXPIRY_TIME                | AWS config
AWS_USER                       | AWS credentials
AWS_PASSWORD                   | AWS credentials
AWS_REGION                     | AWS config
AWS_SIGNATURE_VERSION          | AWS config
FROM_ADDRESS                   | the sender/reply address for your emails
ICASEWORK_DB                   | Icasework database name
ICASEWORK_KEY                  | Icasework key
ICASEWORK_SECRET               | Icasework secret
ICASEWORK_URL                  | Icasework url
KEYCLOAK_TOKEN_URL             | The url of the keycloak server
KEYCLOAK_CLIENT_ID             | The client name used to authenticate with keycloak
KEYCLOAK_SECRET                | The secret used to authenticate with the keycloak client
KEYCLOAK_USERNAME              | Administrator username to authenticate with the keycloak client
KEYCLOAK_PASSWORD              | Administrator password used to authenticate with the keycloak client
PDF_CONVERTER_URL              | The url that the html-pdf-converter service is running on
FILE_VAULT_URL                 | The url that the file-vault service is running on
```
Firearms uses the following microservices which will need to be run locally:
- [File-vault](https://github.com/UKHomeOffice/file-vault)
- [Html-pdf-converter](https://github.com/UKHomeOffice/html-pdf-converter)

Run the application:
```bash
$ cd firearms
$ yarn install
$ yarn run dev
```
Then visit: [http://localhost:8080/](http://localhost:8080/) and add the pathname for the desired journey. e.g. [http://localhost:8080/museums](http://localhost:8080/museums)


## Testing

### Acceptance Tests
First, make sure the `env`variable in the config.js file is equal to `'ci'`.
With the server running in development mode run (`yarn run start:acceptance`) to start the acceptance tests:

```bash
$ npm run test:acceptance
```

### Unit Tests
```bash
$ yarn test:unit
```
