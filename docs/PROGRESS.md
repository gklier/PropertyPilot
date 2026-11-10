# Progress

## 2026-11-10: configuration kit installed (no feature code yet)
**Done**
- Materialized 26 files from `PropertyPilot_Fable_All_In_One.md`: `CLAUDE.md`, `PROPERTY_PILOT_FABLE_MASTER.md`, 4 docs, 12 agents, 8 skills. No target file existed beforehand, so nothing was overwritten or merged.
- Wrote `PRODUCT.md`, `ARCHITECTURE.md`, `DECISIONS.md`, `ROADMAP.md`, `ENVIRONMENT.md`.

**Commands actually run and results**
- Scripted extraction and frontmatter validation: "written 26", "agents 12 skills 8 all valid".
- Playwright/Chromium launch and screenshot: passed.
- Throwaway PostgreSQL 16 cluster start and query: passed.
- `npm view` against the registry: passed.
- Upstream skill repos shallow-cloned and read; nothing installed or executed.

**Known issues / open items**
- Live discovery of the 12 project agents could not be proven mid-session; verify at the start of the next session.
- Decision 6 (extraction source) is open; `services/extractor/` is uncommitted and on hold.
- Docker daemon, Lighthouse, gitleaks, OCR runtime are unavailable here.
- Repository visibility (private) was not verified from this session.
- No application code, tests or CI exist yet.

**Next:** owner approval of the M0 plan and of any third-party skill installs, then M0.

## 2026-11-10: owner decisions and skill installs
- Owner confirmed the extraction code is their own work and authorized reuse; committed as `services/extractor` with `PROVENANCE.md` (decision 6). Not yet run or tested here.
- Vendored Impeccable and Vercel react-best-practices at pinned commits (`.claude/skills/VENDORED.md`). Impeccable hooks not installed; telemetry off.
- Removed the single-file handoff document. Fast-forwarded `main` to include the kit.

## 2026-11-10: M0 Foundation
**Built**
- pnpm workspace, Next.js 16 app (`apps/web`), Tailwind 4 tokens, Radix primitives, self-hosted fonts.
- Shell: floating glass sidebar (icon rail from 768px, labelled from 1024px), glass top bar, phone dock with a "More" sheet, command palette (Ctrl/Cmd+K) that navigates and changes theme and table density, skip link.
- Pages: Overview with a live database check; six CertWatch screens that state plainly they are not built; Settings (theme and table density, stored in the browser); `/design` component reference with labelled sample content.
- Components: button, field with announced errors, status chip, panel, sortable table, dialog, toast, empty state, skeleton, segmented control.
- Server: validated environment, Postgres pool, Drizzle migration runner with a first migration (`citext` extension), `/api/health`, baseline security headers.
- Tooling: ESLint, TypeScript, Vitest, Playwright with axe, GitHub Actions workflow, `scripts/dev-db.sh`, `docker-compose.yml`, `.env.example`.

**Commands run and results (cloud container)**
| Command | Result |
| --- | --- |
| `pnpm lint` | 0 errors, 0 warnings |
| `pnpm typecheck` | passed |
| `pnpm test` | 52 unit tests passed in 3 files (environment parsing, navigation, token contrast for both themes) |
| `pnpm db:start` then `pnpm db:migrate` | PostgreSQL 16 started as a non-root user; "Migrations applied" |
| `pnpm build` | passed; 10 routes |
| `pnpm e2e` | 34 browser tests passed (Chromium 153) |

**What the browser tests cover**
- Every navigation link, the current-page marker, page titles, skip link, 404 page.
- Phone dock and "More" sheet, including Escape and focus return.
- Theme toggle and persistence, system theme, table density persistence, command palette.
- Form validation and its accessible description, table sorting and `aria-sort`, dialog focus trap and focus return, toasts.
- No horizontal page scroll on any of 9 routes at 320, 375, 768, 1024 and 1440px; the table scrolls inside its own region on narrow screens.
- axe (WCAG 2.0/2.1/2.2 A and AA rules): no violations on 9 routes, light and dark, at 1280 and 375px, plus the open dialog and command palette.
- Glass falls back to an opaque surface under reduced transparency and forced colours; reduced motion removes animation time.
- Health endpoint, live database state on Overview, security headers.
- Any console error or page exception fails the test that produced it.

**Found and fixed during verification**
- Command palette group headings measured 3.8:1 against the dimmed backdrop. The palette now uses a denser tint and darker heading text; axe passes.
- "Overview" was truncated in the phone dock at 320px; fixed.
- The Overview page showed the database server version string; removed.

**Screenshots** (`docs/screenshots/`, taken from the production build): `m0-overview-1440-light`, `m0-components-1440-dark`, `m0-overview-375-light`, `m0-vendors-768-dark`, `m0-palette-1024-light`, `m0-components-320-light`.

**Not done / known issues**
- The GitHub Actions workflow has not run yet; it triggers on pull requests and pushes to `main`.
- `docker-compose.yml` is untested here (no Docker daemon).
- No Lighthouse or other performance measurement; none is claimed.
- No screen reader pass; accessibility evidence is automated (axe) plus keyboard tests.
- No Content-Security-Policy header yet; planned with sign-in in M1.
- No secret scanner in CI yet.
- The app has no sign-in, so every page is public. Do not deploy this build.
- `services/extractor` is untested and not wired to the app.
- Specialist agents were not used for M0; the work was small enough for the lead to do and verify directly.

**Next:** M1 identity and tenancy (Better Auth, organizations, roles, policy module, audit events, cross-organization denial tests).
