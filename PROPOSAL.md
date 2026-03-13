# Ticketing Platform on Walrus — RFP Proposal

## 1. Project Name

**Ticketing Platform on Walrus**

A decentralized event ticketing platform built on the Sui blockchain with Walrus decentralized storage and Seal encryption.

---

## 2. Purpose

### Current Challenge

- Traditional event ticketing platforms are plagued by centralized control, opaque resale markets, rampant ticket fraud, excessive intermediary fees, and a complete lack of verifiable proof-of-attendance. 
- Ticket holders have no true ownership of their tickets, data is siloed in proprietary systems, and organizers have limited transparency into the secondary market. 
- Additionally, attendee participation history is not portable or composable across platforms, preventing meaningful loyalty programs or ecosystem-wide engagement tracking.

### Proposed Solution

The Ticketing Platform on Walrus is a fully decentralized event and ticketing dApp powered by the Sui blockchain (Layer 1), Walrus decentralized storage, and Seal encryption. It replaces centralized ticketing infrastructure with:

- **NFT-based tickets** minted on Sui, providing verifiable, on-chain ownership that can be cryptographically proven.
- **Decentralized event data storage** on Walrus, eliminating single points of failure and ensuring event metadata persists immutably.
- **Seal-encrypted ticket metadata**, protecting sensitive attendee information while enabling permissioned access.
- **Soulbound Attendance NFTs**, providing non-transferable proof-of-presence that feeds into loyalty systems, airdrops, and ecosystem-wide reputation.

The platform serves event organizers (creation, sales tracking, attendee verification, revenue withdrawal), existing ticketing platforms (permissionless integration of on-chain verification and composable attendance data behind existing infrastructure), and attendees (browsing, purchasing, ticket presentation, reward collection) through a modern Next.js frontend with native Sui wallet and zkLogin integration.

Critically, the platform's on-chain attendance data creates a **composable data layer** that increases in value with each integrated venue and event. Existing ticketing platforms are the primary vehicle for bootstrapping this data layer at scale — a single mid-size platform integration brings hundreds of events and thousands of attendees, reaching the data density required for third-party products (reputation scores, loyalty aggregation, analytics) far faster than organic event-by-event growth.

### Key Features

- **NFT Tickets**: Each ticket is a unique on-chain object with encrypted metadata, verifiable ownership, and configurable transferability.
- **Soulbound Attendance NFTs**: Non-transferable proof-of-presence badges issued upon check-in, unlocking post-event content and loyalty rewards.
- **Walrus Decentralized Storage**: Event assets (images, descriptions, supplemental materials) stored on Walrus with no single point of failure.
- **Seal Encryption**: Sensitive ticket data is encrypted using Seal technology, with policy-gated decryption for authorized parties.
- **Dynamic QR Verification**: 30-second rotating QR codes with EpochSalt hashing for tamper-proof venue gate verification.
- **zkLogin Authentication**: Social login (Google/Facebook/Apple) that creates Sui wallets behind the scenes, removing Web3 onboarding friction.
- **On-Chain Financial Operations**: Transparent payment processing, organizer proceeds withdrawal, and auditable revenue flows — all on-chain.
- **Composable Attendance Data**: Attendance history is on-chain and queryable, enabling third-party integrations for airdrops, loyalty programs, and reputation systems. The data layer's value compounds with each integrated venue — existing ticketing platforms bootstrap this to developer-ready density far faster than organic growth.
- **Anti-Scalping Protections**: Transfer policies with royalty enforcement and price circuit-breakers (max 120% of face value) via Sui Kiosk integration.

---

## 3. Target Audience

### 3.1 Event Organizers

**Persona**: Conference planners, festival promoters, workshop hosts, corporate event managers, and community leaders. Blockchain experience is low to moderate — they may have used crypto but are not necessarily developers.

**Accessibility Goals**:
- **Intuitive Dashboard**: A guided event creation flow (name, dates, venue, capacity, pricing) that feels like any modern SaaS admin panel — no blockchain terminology exposed.
- **One-Click Financial Operations**: Withdraw ticket revenue, view real-time sales analytics, and export tax-ready reports directly from the organizer dashboard.
- **Automated Attendance Tracking**: After scanning a ticket at the gate, the system automatically issues a Proof-of-Attendance badge to the attendee — no manual steps.
- **Responsive Design**: Fully responsive layout supporting desktop, tablet, and mobile form factors for on-site event management.

---

### 3.2 Existing Ticketing Platforms

**Persona**: Mid-size and regional ticketing marketplaces (e.g., venue networks, festival platforms) that integrate the Sui verification layer behind their existing checkout, scanner, and loyalty infrastructure — without replatforming. They dual-issue NFT tickets alongside traditional PDF tickets, cross-verify at venue gates via on-chain state, and build cross-venue loyalty programs from composable attendance data. Blockchain experience: low to moderate — backend engineers comfortable with REST/SDK integrations; no blockchain expertise required from end users or venue staff.

**Accessibility Goals**:
- **Drop-In Backend SDK**: A TypeScript/Python SDK that plugs into existing checkout flows (Stripe, PayPal) to mint an NFT ticket as a background side-effect — zero changes to the customer-facing UI.
- **Custodial Wallet Service**: End users receive NFT tickets without needing their own Sui wallet; they can optionally claim to a personal wallet later.
- **Gate Verification API**: A single REST endpoint for scanner apps that returns ticket verification status — replacing the platform's existing fraud-check with an immutable on-chain source of truth.
- **Migration Guide**: Step-by-step documentation for Node.js, Python, and Java backends covering checkout hook placement, scanner modifications, loyalty database schema, and fallback behavior.

#### Integration Tiers

Existing ticketing platforms can integrate the Sui verification layer at three depth levels without replatforming:

**Tier 1 — Read-Only Verification (No partnership required)**
Any marketplace can query on-chain ticket and attendance state via the Sui network's standard RPC interface to verify ticket authenticity and check attendance history. This eliminates fraud at venue gates by cross-checking the immutable on-chain verification status — even if the marketplace's own database is compromised. Cost: an indexer server (~$200/mo) and Sui RPC access.

**Tier 2 — API & SDK Integration (Developer Platform)**
Marketplaces use the platform's GraphQL API, webhook subscriptions (ticket sold, attendance recorded), and SDK to dual-issue NFT tickets alongside their existing PDF/email tickets, build cross-venue loyalty from composable on-chain attendance data, and surface verifiable audience insights to sponsors. Their customers continue using credit cards, receiving PDF tickets, and scanning QR codes — the blockchain layer is invisible.

**Tier 3 — Smart Contract Composition (Deep Integration)**
Marketplaces import the platform's published Move modules into their own smart contracts to extend transfer policies, compose custom loyalty mechanics on top of verified attendance records, or build venue-specific checkout flows that interact with the ticketing contracts directly.

#### Business Impact

| Metric | Before Integration | After Integration |
|--------|-------------------|-------------------|
| Fraud-related support costs | ~12–15% of ticket volume | <2% (on-chain verification) |
| Cross-venue loyalty data | None (siloed per venue) | Full composable history across all integrated venues |
| Sponsor data packages | Self-reported, unverifiable | On-chain verified, auditable attendance proofs |
| Integration cost | — | 1 backend dev for 4–6 weeks + ~$250/mo infrastructure |

---

### 3.3 Event Attendees

**Persona**: Conference-goers, music/sports fans, workshop participants, community members, and Web3 enthusiasts. Blockchain experience ranges from none (first-time users) to high (crypto-native).

**Accessibility Goals**:
- **zkLogin Social Authentication**: Users sign in with Google, Facebook, or Apple — a Sui wallet is auto-created and managed behind the scenes. No seed phrases, no browser extensions, no crypto knowledge required.
- **Familiar Purchase Flow**: Browse events → select tickets → pay → receive confirmation. The experience mirrors standard e-commerce; blockchain mechanics are entirely invisible.
- **Progressive Disclosure**: Casual users see a clean, simplified interface. Power users can optionally access on-chain details (transaction hashes, explorer links, object IDs).
- **Wallet Flexibility**: Supports both native Sui Wallet (for crypto-savvy users) and zkLogin (for mainstream users), meeting users where they are.

---

### 3.4 Ecosystem Partners

**Persona**: Sponsor brands, loyalty program operators, and venue networks seeking verifiable audience data for campaign targeting, member engagement, and market research. Blockchain experience: none required — all interactions through managed dashboards and structured data exports.

**Accessibility Goals**:
- **Sponsor Dashboard**: Non-technical sponsor staff can view verifiable audience insights (attendance counts, demographic breakdowns, cross-event overlap) through a web dashboard.
- **Privacy-Compliant Data Exports**: Anonymized, aggregated attendance analytics with differential privacy guarantees, ready for market research without exposing individual attendee identities.
- **Verifiable Audience Proofs**: Sponsors receive on-chain verified attendance data — not self-reported surveys — enabling trustworthy ROI measurement for event sponsorships.

> Partners requiring programmatic access (APIs, webhooks, SDKs) use the developer tools described in §3.5.

---

### 3.5 Developers

**Persona**: Third-party builders integrating attendance data and building products on top of composable on-chain event history. Includes token distribution builders (airdrops gated by verified attendance) and smart contract composers (extending the platform's Move modules). Blockchain experience: moderate to high.

**Accessibility Goals**:
- **GraphQL API & Developer Portal**: A hosted API with interactive sandbox, auto-generated SDK, and comprehensive documentation — developers can test queries and generate API keys without deploying any infrastructure.
- **Move Package Composability**: The platform's smart contract modules are published and importable, allowing developers to build reputation scores, custom loyalty mechanics, or governance systems that read verified attendance data directly on-chain.
- **Webhook Relay**: Subscribe to on-chain state changes via standard webhook endpoints without running a blockchain node.
- **Open & Permissionless**: All attendance data is publicly queryable on the Sui network — no API key, partnership agreement, or licensing fee required to start reading and building.

---

### Audience Sequencing & Data Bootstrapping Strategy

The personas above follow a **strategic activation order** — each depends on the preceding ones to generate value:

1. **Event Organizers** → events and ticket supply.
2. **Existing Ticketing Platforms** → existing event volume at scale, bootstrapping the on-chain data layer to critical mass.
3. **Event Attendees** → verified attendance records.
4. **Ecosystem Partners** → loyalty programs and sponsor activations built on meaningful data.
5. **Developers** → products on the composable data layer, viable only after sufficient volume and historical depth exist.

Developers are a **trailing audience** — their products require dense, multi-venue attendance data. The fastest path to data density is platform integrations, not organic event-by-event growth. Products become viable progressively: single-event airdrops from Day 1, cross-venue loyalty after the first platform integration, and full reputation scoring after 3+ integrations.

> **See**: [DEV-06.4 — Data Bootstrapping & Developer Ecosystem Readiness](docs/requirements/mvp_02/06%20-%20Developer_Platform_DEV-06.md) for detailed maturity stages, pre-conditions, and third-party product categories.

---

## 4. Project Versions (Iterative Approach)

### Version 1: Minimum Viable Product (MVP)

Core end-to-end event ticketing on Sui with Walrus storage. Duration: **2 months**.

**Feature 1 — UX Design & Design System** *(→ [UXD-00](docs/requirements/mvp_01/00%20-%20UX_Design_UXD-00.md))*
- *Designer* shall conduct user research, define site maps and user flows, produce wireframes for 15–20 key screens, establish a design system (colors, typography, components), and deliver high-fidelity mockups with interactive prototypes — all front-loaded before feature development begins.
- **Testing plan**: Design review sign-offs per phase. Accessibility audit (WCAG 2.1 AA). Usability testing with representative organizers and attendees.

**Feature 2 — Technical Infrastructure** *(→ [INF-05](docs/requirements/mvp_01/05%20-%20Technical_Infrastructure_INF-05.md))*
- *System* shall provide the foundational blockchain layer: multi-network configuration (devnet/testnet/mainnet), transaction batching for gas fee optimization, sponsored transactions for frictionless UX, and a reusable Seal encryption infrastructure shared across tickets, events, and content gating.
- **Testing plan**: Multi-network deployment verification. Gas cost benchmarking per transaction type. Seal encrypt/decrypt round-trip tests.

**Feature 3 — Identity & Authentication** *(→ [ID-01](docs/requirements/mvp_01/01%20-%20Identity_and_Authentication_ID-01.md), [UPS-02](docs/requirements/mvp_01/02%20-%20User_Profile_System_UPS-02.md))*
- *Attendee/Organizer* shall be able to connect a Sui-compatible wallet or sign in via social login (Google/Facebook/Apple) with an auto-created Sui wallet, create an on-chain user profile, and maintain a persistent session across visits.
- **Testing plan**: Manual testing across supported wallet providers. End-to-end tests for each social login provider. Session persistence and expiration tests.

**Feature 4 — Event Creation & Discovery** *(→ [EMS-07](docs/requirements/mvp_01/07%20-%20Event_Management_System_EMS-07.md))*
- *Organizer* shall be able to create events with name, description, location, dates, capacity, multi-currency pricing (SUI/USDC/DEEP with tier-based options), and visibility settings (public, unlisted, or private with invite list). *Attendee* shall be able to discover events via full-text search and category filters.
- **Testing plan**: Automated tests for event creation validation (invalid dates, zero capacity, pricing edge cases). Frontend integration tests for the creation flow. Search and filter accuracy tests.

**Feature 5 — NFT Ticket Implementation** *(→ [NFT-06](docs/requirements/mvp_01/06%20-%20NFT_Implementation_NFT-06.md))*
- *System* shall mint each ticket as a unique on-chain NFT with standardized metadata (Sui Object Display), configurable transferability, and dynamic state updates (e.g., marking a ticket as redeemed after use).
- **Testing plan**: Automated tests for ticket minting invariants and metadata display. State update and event emission tests. Unauthorized modification prevention tests.

**Feature 6 — Ticket Purchase & QR Verification** *(→ [TS-08](docs/requirements/mvp_01/08%20-%20Ticketing_System_TS-08.md))*
- *Attendee* shall be able to browse events, select tickets, and complete a purchase. Each ticket generates a dynamic rotating QR code (refreshed every 30 seconds) for tamper-proof venue entry. *Organizer* shall be able to verify ticket authenticity in real time via on-chain state at the venue gate.
- **Testing plan**: Automated tests for purchase flow (sold-out prevention, payment validation). QR rotation and verification tests. Manual venue simulation testing.

**Feature 7 — Attendance Check-In & Badge Minting** *(→ [AM-03](docs/requirements/mvp_01/03%20-%20Attendance_Management_AM-03.md))*
- *Organizer* shall be able to scan an attendee's QR code, which atomically redeems the ticket and issues a non-transferable Soulbound Attendance Badge — recording check-in time and event details on-chain in a single transaction.
- **Testing plan**: Automated tests for atomic redeem-and-mint flow. Double-check-in prevention tests. Organizer-only authorization tests.

**Feature 8 — Walrus Decentralized Storage** *(→ [DAT-04](docs/requirements/mvp_01/04%20-%20Data_Preservation_and_Storage_DAT-04.md))*
- *Organizer* shall be able to upload event media (images, descriptions) to Walrus decentralized storage, with each file's unique identifier linked on-chain for tamper-proof retrieval. The platform frontend shall be deployable as a fully decentralized Walrus Site.
- **Testing plan**: Upload/retrieve round-trip tests. File integrity verification. Walrus Sites deployment and accessibility tests.

**Feature 9 — Payment Processing** *(→ [FIN-09](docs/requirements/mvp_01/09%20-%20Financial_Operations_FIN-09.md))*
- *Attendee* shall be able to pay for tickets using SUI or USDC (with automatic currency conversion). *Organizer* shall receive 95% of ticket revenue with a 5% platform fee, and shall be able to withdraw accumulated proceeds from the event balance at any time.
- **Testing plan**: Automated tests for payment splitting and withdrawal. Currency conversion integration tests. Payment finality verification tests.

---

### Version 2: Enhanced Features

Extended capabilities from the remaining [MVP 01 requirements](docs/requirements/mvp_01/) — marketplace, Soulbound Token standards, loyalty, analytics, and financial compliance. Duration: **2 months** (months 3–4).

**Feature 10 — User Profiles, History & Badge Gallery** *(→ [UPS-02](docs/requirements/mvp_01/02%20-%20User_Profile_System_UPS-02.md))*
- *Attendee* shall be able to upload a profile avatar (hosted on Walrus with auto-generated fallback), view a "My Journey" attendance history timeline, and browse a "Trophy Case" gallery displaying all earned Soulbound Attendance Badges.
- **Testing plan**: Avatar upload and fallback tests. Attendance history display and ordering tests. Badge gallery rendering and filtering tests.

**Feature 11 — Event Lifecycle Management** *(→ [EMS-07](docs/requirements/mvp_01/07%20-%20Event_Management_System_EMS-07.md))*
- *Organizer* shall be able to cancel an event (with automated batch refunds to all ticket holders), update event details and venue information (with version history), and generate downloadable calendar files (ICS) for attendees.
- **Testing plan**: Automated tests for cancel and batch refund flow. Metadata version history tests. Calendar file format validation.

**Feature 12 — Transfer Policies & Secondary Marketplace** *(→ [TS-08](docs/requirements/mvp_01/08%20-%20Ticketing_System_TS-08.md))*
- *Attendee* shall be able to list transferable tickets on a Sui Kiosk-based secondary marketplace with organizer-defined royalties and anti-scalping price caps (max 120% of face value). *Attendee* shall be able to purchase up to 10 tickets in a single batch transaction. Expired tickets shall be automatically reclaimed.
- **Testing plan**: Automated tests for marketplace listing, purchase, royalty collection, and price cap enforcement. Batch purchase atomicity tests. Expiration lifecycle tests.

**Feature 13 — Soulbound Token (SBT) Standards** *(→ [NFT-06](docs/requirements/mvp_01/06%20-%20NFT_Implementation_NFT-06.md))*
- *System* shall enforce formal non-transferability for Attendance Badges — preventing any transfer, marketplace listing, or secondary sale. Organizers shall be able to revoke badges when necessary. Used tickets shall be atomically converted into Soulbound Badges upon check-in.
- **Testing plan**: Automated tests verifying transfer attempts are rejected. Burn and revocation tests. Marketplace listing prevention tests.

**Feature 14 — Seal-Based Content Gating** *(→ [AM-03](docs/requirements/mvp_01/03%20-%20Attendance_Management_AM-03.md))*
- *Attendee* shall be able to access encrypted premium content — pre-event materials unlocked by ticket ownership, and post-event recordings unlocked by verified attendance. Access is enforced by on-chain encryption policies.
- **Testing plan**: Automated tests for ticket-gated and badge-gated access approval. End-to-end test of encrypted content delivery and decryption.

**Feature 15 — Data Management & Archival** *(→ [DAT-04](docs/requirements/mvp_01/04%20-%20Data_Preservation_and_Storage_DAT-04.md))*
- *Attendee* shall be able to request deletion of off-chain personal data (on-chain records remain immutable). *Organizer* shall be able to deploy dedicated per-event Walrus Sites and permanently archive completed events for long-term preservation.
- **Testing plan**: Deletion compliance verification. Per-event site provisioning tests. Archival and retrieval tests.

**Feature 16 — Fiat On-Ramp & Financial Compliance** *(→ [FIN-09](docs/requirements/mvp_01/09%20-%20Financial_Operations_FIN-09.md), [INF-05](docs/requirements/mvp_01/05%20-%20Technical_Infrastructure_INF-05.md))*
- *Attendee* shall be able to purchase tickets using fiat currency (credit/debit cards via Banxa or Stripe) with automatic wallet binding, light identity verification, and price lock at checkout. *Attendee* shall be able to view a personal transaction history with downloadable receipts. *System* shall record immutable financial audit trails for regulatory compliance (CARF).
- **Testing plan**: Fiat payment reconciliation tests. Receipt generation and verification tests. Audit trail immutability tests. Transaction validation accuracy tests.

**Feature 17 — Analytics & Reporting** *(→ [AR-06](docs/requirements/mvp_01/11%20-%20Analytics_and_Reporting_AR-06.md))*
- *Organizer* shall be able to access ticket sales reports with multi-currency reconciliation and CSV export. *System* shall provide anonymized data exports with differential privacy guarantees. Platform success metrics (retention rates, satisfaction scores) shall be computed without exposing individual attendee data.
- **Testing plan**: Data aggregation accuracy tests. Privacy guarantee verification. Report export format validation.

**Feature 18 — Loyalty & Rewards** *(→ [LRW-04](docs/requirements/mvp_01/12%20-%20Loyalty_and_Rewards_LRW-04.md))*
- *Attendee* shall earn loyalty tokens upon ticket redemption, progress through reward tiers (Bronze → Silver → Gold → Platinum) with VIP multipliers, and redeem tokens for discount codes on future events. Gamified achievements, optional point transfers between users, and a 1-year expiry policy shall be supported.
- **Testing plan**: Automated tests for point awards, tier transitions, and discount redemption. Multi-event loyalty accumulation tests. Expiry logic tests.

---

### Future Versions: Long-Term Vision

Post-MVP capabilities from the [MVP 02 requirements](docs/requirements/mvp_02/README.md), extending the platform with communication, developer tools, financial extensions, physical operations, and growth features.

**Feature 19 — Communication & Engagement** *(→ [CM-01](docs/requirements/mvp_02/01%20-%20Communication_and_Engagement_CM-01.md), [PD-05](docs/requirements/mvp_02/07%20-%20Platform_Deliverables_Communication_PD-05.md))*
- *Organizer* shall be able to broadcast alerts, schedule change notifications, and important announcements to ticket holders. *Attendee* shall be able to participate in token-gated event chat, receive automated reminders, and receive personalized communications based on their ticket tier. Messaging channels shall be encrypted.

**Feature 20 — Content & Materials Distribution** *(→ [CNT-02](docs/requirements/mvp_02/02%20-%20Content_and_Materials_CNT-02.md))*
- *Speaker* shall be able to upload presentation materials (slides, code samples, files) to decentralized storage, linked to their specific session. *Attendee* shall access tier-gated content based on their ticket level.

**Feature 21 — Financial Extensions — Escrow & Dynamic Pricing** *(→ [FEX-03](docs/requirements/mvp_02/03%20-%20Financial_Extensions_FEX-03.md))*
- *System* shall hold ticket payments in escrow with time-locked release for buyer protection. *Organizer* shall be able to configure dynamic pricing tiers (Early Bird / GA / VIP) with demand-based switching and partner NFT discounts. *Attendee* shall be able to request self-service refunds with a pro-rata declining refund schedule.

**Feature 22 — Growth & Marketing** *(→ [GMK-05](docs/requirements/mvp_02/05%20-%20Growth_and_Marketing_GMK-05.md))*
- *Attendee* shall be able to generate referral links and earn on-chain commissions for referred ticket sales. *Attendee* shall be able to opt in to share profile data for lead capture and networking. *Sponsor* shall be able to manage booth activations, gamified engagements (raffles, scavenger hunts), and view real-time engagement analytics.

**Feature 23 — Developer Platform** *(→ [DEV-06](docs/requirements/mvp_02/06%20-%20Developer_Platform_DEV-06.md))*
- *Developer* shall be able to access a GraphQL API with interactive sandbox and auto-generated SDKs, authenticate via OAuth2 for enterprise integrations, and build on published smart contract modules. *Platform* shall provide a white-label mobile event app framework and a Marketplace Integration Kit for existing ticketing platforms (see §3.2 Integration Tiers).

**Feature 24 — Multi-Track Event Support** *(→ [EVX-08](docs/requirements/mvp_02/08%20-%20Event_Extensions_EVX-08.md))*
- *Organizer* shall be able to create multi-track events (conferences, festivals) with track-based registration, per-track pricing, bundled passes, track-specific encrypted access control, and separate Attendance Badges per track.

**Feature 25 — Physical Operations — Badge Printing & NFC** *(→ [PHY-09](docs/requirements/mvp_02/09%20-%20Physical_Operations_PHY-09.md))*
- *Organizer* shall be able to generate printable QR badges (bulk and on-site kiosk) and encode NFC wristbands with challenge-response security. *Staff* shall be able to use a mobile scanner app with offline validation for sub-second contactless entry verification.

---

## 5. Technology and Tools

### Frontend (hosted on Walrus Sites)

**Next.js 14** for full-stack frontend development
Decision rationale: Industry standard; familiar to the team with production experience. Provides all features the product requires: App Router with dynamic page routes, serverless functions, API routes, and static export capability required for Walrus Sites hosting.

**React 18** for UI component development
Decision rationale: Dominant frontend library with the largest ecosystem. Concurrent rendering keeps the UI responsive during blockchain transaction waits. Familiar to the team.

**TypeScript 5.3** for type-safe development
Decision rationale: Catches errors at compile time and produces self-documenting code. Essential for complex Sui SDK type signatures and transaction builder correctness. Used across the entire stack (frontend, backend, indexer).

**Tailwind CSS 3.4** for styling and design system
Decision rationale: Utility-first approach enables rapid, consistent UI development. Small production bundle via automatic purging. Built-in responsive design primitives. The frontend team has production experience delivering design systems with Tailwind.

**@tanstack/react-query 5** for server state management
Decision rationale: Handles async data fetching, caching, and optimistic UI updates — critical for managing blockchain transaction states and Walrus data retrieval without manual state synchronization.

### Blockchain

**Sui (Layer 1)** as the primary blockchain network
Decision rationale: Object-centric data model is ideal for NFT tickets (each ticket is a first-class on-chain object). Sub-second finality (~400ms). Move language safety guarantees. Native support for shared objects, programmable transaction blocks, and Kiosk marketplace. The team has direct Sui development experience.

**Move (2024 edition)** for smart contract development
Decision rationale: Resource-oriented programming prevents double-spending by design. Linear type system provides safety guarantees that Solidity cannot. Native Sui integration with object ownership primitives. The smart contract team has experience across all platform modules (event, ticket, attendance, loyalty, soulbound, payment, seal_policy, transfer_policy).

**@mysten/dapp-kit** for wallet connection and transaction signing
Decision rationale: Official Sui SDK for React. Supports all Sui Wallet Standard wallets. Built-in hooks for connection lifecycle, transaction signing, and account management. Used by the frontend team for all on-chain interactions.

**@mysten/sui** for blockchain SDK operations
Decision rationale: Official TypeScript SDK for Sui RPC calls, transaction building, object queries, and event subscriptions. Used across both frontend and backend for all programmatic Sui interactions.

**@mysten/zklogin** for social login authentication
Decision rationale: Enables Google, Facebook, and Apple sign-in with automatic Sui wallet creation. Zero-knowledge proofs ensure privacy. Critical for mainstream user onboarding — attendees can use the platform without any crypto knowledge or wallet setup.

### Storage & Encryption

**Walrus** for decentralized blob storage and frontend hosting
Decision rationale: No single point of failure. Immutable storage ensures event data persists independently of any centralized server. Enables Walrus Sites deployment for full decentralization of the frontend itself. The team has hands-on experience with Walrus publisher/aggregator APIs.

**Seal** for encryption of sensitive ticket metadata
Decision rationale: Policy-gated decryption with on-chain access control. Protects QR codes, access codes, and personal data while allowing only authorized parties (ticket holders, organizers) to decrypt. Integrates natively with Sui smart contracts for programmable access policies.

### Database (Planned — Version 2)

**Supabase** for managed PostgreSQL database and backend services
Decision rationale: Managed PostgreSQL with built-in authentication, real-time subscriptions, row-level security, and auto-generated REST/GraphQL APIs — eliminating the need to build and maintain a custom API layer. Required for search, filtering, and analytics that cannot be served efficiently by on-chain queries alone. The backend team has PostgreSQL and ORM experience (Prisma, TypeORM); Supabase accelerates delivery by providing the database, auth, and API infrastructure as a single managed service.

**Redis** for caching and background job processing
Decision rationale: Low-latency caching for frequently accessed event data (event listings, ticket availability). BullMQ job queue for background indexer processing — replaying on-chain events into the indexed database. The backend team has production Redis and BullMQ experience.

### Infrastructure & DevOps

**[SuiMoveRunner](https://github.com/blockchainBard101/SuiMoveRunner)** for streamlined Move smart contract testing and execution
Decision rationale: Custom tool developed by a team member to accelerate Move contract development workflow. Provides automated test execution, transaction simulation, and rapid iteration cycles for Sui smart contracts. Reduces friction in contract debugging and deployment validation.

**Docker** for containerization
Decision rationale: Consistent environments across development, testing, and production. Required for indexer and backend service deployment. Familiar to the team.

**Terraform** for infrastructure-as-code
Decision rationale: Reproducible, version-controlled cloud infrastructure. Supports multi-environment parity (testnet/mainnet). Familiar to the team.

**GitHub Actions** for CI/CD pipelines
Decision rationale: Native GitHub integration. Automates Move contract testing, frontend builds, linting, and deployment on every push and pull request. The team already uses GitHub for source control and code review.

**Vercel** for frontend hosting during development
Decision rationale: Zero-config Next.js deployment with automatic preview deployments for pull requests and global CDN. Used during active development before transitioning to Walrus Sites for production. Familiar to the team.


### Observability

**Prometheus + Grafana** for metrics and monitoring
Decision rationale: Industry-standard observability stack. Monitors RPC latency, transaction throughput, Walrus availability, and frontend performance. Familiar to the team.

**Sentry** for error tracking and performance monitoring
Decision rationale: Real-time frontend error capture and transaction performance tracing. Critical for debugging wallet interaction failures and transaction errors in production. Familiar to the team.

**OpenTelemetry** for distributed tracing
Decision rationale: Traces the full transaction lifecycle — from frontend click through RPC call to on-chain finalization — to identify latency bottlenecks. Complements Prometheus metrics with request-level visibility.

---

## 6. Timeline

### Phase 1: MVP Development (Version 1 — Features 1–9) — ~45% of Total Budget

- **Duration**: 8 weeks (2 months)
- **Team**:
  - Tech Product Lead — architecture oversight, delivery coordination, release gates
  - UX Designer — wireframes, design system, high-fidelity mockups
  - Technical Writer / System Analyst — feature requirements refinement, user guides for organizers and attendees, smart contract documentation, test case specifications
  - Full Stack Blockchain Developer — frontend UI development (Next.js/React), wallet integration, Sui SDK interactions, and on-chain module development in Move
  - Full Stack Blockchain Developer — smart contract architecture (Move), backend/indexer services, API layer, and data indexing pipeline
  - DevOps / SRE — infrastructure provisioning, CI/CD pipelines, deployment automation


**Key Deliverables**:
| Week | Deliverable |
|------|-------------|
| 1–2 | UX design system and wireframes finalized (Feature 1). Sui infrastructure foundation, gas optimization, Seal encryption setup (Feature 2). CI/CD pipeline established. |
| 3–4 | Identity & authentication — wallet connection, social login, profile creation (Feature 3). Event creation & discovery — creation flow, search, visibility, pricing (Feature 4). NFT ticket implementation — minting, metadata, dynamic state (Feature 5). |
| 5–6 | Ticket purchase & QR verification — marketplace purchase, rotating QR, on-chain verification (Feature 6). Attendance check-in & badge minting — atomic redeem-and-mint flow (Feature 7). Walrus storage — media uploads, Walrus Sites deployment (Feature 8). |
| 7–8 | Payment processing — crypto acceptance, revenue split, withdrawal (Feature 9). End-to-end testing of full event lifecycle. Security review of core contracts. Testnet deployment. Bug fixes and polish. |

**Current Status**: Project planning complete — basic Next.js frontend scaffolding with workspace structure, 8 Move smart contract module templates (event, ticket, attendance, soulbound, payment, loyalty, seal_policy, transfer_policy) requiring full implementation, Walrus storage integration utility placeholder, Seal encryption placeholder (to be implemented with actual Seal SDK), deployment script skeleton, and 52 detailed feature specifications documenting all MVP 01 and MVP 02 requirements. Smart contract modules, frontend features, and infrastructure require full development from specification to production.

---

### Phase 2: Version 2 Development with Monetization (Features 10–18) — ~55% of Total Budget

- **Duration**: 8 weeks (2 months, months 3–4)
- **Team**:
  - Tech Product Lead — architecture oversight, delivery coordination (part-time)
  - UX Designer — marketplace interface design, extended UI patterns, usability testing
  - Technical Writer / System Analyst — feature requirements refinement, user guides for organizers and attendees, smart contract documentation, test case specifications
  - Full Stack Blockchain Developer — extended frontend features, marketplace interface, loyalty dashboard, and Sui SDK integration
  - Full Stack Blockchain Developer — marketplace smart contracts (Move), Soulbound standards, fiat integration, analytics pipeline, and data archival
  - DevOps / SRE — infrastructure scaling, mainnet preparation, deployment automation
  - QA / SDET — automated test coverage, end-to-end regression, on-chain/off-chain consistency
  - Security Auditor — smart contract audit, threat modeling, key management review


**Deliverables**:
| Week | Deliverable |
|------|-------------|
| 1–2 | User profiles, attendance history & badge gallery (Feature 10). Event lifecycle management — cancellation, updates, calendar export (Feature 11). Soulbound Token standards — enforced non-transferability, issuer revocation (Feature 13). |
| 3–4 | Transfer policies & secondary marketplace — royalties, price caps, batch purchase, expiration (Feature 12). Encrypted content gating — pre-event and post-event access control (Feature 14). Data management & archival — deletion compliance, per-event sites, permanent archival (Feature 15). |
| 5–6 | Fiat on-ramp & financial compliance — card payment integration, transaction history, audit trails (Feature 16). Analytics & reporting — sales reports, anonymized exports, success metrics (Feature 17). |
| 7–8 | Loyalty & rewards — token-based rewards, tier progression, discount redemption, gamification (Feature 18). Integration testing across all modules. Monetization features activated. Mainnet preparation. |
| **Critical** | **Smart Contract Security Audit** — Comprehensive third-party security audit of all 8 Move smart contract modules (event, ticket, attendance, soulbound, payment, loyalty, seal_policy, transfer_policy) conducted by an independent auditor during weeks 6–8. Audit scope includes threat modeling, key management review, access control verification, economic attack surface analysis, and gas optimization review. All critical and high-severity findings must be resolved before mainnet deployment. |

---

### Phase 3: Go to Market — $0 (Self-Funded)

- **Duration**: Ongoing (initial push: 8 weeks after ### Phase 1 delivery)
- **Approach**: Zero paid marketing. All promotion handled by the core team via direct outreach, community channels, and personal networks. No additional budget required.

**Milestones**:
| KPI | Target | Budget |
|-----|--------|--------|
| KPI #1 — Mainnet Launch | Smart contracts deployed to Sui mainnet, frontend live on Walrus Sites | Infrastructure costs, Sui mainnet gas, security audit completion |
| KPI #2 — First Live Event (Battlefield Test) | 1 real event conducted end-to-end on the platform with 10–20 tickets sold — validating the full lifecycle from event creation through ticket purchase, QR check-in, attendance badge minting, and organizer payout | Organizer coordination, on-site support, post-event feedback collection |
| KPI #3 — Organizer Adoption | 3–5 event organizers signed up and actively testing the platform (creating draft events, exploring the dashboard, providing feedback) — recruited via direct outreach to crypto/Web3 event communities on Discord, Telegram, and Sui ecosystem channels | Documentation, tutorial content, community engagement (no paid ads) |
| KPI #4 — Pilot Integration Agreement | 1 signed pilot agreement with an existing ticketing marketplace to integrate at Tier 1 or Tier 2 (see §3.2), validating the platform's B2B integration path | Partnership outreach, technical scoping, integration engineering support |
| KPI #5 — Integration Pipeline | 3 additional ticketing platforms with pilot integration agreements in process — expanding the B2B pipeline and validating market demand for the on-chain verification layer | Partnership outreach, technical demonstrations, proposal documentation |

---

### Phase 4: Future Iterations (Features 19–25) — To Be Estimated After MVP Delivery

Scope, timeline, and budget for Features 19–25 will be defined based on MVP outcomes, user feedback, and go-to-market learnings. Feature areas are documented in the [MVP 02 requirements](docs/requirements/mvp_02/README.md) and described in §4 (Features 19–25).

### Contingency & Feedback Loops

- **Buffer Time**: 2 weeks buffer allocated per phase to accommodate unforeseen technical challenges (Sui SDK breaking changes, Walrus API updates, Seal library integration complexity).
- **Feedback Loops**:
  - User testing sessions after each phase with both organizers and attendees.
  - Weekly sprint retrospectives within the development team.
  - Community feedback collection via GitHub Issues and Discord.
  - Iterative UI/UX refinement based on analytics (Core Web Vitals, session recordings, conversion funnel analysis).
  - Security feedback loop: automated vulnerability scanning (Snyk/Dependabot) on every PR, periodic manual security review.

---

## 7. Budget Request Overview

**Total Requested Budget**: See *Event Registration & Ticketing Platform | Whatdahack?! (02/04/2026)* for detailed line-item figures.

The budget covers two development phases only, go-to-market is self-funded with $0 external spend. All funds are allocated to team compensation, infrastructure, and security auditing across Phases 1–2.

| Allocation | Share | Covers |
|------------|-------|--------|
| **Phase 1 — MVP Development** | ~45% | Core team (6 roles): Tech Lead (part-time), UX Designer, Technical Writer/System Analyst, Full Stack Blockchain Developer ×2, DevOps/SRE. Basic infrastructure (testnet gas, Walrus storage, CI/CD tooling, monitoring). |
| **Phase 2 — Version 2 with Monetization** | ~55% | Expanded team (8 roles): all Phase 1 roles plus QA/SDET and Security Auditor. Third-party Move smart contract audit for all 8 modules. Scaled infrastructure (mainnet gas, Supabase/Redis hosting, production monitoring). |
| **Phase 3 — Go to Market** | $0 | Self-funded by the core team. Documentation, tutorials, and community engagement via Discord, Telegram, and direct outreach. No paid advertising. |
| **Phase 4 — Future Features (19–25)** | TBD | To be estimated separately after MVP delivery, based on user feedback, go-to-market outcomes, and platform adoption metrics. |

**Contingency**: 10–15% buffer included within each phase allocation to accommodate unforeseen technical challenges (Sui SDK breaking changes, Walrus API updates, Seal library integration complexity).

---

## 8. Past Demonstration of Technical Expertise

### Current Project

**GitHub Repository**: [imboogieman/Ticketing-Platform-on-Walrus](https://github.com/imboogieman/Ticketing-Platform-on-Walrus) — The team has completed the project foundation, including:
- Project scaffolding: Next.js 14 frontend structure, 3 implemented Move smart contract modules (event, ticket, attendance) with 5 additional module stubs scaffolded, Walrus storage integration utility, Seal encryption placeholder, and an automated deployment script for Sui testnet (smart contract build, test, publish, and frontend configuration).
- 52 detailed MVP feature specifications across 12 requirement categories plus 8 extended feature modules — defining the full product scope before development begins.
- Comprehensive documentation suite: deployment guide, security analysis, testing guide, user guide, and contribution guidelines.

### Team Relevant Portfolio

| Project | Relevance |
|---------|-----------|
| [Multicurrency Crypto Wallet & DEX](https://whatdahack.is/portfolio/iguana/) | Cross-platform non-custodial asset storage — validates the team's wallet infrastructure and multi-currency payment experience. |
| [Crypto Fund Platform](https://whatdahack.is/portfolio/zet-fund/) | Investment vehicles for digital assets markets — demonstrates financial smart contract design and treasury management. |
| [Institutional Data Storage on Hyperledger](https://whatdahack.is/portfolio/volvo-trucks/) | Proprietary decentralized storage — prior experience architecting distributed storage systems. |
| [NFT Loyalty System on Polygon](https://clutch.co/go-to-review/3d891bfe-c21e-4d02-b531-a6e5a13b52f2/284579) | On-chain engagement and rewards — validates NFT-based loyalty mechanics (directly applicable to Features 13, 18). |
| [Ticket Marketplace on Polygon](https://drive.google.com/drive/folders/1gPunxAkwh1rqOVqg2H2UHWZZ9YqsqNeE?usp=sharing) | Secondary market with royalty enforcement — prior production experience building exactly what this platform delivers. |
| [NFT Tickets & Loyalty in Sports & Entertainment Research](https://whatdahack.is/web3-tech-the-future-of-sports-entertainment-market-research-march-2024/) | Deep dive into decentralized identity and ticketing — domain research that informed the Soulbound Badge and loyalty tier design. |
| [Artist Booking Platform](https://www.crunchbase.com/organization/boogi / https://github.com/imboogieman/Boogi) | Real-time sourcing of ticketing data — experience with live event data pipelines and organizer-facing tools. |
| [Ticket Quotes System](https://drive.google.com/drive/folders/1WGPEXSj4QX7Rngfa8iVIjEw-j8VeaCqs?usp=sharing) | Real-time pricing engine — validates dynamic pricing and multi-currency conversion capabilities. |

### Core Team

**Prajeet Shrestha** — Full Stack Blockchain Developer
[GitHub](https://github.com/Prajeet-Shrestha) · [LinkedIn](https://www.linkedin.com/in/prajeet-shrestha-4a767316a/)
Full stack blockchain developer with hands-on Sui and Move development experience. Core contributor to the Seal encryption package development — implementing policy-gated decryption with on-chain access control for the Sui ecosystem. This direct experience with Seal is critical for Feature 14 (Seal-Based Content Gating) and Feature 2 (Seal encryption infrastructure). Has built production Sui developer tools including [sui-move-skills](https://github.com/Prajeet-Shrestha/sui-move-skills) (Move contract analysis and skills assessment framework) and [sui-table-viewer](https://github.com/Prajeet-Shrestha/sui-table-viewer) (on-chain table data visualization tool). Has built production Sui applications integrating wallet connection, transaction signing, and decentralized storage. Experienced with TypeScript, React, Next.js, @mysten/sui.js, and blockchain data indexing. Brings deep understanding of Sui's object model, encryption primitives, and access control patterns essential for secure ticket metadata protection.

**Asmar Tohami** — Full Stack Blockchain Developer
[GitHub](https://github.com/asmar-io) · [LinkedIn](https://www.linkedin.com/in/tohami-ben-72a2a2239/)
Full stack blockchain developer with extensive Sui and Move experience. Has authored multiple Move smart contracts — NFT staking, NFT swapping, raffle systems, and cross-chain interoperability modules (Sui ↔ EVM/non-EVM) — alongside the frontends that consume them. Has built complete Sui dApps end-to-end: an NFT marketplace (Era Homi), a privacy-first subscription content platform (SeaShell), and an NFT card game (Nordic Legends). Experienced with React, Next.js, TypeScript, @mysten/dapp-kit, @mysten/sui.js, zkLogin social authentication, and Walrus Sites deployment. Delivers across the full stack — from Move contract architecture through frontend UX.

**A. J. George** — Technical Writer / System Analyst
[GitHub](https://github.com/blockchainBard101)
Active Sui community contributor and technical documentation specialist. Has built multiple Sui-native developer tools including [SuiMoveRunner] (automated Move contract testing and execution framework https://github.com/blockchainBard101/SuiMoveRunner), demonstrating deep understanding of the Move development workflow and tooling ecosystem. Creates clear, developer-focused documentation for technical audiences — translating complex blockchain concepts into accessible guides. Experienced in requirements analysis, test case specification, and API documentation. Regular contributor to Sui community discussions, providing technical guidance and educational content for developers building on Sui.

**0xriazaka** — Security Auditor
[GitHub](https://github.com/0xriazaka) · [Audit Portfolio](https://github.com/0xriazaka/Audit-Portfolio)
Blockchain security specialist with extensive smart contract audit experience across multiple ecosystems. Comprehensive audit portfolio demonstrates expertise in:
- Smart contract vulnerability assessment and exploit identification
- Access control verification and privilege escalation prevention
- Economic attack surface analysis and game-theoretic security
- Gas optimization and efficiency reviews
- Formal verification and invariant testing
Conducts independent security audits for DeFi protocols, NFT platforms, and complex on-chain systems. Brings systematic threat modeling methodology and deep understanding of common vulnerability patterns (reentrancy, integer overflow, authorization bypasses, flash loan attacks). Will lead the comprehensive third-party security audit of all 8 Move smart contract modules during Phase 2.

**Roman Gorbunov** — Tech Product Lead
[GitHub](https://github.com/imboogieman) · [LinkedIn](https://www.linkedin.com/in/rgorbunov/)
15 years of industry experience; Web3 native since 2016. Has architected and delivered cross-platform crypto wallets, NFT marketplaces, DeFi protocols, and on-chain ticketing systems for Fortune 500 corporations, startups backed by well-known funds (a16z, Barin-Vostok), and crypto-native companies. Leads end-to-end product delivery — from system architecture and technical decision-making through team coordination, sprint management, and release gates. Oversees the hybrid architecture design (on-chain + off-chain data), ensures cross-team alignment between smart contract, frontend, and infrastructure workstreams, and owns the technical roadmap from MVP through mainnet launch.

