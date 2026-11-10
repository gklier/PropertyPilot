# Architecture

Modular monolith in a pnpm monorepo, TypeScript throughout.

| Concern | Choice | Reason |
| --- | --- | --- |
| App | Next.js (App Router), React | one codebase for UI and server |
| UI | Tailwind, CSS-variable tokens, Radix/shadcn primitives, TanStack Table | accessible primitives; tokens per `docs/LIQUID_GLASS_DESIGN.md` |
| Database | PostgreSQL 16, Drizzle ORM, versioned migrations | typed, cheap to host |
| Tenancy | `org_id` on every table, Postgres row-level security as backstop, one server-side policy module | the UI is not a security boundary |
| Auth | Better Auth, self-hosted in the app database | no per-user fees; organizations and roles |
| Vendor access | signed, expiring, single-purpose upload tokens with rate limits | no vendor login |
| Storage | S3-compatible; local filesystem in dev; private buckets, short-lived signed URLs, per-org prefixes | no public document URLs |
| Uploads | PDF magic-byte, MIME and size checks, SHA-256, random keys | safe parsing |
| Extraction | adapter interface. Dev: clearly labeled mock adapter. Text-layer parser for ACORD 25. Optional LLM adapter using the organization's own API key, off by default | no paid service by default |
| Jobs | pg-boss (Postgres-backed) plus a notification outbox with idempotency keys | no Redis |
| Email | provider interface writing to a dev outbox | no real sends without approval |
| Tests | Vitest, Playwright, cross-tenant negative tests | quality gates |
| CI | GitHub Actions with a Postgres service | free at this scale |
| Secrets | `.env.example` placeholders, env schema validated at boot | nothing real in git |

Domain model follows `docs/CONCEPTS_FROM_OPERATIONS_EXPERIENCE.md`. Future modules (SiteOps, ServiceOps, LeaseIQ) get schema namespaces and route groups only when approved.

**Cost target:** about $0-25/month early on (small app host, free-tier Postgres, object storage free tier). No service is connected yet.
