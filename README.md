# PropertyPilot

Commercial property operations software. The first module, CertWatch, tracks vendor certificates of insurance with a person verifying what each document says.

**Status: foundation build (M0).** The app shell, design system, database connection and tests exist. There are no accounts, vendors or certificates yet. See `docs/PROGRESS.md`.

## Run it locally

Requirements: Node 22, pnpm 10, and either PostgreSQL 16 binaries or Docker.

```bash
pnpm install
```

Start a development database. Without Docker:

```bash
pnpm db:start
```

With Docker:

```bash
docker compose up -d db
```

Create `apps/web/.env.local` from `.env.example`, then apply migrations and start the app:

```bash
cp .env.example apps/web/.env.local
```

```bash
set -a; . apps/web/.env.local; set +a; pnpm db:migrate
```

```bash
pnpm dev
```

Open http://localhost:3000. The component reference is at `/design`.

## Checks

```bash
pnpm check
```

runs lint, typecheck, unit tests and a production build. Browser tests need the build and a running database:

```bash
pnpm e2e
```

## Layout

| Path | Contents |
| --- | --- |
| `apps/web` | Next.js app: UI, server code, migrations (`drizzle/`), browser tests (`e2e/`) |
| `services/extractor` | Python service that reads ACORD 25 certificates. Not wired to the app yet |
| `scripts/dev-db.sh` | Local PostgreSQL without Docker |
| `docs/` | Product, architecture, decisions, roadmap, progress, design and quality gates |
| `.claude/` | Agents and skills used to build the project |

## Rules that matter

- Nothing read from a document by software is shown as verified. A person confirms it first.
- No real email is sent and no paid service is connected without the owner's approval.
- All sample data is fictional. No secrets in git.
