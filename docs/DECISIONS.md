# Decisions

| # | Date | Decision | Status |
| --- | --- | --- | --- |
| 1 | 2026-11-10 | Self-hosted Better Auth instead of a hosted auth provider (cost) | approved by owner |
| 2 | 2026-11-10 | LLM extraction is optional, off by default, and uses each organization's own API key | approved by owner |
| 3 | 2026-11-10 | Postgres-backed jobs (pg-boss); no Redis | proposed |
| 4 | 2026-11-10 | Adopt the starter kit: master brief, 12 agents, 8 skills, Liquid Glass design doc, quality gates | done |
| 5 | 2026-11-10 | Expiration windows are 30/60/90 days (kit) rather than the earlier 30/14/7 proposal; reminder cadence to be set per organization | proposed |
| 6 | 2026-11-10 | Source of the OCR/extraction implementation | **open**: the kit requires independently authored code; an uncommitted `services/extractor/` directory in the working tree is on hold until the owner decides. It is not part of this repository's history. |
| 7 | 2026-11-10 | No third-party skills installed yet; see `docs/ENVIRONMENT.md` for the review | awaiting approval |
