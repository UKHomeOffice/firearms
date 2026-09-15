Firearms Licensing Application
------------------------------
Firearms Licensing Application built using HOF (Home Office Forms) framework.


## Getting Started

### Prerequisities

- [Node.js](https://nodejs.org/en/) - for supported versions see `engines.node` in [package.json](package.json)
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
CASEWORKER_EMAIL               | Caseworker email
AWS_EXPIRY_TIME                | AWS config
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

Tests require the Node version declared in `package.json`. Install dependencies before running a suite:

```bash
$ yarn install --frozen-lockfile
```

### Unit Tests

Unit tests use Mocha, Chai, Sinon and Proxyquire. NYC instruments all JavaScript under `apps` and fails when the committed statements, branches, functions or lines thresholds are not met.

```bash
$ yarn test:unit
```

Coverage thresholds represent the integer floor of the measured all-source baseline and should be raised as coverage improves. Reducing a threshold requires explicit review.

### Integration Tests

Integration tests start the real application in `ci` mode and exercise it over HTTP. A Redis service must be available. The command uses `127.0.0.1:6379` by default; set `REDIS_HOST` and `REDIS_PORT` to override it.

```bash
$ yarn test:integration
```

### Acceptance Tests

Start the application with `NODE_ENV=ci`, a 32-byte `SESSION_SECRET`, and Redis configuration. In another terminal, point the browser suite at that application:

```bash
$ ACCEPTANCE_HOST_NAME=http://127.0.0.1:8080 TAGS=@smoke yarn test:acceptance
```

Omit `TAGS=@smoke` to use the script's default `@feature` tag. CI smoke scenarios avoid destructive or external submission behavior.

### Accessibility Tests

The local accessibility command starts the application and scans representative pages with Playwright and axe:

```bash
$ yarn test:accessibility
```

To scan an application that is already deployed or running:

```bash
$ ACCESSIBILITY_BASE_URL=https://example.test yarn test:accessibility:deployed
```

### CI Enforcement

Drone runs lint, unit coverage, integration, local accessibility and the Sonar quality gate before constructing an image. Pull-request and master UAT deployments are followed by acceptance and accessibility smoke tests. A failed test, coverage threshold, readiness check or Sonar quality gate returns a nonzero status and blocks dependent jobs.
