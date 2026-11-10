# Decisions

| # | Date | Decision | Status |
| --- | --- | --- | --- |
| 1 | 2026-11-10 | Self-hosted Better Auth instead of a hosted auth provider (cost) | approved by owner |
| 2 | 2026-11-10 | LLM extraction is optional, off by default, and uses each organization's own API key | approved by owner |
| 3 | 2026-11-10 | Postgres-backed jobs (pg-boss); no Redis | proposed |
| 4 | 2026-11-10 | Adopt the starter kit: master brief, 12 agents, 8 skills, Liquid Glass design doc, quality gates | done |
| 5 | 2026-11-10 | Expiration windows are 30/60/90 days (kit) rather than the earlier 30/14/7 proposal; reminder cadence to be set per organization | proposed |
| 6 | 2026-11-10 | Extraction service (`services/extractor`) adapted from the owner's earlier personal project; owner confirmed it is their own work and authorized reuse. Code only: no data or fixtures. See `services/extractor/PROVENANCE.md` | approved by owner |
| 7 | 2026-11-10 | Vendored Impeccable (Apache-2.0, hooks not installed, telemetry off) and Vercel react-best-practices (MIT) at pinned commits; see `.claude/skills/VENDORED.md`. UI UX Pro Max and Superpowers deferred | approved by owner |
| 8 | 2026-11-10 | Removed the single-file handoff document after its sections were materialized | approved by owner |
| 9 | 2026-11-10 | One pnpm workspace with a single app (`apps/web`) holding UI and server modules; packages are split out only when a second consumer exists | done |
| 10 | 2026-11-10 | TypeScript pinned to 6.x: the linter's TypeScript plugin does not support 7.0 yet | done |
| 11 | 2026-11-10 | Typeface: Instrument Sans (variable, self-hosted via npm, OFL) for all UI, drawn narrower for titles; Geist Mono for identifiers. Tabular numerals verified in the browser | done |
| 12 | 2026-11-10 | Accent colour: deep teal `#0e6b75` (light) / `#56c2cc` (dark). Token contrast is enforced by a unit test | done |
| 13 | 2026-11-10 | Glass only on the sidebar, top bar, phone dock and command palette. Dialogs and all data surfaces are opaque | done |
| 14 | 2026-11-10 | Screens whose data model is not built show a plain "not built yet" state with no controls, rather than mock data | done |
| 15 | 2026-11-10 | `/design` component reference stays reachable by address but is not linked in production navigation | done |
