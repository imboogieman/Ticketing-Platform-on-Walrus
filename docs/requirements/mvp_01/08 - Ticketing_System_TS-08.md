# 18-Ticketing System (TS-18)

## 18 Overview
This document outlines the core ticketing system requirements for the Ticketing Platform on Walrus, covering ticket management, QR code generation, digital signature verification, expiration handling, double-spending prevention, and transfer policies. These features ensure secure, verifiable, and fraud-resistant digital ticketing.

---

## 18.1. Feature: Ticket Management (TS-18.1)

### 18.1.1. Feature: QR Code Generation (TS-18.1.1)

**User Story:** As an attendee, I want to view a dynamic, high-fidelity QR code in my dApp, so that I can present a secure and verifiable entry pass at the venue gates that cannot be easily spoofed or screenshotted.

**Actions:**

| Action | Description |
| --- | --- |
| Dynamic Salt Injection | Implement a client-side generator that hashes the TicketID with a rotating 30-second EpochSalt from the Sui network. |
| Vector Rendering | Utilize SVG-based rendering for the QR code to ensure high scan accuracy across all mobile screen resolutions and brightness levels. |
| Branding Governance | Embed the event logo into the QR's center "quiet zone" using standard QR design patterns to signal authenticity to the user. |
| Offline Fallback | Generate a "Signed Fragment" that remains valid for 60 minutes, allowing users to scan in even if their mobile data drops at the gate. |

**Deliverable:** A secure, rotating QR code interface that updates every 30 seconds to prevent unauthorized ticket duplication.

**RFP Alignment:** ✅ Directly supports *"QR or wallet-based validation for entry"* and *"Ticket blob includes encrypted metadata (event location, QR code, access link)"*.

---

### 18.1.2. Feature: Digital Signature Verification (TS-18.1.2)

**User Story:** As a gatekeeper, I want the scanning app to cryptographically verify the ticket's digital signature against the organizer's public key, so that I can instantly confirm the ticket was legitimately issued by the platform.

**Actions:**

| Action | Description |
| --- | --- |
| Ed25519 Handshake | Use the `sui::ed25519` Move module to verify that the ticket object carries a signature from the authorized EventRegistry key. |
| Instruction Introspection | Implement a Programmable Transaction Block (PTB) that performs the signature check as a pre-execution step before the ticket is marked as "Redeemed." |
| Public Key Derivation | Optimize bandwidth by deriving the public key directly from the signature during the validation process (ECDSA recovery pattern). |
| Anti-Spoofing Assertion | Implement `assert!(signature_is_valid, EInvalidSignature)` to halt any transaction attempting to use an altered or counterfeit ticket. |

**Deliverable:** A sub-second, on-chain verification gate that mathematically guarantees ticket authenticity.

**RFP Alignment:** ✅ Enables the RFP's vision of *"verifiable NFT tickets"* and supports *"At the venue, ticket NFTs can be scanned for validation and attendance tracking"*.

---

### 18.1.3. Feature: Expiration Handling (TS-18.1.3)

**User Story:** As an organizer, I want tickets to automatically expire and become invalid for entry after the event concludes, so that expired assets cannot be misused or clutter the active marketplace.

**Actions:**

| Action | Description |
| --- | --- |
| Timestamp Gating | Define an `expires_at` field in the Ticket struct using the Sui Clock object's millisecond timestamp. |
| State Transition Logic | Write a Move function `check_expiry` that compares the current network time to the ticket's expiration and toggles an `is_active` boolean to false. |
| Storage Fund Reclamation | Design the ticket object to be "deletable" post-event, allowing users or organizers to destroy the object and reclaim the SUI Storage Fund rebate. |
| UI Dimming | Update the frontend to visually "grey out" expired tickets and remove them from the "Active Passes" dashboard. |

**Deliverable:** An automated lifecycle management system that enforces ticket validity based on real-time network clock data.

**RFP Alignment:** ✅ Supports *"Optional dynamic updates (status, RSVP, attendance)"* and aligns with *"Users retain control over their Walrus-stored data and may delete or revoke access"*.

---

### 18.1.4. Feature: Double-Spending Prevention (TS-18.1.4)

**User Story:** As a venue manager, I want to ensure that a single ticket cannot be used for entry twice (by two different people), so that the event's capacity remains accurate and fair.

**Actions:**

| Action | Description |
| --- | --- |
| Owned-Object Locking | Leverage Sui's Single-Writer model where each ticket is an "Owned Object," meaning only the current owner can initiate a redemption transaction. |
| Atomic Redemption | Implement the `redeem_entry` function to toggle the `is_redeemed` flag to true in a single, non-reversible transaction. |
| Equivocation Protection | Use Sui's object versioning to ensure that if two entry requests are sent for the same ticket, only the first transaction advances the version number, causing the second to fail. |
| Causal Ordering | Bypass the consensus bottleneck for individual redemptions, ensuring sub-500ms finality to keep the entry lines moving. |

**Deliverable:** A "Fast-Path" entry logic that prevents double-use of any ticket through native blockchain object versioning.

**RFP Alignment:** ✅ Leverages blockchain's inherent properties for *"Transparent, verifiable event data"* and supports *"Attendance tracking and participation proof on-chain"*.

---

### 18.1.5. Feature: Transfer Policies (TS-18.1.5)

**User Story:** As a creator, I want to set specific rules for ticket resale (e.g., maximum price caps or fixed royalties), so that I can eliminate predatory scalping and ensure fair access for my community.

**Actions:**

| Action | Description |
| --- | --- |
| Sui Kiosk Integration | Register the ticket type with a `TransferPolicy` shared object, making the Kiosk system the mandatory rail for all secondary trades. |
| Hot Potato Enforcement | Utilize the `TransferRequest` "Hot Potato" pattern, forcing every trade to fulfill the royalty and price-cap rules before the transaction can finalize. |
| Royalty Rule Implementation | Add a `FixedFeeRule` to the policy that automatically routes a percentage of every resale back to the organizer's treasury. |
| Scalper Circuit-Breaker | Implement a price-ceiling rule in Move that prevents any ticket from being listed for more than 120% of its original mint price. |

**Deliverable:** A programmable secondary market environment that enforces creator-defined fairness rules for every peer-to-peer transfer.

**RFP Alignment:** ✅ Supports *"True ownership of tickets"* and *"Only the rightful holder can decrypt and view details"*. Extended feature aligned with ecosystem fairness goals.

---

## 18.2. Feature: Purchase Workflow (TS-18.2)

### 18.2.1. Feature: Buy Ticket Process (TS-18.2.1)

**User Story:** As a buyer, I want a frictionless checkout experience that automatically handles payment and ticket delivery into my secure personal vault, so that I can instantly see my purchase in my wallet without waiting for centralized database updates.

**Actions:**

| Action | Description |
| --- | --- |
| Kiosk Integration | Use the `kiosk::purchase` command within a PTB to execute the swap of USDsui (or SUI) for the Ticket object. |
| Transfer Policy Resolution | Ensure the transaction automatically fulfills the `TransferPolicy` requirements (e.g., royalty payments or address whitelisting) in the same atomic block. |
| Vaulting | Automatically create a Kiosk for new users during the checkout if one doesn't exist, transferring the `KioskOwnerCap` to their address. |
| On-chain Event | Emit a `TicketPurchased` event to trigger the real-time update of the user's dashboard and the organizer's sales metrics. |

**Deliverable:** A unified "Buy Now" checkout flow that delivers an on-chain ticket and updates the user's personal Kiosk in a single transaction.

**RFP Alignment:** ✅ Directly supports *"Payment integrations"* and *"Ticket NFTs minted on Sui"*. Native Sui Kiosk pattern.

---

### 18.2.2. Feature: Quantity Selection (TS-18.2.2)

**User Story:** As a group coordinator, I want to purchase multiple tickets (up to 10) in a single transaction, so that I can secure entry for my entire team without paying multiple gas fees or risking the event selling out between purchases.

**Actions:**

| Action | Description |
| --- | --- |
| PTB Batching | Utilize Programmable Transaction Blocks to loop the `mint_ticket` or `purchase` command up to the user-selected quantity. |
| Payment Consolidation | Use `coin::split` within the PTB to break a single large payment coin into the exact amounts required for each individual ticket in the batch. |
| Atomic Fail-Safe | Ensure that if any single ticket in the batch fails (e.g., due to a tier selling out), the entire transaction rolls back to prevent "partial orders." |
| Gas Efficiency | Optimize the PTB to use Shared Object inputs for the registry once, regardless of how many tickets are being minted in that specific block. |

**Deliverable:** A batch-purchase capability that allows for the acquisition of multiple tickets in a single, gas-efficient atomic transaction.

**RFP Alignment:** ✅ Supports practical UX for *"Payment integrations"*. Leverages native Sui PTB capabilities.

> **Note:** Features TS-18.2.3 (Pricing Tiers) and TS-18.2.4 (Refund Ticket Mechanisms) have been moved to [MVP 2 - Optional & Extended Features](../mvp_02/Optional_and_Extended_Features_OE-1.md).

---

## 18.3. Feature: Ticket Validation (TS-18.3)

### 18.3.1. Feature: On-Chain Verification (TS-18.3.1)

**User Story:** As a gate manager, I want the scanning system to verify ticket ownership and status directly on the Sui blockchain in real-time, so that I can prevent the use of fraudulent, revoked, or already-redeemed tickets with absolute certainty.

**Actions:**

| Action | Description |
| --- | --- |
| Object Introspection | Implement a backend query using the `sui_getObject` RPC method to verify that the scanned TicketID exists and is currently owned by the presenter's address. |
| State Check | Validate that the `is_redeemed` boolean on the Move object is `false` before allowing the check-in transaction to proceed. |
| Smart Contract Logic | Execute the `validate_ticket` entry function to atomically toggle the ticket's state to "Redeemed" upon a successful scan. |
| Conflict Resolution | Use Sui's versioning to ensure that if a ticket is scanned at two gates simultaneously, only the first transaction is committed. |

**Deliverable:** A real-time, blockchain-synced validation gate that eliminates the possibility of using counterfeit or duplicate tickets.

**RFP Alignment:** ✅ Directly supports *"At the venue, ticket NFTs can be scanned for validation and attendance tracking"*.

---

### 18.3.2. Feature: Wallet Validation (TS-18.3.2)

**User Story:** As a security officer, I want to verify that the person presenting the ticket is the actual owner of the wallet containing that ticket, so that I can prevent "phone-passing" or unauthorized ticket sharing at the entrance.

**Actions:**

| Action | Description |
| --- | --- |
| Challenge-Response Handshake | Generate a unique, time-sensitive nonce in the scanner app and send it to the user's mobile dApp via NFC or QR. |
| Cryptographic Signing | Require the user to sign the nonce using their private key (via zkLogin or a hardware wallet). |
| Signature Verification | Use the scanner to verify the signature against the public key associated with the ticket's on-chain owner address. |
| Biometric Integration | *(Optional)* Trigger a local FaceID/TouchID check on the user's device before the signature is released to the scanner. |

**Deliverable:** A secure identity-linkage protocol that ensures only the rightful owner of the digital asset can gain entry.

**RFP Alignment:** ✅ Directly supports *"QR or wallet-based validation for entry"* and *"Only the rightful holder can decrypt and view details"*.

> **Note:** Biometric Integration is marked optional for MVP 1 - depends on device capabilities and UX requirements.

---

### 18.3.3. Feature: Timestamped Verification (TS-18.3.3)

**User Story:** As an event auditor, I want every ticket redemption to be anchored to a network-verified timestamp, so that I have a tamper-proof audit trail for capacity monitoring and post-event analytics.

**Actions:**

| Action | Description |
| --- | --- |
| Clock Object Integration | Use the Sui system `0x6` Clock object as an immutable reference in the redemption Move function. |
| Precision Logging | Capture the exact millisecond of entry using `clock::timestamp_ms(clock)` and store it in the ticket's `redemption_info` dynamic field. |
| Event Emission | Emit a `CheckInSuccess` event containing the TicketID, GateID, and the network-verified timestamp for real-time indexing. |
| Data Persistence | Ensure the timestamp remains part of the ticket's permanent on-chain history, even after the event concludes. |

**Deliverable:** A cryptographically verified "Entry Log" that provides undeniable proof of when each attendee entered the venue.

**RFP Alignment:** ✅ Directly supports *"Attendance tracking and participation proof on-chain"* and *"Organizers can export anonymized attendance data for analytics"*.

---

## Summary of Requirements

| Feature | ID | Status | RFP Alignment |
|---------|----|----|---------------|
| **18.1 Ticket Management** | | | |
| QR Code Generation | TS-18.1.1 | Not Started | ✅ Direct |
| Digital Signature Verification | TS-18.1.2 | Not Started | ✅ Direct |
| Expiration Handling | TS-18.1.3 | Not Started | ✅ Direct |
| Double-Spending Prevention | TS-18.1.4 | Not Started | ✅ Direct |
| Transfer Policies | TS-18.1.5 | Not Started | ✅ Extended |
| **18.2 Purchase Workflow** | | | |
| Buy Ticket Process | TS-18.2.1 | Not Started | ✅ Direct |
| Quantity Selection | TS-18.2.2 | Not Started | ✅ Direct |
| **18.3 Ticket Validation** | | | |
| On-Chain Verification | TS-18.3.1 | Not Started | ✅ Direct |
| Wallet Validation | TS-18.3.2 | Not Started | ✅ Direct |
| Timestamped Verification | TS-18.3.3 | Not Started | ✅ Direct |
| **Deferred to MVP 2** | | | |
| Pricing Tiers | TS-18.2.3 | MVP 2 | ✅ Direct |
| Refund Ticket Mechanisms | TS-18.2.4 | MVP 2 | ⚠️ Extended |

---

## Alignment with RFP

### High-Level Validation

This Ticketing System (TS-18) requirement aligns with the following sections of the [RFP](00-%20RFP.md):

#### ✅ **NFT Ticketing**
- **QR Code Generation (TS-18.1.1)**: Directly supports the RFP requirement: *"Ticket blob includes encrypted metadata (event location, **QR code**, access link) locked via Seal"*
- **Digital Signature Verification (TS-18.1.2)**: Enables the RFP's vision of *"verifiable NFT tickets"* by ensuring cryptographic authenticity
- **Transfer Policies (TS-18.1.5)**: Aligns with NFT ownership and the concept that *"Only the rightful holder can decrypt and view details"*

#### ✅ **Event Access & Validation**
- **QR Code Generation (TS-18.1.1)**: Supports *"QR or wallet-based validation for entry"*
- **Digital Signature Verification (TS-18.1.2)**: Critical for *"At the venue, ticket NFTs can be scanned for validation and attendance tracking"*
- **Double-Spending Prevention (TS-18.1.4)**: Ensures each ticket can only be used once, preventing fraud at entry points
- **On-Chain Verification (TS-18.3.1)**: Directly implements *"ticket NFTs can be scanned for validation"*
- **Wallet Validation (TS-18.3.2)**: Ensures *"Only the rightful holder"* can use the ticket
- **Timestamped Verification (TS-18.3.3)**: Enables *"Attendance tracking and participation proof on-chain"*

#### ✅ **NFT Technical Implementation**
- **Expiration Handling (TS-18.1.3)**: Supports the RFP's concept of *"Optional dynamic updates (status, RSVP, attendance)"* by managing ticket lifecycle states
- **Double-Spending Prevention (TS-18.1.4)**: Leverages blockchain's inherent properties mentioned implicitly in the RFP's focus on *"Transparent, verifiable event data"*

### RFP Coverage Analysis

| RFP Requirement | TS-18 Feature Coverage | Alignment Level | MVP |
|----------------|------------------------|-----------------|-----|
| NFT Ticketing - QR Code | TS-18.1.1 | ✅ Direct | 1 |
| Event Access & Validation | TS-18.1.1, TS-18.1.2, TS-18.3.1, TS-18.3.2 | ✅ Direct | 1 |
| Verifiable Tickets | TS-18.1.2, TS-18.3.1 | ✅ Direct | 1 |
| Ticket Ownership & Transfer | TS-18.1.5, TS-18.3.2 | ✅ Direct | 1 |
| Fraud Prevention | TS-18.1.4, TS-18.3.1 | ✅ Direct | 1 |
| Dynamic Ticket Updates | TS-18.1.3 | ✅ Indirect | 1 |
| Payment Integrations | TS-18.2.1, TS-18.2.2 | ✅ Direct | 1 |
| Attendance Tracking | TS-18.3.3 | ✅ Direct | 1 |
| Analytics Export | TS-18.3.3 | ✅ Direct | 1 |
| Flexible Ticket Parameters | TS-18.2.3 | ✅ Direct | 2 |
| Discount Code Management | TS-18.2.3 | ✅ Direct | 2 |
| User Control & Data Rights | TS-18.2.4 | ⚠️ Extended | 2 |

### Overengineering Assessment

| Feature | Element | Assessment |
|---------|---------|------------|
| TS-18.1.1 | 30-second QR rotation | ✅ **Appropriate** - Standard TOTP-style security pattern |
| TS-18.1.1 | SVG-based rendering | ✅ **Appropriate** - Industry standard for cross-device compatibility |
| TS-18.1.1 | Logo in QR quiet zone | ⚠️ **Optional** - Nice-to-have UX enhancement, not critical for MVP |
| TS-18.1.1 | 60-min offline fallback | ✅ **Appropriate** - Practical for real-world venue conditions |
| TS-18.1.2 | Ed25519 verification | ✅ **Appropriate** - Native Sui cryptographic primitive |
| TS-18.1.2 | PTB signature check | ✅ **Appropriate** - Sui-native transaction pattern |
| TS-18.1.3 | Sui Clock timestamp | ✅ **Appropriate** - Required for time-based validity |
| TS-18.1.3 | Storage rebate reclamation | ✅ **Appropriate** - Aligns with RFP's user data control |
| TS-18.1.4 | Single-Writer model | ✅ **Appropriate** - Leverages native Sui architecture |
| TS-18.1.4 | Sub-500ms finality | ✅ **Appropriate** - Sui's fast-path capability |
| TS-18.1.5 | Sui Kiosk integration | ✅ **Appropriate** - Standard Sui transfer policy pattern |
| TS-18.1.5 | 120% price ceiling | ⚠️ **Extended** - Not in RFP, but reasonable anti-scalping measure |
| TS-18.2.1 | Kiosk purchase flow | ✅ **Appropriate** - Native Sui Kiosk commerce pattern |
| TS-18.2.1 | Auto-create Kiosk for new users | ✅ **Appropriate** - Simplifies onboarding UX |
| TS-18.2.2 | PTB batch purchasing | ✅ **Appropriate** - Native Sui capability, improves UX |
| TS-18.2.2 | Atomic rollback on partial failure | ✅ **Appropriate** - Standard transaction safety |
| TS-18.3.1 | sui_getObject RPC verification | ✅ **Appropriate** - Standard Sui query pattern |
| TS-18.3.1 | Atomic state toggle on redemption | ✅ **Appropriate** - Required for fraud prevention |
| TS-18.3.2 | Challenge-response handshake | ✅ **Appropriate** - Standard authentication pattern |
| TS-18.3.2 | zkLogin signature verification | ✅ **Appropriate** - Native Sui identity primitive |
| TS-18.3.2 | Biometric integration | ⚠️ **Optional** - Device-dependent, nice-to-have |
| TS-18.3.3 | Sui Clock timestamp logging | ✅ **Appropriate** - Native Sui primitive for audit trail |
| TS-18.3.3 | CheckInSuccess event emission | ✅ **Appropriate** - Standard indexing pattern |

**Verdict:** All MVP 1 features are technically sound and leverage native Sui capabilities. No significant overengineering detected.

**Deferred to MVP 2 (Extended/Complex):**
- TS-18.2.3 Pricing Tiers - Dynamic pricing and partner NFT discount hooks
- TS-18.2.4 Refund mechanisms - Standard ticketing expectation, deferred for complexity

### Notes & Considerations

1. **Overlap with NFT-06**: Some features in this TS-18 specification overlap with [NFT-06 - NFT Implementation](06%20-%20NFT_Implementation_NFT-06.md), particularly:
   - **NFT-06.1.2** (Dynamic QR Code Generation) covers similar ground as **TS-18.1.1**
   - **NFT-06.3.1** (Ticket Transfer Logic) relates to **TS-18.1.5**
   
   **Recommendation**: Ensure TS-18 focuses on the *system-level ticketing operations* while NFT-06 covers the *smart contract NFT implementation*. Clear separation of concerns will prevent duplication.

2. **Seal Integration**: The RFP emphasizes *"encrypted metadata locked via Seal"*. The TS-18 features should integrate with:
   - **ID-01** (Seal Encryption Integration) for secure QR code data
   - Ensure QR codes reference encrypted Walrus blobs that only rightful owners can decrypt

3. **Cross-Feature Dependencies**:
   - **TS-18.1.1 & TS-18.1.2** depend on the ticket NFT implementation (NFT-06)
   - **TS-18.1.3** requires event timestamp validation (EMS-07)
   - **TS-18.1.4** relies on blockchain transaction finality and on-chain state management
   - **TS-18.1.5** requires Sui Kiosk framework knowledge

4. **RFP Gaps Addressed**: The RFP does not explicitly mention:
   - Ticket expiration mechanisms (TS-18.1.3) - implied by time-bound events ✅
   - Double-spending prevention details (TS-18.1.4) - blockchain inherent ✅
   - Anti-scalping measures (TS-18.1.5) - extended feature for ecosystem fairness ⚠️

5. **Purchase Workflow Dependencies**:
   - **TS-18.2.1** requires Sui Kiosk framework and `TransferPolicy` setup from TS-18.1.5
   - **TS-18.2.2** leverages PTB capabilities, no external dependencies

6. **Ticket Validation Dependencies**:
   - **TS-18.3.1** requires ticket NFT implementation (NFT-06) and scanner app infrastructure
   - **TS-18.3.2** requires zkLogin integration (ID-01) for signature verification
   - **TS-18.3.3** integrates with Attendance Management (AM-03) for proof-of-presence

7. **Features Deferred to MVP 2**:
   - **TS-18.2.3 Pricing Tiers** - Moved to [MVP 2](../mvp_02/Optional_and_Extended_Features_OE-1.md) due to complexity of dynamic pricing and partner integrations
   - **TS-18.2.4 Refund Mechanisms** - Moved to [MVP 2](../mvp_02/Optional_and_Extended_Features_OE-1.md) as extended feature requiring Event Treasury management

### Conclusion

**Overall Alignment: ✅ Strongly Aligned**

The TS-18 Ticketing System MVP 1 requirements are well-aligned with the RFP's vision for a decentralized, verifiable, and secure ticketing platform. The ten MVP 1 features directly support the core NFT ticketing, event validation, and payment use cases outlined in the RFP.

**No Overengineering Concerns:** All technical implementations leverage native Sui primitives (Single-Writer model, Kiosk, Clock, Ed25519, PTB, zkLogin) rather than introducing unnecessary complexity. The TS-18.3.2 Biometric Integration is marked optional.

**MVP Scope Summary:**
| Phase | Features | Count |
|-------|----------|-------|
| MVP 1 | TS-18.1.1–18.1.5, TS-18.2.1–18.2.2, TS-18.3.1–18.3.3 | 10 |
| MVP 2 | TS-18.2.3–18.2.4 | 2 |

**Recommendations**:
- Coordinate with NFT-06 to avoid duplication and ensure clear separation between NFT implementation and ticketing operations
- Ensure QR code generation leverages Seal encryption as specified in the RFP
- Define clear interfaces between TS-18 features and related requirements (ID-01, NFT-06, EMS-07, AM-03)
- Mark TS-18.1.5 price ceiling as "configurable" to give organizers flexibility
- Mark TS-18.3.2 biometric integration as optional for MVP 1
- Implement MVP 2 features (Pricing Tiers, Refunds) after core validation flow is stable
