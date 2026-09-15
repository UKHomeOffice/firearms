# Changelog

All notable changes for HOFF-2259 are recorded here while the work is in progress.

## Unreleased

### Added

- Added `instructions.md` to define the required unit, integration, acceptance, accessibility, coverage, mocking, and Drone behavior.
- Added `plans.md` with the staged implementation and validation plan.
- Added this changelog to track completed work separately from planned work.
- Added an HTTP integration harness using Supertest, the real HOF application, and Redis.
- Added integration coverage for liveness, readiness, cookie middleware, museums journey entry, rendering, and postcode mock contracts.
- Added Playwright and axe accessibility checks for the museums privacy page and accessibility statement, including title, heading, and keyboard-focus assertions.
- Added one deterministic Cucumber smoke scenario for each service journey.
- Added a stable PDF upload fixture for browser tests.
- Added blocking Drone jobs for integration, local accessibility, deployed acceptance smoke, and deployed accessibility smoke.

### Changed

- Renamed the format-address unit suite from `format-address-spec.js` to `format-address.spec.js` so it matches the Mocha discovery pattern.
- Renamed the museums and shooting-clubs submission suites from `submission.test.js` to `submission.spec.js` so they match the Mocha discovery pattern.
- Made Proxyquire imports local to existing PDF, existing-authority-documents, and supporting-documents unit specs so target paths resolve consistently.
- Updated the PDF error-response fixture to use the response shape expected by the model.
- Updated the museums and shooting-clubs submission tests to pass the required bearer token and verify authorised document URLs.
- Enabled all-source NYC instrumentation for `apps/**/*.js` and set the initial measured baseline to 30% statements, 25% branches, 22% functions, and 31% lines.
- Made the CI upload mock return a deterministic URL.
- Repaired Cucumber hooks to use per-scenario World instances and removed invalid runtime hook registration and cross-process Sinon stubbing.
- Made Sonar depend on unit LCOV, wait for its quality gate, and block image construction.
- Made image construction depend on lint, unit, integration, accessibility, and Sonar for master and feature/pull-request builds.
- Corrected staging dependencies so master UAT browser smoke tests must pass before staging deployment.
- Updated README testing and CI coverage instructions.

### Fixed

- Prevented structured PDF converter error responses from being passed to `Buffer.from`, allowing client errors to retain their title and message.

### Planned

- Add focused unit coverage for external boundaries and orchestration behavior.
- Extend integration coverage to form posts, Redis session retention, and session isolation.
- Add deterministic Keycloak, iCasework, Notify, PDF converter, and file-vault service stubs for complete submission journeys.
- Run the full non-destructive acceptance and accessibility regression suites on master before staging after the service stubs are available.
- Extend accessibility coverage across validation, conditional, upload, check-answers, declaration, and confirmation states.
- Publish unit coverage, JUnit, browser trace/screenshot, application log, and axe artifacts.

### Validation

- Validated with Node `v24.18.0` through `nvm`.
- Lint passes.
- Unit tests pass: 128 tests.
- All-source coverage passes: 30.58% statements, 25.84% branches, 22.53% functions, and 31.39% lines.
- An intentional 100% line threshold override exits nonzero, proving the NYC gate fails as required.
- Integration tests pass: 6 tests against the real application and Redis.
- Accessibility tests pass: 2 Playwright/axe tests.
- Acceptance smoke passes: 4 scenarios and 24 steps.
- Drone YAML parses successfully.
- Docker image validation remains unavailable because the local Docker daemon is not running.