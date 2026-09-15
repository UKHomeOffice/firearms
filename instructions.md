# HOFF-2259 Test Coverage Instructions

## Objective

Improve the quality and coverage of automated testing for the Firearms service and make every required test gate fail the Drone build when its acceptance criteria are not met.

The work must cover all applicable test types:

- Unit tests
- Integration tests
- Acceptance tests
- Accessibility tests

## Acceptance Criteria

Given a Drone pipeline is running for the service,
when the test jobs run,
then each required test suite and coverage gate must be enforced,
and a failure must stop dependent build, deployment, or promotion jobs.

## Test Strategy

### Unit tests

- Use Mocha, Chai, Sinon, Proxyquire, and mock-fs, following existing repository patterns.
- Fix test discovery so every intended unit suite uses the `.spec.js` convention.
- Configure NYC to instrument all application JavaScript, not only modules loaded by tests.
- Establish an honest initial statements, branches, functions, and lines baseline.
- Fail the unit job when the committed NYC thresholds are not met.
- Ratchet thresholds upward as coverage improves. Threshold reductions require explicit review.
- Prioritise observable behavior, request contracts, errors, side effects, and asynchronous completion over tests written only to increase percentages.

### Integration tests

- Exercise the real HOF/Express application over HTTP without a browser.
- Use a real Redis service for session behavior and deterministic local stubs for external APIs.
- Cover health and readiness, routing, validation, representative journey forks, session persistence, session isolation, and mock API contracts.
- Use Supertest with the existing Mocha and Chai stack.
- Fail the Drone build on integration failure or application readiness timeout.
- Produce JUnit results and retain useful application logs.

### Acceptance tests

- Exercise critical user journeys through a deployed application with Cucumber and Playwright.
- Repair the existing browser lifecycle, upload fixtures, and cross-process mocking before enabling the Drone gate.
- Use deterministic CI services for Keycloak, iCasework, Notify, PDF conversion, and file-vault contracts.
- Run tagged smoke scenarios on pull requests.
- Run the full non-destructive regression suite on master before staging.
- Keep destructive scenarios isolated behind an explicit environment or schedule.
- Retain JUnit output, traces, screenshots, console errors, and network diagnostics on failure.

### Accessibility tests

- Use Playwright with `@axe-core/playwright` for automated WCAG checks.
- Fail on WCAG 2.0 and 2.1 level A and AA violations.
- Cover representative content, form, conditional, validation-error, upload, check-answers, declaration, and confirmation states.
- Add explicit tests for keyboard use, visible focus, error-summary focus and targets, titles, headings, landmarks, and focus after navigation.
- Run a stable pre-build suite and deployed smoke/regression suites alongside acceptance tests.

## Coverage Policy

- Unit tests own JavaScript statement, branch, function, and line coverage through NYC and Sonar.
- Integration, acceptance, and accessibility suites own behavioral coverage and must publish suitable pass/fail reports.
- Browser tests must not be presented as Node.js source coverage.
- NYC must use an all-source baseline and enforce committed thresholds immediately.
- Sonar must consume LCOV, wait for its server-side quality gate, and fail Drone if that gate fails.

## Drone Requirements

- `setup` must precede lint, unit, integration, and local accessibility jobs.
- Sonar must depend on successful unit coverage generation.
- Image construction must depend on lint, unit, integration, local accessibility, and Sonar.
- Pull-request deployment must be followed by readiness, acceptance smoke, and accessibility smoke gates.
- Master UAT deployment must be followed by full non-destructive acceptance and accessibility regression gates.
- Staging must depend on successful master browser suites.
- Every test command must preserve a nonzero exit status.
- Test artifacts must identify the commit and tested deployment URL.

## Mocking Guidance

- Do not add another unit mocking framework; Sinon and Proxyquire cover the current module boundaries.
- Add Supertest for HTTP integration testing.
- Add `@axe-core/playwright` for accessibility testing.
- Prefer deterministic HTTP contract stubs for browser and cross-process testing. In-process Sinon stubs cannot replace dependencies used by a separately running or deployed application.
- Fixtures and mock responses must be stable; avoid random IDs or URLs unless the assertion deliberately handles them.

## Scope Controls

- Make minimal changes consistent with existing HOF patterns.
- Apply production fixes only when a focused test demonstrates the defect.
- Do not merge integration process coverage into unit NYC thresholds unless instrumentation and report merging are proven reliable.
- Do not make production rollback behavior part of this initial implementation.
- Keep documentation and `CHANGELOG.md` current as work progresses.

## Required Verification

1. Run lint and all unit tests under the Node version declared in `package.json`.
2. Confirm committed NYC thresholds pass and an intentionally impossible threshold exits nonzero.
3. Run integration tests with a clean Redis service and verify readiness and failure behavior.
4. Run pull-request acceptance and accessibility smoke suites against the deployed branch environment.
5. Run full non-destructive browser regression against master UAT before staging.
6. Verify Drone dependency order and confirm every failed gate blocks its descendants.
7. Confirm Sonar imports `coverage/lcov.info` and waits for the configured quality gate.
