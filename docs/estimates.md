# Project Estimates - Ticketing Platform on Walrus

## Overview

This document provides a comprehensive estimation of all features and user stories for MVP 1, organized by modules.

---

# MVP 1 - Core Platform

## Art - Graphical Design

| Item # | Work Item | Duration (man-hours) | Resource | Planned Phase | Status |
|--------|-----------|---------------------|----------|---------------|--------|
| UXD-00.1.1 | User Research and Personas | 42 | Design | Alpha | Not Started |
| UXD-00.2.1 | Site Map and User Flows | 42 | Design | Alpha | Not Started |
| UXD-00.3.1 | Wireframes (Key Screens) | 42 | Design | Alpha | Not Started |
| UXD-00.4.1 | Design System | 42 | Design | Alpha | Not Started |
| UXD-00.4.2 | High-Fidelity Mockups | 42 | Design | Alpha | Not Started |

---

## Development

### Identity & Authentication (ID-1)

| Item # | Work Item | Duration (man-hours) | Resource | Planned Phase | Status |
|--------|-----------|---------------------|----------|---------------|--------|
| ID-1.2.1 | Wallet Connection | 8-10 | Mid | Alpha | Not Started |
| ID-1.2.2 | Social Login Integration (zkLogin) | 12-16 | Sen | Alpha | Not Started |
| | *Note: ID-1.1.1 consolidated into INF-05.2.2, ID-1.1.2 into UPS-02.1.1* | | | | |

---

### User Profile System (UPS-02)

| Item # | Work Item | Duration (man-hours) | Resource | Planned Phase | Status |
|--------|-----------|---------------------|----------|---------------|--------|
| UPS-02.1.1 | Register Profile Flow | 22-28 | Sen | Alpha | Not Started |
| UPS-02.1.3 | Avatar Upload | 20-28 | Jun | Beta | Not Started |
| UPS-02.3.1 | Attendance History | 21 | Jun | Beta | Not Started |
| UPS-02.4.1 | Badge Display | 21 | Jun | Beta | Not Started |
| | *Note: UPS-02.2 (Authentication) consolidated into ID-1.2* | | | | |

---

### Attendance Management (AM-3)

| Item # | Work Item | Duration (man-hours) | Resource | Planned Phase | Status |
|--------|-----------|---------------------|----------|---------------|--------|
| AM-3.1.1 | Check-in Procedures | 65 | Sen | RC | Not Started |
| AM-3.2.1 | SBT Minting on Check-in | 42 | Sen | RC | Not Started |
| AM-3.3.2 | Walrus Site Access (Pre-Event) | 42 | Sen | RC | Not Started |
| AM-3.4.2 | QR Code Generation & Scan | 42 | Mid | RC | Not Started |
| AM-3.4.3 | Gated Content (Post-Redemption) | 42 | Sen | RC | Not Started |
| AM-3.5.1 | Timestamped Verification | 42 | Sen | RC | Not Started |

---

### Data Preservation and Storage (DAT-04)

| Item # | Work Item | Duration (man-hours) | Resource | Planned Phase | Status |
|--------|-----------|---------------------|----------|---------------|--------|
| DAT-08.1 | Walrus SDK Integration | 4-8 | Sen | Alpha | Not Started |
| DAT-08.3 | Email Encryption (Optional) | 23 | Jun | Beta | Not Started |
| DAT-08.4 | User Data Deletion | 23 | Jun | Release | Not Started |
| DAT-08.5 | Walrus Sites Deployment | 46 | DO | Alpha | Not Started |
| DAT-08.6 | Per-Event Sites | 70 | Sen | Beta | Not Started |
| DAT-08.7 | Event Archival | 24-32 | Sen | Release | Not Started |
| | *Note: DAT-08.2 (Seal Encryption) consolidated into INF-05.2.2* | | | | |

---

### Technical Infrastructure (INF-05)

| Item # | Work Item | Duration (man-hours) | Resource | Planned Phase | Status |
|--------|-----------|---------------------|----------|---------------|--------|
| INF-05.1.1 | Sui Network Setup | 21 | DO | Alpha | Not Started |
| INF-05.1.2 | Gas Sponsorship | 21 | Sen | Beta | Not Started |
| INF-05.1.3 | Transaction Validation | 42 | Sen | RC | Not Started |
| INF-05.2.2 | Seal-Based Access Encryption (CONSOLIDATED) | 60-80 | Sen | Alpha | Not Started |
| INF-05.3.1 | Session Management | 42 | Mid | Alpha | Not Started |
| | *Note: Consolidates ID-1.1.1, DAT-08.2, NFT-14.5.1* | | | | |

---

### NFT Implementation (NFT-06) - Analytics and Reporting (AR-6)

| Item # | Work Item | Duration (man-hours) | Resource | Planned Phase | Status |
|--------|-----------|---------------------|----------|---------------|--------|
| NFT-14.1.1 | Ticket NFT Move Contract | 65 | Sen | Beta | Not Started |
| NFT-14.2.1 | Metadata Display (SIP-16) | 42 | Jun | Beta | Not Started |
| NFT-14.3.1 | Transfer Logic | 42 | Sen | Beta | Not Started |
| NFT-14.6.1 | Mutable State (Redemption) | 42 | Sen | RC | Not Started |
| NFT-14.8.1 | SBT Contract | 21 | Sen | Beta | Not Started |
| NFT-14.9.1 | SBT Non-transfer Logic | 21 | Sen | Beta | Not Started |
| NFT-14.10.1 | Ticket-to-Badge Burn | 41 | Sen | RC | Not Started |
| | *Note: NFT-14.5.1 (Encrypted Metadata) consolidated into INF-05.2.2* | | | | |

---

### EMS-07: Event Management System Module

| Item # | Work Item | Duration (man-hours) | Resource | Planned Phase | Status |
|--------|-----------|---------------------|----------|---------------|--------|
| EMS-17.1 | Event Creation | 42 | Sen | Beta | Not Started |
| EMS-17.2.1 | Capacity Management | 21 | Sen | Beta | Not Started |
| EMS-17.2.2 | Event Cancellation | 42 | Sen | RC | Not Started |
| EMS-17.2.3 | Publishing Workflow | 14-20 | Sen | Beta | Not Started |
| EMS-17.2.5 | Update Event Details | 42 | Sen | Beta | Not Started |
| EMS-17.3.1 | Visibility Settings | 42 | Sen | Beta | Not Started |
| EMS-17.3.2 | Pricing Config | 42 | Sen | Beta | Not Started |
| EMS-17.3.5 | ICS Calendar Export | 21 | Jun | RC | Not Started |
| EMS-17.4.1 | Event Search | 65 | Mid | Beta | Not Started |
| EMS-17.4.2 | Category Filters | 42 | Jun | Beta | Not Started |
| EMS-17.4.3 | Geolocation | 65 | Mid | RC | Not Started |
| EMS-17.4.4 | Venue Updates | 42 | Mid | RC | Not Started |
| EMS-17.4.5 | Calendar Sync | 42 | Jun | RC | Not Started |

---

### TS-08: Ticketing System Module

| Item # | Work Item | Duration (man-hours) | Resource | Planned Phase | Status |
|--------|-----------|---------------------|----------|---------------|--------|
| TS-18.1.1 | QR Code Generation (Primary Implementation) | 6-10 | Mid | Beta | Not Started |
| TS-18.1.3 | Expiration Logic | 8-12 | Sen | Beta | Not Started |
| TS-18.1.5 | Transfer Policies | 65 | Sen | RC | Not Started |
| TS-18.2.1 | Buy Ticket Flow | 65 | Sen | Beta | Not Started |
| TS-18.2.2 | Bulk Purchase | 42 | Sen | Beta | Not Started |
| TS-18.3.1 | On-Chain Verification | 42 | Sen | RC | Not Started |
| TS-18.3.2 | Wallet Validation | 42 | Sen | RC | Not Started |
| | *Note: TS-18.1.2 (Signature Verify) & TS-18.1.4 (Double-Spend) - Stack provides* | | | | |

---

### FIN-09: Financial Operations Module

| Item # | Work Item | Duration (man-hours) | Resource | Planned Phase | Status |
|--------|-----------|---------------------|----------|---------------|--------|
| FIN-19.1.1 | Crypto Payments | 24-32 | Sen | Beta | Not Started |
| FIN-19.1.2 | Fiat On-Ramp (Optional) | 8-12 | Sen | RC | Not Started |
| FIN-19.1.3 | Payment Verification | 21 | Sen | Beta | Not Started |
| FIN-19.1.4 | Refund Logic | 21 | Sen | RC | Not Started |
| FIN-19.2.1 | Revenue Reports | 42 | Mid | Release | Not Started |
| FIN-19.2.2 | Transaction History | 42 | Jun | RC | Not Started |
| FIN-19.2.3 | Audit Trail | 42 | Mid | Release | Not Started |

---

### AR-06: Analytics and Reporting Module (MVP 1 - Core)

| Item # | Work Item | Duration (man-hours) | Resource | Planned Phase | Status |
|--------|-----------|---------------------|----------|---------------|--------|
| AR-6.1.1 | Generate Event Report (Analytics Dashboard) | 20-28 | Mid | Release | Not Started |
| AR-6.3.1 | Sales Reports for Tax Compliance | 42 | Jun | Release | Not Started |
| AR-6.4.1 | Anonymized Attendance Data Export | 64 | Mid | Release | Not Started |

---

### PD-05: Platform Deliverables - Communication Module

| Item # | Work Item | Duration (man-hours) | Resource | Planned Phase | Status |
|--------|-----------|---------------------|----------|---------------|--------|
| PD-05.4.1 | Tier-Gated Content | 93 | Lead | RC | Not Started |

---

### LRW-04: Loyalty and Rewards Module

| Item # | Work Item | Duration (man-hours) | Resource | Planned Phase | Status |
|--------|-----------|---------------------|----------|---------------|--------|
| LRW-04.1.1 | Loyalty Token System | 128 | Lead | RC | Not Started |

---

## MVP 1 Summary

| Module | Total Duration (man-hours) | Features |
|--------|---------------------------|----------|
| Art - Graphical Design | 210 | 5 |
| Identity & Authentication (ID-1) | 23 | 2 |
| User Profile System (UPS-02) | 91 | 4 |
| Attendance Management (AM-3) | 275 | 6 |
| Data Preservation and Storage (DAT-04) | 196 | 6 |
| Technical Infrastructure (INF-05) | 196 | 5 |
| NFT Implementation (NFT-06) | 274 | 7 |
| Event Management System (EMS-07) | 525 | 13 |
| Ticketing System (TS-08) | 274 | 7 |
| Financial Operations (FIN-09) | 206 | 7 |
| Analytics and Reporting (AR-06) | 130 | 3 |
| Platform Deliverables (PD-05) | 93 | 1 |
| Loyalty and Rewards (LRW-04) | 128 | 1 |
| **MVP 1 TOTAL** | **2,621** | **67** |

---

## Stack-Provided vs Custom Development Breakdown

| Category | Hours Saved | Description |
|----------|------------|-------------|
| Removed (Stack Provides) | ~210 hours | Features natively provided by Sui/Walrus stack (digital signatures, double-spend prevention, etc.) |
| Consolidated Requirements | ~150 hours | Eliminated duplicate requirements across modules (Seal encryption, authentication, etc.) |
| Reduced Estimates | ~480 hours | Adjusted estimates where SDK/framework handles majority of work |
| **Total Reduction** | **~840 hours** | From 2,993 hours to approximately 1,600-1,700 hours |

### Key Stack Capabilities Leveraged:
- **Sui Blockchain**: Wallet Standard, object versioning, ownership model, digital signatures
- **Walrus Storage**: SDK for upload/download, blob addressing, content verification
- **Sui Seal**: Encryption SDK, threshold key servers, policy framework
- **Development Tools**: PTB framework, DeepBook integration, zkLogin infrastructure

---

## Notes and Assumptions

1. **Estimates include:** Requirements analysis, design discussions, coding, unit testing, integration testing, and deployment
2. **Resource abbreviations:** Sen = Senior, Mid = Mid-level, Jun = Junior, DO = DevOps, Lead = Team Lead
3. **Planned Phases:** Alpha → Beta → RC (Release Candidate) → Release
4. **Team composition:** Estimates assume developers have familiarity with Sui/Move ecosystem
5. **Dependencies:** Sequential features may have additional integration overhead
6. **Parallelization:** Some modules can be developed in parallel with appropriate team structure
7. **Status values:** Not Started, In Progress, In Review, Completed, Blocked
8. **AI-Assisted Development:** Estimates reflect efficiency gains from modern development tooling and code generation assistance
9. **SDK Reuse:** Well-documented ecosystem SDKs provide significant productivity improvements
10. **Shared Infrastructure:** Common components are designed for reuse across multiple features to reduce duplication
