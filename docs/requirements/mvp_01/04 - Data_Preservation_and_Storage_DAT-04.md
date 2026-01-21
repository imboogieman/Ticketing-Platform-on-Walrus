# Data Preservation and Storage Requirements (DAT-08)

## Overview

This module defines requirements for decentralized data storage, privacy-preserving encryption, compliance with data protection regulations, and verifiable data integrity. By leveraging Walrus for heavy asset storage and implementing encryption mechanisms, the platform reduces on-chain costs while ensuring data permanence, privacy, and auditability.

---

## Organizer Features

### DAT-08.1 Decentralized Media Storage

**User Story:** As a system architect, I want to store heavy media assets (images, PDFs) on decentralized storage (Walrus), so that I can reduce on-chain gas costs while ensuring data permanence.

**Acceptance Criteria:**

- SDK Integration: Walrus SDK (Sui Client) is integrated into the backend service
- Upload Logic: System accepts file uploads, posts to Walrus publisher node, and receives `blob_id`
- On-Chain Linking: `blob_id` and `blob_hash` are stored in Event or Ticket Move objects
- Display: Event posters load correctly from Walrus `blob_id` on dashboard

**Deliverables:**

- Walrus SDK integration in backend service
- File upload API with Walrus publisher integration
- Smart contract fields for `blob_id` and `blob_hash` storage
- Content retrieval from Walrus via standard gateway
- Event poster display component using Walrus blobs

**Deferred to v2:** Gateway aggregator optimization, image compression pipeline

---

## Attendee/User Features

### DAT-08.2 Seal Encryption for Ticket Metadata

**User Story:** As a system architect, I want to encrypt sensitive ticket metadata (event location, QR code seed, access credentials) using Sui Seal before storing on Walrus, so that only the rightful ticket NFT owner can decrypt and access their ticket details.

**Acceptance Criteria:**

- Seal SDK Integration: Sui Seal SDK is integrated into the ticket minting service
- Encryption Workflow: When a ticket is minted, sensitive metadata is encrypted using Seal before upload to Walrus
- Encrypted Fields: Event venue address, access link, QR code generation seed, and entry instructions are Seal-encrypted
- Walrus Storage: Encrypted ticket blob is stored on Walrus, `blob_id` is stored in Ticket NFT object
- Owner-Only Decryption: Seal policy ensures only the current Ticket NFT owner can decrypt the blob
- Key Derivation: Encryption keys are derived from Ticket NFT object ID and owner address
- Transfer Support: When ticket is transferred, new owner can decrypt; previous owner loses access
- Integration: Works with dynamic QR generation (AM-3.4.2) and ticket redemption (AM-3.1.1)

**Deliverables:**

- Sui Seal SDK integration
- Ticket metadata encryption service
- Seal policy configuration for owner-based decryption
- Encrypted blob upload to Walrus pipeline
- Ticket NFT minting with encrypted `blob_id` linking
- Decryption client library for ticket holders
- Security documentation for Seal implementation

---

### DAT-08.3 Optional Contact Email Encryption

**User Story:** As a user who opts in to email notifications, I want my email address to be stored encrypted, so that my contact information is protected.

**Acceptance Criteria:**

- Encryption Standard: Email addresses are encrypted using AES-256-GCM before storage
- Optional Field: Email collection is opt-in for users who want email notifications
- Encrypted Storage: Only encrypted email is stored in database
- Decryption: System can decrypt email when sending notifications

**Deliverables:**

- Email encryption/decryption utility
- Encrypted email field in database schema
- Email opt-in flow in user settings

**Deferred to v2:** Full PII encryption infrastructure, key management service, audit logging, privacy-masked UI

---

### DAT-08.4 User Data Deletion

**User Story:** As a user, I want to be able to delete my off-chain data, so that I can remove my information from the platform when needed.

**Acceptance Criteria:**

- Deletion Logic: User can delete their optional email and profile data from database
- Walrus Blobs: User-uploaded content blobs can be marked for deletion
- On-Chain Data: On-chain records (tickets, attendance) remain immutable as designed
- Confirmation: User receives confirmation that data deletion was successful

**Deliverables:**

- Account data deletion API endpoint
- User data deletion UI in profile settings
- Deletion confirmation flow
- Basic deletion test cases

**Deferred to v2:** Full GDPR/CCPA compliance certification, cryptographic deletion proofs, legal documentation

---

## Platform-Wide Features

### DAT-08.5 Decentralized Frontend Hosting

**User Story:** As a user, I want to access the ticketing application via Walrus Sites, so that the platform has decentralized hosting.

**Acceptance Criteria:**

- Build Process: Frontend build pipeline outputs static Single Page Application (SPA)
- Upload: `index.html`, JS, and CSS assets are uploaded to Walrus Sites
- Accessibility: Working URL (e.g., `https://<site-id>.walrus.site`) loads full application
- Routing: Basic client-side routing works correctly

**Deliverables:**

- Static SPA build configuration
- Manual Walrus Sites upload script/process
- Deployment documentation

**Deferred to v2:** SuiNS DNS mapping, automated CI/CD pipeline

---

### DAT-08.6 Per-Event Walrus Sites Infrastructure

**User Story:** As an event organizer, I want to deploy a dedicated Walrus Site for my event to host event-specific content (agenda, speakers, media, announcements), so that attendees have decentralized access to event materials.

**Acceptance Criteria:**

- Site Deployment: Each event can deploy its own Walrus Site for event-specific content
- Content Upload: Organizers can upload static site assets (HTML, CSS, JS) and media files to Walrus
- Blob Management: System tracks all `blob_id`s associated with an event site
- Site Linking: Event smart contract stores the primary site `blob_id` or Walrus Sites URL
- Content Updates: Organizers can re-upload updated content and update the site reference
- Persistent Storage: Event sites remain on Walrus for archival/historical access
- Integration: Content encryption and access control handled by Seal (see AM-3.3.2 and AM-3.4.3)

**Deliverables:**

- Walrus Sites deployment script/tool for event organizers
- Event site content upload API
- Blob reference management in Event smart contract
- Content update and versioning workflow
- Site URL/blob_id retrieval for frontends
- Post-event archival documentation

**Note:** Access control and content gating logic are defined in AM-3.3.2 (Pre-Event Access) and AM-3.4.3 (Post-Redemption Content). This feature focuses solely on the storage infrastructure.

---

### DAT-08.7 Permanent Event Data Archival

**User Story:** As an event organizer, I want event data to remain permanently archived on Walrus after the event concludes, so that historical event information is always accessible, immutable, and cannot be lost.

**Acceptance Criteria:**

- Event metadata and content remain on Walrus after event ends
- Event data is immutable and permanently hosted
- Event can still be discovered and accessed after conclusion
- Organizer can retrieve event analytics at any time
- Walrus ensures data redundancy and availability
- Archival status is reflected in event smart contract state

**Deliverables:**

- Walrus storage lifecycle management for event archival
- Event archival procedures and automation
- Immutable data references in smart contracts
- Historical event discovery mechanism
- Archival metadata indexing for search

**Cross-Reference:** Integrates with EMS-07 (Event Management) for event lifecycle, AR-06 (Analytics) for historical reporting.

---

## Summary of Data Preservation and Storage

| Feature | ID | Status | Priority |
|---------|----|----|----------|
| Decentralized Media Storage | DAT-08.1 | Not Started | MVP Core |
| Seal Encryption for Ticket Metadata | DAT-08.2 | Not Started | MVP Core |
| Optional Contact Email Encryption | DAT-08.3 | Not Started | MVP Optional |
| User Data Deletion | DAT-08.4 | Not Started | MVP Core |
| Decentralized Frontend Hosting | DAT-08.5 | Not Started | MVP Core |
| Per-Event Walrus Sites Infrastructure | DAT-08.6 | Not Started | MVP Core |
| Permanent Event Data Archival | DAT-08.7 | Not Started | MVP Core |
