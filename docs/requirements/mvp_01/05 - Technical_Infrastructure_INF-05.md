# Technical Infrastructure Requirements (INF-05)

## Overview

This document defines the foundational technical infrastructure requirements for the Ticketing Platform on Walrus, leveraging Sui's blockchain capabilities, Walrus decentralized storage, and advanced authentication mechanisms. These requirements ensure high-performance, secure, and scalable operations with optimized gas costs and decentralized hosting.

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

### INF-05.2.2 Feature: Seal-Based Access Encryption

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| INF-05.2.2 Feature: Seal-Based Access Encryption | User Story: As a user, I want my sensitive event details (location, QR codes) to be locked via Seal encryption, so that only the rightful holder can decrypt and view the information.<br><br>Actions:<br>- Policy Definition: Define a Sui Move policy struct that specifies the conditions (e.g., ticket ownership) under which a holder is authorized to request decryption<br>- Seal Wrapping: Use the Seal SDK to wrap sensitive attributes into ciphertext blobs anchored to the user's on-chain ticket object<br>- Threshold Request: Configure the dApp to request "decryption fragments" from Sui key servers, which only succeed if on-chain ownership is verified via the Move policy<br><br>Acceptance Criteria:<br>- Seal policies are defined for ticket-based access control<br>- Sensitive data is encrypted before storage on Walrus<br>- Only ticket owners can successfully decrypt their ticket details<br>- Encryption is anchored to on-chain ticket ownership<br>- Decryption requests are validated against Move policies<br><br>Deliverables:<br>- Seal policy implementation in Move smart contracts<br>- Seal SDK integration for encryption/decryption<br>- Cryptographically gated storage system<br>- Decryption request handling in frontend<br>- Security documentation for Seal integration | Not Started |

**Cross-Reference:** Implements ID-1.1.1 (Seal Encryption Integration) and DAT-04.2 (Seal Encryption for Ticket Metadata)

---

## INF-05.3 Authentication Controls

### INF-05.3.1 Feature: Session Controls

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| INF-05.3.1 Feature: Session Controls | User Story: As a user, I want a frictionless login process using my social accounts that manages my sessions securely without manual seed phrases.<br><br>Actions:<br>- ZkLogin Integration: Integrate Sui's ZkLogin flow to allow users to authenticate via Google or Twitch while maintaining a non-custodial wallet link<br>- Ephemeral Keypairs: Utilize ZkLogin ephemeral keypairs valid only for specific Sui epochs to automate session management and revocation<br>- Session Caching: Securely cache ephemeral private keys in session storage to allow the user to sign multiple transactions without re-logging during the event<br><br>Acceptance Criteria:<br>- Users can authenticate using Google, Twitch, or Apple accounts<br>- ZkLogin flow creates non-custodial wallet connections<br>- Ephemeral keys are properly scoped to Sui epochs<br>- Session storage securely manages temporary credentials<br>- Users can sign multiple transactions within a session without re-authentication<br>- Sessions automatically expire based on epoch transitions<br><br>Deliverables:<br>- ZkLogin integration with multiple OAuth providers<br>- Ephemeral keypair management system<br>- Session storage implementation with security best practices<br>- Session lifecycle management (creation, renewal, expiration)<br>- Seamless social login experience without seed phrase management | Not Started |

**Cross-Reference:** Implements ID-1.2.2 (Social Login Integration) and RC-1.2 (ZkLogin Support for User Onboarding)

---

## INF-05.4 Walrus Storage Integration

### INF-05.4.1 Feature: Walrus Site Static Hosting

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| INF-05.4.1 Feature: Walrus Site Static Hosting | User Story: As a platform owner, I want to host the marketplace and event pages on Walrus Sites, so that the user interface is decentralized and censorship-resistant.<br><br>Actions:<br>- Site Deployment: Use the Walrus Site-builder CLI to upload the React/Next.js static export to Walrus, generating a decentralized URL<br>- Sui Object Rooting: Root the entire marketplace site in a Sui object, allowing for versioned updates by modifying a single field on-chain<br>- SuiNS Integration: Link human-readable domains (e.g., tickets.walrus.sui) to the Walrus Site object ID for easy user access<br><br>Acceptance Criteria:<br>- Static frontend is successfully deployed to Walrus Sites<br>- Decentralized URL is accessible and fully functional<br>- Site is rooted in a Sui object for versioning<br>- SuiNS domain resolves to Walrus Site<br>- Site updates can be managed through on-chain object modifications<br>- Hosting is censorship-resistant and decentralized<br><br>Deliverables:<br>- Fully deployed decentralized frontend at a .walrus.site address<br>- Walrus Site-builder deployment scripts<br>- Sui object for site versioning and updates<br>- SuiNS domain configuration<br>- Deployment documentation and procedures | Not Started |

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
