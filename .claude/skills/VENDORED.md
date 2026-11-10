# Vendored third-party skills

Copied unmodified from upstream at pinned commits on 2026-11-10. To upgrade, copy again from a newer reviewed commit and update this file.

| Path | Upstream | Commit | License |
| --- | --- | --- | --- |
| `.claude/skills/impeccable/` and `.claude/agents/impeccable-*.md` | https://github.com/pbakaus/impeccable (`plugin/`) | `b856e5010f2dd86bd97f9b2d5e38e33f3d5bd992` | Apache-2.0 (LICENSE and NOTICE.md included) |
| `.claude/skills/vercel-react-best-practices/` | https://github.com/vercel-labs/agent-skills (`skills/react-best-practices`) | `1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62` | MIT per the skill's frontmatter (upstream ships no LICENSE file) |

Notes
- Impeccable's edit/stop **hooks are not installed**. Its launcher script downloads a checksum-verified engine binary on first use; nothing is downloaded until the skill is run.
- Impeccable telemetry is disabled in `.impeccable/config.json`. The skill may still fetch a catalog of visual directions from impeccable.style when a new design starts.
- `docs/LIQUID_GLASS_DESIGN.md` is the master design system. Where a vendored skill disagrees, the design doc wins.
