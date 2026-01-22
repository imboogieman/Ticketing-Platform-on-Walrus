# 03-Attendance Management (AM-3)

## 03 Overview
This document outlines attendance management requirements, including on-site registration, tracking, access control, entry operations, and validation methods for events on the Ticketing Platform on Walrus.

---

## 3.1. Feature: Registration at Event (AM-3.1)

### 3.1.1. Feature: Check-in Procedures (AM-3.1.1)

| User Story Title | User Story Body |
| --- | --- |
| 3.1.1. Feature: Check-in Procedures (AM-3.1.1) | User Story: As an event attendee, I want to present my dynamic QR code to a scanner, so that my ticket is instantly validated and my entry is recorded on the blockchain without delay.<br><br>Actions:<br>- Scanner Handshake: The Gatekeeper app reads the dynamic QR (generated via TS-18.1.1) and extracts the Ticket Object ID and cryptographic signature.<br>- Redemption Call: The app executes a redeem_ticket Move function, which asserts that the ticket is_redeemed flag is false and the event_id matches the current venue.<br>- State Mutation: The Ticket object state is updated to Redeemed, and the owner field remains with the user, but the transfer capability is programmatically disabled to prevent exit-and-re-entry fraud.<br><br>Deliverable: A real-time entry confirmation on both the attendee’s wallet and the gatekeeper’s terminal. |

---

## 3.2. Feature: Attendance Tracking (AM-3.2)

### 3.2.1. Feature: Attendance Tracking (AM-3.2.1)

| User Story Title | User Story Body |
| --- | --- |
| 3.2.1. Feature: Attendance Tracking (AM-3.2.1) | User Story: As a participant, I want to automatically receive a non-transferable Soulbound Token (SBT) upon check-in, so that I have permanent, verifiable proof of my attendance for future loyalty rewards.<br><br>Actions:<br>- Atomic Trigger: Upon the successful execution of the redeem_ticket function (AM-3.1.1), the contract triggers a secondary mint_attendance_badge command within the same Transaction Block.<br>- Identity Linking: The new Badge object is minted with the attendee's address as the owner and includes metadata such as "Arrival Time" and "Entry Gate."<br>- Trait Injection: Use Sui's Dynamic Fields to add specific event traits (e.g., "Early Bird Participant") based on the timestamp of the check-in.<br>- Profile Integration: Badge is automatically added to the user's attendance history (UPS-02.3.1) and displayed in their badge gallery (UPS-02.4.1).<br>- Cross-Reference: Triggered by AM-3.1.1 (Check-in); displayed in UPS-02.4.1 (Badge System).<br><br>Deliverable: An immutable, non-transferable Attendance Badge (SBT) appearing in the user's wallet immediately post-scan. |

---

## 3.3. Feature: Access Control System (AM-3.3)

### 3.3.2. Feature: Walrus Site Access Integration (AM-3.3.2)

| User Story Title | User Story Body |
| --- | --- |
| 3.3.2. Feature: Walrus Site Access Integration (AM-3.3.2) | User Story: As an attendee, I want to access exclusive pre-event digital content (event schedules, speaker bios, preparation materials) on a Walrus Site, so that my ticket provides digital value before physical entry.<br><br>Actions:<br>- Public Site Architecture: Deploy Walrus Site as publicly accessible infrastructure, but encrypt specific premium content blobs using Sui Seal.<br>- NFT-Based Content Gating: Implement client-side verification that checks proof-of-ownership of the event's Ticket NFT before requesting decryption keys for premium content.<br>- Selective Encryption: Encrypt only premium assets (videos, documents, galleries) while keeping the site structure and basic information public.<br>- Session-Based Decryption: Utilize the attendee's wallet signature to request decryption fragments from Sui Seal for accessing gated content during their browsing session.<br>- Pre-Event Access: This feature grants access based on ticket ownership alone, without requiring physical check-in (see AM-3.4.3 for post-redemption content).<br>- **Shared Infrastructure:** The Seal encryption/decryption infrastructure is shared with AM-3.4.3 (Post-Redemption Gated Content), reducing total implementation effort by ~40%.<br><br>Deliverable: A publicly hosted Walrus Site with selectively encrypted premium content accessible only to valid Ticket NFT holders. Core encryption infrastructure reusable for AM-3.4.3. |

---

## 3.4. Feature: Entry Management (AM-3.4)

### 3.4.2. Feature: QR Code Scanning (AM-3.4.2)

**Primary Implementation:** See [TS-18.1.1 - QR Code Generation](08 - Ticketing_System_TS-08.md) for core QR library implementation.

| User Story Title | User Story Body |
| --- | --- |
| 3.4.2. Feature: QR Code Scanning (AM-3.4.2) | User Story: As an attendee, I want to present a dynamic, high-resolution QR code, so that I can enter the venue quickly without the risk of my ticket being stolen via a simple screenshot.<br><br>**Implementation Note:** This feature uses the QR code library implemented in TS-18.1.1. The effort here covers scanner app integration and validation workflow.<br><br>Actions:<br>- Dynamic Payload: Uses QR generation from TS-18.1.1 containing signed payload of TicketID + UserAddress + Timestamp + One-Time-Salt.<br>- Short-Lived Validity: Implements scanner validation with 30-second refresh window from TS-18.1.1.<br>- Fast-Path Processing: Optimize the scanner app to utilize Sui's Owned-Object transaction lane, hitting finality in <400ms.<br>- Scanner Integration: Build venue-side scanner app that validates QR codes and triggers check-in flow (AM-3.1.1).<br><br>Cross-Reference: QR Generation (TS-18.1.1), Check-in Procedures (AM-3.1.1)<br><br>Deliverable: Venue scanner app integrated with TS-18.1.1 QR generation library for fraud-proof entry validation. |

### 3.4.3. Feature: Gated Content (AM-3.4.3)

| User Story Title | User Story Body |
| --- | --- |
| 3.4.3. Feature: Gated Content (AM-3.4.3) | User Story: As an attendee, I want my physical check-in to unlock exclusive digital content (live backstage feeds, exclusive interviews, post-event recordings), so that my ticket provides enhanced value during and after the event based on verified attendance.<br><br>Actions:<br>- Redemption-Locked Encryption: Extend the Seal encryption infrastructure from AM-3.3.2 to support redemption-based policies.<br>- Policy-Based Decryption: Set an on-chain Seal policy that only releases decryption fragments after the ticket's is_redeemed flag is set to true via the redeem_ticket function (AM-3.1.1).<br>- Attendance Verification: Verify both ticket ownership AND redemption status before granting access to premium content.<br>- Session Gating: Use zkLogin to ensure that only the verified account owner can access the redemption-locked content.<br>- Distinct from Pre-Event Content: Unlike AM-3.3.2 (accessible with ticket ownership), this content requires physical venue check-in to unlock.<br>- **Shared Infrastructure:** Reuses 80% of the encryption/decryption logic from AM-3.3.2, only adding redemption-state verification to the access control policy.<br>- Cross-Reference: Integrates with AM-3.1.1 (Check-in Procedures), AM-3.2.1 (Attendance Badge), and AM-3.3.2 (Shared Encryption Infrastructure).<br><br>Deliverable: Extended content portal where physical attendance redemption is the cryptographic "key" to unlock exclusive materials, leveraging shared infrastructure from AM-3.3.2. |

---

## 3.5. Feature: Validation Methods (AM-3.5)

### 3.5.1. Feature: Timestamped Verification (AM-3.5.1)

| User Story Title | User Story Body |
| --- | --- |
| 3.5.1. Feature: Timestamped Verification (AM-3.5.1) | User Story: As an event security lead, I want every ticket redemption to be anchored to a cryptographically verified timestamp, so that I have a tamper-proof audit trail of exactly when each attendee entered the venue.<br><br>Actions:<br>- Clock Integration: Integrate the Sui 0x6 system Clock object into the Move redeem_ticket entry function.<br>- Deterministic Mapping: Capture the exact millisecond of validation using clock::timestamp_ms(clock) and store it within the Ticket object's state.<br>- Audit Event: Emit a ValidationEvent containing the TicketID, GateID, and the network-verified timestamp for real-time indexing.<br>- Sequential Integrity: Utilize the timestamp to prevent "Time-of-Check to Time-of-Use" (TOCTOU) exploits where a ticket might be transferred while in the scan queue.<br><br>Deliverable: A Move-secured verification logic that produces an immutable temporal record for every entry. |

---

## Summary of Requirements

| Feature | ID | Status |
|---------|----|----|
| Check-in Procedures | AM-3.1.1 | Not Started |
| Attendance Tracking | AM-3.2.1 | Not Started |
| Walrus Site Access Integration | AM-3.3.2 | Not Started |
| QR Code Scanning | AM-3.4.2 | Not Started |
| Gated Content | AM-3.4.3 | Not Started |
| Timestamped Verification | AM-3.5.1 | Not Started |
