# Data Preservation and Storage Requirements (DAT-08)

## Overview

This module defines requirements for decentralized data storage, privacy-preserving encryption, compliance with data protection regulations, and verifiable data integrity. By leveraging Walrus for heavy asset storage and implementing encryption mechanisms, the platform reduces on-chain costs while ensuring data permanence, privacy, and auditability.

---

## Organizer Features

### 8.1.1. Feature: Decentralized Media Storage (DAT-08.1.1)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 8.1.1. Feature: Decentralized Media Storage (DAT-08.1.1) | User Story: As a system architect, I want to store heavy media assets (images, PDFs) on decentralized storage (Walrus), so that I can reduce on-chain gas costs while ensuring data permanence.<br><br>Acceptance Criteria:<br>- SDK Integration: Walrus SDK (Sui Client) is integrated into the backend service<br>- Upload Logic: System accepts file uploads, posts to Walrus publisher node, and receives `blob_id`<br>- On-Chain Linking: `blob_id` and `blob_hash` are stored in Event or Ticket Move objects<br>- Display: Event posters load correctly from Walrus `blob_id` on dashboard<br><br>Deliverables:<br>- Walrus SDK integration in backend service<br>- File upload API with Walrus publisher integration<br>- Smart contract fields for `blob_id` and `blob_hash` storage<br>- Content retrieval from Walrus via standard gateway<br>- Event poster display component using Walrus blobs<br><br>Deferred to v2: Gateway aggregator optimization, image compression pipeline | Not Started |

---

## Attendee/User Features

### 8.2.1. Feature: Seal Encryption for Ticket Metadata (DAT-08.2.1)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 8.2.1. Feature: Seal Encryption for Ticket Metadata (DAT-08.2.1) | User Story: As a system architect, I want to encrypt sensitive ticket metadata (event location, QR code seed, access credentials) using Sui Seal before storing on Walrus, so that only the rightful ticket NFT owner can decrypt and access their ticket details.<br><br>Acceptance Criteria:<br>- Seal SDK Integration: Sui Seal SDK is integrated into the ticket minting service<br>- Encryption Workflow: When a ticket is minted, sensitive metadata is encrypted using Seal before upload to Walrus<br>- Encrypted Fields: Event venue address, access link, QR code generation seed, and entry instructions are Seal-encrypted<br>- Walrus Storage: Encrypted ticket blob is stored on Walrus, `blob_id` is stored in Ticket NFT object<br>- Owner-Only Decryption: Seal policy ensures only the current Ticket NFT owner can decrypt the blob<br>- Key Derivation: Encryption keys are derived from Ticket NFT object ID and owner address<br>- Transfer Support: When ticket is transferred, new owner can decrypt; previous owner loses access<br>- Integration: Works with dynamic QR generation (AM-3.4.2) and ticket redemption (AM-3.1.1)<br><br>Deliverables:<br>- Sui Seal SDK integration<br>- Ticket metadata encryption service<br>- Seal policy configuration for owner-based decryption<br>- Encrypted blob upload to Walrus pipeline<br>- Ticket NFT minting with encrypted `blob_id` linking<br>- Decryption client library for ticket holders<br>- Security documentation for Seal implementation | Not Started |

---

### 8.3.1. Feature: Optional Contact Email Encryption (DAT-08.3.1)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 8.3.1. Feature: Optional Contact Email Encryption (DAT-08.3.1) | User Story: As a user who opts in to email notifications, I want my email address to be stored encrypted, so that my contact information is protected.<br><br>Acceptance Criteria:<br>- Encryption Standard: Email addresses are encrypted using AES-256-GCM before storage<br>- Optional Field: Email collection is opt-in for users who want email notifications<br>- Encrypted Storage: Only encrypted email is stored in database<br>- Decryption: System can decrypt email when sending notifications<br><br>Deliverables:<br>- Email encryption/decryption utility<br>- Encrypted email field in database schema<br>- Email opt-in flow in user settings<br><br>Deferred to v2: Full PII encryption infrastructure, key management service, audit logging, privacy-masked UI | Not Started |

---

### 8.4.1. Feature: User Data Deletion (DAT-08.4.1)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 8.4.1. Feature: User Data Deletion (DAT-08.4.1) | User Story: As a user, I want to be able to delete my off-chain data, so that I can remove my information from the platform when needed.<br><br>Acceptance Criteria:<br>- Deletion Logic: User can delete their optional email and profile data from database<br>- Walrus Blobs: User-uploaded content blobs can be marked for deletion<br>- On-Chain Data: On-chain records (tickets, attendance) remain immutable as designed<br>- Confirmation: User receives confirmation that data deletion was successful<br><br>Deliverables:<br>- Account data deletion API endpoint<br>- User data deletion UI in profile settings<br>- Deletion confirmation flow<br>- Basic deletion test cases<br><br>Deferred to v2: Full GDPR/CCPA compliance certification, cryptographic deletion proofs, legal documentation | Not Started |

---

## Platform-Wide Features

### 8.5.1. Feature: Decentralized Frontend Hosting (DAT-08.5.1)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 8.5.1. Feature: Decentralized Frontend Hosting (DAT-08.5.1) | User Story: As a user, I want to access the ticketing application via Walrus Sites, so that the platform has decentralized hosting.<br><br>Acceptance Criteria:<br>- Build Process: Frontend build pipeline outputs static Single Page Application (SPA)<br>- Upload: `index.html`, JS, and CSS assets are uploaded to Walrus Sites<br>- Accessibility: Working URL (e.g., `https://<site-id>.walrus.site`) loads full application<br>- Routing: Basic client-side routing works correctly<br><br>Deliverables:<br>- Static SPA build configuration<br>- Manual Walrus Sites upload script/process<br>- Deployment documentation<br><br>Deferred to v2: SuiNS DNS mapping, automated CI/CD pipeline | Not Started |

---

### 8.6.1. Feature: Per-Event Walrus Sites Infrastructure (DAT-08.6.1)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 8.6.1. Feature: Per-Event Walrus Sites Infrastructure (DAT-08.6.1) | User Story: As an event organizer, I want to deploy a dedicated Walrus Site for my event to host event-specific content (agenda, speakers, media, announcements), so that attendees have decentralized access to event materials.<br><br>Acceptance Criteria:<br>- Site Deployment: Each event can deploy its own Walrus Site for event-specific content<br>- Content Upload: Organizers can upload static site assets (HTML, CSS, JS) and media files to Walrus<br>- Blob Management: System tracks all `blob_id`s associated with an event site<br>- Site Linking: Event smart contract stores the primary site `blob_id` or Walrus Sites URL<br>- Content Updates: Organizers can re-upload updated content and update the site reference<br>- Persistent Storage: Event sites remain on Walrus for archival/historical access<br>- Integration: Content encryption and access control handled by Seal (see AM-3.3.2 and AM-3.4.3)<br><br>Deliverables:<br>- Walrus Sites deployment script/tool for event organizers<br>- Event site content upload API<br>- Blob reference management in Event smart contract<br>- Content update and versioning workflow<br>- Site URL/blob_id retrieval for frontends<br>- Post-event archival documentation<br><br>Note: Access control and content gating logic are defined in AM-3.3.2 (Pre-Event Access) and AM-3.4.3 (Post-Redemption Content). This feature focuses solely on the storage infrastructure. | Not Started |

---

### 8.7.1. Feature: Permanent Event Data Archival (DAT-08.7.1)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 8.7.1. Feature: Permanent Event Data Archival (DAT-08.7.1) | User Story: As an event organizer, I want event data to remain permanently archived on Walrus after the event concludes, so that historical event information is always accessible, immutable, and cannot be lost.<br><br>Acceptance Criteria:<br>- Event metadata and content remain on Walrus after event ends<br>- Event data is immutable and permanently hosted<br>- Event can still be discovered and accessed after conclusion<br>- Organizer can retrieve event analytics at any time<br>- Walrus ensures data redundancy and availability<br>- Archival status is reflected in event smart contract state<br><br>Deliverables:<br>- Walrus storage lifecycle management for event archival<br>- Event archival procedures and automation<br>- Immutable data references in smart contracts<br>- Historical event discovery mechanism<br>- Archival metadata indexing for search<br><br>Cross-Reference: Integrates with EMS-07 (Event Management) for event lifecycle, AR-06 (Analytics) for historical reporting. | Not Started |

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
