# 03-Attendance Management (AM-3)

## 03 Overview
This document outlines attendance management requirements, including check-in procedures, badge minting, access control, and content gating for events on the Ticketing Platform on Walrus.

---

## 3.1. Feature: Registration at Event (AM-3.1)

### 3.1.1. Feature: Check-in & Badge Minting Procedures (AM-3.1.1)

| User Story Title | User Story Body | Estimate |
| --- | --- | --- |
| 3.1.1. Feature: Check-in & Badge Minting Procedures (AM-3.1.1) | User Story: As an event attendee, I want to present my dynamic QR code to a scanner, so that my ticket is instantly validated, my entry is recorded on the blockchain, and I receive a Soulbound Attendance Badge—all in a single atomic transaction.<br><br>**Actions:**<br>- Scanner Handshake: The Gatekeeper app reads the dynamic QR (generated via TS-18.1.1) and extracts the Ticket Object ID and cryptographic signature<br>- Atomic Transaction: Execute a redeem_ticket Move function that performs both redemption and badge minting in a single Programmable Transaction Block (PTB):<br>  * Assert that the ticket's is_redeemed flag is false and event_id matches the current venue<br>  * Update Ticket object state to Redeemed<br>  * Mint Attendance Badge (SBT) with attendee's address as owner<br>  * Add metadata such as "Arrival Time" and "Entry Gate" to the badge<br>  * Store check-in timestamp using Sui 0x6 Clock<br>- State Mutation: The Ticket object remains with the user, but transfer capability is programmatically disabled to prevent exit-and-re-entry fraud<br>- Identity Linking: The Badge object includes event traits (e.g., "Early Bird Participant") based on timestamp<br>- Profile Integration: Badge is automatically added to user's attendance history (UPS-02.3.1) and badge gallery (UPS-02.4.1)<br><br>**Deliverable**: A real-time entry confirmation on both the attendee's wallet and the gatekeeper's terminal, with an immutable Attendance Badge (SBT) appearing in the user's wallet immediately post-scan. | **40-48 hours** |

---

## 3.3. Feature: Access Control System (AM-3.3)

### 3.3.2. Feature: Seal-Based Content Gating (AM-3.3.2)

| User Story Title | User Story Body | Estimate |
| --- | --- | --- |
| 3.3.2. Feature: Seal-Based Content Gating (AM-3.3.2) | User Story: As an attendee, I want to access exclusive digital content (event schedules, speaker bios, preparation materials, live backstage feeds, exclusive interviews, post-event recordings) based on my ticket ownership and attendance status, so that my ticket provides digital value before, during, and after the physical event.<br><br>**Actions:**<br>**Pre-Event Content Gating (Ticket Ownership):**<br>- Deploy Walrus Site as publicly accessible infrastructure, but encrypt specific premium content blobs using Sui Seal<br>- Implement client-side verification that checks proof-of-ownership of the event's Ticket NFT before requesting decryption keys<br>- Encrypt only premium assets (videos, documents, galleries) while keeping site structure and basic information public<br>- Utilize the attendee's wallet signature to request decryption fragments from Sui Seal for accessing gated content<br><br>**Post-Redemption Content Gating (Attendance Verified):**<br>- Extend Seal policies to support redemption-based access control<br>- Set an on-chain Seal policy that only releases decryption fragments after the ticket's is_redeemed flag is set to true via redeem_ticket (AM-3.1.1)<br>- Verify both ticket ownership AND redemption status before granting access to post-event premium content<br>- Use zkLogin to ensure that only the verified account owner can access redemption-locked content<br><br>**Deliverable**: A publicly hosted Walrus Site with selectively encrypted premium content accessible based on ticket ownership (pre-event) or attendance verification (post-event). | **24-32 hours** |

---

## 3.4. Feature: Entry Management (AM-3.4)

### 3.4.2. Feature: QR Code Scanning (AM-3.4.2)

| User Story Title | User Story Body | Estimate |
| --- | --- | --- |
| 3.4.2. Feature: QR Code Scanning (AM-3.4.2) | User Story: As an attendee, I want to present a dynamic, high-resolution QR code, so that I can enter the venue quickly without the risk of my ticket being stolen via a simple screenshot.<br><br>**Actions:**<br>- Dynamic Payload: Uses QR generation from TS-18.1.1 containing signed payload of TicketID + UserAddress + Timestamp + One-Time-Salt<br>- Short-Lived Validity: Implements scanner validation with 30-second refresh window from TS-18.1.1<br>- Fast-Path Processing: Optimize the scanner app to utilize Sui's Owned-Object transaction lane, hitting finality in <400ms<br>- Scanner Integration: Build venue-side scanner app that validates QR codes and triggers check-in flow (AM-3.1.1)<br><br>**Deliverable**: Venue scanner app integrated with TS-18.1.1 QR generation library for fraud-proof entry validation. | **42 hours** |

**Status**: CONSOLIDATED → AM-3.3.2

Post-redemption content gating is handled within AM-3.3.2 (Seal-Based Content Gating) which supports both pre-event (ticket ownership) and post-event (redemption verified) content access variants.

**Rationale**: Both pre-event and post-event content gating share 80% of infrastructure (Seal policies, decryption flows, session management). Only the access control policy differs between ownership-based and redemption-based gating.
| --- | --- |
| 3.4.3. Feature: Gated Content (AM-3.4.3) | User Story: As an attendee, I want my physical check-in to unlock exclusive digital content (live backstage feeds, exclusive interviews, post-event recordings), so that my ticket provides enhanced value during and after the event based on verified attendance.<br><br>Actions:<br>- Redemption-Locked Encryption: Extend the Seal encryption infrastructure from AM-3.3.2 to support redemption-based policies.<br>- Policy-Based Decryption: Set an on-chain Seal policy that only releases decryption fragments after the ticket's is_redeemed flag is set to true via the redeem_ticket function (AM-3.1.1).<br>- Attendance Verification: Verify both ticket ownership AND redemption status before granting access to premium content.<br>- Session Gating: Use zkLogin to ensure that only the verified account owner can access the redemption-locked content.<br>- Distinct from Pre-Event Content: Unlike AM-3.3.2 (accessible with ticket ownership), this content requires physical venue check-in to unlock.<br>- **Shared Infrastructure:** Reuses 80% of the encryption/decryption logic from AM-3.3.2, only adding redemption-state verification to the access control policy.<br>- Cross-Reference: Integrates with AM-3.1.1 (Check-in Procedures), AM-3.2.1 (Attendance Badge), and AM-3.3.2 (Shared Encryption Infrastructure).<br><br>Deliverable: Extended content portal where physical attendance redemption is the cryptographic "key" to unlock exclusive materials, leveraging shared infrastructure from AM-3.3.2. |

---

## 3.5. Feature: Validation Methods (AM-3.5)

### 3.5.1. Feature: Timestamped Verification (AM-3.5.1)

| User Story Title | User Story Body | Estimate |
| --- | --- | --- |
| 3.5.1. Feature: Timestamped Verification (AM-3.5.1) | User Story: As an event security lead, I want every ticket redemption to be anchored to a cryptographically verified timestamp, so that I have a tamper-proof audit trail of exactly when each attendee entered the venue.<br><br>**Actions:**<br>- Clock Integration: Integrate the Sui 0x6 system Clock object into the Move redeem_ticket entry function<br>- Deterministic Mapping: Capture the exact millisecond of validation using clock::timestamp_ms(clock) and store it within the Ticket object's state<br>- Audit Event: Emit a ValidationEvent containing the TicketID, GateID, and the network-verified timestamp for real-time indexing<br>- Sequential Integrity: Utilize the timestamp to prevent "Time-of-Check to Time-of-Use" (TOCTOU) exploits where a ticket might be transferred while in the scan queue<br><br>**Deliverable**: A Move-secured verification logic that produces an immutable temporal record for every entry. | **8-12 hours** |

---

## Summary of Requirements

| Feature | ID | Estimate | Status |
|---------|----|----|--------|
| Check-in & Badge Minting Procedures | AM-3.1.1 | 40-48 hours | Not Started |
| Seal-Based Content Gating | AM-3.3.2 | 24-32 hours | Not Started |
| QR Code Scanning | AM-3.4.2 | 42 hours | Not Started |
| Timestamped Verification | AM-3.5.1 | 8-12 hours | Not Started |

**Total Module Hours**: **114-142 hours**
