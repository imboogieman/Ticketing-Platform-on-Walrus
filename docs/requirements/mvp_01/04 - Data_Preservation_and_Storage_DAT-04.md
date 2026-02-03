# Data Preservation and Storage Requirements (DAT-08)

## Overview

This module defines requirements for decentralized data storage, privacy-preserving encryption, compliance with data protection regulations, and verifiable data integrity. By leveraging Walrus for heavy asset storage, the platform reduces on-chain costs while ensuring data permanence, privacy, and auditability.

---

## Organizer Features

### 8.1. Feature: Decentralized Media Storage (DAT-08.1)

| User Story Title | User Story Body | Estimate |
| --- | --- | --- |
| 8.1. Feature: Decentralized Media Storage (DAT-08.1) | User Story: As a system architect, I want to store heavy media assets (images, PDFs) on decentralized storage (Walrus), so that I can reduce on-chain gas costs while ensuring data permanence.<br><br>**Actions:**<br>- SDK Integration: Integrate Walrus SDK (Sui Client) into the backend service<br>- Upload Logic: System accepts file uploads, posts to Walrus publisher node, and receives `blob_id`<br>- On-Chain Linking: Store `blob_id` and `blob_hash` in Event or Ticket Move objects<br>- Display: Event posters load correctly from Walrus `blob_id` on dashboard<br><br>**Deliverables:**<br>- Walrus SDK integration in backend service<br>- File upload API with Walrus publisher integration<br>- Smart contract fields for `blob_id` and `blob_hash` storage<br>- Content retrieval from Walrus via standard gateway<br>- Event poster display component using Walrus blobs | **24-32 hours** |

---

## Attendee/User Features

### 8.4. Feature: User Data Deletion (DAT-08.4)

| User Story Title | User Story Body | Estimate |
| --- | --- | --- |
| 8.4. Feature: User Data Deletion (DAT-08.4) | User Story: As a user, I want to be able to delete my off-chain data, so that I can remove my information from the platform when needed.<br><br>**Actions:**<br>- Deletion Logic: User can delete their optional email and profile data from database<br>- Walrus Blobs: User-uploaded content blobs can be marked for deletion<br>- On-Chain Data: On-chain records (tickets, attendance) remain immutable as designed<br>- Confirmation: User receives confirmation that data deletion was successful<br><br>**Deliverables:**<br>- Account data deletion API endpoint<br>- User data deletion UI in profile settings<br>- Deletion confirmation flow<br>- Basic deletion test cases | **23 hours** |

---

### 8.5. Feature: Static Frontend Deployment to Walrus (DAT-08.5)

| User Story Title | User Story Body | Estimate |
| --- | --- | --- |
| 8.5. Feature: Static Frontend Deployment to Walrus (DAT-08.5) | User Story: As a user, I want to access the ticketing application via Walrus Sites, so that the platform has decentralized hosting.<br><br>**Actions:**<br>- Ensure Next.js exports static assets: `output: 'export'` in next.config.js<br>- Test all client-side routes work as static files<br>- Verify SPA routing compatibility<br>- Document deployment process using `walrus sites publish` CLI<br><br>**Deliverables:**<br>- Static SPA build configuration (Next.js `output: 'export'`)<br>- Deployment documentation and testing report | **4-8 hours** |

---

### 8.6. Feature: Per-Event Walrus Sites (DAT-08.6)

| User Story Title | User Story Body | Estimate |
| --- | --- | --- |
| 8.6. Feature: Per-Event Walrus Sites (DAT-08.6) | User Story: As an event organizer, I want to deploy a dedicated Walrus Site for my event to host event-specific content (agenda, speakers, media, announcements), so that attendees have decentralized access to event materials.<br><br>**Actions:**<br>- Site Deployment: Each event can deploy its own Walrus Site for event-specific content<br>- Content Upload: Organizers can upload static site assets (HTML, CSS, JS) and media files to Walrus<br>- Blob Management: System tracks all `blob_id`s associated with an event site<br>- Site Linking: Event smart contract stores the primary site `blob_id` or Walrus Sites URL<br>- Content Updates: Organizers can re-upload updated content and update the site reference<br>- Persistent Storage: Event sites remain on Walrus for archival/historical access<br><br>**Deliverables:**<br>- Walrus Sites deployment script/tool for event organizers<br>- Event site content upload API<br>- Blob reference management in Event smart contract<br>- Content update and versioning workflow<br>- Site URL/blob_id retrieval for frontends<br>- Post-event archival documentation | **24-32 hours** |

---

### 8.7. Feature: Permanent Event Data Archival (DAT-08.7)

| User Story Title | User Story Body | Estimate |
| --- | --- | --- |
| 8.7. Feature: Permanent Event Data Archival (DAT-08.7) | User Story: As an event organizer, I want archived events and their assets to remain permanently accessible on Walrus, so that historical records are preserved for future reference.<br><br>**Actions:**<br>- Archive Status: Event smart contracts include an "archived" flag for completed events<br>- Preservation Logic: Walrus blobs associated with archived events are managed for long-term storage<br>- Historical Access: Archived event sites remain accessible via their Walrus Sites URLs<br>- Data Integrity: Event metadata and blob references are preserved on-chain<br><br>**Deliverables:**<br>- Event archival workflow and status management<br>- Archive marker in smart contract<br>- Historical event browsing interface<br>- Data retention documentation | **16-20 hours** |

---

## Summary of Requirements

| Feature | ID | Estimate | Status |
|---------|----|----|--------|
| Decentralized Media Storage | DAT-08.1 | 24-32 hours | Not Started |
| User Data Deletion | DAT-08.4 | 23 hours | Not Started |
| Static Frontend Deployment to Walrus | DAT-08.5 | 4-8 hours | Not Started |
| Per-Event Walrus Sites Infrastructure | DAT-08.6 | 24-32 hours | Not Started |
| Permanent Event Data Archival | DAT-08.7 | 16-20 hours | Not Started |

**Total Module Hours**: **91-133 hours**

**Note**: Email collection for notifications is handled via zkLogin OAuth flow (see ID-1.2.2), eliminating the need for separate email encryption infrastructure.
