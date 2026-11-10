# Skills + agents research for PropertyPilot (checked 2026-11-09)

## What is already in this starter pack

- 12 original specialist agents in `.claude/agents/*.md`.
- 8 original custom process skills in `.claude/skills/*/SKILL.md`.
- No third-party code or external installers are included. External recommendations below must be reviewed and installed in the **new independent project** only.

Claude Code reads project skills from `.claude/skills/<name>/SKILL.md` and project subagents from `.claude/agents/<name>.md`. Both are project-scoped, portable across machines with GitHub and cloud sessions. Read: https://code.claude.com/docs/en/skills and https://code.claude.com/docs/en/sub-agents

## Curated upstream skills and tools

**Tier 1: strongly recommended once compatible and approved**

| Source / skill | Role | Review/install path |
| --- | --- | --- |
| Anthropic **frontend-design** | Distinctive, production-grade UI aesthetic and layout direction | https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design — use Claude's plugin discovery; installation may depend on the active marketplace |
| **Impeccable** (`pbakaus/impeccable`) | Strong visual critique, polish, hierarchy, typography, anti-slop tests | https://impeccable.style/docs/ — `npx skills add pbakaus/impeccable` after review; do not transplant a vendored copy from an internal repo |
| **UI UX Pro Max** (`nextlevelbuilder/ui-ux-pro-max-skill`) | Searchable design systems, liquid glass/other style catalog, UX and typography selection | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill — `npx ui-ux-pro-max-cli init --ai claude` after reviewing package and cloud requirements |
| Vercel **react-best-practices** | Performance and correctness patterns for React/Next.js | `npx skills add vercel-labs/agent-skills --skill react-best-practices -a claude-code` |
| Vercel **web-design-guidelines** | Accessibility, forms, responsiveness, semantics, UI review | `npx skills add vercel-labs/agent-skills --skill web-design-guidelines -a claude-code` |
| Anthropic **webapp-testing** | Browser inspection/test approach via Playwright | `npx skills add anthropics/skills --skill webapp-testing -a claude-code` |

**Tier 2: selectively useful**

| Tool / skill | When useful | Source |
| --- | --- | --- |
| Vercel **composition-patterns** | As component architecture grows | https://github.com/vercel-labs/agent-skills |
| Vercel **react-view-transitions** | Polished but accessible route/item transitions | https://github.com/vercel-labs/agent-skills |
| Jesse Vincent's **Superpowers** (`obra/superpowers`) | Structured planning, TDD, root cause debugging, worktrees and systematic reviews; can become too ceremony-heavy for tiny UI tasks | https://github.com/obra/superpowers |
| Built-in Claude `/code-review`, `/verify`, `/doctor`, `/run` | Use where available to audit and verify without installing extras | https://code.claude.com/docs/en/skills |
| **Playwright MCP** (Microsoft) | Browser-driven QA, accessibility-tree based inspection | https://github.com/microsoft/playwright-mcp — in compatible Claude CLI: `claude mcp add playwright npx @playwright/mcp@latest` (review permissions/Cloud support first) |
| **Chrome DevTools MCP** (Google) | Network, layout, console, screenshots and performance traces | https://github.com/ChromeDevTools/chrome-devtools-mcp — configure per official docs after checking Cloud browser availability and data exposure |
| Vercel **deploy-to-vercel** | Preview deployment ONLY after user approves and account linked | https://github.com/vercel-labs/agent-skills |
| Anthropic's **skill-creator** / skill evaluation guidance | Improve quality and triggering of new custom skills | https://code.claude.com/docs/en/skills |

Sources: https://github.com/vercel-labs/agent-skills ; https://github.com/anthropics/skills ; https://github.com/anthropics/claude-code ; https://github.com/nextlevelbuilder/ui-ux-pro-max-skill ; https://github.com/obra/superpowers ; https://github.com/microsoft/playwright-mcp ; https://github.com/ChromeDevTools/chrome-devtools-mcp .

## Recommended install order (do not blindly bulk install)

1. Use **the bundled 12 agents + 8 skills immediately**, since they are plain Markdown.
2. Add **Impeccable** and **Anthropic frontend-design** for visual direction, after verifying install paths/marketplace availability.
3. Add Vercel **react-best-practices** and **web-design-guidelines**.
4. Add **UI UX Pro Max** for structured design token research, but avoid obeying conflicting style systems at once. Choose one master design system (`docs/LIQUID_GLASS_DESIGN.md`).
5. Configure **Playwright** for real end-to-end tests. Choose either MCP or regular Playwright Test first, based on cloud capability.
6. Add Chrome DevTools MCP only if the environment supports Chrome and the extra tool overhead is justified.
7. Bring in Superpowers selectively for longer refactor/architecture tasks. Its mandated process can slow down short tasks.

Use `npx skills add ... --list` and review package scripts, repo maintenance, licenses and permissions before installation. `npx skills` is an installer and can execute third-party code. Only run it with explicit permission. Prefer pinned releases/commits for stable workflows. Installation commands are source-provided at time of research and may change.

## Orchestrator guidance

Claude should own the final integration, not blindly trust agent output. Assign one concrete output per agent:

1. product strategist: narrow product and success criteria.
2. information architect: navigation and data relationships.
3. visual director: coherent art direction and visual hierarchy.
4. liquid glass designer: implementation rules for restrained translucent material.
5. frontend engineer: TypeScript components, responsive interactions, forms.
6. backend architect: endpoints, domain logic, permissions, jobs.
7. database architect: schema, migrations, queries and isolation tests.
8. security reviewer: threat model, auth/RBAC, secrets, uploads.
9. browser QA engineer: Playwright/test evidence and screenshots.
10. accessibility auditor: keyboard, screen reader semantics, contrast.
11. performance engineer: bundle/paint/navigation and backend latency.
12. documentation and release lead: progress, ADRs, environment, rollout gates.

Do **not** spawn all twelve by default. For the first CertWatch slice, use product, UX/design, frontend, backend+DB, security, QA; bring the rest in for review only as appropriate. Parallelize only if tasks do not edit the same files; stage PRs with explicit dependency order.

## Claude Code cloud caveat

Project-scoped Markdown agents/skills committed to GitHub travel with the repo across cloud sessions; runtime tools, browser integration and external plugin installations may vary by Claude cloud environment and Team policy. Verify available binaries and permissions rather than claiming everything is installed. Official cloud overview: https://code.claude.com/docs/en/claude-code-on-the-web
