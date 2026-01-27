# MVP 1 Requirements Audit Against Stack Capabilities

**Status**: Comprehensive audit complete (12/13 requirement files reviewed)  
**Date**: January 27, 2026  
**Purpose**: Identify over-decomposed requirements, consolidate duplicates, correct inflated estimates  
**Expected Outcome**: 30-37% reduction in total MVP1 hours (from ~2,179 to ~1,300-1,400)

---

## Audit Classification System

- **[REMOVE]**: Completely provided by stack; zero custom development
- **[CONSOLIDATE]**: Duplicate work spread across modules; centralize into one requirement
- **[CORRECT]**: Over-scoped or miscalculated; reduce hours significantly
- **[KEEP]**: Legitimate custom development; estimate is reasonable
- **[REUSE]**: Infrastructure from another requirement; no separate count

---

## ID-01: Identity & Authentication

### ID-1.1.1: Seal Encryption Integration - **[CONSOLIDATE → INF-05.2.2]**
**Current Estimate**: 66 hours  
**Verdict**: Over-decomposed, move to infrastructure layer

**Details**:
- ❌ "Seal SDK Integration" → Stack provides full SDK + Move module
- ❌ "Policy Definition" → Sealed<T> wrapper + seal_approve pattern provided
- ❌ "Threshold Key Requests" → Seal key server API provided
- ✅ "Access Policy Logic" → Custom (define conditions: time-locked, gatekeeper approval, etc.)

**Action**: Remove as separate requirement; merge into **INF-05.2.2: Seal-Based Access Encryption**
- New estimate for INF-05.2.2: **24-32 hours** (consolidates ID-1.1.1 + DAT-08.2.1 + NFT-14.5.1)
- **Savings**: 34 hours

---

### ID-1.1.2: User Registration System Architecture - **[CONSOLIDATE → UPS-02.1.1]**
**Current Estimate**: 42 hours  
**Verdict**: Duplicate of profile creation logic

**Details**:
- Schema Design → Struct definition belongs in UPS-02.1.1
- Profile Creation → Object initialization belongs in UPS-02.1.1
- Walrus Integration → Shared infrastructure (avatar storage)
- Caching → Next.js ISR automatic, no code needed

**Action**: Merge into UPS-02.1.1; increase that requirement by 12-16 hours
- **Savings**: 26 hours (remove separately estimated work)

---

### ID-1.2.1: Wallet Connection - **[CORRECT]**
**Current Estimate**: 42 hours  
**Verdict**: Framework work over-estimated

**Details**:
- ❌ "Implement Wallet Standard" → `@mysten/dapp-kit` handles this (library, not development)
- ❌ "Provider Integration" → Framework-provided
- ⚠️ "Build Connect modal" → Custom (UI only)
- ❌ "Session Management" → `useWallet()` hook handles this
- ❌ "Message Signing" → Wallet provides this API

**What Actually Needs Building**:
- React component for "Connect Wallet" button
- Styling + responsive design
- Account state initialization in app context
- Error handling UI

**New Estimate**: **8-10 hours**  
**Savings**: 32 hours

---

### ID-1.2.2: Social Login Integration (zkLogin) - **[CORRECT]**
**Current Estimate**: 42 hours  
**Verdict**: Framework work over-estimated

**Details**:
- ❌ "OIDC Configuration" → zkLogin framework handles this
- ❌ "Token Caching" → zkLogin manages ephemeral keys automatically
- ⚠️ "Redirect Handler" → Custom (capture OIDC token, call zkLogin SDK)
- ⚠️ "Fallback UI" → Custom (loading screen)
- ❌ "Ephemeral Keypair Generation" → zkLogin handles this

**What Actually Needs Building**:
- OAuth callback handler route
- Call zkLogin `zkLogin_parseZkLoginSignature()`
- UI for OAuth providers selection
- Fallback/error states

**New Estimate**: **12-16 hours**  
**Savings**: 26-30 hours

---

## UPS-02: User Profile System

### UPS-02.1.1: Register Profile Flow - **[CORRECT → EXPAND]**
**Current Estimate**: 20-24 hours  
**Verdict**: Acceptable, but needs to absorb ID-1.1.2

**New Estimate**: 32-40 hours (absorbs user registration architecture)  
**Content**:
- UserProfile struct definition (Move)
- Initialization function (Move)
- Frontend registration form
- Integration with wallet/zkLogin (no duplication now)

---

### UPS-02.1.3: Avatar Upload - **[CORRECT]**
**Current Estimate**: 21 hours  
**Verdict**: Slightly over-scoped

**Details**:
- ❌ "Walrus Integration" → SDK handles blob upload (not integration work)
- ⚠️ "Image Processing" → Custom (compression, format validation)
- ⚠️ "Blob Linking" → Custom (store blob_id in UserProfile)
- ⚠️ "Fallback Identicon" → Custom (generator library usage)

**What Actually Needs Building**:
- Image upload form
- Client-side compression
- Identicon generator for missing images
- Update UserProfile with blob_id

**New Estimate**: **12-16 hours**  
**Savings**: 5-9 hours

---

### UPS-02.2.1: Authenticate User Flows - **[CONSOLIDATE → Remove]**
**Current Estimate**: Assumed ~42 hours (in structure)  
**Verdict**: Duplicate of ID-1 requirements

**Details**:
This requirement is already covered by:
- ID-1.2.1 (Wallet connection)
- ID-1.2.2 (zkLogin)
- UPS-02.1.1 (Profile initialization)

**Action**: Remove as separate requirement
**Savings**: 42 hours

---

### UPS-02.3.1: Attendance History - **[KEEP, MINOR CORRECT]**
**Current Estimate**: 21 hours  
**Verdict**: Acceptable

**What It Actually Is**:
- Move logic to append ticket redemptions to UserProfile dynamic fields
- Frontend page to query and display history
- Privacy controls (boolean field)

**New Estimate**: **16-18 hours**  
**Savings**: 3-5 hours

---

### UPS-02.4.1: Badge System - **[KEEP, MINOR CORRECT]**
**Current Estimate**: 21 hours  
**Verdict**: Acceptable

**What It Actually Is**:
- Query user's SBT collection
- Filter by badge type
- Display gallery UI
- (SBT transfer restrictions handled by NFT-14.9.1)

**New Estimate**: **16-18 hours**  
**Savings**: 3-5 hours

---

## AM-03: Attendance Management

### AM-3.1.1: Check-in Procedures - **[CORRECT]**
**Current Estimate**: 65 hours  
**Verdict**: Over-decomposed (state management provided by Sui)

**Details**:
- ❌ "State Mutation: Update is_redeemed" → Sui object model handles (object versioning automatic)
- ❌ "Transfer capability disable" → Sui ownership enforces this
- ⚠️ "Scanner Handshake" → Custom (venue mobile app)
- ⚠️ "Redemption Call" → Custom (call redeem_ticket Move function)
- ⚠️ "Emit redemption event" → Custom (trivial)

**What Actually Needs Building**:
- `redeem_ticket()` Move entry function
- Scanner UI to read QR and trigger transaction
- Success/error feedback
- Double-click prevention

**Note**: redeem_ticket() mints attendance badge atomically (AM-3.2.1 logic)

**New Estimate**: **32-40 hours**  
**Savings**: 25-33 hours

---

### AM-3.2.1: Attendance Tracking (SBT Minting) - **[CONSOLIDATE → AM-3.1.1]**
**Current Estimate**: 42 hours  
**Verdict**: Same transaction as check-in

**Details**:
- Badge minting MUST occur in `redeem_ticket()` atomic transaction
- This is not separate work; it's the completion of AM-3.1.1

**Action**: Remove as separate requirement; include in AM-3.1.1
- AM-3.1.1 becomes: "Check-in & Badge Minting Procedures"
- New estimate: 40-48 hours (consolidated)

**Savings**: 42 hours (don't count separately)

---

### AM-3.3.2: Walrus Site Access Integration - **[CORRECT + CONSOLIDATE]**
**Current Estimate**: 42 hours  
**Verdict**: Partial stack provision, consolidate Seal work

**Details**:
- ❌ "Deploy Walrus Site" → Not development (infrastructure)
- ❌ "Encryption" → Seal SDK provides
- ⚠️ "Seal Policy" → Custom (define: "only if ticket.is_redeemed")
- ⚠️ "Decryption Request" → Custom (call Seal key server API on frontend)
- ⚠️ "Session-based gating" → Custom (query UserProfile to check attendance)

**What Actually Needs Building**:
- Move `seal_approve` function for "attended only" policy
- Frontend to request decryption from Seal key server
- Display gated content after decryption

**Shared Infrastructure Note**: Document states "Shares 40% with AM-3.4.3" ✅
- This is correct; both need Seal policy infrastructure

**New Estimate**: **20-24 hours**  
**Savings**: 18-22 hours

---

### AM-3.4.2: QR Code Scanning - **[KEEP]**
**Current Estimate**: 42 hours  
**Verdict**: Acceptable

**What It Actually Is**:
- Scanner app reads QR payload (dynamic from TS-18.1.1)
- Validates signature
- Calls redeem_ticket() transaction
- Handles network failures

**Note**: Reuses QR generation logic from TS-18.1.1 (no duplication)

**New Estimate**: **32-40 hours**  
**Reasonable**

---

### AM-3.4.3: Gated Content (Post-Redemption) - **[CONSOLIDATE → AM-3.3.2]**
**Current Estimate**: 42 hours  
**Verdict**: Reuses AM-3.3.2 infrastructure

**Details**:
Document states "Reuses 80% of encryption logic from AM-3.3.2" ✅
- Both need: Seal policy, key server API calls, decryption
- Only difference: AM-3.3.2 = venue gated content, AM-3.4.3 = post-event gated content

**Action**: Don't count separately
- Include "post-redemption content gating variant" in AM-3.3.2
- Expand AM-3.3.2 estimate: 20-24 → 24-32 hours

**Savings**: 10-18 hours (reuse not separate count)

---

### AM-3.5.1: Timestamped Verification - **[CORRECT]**
**Current Estimate**: 42 hours  
**Verdict**: Over-decomposed (Clock + TOCTOU provided by Sui)

**Details**:
- ❌ "Clock Integration" → `0x6` Clock object is trivial (one line)
- ❌ "TOCTOU Prevention" → Sui object versioning prevents this automatically
- ⚠️ "Store timestamp" → Custom (add field to Ticket)
- ⚠️ "Emit timestamped event" → Custom (trivial)

**What Actually Needs Building**:
- Add `checked_in_timestamp: u64` field to Ticket
- In redeem_ticket(): `clock::timestamp_ms(&clock)` 
- Emit event with timestamp

**New Estimate**: **8-12 hours**  
**Savings**: 30-34 hours

---

## DAT-04: Data Preservation & Storage

### DAT-08.1.1: Decentralized Media Storage - **[CORRECT]**
**Current Estimate**: 46 hours  
**Verdict**: Slightly over (SDK integration != development)

**Details**:
- ❌ "Walrus SDK Integration" → SDK is a library, not integration work
- ⚠️ "Upload Logic" → Custom (form + error handling)
- ⚠️ "Blob Linking" → Custom (store blob_id)
- ⚠️ "Display" → Custom (component)

**New Estimate**: **24-32 hours**  
**Savings**: 14-22 hours

---

### DAT-08.2.1: Seal Encryption for Ticket Metadata - **[CONSOLIDATE → INF-05.2.2]**
**Current Estimate**: ~46 hours (if counted separately)  
**Verdict**: Part of Seal infrastructure hub

**Details**:
This is identical to ID-1.1.1 + NFT-14.5.1
- All Seal encryption work consolidated into INF-05.2.2

**Action**: Remove; include in INF-05.2.2 consolidation
**Savings**: 46 hours

---

### DAT-08.3.1: Optional Contact Email Encryption - **[KEEP]**
**Current Estimate**: 23 hours  
**Verdict**: Legitimate backend infrastructure

**What It Actually Is**:
- AES-256-GCM encryption for optional email field
- Email opt-in/opt-out toggle
- Encrypted storage + decryption for notifications

**Note**: This is NOT Seal (which is for on-chain data). This is backend DB encryption.

**New Estimate**: **16-20 hours** (reasonable)  
**Savings**: 3-7 hours

---

### DAT-08.4.1: User Data Deletion - **[KEEP]**
**Current Estimate**: 23 hours  
**Verdict**: Acceptable

**What It Actually Is**:
- API endpoint to delete user profile + related data
- Walrus blob deletion API call (trivial)
- Sui objects are immutable (no deletion in traditional sense)
- UI confirmation dialog

**Note**: On-chain data cannot be deleted; document as "archived" instead.

**New Estimate**: **12-16 hours** (reduce slightly)  
**Savings**: 7-11 hours

---

### DAT-08.5.1: Decentralized Frontend Hosting - **[MASSIVE OVER → CORRECT]**
**Current Estimate**: 46 hours  
**Verdict**: This is infrastructure, not development

**Details**:
- ❌ "Build Process" → Next.js `next build` handles this (10 seconds)
- ❌ "Upload to Walrus Sites" → `walrus sites publish` CLI command (not a dev task)
- ❌ "Accessibility/HTTPS" → Walrus Sites provides this automatically
- ❌ "Routing" → Next.js handles this

**What Actually Needs Building**:
- Ensure Next.js exports static assets: `output: 'export'` in next.config.js ✅ (already done)
- Test all routes work as static files
- Documentation on deployment process

**New Estimate**: **4-8 hours** (just testing + docs)  
**Savings**: 38-42 hours

---

### DAT-08.6.1: Per-Event Walrus Sites Infrastructure - **[MASSIVE OVER → CORRECT]**
**Current Estimate**: 70 hours  
**Verdict**: Mostly infrastructure operations

**Details**:
- ❌ "Site Deployment" → Walrus Sites API / CLI (not development)
- ❌ "Blob Management" → Walrus automatically tracks blobs
- ⚠️ "Content Upload Orchestration" → Custom (create per-event site bundle)
- ⚠️ "Site Linking" → Custom (store site_id in Event object)
- ⚠️ "Version Management" → Custom (track which bundle deployed)

**What Actually Needs Building**:
- Backend service: given event_id, generate + upload static bundle
- Move logic: store current site_id in Event
- UI: show event link

**New Estimate**: **24-32 hours**  
**Savings**: 38-46 hours

---

### DAT-08.7.1: Permanent Event Data Archival - **[CORRECT]**
**Current Estimate**: 46 hours  
**Verdict**: Over-decomposed

**Details**:
- ❌ "Walrus storage lifecycle" → Permanent blobs are automatic (no code)
- ❌ "Immutability guarantee" → Walrus provides (no code)
- ⚠️ "Archive procedures" → Custom (mark event as archived in Move)
- ⚠️ "Historical discovery" → Custom (UI to query archived events)

**New Estimate**: **16-20 hours**  
**Savings**: 26-30 hours

---

## INF-05: Technical Infrastructure

### INF-05.1.1: Sui Network Foundation - **[KEEP]**
**Current Estimate**: 21 hours  
**Verdict**: Acceptable

**What It Actually Is**:
- Documentation of object-centric patterns
- Storage fund strategy configuration
- Gas estimation tuning

**New Estimate**: **16-18 hours** (minor reduction)  
**Savings**: 3 hours

---

### INF-05.1.2: Gas Fee Optimization - **[KEEP]**
**Current Estimate**: 21 hours  
**Verdict**: Acceptable

**What It Actually Is**:
- Sponsored transaction service (backend)
- Programmable Transaction Block batching
- Gas cost tracking

**New Estimate**: **20-24 hours**  
**Reasonable**

---

### INF-05.1.3: High-Fidelity Transaction Validation - **[CORRECT]**
**Current Estimate**: 42 hours  
**Verdict**: Over-decomposed

**Details**:
- ❌ "Move Bytecode Verifier" → Sui compiler does this automatically
- ⚠️ "Hot Potato Pattern" → Custom (Move code design)
- ❌ "Pre-Execution Simulation" → `sui_dryRunTransactionBlock` API (one function call)
- ⚠️ "Integrity Assertions" → Custom (write assert! statements)

**New Estimate**: **20-24 hours**  
**Savings**: 18-22 hours

---

### INF-05.2.1: Content Addressing - **[KEEP]**
**Current Estimate**: Not explicitly in estimates.md  
**Verdict**: Reasonable

**What It Actually Is**:
- Hashing pipeline for Walrus blobs
- Immutable linking in Move
- Resolution layer on frontend

**Estimate**: **12-16 hours**

---

### INF-05.2.2: Seal-Based Access Encryption - **[NEW HUB REQUIREMENT]**
**Current Status**: Not in estimates.md; should consolidate Seal work  
**Verdict**: Create as central requirement

**Consolidates**:
- ID-1.1.1: Seal Encryption Integration (66 hrs)
- DAT-08.2.1: Seal Encryption for Metadata (~46 hrs)
- NFT-14.5.1: Encrypted Metadata (42 hrs)

**New Combined Estimate**: **24-32 hours**
- Define seal_approve policies for all use cases
- Move infrastructure (proxy patterns, policy validation)
- Seal key server integration
- Testing

**Savings**: 80-120 hours (consolidation efficiency)

---

### INF-05.3.1: Session Controls (zkLogin) - **[CORRECT]**
**Current Estimate**: 42 hours  
**Verdict**: Over-decomposed

**Details**:
- ❌ "ZkLogin Integration" → zkLogin SDK provides framework
- ❌ "Ephemeral Keypair Management" → zkLogin handles automatically
- ⚠️ "Session Caching" → Custom (sessionStorage management)
- ⚠️ "Session Lifecycle" → Custom (expiry handling)

**New Estimate**: **12-16 hours**  
**Savings**: 26-30 hours

---

### INF-05.4.1: Walrus Site Static Hosting - **[CONSOLIDATE → DAT-08.5.1]**
**Current Estimate**: 46 hours  
**Verdict**: Duplicate of frontend hosting

**Details**:
This is the SAME requirement as DAT-08.5.1 (Frontend Hosting)

**Action**: Remove duplicate; keep only DAT-08.5.1 (4-8 hours)
**Savings**: 38-42 hours

---

## NFT-14: NFT Implementation

### NFT-14.1.1: Ticket NFTs (Base Object) - **[KEEP]**
**Current Estimate**: 65 hours  
**Verdict**: Acceptable

**What It Actually Is**:
- Move struct definition for Ticket
- Ownership + transfer capabilities
- Constructor function
- Move tests

**New Estimate**: **48-56 hours** (reasonable)  
**Savings**: 9-17 hours (minor, from removing overlaps)

---

### NFT-14.2.1: Metadata Standards (Display) - **[CORRECT]**
**Current Estimate**: 42 hours  
**Verdict**: Over-decomposed

**Details**:
- ❌ "Sui Display Standard" → Boilerplate (50 lines, provided by framework)
- ⚠️ "Attribute Mapping" → Custom (JSON schema definition)
- ❌ "Update Logic" → Trivial (one function call per update)

**What Actually Needs Building**:
- Define metadata schema (JSON)
- Move function to update display fields

**New Estimate**: **8-12 hours**  
**Savings**: 30-34 hours

---

### NFT-14.3.1: Ticket Transfer Logic - **[KEEP]**
**Current Estimate**: 42 hours  
**Verdict**: Acceptable

**What It Actually Is**:
- Move transfer function
- Transfer guard (is_transferable check)
- Marketplace integration via Transfer Policy

**New Estimate**: **32-40 hours**  
**Reasonable**

---

### NFT-14.5.1: Encrypted Metadata - **[CONSOLIDATE → INF-05.2.2]**
**Current Estimate**: 42 hours  
**Verdict**: Part of Seal infrastructure

**Action**: Remove; include in INF-05.2.2 consolidation
**Savings**: 42 hours

---

### NFT-14.6.1: Dynamic Updates (Mutable State) - **[CONSOLIDATE → AM-3.1.1]**
**Current Estimate**: 42 hours  
**Verdict**: Duplicate of check-in logic

**Details**:
- Adding `is_redeemed` field to Ticket
- `redeem_ticket()` function (same as AM-3.1.1)
- Emitting event

This is literally the same transaction as check-in.

**Action**: Remove; include in AM-3.1.1
**Savings**: 42 hours

---

### NFT-14.8.1: Soulbound Token (SBT) Standards - **[KEEP]**
**Current Estimate**: 21 hours  
**Verdict**: Acceptable

**What It Actually Is**:
- SBT interface definition in Move
- Badge minting function
- View functions for queries
- Non-transfer enforcement

**New Estimate**: **20-24 hours**  
**Reasonable**

---

### NFT-14.9.1: SBT Non-transferability - **[CORRECT]**
**Current Estimate**: 21 hours  
**Verdict**: Over-decomposed (Sui enforces this)

**Details**:
- ❌ "Capability Removal (no store)" → Sui type system enforces (not code)
- ❌ "Transfer Guard" → Sui prevents transfer of non-store objects automatically
- ❌ "Kiosk Prevention" → Kiosk requires store ability (automatic)
- ⚠️ "Revocation Function" → Custom (allow owner to revoke badge)

**What Actually Needs Building**:
- `revoke_badge()` function in Move
- Policy for who can revoke

**New Estimate**: **4-8 hours**  
**Savings**: 13-17 hours

---

### NFT-14.10.1: Attendance Proof Burn (Ticket-to-Badge) - **[KEEP]**
**Current Estimate**: 41 hours  
**Verdict**: Acceptable

**What It Actually Is**:
- Entry function that takes Ticket by value (consuming it)
- Mints AttendanceBadge in same transaction
- Reclaims storage rebate (automatic, not code)
- Atomic conversion

**Note**: This is the SAME transaction as redeem_ticket() in AM-3.1.1

**Consolidation Note**: Already consolidated into AM-3.1.1

**Savings**: 0 (covered in AM-3.1.1)

---

### NFT-14.11.1: zkLogin Address Derivation - **[CORRECT]**
**Current Estimate**: Not in current estimates.md  
**Verdict**: Mostly stack-provided

**Details**:
- ❌ "Salt Management" → zkLogin SDK handles
- ❌ "Address Mapping" → zkLogin `jwtToAddress()` API
- ❌ "Proof Generation" → Proving Service (separate from dev)
- ⚠️ "On-chain Verification" → Custom (Move code to verify signature)
- ⚠️ "Consistency Checking" → Custom (assert! statements)

**What Actually Needs Building**:
- Move function to validate zkLogin signature
- Tests

**New Estimate**: **8-12 hours**

---

## MODULE: Event Management (EMS-07)

**Status**: [Requires detailed review of actual requirement file; preliminary estimate ~290 hrs]

Based on pattern analysis:
- Event creation (Move) - likely 40-50 hrs (KEEP)
- Event discovery/filtering - likely 20-24 hrs (KEEP)
- Event metadata display - likely 12-16 hrs (minor reduction)
- Organizer controls - likely 20-24 hrs (KEEP)
- Cancellation/modifications - likely 16-20 hrs (KEEP)
- Walrus site integration (per-event) - covered in DAT-08.6.1
- Analytics dashboard - ~50 hrs as designed

**Provisional Savings**: ~30-50 hours (mostly removal of redundant infrastructure tasks)

---

## CONSOLIDATION SUMMARY TABLE

| Action | Source | Target | Current Hrs | Target Hrs | Savings |
|--------|--------|--------|-------------|-----------|---------|
| **Remove/Consolidate** | ID-1.1.1 | INF-05.2.2 | 66 | (incl in 24-32) | 34-42 |
| | ID-1.1.2 | UPS-02.1.1 | 42 | (incl in 32-40) | 10-18 |
| | DAT-08.2.1 | INF-05.2.2 | 46 | (incl in 24-32) | 46 |
| | NFT-14.5.1 | INF-05.2.2 | 42 | (incl in 24-32) | 42 |
| | NFT-14.6.1 | AM-3.1.1 | 42 | (incl in 40-48) | 42 |
| | AM-3.4.3 | AM-3.3.2 | 42 | (incl in 24-32) | 10-18 |
| | INF-05.4.1 | DAT-08.5.1 | 46 | (incl in 4-8) | 38-42 |
| | UPS-02.2.1 | ID-1 | 42 | 0 | 42 |
| **Reduce Hours** | ID-1.2.1 | - | 42 | 8-10 | 32 |
| | ID-1.2.2 | - | 42 | 12-16 | 26-30 |
| | AM-3.1.1 | - | 65 | 40-48 | 17-25 |
| | AM-3.5.1 | - | 42 | 8-12 | 30-34 |
| | DAT-08.1.1 | - | 46 | 24-32 | 14-22 |
| | DAT-08.5.1 | - | 46 | 4-8 | 38-42 |
| | DAT-08.6.1 | - | 70 | 24-32 | 38-46 |
| | DAT-08.7.1 | - | 46 | 16-20 | 26-30 |
| | INF-05.1.3 | - | 42 | 20-24 | 18-22 |
| | INF-05.3.1 | - | 42 | 12-16 | 26-30 |
| | NFT-14.2.1 | - | 42 | 8-12 | 30-34 |
| | NFT-14.9.1 | - | 21 | 4-8 | 13-17 |
| **Minor Reduce** | UPS-02.1.3 | - | 21 | 12-16 | 5-9 |
| | UPS-02.3.1 | - | 21 | 16-18 | 3-5 |
| | UPS-02.4.1 | - | 21 | 16-18 | 3-5 |
| | DAT-08.3.1 | - | 23 | 16-20 | 3-7 |
| | DAT-08.4.1 | - | 23 | 12-16 | 7-11 |
| | INF-05.1.1 | - | 21 | 16-18 | 3 |

**TOTAL CONSOLIDATION SAVINGS**: ~800 hours (36% reduction)

---

## Module-Level Summary

| Module | Original | Corrected | Reduction | % |
|--------|----------|-----------|-----------|-----|
| ID (Identity) | 186 | 48-56 | 130 | -70% |
| UPS (Profiles) | 105 | 92-112 | 0-13 | -0-12% |
| AM (Attendance) | 245 | 88-112 | 133 | -54% |
| DAT (Storage) | 304 | 88-120 | 184 | -60% |
| INF (Infra) | 173 | 88-120 | 53-85 | -31-49% |
| NFT (NFT) | 357 | 176-224 | 133-181 | -37-47% |
| EMS (Events) | ~290 | ~240 | ~50 | ~-17% |
| TS (Ticketing) | ~280 | ~240 | ~40 | ~-14% |
| FIN (Financials) | ~210 | ~180 | ~30 | ~-14% |
| AR (Analytics) | ~100 | ~85 | ~15 | ~-15% |
| Other | ~50 | ~45 | ~5 | ~-10% |
| **TOTAL** | **2,200** | **1,350-1,500** | **700-850** | **-32-39%** |
- Error handling/user feedback

### ID-1.2.2: Social Login Integration (zkLogin) - **[CORRECT]**
**Current Estimate**: 42 hours

**Issues**:
- "OIDC Configuration" → OAuth provider setup (configuration, not code)
- "Redirect Handling" → zkLogin SDK provides flow
- "Fallback UI" → Loading spinner (trivial)
- "Token Caching" → sessionStorage (trivial)

**Actual Work** (12-16 hours):
- OAuth provider registration
- zkLogin SDK integration
- Login UI flow
- Account linking logic

---

## UPS-02: User Profile System

### UPS-02.1.1: Register Profile Flow - **[KEEP]**
**Current Estimate**: Not explicitly listed in estimates, but work is real

**Legitimate Work**:
- Move contract: `create_profile` function
- Frontend: onboarding workflow
- Sui transaction signing
- SuiNS name linking (optional)

**Estimated**: 20-30 hours

### UPS-02.1.3: Avatar Upload - **[CORRECT]**
**Current Estimate**: 21 hours

**Issues**:
- "Decentralized Storage" → Walrus SDK `put_blob` call (library function)
- "Blob Linking" → Store `blob_id` in profile (trivial field update)
- "Image Processing" → Use client-side library like `canvas` (not custom)
- "Fallback Logic" → Default avatar rendering (trivial)

**Actual Work** (6-8 hours):
- Image upload UI
- Walrus SDK integration
- Avatar display component

### UPS-02.2.1: Authenticate User Flows - **[REMOVE]**
**Current Estimate**: Not in estimates (listed in requirements only)

**Why Remove**:
- "Session Handshake" → Wallet message signing (built-in)
- "Profile Resolution" → Sui RPC query (SDK function)
- "zkLogin Persistence" → Handled by zkLogin SDK
- "Route Guarding" → Next.js middleware pattern (no custom code)

**Actual Work** (4-6 hours):
- Next.js middleware configuration
- Protected route setup

### UPS-02.3.1: Attendance History - **[CORRECT]**
**Current Estimate**: 21 hours

**Issues**:
- "Dynamic Field Mapping" → Sui provides dynamic fields
- "Atomic Logging" → Move function call from check-in
- "Privacy Controls" → Boolean field (trivial)

**Actual Work** (12-16 hours):
- Move logic to append event records
- UI to display timeline
- Privacy toggle implementation

### UPS-02.4.1: Badge System - **[CORRECT]**
**Current Estimate**: 21 hours

**Issues**:
- "SBT Integration" → Query owned objects (Sui SDK function)
- "Visual Standards" → Sui Object Display metadata
- "Verifiable Credentials" → Transaction digest link (metadata)

**Actual Work** (10-14 hours):
- Query logic for user's SBTs
- Badge gallery UI component
- Object Display standard implementation

---

## TS-08: Ticketing System

### TS-18.1.1: QR Code Generation - **[REMOVE]**
**Current Estimate**: 42 hours (Primary Implementation)

**Why Remove**:
- "Dynamic Salt Injection" → Client-side hash function (use `crypto.subtle`)
- "Vector Rendering" → Use `qrcode` library (SVG support built-in)
- "Branding Governance" → QR code option in library
- "Offline Fallback" → Signed payload (crypto library)

**Actual Work** (4-6 hours):
- Integrate QR code library
- Add refresh timer (30s)
- Style/branding configuration

### TS-18.1.2: Digital Signature Verification - **[REMOVE]**
**Current Estimate**: 42 hours

**Why Remove Entirely**:
- **Sui's object ownership IS the signature verification**
- "Ed25519 Handshake" → Sui transaction verification (automatic)
- "Instruction Introspection" → PTB validation (automatic)
- "Public Key Derivation" → Sui transaction signing (automatic)
- "Anti-Spoofing Assertion" → Object version check (automatic)

**This is not a separate feature — it's how Sui works.**

### TS-18.1.3: Expiration Handling - **[CORRECT]**
**Current Estimate**: 42 hours

**Issues**:
- "Timestamp Gating" → `sui::clock` provides this
- "State Transition Logic" → Simple boolean check
- "Storage Fund Reclamation" → Object deletion (Sui built-in)
- "UI Dimming" → CSS class change

**Actual Work** (8-10 hours):
- Move function to check expiry
- UI to show expired state

### TS-18.1.4: Double-Spending Prevention - **[REMOVE ENTIRELY]**
**Current Estimate**: 42 hours

**Why This Is Nonsense**:
- **SUI OBJECT MODEL PREVENTS DOUBLE-SPEND BY DEFAULT**
- "Owned-Object Locking" → This IS Sui
- "Atomic Redemption" → Transaction atomicity is guaranteed
- "Equivocation Protection" → Object versioning is automatic
- "Causal Ordering" → Sui consensus handles this

**This requirement should not exist. It's like estimating "prevent SQL injection" when using a prepared statement library.**

### TS-18.1.5: Transfer Policies - **[CORRECT]**
**Current Estimate**: 65 hours

**Issues**:
- "Sui Kiosk Integration" → Use `sui::kiosk` module (provided)
- "Hot Potato Enforcement" → Transfer policy framework (provided)
- "Royalty Rule Implementation" → `FixedFeeRule` exists in SDK
- "Scalper Circuit-Breaker" → Custom price-cap rule (legitimate work)

**Actual Work** (24-32 hours):
- Define transfer policy in Move
- Implement price cap rule
- Kiosk integration testing

### TS-18.2.1: Buy Ticket Process - **[CORRECT]**
**Current Estimate**: 65 hours

**Issues**:
- "Kiosk Integration" → `kiosk::purchase` is a library call
- "Transfer Policy Resolution" → Automatic enforcement
- "Vaulting" → Kiosk creation (library function)
- "On-chain Event" → Event emission (trivial)

**Actual Work** (20-28 hours):
- Purchase flow UI
- Payment handling
- Transaction building
- Error handling

### TS-18.2.2: Quantity Selection (Bulk Purchase) - **[CORRECT]**
**Current Estimate**: 42 hours

**Issues**:
- "PTB Batching" → Programmable Transaction Blocks are Sui's feature
- "Payment Consolidation" → `coin::split` is built-in
- "Atomic Fail-Safe" → Transaction rollback is automatic
- "Gas Efficiency" → PTB optimization is about smart design, not custom code

**Actual Work** (12-16 hours):
- Bulk purchase UI
- PTB construction for batch
- Testing edge cases

### TS-18.3.1: On-Chain Verification - **[REMOVE]**
**Current Estimate**: 42 hours

**Why Remove**:
- "Object Introspection" → `sui_getObject` RPC (SDK function)
- "State Check" → Boolean field read (trivial)
- "Smart Contract Logic" → Move function call
- "Conflict Resolution" → Sui versioning (automatic)

**Actual Work** (6-8 hours):
- Scanner app integration
- Move validation function

### TS-18.3.2: Wallet Validation - **[KEEP]**
**Current Estimate**: 42 hours

**Issues**:
- Challenge-response is custom but over-decomposed

**Actual Work** (16-20 hours):
- Nonce generation
- Signature verification flow
- Scanner app wallet check

### TS-18.3.3: Timestamped Verification - **[REMOVE]**
**Current Estimate**: 42 hours (incorrectly listed as timestamped verification in AM-3.5.1)

**Why Remove**:
- "Clock Object Integration" → `sui::clock` is built-in
- "Precision Logging" → `clock::timestamp_ms` call
- "Event Emission" → Event struct definition
- "Data Persistence" → On-chain storage is automatic

**Actual Work** (4-6 hours):
- Add clock parameter to Move function
- Emit event with timestamp

---

## DAT-08: Data Preservation and Storage

### DAT-08.1.1: Decentralized Media Storage - **[CORRECT]**
**Current Estimate**: 46 hours (WAL

RUS SDK Integration)

**Issues**:
- "SDK Integration" → Library installation (npm install)
- "Upload Logic" → `walrus.store()` SDK call
- "On-Chain Linking" → Store blob_id field
- "Display" → Image src attribute

**Actual Work** (8-12 hours):
- Walrus SDK setup
- Upload flow implementation
- Error handling

### DAT-08.2.1: Seal Encryption for Ticket Metadata - **[CORRECT]**
**Current Estimate**: Not listed separately, but overlaps with ID-1.1.1

**Issues**:
- Same over-decomposition as ID-1.1.1

**Actual Work** (12-16 hours):
- Define encryption policy
- Seal SDK integration for ticket metadata
- Decryption flow

### DAT-08.3.1: Optional Contact Email Encryption - **[REMOVE]**
**Current Estimate**: 23 hours

**Why Remove/Simplify**:
- "Encryption Standard" → Use Node.js `crypto` module (built-in)
- "Optional Field" → Database schema field
- "Encrypted Storage" → Just encrypt before insert
- "Decryption" → Decrypt on read

**Actual Work** (4-6 hours):
- Email encryption util
- DB schema update

### DAT-08.4.1: User Data Deletion - **[CORRECT]**
**Current Estimate**: 23 hours

**Issues**:
- Most work is database operations (trivial)
- On-chain data immutability is by design

**Actual Work** (6-8 hours):
- Delete API endpoint
- UI for deletion
- Confirmation flow

### DAT-08.5.1: Decentralized Frontend Hosting (Walrus Sites) - **[CORRECT]**
**Current Estimate**: 46 hours

**Issues**:
- "Build Process" → Next.js static export (configuration)
- "Upload" → `site-builder` CLI tool (provided)
- "Accessibility" → Walrus Sites portal (provided)
- "Routing" → Client-side routing (Next.js handles)

**Actual Work** (8-12 hours):
- Next.js export configuration
- Walrus Sites deployment script
- Testing deployment

### DAT-08.6.1: Per-Event Walrus Sites - **[KEEP]**
**Current Estimate**: 70 hours

**Legitimate Work**:
- Event site generation logic
- Content upload workflow
- Site versioning
- Access control integration

**Estimated**: 40-50 hours (less than current, still substantial)

---

## FIN-09: Financial Operations

### FIN-19.1.1: Cryptocurrency Acceptance - **[CORRECT]**
**Current Estimate**: 42 hours

**Issues**:
- "Stablecoin Integration" → DeepBook SDK (library)
- "Atomic Swap Logic" → PTB construction
- "Gas Sponsorship" → Sui sponsored transactions (framework)
- "Direct Transfer" → `coin::transfer` calls

**Actual Work** (16-24 hours):
- Payment flow UI
- Multi-token support
- Swap transaction building

### FIN-19.1.2: Fiat On-Ramp - **[CORRECT]**
**Current Estimate**: 66 hours (Optional)

**Issues**:
- "SDK Integration" → Third-party SDK installation
- "zkLogin Handshake" → Wallet creation (SDK)
- "Rate Locking" → On-ramp API feature
- "KYC Bridge" → Provider handles this

**Actual Work** (24-32 hours):
- On-ramp provider integration
- Payment flow UI
- Error handling

### FIN-19.1.3: Payment Verification - **[REMOVE]**
**Current Estimate**: 21 hours

**Why Remove**:
- "Finality Monitoring" → Sui checkpoint verification (SDK query)
- "Webhook Reconciliation" → Standard webhook handling
- "Double-Spending Guard" → Object locking is automatic
- "Status Dashboard" → UI state management

**Actual Work** (6-8 hours):
- Webhook endpoint
- Status UI updates

### FIN-19.1.4: Refund Processing - **[CORRECT]**
**Current Estimate**: 21 hours

**Issues**:
- "Capability Gating" → Move capability pattern (standard)
- "Burn & Return Logic" → Two Move function calls
- "Approval Workflow" → Multi-sig pattern
- "Tax Reconciliation" → Report update

**Actual Work** (12-16 hours):
- Move refund function
- Admin UI
- Two-step approval flow

### FIN-19.2.1: Settlement Reports - **[CORRECT]**
**Current Estimate**: 42 hours

**Issues**:
- "Aggregated Indexing" → Query Sui events (SDK)
- "FX Normalization" → Use exchange rate API
- "Withdrawal Tracking" → Database state
- "Export Options" → CSV/PDF library

**Actual Work** (20-28 hours):
- Event aggregation logic
- Report generation
- Export functionality

### FIN-19.2.2: Transaction History - **[CORRECT]**
**Current Estimate**: 42 hours

**Issues**:
- "Personal Ledger" → Query user transactions (SDK)
- "Receipt Generation" → PDF template
- "Interactive UI" → React component

**Actual Work** (16-20 hours):
- Transaction query logic
- History UI
- Receipt generation

### FIN-19.2.3: Audit Trails - **[CORRECT]**
**Current Estimate**: 42 hours

**Issues**:
- "Immutable Event Logging" → Sui events are immutable by default
- "Admin Action Tracking" → Event emission
- "CARF-Ready Data" → Metadata fields in events
- "Verification Tool" → Script to compare on-chain vs DB

**Actual Work** (20-24 hours):
- Event schema design
- Verification script
- Auditor access portal

---

## TS-08: Ticketing System

### TS-18.1.1: QR Code Generation - **[CORRECT]**
**Current Estimate**: 42 hours (Junior)  
**Verdict**: Over-scoped

**Details**:
- ❌ "SVG rendering" → QR.js library handles (trivial)
- ❌ "Dynamic salt injection" → Simple hashing logic (trivial)
- ❌ "Offline fallback" → Deterministic signature generation (trivial)
- ⚠️ "Logo embedding" → Custom (simple image overlay)
- ⚠️ "Branding governance" → Custom (styling)

**New Estimate**: **6-10 hours**  
**Savings**: 32-36 hours

---

### TS-18.1.2: Digital Signature Verification - **[REMOVE]**
**Current Estimate**: 42 hours  
**Verdict**: Completely provided by stack

**Details**:
- ❌ "Ed25519 verification" → Sui wallet provides this
- ❌ "Public key derivation" → Wallet standard handles
- ❌ "Instruction Introspection" → Sui PTB validates automatically
- ❌ "Anti-spoofing assertion" → Transaction would fail anyway

**This requirement does not exist as custom work.**  
The wallet automatically signs/verifies everything.

**Action**: Remove entirely  
**Savings**: 42 hours

---

### TS-18.1.3: Expiration Handling - **[CORRECT]**
**Current Estimate**: 42 hours  
**Verdict**: Over-scoped

**Details**:
- ❌ "Clock object integration" → `0x6` Clock is trivial to use
- ❌ "State transition logic" → Simple boolean toggle
- ❌ "Storage fund reclamation" → Sui handles automatically
- ⚠️ "UI updates" → Custom (mark expired in frontend)

**New Estimate**: **8-12 hours**  
**Savings**: 30-34 hours

---

### TS-18.1.4: Double-Spending Prevention - **[REMOVE]**
**Current Estimate**: 42 hours  
**Verdict**: Completely provided by Sui object model

**Details**:
- ❌ "Owned-Object Locking" → Sui automatically prevents concurrent writes
- ❌ "Atomic Redemption" → Sui transactions are atomic
- ❌ "Equivocation Protection" → Sui object versioning prevents this
- ❌ "Causal Ordering" → Sui owned-object lane provides this

This is literally what Sui's consensus model provides automatically.

**Action**: Remove entirely; mention in documentation that Sui handles this  
**Savings**: 42 hours

---

### TS-18.1.5: Transfer Policies - **[KEEP]**
**Current Estimate**: 42 hours  
**Verdict**: Acceptable

**What It Actually Is**:
- Kiosk integration (Setup)
- TransferPolicy + Hot Potato configuration
- Royalty rule + price-cap rule implementation
- Marketplace testing

**Note**: Transfer Policy is provided by Sui, but implementing the specific rules is custom work.

**New Estimate**: **32-40 hours** (reasonable)

---

### TS-18.2.1: Buy Ticket Process - **[KEEP]**
**Current Estimate**: Included in payment workflow  
**Verdict**: Legitimate custom work

**What It Actually Is**:
- Kiosk purchase command integration
- Transfer Policy resolution in PTB
- On-chain event emission
- Integration testing

**Estimate**: **20-28 hours**

---

### TS-18.2.2: Quantity Selection - **[KEEP]**
**Current Estimate**: 42 hours (Intermediate)  
**Verdict**: Acceptable

**What It Actually Is**:
- PTB batching loop logic
- Coin splitting logic (Sui SDK provides the API)
- Atomic fail-safe error handling
- Gas optimization

**New Estimate**: **28-36 hours** (reasonable)

---

### TS-18.3.1: On-Chain Verification - **[KEEP]**
**Current Estimate**: 42 hours  
**Verdict**: Acceptable

**What It Actually Is**:
- Backend query logic using `sui_getObject`
- State validation (`is_redeemed` check)
- Scanner app integration
- Testing

**New Estimate**: **32-40 hours** (reasonable)

---

### TS-18.3.2: Wallet Validation - **[PARTIALLY STACK-PROVIDED]**
**Current Estimate**: 42 hours  
**Verdict**: Mostly custom UI + nonce generation

**Details**:
- ⚠️ "Challenge-Response" → Custom (nonce generation + verification)
- ❌ "Cryptographic Signing" → Wallet handles
- ❌ "Signature Verification" → Wallet handles
- ⚠️ "Biometric Integration" → Custom (optional, depends on OS)

**New Estimate**: **20-28 hours** (reduce from 42)  
**Savings**: 14-22 hours

---

### TS-18.3.3: Timestamped Verification - **[REMOVE + CONSOLIDATE]**
**Current Estimate**: 42 hours  
**Verdict**: Already covered by AM-3.5.1

This is identical to AM-3.5.1 (checked-in timestamp)

**Action**: Remove; consolidate with AM-3.5.1  
**Savings**: 42 hours

---

## EMS-07: Event Management System

### EMS-17.1: Event Creation - **[KEEP]**
**Current Estimate**: ~40-48 hours  
**Verdict**: Acceptable

**What It Actually Is**:
- PendingEvent struct definition
- UUID generation + collision prevention
- AdminCap minting
- Walrus metadata upload
- Move entry function + tests
- Frontend event creation form

**Estimate**: **40-48 hours** (reasonable)

---

### EMS-17.2.1: Capacity Management - **[KEEP]**
**Current Estimate**: ~20-24 hours  
**Verdict**: Acceptable

**What It Actually Is**:
- max_capacity field in Event
- Assertion logic in minting function
- Admin capacity update function
- Frontend capacity UI

**Estimate**: **16-20 hours** (reasonable)

---

### EMS-17.2.2: Cancel Event Procedures - **[KEEP]**
**Current Estimate**: ~28-36 hours  
**Verdict**: Acceptable

**What It Actually Is**:
- EventStatus enum + transition logic
- Refund escrow release (PTB batching)
- Ticket invalidation logic
- Event emission + testing
- Frontend cancellation UI

**Estimate**: **28-36 hours** (reasonable)

---

### EMS-17.2.3: Publishing Workflow - **[KEEP]**
**Current Estimate**: ~20-28 hours  
**Verdict**: Acceptable

**What It Actually Is**:
- State transition (draft → public)
- Epoch window definition
- Indexer trigger
- Move entry function
- Frontend publishing UI

**Estimate**: **16-20 hours** (reasonable)

---

### EMS-17.2.5: Update Event Details - **[KEEP]**
**Current Estimate**: ~20-24 hours  
**Verdict**: Acceptable

**What It Actually Is**:
- Metadata field mutation
- Walrus blob upload
- Version tracking
- Event emission
- Frontend editing UI

**Estimate**: **16-20 hours** (reasonable)

---

### EMS-17.3.1: Visibility Settings - **[KEEP]**
**Current Estimate**: ~24-32 hours  
**Verdict**: Acceptable

**What It Actually Is**:
- Visibility enum (Public/Unlisted/Private)
- Whitelist management functions
- Mint function access control
- Indexer configuration
- Frontend visibility UI

**Estimate**: **20-28 hours** (reasonable)

---

### EMS-17.3.2: Pricing Configuration - **[KEEP]**
**Current Estimate**: ~32-40 hours  
**Verdict**: Acceptable

**What It Actually Is**:
- TicketTier struct definition
- PriceMap (Table/VecMap) implementation
- Multi-currency payment handling
- Time-based pricing logic
- Frontend tier selection

**Estimate**: **32-40 hours** (reasonable)

---

### EMS-17.3.5: ICS File Generation - **[CORRECT]**
**Current Estimate**: ~16-20 hours  
**Verdict**: Slightly over-scoped

**Details**:
- ❌ "iCalendar format" → ics library handles format
- ⚠️ "Dynamic generation" → Custom (data extraction)
- ⚠️ "Direct download" → Custom (trigger + file serving)

**New Estimate**: **8-12 hours**  
**Savings**: 4-12 hours

---

### EMS-17.4.1: Search Capabilities - **[KEEP]**
**Current Estimate**: ~28-36 hours  
**Verdict**: Reasonable

**What It Actually Is**:
- Full-text search indexer (Elasticsearch/Algolia)
- Indexing pipeline
- Fuzzy matching configuration
- Frontend search component
- Backend API

**Estimate**: **24-32 hours** (reasonable)

---

### EMS-17.4.2: Category Filtering - **[KEEP]**
**Current Estimate**: ~16-20 hours  
**Verdict**: Reasonable

**What It Actually Is**:
- Category enum definition
- category_id field in Event
- Indexer aggregation
- Frontend filter UI
- API endpoint

**Estimate**: **12-16 hours** (reasonable)

---

### EMS-17.4.3: Geolocation Features - **[KEEP]**
**Current Estimate**: ~28-36 hours  
**Verdict**: Reasonable

**What It Actually Is**:
- Lat/lon storage in metadata
- Geospatial indexing (H3)
- Frontend geolocation API
- Map component integration
- Distance calculation
- "Near Me" filter

**Estimate**: **24-32 hours** (reasonable)

---

### EMS-17.4.4: Venue Changes - **[KEEP]**
**Current Estimate**: ~20-28 hours  
**Verdict**: Reasonable

**What It Actually Is**:
- Admin venue update function
- Notification integration (Notifi/XMTP)
- Event emission
- ICS file regeneration
- Frontend alert UI

**Estimate**: **16-24 hours** (reasonable)

---

### EMS-17.4.5: Calendar Sync Capabilities - **[KEEP]**
**Current Estimate**: ~24-32 hours  
**Verdict**: Reasonable

**What It Actually Is**:
- CalDAV server implementation/integration
- Per-user subscription URL generation
- Dynamic feed updates
- Frontend subscription URL display

**Estimate**: **20-28 hours** (reasonable)

---

## FIN-09: Financial Operations

### FIN-19.1.1: Cryptocurrency Acceptance - **[PARTIALLY STACK-PROVIDED]**
**Current Estimate**: ~48-56 hours (Senior)  
**Verdict**: Mostly framework; some custom integration

**Details**:
- ❌ "Stablecoin integration" → DeepBook v3 provides liquidity pools
- ❌ "Atomic swap" → Sui PTB handles
- ⚠️ "Gas sponsorship" → Custom (Sui Sponsored TX setup + UI)
- ⚠️ "Payment split logic" → Custom (Move function)

**New Estimate**: **24-32 hours** (reduce from 48-56)  
**Savings**: 16-32 hours

---

### FIN-19.1.2: Fiat Currency Options - **[KEEP]**
**Current Estimate**: ~52-60 hours (Senior)  
**Verdict**: Legitimate custom integration work

**What It Actually Is**:
- On-ramp SDK integration (Banxa/Stripe)
- zkLogin wallet creation
- Price locking mechanism
- Light-KYC configuration
- Frontend checkout modal
- Transaction confirmation tracking

This is real integrations work, not framework.

**Estimate**: **40-48 hours** (reasonable)

---

### FIN-19.1.3: Payment Verification - **[CORRECT]**
**Current Estimate**: 21 hours  
**Verdict**: Over-scoped

**Details**:
- ❌ "Finality Monitoring" → Sui automatically checkpoints (no code needed)
- ⚠️ "Webhook Reconciliation" → Custom (listener setup)
- ❌ "Double-Spending Guard" → Sui object model provides this
- ⚠️ "Status Dashboard" → Custom (UI)

**New Estimate**: **8-12 hours**  
**Savings**: 9-13 hours

---

### FIN-19.1.4: Refund Processing - **[KEEP]**
**Current Estimate**: ~32-40 hours (Mid)  
**Verdict**: Acceptable

**What It Actually Is**:
- FinanceCap gating logic
- Burn & return Move function
- Two-step approval workflow (backend)
- Tax reconciliation logic
- Admin dashboard UI
- Event emission

**Estimate**: **28-36 hours** (reasonable)

---

### FIN-19.2.1: Settlement Reports - **[KEEP]**
**Current Estimate**: ~36-44 hours (Mid)  
**Verdict**: Acceptable

**What It Actually Is**:
- Event aggregation from blockchain
- FX normalization logic
- Withdrawal tracking
- Report generation (PDF/CSV)
- Frontend dashboard

**Estimate**: **28-36 hours** (reasonable)

---

### FIN-19.2.2: Transaction History - **[KEEP]**
**Current Estimate**: ~24-32 hours (Junior)  
**Verdict**: Acceptable

**What It Actually Is**:
- User transaction query
- Receipt generation
- Filter UI implementation
- Explorer link integration

**Estimate**: **16-20 hours** (reasonable)

---

### FIN-19.2.3: Audit Trails - **[KEEP]**
**Current Estimate**: ~32-40 hours (Mid)  
**Verdict**: Acceptable

**What It Actually Is**:
- Event schema design for audit
- Admin action logging
- Verification script
- Auditor access portal

**Estimate**: **24-32 hours** (reasonable)

---

## COMPREHENSIVE SUMMARY TABLE

| Module | Requirement | Current | Corrected | Savings | Action |
|--------|-------------|---------|-----------|---------|--------|
| **TS** | 18.1.1 QR Gen | 42 | 6-10 | 32-36 | Reduce |
| | 18.1.2 Sig Verify | 42 | 0 | 42 | Remove |
| | 18.1.3 Expiration | 42 | 8-12 | 30-34 | Reduce |
| | 18.1.4 Double-Spend | 42 | 0 | 42 | Remove |
| | 18.1.5 Transfer | 42 | 32-40 | 0-10 | Keep |
| | 18.2.1 Buy | TBD | 20-28 | - | Keep |
| | 18.2.2 Qty | 42 | 28-36 | 6-14 | Reduce |
| | 18.3.1 Verify | 42 | 32-40 | 0-10 | Keep |
| | 18.3.2 Wallet Val | 42 | 20-28 | 14-22 | Reduce |
| | 18.3.3 Timestamped | 42 | 0 | 42 | Remove |
| **EMS** | 17.1 Create | 44 | 40-48 | 0-4 | Keep |
| | 17.2.1 Capacity | 22 | 16-20 | 2-6 | Keep |
| | 17.2.2 Cancel | 32 | 28-36 | 0-4 | Keep |
| | 17.2.3 Publish | 24 | 16-20 | 4-8 | Keep |
| | 17.2.5 Update | 22 | 16-20 | 2-6 | Keep |
| | 17.3.1 Visibility | 28 | 20-28 | 0-8 | Keep |
| | 17.3.2 Pricing | 36 | 32-40 | 0-4 | Keep |
| | 17.3.5 ICS | 18 | 8-12 | 6-10 | Reduce |
| | 17.4.1 Search | 32 | 24-32 | 0-8 | Keep |
| | 17.4.2 Category | 18 | 12-16 | 2-6 | Keep |
| | 17.4.3 Geo | 32 | 24-32 | 0-8 | Keep |
| | 17.4.4 Venue | 24 | 16-24 | 0-8 | Keep |
| | 17.4.5 Calendar | 28 | 20-28 | 0-8 | Keep |
| **FIN** | 19.1.1 Crypto | 52 | 24-32 | 20-28 | Reduce |
| | 19.1.2 Fiat | 56 | 40-48 | 8-16 | Reduce |
| | 19.1.3 Verify | 21 | 8-12 | 9-13 | Reduce |
| | 19.1.4 Refund | 36 | 28-36 | 0-8 | Keep |
| | 19.2.1 Settlement | 40 | 28-36 | 4-12 | Keep |
| | 19.2.2 History | 28 | 16-20 | 8-12 | Keep |
| | 19.2.3 Audit | 36 | 24-32 | 4-12 | Keep |

---

## Summary of Audit Findings

### Requirements to REMOVE Entirely (No Custom Work)
1. **TS-18.1.2**: Digital Signature Verification (42 hrs) - Wallet provides
2. **TS-18.1.4**: Double-Spending Prevention (42 hrs) - Sui provides
3. **TS-18.3.3**: Timestamped Verification (42 hrs) - Covered by AM-3.5.1
4. Subtotal removed: **126 hours**

### Requirements to SIGNIFICANTLY REDUCE (Framework Over-Scoping)
| Requirement | Original | New | Savings |
|-------------|----------|-----|---------|
| ID-1.1.1 | 66 | 12-16 | 50-54 |
| ID-1.2.1 | 42 | 8-10 | 32 |
| ID-1.2.2 | 42 | 12-16 | 26-30 |
| AM-3.1.1 | 65 | 40-48 | 17-25 |
| AM-3.5.1 | 42 | 8-12 | 30-34 |
| TS-18.1.1 | 42 | 6-10 | 32-36 |
| TS-18.1.3 | 42 | 8-12 | 30-34 |
| TS-18.2.2 | 42 | 28-36 | 6-14 |
| TS-18.3.2 | 42 | 20-28 | 14-22 |
| DAT-08.1.1 | 46 | 24-32 | 14-22 |
| DAT-08.5.1 | 46 | 4-8 | 38-42 |
| DAT-08.6.1 | 70 | 24-32 | 38-46 |
| DAT-08.7.1 | 46 | 16-20 | 26-30 |
| FIN-19.1.1 | 52 | 24-32 | 20-28 |
| FIN-19.1.2 | 56 | 40-48 | 8-16 |
| FIN-19.1.3 | 21 | 8-12 | 9-13 |
| Subtotal: | 721 | 316-408 | **313-405 hours** |

### Requirements to CONSOLIDATE (Merge duplicates)
1. **ID-1.1.2** → UPS-02.1.1 (Profile init) - Save 10-18 hrs
2. **DAT-08.2.1** → INF-05.2.2 (Seal hub) - Save 46 hrs
3. **NFT-14.5.1** → INF-05.2.2 (Seal hub) - Save 42 hrs
4. **NFT-14.6.1** → AM-3.1.1 (Redeem + badge) - Save 42 hrs
5. **AM-3.4.3** → AM-3.3.2 (Gated content) - Save 10-18 hrs
6. **UPS-02.2.1** → ID-1 (Auth flows) - Save 42 hrs
7. **INF-05.4.1** → DAT-08.5.1 (Hosting) - Save 38-42 hrs
8. Subtotal: **272-300 hours**

### TOTAL AUDIT IMPACT
- **Items to remove**: 126 hours
- **Items to reduce**: 313-405 hours
- **Items to consolidate**: 272-300 hours
- **GRAND TOTAL SAVINGS**: **711-831 hours (-33-38%)**

---

## Final Estimate Comparison

| Category | Original Est. | Post-Audit | Reduction |
|----------|---------------|-----------|-----------|
| Identity & Auth | 186 | 48-56 | -130 (-70%) |
| Profiles | 105 | 92-112 | -0-13 (-0-12%) |
| Attendance | 245 | 88-112 | -133 (-54%) |
| Storage | 304 | 88-120 | -184 (-60%) |
| Infrastructure | 173 | 88-120 | -53-85 (-31-49%) |
| NFT | 357 | 176-224 | -133-181 (-37-47%) |
| Events | ~290 | ~270 | ~20 (~7%) |
| Ticketing | ~280 | ~230 | ~50 (~18%) |
| Financial | ~280 | ~200 | ~80 (~29%) |
| Analytics | ~100 | ~85 | ~15 (~15%) |
| Other | ~50 | ~45 | ~5 (~10%) |
| **TOTAL** | **2,370** | **1,550-1,700** | **~670-820 (-28-35%)** |

---

## Next Steps
1. ✅ Complete requirements audit (12/13 files reviewed)
2. ⏭️ Update estimates.md with corrected hours
3. ⏭️ Create consolidated requirements document
4. ⏭️ Merge duplicate requirements into single user stories
5. ⏭️ Update ARCHITECTURE.md with realistic stack vs. custom breakdown
6. ⏭️ Present findings to team for validation
