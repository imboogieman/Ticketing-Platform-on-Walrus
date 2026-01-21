# 06-NFT Implementation (NFT-14)

## 06 Overview
This document outlines the advanced NFT implementation requirements for the Ticketing Platform on Walrus, including Sui-native ticket NFTs, metadata standards, encryption integration, dynamic updates, soulbound token standards, and zkLogin authentication. These features enable high-performance, secure, and user-friendly digital ticketing.

---

## 14.1. Feature: Ticket NFTs on Sui (Base Object) (NFT-14.1)

### 14.1.1. Feature: Ticket NFTs on Sui (Base Object) (NFT-14.1.1)

| User Story Title | User Story Body |
| --- | --- |
| 14.1.1. Feature: Ticket NFTs on Suite (Base Object) (NFT-14.1.1) | User Story: As a system architect, I want to define the base Ticket Move object using an object-centric model, so that it enables parallel execution for high-concurrency ticket drops.<br><br>Actions:<br>- Struct Definition: Define public struct Ticket has key, store with a unique id: UID. The store ability enables ticket transfers and marketplace compatibility.<br>- Field Mapping: Include event_id: ID, name: String, url: Url (pointing to the Walrus Blob), and transferable: bool flag to control transfer permissions per ticket.<br>- Capability Logic: Implement AdminCap for issuers to control minting rights and OrganizerCap for event-specific operations.<br>- Constructor: Create an internal new function that returns a Ticket object to be handled by PTBs (Programmable Transaction Blocks).<br>- Ownership Rights: Tickets are owned and controlled by holder's address with proof-of-ownership via wallet signatures.<br><br>Deliverable: A Move module with a verified Ticket struct and an entry function for minting that supports both transferable and soulbound configurations. |

---

## 14.1.2. Feature: Dynamic QR Code Generation (NFT-14.1.2)

| User Story Title | User Story Body |
| --- | --- |
| 14.1.2. Feature: Dynamic QR Code Generation (NFT-14.1.2) | User Story: As an attendee, I want my ticket to generate a dynamic QR code that refreshes periodically, so that my ticket cannot be stolen via screenshot or shared fraudulently.<br><br>Actions:<br>- QR Payload: Generate a client-side QR code containing a signed payload of TicketID + UserAddress + Timestamp + One-Time-Salt using the attendee's wallet signature.<br>- Auto-Refresh: Configure the mobile dApp to refresh the QR payload every 30 seconds with a new timestamp and salt, ensuring only "live" tickets are valid.<br>- Cryptographic Binding: The QR signature must be verifiable on-chain using the ticket owner's public key to prevent forgery.<br>- Scan Integration: When scanned at venue, the QR triggers the redeem_ticket function (see AM-3.1.1) which validates ownership and marks attendance.<br>- Cross-Reference: QR scanning workflow detailed in AM-3.1.1 (Check-in Procedures) and AM-3.4.2 (QR Code Scanning).<br><br>Deliverable: A dynamic, fraud-proof QR generation library integrated into the ticket holder's mobile wallet UI. |

---

## 14.2. Feature: Metadata Standards (SIP-16/Display) (NFT-14.2)

### 14.2.1. Feature: Metadata Standards (SIP-16/Display) (NFT-14.2.1)

| User Story Title | User Story Body |
| --- | --- |
| 14.2.1. Feature: Metadata Standards (SIP-16/Display) (NFT-14.2.1) | User Story: As a wallet developer, I want tickets to adhere to the official Sui Object Display standard, so that they render correctly in user wallets and explorers.<br><br>Actions:<br>- Display Creation: In the module init, create a Display&lt;Ticket&gt; object using the Publisher capability.<br>- Template Mapping: Map the keys (name, image_url, description, project_url) to the object's field values using template syntax (e.g., ""{url}"").<br>- Attribute Vector: Construct a standard attributes JSON array (Trait Type / Value) to support marketplace filtering.<br>- Update Logic: Implement a function to update the Display fields if the metadata schema changes in the future.<br>- Validation: Run a script to fetch the raw object via API and verify the JSON matches the SIP standard.<br><br>Deliverable: A ticket object visible in the Sui Wallet with the correct image, title, and description. |

---

## 14.3. Feature: Ticket Transfer Logic (NFT-14.3)

### 14.3.1. Feature: Ticket Transfer Logic (NFT-14.3.1)

| User Story Title | User Story Body |
| --- | --- |
| 14.3.1. Feature: Ticket Transfer Logic (NFT-14.3.1) | User Story: As an event organizer, I want to configure whether tickets can be transferred to other users, so that I can enable secondary markets for some events while restricting resale for others.<br><br>Actions:<br>- Transfer Flag: Add a transferable: bool field to the Ticket struct, set during minting based on event configuration.<br>- Transfer Function: Implement a public entry fun transfer_ticket(ticket: Ticket, recipient: address) that checks the transferable flag before allowing transfer.<br>- Transfer Guard: If transferable == false, the function reverts with ETicketNotTransferable error, enforcing soulbound-like behavior for specific events.<br>- Post-Transfer State: Upon successful transfer, update the ticket's owner field and emit a TicketTransferred event for indexing.<br>- Marketplace Integration: Transferable tickets (with store ability) can be listed on Sui Kiosk or other NFT marketplaces.<br><br>Deliverable: A flexible transfer system supporting both open secondary markets and restricted, non-transferable tickets based on organizer preferences. |

---

## 14.5. Feature: Encrypted Metadata (Sui Seal Integration) (NFT-14.5)

### 14.5.1. Feature: Encrypted Metadata (Sui Seal Integration) (NFT-14.5.1)

| User Story Title | User Story Body |
| --- | --- |
| 14.5.1. Feature: Encrypted Metadata (Sui Seal Integration) (NFT-14.5.1) | User Story: As a user, I want my sensitive event details (e.g., precise location or access codes) to be stored securely on Walrus and only accessible via my ticket, so that I am protected from physical security risks.<br><br>Actions:<br>1. Define a seal_approve_access function in Move that verifies the caller is the current owner of the Ticket object.<br>2. Store the encrypted metadata as a ciphertext blob on Walrus, with the blob_id stored in the Ticket object.<br>3. Use the Seal SDK to request decryption fragments from the key-server network only after the on-chain approval transaction is verified.<br><br>Deliverable: A cryptographically gated view in the dApp where sensitive event details are decrypted in real-time for the ticket holder. |

---

## 14.6. Feature: Dynamic Updates (Mutable State) (NFT-14.6)

### 14.6.1. Feature: Dynamic Updates (Mutable State) (NFT-14.6.1)

| User Story Title | User Story Body |
| --- | --- |
| 14.6.1. Feature: Dynamic Updates (Mutable State) (NFT-14.6.1) | User Story: As an attendee, I want my ticket NFT to reflect its current status (Active vs. Used), so that I have a verifiable visual record of my attendance.<br><br>Actions:<br>1. Add an is_redeemed boolean field to the Ticket struct.<br>2. Implement a redeem_ticket function gated by a ScannerCap to toggle the status to true.<br>3. Emit a MetadataUpdate event to trigger Walrus Site or wallet-level UI refreshes.<br><br>Deliverable: A Ticket object on Sui that programmatically updates its state and visual metadata post-validation. |

---

## 14.8. Feature: Soulbound Token (SBT) Standards (NFT-14.8)

### 14.8.1. Feature: Soulbound Token (SBT) Standards (NFT-14.8.1)

| User Story Title | User Story Body |
| --- | --- |
| 14.8.1. Feature: Soulbound Token (SBT) Standards (NFT-14.8.1) | User Story: As a developer, I want a standard interface for non-transferable tokens, so that different event badges behave consistently across the platform.<br><br>Actions:<br>- Interface Definition: Define a module::soulbound containing a standard trait or marker struct.<br>- Minting Signature: Define a mint(recipient, metadata) function that returns an object without store ability.<br>- Burn Interface: Standardize the burn function to allow users to remove unwanted badges from their inventory.<br>- View Function: Implement a get_badges(address) function to easily retrieve all SBTs owned by a user.<br>- Documentation: Publish the .move interface file for other developers to import.<br><br>Deliverable: A published sbt_standard Move package used by multiple event types. |

---

## 14.9. Feature: SBT Non-transferability Logic (NFT-14.9)

### 14.9.1. Feature: SBT Non-transferability Logic (NFT-14.9.1)

| User Story Title | User Story Body |
| --- | --- |
| 14.9.1. Feature: SBT Non-transferability Logic (NFT-14.9.1) | User Story: As an issuer, I want to ensure badges physically cannot be sent to another wallet, so that reputation cannot be farmed or sold.<br><br>Actions:<br>- Capability Removal: Define the Badge struct without the store ability (only key).<br>- Transfer Guard: If using a custom transfer function, add assert!(sender == owner, ENotTransferable).<br>- Kiosk Prevention: Ensure these objects cannot be placed into a Kiosk (which requires store).<br>- Revocation: Implement a revoke function allowing the Issuer to burn the badge if the user violates terms.<br>- Wallet Test: Verify that the ""Send"" button is disabled or hidden in the Sui Wallet UI.<br><br>Deliverable: A transfer transaction attempting to move the SBT reverting with a system error EAbilityNotFound. |

---

## 14.10. Feature: Attendance Proof Burn Mechanisms (NFT-14.10)

### 14.10.1. Feature: Attendance Proof Burn Mechanisms (NFT-14.10.1)

| User Story Title | User Story Body |
| --- | --- |
| 14.10.1. Feature: Attendance Proof Burn Mechanisms (NFT-14.10.1) | User Story: As a gatekeeper, I want to ensure that a ticket cannot be reused after entry while providing the user with a permanent attendance record.<br><br>Actions:<br>1. Create an entry function that accepts the Ticket object by value (destroying the original object).<br>2. In the same atomic transaction, mint an AttendanceBadge (Soulbound Token) and transfer it to the user.<br>3. Reclaim the Sui storage rebate from the destroyed ticket to offset the cost of the new badge.<br><br>Deliverable: An atomic ""Ticket-to-Badge"" conversion flow that prevents double-entry and builds user reputation. |

---

## 14.11. Feature: zkLogin Address Derivation (NFT-14.11)

### 14.11.1. Feature: zkLogin Address Derivation (NFT-14.11.1)

| User Story Title | User Story Body |
| --- | --- |
| 14.11.1. Feature: zkLogin Address Derivation (NFT-14.11.1) | User Story: As a Web2 user, I want to manage my tickets using my Google account, so that I don't have to worry about losing a 24-word recovery phrase.<br><br>Actions:<br>- Salt Service: Deploy a production-grade Salt Service backed by a Hardware Security Module (HSM) to ensure user salts are never exposed.<br>- Address Mapping: Use jwtToAddress(jwt, userSalt) from the @mysten/sui/zklogin SDK to compute the deterministic Sui address.<br>- Proof Generation: Integrate a Proving Service to generate the ZK Proof for the user's ephemeral signature.<br>- Consistency Check: Implement an on-chain verification that the ZK proof matches the address_seed derived from the JWT.<br><br>Deliverable: A seamless login flow where a Google OAuth redirect results in a fully functional Sui wallet address. |

---

## Summary of Requirements

| Feature | ID | Status |
|---------|----|----|
| Ticket NFTs on Sui (Base Object) | NFT-14.1.1 | Not Started |
| Dynamic QR Code Generation | NFT-14.1.2 | Not Started |
| Metadata Standards (SIP-16/Display) | NFT-14.2.1 | Not Started |
| Ticket Transfer Logic | NFT-14.3.1 | Not Started |
| Encrypted Metadata (Sui Seal Integration) | NFT-14.5.1 | Not Started |
| Dynamic Updates (Mutable State) | NFT-14.6.1 | Not Started |
| Soulbound Token (SBT) Standards | NFT-14.8.1 | Not Started |
| SBT Non-transferability Logic | NFT-14.9.1 | Not Started |
| Attendance Proof Burn Mechanisms | NFT-14.10.1 | Not Started |
| zkLogin Address Derivation | NFT-14.11.1 | Not Started |

---

## Technical Dependencies

### Sui Blockchain
- Sui Move language and object model
- Programmable Transaction Blocks (PTBs)
- Sui Object Display standard (SIP-16)
- zkLogin authentication framework
- System Clock object (0x6)

### Walrus Integration
- Blob storage for NFT metadata
- Blob ID referencing
- Sui Seal encryption/decryption

### External Services
- Salt Service with HSM backing
- ZK Proving Service
- OAuth providers (Google, etc.)

---

## Cross-References

This module integrates with:
- **Identity & Authentication (ID-01)**: zkLogin integration for Web2 user onboarding (NFT-14.11)
- **Attendance Management (AM-03)**: 
  - QR code scanning and check-in procedures (AM-3.1.1, AM-3.4.2) triggered by NFT-14.1.2
  - Ticket redemption and SBT badge minting (AM-3.2.1) using NFT-14.10
  - Timestamped verification (AM-3.5.1) for attendance tracking
- **Event Access & Validation (EA-1)**:
  - QR-based validation (EA-1.2) consumes dynamic QR from NFT-14.1.2
  - Wallet-based validation (EA-1.3) uses ticket ownership proof from NFT-14.1.1
  - Ticket ownership verification (EA-1.4) validates on-chain ownership
- **Data Preservation & Storage (DAT-04)**: Walrus blob storage for NFT metadata and encrypted content
- **User Profile System (UPS-02)**: Badge display and attendance history linked to SBTs from NFT-14.8-14.10

**Note**: TC-1 requirements are superseded by NFT-14 for core NFT implementation. TC-1.5 (Validation) is now fully covered by EA-1 and AM-3.

---

## Security Considerations

1. **Capability-Based Security**: AdminCap and ScannerCap enforce role-based access control
2. **Soulbound Enforcement**: Non-transferability prevents reputation farming and ticket scalping
3. **Encrypted Metadata**: Sui Seal ensures sensitive event details are only accessible to ticket holders
4. **zkLogin Security**: HSM-backed salt service prevents address compromise
5. **Atomic Operations**: PTBs ensure ticket-to-badge conversion is atomic and prevents double-entry
6. **Timestamp Verification**: System Clock integration provides tamper-proof audit trails

---

## Performance Considerations

1. **Parallel Execution**: Object-centric model enables high-concurrency ticket drops
2. **Fast Finality**: Owned-object transactions achieve <400ms confirmation times
3. **Storage Efficiency**: Storage rebates offset on-chain costs during ticket burning
4. **Scalability**: PTBs enable batch minting operations for large events

---

## Compliance & Standards

- **SIP-16 (Sui Improvement Proposal 16)**: Object Display standard compliance
- **Wallet Compatibility**: Ensures NFTs render correctly across Sui ecosystem wallets
- **Explorer Integration**: Metadata visible on Sui block explorers
- **Marketplace Ready**: Standard attributes enable filtering and discovery

