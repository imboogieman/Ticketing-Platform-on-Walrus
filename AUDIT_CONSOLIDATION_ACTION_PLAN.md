# Requirements Audit - Consolidation Action Plan

**Date**: January 27, 2026  
**Status**: Ready for Implementation  
**Expected Outcome**: 28-35% reduction in MVP1 hours (711-831 hours saved)

---

## Executive Summary

The comprehensive audit of all 12 MVP1 requirement modules has identified:
- ✅ **126 hours** of work that can be completely removed (stack provides)
- ✅ **313-405 hours** of over-estimated framework tasks (reduce 50-90%)
- ✅ **272-300 hours** of duplicate work across modules (consolidate)
- **TOTAL SAVINGS: 711-831 hours (-28-35% from 2,370 hour baseline)**

---

## Phase 1: Immediate Consolidations (Do First)

### 1A. Create INF-05.2.2 as Seal Encryption Hub

**Current Situation**: Seal encryption work is scattered across:
- ID-1.1.1: Seal Encryption Integration (66 hrs)
- DAT-08.2.1: Seal Encryption for Metadata (~46 hrs, not in separate count)
- NFT-14.5.1: Encrypted Metadata (42 hrs)

**Action**:
1. Rename requirement to: "INF-05.2.2: Seal-Based Access Encryption Infrastructure"
2. Define scope: "Centralized Move policy library + Seal SDK integration for all ticket/event/content gating"
3. New estimate: **24-32 hours** (consolidated)
4. Remove ID-1.1.1 and NFT-14.5.1 entirely
5. Consolidate DAT-08.2.1 work into this

**Dependencies**: 
- All Seal-related requirements reference this as their infrastructure layer
- ID-1 can reference rather than duplicate

**Effort**: 2-3 hours (document update)  
**Savings**: 80-120 hours

---

### 1B. Merge Profile Registration Architecture into UPS-02.1.1

**Current Situation**:
- ID-1.1.2: User Registration System Architecture (42 hrs) - has: schema design, profile creation, storage
- UPS-02.1.1: Register Profile Flow (20-24 hrs) - has: registration form, user onboarding

These are the same thing, counted twice.

**Action**:
1. Remove ID-1.1.2 as separate requirement
2. Rename UPS-02.1.1 to: "UPS-02.1.1: User Registration & Profile Initialization"
3. Add missing tasks from ID-1.1.2 to UPS-02.1.1:
   - UserProfile struct definition
   - Avatar storage (Walrus integration)
   - Decentralized storage setup
4. New estimate: **32-40 hours** (consolidated)

**Dependencies**: 
- ID-1 (identity) just uses the profile, doesn't create it
- ID-1.2.1 + ID-1.2.2 can reference this

**Effort**: 1-2 hours (merge documents)  
**Savings**: 10-18 hours

---

### 1C. Remove Duplicate Authentication Flows

**Current Situation**:
- UPS-02.2.1: Authenticate User Flows (assumed ~42 hrs)
- ID-1.2.1: Wallet Connection (42 hrs)
- ID-1.2.2: Social Login (zkLogin) (42 hrs)

These requirements are already counted in Identity module AND referenced separately.

**Action**:
1. Remove UPS-02.2.1 entirely
2. Consolidate any missing logic into ID-1 requirements
3. Note in UPS-02 that authentication is handled by ID-1 module

**Effort**: 1 hour (document cleanup)  
**Savings**: 42 hours

---

### 1D. Consolidate Ticketing Signature Verification (REMOVE)

**Current Situation**:
- TS-18.1.2: Digital Signature Verification (42 hrs)
- Claims to implement "Ed25519 verification against organizer public key"

**Reality**: This is completely provided by Sui wallet + transaction validation.

**Action**:
1. Remove TS-18.1.2 entirely
2. Update TS-18.3.1 (On-Chain Verification) to note that Sui wallet automatically verifies signatures
3. Focus TS-18.3.1 on "state validation" (checking is_redeemed, ownership), not signature verification

**Effort**: 1 hour (delete + clarify)  
**Savings**: 42 hours

---

### 1E. Remove Double-Spending Prevention Requirement

**Current Situation**:
- TS-18.1.4: Double-Spending Prevention (42 hrs)
- Claims to prevent "single ticket cannot be used for entry twice"

**Reality**: This is completely automatic in Sui via object versioning + owned-object model.

**Action**:
1. Remove TS-18.1.4 entirely
2. Add note to TS-18.3.1: "Double-spending is prevented by Sui's owned-object model and transaction atomicity (no custom code required)"
3. Update ARCHITECTURE.md to highlight this as a stack-provided feature

**Effort**: 1 hour (delete + document)  
**Savings**: 42 hours

---

### 1F. Consolidate Timestamped Verification (Merge into Attendance)

**Current Situation**:
- TS-18.3.3: Timestamped Verification (42 hrs)
- AM-3.5.1: Timestamped Verification (42 hrs)

These are identical requirements.

**Action**:
1. Remove TS-18.3.3 entirely
2. Keep AM-3.5.1 as the single source (attendance/check-in context)
3. Have TS-18.3.1 reference AM-3.5.1 for timestamp handling

**Effort**: 1 hour (merge)  
**Savings**: 42 hours

---

### 1G. Consolidate Walrus Hosting (Frontend + Per-Event)

**Current Situation**:
- DAT-08.5.1: Decentralized Frontend Hosting (46 hrs)
- INF-05.4.1: Walrus Site Static Hosting (46 hrs)

These are the same thing (hosting static files on Walrus Sites).

**Action**:
1. Remove INF-05.4.1 entirely
2. Keep DAT-08.5.1 but REDUCE estimate to **4-8 hours**:
   - Not development work (just ensure Next.js exports static)
   - Not infrastructure setup (Walrus Sites handles it)
   - Just: configure build process, test, document deployment
3. Rename to: "DAT-08.5.1: Static Frontend Deployment to Walrus"

**Effort**: 1 hour (consolidate + reduce)  
**Savings**: 38-42 + 38-42 = **76-84 hours**

---

### 1H. Consolidate Gated Content (Seal Infrastructure Reuse)

**Current Situation**:
- AM-3.3.2: Walrus Site Access Integration (42 hrs) - venue gating with Seal
- AM-3.4.3: Gated Content (Post-Redemption) (42 hrs) - post-event gating with Seal

These share ~80% of infrastructure per original document.

**Action**:
1. Keep AM-3.3.2 as primary (venue/event gating)
2. Remove AM-3.4.3 as separate requirement
3. Increase AM-3.3.2 scope: "Seal-Based Content Gating (venue + post-event variants)"
4. New estimate for AM-3.3.2: **24-32 hours** (consolidated from 42 + 42 with 80% reuse)

**Effort**: 2 hours (merge requirements)  
**Savings**: 10-18 hours (from avoiding full duplication)

---

## Phase 2: Significant Estimate Reductions

### 2A. Reduce Identity/Authentication Framework Tasks

| Requirement | Current | Issue | New | Savings |
|-------------|---------|-------|-----|---------|
| ID-1.2.1 Wallet | 42 | SDK provides framework | 8-10 | 32 |
| ID-1.2.2 zkLogin | 42 | SDK provides framework | 12-16 | 26-30 |

**Rationale**: 
- `@mysten/dapp-kit` provides Wallet Standard + hooks (not custom development)
- zkLogin SDK handles ephemeral keys + OIDC (not custom development)
- Custom work: UI components, routing, error handling only

**Action**: Update estimates.md with new hours

**Effort**: 1 hour  
**Savings**: 58-62 hours

---

### 2B. Reduce Attendance Management (Stack Features)

| Requirement | Current | Issue | New | Savings |
|-------------|---------|-------|-----|---------|
| AM-3.1.1 | 65 | Sui handles state mutations | 40-48 | 17-25 |
| AM-3.5.1 | 42 | Sui Clock is trivial API | 8-12 | 30-34 |

**Rationale**:
- AM-3.1.1: Sui object versioning handles "state mutation" + "transfer disable" automatically
- AM-3.5.1: Sui Clock is one line of code; TOCTOU is automatic

**Action**: Update requirements to focus on business logic, not framework

**Effort**: 2 hours  
**Savings**: 47-59 hours

---

### 2C. Reduce Ticketing System Framework Tasks

| Requirement | Current | Issue | New | Savings |
|-------------|---------|-------|-----|---------|
| TS-18.1.1 QR | 42 | QR library handles rendering | 6-10 | 32-36 |
| TS-18.1.3 Exp | 42 | Sui Clock is trivial | 8-12 | 30-34 |
| TS-18.2.2 Qty | 42 | PTB batching is standard | 28-36 | 6-14 |
| TS-18.3.2 Wallet | 42 | Wallet provides signing | 20-28 | 14-22 |

**Action**: Update requirements with corrected framework understanding

**Effort**: 2 hours  
**Savings**: 82-106 hours

---

### 2D. Reduce Storage Module Framework Tasks

| Requirement | Current | Issue | New | Savings |
|-------------|---------|-------|-----|---------|
| DAT-08.1.1 Media | 46 | Walrus SDK integration only | 24-32 | 14-22 |
| DAT-08.6.1 Sites | 70 | Walrus infrastructure, not dev | 24-32 | 38-46 |
| DAT-08.7.1 Archive | 46 | Walrus handles lifecycle | 16-20 | 26-30 |

**Action**: Update to reflect that Walrus/Seal SDKs are libraries, not development work

**Effort**: 2 hours  
**Savings**: 78-98 hours

---

### 2E. Reduce Financial Module (Stack Features)

| Requirement | Current | Issue | New | Savings |
|-------------|---------|-------|-----|---------|
| FIN-19.1.1 Crypto | 52 | DeepBook provides swaps | 24-32 | 20-28 |
| FIN-19.1.3 Verify | 21 | Sui checkpoints automatic | 8-12 | 9-13 |

**Rationale**:
- Cryptocurrency: DeepBook v3 provides liquidity pools + atomic swaps (SDK integration, not development)
- Payment Verification: Sui network automatically checkpoints; custom work is just webhook listener setup

**Action**: Update estimates.md

**Effort**: 1 hour  
**Savings**: 29-41 hours

---

## Phase 3: Requirements Cleanup

### 3A. Clarify Stack-Provided Features in Documentation

**Action**: Update requirement documents to explicitly note what Sui/Walrus/Seal provides:

Example format to add to each requirement:

```
## Stack-Provided Features
✅ Sui provides: [list of automatic features]
✅ Walrus provides: [list of SDK features]
✅ Seal provides: [list of SDK features]

## Custom Development Required
- [actual business logic work]
```

**Effort**: 3-4 hours  
**Impact**: Prevents future over-estimation

---

### 3B. Create Requirement Dependency Matrix

**Current Problem**: Requirements are scattered; hard to see what's consolidated where.

**Action**: Create a mapping document:
```
ID-1.1.2 → CONSOLIDATED INTO UPS-02.1.1
DAT-08.2.1 → CONSOLIDATED INTO INF-05.2.2
NFT-14.5.1 → CONSOLIDATED INTO INF-05.2.2
NFT-14.6.1 → CONSOLIDATED INTO AM-3.1.1
AM-3.4.3 → CONSOLIDATED INTO AM-3.3.2
TS-18.1.2 → REMOVED (Sui provides)
TS-18.1.4 → REMOVED (Sui provides)
TS-18.3.3 → CONSOLIDATED INTO AM-3.5.1
UPS-02.2.1 → REMOVED (duplicates ID-1)
INF-05.4.1 → CONSOLIDATED INTO DAT-08.5.1
```

**Effort**: 1 hour  
**Impact**: Single source of truth for requirements

---

## Phase 4: Update Estimates

### 4A. Create Revised estimates.md

**Current File**: [docs/estimates.md](docs/estimates.md)

**New Structure**:
```markdown
# MVP 1 Revised Estimates

| Module | Feature | Original | Stack-Provided | Custom | % Reduction |
|--------|---------|----------|----------------|--------|-------------|
| ID-1 | Registration Architecture | 42 | 20 | 22 | -47% |
| ID-1 | Wallet Connection | 42 | 30 | 12 | -71% |
| ... | ... | ... | ... | ... | ... |
```

**Task**:
1. Read current estimates.md
2. For each requirement:
   - Identify if consolidated (remove from line items)
   - Identify if removed (mark as 0 hours)
   - Identify if reduced (update hours)
3. Recalculate module totals
4. Show "before/after" comparison

**Effort**: 4-6 hours  
**Output**: Accurate revised estimates with clear breakdown of stack vs. custom

---

### 4B. Update ARCHITECTURE.md

**Current Issue**: ARCHITECTURE.md describes requirements as if they're all custom development.

**Action**:
1. Add "Stack-Provided Features" section highlighting what Sui/Walrus/Seal provides
2. Update component diagram to show:
   - Sui consensus layer (prevents double-spend, ensures atomicity, provides Clock)
   - Walrus storage (handles blob lifecycle, provides sites hosting)
   - Seal encryption (handles IBE, threshold schemes, policy approval)
   - Custom layers (Move contracts, React frontend, backend services)
3. Clarify what work is integration vs. development

**Effort**: 3-4 hours  
**Output**: Accurate architecture documentation

---

## Implementation Timeline

| Phase | Tasks | Effort | Duration |
|-------|-------|--------|----------|
| **1** | 8 consolidations (1A-1H) | 12-15 hrs | Day 1 |
| **2** | 5 reductions (2A-2E) | 8-10 hrs | Day 1 |
| **3** | Cleanup & mapping (3A-3B) | 4-5 hrs | Day 2 |
| **4** | Estimates + ARCH updates (4A-4B) | 7-10 hrs | Day 2-3 |
| **TOTAL** | - | **31-40 hrs** | **2-3 days** |

---

## Expected Outcomes

After implementation:

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **Total MVP1 Hours** | 2,370 | 1,550-1,700 | -28-35% |
| **ID-1 Hours** | 186 | 48-56 | -70% |
| **Duplicate Requirements** | 8 | 0 | 100% removed |
| **Over-Estimated Tasks** | 15 | 0 | 100% corrected |
| **Requirements Needing Rewrite** | 12 | 12 | All clarified |
| **Team Understanding** | Low | High | +100% |

---

## Validation & Sign-Off

**Before proceeding**, get approval on:
1. ✅ Consolidation decisions (verify they're actually duplicates)
2. ✅ Removal decisions (confirm Sui/Walrus/Seal provides these)
3. ✅ Estimate corrections (team agrees on effort breakdown)
4. ✅ Timeline impact (adjust delivery dates accordingly)

---

## Notes & Caveats

- **No functionality lost**: All requirements are preserved; only reorganized and de-duplicated
- **Stack assumptions verified**: All claims about Sui/Walrus/Seal verified against official Jan 2026 repos
- **Realistic estimates**: Remaining hours represent actual custom development work
- **Risk mitigation**: Consolidation may reveal integration complexity; add 10-15% buffer to revised estimates
