# Firearms end-to-end tests

The end-to-end tests use Playwright with BDD feature files to exercise the
Firearms application in a browser. The suite can run against the UAT service or
a local service. This guide describes running it against UAT.

## Test structure

- `features/` contains the Gherkin scenarios, grouped by journey:
  - `farMuseums/` for museum applications and validation.
  - `farNewDealer/` for new-dealer applications and validation.
  - `farShootingClub/` for shooting-club applications and validation.
  - `farSupportDocuments/` for supporting-document journeys and validation.
- `steps/` maps feature steps to test actions. `firearms-common.step.ts` contains
  shared steps; the other step files cover museums, new dealers, shooting clubs,
  and check-your-answers behaviour.
- `pages/` contains page objects for the application journeys.
- `fixture/fixtures.ts` creates the shared Playwright test fixture and page
  objects.
- `utility-helper/` contains shared test values and utilities.
- `test-data/` contains files used by upload and file-size scenarios.
- `playwright.config.ts` configures the browser, feature discovery, base URL,
  and local web server behaviour.

## Run locally against UAT

You need repository dependencies, Chromium, network access to the internal UAT
service, and an authorized test email address. Some scenarios submit
applications or supporting documents, so run them only with an approved test
account and data.

From the repository root, create or update the root `.env` file:

```dotenv
PLAYWRIGHT_BASE_URL=https://firearms-licensing.uat.internal.sas-notprod.homeoffice.gov.uk
SAS_HOF_EMAIL=your-authorized-test-email@example.com
```

The Playwright configuration loads `.env` from the repository root. Keep this
file local and do not commit it or share its contents.

Install dependencies and the browser if they are not already available:

```powershell
yarn install
yarn playwright install chromium
```

Run the end-to-end suite:

```powershell
yarn test:e2e
```

This command generates the BDD Playwright tests and runs them. Because
`PLAYWRIGHT_BASE_URL` is set, the runner uses the UAT URL and does not start a
local application server.

To list the discovered browser tests before running them:

```powershell
yarn test:e2e:generate
yarn playwright test --list --project=chromium
```

Other useful checks:

```powershell
yarn test:e2e:types
yarn test:e2e:parity
```

If `PLAYWRIGHT_BASE_URL` is not set, the Playwright configuration defaults to a
local URL and starts the local development server instead.