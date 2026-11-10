# Product

**Customer:** independent commercial property managers and small/mid-sized operating companies (roughly 5-100 properties) underserved by broad enterprise platforms.

**Wedge: CertWatch.** Insurance document evidence plus vendor follow-up, tied to where the vendor works. Fields are shown with source evidence for human review; the product never asserts that coverage is compliant on the strength of extraction alone.

## CertWatch v1 scope
1. Organization, members, roles (email invites stubbed to an outbox).
2. Properties (optional portfolios), vendors, contacts, vendor-property assignments.
3. Private COI PDF upload by staff or via a time-limited vendor link.
4. Extraction behind an adapter: carrier, named insured, policy types and numbers, effective/expiration dates, limits, with page/source reference, raw evidence, confidence and review status.
5. Coverage requirements at organization or property level.
6. Objective rule evaluation only; anything uncertain shows "unverified / manual review".
7. Expiration queue (30/60/90 days), assigned reviewer, review history, follow-up tasks.
8. Reminder previews and a job/outbox; real email off by default.
9. Search, filter, sort, paginate, export of summary data; working dashboard.
10. Audit timeline for sensitive mutations.

**Hero demo:** dashboard, filter vendors by expiring coverage, open vendor, inspect certificate with field-to-source evidence, request a corrected document, see the event in the audit timeline.

## Out of scope for v1
Billing, real email delivery, integrations, SiteOps, ServiceOps, LeaseIQ, analytics.

## Unvalidated assumptions
Competitor pricing is mostly quote-based and was not confirmed. Willingness to pay and differentiation need buyer interviews.
