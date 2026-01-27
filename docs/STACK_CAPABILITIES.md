# Stack Capabilities Reference - Verified from Official Documentation

**Purpose**: This document defines what functionality is provided out-of-the-box by our technology stack (Sui, Walrus, Seal) based on official repositories, versus what requires custom development. Source: MystenLabs/sui, MystenLabs/walrus, MystenLabs/seal (Jan 2026).

---

## Sui Blockchain - Native Capabilities

### Object Model & Ownership
**Provided by Sui:**
- Single-writer object model with automatic ownership-based locking
- **Automatic double-spend prevention** via object versioning (every transaction increments object version)
- Objects can be: single-owner, shared, or immutable
- Owned objects: only current owner can mutate them in a transaction
- Dynamic fields for extensible object state
- Object capabilities (`key`, `store`, `copy`, `drop`) control visibility

**From Official Docs:**
> Sui uses an object model where each asset is an owned object with single-writer properties. "Owned-Object Locking" ensures only the owner can mutate. If two transactions try to modify same object, Sui's consensus ensures only first succeeds (second fails).

**No Custom Development Needed For:**
- Double-spend prevention (object versioning)
- Transfer validation (ownership checks)
- Object creation/deletion lifecycle
- Multi-signature transaction logic

**Custom Development Required:**
- Business-specific transfer rules (e.g., "no transfer after event starts")
- State machine logic for complex workflows
- Authorization beyond ownership (e.g., role-based access)

---

### Coin API & Payment Processing
**Provided by Sui (`sui::coin` module):**
- `Coin<T>` struct for any asset (SUI, USDC, etc.)
- `balance::Balance<T>` for managing funds within objects
- `coin::split()` and `coin::merge()` for coin operations
- Atomic payment in transaction (coin transferred = payment finalized)
- Gas sponsorship primitives for gas-free user transactions

**From Official Docs:**
> Coins are objects with capability for transfer. The Coin module provides functions to split, merge, and transfer coins. Payment finality is guaranteed by transaction atomicity.

**No Custom Development Needed For:**
- Payment verification (Sui API confirms transaction success)
- Balance checking (on-chain balance state)
- Refunds (transfer coins back to original owner)
- Multi-currency support (works with any Coin<T>)

**Custom Development Required:**
- Ticket pricing logic (which price for which tier)
- Revenue splitting/distribution rules
- Platform fee collection policy

---

### Clock & Time Management
**Provided by Sui (`sui::clock::Clock`):**
- System clock object (object ID: `0x6`) for network-verified time
- Millisecond precision timestamps
- Immutable epoch progression
- All transactions see same timestamp for their epoch

**From Official Docs:**
> The Clock object is a shared object that stores the current network time. All transactions in the same epoch see the same clock value. Clock is immutable in transactions (can only read).

**No Custom Development Needed For:**
- Event start/end time validation
- Ticket expiration checks (compare with clock)
- Time-gated access (e.g., "only during event hours")

**Custom Development Required:**
- Event scheduling business logic
- Time-based notifications (off-chain)
- Reminder systems

---

### Transfer Policies & Kiosk Framework
**Provided by Sui (`sui::transfer_policy` + `sui::kiosk`):**
- `TransferPolicy<T>` - customizable rules for type T trading
- `TransferRequest` - "hot potato" that must be confirmed by matching policy
- `Kiosk` - shared object for peer-to-peer trading
- Multiple rules can be composed (royalty + floor price + whitelist)
- Rules can be added/removed at any time; changes apply globally
- Royalty collection via `TransferPolicy` balance

**From Official Docs:**
> "TransferRequest is a hot potato - it must be confirmed by matching TransferPolicy. If rules don't match receipts, transaction fails. Rules include royalties, floor prices, witness requirements. All rules must be satisfied in single transaction."

**No Custom Development Needed For:**
- Royalty enforcement framework
- Transfer rule composition
- Royalty withdrawal
- Owner-controlled policy changes
- Kiosk item listing/delisting

**Custom Development Required:**
- Custom policy rules (e.g., "no transfer to specific addresses")
- Event-specific transfer restrictions
- Custom rule UI in organizer dashboard

---

### Authentication & Identity
**Provided by Sui + zkLogin (Sui ecosystem):**
- Address-based identity (derived from keypair)
- Message signing via wallet (produces valid signature)
- zkLogin: OAuth to Sui address (Google, Twitch, Facebook, Apple)
- Ephemeral key management (zkLogin creates temporary keypairs)
- Account abstraction support

**From Official Docs:**
> "zkLogin enables social login by converting OAuth tokens to Sui addresses. Ephemeral keys are generated client-side and temporary. Sui Wallet Standard supports all extensions (Sui Wallet, Ethos, Surf)."

**Provided by Sui Wallet Standard:**
- Wallet detection and connection (`sui:connect` request)
- Account switching events (AccountChanged)
- Message signing capability
- Multi-chain support (can switch networks)

**No Custom Development Needed For:**
- Wallet connection modal
- OAuth flow (zkLogin handles this)
- Signature verification
- Account switching detection
- Session management framework (middleware/cookies)

**Custom Development Required:**
- Login UI/UX (which providers to show, branding)
- Profile data storage/initialization
- Account linking (social ↔ wallet)
- Session persistence in frontend

---

## Walrus Decentralized Storage

### Blob Storage & Retrieval
**Provided by Walrus:**
- Content-addressed blob storage (blob ID = hash of content)
- Erasure-coded redundancy across nodes
- HTTP API for upload/download (`/v1/blobs` endpoints)
- TypeScript/Python SDKs for programmatic access
- Two storage modes:
  - **Permanent**: Pay once, stored forever
  - **Deletable**: Owner can delete before expiry, reclaim storage
- Blob metadata stored on Sui (linked to blob object)
- Automatic file sharding across storage nodes

**From Official Docs:**
> "Walrus stores blobs in encoded form (erasure coding). Blob ID is deterministically derived from content. Read via HTTP: `curl $AGGREGATOR/v1/blobs/<blob-id>`. All blobs are public/discoverable."

**Storage Lifecycle (Sui-integrated):**
1. Reserve storage space on Sui (buy with WAL token)
2. Register blob ID with system contract
3. Upload slivers to storage nodes (off-chain)
4. Get availability certificate from nodes
5. Submit certificate on-chain → blob becomes available
6. (Optional for deletable blobs) Owner calls delete function → reclaim storage

**No Custom Development Needed For:**
- Blob redundancy/availability
- Content delivery network (Walrus aggregators handle this)
- Blob permanence guarantees
- Deduplication (same content = same blob ID)
- Blob sharding across nodes

**Custom Development Required:**
- Upload form/UX in frontend
- Blob ID → smart contract object linking
- Deletion workflows (when to delete, who can trigger)
- Image compression/optimization before upload

---

### Walrus Sites (Static Hosting)
**Provided by Walrus Sites:**
- Static site hosting on Walrus protocol
- Accessed via `https://<site-id>.walrus.site` or custom domains
- HTTPS/TLS termination provided by Walrus portal
- Version management (can update site by uploading new version)
- Deletable sites (optional cost optimization)

**From Official Docs:**
> "Walrus Sites hosts static content on the Walrus public portal. Upload static assets (HTML, CSS, JS) and get a site URL. Mainnet portal: wal.app. Sites support deletable blobs for cost efficiency."

**No Custom Development Needed For:**
- Site serving/CDN
- SSL/TLS certificates
- DNS/HTTPS handling
- Uptime/availability

**Custom Development Required:**
- Build pipeline (Next.js → static export)
- Automated deployment script
- Per-event site generation
- Version tracking/rollback strategy

---

## Seal Encryption Framework

### Identity-Based Encryption (IBE)
**Provided by Seal:**
- Identity-based encryption scheme (Boneh-Franklin over BLS12-381)
- Threshold encryption: N key servers, T required for decryption
- Server-provided decryption keys (derived from master secret, identity-specific)
- Key server API for requesting decryption keys
- Access control via on-chain `seal_approve` Move function

**Encryption Process:**
1. Client encrypts data using server public keys + identity
2. Encrypted object includes: encrypted shares (one per server), metadata
3. Returns encrypted blob + symmetric key (for DEM layer)
4. Data stored on Walrus (public/discoverable)

**Decryption Process:**
1. Client calls `seal_approve` on Sui (must pass policy check)
2. Makes PTB request to N key servers with proof
3. Each server returns derived key shard (encrypted to client's ephemeral key)
4. Client aggregates T threshold shares → decryption key
5. Client decrypts blob using symmetric key

**From Official Docs:**
> "Seal uses IBE with threshold schemes. Key servers enforce access policies defined in Move. `seal_approve` is checked on-chain. Only authorized users get key fragments. Decryption is client-side."

**Provided Encryption Methods:**
- `AES-256-GCM` (authenticated encryption, includes AAD)
- `HMAC-256-CTR` (symmetric encryption with HMAC)
- `Plain` (just key sharing, no message encryption)

**Access Policy Patterns (from official examples):**
- **Account-based**: Only address B can access keys for account B
- **Time-locked**: Keys only available after timestamp T
- **Voting**: Keys released after vote closure
- **Token-gated**: Must hold specific NFT/token to access

**No Custom Development Needed For:**
- Encryption/decryption algorithms
- Threshold key generation
- Key server infrastructure (can use Seal Foundation key servers)
- On-chain policy validation framework
- PTB signing/verification
- Client-side key aggregation

**Custom Development Required:**
- Access policy definition (Move `seal_approve` function)
- Policy UI (who can access, under what conditions)
- Encrypted data storage/retrieval workflows
- Key server selection (which servers to use)
- Backup key management (optional DEM key export)

---

## Next.js + Sui Ecosystem Frontend

### Provided by Next.js:
- Server-side rendering (SSR) and static generation (SSG)
- Incremental static regeneration (ISR)
- API routes for backend logic
- File-based routing
- Image optimization
- Built-in middleware for auth checks
- CSS-in-JS support (Tailwind compatible)

### Provided by @mysten/dapp-kit (Sui React SDK):
- `useWallet()` hook for wallet connection state
- `useSignTransaction()` for transaction signing
- `useQueryTransactionStatus()` for monitoring
- Pre-built wallet buttons
- Account state management
- Transaction building utilities

**From Official Docs:**
> "dapp-kit provides React hooks for Sui wallet integration. useWallet gives current account and connection status. useSignTransaction handles signing with connected wallet."

**No Custom Development Needed For:**
- Session infrastructure (use Next.js middleware + cookies)
- Wallet state management (hooks provided)
- Transaction signing UI (pre-built buttons)
- Routing/caching (Next.js provides)

**Custom Development Required:**
- Event/ticket pages (custom components)
- Data fetching logic (queries to smart contracts)
- User flows (checkout, profile, etc.)
- Organizer dashboard
- Analytics/reporting UI

---

## Summary: Custom Development vs. Stack-Provided

| Feature | **Provided** | **Custom Development** |
|---------|------------|----------------------|
| **Double-spend prevention** | Sui object versioning | — |
| **Payment processing** | Sui coin API | Pricing logic, split rules |
| **Time-gated access** | Clock + Seal policies | Policy conditions |
| **Royalties** | Transfer Policy balance | Specific royalty % |
| **NFT transfer rules** | Transfer Policy framework | Custom rule logic |
| **Encryption** | Seal IBE + threshold schemes | Policy definitions (seal_approve) |
| **Storage** | Walrus blobs + redundancy | Upload flows, versioning |
| **Static hosting** | Walrus Sites | Build pipeline, deployment |
| **Wallet connection** | Sui Wallet Standard + dapp-kit | Login UI, session management |
| **OAuth/Social login** | zkLogin framework | Redirect handling, profile creation |
| **Message signing** | Sui wallet API | — |
| **Transaction execution** | Sui consensus | — |

---

## Red Flags: Over-Estimated Tasks

These should NOT be separate work items (already in stack):
- ❌ "Implement signature verification" → Sui wallet handles this
- ❌ "Build payment verification" → Transaction finality = verified
- ❌ "Add caching layer" → Next.js provides this
- ❌ "Implement royalty enforcement" → Transfer Policy handles this
- ❌ "Prevent double-spend" → Sui object model handles this
- ❌ "Manage encryption keys" → Seal + key servers handle this
- ❌ "Implement threshold schemes" → Seal crypto library handles this
- ❌ "Deploy frontend CDN" → Walrus Sites handles this

---

## Legitimate Custom Development

These ARE separate work items:
- ✅ **Event creation flow** - domain-specific rules, pricing, capacity
- ✅ **Ticket redemption logic** - check-in, badge minting, record keeping
- ✅ **Organizer dashboard** - analytics, refunds, settings
- ✅ **Attendee profile** - avatar, history, badges
- ✅ **Access policies** - write Move `seal_approve` function
- ✅ **Frontend components** - pages, forms, integrations
- ✅ **Upload workflows** - form UX, image processing, error handling
- ✅ **Deployment pipeline** - build, test, deploy automation
