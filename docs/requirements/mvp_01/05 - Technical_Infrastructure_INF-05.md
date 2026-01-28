# Technical Infrastructure Requirements (INF-05)

## Overview

This document defines the foundational technical infrastructure requirements for the Ticketing Platform on Walrus, leveraging Sui's blockchain capabilities, Walrus decentralized storage, and advanced authentication mechanisms. These requirements ensure high-performance, secure, and scalable operations with optimized gas costs and decentralized hosting.

## Stack-Provided Features

The Sui blockchain, Walrus storage network, and Seal encryption framework provide extensive infrastructure that eliminates significant custom development:

### ✅ Sui Network Provides:
- **Object-Centric Model**: Native parallel execution for independent transactions
- **Fast-Path Consensus**: Sub-500ms finality for owned object transactions
- **Shared Object Consensus**: Byzantine agreement for multi-party state changes
- **Storage Fund Mechanism**: Upfront storage fees with rebate on object deletion
- **Gas Sponsorship Framework**: Built-in sponsored transaction support
- **Programmable Transaction Blocks (PTBs)**: Atomic multi-command execution
- **Clock Object**: Network-verified timestamps (0x6 system object)
- **Move Language**: Memory-safe smart contract development with formal verification
- **Object Versioning**: Automatic version incrementing for state changes
- **Transaction Validation**: Cryptographic signature verification by default

### ✅ Sui SDKs Provide:
- **@mysten/sui.js**: Full-featured TypeScript SDK for transaction building
- **@mysten/dapp-kit**: React hooks for wallet connection and transaction execution
- **Wallet Standard**: Universal wallet detection and connection protocol
- **zkLogin SDK**: Social login with ephemeral key management

### ✅ Walrus Provides:
- **TypeScript/Rust SDKs**: Publisher and aggregator client libraries
- **Sites CLI**: Static website deployment and management tools
- **Blob Lifecycle**: Automatic replication and availability maintenance

### ✅ Seal Provides:
- **IBE Framework**: Identity-based encryption primitives
- **Policy Engine**: Attribute-based access control
- **Threshold Cryptography**: Distributed decryption key management

## Custom Development Required

Our infrastructure work focuses on configuration, integration, and business-specific logic:
- Sui network environment setup (Devnet/Testnet/Mainnet configs)
- Gas Station service implementation for sponsored transactions
- PTB composition for complex workflows
- Move contract development (tickets, events, profiles)
- Seal policy configuration for content gating
- Session management and state persistence
- Walrus SDK integration for blob operations
- Monitoring and error handling

---

## INF-05.1 Blockchain Foundation

### INF-05.1.1 Feature: Sui Network Foundation

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| INF-05.1.1 Feature: Sui Network Foundation | User Story: As a system architect, I want to leverage Sui's object-centric model and parallel execution, so that our platform can handle high-concurrency ticket sales with near-instant finality.<br><br>Actions:<br>- Object-Centric Modeling: Design all assets (Tickets, Events, Profiles) as independent objects to enable parallel processing and bypass the sequential bottleneck of global consensus<br>- Consensus Optimization: Distinguish between owned objects (fast-path validation for check-ins) and shared objects (consensus-based logic for ticket pools) to minimize latency<br>- Environment Configuration: Set up cross-environment configurations for Devnet, Testnet, and Mainnet using the Sui CLI and Client SDK<br>- Storage Fund Strategy: Implement logic to manage upfront storage fees, ensuring long-term data persistence while taking advantage of Sui's storage rebate mechanism for deleted objects<br><br>Acceptance Criteria:<br>- All platform assets are designed as Sui objects with appropriate ownership models<br>- Owned vs shared object strategy is documented and implemented<br>- Development environment supports Devnet, Testnet, and Mainnet configurations<br>- Storage fee management logic handles upfront costs and rebate mechanisms<br>- Architecture supports parallel execution for high-concurrency operations<br><br>Deliverables:<br>- Documented architecture map showing the flow of objects across the Sui Network<br>- Configured development environment with cross-network support<br>- Smart contract implementation using object-centric design patterns<br>- Storage fund management utilities | Not Started |

---

### INF-05.1.2 Feature: Gas Fee Optimization

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| INF-05.1.2 Feature: Gas Fee Optimization | User Story: As a product manager, I want to minimize transaction costs and abstract gas away from the user, so that the onboarding experience via ZkLogin is indistinguishable from a Web2 application.<br><br>Actions:<br>- Sponsored Transactions: Implement a Gas Station service using the Sui TypeScript SDK to pay gas fees on behalf of users for critical onboarding actions like profile creation and ticket claims<br>- PTB Batching: Chain multiple operations (e.g., buy_ticket + transfer + tag) into a single Programmable Transaction Block (PTB) to reduce execution overhead and storage costs<br>- Storage Fund Strategy: Design objects to be "burned" or transitioned to Attendance NFTs post-event to reclaim storage fees for the organizer<br><br>Acceptance Criteria:<br>- Gas Station service successfully sponsors transactions for new users<br>- Critical onboarding flows (profile creation, first ticket purchase) are gasless for users<br>- PTB batching reduces transaction costs by at least 30% compared to individual operations<br>- Storage fee reclamation mechanism is implemented and tested<br>- Cost analysis demonstrates measurable gas savings<br><br>Deliverables:<br>- Functional Gas Station service with sponsored transaction capability<br>- PTB batching implementation for common workflows<br>- Cost reduction report demonstrating PTB efficiency gains<br>- Storage fee reclamation utilities for post-event cleanup<br>- Documentation on gas optimization strategies | Not Started |

---

### INF-05.1.3 Feature: High-Fidelity Transaction Validation

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| INF-05.1.3 Feature: High-Fidelity Transaction Validation | User Story: As a security officer, I want rigorous on-chain and off-chain validation of every transaction, so that malicious calls are rejected and platform integrity is maintained.<br><br>Actions:<br>- Move Bytecode Verifier: Leverage Sui's native bytecode verifier to prevent reentrancy attacks, resource duplication, and unauthorized memory access at the compiler level<br>- Hot Potato Pattern: Implement "Hot Potato" objects (objects without drop or store abilities) to enforce that critical workflows (like payment) are completed within the same transaction block<br>- Pre-Execution Simulation: Use `sui_dryRunTransactionBlock` on the frontend to predict success/failure and gas costs before prompting the user for a signature<br>- Integrity Assertions: Add granular `assert!` checks for every state transition (e.g., verifying capacity limits, price accuracy, and signature validity)<br><br>Acceptance Criteria:<br>- All smart contracts pass Move bytecode verification<br>- Hot Potato pattern is implemented for critical payment and transfer flows<br>- Frontend implements dry-run simulation before all user-signed transactions<br>- Comprehensive assertion checks cover all state transitions<br>- Security audit confirms protection against common attack vectors<br><br>Deliverables:<br>- Smart contracts with Hot Potato pattern implementation<br>- Frontend transaction simulation integration<br>- Comprehensive test suite covering 100+ "sad path" scenarios<br>- Security documentation detailing validation mechanisms<br>- Assertion coverage report for all state transitions | Not Started |

---

## INF-05.2 Decentralized Storage

### INF-05.2.1 Feature: Content Addressing

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| INF-05.2.1 Feature: Content Addressing | User Story: As a developer, I want to utilize Walrus Blob IDs for all platform assets, so that data integrity is cryptographically guaranteed and assets are retrievable based on their content.<br><br>Actions:<br>- Hashing Pipeline: Implement a pre-upload process using the Walrus SDK to generate unique Blob IDs for every asset, including images, PDFs, and JSON metadata<br>- Immutable Linking: Map Sui Move object attributes directly to Walrus Blob IDs, preventing "metadata spoofing" post-sale<br>- Resolution Layer: Build a frontend resolver that fetches content directly from Walrus storage nodes using the content-addressed ID<br><br>Acceptance Criteria:<br>- All platform assets receive unique Blob IDs before upload<br>- Sui Move objects store Blob IDs as primary content references<br>- Frontend successfully retrieves content using Blob IDs<br>- Content integrity is verifiable through cryptographic hashing<br>- No metadata can be modified post-upload without changing Blob ID<br><br>Deliverables:<br>- Standardized Walrus hashing utility for content addressing<br>- Sui Move schema with Blob ID storage fields<br>- Frontend content resolver for Walrus retrieval<br>- Content verification utilities<br>- Documentation on content addressing architecture | Not Started |

**Cross-Reference:** Implements storage mechanism for DAT-04.1 (Decentralized Media Storage)

---

### INF-05.2.2 Feature: Seal-Based Access Encryption Infrastructure - **[CONSOLIDATED HUB]**

| User Story Title | User Story Body | Estimate |
| --- | --- | --- |
| INF-05.2.2 Feature: Seal-Based Access Encryption Infrastructure | User Story: As a system architect, I want centralized Seal encryption infrastructure that can be reused across all platform features (tickets, events, content gating), so that we have consistent, secure access control without duplicating encryption logic.<br><br>**Consolidates:**<br>- ID-1.1.1: Seal Encryption Integration (66 hrs)<br>- DAT-08.2.1: Seal Encryption for Ticket Metadata (~46 hrs)<br>- NFT-14.5.1: Encrypted Metadata (42 hrs)<br><br>**Actions:**<br>- Policy Definition Library: Create reusable Move policy modules for common access patterns:<br>  * Ownership-based policies (ticket holder only)<br>  * Redemption-based policies (after check-in)<br>  * Time-based policies (event date constraints)<br>  * Hybrid policies (ownership + redemption + time)<br>- Seal SDK Integration: Integrate Seal SDK for encryption/decryption operations<br>- Move Infrastructure: Implement seal_approve functions and policy validation logic<br>- Encryption Workflows: Create standardized encryption pipeline for sensitive data before Walrus upload<br>- Decryption Handling: Build frontend library for requesting decryption fragments from Seal key servers<br>- Policy Verification: Ensure on-chain ownership/state verification before fragment release<br>- Testing Suite: Comprehensive tests for all policy types and edge cases<br><br>**Stack-Provided Features:**<br>- Sui Seal provides IBE (Identity-Based Encryption) framework<br>- Threshold scheme handled by Seal key server network<br>- Walrus provides encrypted blob storage<br><br>**Custom Development Required:**<br>- Move policy module library<br>- Seal SDK integration wrappers<br>- Frontend decryption request library<br>- Policy-to-use-case mapping documentation<br>- Integration testing across all use cases<br><br>**Use Cases Supported:**<br>- Ticket metadata encryption (owner-only access)<br>- Event content gating (ticket ownership)<br>- Post-redemption content (attendance verified)<br>- Sensitive event details (location, access codes)<br><br>Acceptance Criteria:<br>- All policy types are defined and tested in Move<br>- Seal SDK successfully encrypts/decrypts data<br>- Only authorized users can decrypt based on on-chain state<br>- Encryption is anchored to Sui object ownership<br>- Decryption requests validate Move policies<br>- All platform features can reuse this infrastructure<br><br>Deliverables:<br>- Seal policy library (Move modules)<br>- Seal SDK integration layer<br>- Cryptographic access control system<br>- Frontend decryption utilities<br>- Security documentation and best practices<br>- Integration examples for each use case | **24-32 hours** |

**Consolidation Note**: This creates a single source of truth for Seal encryption across the platform, eliminating 80-120 hours of duplicate work while providing consistent security patterns.

**Cross-Reference**: Used by AM-3.3.2 (Content Gating), Ticket NFTs (sensitive metadata), Event data (location privacy)

---

## INF-05.3 Authentication Controls

### INF-05.3.1 Feature: Session Controls

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| INF-05.3.1 Feature: Session Controls | User Story: As a user, I want a frictionless login process using my social accounts that manages my sessions securely without manual seed phrases.<br><br>Actions:<br>- ZkLogin Integration: Integrate Sui's ZkLogin flow to allow users to authenticate via Google or Twitch while maintaining a non-custodial wallet link<br>- Ephemeral Keypairs: Utilize ZkLogin ephemeral keypairs valid only for specific Sui epochs to automate session management and revocation<br>- Session Caching: Securely cache ephemeral private keys in session storage to allow the user to sign multiple transactions without re-logging during the event<br><br>Acceptance Criteria:<br>- Users can authenticate using Google, Twitch, or Apple accounts<br>- ZkLogin flow creates non-custodial wallet connections<br>- Ephemeral keys are properly scoped to Sui epochs<br>- Session storage securely manages temporary credentials<br>- Users can sign multiple transactions within a session without re-authentication<br>- Sessions automatically expire based on epoch transitions<br><br>Deliverables:<br>- ZkLogin integration with multiple OAuth providers<br>- Ephemeral keypair management system<br>- Session storage implementation with security best practices<br>- Session lifecycle management (creation, renewal, expiration)<br>- Seamless social login experience without seed phrase management | Not Started |

**Cross-Reference:** Implements ID-1.2.2 (Social Login Integration) and RC-1.2 (ZkLogin Support for User Onboarding)

---

## INF-05.4 Walrus Storage Integration

**Status**: CONSOLIDATED → DAT-08.5.1

Walrus Site static hosting is handled in DAT-08.5.1 (Static Frontend Deployment to Walrus).

**Rationale**: Frontend hosting is a data/storage concern, not infrastructure setup. It should live with other storage requirements rather than being duplicated.

**Cross-Reference**: See DAT-08.5.1 for frontend deployment configuration and testing.

---

## Summary of Requirements

| Feature | ID | Estimate | Status | Cross-References |
|---------|----|----|----|----|
| Sui Network Foundation | INF-05.1.1 | 21 hours | Not Started | Foundation for all blockchain operations |
| Gas Fee Optimization | INF-05.1.2 | 21 hours | Not Started | Enhances user onboarding experience |
| High-Fidelity Transaction Validation | INF-05.1.3 | 42 hours | Not Started | Security foundation for platform |
| Content Addressing | INF-05.2.1 | Not in estimates.md | Not Started | DAT-04.1 |
| Seal-Based Access Encryption Infrastructure | INF-05.2.2 | 24-32 hours | Not Started | ID-1.1.1, DAT-04.2, NFT-14.5.1 |
| Session Controls | INF-05.3.1 | 42 hours | Not Started | ID-1.2.2, RC-1.2 |
| Walrus Site Static Hosting | INF-05.4.1 | CONSOLIDATED → DAT-08.5.1 | Consolidated | DAT-04.5, DAT-04.6 |

**Total Module Hours**: **150-158 hours** (after consolidations)

---

## Dependencies

**Required for All Features:**
- Sui blockchain development environment (Devnet, Testnet, Mainnet)
- Walrus SDK and protocol access
- Sui TypeScript SDK
- Seal SDK

**Feature Dependencies:**
- **INF-05.1.1** is foundational for all blockchain operations
- **INF-05.1.2** enhances user experience across authentication and ticketing features
- **INF-05.1.3** provides security layer for all transaction flows
- **INF-05.2.1** is required for all storage operations
- **INF-05.2.2** is required for secure ticket distribution (TC-1)
- **INF-05.3.1** is required for user authentication (ID-1, UPS-02)
- **INF-05.4.1** enables decentralized hosting for platform and event sites

---

## Notes

### Relationship to Other Requirements

This infrastructure module provides the technical foundation for:

- **Identity & Authentication (ID-01):** Session controls and ZkLogin integration
- **User Profile System (UPS-02):** Avatar storage and profile data management
- **Event Creation (RC-1):** Event metadata storage and ZkLogin onboarding
- **NFT Ticketing (TC-1):** Seal encryption for ticket security
- **Data Preservation (DAT-04):** Walrus storage and content addressing
- **Event Access (EA-1):** Walrus Sites for event content

### Deferred to Future Versions

- Advanced gas optimization strategies (dynamic batching, predictive pre-funding)
- Multi-region Walrus storage redundancy
- Advanced Seal encryption patterns (time-locked decryption, multi-party computation)
- Automated infrastructure scaling and load balancing
- Enhanced SuiNS features (subdomain management, DNS-level routing)
