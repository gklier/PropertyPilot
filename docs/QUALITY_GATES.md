# Quality gates — working product beats impressive mockups

## Milestone definition of done

1. **Runs:** clean setup/build instructions work from a fresh clone, no missing environment values that are not documented.
2. **Persistence:** create/read/update operations survive refresh and persist per authorized organization.
3. **Authentication/authorization:** anonymous routes blocked where appropriate; cross-org and cross-property data access denied server-side; uploaded documents cannot be enumerated via public URLs.
4. **Safe parsing:** upload type/size limits, bad PDF handling, field-level uncertain extraction, manual verification queue; no fabricated coverage judgment.
5. **Alerts:** due-date computation tested across boundary cases/time zones; reminders deduplicated and previewed before live sending.
6. **Real navigation:** no dead links/buttons, fake charts, placeholder metrics or decorative nonfunctional controls represented as working.
7. **Responsive:** 320/375/768/1024/1440 layouts checked for clipped content, overflow, popover positioning and touch interaction.
8. **Accessibility:** keyboard journeys, focus trapping/restoration, accessible names, landmark/heading hierarchy, error descriptions, contrast review, reduced motion.
9. **Performance:** verify lab performance with reproducible tooling; lazy load heavy views; minimize JS and expensive blur effects; no unmeasured '100 Lighthouse' claims.
10. **Operations:** useful logging with redaction, retryable jobs, error states, backup/restore documented, privacy-aware retention/deletion.
11. **Secrets:** no real credentials in git/fixtures/screenshots/docs; run scanner in CI if available; review third-party package additions.
12. **Evidence:** attach test commands actually executed, observed outputs, browser screenshots if available, changed-file list, risk register and next actions.

## Minimum verification flow

- Typecheck/lint/unit tests, migration dry run and E2E path from login to COI review and request update.
- Negative E2E: unrelated org cannot retrieve another org's vendor/document, even via direct URL or API call.
- Run UI through real browser with mobile/desktop viewports; record console/network errors.
- Fail build/release on broken navigation, privilege escalation, data leakage, secret exposure or critical accessibility defects.

## Release boundaries

A polished private preview is not proof of production readiness. First public beta needs human review of insurance decisions, explicit permissions, privacy notice, operational support owner, dependency audit, CI and backup plan. No public launch or chargeable integration without authorization.
