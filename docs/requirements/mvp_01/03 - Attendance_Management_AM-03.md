# 03-Attendance Management (AM-3)

## 03 Overview
This document outlines attendance management requirements, including check-in procedures, badge minting, access control, and content gating for events on the Ticketing Platform on Walrus.

---

## 3.1. Feature: Registration at Event (AM-3.1)

### 3.1.1. Feature: Check-in & Badge Minting Procedures (AM-3.1.1)

| User Story Title | User Story Body |
| --- | --- |
| 3.1.1. Feature: Check-in & Badge Minting Procedures (AM-3.1.1) | User Story: As an event attendee, I want to present my dynamic QR code to a scanner, so that my ticket is instantly validated, my entry is recorded on the blockchain, and I receive a Soulbound Attendance Badge—all in a single atomic transaction.<br><br>**Actions:**<br>- Scanner Handshake: The Gatekeeper app reads the dynamic QR (generated via TS-18.1.1) and extracts the Ticket Object ID and cryptographic signature<br>- Atomic Transaction: Execute a redeem_ticket Move function that performs both redemption and badge minting in a single Programmable Transaction Block (PTB):<br>  * Assert that the ticket's is_redeemed flag is false and event_id matches the current venue<br>  * Update Ticket object state to Redeemed<br>  * Mint Attendance Badge (SBT) with attendee's address as owner<br>  * Add metadata such as "Arrival Time" and "Entry Gate" to the badge<br>  * Store check-in timestamp using Sui 0x6 Clock<br>- State Mutation: The Ticket object remains with the user, but transfer capability is programmatically disabled to prevent exit-and-re-entry fraud<br>- Identity Linking: The Badge object includes event traits (e.g., "Early Bird Participant") based on timestamp<br>- Profile Integration: Badge is automatically added to user's attendance history (UPS-02.3.1) and badge gallery (UPS-02.4.1)<br><br>**Deliverables:**<br>- Real-time entry confirmation system<br>- Gatekeeper terminal scanner app<br>- Immutable Attendance Badge (SBT) minting<br>- Check-in Move function implementation |

---

## 3.3. Feature: Access Control System (AM-3.3)

### 3.3.2. Feature: Seal-Based Content Gating (AM-3.3.2)

| User Story Title | User Story Body |
| --- | --- |
| 3.3.2. Feature: Seal-Based Content Gating (AM-3.3.2) | User Story: As an attendee, I want to access exclusive digital content (event schedules, speaker bios, preparation materials, live backstage feeds, exclusive interviews, post-event recordings) based on my ticket ownership and attendance status, so that my ticket provides digital value before, during, and after the physical event.<br><br>**Actions:**<br>**Pre-Event Content Gating (Ticket Ownership):**<br>- Deploy Walrus Site as publicly accessible infrastructure, but encrypt specific premium content blobs using Sui Seal<br>- Implement client-side verification that checks proof-of-ownership of the event's Ticket NFT before requesting decryption keys<br>- Encrypt only premium assets (videos, documents, galleries) while keeping site structure and basic information public<br>- Utilize the attendee's wallet signature to request decryption fragments from Sui Seal for accessing gated content<br><br>**Post-Redemption Content Gating (Attendance Verified):**<br>- Extend Seal policies to support redemption-based access control<br>- Set an on-chain Seal policy that only releases decryption fragments after the ticket's is_redeemed flag is set to true via redeem_ticket (AM-3.1.1)<br>- Verify both ticket ownership AND redemption status before granting access to post-event premium content<br>- Use zkLogin to ensure that only the verified account owner can access redemption-locked content<br><br>**Deliverables:**<br>- Publicly hosted Walrus Site with encrypted content<br>- Seal policy configuration for access control<br>- Client-side verification system<br>- Content decryption workflows |

---

## Summary of Requirements

| Feature | ID | Status |
|---------|-------|--------|
| Check-in & Badge Minting Procedures | AM-3.1.1 | Not Started |
| Seal-Based Content Gating | AM-3.3.2 | Not Started |
