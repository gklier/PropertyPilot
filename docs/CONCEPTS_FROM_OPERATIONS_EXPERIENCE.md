# Clean-room commercial property operations concept brief

**Provenance:** High-level, commonplace operational features identified while reviewing the *structure* of a private internal project. This is a **fresh functional concept summary**, not extracted source code, internal specifications, configuration, real property data, copied SQL, proprietary workflows, or company branding. It is safe as an *idea list*, not a license to copy private implementation.

## General purpose

Property managers regularly coordinate locations, contractors, service incidents, insurance documents, agreements, reviews, and deadlines across a portfolio. A secure shared workspace can make these ordinary activities discoverable, trackable, and auditable.

## Domain model hypothesis (original design; validate before implementation)

1. `Organization`: customer account, tenancy and plan; full data isolation.
2. `Membership`: individual user, role, status and organization relationship.
3. `Portfolio`: optional grouping of buildings.
4. `Property`: display name, type, address or approximate location (demo fixtures must be fictional), service contacts and archive state.
5. `Vendor`: independent company profile, service categories and designated contacts.
6. `VendorPropertyAssignment`: which vendors support which locations and services.
7. `InsuranceRequirement`: requested limits, policy types, timing and manual acceptance rules.
8. `InsuranceDocument`: private file reference, uploader, version, extraction, verification and timestamps.
9. `InsuranceReview`: reviewer, field-level findings, status, explanations and review timestamps.
10. `Task`: owner, due date, type, associated property/vendor/document, notes and activity.
11. `NotificationOutbox`: scheduled reminder intent with idempotency, retries and delivery status.
12. `AuditEvent`: immutable record of sensitive mutations and access decisions (avoid leaking document contents).
13. Future `SiteInspection`, `InspectionObservation`, `ServiceRequest`, `Agreement`, `Approval` only when their module is approved.

## General workflows inspired by routine property operations

| Problem | Independent PropertyPilot approach | MVP order |
| --- | --- | --- |
| Tracking vendors across many buildings | Vendor directory, categories, property assignments | First |
| Storing COIs and following expirations | Private uploads, data extraction, review, 30/60/90-day queue | First |
| Checking coverage expectations | Configurable criteria with clearly human-reviewed decisions | First |
| Requesting updated documents | Limited-life vendor upload request, reminder queue, audit | First |
| Keeping service issues from slipping | Assigned tasks with due dates and evidence | First |
| Recording site walks | Checklist, issues, attachments and history | Second |
| Routing work requests | Tickets, ownership, status and vendor scheduling | Future |
| Reviewing contracts/quotes | Versioned agreements and approval actions | Future |
| Monitoring portfolio operations | Actionable risk and task dashboards | Gradually |

## What NOT to carry over

No internal product name, repository, screenshots, code fragments, prompts, forms, line-of-business correspondence, real service providers, customers, locations, insurance documents, finance records, logos, domain names, internal URLs, network configuration or historic issue discussions. All architectural choices and implementations are independently authored from scratch.

## Differentiation hypothesis to validate

Start with the specific vertical slice of **insurance document evidence + vendor follow-up**, integrated with where the vendor works. Display fields and source evidence for human review, not magical 'fully compliant' badges. Test with fictional demos, then seek buyer interviews and consent-based pilots. Existing COI software competitors mean differentiation and customer willingness to pay must be validated.
