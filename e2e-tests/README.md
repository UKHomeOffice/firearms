# Firearms Playwright BDD Tests

Migrated from `HOF/Function/src/main/resources/features/ui/far`, using the LMR
fixture, page-object, feature and step-directory conventions.

## Setup

Use the Node version required by the root package, then run:

```powershell
yarn install
yarn playwright install chromium
yarn test:e2e:types
yarn test:e2e:parity
```

The parity command needs the source checkout. Its default is `../HOF`; override
with `SOURCE_E2E_ROOT` or pass the source root directly to
`node e2e-tests/utility-helper/check-source-parity.cjs`.
CSV parsing is restricted to that source audit. Browser tests use the switch-based
TypeScript data module and never load CSV files.

## Environment

Set `PLAYWRIGHT_BASE_URL` to a running, approved test environment, or run the app
and its documented dependencies yourself on port 8080. `PLAYWRIGHT_PORT` changes
the default port. This harness does not provision dependencies, configure secrets,
start infrastructure, mock submission services, or modify deployment settings.

The app requires Redis, file-vault, PDF conversion and its submission/email
integrations. See the root README. Authentication must already be provisioned.
Do not point these tests at production: they submit applications and upload files.
Keep secrets in the existing ignored environment file or process environment.

## Validation Order

After permission to execute the scenarios has been granted:

```powershell
$env:PLAYWRIGHT_BASE_URL = 'http://localhost:8080'
yarn test:e2e:validate --preflight
yarn test:e2e:validate
```

The runner executes every expanded case separately, with one worker and no
Playwright retries. It retries a hung execution once, continues past scenario
failures, and stops on an environment outage. The full run is permitted only when
all 28 isolated cases pass in the current invocation.

For a targeted rerun, use the exact command for that case in
`validation-manifest.json`. Commands select generated test file and line, so
separate Examples cannot accidentally execute together. Run `yarn bddgen` after
changing steps, and regenerate the parity manifest after changing features.

Screenshots and video are always enabled. Per-case JSON reports, logs and browser
artifacts are stored under `test-results/isolated/<case-id>`; the consolidated
result is `test-results/isolated/validation-results.json`. These are ignored.
They may contain applicant data and must be handled as test evidence.

See `MIGRATION.md` for parity scope, refactor rationale and source limitations.