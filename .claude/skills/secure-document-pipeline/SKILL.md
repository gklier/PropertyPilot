---
name: secure-document-pipeline
description: Use when building or auditing COI uploads, document extraction, vendor upload links and policy reviews.
---
# Secure Document Pipeline

1. Threat model upload and read paths, enforce org/property ownership.
2. Use private storage, signed short-lived links, file size/type checks and secure download.
3. Store extracted field/page/confidence evidence; require human review for uncertain claims.
4. Test malformed PDFs, duplicate submissions, expired links, cross-org ID attacks and request rate limiting.
5. Document data retention and never send real customer docs to unapproved providers.

Output: precise result, changed files, validation evidence, unresolved blockers, next recommended action. Read `CLAUDE.md` and avoid unapproved external operations.
