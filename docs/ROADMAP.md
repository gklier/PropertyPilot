# Roadmap

| Milestone | Content | Exit test |
| --- | --- | --- |
| M0 Foundation (done 2026-11-10) | monorepo, tokens and core components, navigable shell, CI, local Postgres, env validation | fresh-clone install, lint, typecheck, build pass; shell screenshots at 5 widths, light/dark |
| M1 Identity and tenancy | auth, organizations, roles, policy module, audit events | cross-org access denied in automated tests |
| M2 Vendors and requirements | properties, vendors, contacts, assignments, requirement templates | CRUD persists across refresh; table search/sort/paginate |
| M3 Documents and extraction | private upload, adapter, evidence panel, review queue | malformed PDF handled; unverified state shown; direct URL access denied |
| M4 Follow-up | expiration queue, tasks, vendor upload links, reminder outbox and previews | date boundary tests; expired link rejected; no duplicate reminders |
| M5 Polish | demo seed, dashboard, a11y and performance pass, e2e hero flow, deploy docs | all quality gates |
| M6+ SiteOps | only after M5 passes | |
