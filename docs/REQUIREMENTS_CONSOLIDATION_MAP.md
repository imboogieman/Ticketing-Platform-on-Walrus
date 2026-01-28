# Requirements Consolidation Map

**Date**: January 28, 2026  
**Purpose**: Single source of truth for all requirement consolidations, removals, and mappings  
**Status**: Phase 1 & 2 Complete

---

## Overview

This document maps all consolidated, removed, and reduced requirements from the audit process. It serves as a reference to understand what happened to each requirement and where functionality now resides.

---

## Consolidations (Phase 1)

Requirements that were merged into other requirements to eliminate duplication:

| Original Requirement | Consolidated Into | Rationale | Hours Saved |
|---------------------|-------------------|-----------|-------------|
| **ID-1.1.1** | INF-05.2.2 | Seal encryption is shared infrastructure used across tickets, events, and content gating | 66 |
| **ID-1.1.2** | UPS-02.1.1 | User registration and profile creation are the same operation | 42 |
| **DAT-08.2.1** | INF-05.2.2 | Seal encryption for metadata is part of centralized Seal infrastructure | (incl. above) |
| **NFT-14.5.1** | INF-05.2.2 | Encrypted metadata uses the same Seal infrastructure as access control | 42 |
| **UPS-02.2.1** | ID-1.2.1, ID-1.2.2 | Authentication flows already defined in Identity module | 42 |
| **AM-3.2.1** | AM-3.1.1 | Badge minting is part of check-in procedure, not separate operation | (incl. in AM-3.1.1) |
| **AM-3.4.3** | AM-3.3.2 | Post-event and venue content gating share 80% infrastructure | 42 |
| **INF-05.4.1** | DAT-08.5.1 | Walrus Sites hosting is single deployment, not separate per module | 46 |

**Total Consolidation Savings: ~280-320 hours**

---

## Removals - Stack-Provided Features (Phase 1)

Requirements that were completely removed because the blockchain/SDK provides the functionality:

| Requirement | Feature | Stack Provider | Rationale | Hours Saved |
|-------------|---------|----------------|-----------|-------------|
| **TS-18.1.2** | Digital Signature Verification | Sui Blockchain | All transactions are cryptographically signed and verified by Sui wallets automatically | 42 |
| **TS-18.1.4** | Double-Spending Prevention | Sui Blockchain | Object versioning and single-writer model automatically prevent ticket reuse | 42 |
| **TS-18.3.3** | Timestamped Verification | (consolidated to AM-3.5.1) | Single implementation in attendance module | 42 |

**Total Removal Savings: 126 hours**

---

## Estimate Reductions (Phase 2)

Requirements where estimates were reduced due to over-estimation of framework/SDK work:

### Identity & Authentication (Module ID-1)

| Requirement | Original | Reduced To | Rationale | Savings |
|-------------|----------|------------|-----------|---------|
| **ID-1.2.1** (Wallet Connection) | 42 hrs | 8-10 hrs | @mysten/dapp-kit provides framework; only UI components needed | 32 hrs |
| **ID-1.2.2** (zkLogin) | 42 hrs | 12-16 hrs | zkLogin SDK handles ephemeral keys + OIDC; only integration needed | 26-30 hrs |

**Module Savings: 58-62 hours**

### Attendance Management (Module AM-3)

| Requirement | Original | Reduced To | Rationale | Savings |
|-------------|----------|------------|-----------|---------|
| **AM-3.1.1** (Check-in & Badge Minting) | 65 hrs | 40-48 hrs | Sui handles state mutations automatically; focus on business logic | 17-25 hrs |
| **AM-3.5.1** (Timestamped Verification) | 42 hrs | 8-12 hrs | Sui Clock is trivial one-line API; TOCTOU prevention automatic | 30-34 hrs |

**Module Savings: 47-59 hours**

### Ticketing System (Module TS-08)

| Requirement | Original | Reduced To | Rationale | Savings |
|-------------|----------|------------|-----------|---------|
| **TS-18.1.1** (QR Code Generation) | 42 hrs | 6-10 hrs | QR library handles rendering; only dynamic salt logic needed | 32-36 hrs |
| **TS-18.1.3** (Expiration Logic) | 42 hrs | 8-12 hrs | Sui Clock comparison is trivial; focus on state transitions | 30-34 hrs |
| **TS-18.2.2** (Bulk Purchase) | 42 hrs | 28-36 hrs | PTB batching is standard pattern; reduced custom logic | 6-14 hrs |
| **TS-18.3.2** (Wallet Validation) | 42 hrs | 20-28 hrs | Wallet provides signing infrastructure; focus on challenge-response | 14-22 hrs |

**Module Savings: 82-106 hours**

### Data Preservation & Storage (Module DAT-04)

| Requirement | Original | Reduced To | Rationale | Savings |
|-------------|----------|------------|-----------|---------|
| **DAT-08.1** (Media Storage) | 46 hrs | 24-32 hrs | Walrus SDK integration only; not infrastructure development | 14-22 hrs |
| **DAT-08.6** (Per-Event Sites) | 70 hrs | 24-32 hrs | Walrus Sites CLI handles infrastructure; only configuration needed | 38-46 hrs |
| **DAT-08.7** (Event Archival) | 46 hrs | 16-20 hrs | Walrus handles lifecycle automatically; minimal custom logic | 26-30 hrs |

**Module Savings: 78-98 hours**

### Financial Operations (Module FIN-09)

| Requirement | Original | Reduced To | Rationale | Savings |
|-------------|----------|------------|-----------|---------|
| **FIN-19.1.1** (Crypto Payments) | 52 hrs | 24-32 hrs | DeepBook v3 provides swaps; focus on PTB composition | 20-28 hrs |
| **FIN-19.1.3** (Payment Verification) | 21 hrs | 8-12 hrs | Sui checkpoints are automatic; only webhook listener needed | 9-13 hrs |

**Module Savings: 29-41 hours**

**Total Estimate Reduction Savings: 294-366 hours**

---

## New Requirements Created (Phase 1)

| Requirement | Purpose | Estimate | Components Consolidated |
|-------------|---------|----------|------------------------|
| **INF-05.2.2** | Seal-Based Access Encryption Infrastructure | 24-32 hrs | ID-1.1.1, DAT-08.2.1, NFT-14.5.1 |

---

## Expanded Requirements (Phase 1 & 2)

Requirements that absorbed work from consolidated/removed items:

| Requirement | Original | Expanded To | Additional Scope |
|-------------|----------|-------------|------------------|
| **UPS-02.1.1** | 20-24 hrs | 32-40 hrs | Absorbed ID-1.1.2 (user registration architecture) |
| **AM-3.1.1** | 65 hrs | 40-48 hrs | Absorbed AM-3.2.1 (badge minting) AND reduced estimate |
| **AM-3.3.2** | 42 hrs | 24-32 hrs | Absorbed AM-3.4.3 (post-event gating) with 80% reuse |
| **DAT-08.5.1** | 46 hrs | 4-8 hrs | Absorbed INF-05.4.1 AND reduced estimate significantly |

---

## Module Impact Summary

| Module | Original Hours | Phase 1 Savings | Phase 2 Savings | Final Hours | % Reduction |
|--------|---------------|----------------|-----------------|-------------|-------------|
| Identity & Authentication (ID-1) | 192 | 108 | 58-62 | 20-26 | -87-90% |
| User Profile System (UPS-02) | 186 | 42 | 0 | 95-103 | -45-49% |
| Attendance Management (AM-3) | 275 | 84 | 47-59 | 114-142 | -48-59% |
| Data Preservation (DAT-04) | 294 | 84 | 78-98 | 128-156 | -47-56% |
| Technical Infrastructure (INF-05) | 196 | 46 | 0 | 150-158 | -19-23% |
| NFT Implementation (NFT-06) | 316 | 42 | 0 | 232 | -27% |
| Ticketing System (TS-08) | 310 | 84 | 82-106 | 206-254 | -18-34% |
| Financial Operations (FIN-09) | 286 | 0 | 29-41 | 245-259 | -9-14% |
| Event Management (EMS-07) | 530 | 0 | 0 | 530 | 0% |
| Analytics & Reporting (AR-06) | 106 | 0 | 0 | 106 | 0% |
| Platform Deliverables (PD-05) | 93 | 0 | 0 | 93 | 0% |
| Loyalty & Rewards (LRW-04) | 128 | 0 | 0 | 128 | 0% |
| **TOTAL (Development)** | **2,912** | **490** | **294-366** | **2,047-2,187** | **25-30%** |
| **Art/Design** | **210** | **0** | **0** | **210** | **0%** |
| **MVP 1 GRAND TOTAL** | **3,122** | **490** | **294-366** | **2,257-2,397** | **23-28%** |

---

## Quick Reference - Where Did It Go?

Use this section to quickly find what happened to a specific requirement:

### A-D
- **AM-3.2.1** → Merged into AM-3.1.1 (Check-in & Badge Minting)
- **AM-3.4.3** → Merged into AM-3.3.2 (Seal-Based Content Gating)
- **DAT-08.2.1** → Merged into INF-05.2.2 (Seal Infrastructure)

### I-N
- **ID-1.1.1** → Merged into INF-05.2.2 (Seal Infrastructure)
- **ID-1.1.2** → Merged into UPS-02.1.1 (User Registration)
- **INF-05.4.1** → Merged into DAT-08.5.1 (Walrus Sites)
- **NFT-14.5.1** → Merged into INF-05.2.2 (Seal Infrastructure)

### T-U
- **TS-18.1.2** → REMOVED (Sui provides signature verification)
- **TS-18.1.4** → REMOVED (Sui provides double-spend prevention)
- **TS-18.3.3** → Merged into AM-3.5.1 (Timestamped Verification)
- **UPS-02.2.1** → REMOVED (duplicates ID-1 authentication)

---

## Notes

1. **No Functionality Lost**: All requirements are preserved; only reorganized and de-duplicated
2. **Stack Assumptions Verified**: All claims about Sui/Walrus/Seal verified against official Jan 2026 documentation
3. **Realistic Estimates**: Remaining hours represent actual custom development work
4. **Integration Complexity**: Some consolidated requirements may reveal integration overhead; estimates include 10-15% buffer

---

## References

- **Audit Document**: [docs/REQUIREMENTS_AUDIT.md](REQUIREMENTS_AUDIT.md)
- **Action Plan**: [AUDIT_CONSOLIDATION_ACTION_PLAN.md](AUDIT_CONSOLIDATION_ACTION_PLAN.md)
- **Updated Estimates**: [docs/estimates.md](docs/estimates.md)
- **Requirement Documents**: [docs/requirements/mvp_01/](docs/requirements/mvp_01/)
