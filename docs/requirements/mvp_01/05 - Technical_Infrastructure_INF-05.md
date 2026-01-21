# Technical Infrastructure Requirements (INF-05)

## Overview

This document defines the foundational technical infrastructure requirements for the Ticketing Platform on Walrus, leveraging Sui's blockchain capabilities, Walrus decentralized storage, and advanced authentication mechanisms. These requirements ensure high-performance, secure, and scalable operations with optimized gas costs and decentralized hosting.

---

## INF-05.1 Blockchain Foundation

### INF-05.1.1 Feature: Sui Network Foundation

**User Story:** As a system architect, I want to leverage Sui's object-centric model and parallel execution, so that our platform can handle high-concurrency ticket sales with near-instant finality.

**Actions:**

- **Object-Centric Modeling:** Design all assets (Tickets, Events, Profiles) as independent objects to enable parallel processing and bypass the sequential bottleneck of global consensus
- **Consensus Optimization:** Distinguish between owned objects (fast-path validation for check-ins) and shared objects (consensus-based logic for ticket pools) to minimize latency
- **Environment Configuration:** Set up cross-environment configurations for Devnet, Testnet, and Mainnet using the Sui CLI and Client SDK
- **Storage Fund Strategy:** Implement logic to manage upfront storage fees, ensuring long-term data persistence while taking advantage of Sui's storage rebate mechanism for deleted objects

**Acceptance Criteria:**

- All platform assets are designed as Sui objects with appropriate ownership models
- Owned vs shared object strategy is documented and implemented
- Development environment supports Devnet, Testnet, and Mainnet configurations
- Storage fee management logic handles upfront costs and rebate mechanisms
- Architecture supports parallel execution for high-concurrency operations

**Deliverables:**

- Documented architecture map showing the flow of objects across the Sui Network
- Configured development environment with cross-network support
- Smart contract implementation using object-centric design patterns
- Storage fund management utilities

**Status:** Not Started

---

### INF-05.1.2 Feature: Gas Fee Optimization

**User Story:** As a product manager, I want to minimize transaction costs and abstract gas away from the user, so that the onboarding experience via ZkLogin is indistinguishable from a Web2 application.

**Actions:**

- **Sponsored Transactions:** Implement a Gas Station service using the Sui TypeScript SDK to pay gas fees on behalf of users for critical onboarding actions like profile creation and ticket claims
- **PTB Batching:** Chain multiple operations (e.g., buy_ticket + transfer + tag) into a single Programmable Transaction Block (PTB) to reduce execution overhead and storage costs
- **Storage Fund Strategy:** Design objects to be "burned" or transitioned to Attendance NFTs post-event to reclaim storage fees for the organizer

**Acceptance Criteria:**

- Gas Station service successfully sponsors transactions for new users
- Critical onboarding flows (profile creation, first ticket purchase) are gasless for users
- PTB batching reduces transaction costs by at least 30% compared to individual operations
- Storage fee reclamation mechanism is implemented and tested
- Cost analysis demonstrates measurable gas savings

**Deliverables:**

- Functional Gas Station service with sponsored transaction capability
- PTB batching implementation for common workflows
- Cost reduction report demonstrating PTB efficiency gains
- Storage fee reclamation utilities for post-event cleanup
- Documentation on gas optimization strategies

**Status:** Not Started

---

### INF-05.1.3 Feature: High-Fidelity Transaction Validation

**User Story:** As a security officer, I want rigorous on-chain and off-chain validation of every transaction, so that malicious calls are rejected and platform integrity is maintained.

**Actions:**

- **Move Bytecode Verifier:** Leverage Sui's native bytecode verifier to prevent reentrancy attacks, resource duplication, and unauthorized memory access at the compiler level
- **Hot Potato Pattern:** Implement "Hot Potato" objects (objects without drop or store abilities) to enforce that critical workflows (like payment) are completed within the same transaction block
- **Pre-Execution Simulation:** Use `sui_dryRunTransactionBlock` on the frontend to predict success/failure and gas costs before prompting the user for a signature
- **Integrity Assertions:** Add granular `assert!` checks for every state transition (e.g., verifying capacity limits, price accuracy, and signature validity)

**Acceptance Criteria:**

- All smart contracts pass Move bytecode verification
- Hot Potato pattern is implemented for critical payment and transfer flows
- Frontend implements dry-run simulation before all user-signed transactions
- Comprehensive assertion checks cover all state transitions
- Security audit confirms protection against common attack vectors

**Deliverables:**

- Smart contracts with Hot Potato pattern implementation
- Frontend transaction simulation integration
- Comprehensive test suite covering 100+ "sad path" scenarios
- Security documentation detailing validation mechanisms
- Assertion coverage report for all state transitions

**Status:** Not Started

---

## INF-05.2 Decentralized Storage

### INF-05.2.1 Feature: Content Addressing

**User Story:** As a developer, I want to utilize Walrus Blob IDs for all platform assets, so that data integrity is cryptographically guaranteed and assets are retrievable based on their content.

**Actions:**

- **Hashing Pipeline:** Implement a pre-upload process using the Walrus SDK to generate unique Blob IDs for every asset, including images, PDFs, and JSON metadata
- **Immutable Linking:** Map Sui Move object attributes directly to Walrus Blob IDs, preventing "metadata spoofing" post-sale
- **Resolution Layer:** Build a frontend resolver that fetches content directly from Walrus storage nodes using the content-addressed ID

**Acceptance Criteria:**

- All platform assets receive unique Blob IDs before upload
- Sui Move objects store Blob IDs as primary content references
- Frontend successfully retrieves content using Blob IDs
- Content integrity is verifiable through cryptographic hashing
- No metadata can be modified post-upload without changing Blob ID

**Deliverables:**

- Standardized Walrus hashing utility for content addressing
- Sui Move schema with Blob ID storage fields
- Frontend content resolver for Walrus retrieval
- Content verification utilities
- Documentation on content addressing architecture

**Status:** Not Started

**Cross-Reference:** Implements storage mechanism for DAT-04.1 (Decentralized Media Storage)

---

### INF-05.2.2 Feature: Seal-Based Access Encryption

**User Story:** As a user, I want my sensitive event details (location, QR codes) to be locked via Seal encryption, so that only the rightful holder can decrypt and view the information.

**Actions:**

- **Policy Definition:** Define a Sui Move policy struct that specifies the conditions (e.g., ticket ownership) under which a holder is authorized to request decryption
- **Seal Wrapping:** Use the Seal SDK to wrap sensitive attributes into ciphertext blobs anchored to the user's on-chain ticket object
- **Threshold Request:** Configure the dApp to request "decryption fragments" from Sui key servers, which only succeed if on-chain ownership is verified via the Move policy

**Acceptance Criteria:**

- Seal policies are defined for ticket-based access control
- Sensitive data is encrypted before storage on Walrus
- Only ticket owners can successfully decrypt their ticket details
- Encryption is anchored to on-chain ticket ownership
- Decryption requests are validated against Move policies

**Deliverables:**

- Seal policy implementation in Move smart contracts
- Seal SDK integration for encryption/decryption
- Cryptographically gated storage system
- Decryption request handling in frontend
- Security documentation for Seal integration

**Status:** Not Started

**Cross-Reference:** Implements ID-1.1.1 (Seal Encryption Integration) and DAT-04.2 (Seal Encryption for Ticket Metadata)

---

## INF-05.3 Authentication Controls

### INF-05.3.1 Feature: Session Controls

**User Story:** As a user, I want a frictionless login process using my social accounts that manages my sessions securely without manual seed phrases.

**Actions:**

- **ZkLogin Integration:** Integrate Sui's ZkLogin flow to allow users to authenticate via Google or Twitch while maintaining a non-custodial wallet link
- **Ephemeral Keypairs:** Utilize ZkLogin ephemeral keypairs valid only for specific Sui epochs to automate session management and revocation
- **Session Caching:** Securely cache ephemeral private keys in session storage to allow the user to sign multiple transactions without re-logging during the event

**Acceptance Criteria:**

- Users can authenticate using Google, Twitch, or Apple accounts
- ZkLogin flow creates non-custodial wallet connections
- Ephemeral keys are properly scoped to Sui epochs
- Session storage securely manages temporary credentials
- Users can sign multiple transactions within a session without re-authentication
- Sessions automatically expire based on epoch transitions

**Deliverables:**

- ZkLogin integration with multiple OAuth providers
- Ephemeral keypair management system
- Session storage implementation with security best practices
- Session lifecycle management (creation, renewal, expiration)
- Seamless social login experience without seed phrase management

**Status:** Not Started

**Cross-Reference:** Implements ID-1.2.2 (Social Login Integration) and RC-1.2 (ZkLogin Support for User Onboarding)

---

## INF-05.4 Walrus Storage Integration

### INF-05.4.1 Feature: Walrus Site Static Hosting

**User Story:** As a platform owner, I want to host the marketplace and event pages on Walrus Sites, so that the user interface is decentralized and censorship-resistant.

**Actions:**

- **Site Deployment:** Use the Walrus Site-builder CLI to upload the React/Next.js static export to Walrus, generating a decentralized URL
- **Sui Object Rooting:** Root the entire marketplace site in a Sui object, allowing for versioned updates by modifying a single field on-chain
- **SuiNS Integration:** Link human-readable domains (e.g., tickets.walrus.sui) to the Walrus Site object ID for easy user access

**Acceptance Criteria:**

- Static frontend is successfully deployed to Walrus Sites
- Decentralized URL is accessible and fully functional
- Site is rooted in a Sui object for versioning
- SuiNS domain resolves to Walrus Site
- Site updates can be managed through on-chain object modifications
- Hosting is censorship-resistant and decentralized

**Deliverables:**

- Fully deployed decentralized frontend at a .walrus.site address
- Walrus Site-builder deployment scripts
- Sui object for site versioning and updates
- SuiNS domain configuration
- Deployment documentation and procedures

**Status:** Not Started

**Cross-Reference:** Implements DAT-04.5 (Decentralized Platform Hosting) and DAT-04.6 (Per-Event Walrus Sites Infrastructure)

---

## Summary of Requirements

| Feature | ID | Status | Cross-References |
|---------|----|----|------------------|
| Sui Network Foundation | INF-05.1.1 | Not Started | Foundation for all blockchain operations |
| Gas Fee Optimization | INF-05.1.2 | Not Started | Enhances user onboarding experience |
| High-Fidelity Transaction Validation | INF-05.1.3 | Not Started | Security foundation for platform |
| Content Addressing | INF-05.2.1 | Not Started | DAT-04.1 |
| Seal-Based Access Encryption | INF-05.2.2 | Not Started | ID-1.1.1, DAT-04.2 |
| Session Controls | INF-05.3.1 | Not Started | ID-1.2.2, RC-1.2 |
| Walrus Site Static Hosting | INF-05.4.1 | Not Started | DAT-04.5, DAT-04.6 |

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
