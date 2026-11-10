# PROPERTY PILOT · Fable 5.2 Master Build Brief

**Use this as the FIRST prompt in Claude Code Cloud, in a NEW, PRIVATE, independently owned project repository.**

**Scope:** Build PropertyPilot, a serious commercial-property-operations SaaS. Make the user experience unusually polished, inspired by Apple-like restrained Liquid Glass materials and the clarity of Linear. Start with one sellable module: CertWatch. This is a working engineering assignment, not a landing-page-only mockup.

## 0. Nonnegotiable information boundary

I have previously worked on an internal service and property operations application. The concept mapping in `docs/CONCEPTS_FROM_OPERATIONS_EXPERIENCE.md` is a clean-room, generalized functional brief, not a code reference.

- Do NOT clone, access, ingest, search, reproduce, or derive from any internal employer repository, company materials, real agreements, COIs, tenants, vendors, customers, employee records, addresses, hostnames, or business data.
- Do NOT reverse-engineer internal confidential workflows or import design assets. Independently implement common industry workflows from general knowledge and public documentation.
- Use **synthetic** organization, properties, people, insurance policies, agreements, and documents throughout development and tests.
- Do NOT identify or reference the prior employer, proprietary product names, or original repository in generated code, screenshots, commit messages, demos, README, or marketing.
- Stop and request authorization if any task would require employer materials or protected code.
- Maintain this project as a clean independent work, with its own private Git history, package names, product identity, and original source.

## 1. Your mandate

You are my **lead principal engineer and design director**. Use available custom subagents judiciously, not for theater. Coordinate product, design, React, backend, database, security, performance, accessibility, and browser QA. Work in independently testable vertical slices; parallelize only cleanly isolated tasks. Your goal is reliable running software with a professional design, not a massive pile of code.

At the start, inspect the existing independent repo and the project `.claude/` directory. Read `CLAUDE.md`, `docs/CONCEPTS_FROM_OPERATIONS_EXPERIENCE.md`, `docs/LIQUID_GLASS_DESIGN.md`, `docs/QUALITY_GATES.md`, and `docs/SKILLS_AND_AGENTS.md`.

## 2. Product: what PropertyPilot actually does

**Target customer:** independent commercial property managers and small/mid-sized operating companies underserved by overly broad enterprise platforms. The user works with buildings, vendors, service requests, insurance documents, operational approvals, and recurring inspections.

**Product architecture:** organizations own portfolios; portfolios contain properties; vendors service one or more properties; authorized users manage vendor documents, service tasks, and operational activity. Every mutation is properly authenticated, authorized and audited.

### MVP 1: CertWatch (actually ship this first)

Build a real end-to-end workflow:
1. Create organization and invite manager (can stub email sending until approved).
2. Create property and vendor; connect vendor to one or multiple properties.
3. Upload a certificate-of-insurance PDF into access-controlled storage.
4. Extract its carrier, named insured, policy types, policy numbers, effective and expiration dates, and stated limits. Preserve source/page references, raw extracted evidence, parsing confidence and review status. If no approved OCR/extraction provider is configured, use a clearly labeled mock/extraction adapter in development and prevent fake production assertions.
5. Define property- or organization-level coverage requirements.
6. Evaluate only objective extractable rules; show an **unverified / manual review** status when interpretation is uncertain. Never state legal or insurance compliance is guaranteed.
7. Show upcoming expiration (30/60/90 days), assigned reviewer, review history and vendor follow-up queue.
8. Create a safe, time-limited, vendor document-submission link with authorization, rate limits and audit logging.
9. Implement reminder previews and a reliable job/outbox. Actual emails are disabled by default until approved.
10. Search, filter, sort, paginate, export permissible summary data, and demonstrate a fully functioning dashboard.

**One hero demo flow:** An operator opens a portfolio dashboard, filters vendors by expiring coverage, opens a specific vendor, inspects a certificate with field-to-source evidence, requests a corrected document, then sees the event in an audit timeline. Make it feel excellent from first click to last.

### MVP 2: SiteOps (only after CertWatch is working)

- Structured site walks: templates, checklists, mobile-first inspections, photos, severity/priority, follow-up tasks.
- Per-property timeline; assigned vendors; work-request linkage and PDF reports generated from synthetic data.
- Offline-capable drafts are nice-to-have, not required for first milestone.

### Architecture only: future additions

- ServiceOps: maintenance requests, vendors, bids/quotes, contractor scheduling, approvals, and history.
- LeaseIQ: critical-date abstractions and CAM-rule support with verified sources and human review.
- Do not build these entire modules until the first slice passes all quality gates.

## 3. Design: premium Liquid Glass for the web

Our design should be **inspired by** Apple's restrained Liquid Glass, but it is a normal web app, **not** a claim of native Apple materials.

Visual direction: editorial precision + soft depth + subtle translucency. Light and dark themes. Cool neutral canvas, slate/graphite typography, one restrained accent, rich content hierarchy, beautiful data density, spatial transitions, and a floating glass navigation layer.

- Reserve `backdrop-filter`, translucent borders, environmental highlights, and reflections primarily for floating header/sidebar/docked controls, quick actions, dialogs and overlays. Do **not** make every table/card frosted.
- Use mostly opaque surfaces behind data grids, documents and dense enterprise content to preserve readability.
- Glass effect should degrade gracefully in unsupported browsers, high-contrast mode, `prefers-reduced-transparency` where supported, and `prefers-reduced-motion`.
- Build tokens and components before creating multiple pages: surface, glass, text, accent, stroke, shadow, radius, blur, easing, spacing, density, typography, z-layers.
- Avoid the obvious AI-template look: generic glowing blobs, huge hero gradients, meaningless charts, stock-photo filler, 20 card containers, oversized radii, fake metrics, fake notifications, inconsistent shadows.
- Screens must look intentional at 320, 375, 768, 1024, and 1440px widths. Accessible keyboard navigation and focus states are mandatory.
- Always use a real running-browser screenshot iteration loop, where available. Compare design quality and interactions across two passes at minimum. Never label screenshots as validated if a browser could not be run.

Design references and decision rules live in `docs/LIQUID_GLASS_DESIGN.md`.

## 4. Technology: propose once, then execute

Default recommendation: TypeScript, modern supported Next.js/React, Tailwind CSS, shadcn/ui or Radix primitives, PostgreSQL, type-safe query layer, secure auth suited to multi-tenant SaaS, protected object storage, background jobs/outbox, Vitest + Playwright, and GitHub Actions. Adapt based on the actual environment and explain choices, trade-offs and costs.

- Enforce organization membership and property-level authorization at the database/application boundary. The UI is not a security boundary.
- Use database migrations and seed scripts with **fictional data only**.
- Keep credentials out of git. Use `.env.example` placeholders, never real tokens.
- Keep uploads private, restrict MIME/type/size, and do not expose user documents in static directories.
- Consider retention, deletion, auditing, rate limiting, tenant isolation, server-side validation, and observability from day 1.
- Avoid paid APIs, unapproved deployment, live email sending, and production storage until I approve.
- Use accessible, robust UI components rather than inventing every basic input.

## 5. Skills and agents to use

Check the local agent/skill pack that ships with this prompt. Run the appropriate skills and agents for each phase. See `docs/SKILLS_AND_AGENTS.md` for researched upstream options and **safe installation advice**. Do not automatically execute third-party install scripts, give them secrets, or install every available plugin. First assess tool compatibility with the Claude Code cloud environment; ask for approval before external installs.

Core roles should include:
- product strategist; information architect; design director; Liquid Glass UI specialist; frontend implementer;
- database/backend architect; security reviewer; browser QA engineer; accessibility auditor; performance auditor; release/documentation custodian.

Use senior-engineering judgment: delegate only discrete work with clear deliverables. The lead reviews and integrates all agent output. Keep source and tests in Git branches/PRs.

## 6. Process and mandatory acceptance criteria

### Phase A: inspect, plan, and bootstrap
1. Verify the repo is private and separate from any confidential prior codebase.
2. Inspect existing files, tools, Node version, packages, available browsers and test infrastructure.
3. Write `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`, `docs/ROADMAP.md`, `docs/PROGRESS.md`.
4. Produce an implementation plan with milestones, risks, dependencies, low-cost hosting assumptions, estimated operating costs and explicit alternatives.
5. Set up architecture, CI, auth skeleton and a fully coherent design system with a **real navigable prototype**.

### Phase B: working CertWatch
1. Deliver the golden-path vendor + property + COI workflow with database persistence.
2. Integrate extraction behind a testable adapter, review queue, policy-rule checks, and expiration calculations.
3. Implement safe document upload links, task/reminder previews, activity timeline, and role-based permissions.
4. Run authenticated cross-tenant tests, negative tests, browser tests, and responsive screenshot passes.

### Phase C: polish and optional SiteOps
1. Fix all P0/P1 issues and accessibility blockers.
2. Improve perceived speed, empty/error/loading states, useful keyboard shortcuts, document views, and mobile layout.
3. Only if CertWatch gates pass, begin SiteOps with a real inspection flow.
4. Create a **private** preview and onboarding walkthrough after approval. No public launch until security review.

**Definition of done per slice:** runnable application, committed code, tests passing, authenticated authorization checks, responsive browser QA, no mock state disguised as real state, PR review, docs updated, no unapproved spending or deployment.

## 7. Fable's FIRST response and actions

Do not just explain what you could build. Start working in this independent repo:

1. Read the documents, inspect the repo and report current state, with anything missing.
2. Propose the **narrowest complete CertWatch vertical slice** and the specific stack you recommend.
3. Produce a compact implementation order with milestone acceptance tests and agent assignments.
4. Ask once for approval of any paid service, GitHub repo creation, destructive operation or deployment. If no such approval is needed, implement the bootstrap and first approved slice now.
5. At each milestone: run tests/build, show what was verified, show blockers, commit to a feature branch, and keep `docs/PROGRESS.md` updated.

Your goal is a polished, robust, maintainable product. Be ambitious with design quality, conservative with confidential information and infrastructure cost, and ruthless about verifying that features actually work.
