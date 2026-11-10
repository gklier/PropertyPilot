# Environment and tooling verification (cloud session, 2026-11-10)

Everything below was actually run in the Claude Code cloud container unless marked "not run".

## Works
| Capability | Evidence |
| --- | --- |
| Node 22.23, pnpm 10.28, npm registry access | `npm view next version` returned a version |
| Git read and push to this repo | push check passed |
| Chromium 153 + Playwright 1.63 (pre-installed) | launched headless, took a 375px screenshot; `backdrop-filter` supported; `prefers-reduced-transparency` media query parsed |
| PostgreSQL 16.15 without Docker | throwaway cluster via `initdb`/`pg_ctl` as a non-root user, `select version()` succeeded |
| `pdftotext` (poppler) | binary present |
| Project agents/skills format | 12 agents and 8 skills: frontmatter `name` matches file/folder, `description` present, body non-empty (scripted check) |
| Skills already available in the session | `frontend-design`, `code-review`, `security-review`, `simplify`, `run`, `dataviz`, `pdf` |

## Does not work or is missing
| Capability | Status |
| --- | --- |
| Docker daemon | CLI only; compose files cannot be run here. CI and local machines can. |
| TypeScript 7 with the linter | typescript-eslint rejects TS 7.0; the project pins TS 6.x |
| Lighthouse, gitleaks, tesseract, qpdf | not installed. Lighthouse can be added as a dev dependency driving the pre-installed Chromium (needs approval). |
| PyTorch / docTR | not installed; OCR of scanned PDFs cannot run here yet |
| GitHub MCP server | failed to connect; `git` and `gh` are used instead |
| Playwright MCP / Chrome DevTools MCP | not configured; plain Playwright covers the need |
| Live agent discovery | The project skills appeared in the session's skill list after they were committed. The 12 project agents did not appear in the agent list mid-session; confirm at the start of the next session. |

Postgres must not run as root: use a non-root OS user and a data directory that user owns.

## Upstream skill review (read-only; nothing installed or executed)
Repos were shallow-cloned to a scratch directory and inspected. No install scripts were run.

| Skill | License | Findings | Recommendation |
| --- | --- | --- | --- |
| Anthropic `frontend-design` | Apache-2.0 | single SKILL.md | Already available in this session. Use it; no install. |
| Anthropic `webapp-testing` | Apache-2.0 | SKILL.md plus helper Python scripts | Optional. Plain Playwright Test already works; skip for now. |
| Vercel `react-best-practices` | MIT | Markdown only, no scripts | Recommend. Safe to vendor at a pinned commit. |
| Vercel `web-design-guidelines` | MIT (repo packages) | 39-line SKILL.md that fetches its rules from a remote URL at run time | Compatible, but remote content must be treated as untrusted guidance. Prefer vendoring a pinned copy. |
| Vercel `composition-patterns`, `react-view-transitions` | same repo | Markdown | Later, when component count grows. |
| Impeccable (`pbakaus/impeccable`) | Apache-2.0 | no npm lifecycle scripts; ships a CLI, agents and **hooks** | Recommend for design critique, installed from upstream at a pinned commit, after reviewing its hooks. An `impeccable` skill is visible in this session from another source; it must not be copied from there. |
| UI UX Pro Max | MIT | CLI plus ~119 Python/shell files; a style catalogue with many competing systems | Defer. Risk of conflicting with `docs/LIQUID_GLASS_DESIGN.md`, and the largest code surface to review. |
| Superpowers (`obra/superpowers`) | MIT | installs a **session-start hook** | Defer. Process-heavy and changes session behaviour. |
| Playwright MCP, Chrome DevTools MCP | not reviewed in depth | need MCP config the cloud session may not honour | Skip; revisit only if plain Playwright proves insufficient. |
| Vercel `deploy-to-vercel` | n/a | deploys | Do not install until a deployment is approved. |

Reviewed HEAD commits: impeccable `b856e50`, ui-ux-pro-max-skill `6ae86f6`, vercel agent-skills `1a2c79d`, anthropics/skills `2c5958e`, superpowers `22f0b46`.
