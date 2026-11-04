# Firearms Playwright BDD tests

The FAR features are copied unchanged from `hof-e2e-auto-tests/Function/src/main/resources/features/ui/far`.
The page objects and aggregate `pages` fixture follow the LMR test structure.
Every FAR source page is registered in `fixture/fixtures.ts`. The source
`FarStepLib` and `FarCommonStepLib` methods live in `steps/far.step.ts`; BDD
bindings are split into common, S5, museum and shooting-club files.

When a step checks a page title immediately before answering that page, use a
page-owned `WithTitleCheck` method that awaits `assertPageTitle` and then delegates
to the existing answer method. Keep the original answer methods for steps that
do not check the title, including validation scenarios. Standalone title checks
before branching or checking page content remain in the step bindings.

Concrete pages implement `expectedPageTitle`, including all four submission
confirmation journeys. The source's three shared components (`FarContactDetails`,
`FarUploadDocs`, and `FarAnotherAddressForStorage`) inherit their title contract
from `BasePage`; their concrete journey subclasses supply the actual titles.
The source parity audit checks locator fields, method coverage, and concrete
title implementations rather than accepting the base title placeholder.

## Prerequisites

- Install dependencies with `yarn install`.
- Playwright and its test runner are pinned together because the installed
  Playwright BDD version relies on loader APIs that changed in Playwright 1.60.
- Install Chromium when missing: `yarn playwright install chromium`.
- Set `PLAYWRIGHT_BASE_URL` to a running firearms service. Without it, Playwright
  starts `npm start` using `PLAYWRIGHT_PORT` (default 8080). The app and the tests
  must use the same port.
- A local application requires Redis, built assets, and the existing service
  configuration described in the repository README. Submission/supporting-document
  tests also require working file-vault, PDF conversion, authentication, Notify,
  and casework services. The harness does not fake successful submissions.

## Validation order

```powershell
yarn test:e2e:types
yarn test:e2e:parity
yarn test:e2e:generate
yarn playwright test --list --project=chromium
yarn test:e2e:isolated
```

`test:e2e:isolated` discovers expanded scenarios, executes each generated
file/line selector separately with one worker and no retries, records diagnostics
in `test-results/scenario-validation.json`, and runs the full suite **only when
every isolated scenario has passed**. Set `FAR_VALIDATION_REPORT` to save this
report outside the per-run Playwright output directory.

To investigate one scenario, use the generated file/line from `--list`:

```powershell
yarn playwright test "farS5.feature.spec.js:12" --project=chromium --workers=1 --retries=0
```

After isolated validation passes, `yarn test:e2e` runs the full suite directly.
Screenshots and videos are always recorded. Reports, generated specs and
recordings are ignored by Git.

## Source parity

The audit accepts an optional source repository and JSON report destination:

```powershell
node e2e-tests\utility-helper\audit-source-parity.cjs C:\path\to\hof-e2e-auto-tests C:\reports\far-parity.json
```

It checks exact feature contents (including tags, titles, Examples, comments and
scenario IDs), source page/method and fixture coverage, StepLib method coverage,
step-expression coverage, and all 18 CSV data variants. These are structural
checks, not a substitute for browser validation.

Each product step file owns an exact-description scenario switch whose cases
execute the ordered journey. Answers are passed directly into page methods as
literals or existing constants. There is no shared answer object or answer lookup
on `BasePage`; only product, context, scenario and the submitted reference persist.
Full questionnaire journeys combine product setup, scenario selection, journey
navigation, and questionnaire completion in one step:

```gherkin
When I complete the Firearms "Museums" questionnaire for product "FARMuseum" pertaining to scenario "<Description>"
```

Use `"New Dealer"` / `"FARS5"` for S5 and `"Shooting Clubs"` /
`"FARShootingClub"` for clubs. The combined step validates the description and
journey/product pair before navigation and stores only those identifiers.
The existing data-only bindings validate the exact scenario without navigating.
Validation steps pass their own explicit scenario values to page methods;
check-your-answers assertions use explicit scenario expectations rather than
reading answers from shared state. Unknown descriptions, products, and contexts
throw clear errors. Museums `validation` context preserves the original renewal
scenario's distinct contact name; full questionnaires use `journey` context.
No descriptions are lowercased, trimmed or aliased.

Run `node --test e2e-tests/steps/far-scenarios.test.cjs` on Node 24 to check all
18 variants and both Museums validation selections. The suite retains SHA-256
fingerprints captured before removing shared answer state, covering ordered page
calls, their arguments, and check-your-answers expectations. It also checks
data-only setup without answer storage or navigation, exact-description rejection,
journey/product mismatches and validation contacts and address choices.

CSV files are not used at runtime. The effective shooting-range choices are
visible directly in the scenario cases, without retaining unused source columns.

The source's page-validation journey helper unconditionally called the S5
before-you-start page even for museums and clubs. The migrated helper only
visits that page for S5, preserving each journey's actual route boundary.
Other source discrepancies are left visible to validation rather than changing
features or weakening assertions.

Test values and upload paths are centralized in `utility-helper/constants-lib.ts`.
Set `SAS_HOF_EMAIL` in the test environment for the application contact email.
This explicit environment override is the agreed deviation from the source
constant; feature-file email values remain unchanged for strict feature parity.
The source VPN guide PDF and max-length text are stored under `test-data`;
page objects accept data through method arguments rather than importing fixtures.
