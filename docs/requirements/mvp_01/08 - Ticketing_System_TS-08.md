# 18-Ticketing System (TS-18)

## 18 Overview
This document outlines the core ticketing system requirements for the Ticketing Platform on Walrus, covering ticket management, QR code generation, expiration handling, and transfer policies. These features ensure secure, verifiable, and fraud-resistant digital ticketing.

---

## 18.1. Feature: Ticket Management (TS-18.1)

### 18.1.1. Feature: QR Code Generation (TS-18.1.1)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 18.1.1. Feature: QR Code Generation (TS-18.1.1) | User Story: As an attendee, I want to view a dynamic, high-fidelity QR code in my dApp, so that I can present a secure and verifiable entry pass at the venue gates that cannot be easily spoofed or screenshotted.<br><br>Actions:<br>**Dynamic Salt Injection:** Implement a client-side generator that hashes the TicketID with a rotating 30-second EpochSalt from the Sui network.<br>**Vector Rendering:** Utilize SVG-based rendering for the QR code to ensure high scan accuracy across all mobile screen resolutions and brightness levels.<br>**Branding Governance:** Embed the event logo into the QR's center "quiet zone" using standard QR design patterns to signal authenticity to the user.<br>**Offline Fallback:** Generate a "Signed Fragment" that remains valid for 60 minutes, allowing users to scan in even if their mobile data drops at the gate.<br><br>Deliverable: A secure, rotating QR code interface that updates every 30 seconds to prevent unauthorized ticket duplication. | Not Started |

---

### 18.1.2. Feature: Digital Signature (TS-18.1.2)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 18.1.2. Feature: Digital Signature (TS-18.1.2) | User Story: As a security-conscious organizer, I want each ticket to be cryptographically signed with my wallet's private key, so that attendees can verify ticket authenticity and detect counterfeit tickets before arriving at the venue.<br><br>Actions:<br>**Signature Generation:** Implement a Move function that signs the ticket's unique metadata (TicketID, EventID, owner address, tier) using the organizer's wallet during the minting process.<br>**Signature Storage:** Store the digital signature as a field in the Ticket object, making it permanently associated with the NFT on-chain.<br>**Verification Interface:** Build a "Verify Ticket" UI that allows anyone to validate the signature against the organizer's public key without requiring gate access.<br>**Frontend Display:** Display a "Verified by [Organizer Name]" badge on authentic tickets, with a visual indicator if the signature validation fails.<br><br>Deliverable: A cryptographic signature system that provides mathematical proof of ticket authenticity and prevents forgery. | Not Started |

---

### 18.1.3. Feature: Expiration Handling (TS-18.1.3)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 18.1.3. Feature: Expiration Handling (TS-18.1.3) | User Story: As an organizer, I want tickets to automatically expire and become invalid for entry after the event concludes, so that expired assets cannot be misused or clutter the active marketplace.<br><br>Actions:<br>**Timestamp Gating:** Define an `expires_at` field in the Ticket struct using the Sui Clock object's millisecond timestamp.<br>**State Transition Logic:** Write a Move function `check_expiry` that compares the current network time to the ticket's expiration and toggles an `is_active` boolean to false.<br>**Storage Fund Reclamation:** Design the ticket object to be "deletable" post-event, allowing users or organizers to destroy the object and reclaim the SUI Storage Fund rebate.<br>**UI Dimming:** Update the frontend to visually "grey out" expired tickets and remove them from the "Active Passes" dashboard.<br><br>Deliverable: An automated lifecycle management system that enforces ticket validity based on real-time network clock data. | Not Started |

---

### 18.1.5. Feature: Transfer Policies (TS-18.1.5)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 18.1.5. Feature: Transfer Policies (TS-18.1.5) | User Story: As a creator, I want to set specific rules for ticket resale (e.g., maximum price caps or fixed royalties), so that I can eliminate predatory scalping and ensure fair access for my community.<br><br>Actions:<br>**Sui Kiosk Integration:** Register the ticket type with a `TransferPolicy` shared object, making the Kiosk system the mandatory rail for all secondary trades.<br>**Hot Potato Enforcement:** Utilize the `TransferRequest` "Hot Potato" pattern, forcing every trade to fulfill the royalty and price-cap rules before the transaction can finalize.<br>**Royalty Rule Implementation:** Add a `FixedFeeRule` to the policy that automatically routes a percentage of every resale back to the organizer's treasury.<br>**Scalper Circuit-Breaker:** Implement a price-ceiling rule in Move that prevents any ticket from being listed for more than 120% of its original mint price.<br><br>Deliverable: A programmable secondary market environment that enforces creator-defined fairness rules for every peer-to-peer transfer. | Not Started |

---

## 18.2. Feature: Purchase Workflow (TS-18.2)

### 18.2.1. Feature: Buy Ticket Process (TS-18.2.1)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 18.2.1. Feature: Buy Ticket Process (TS-18.2.1) | User Story: As a buyer, I want a frictionless checkout experience that automatically handles payment and ticket delivery into my secure personal vault, so that I can instantly see my purchase in my wallet without waiting for centralized database updates.<br><br>Actions:<br>**Kiosk Integration:** Use the `kiosk::purchase` command within a PTB to execute the swap of USDsui (or SUI) for the Ticket object.<br>**Transfer Policy Resolution:** Ensure the transaction automatically fulfills the `TransferPolicy` requirements (e.g., royalty payments or address whitelisting) in the same atomic block.<br>**Vaulting:** Automatically create a Kiosk for new users during the checkout if one doesn't exist, transferring the `KioskOwnerCap` to their address.<br>**On-chain Event:** Emit a `TicketPurchased` event to trigger the real-time update of the user's dashboard and the organizer's sales metrics.<br><br>Deliverable: A unified "Buy Now" checkout flow that delivers an on-chain ticket and updates the user's personal Kiosk in a single transaction. | Not Started |

---

### 18.2.2. Feature: Quantity Selection (TS-18.2.2)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 18.2.2. Feature: Quantity Selection (TS-18.2.2) | User Story: As a group coordinator, I want to purchase multiple tickets (up to 10) in a single transaction, so that I can secure entry for my entire team without paying multiple gas fees or risking the event selling out between purchases.<br><br>Actions:<br>**PTB Batching:** Utilize Programmable Transaction Blocks to loop the `mint_ticket` or `purchase` command up to the user-selected quantity.<br>**Payment Consolidation:** Use `coin::split` within the PTB to break a single large payment coin into the exact amounts required for each individual ticket in the batch.<br>**Atomic Fail-Safe:** Ensure that if any single ticket in the batch fails (e.g., due to a tier selling out), the entire transaction rolls back to prevent "partial orders."<br>**Gas Efficiency:** Optimize the PTB to use Shared Object inputs for the registry once, regardless of how many tickets are being minted in that specific block.<br><br>Deliverable: A batch-purchase capability that allows for the acquisition of multiple tickets in a single, gas-efficient atomic transaction. | Not Started |

---

## 18.3. Feature: Ticket Validation (TS-18.3)

### 18.3.1. Feature: On-Chain Verification (TS-18.3.1)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 18.3.1. Feature: On-Chain Verification (TS-18.3.1) | User Story: As a gate manager, I want the scanning system to verify ticket ownership and status directly on the Sui blockchain in real-time, so that I can prevent the use of fraudulent, revoked, or already-redeemed tickets with absolute certainty.<br><br>Actions:<br>**Object Introspection:** Implement a backend query using the `sui_getObject` RPC method to verify that the scanned TicketID exists and is currently owned by the presenter's address.<br>**State Check:** Validate that the `is_redeemed` boolean on the Move object is `false` before allowing the check-in transaction to proceed.<br>**Smart Contract Logic:** Execute the `validate_ticket` entry function to atomically toggle the ticket's state to "Redeemed" upon a successful scan.<br>**Conflict Resolution:** Use Sui's versioning to ensure that if a ticket is scanned at two gates simultaneously, only the first transaction is committed.<br><br>Deliverable: A real-time, blockchain-synced validation gate that eliminates the possibility of using counterfeit or duplicate tickets. | Not Started |



---

## Summary of Requirements

| Feature | ID | Status |
|---------|----|----|
| **18.1 Ticket Management** | | |
| QR Code Generation | TS-18.1.1 | Not Started |
| Digital Signature | TS-18.1.2 | Not Started |
| Expiration Handling | TS-18.1.3 | Not Started |
| Transfer Policies | TS-18.1.5 | Not Started |
| **18.2 Purchase Workflow** | | |
| Buy Ticket Process | TS-18.2.1 | Not Started |
| Quantity Selection | TS-18.2.2 | Not Started |
| **18.3 Ticket Validation** | | |
| On-Chain Verification | TS-18.3.1 | Not Started |
