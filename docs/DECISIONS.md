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
