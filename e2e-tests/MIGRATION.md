# Firearms Migration Report

## 1. PATCH_SUMMARY

- Added an isolated Playwright BDD harness following LMR's `features`, `steps`,
  `pages`, `fixture`, and `utility-helper` structure, plus `test-data`.
- Preserved all ten source feature files byte-for-byte, including tags, comments,
  descriptions, Backgrounds, scenario names and active Examples.
- Translated all 18 CSV rows to switch-based TypeScript variants. Browser tests
  have no CSV dependency. Copied the exact source PDF and large-text fixture.
- Added typed, per-test pages/data fixtures, generic control helpers, coherent
  journey step files, exact summary assertions and captured reference numbers.
- Enabled screenshots/video for every test, and ignored generated output.
- Added a reproducible source audit and a one-case-at-a-time validation runner.
- No CI, deployment, auth, secret or infrastructure configuration was changed.

## 2. SOURCE_TO_TARGET_SCENARIO_MAPPING_TABLE

Every source scenario maps to the identically named scenario in the same relative
feature path beneath `e2e-tests/features`.

| Source Relative File | Scenarios | Active Examples | Expanded Cases |
| --- | ---: | ---: | ---: |
| farMuseums/farMuseum.feature | 3 | 6 | 7 |
| farMuseums/farMuseumsValidation.feature | 2 | 0 | 2 |
| farS5/farS5.feature | 3 | 5 | 6 |
| farS5/farS5Validation.feature | 1 | 0 | 1 |
| farShootingClub/farShootingClub.feature | 3 | 6 | 7 |
| farShootingClub/farShootClubValidation.feature | 1 | 0 | 1 |
| farSupportDocs/farMuseumSupportDoc.feature | 1 | 1 | 1 |
| farSupportDocs/farS5SupportDoc.feature | 1 | 1 | 1 |
| farSupportDocs/farSClubsSupportDoc.feature | 1 | 1 | 1 |
| farSupportDocs/farSupportDocValidation.feature | 1 | 0 | 1 |
| Total | 17 | 20 | 28 |

`source-parity.json` contains the complete per-scenario mapping with exact titles
and source lines. `validation-manifest.json` lists every expanded case, data
selection and isolated execution command.

## 3. FEATURE_FILE_PARITY_AUDIT

Static result: PASS. All ten files are byte-identical, with zero feature-title,
scenario-title, tag, description, active-example-value or row-count drift.
SHA-256 hashes and expanded case counts are recorded per file in
`source-parity.json`. The commented Section 5 row 6 stays inactive.

## 4. SOURCE_IMPLEMENTATION_MAPPING_TABLE

`source-parity.json` contains all 101 individual StepLib method mappings, all
67 individual service page-class mappings, their public method inventories, and
the source-step-to-target-step mappings. The executable map definitions are in
`utility-helper/check-source-parity.cjs`; a missing source method, class, binding,
target file or representative target implementation fails the audit.

| Source Behavior Owner | Target |
| --- | --- |
| DataSetupStepDefinitions, ApplicantReader, FARApplicant | test-data/far-data.ts; common.step.ts |
| FarCommonStepLib: start, existing uploads, invoice | utility-helper/common-flows.ts |
| FarStepLib: start/supporting uploads | utility-helper/common-flows.ts |
| FarStepLib: museums and change answers | steps/museums.step.ts |
| FarStepLib: Section 5 and change answers | steps/section-five.step.ts |
| FarStepLib: shooting clubs and change answers | steps/shooting-clubs.step.ts |
| FarCommonStepLib: errors, validation, submission | steps/common.step.ts |
| FarCommonStepLib: supporting documents and reference | steps/supporting-documents.step.ts |
| FarCheckAnswers, CheckAnswers | utility-helper/expected-answers.ts; pages/summary-page.ts |
| CommonStepDefinitions.i_select_continue, CommonStepLib.selectContinueButton | pages/base-page.ts.continue |
| CommonMethods: radio/checkbox, typing, errors, uploads | BasePage; UploadPage |
| CommonPageUtils.enterYourAddressNoCountry | pages/address-page.ts.complete |

Refactored duplicates and equivalence rationale:

- All ten source address pages share `AddressPage.complete`. Distinct fixture
  instances retain route-specific expected titles; the same four source address
  values are supplied at each original branch. Address actions still submit once.
- Ten single-text-entry source pages share `TextPage.complete`; each instance
  retains its source field selector and expected title. Values stay in steps/data.
- The five upload classes share `UploadPage`; the exact PDF, description, Upload
  action and Documents added assertion are preserved. Existing/additional uploads
  retain their separate routes and Yes/No loops.
- Contact-detail classes share the email/phone helper. Secretary and deputy remain
  distinct route instances and receive their corresponding names/contact flows.
- Source summary classes share `SummaryPage`, retaining section-scoped table
  reads, exact field/value maps, change-link IDs, and changed-value assertions.
- Yes/No and added-item pages share controls, with distinct expected titles and
  added-content checks. Branching lives in the step layer, not generic pages.
- Source keyboard typing maps to focus, select-all, sequential typing and Tab;
  autocomplete explicitly selects the matching country option before continuing.
- Selenium waits become Playwright actionability and expect polling. No sleeps,
  bypassed validations, blanket selector fallbacks or submission mocks were added.
- The source ammunition helper is also invoked from the weapons validation step.
  It selected the same Unspecified option and explanation by label; the migration
  uses the actual weapons page's field ID for that equivalent interaction.
- Custom title templates are accepted alongside dynamic headings. Route-specific
  assertions remain, rather than deriving expected values from the live page.

## 5. STEP_DEFINITION_COVERAGE

- 128 distinct expanded source step texts map unambiguously to target bindings.
- These texts exercise 63 distinct Java step-definition methods.
- `bddgen` succeeds with no missing or ambiguous steps.
- Discovery lists 28 cases across ten feature files.
- The StepLib/page inventories conservatively include all service public methods
  and classes, including unused helpers, rather than excluding uncertain items.

## 6. SOURCE_IMPLEMENTATION_PARITY_COMPLIANCE

The complete machine-readable compliance block is in `source-parity.json`.

| Inventory | Source | Mapped |
| --- | ---: | ---: |
| Scenarios | 17 | 17 |
| Active Example rows | 20 | 20 |
| Expanded step phrases | 128 | 128 |
| Exercised Java step-definition methods | 63 | 63 |
| Service public StepLib methods | 101 | 101 |
| Service page classes | 67 | 67 |

Unmapped scenarios, phrases, step-definition methods, StepLib methods and pages:
none. Feature/scenario/example drift: zero. Static decision: PASS.

This decision covers exact feature/data parity and explicit implementation
traceability. It does not establish browser behavior parity. Runtime compliance
remains NOT VERIFIED until every isolated case and the gated full run pass.

## 7. VALIDATION_RUN_MANIFEST

- Isolated case commands: `validation-manifest.json`, 28 entries.
- Preflight: `yarn test:e2e:validate --preflight`.
- Ordered validation: `yarn test:e2e:validate`.
- Full command (only after all isolated cases pass):
  `yarn test:e2e --project=chromium --workers=1 --retries=0`.
- Execution results: `test-results/isolated/validation-results.json`.
- Typecheck, generation, data parity and discovery: PASS.
- Browser scenarios and full run: NOT RUN at migration handoff.

## 8. WARNINGS

- Execution submits applications and documents. Use only an approved test target.
- Preflight found no local listener on 8080 or Redis on 6379. Chromium was not
  installed at the initial check. No dependency services were provisioned.
- The source shooting-club CSV contains duplicate shooting-range headers. Both
  raw values are preserved; the effective value uses the last duplicate column,
  consistent with the ordinary repeated-property assignment interpretation.
  Confirm this interpretation against the Java runtime if its CSV mapping differs.
- The Java flow always selects both first range and secretary storage addresses,
  regardless of the CSV storage-selection field. That executed behavior is kept.
- Museum renewal validation selects row 2 even though its description says renewal;
  selection remains ID-only, matching ApplicantReader. No feature text was changed.
- The source museum name in CSV is not what the Java flow types; the shared
  ConstantsLib museum name is what gets entered and asserted, as in Java.
- Screenshots, videos, logs and uploaded evidence may contain test applicant data.
- Playwright and @playwright/test are aligned to 1.63.0 after discovery exposed
  conflicting installed framework versions.

## 9. ASSUMPTIONS

- The workspace's `HOF/Function` is the supplied source repository despite the
  recon prompt's different historical directory layout.
- The target is a running approved firearms environment with its existing auth,
  Redis, uploads, PDF, casework and notification integrations already configured.
- Generic control helpers are intentional consolidation of equivalent source
  pages; route-specific fixture instances still represent one page each.
- Source static mapping is traceability evidence, not a substitute for execution.

## 10. MANUAL_ACTIONS

1. Approve runtime validation and provide the running test base URL.
2. Ensure documented app dependencies and authentication are available; do not
   send credentials through chat.
3. Install Chromium if still absent: `yarn playwright install chromium`.
4. Run the manifest one case at a time. Diagnose failures using the failing step,
   route, expected/observed result and selector/wait/branch/data/assertion/environment
   category. Rerun the failing case after a focused fix.
5. Only run the full suite after every isolated case passes.