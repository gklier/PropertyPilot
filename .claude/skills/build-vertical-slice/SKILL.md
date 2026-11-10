---
name: build-vertical-slice
description: Use to implement one real frontend-to-database workflow with tests and documented acceptance checks.
---
# Build Vertical Slice

1. Define input, domain model, API and user story for the slice.
2. Implement migrations and authorization constraints first.
3. Implement server endpoint and typed client form/view.
4. Add realistic synthetic fixtures and unit/E2E coverage.
5. Run checks, screenshot if browser available, document exact results, commit reviewable changes.

Output: precise result, changed files, validation evidence, unresolved blockers, next recommended action. Read `CLAUDE.md` and avoid unapproved external operations.
