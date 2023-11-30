Firearms Licensing Application
------------------------------
Firearms Licensing Application built using HOF (Home Office Forms) framework.


## Getting Started

### Prerequisities

- [Node.js](https://nodejs.org/en/) - Tested against LTS
- NPM (installed with Node.js) - Works with versions 2 and 3
- [Redis server](http://redis.io/download) running on the default port

### Up & Running

```bash
$ cd firearms
$ yarn install
$ yarn run start:dev
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
### Running firearms service locally
1. Start file-vault
   a. Update .env file. Copy the following key values from test environment configuration file
      * FILE_VAULT_URL=http://localhost:3000
      * PORT='3000'
      * AWS_ACCESS_KEY_ID=
      * AWS_SECRET_ACCESS_KEY=
      * AWS_KMS_KEY_ID=
      * AWS_BUCKET=
      * AWS_PASSWORD=
      * RETURN_ORIGINAL_SIGNED_URL=
      * ALLOW_GENERATE_LINK_ROUTE=
      * AWS_REGION=
      * AWS_SIGNATURE_VERSION=
      * AWS_EXPIRY_TIME=
   b. If you are getting error related to virus scan while running firearms service.Comment line number 170 in router.post (clamAV) in file.js.
   c. Run bellow commands on terminal
      * yarn install
      * yarn start:dev

2. Start html-pdf-converter
   a. Change port in config.js to 8082.
   b. Run bellow commands on terminal
      * yarn install.
      * yarn dev.

3. Start Hof-rds-api
   a. Update .env file. Copy the following key values from test environment configuration file
      * PORT=3001
      * SERVICE_NAME=acq
      * NODE_ENV=local
      * HOF_USER_PASS=
      * RESOLVER_USER_PASS=
      * REPORTS_USER_PASS=
      * GRAFANA_USER_PASS=
   b. Run bellow commands on terminal 
      * brew install postgresql
      * brew services start postgresql
      * psql postgres
      * CREATE ROLE postgres WITH LOGIN PASSWORD 'postgres'; ALTER ROLE postgres WITH SUPERUSER; CREATE ROLE knex WITH LOGIN PASSWORD 'knex'; ALTER ROLE   knex WITH SUPERUSER; CREATE DATABASE acq;
      * yarn install
      * yarn start:dev  

4.  Start firearms
   a. Update .env file. Copy the following key values from test environment configuration file 
      * NOTIFY_KEY=
      * CASEWORKER_EMAIL=
      * TEMPLATE_MUSEUM=
      * TEMPLATE_SECTION5=
      * TEMPLATE_SHOOTING_CLUB=
      * TEMPLATE_SUPPORTING_DOCUMENTS=
      * EMAIL_REPLY_TO_DEFAULT=
      * EMAIL_REPLY_TO_FIREARMS=
      * PDF_CONVERTER_URL=http://localhost:8082/convert
      * #NOTIFY_KEY=
      * #NODE_ENV=
      * ICASEWORK_TIMEOUT=6000
      * FILE_VAULT_URL=http://localhost:3000/file
      * KEYCLOAK_SECRET=
      * KEYCLOAK_CLIENT_ID=
      * KEYCLOAK_USERNAME=
      * KEYCLOAK_PASSWORD=
      * KEYCLOAK_TOKEN_URL=
      * AWS_BUCKET=acq-notprod
   b. Run bellow commands on terminal 
      * yarn install 
      * yarn dev.  
   c. If you are getting error related to virus scan while running firearms service.Comment line number 170 in router.post (clamAV) in file.js in   file-vault.         

