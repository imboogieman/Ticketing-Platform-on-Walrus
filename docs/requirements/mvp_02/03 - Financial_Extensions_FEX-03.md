# Financial Extensions Requirements (FEX-03)

## Overview

The Financial Extensions module provides advanced payment mechanisms including escrow vaults, automated refunds, and dispute resolution. These features extend the core Financial Operations (FIN-09) from MVP 01 with buyer protection and trust mechanisms essential for a decentralized ticketing platform.

---

## 3.1. Feature: Refund & Escrow Mechanism (FEX-03.1)

### 3.1.1. Feature: Escrow Vault (FEX-03.1.1)

**User Story:** As a ticket buyer, I want to know my funds are held in escrow until the event actually happens, so that I can get an automatic refund if the event is cancelled or fraudulent.

**Actions:**

| Action | Description |
|--------|-------------|
| Vault Logic | Implement an `EscrowVault` shared object that holds ticket revenue separately from the organizer's wallet. |
| Release Conditions | Create a `withdraw_funds` function that the organizer can only call after `event_end_time` has passed (and no "Cancellation" flag is set). |
| Refund Policy | Define a `claim_refund` function allowing users to pull their funds back if the event status is updated to `CANCELLED` by the admin/oracle. |
| Partial Refunds | Implement logic for voluntary refunds (e.g., Organizer approves a 50% refund for a specific user request). |
| Dispute Resolution | (Optional) Add a multi-sig "Arbiter" capability (e.g., Kleros or a DAO committee) to resolve subjective disputes. |

**Deliverable:** A test scenario where an event is marked "Cancelled," and multiple users successfully execute `claim_refund` to retrieve their SUI.

**RFP Alignment:** ✅ **Aligned**
- Supports "Payment integrations" (Event Creation & Registration)
- Enables trustless transactions aligned with decentralized platform principles
- Supports "Users retain control over their Walrus-stored data" principle extended to funds
- Addresses implicit requirement for buyer protection in a decentralized system

**Notes:**
- While not explicitly stated in the RFP, escrow mechanisms are essential for a trustworthy decentralized ticketing platform
- Aligns with the RFP's goal of removing intermediaries while maintaining financial integrity

---

## RFP Alignment Summary

| Feature | ID | RFP Alignment | Primary RFP Reference |
|---------|----|----|-----|
| Escrow Vault | FEX-03.1.1 | ✅ Aligned | Payment integrations + Decentralized trust model |

---

## High-Level Alignment Analysis

### ✅ Aligned (with Implicit RFP Support)

The Refund & Escrow Mechanism addresses a critical gap in the explicit RFP requirements. While the RFP states:

> "This project seeks to build a decentralized event and ticketing platform... where tickets, confirmations, and event details are managed by intermediaries" [are replaced]

The removal of intermediaries necessitates trustless escrow mechanisms to protect buyers. This feature:

1. **Replaces Centralized Trust:** Traditional platforms (Eventbrite, Luma) hold funds as intermediaries. Our escrow smart contract replaces this with on-chain logic.
2. **Supports Cancellation Flows:** The RFP doesn't explicitly mention refunds, but any production ticketing system requires them.
3. **Enables Transparent Financial Operations:** Aligns with "Transparent, verifiable event data" for organizers.

---

## Dependencies

| Feature | Depends On |
|---------|-----------|
| FEX-03.1.1 | FIN-09 (Financial Operations), EMS-07 (Event status/cancellation), TS-08 (Ticket ownership) |

---

---

## 3.2. Feature: Dynamic Pricing & Tiers (FEX-03.2)

### 3.2.1. Feature: Multi-Tier Pricing Engine (FEX-03.2.1)

> **Note:** This feature incorporates TS-18.2.3 (Pricing Tiers) from the Ticketing System, deferred from MVP 1.

**User Story:** As an organizer, I want to define multiple pricing tiers (e.g., Early Bird, GA, VIP) with specific supply caps and adjust ticket pricing dynamically based on demand and time, so that I can maximize revenue and offer accessible options to different segments of my community.

**Actions:**

| Action | Description |
|--------|-------------|
| Tiered Registry | Implement a `PriceTier` shared object in Move that maps `tier_id` to its respective price and `max_supply`. |
| Availability Check | Write a validation check `check_tier_availability` that ensures a purchase request doesn't exceed the tier's remaining inventory. |
| Time-Based Pricing | Enable automatic price tier switching based on the Sui Clock (e.g., Early Bird ends on date X, price increases 20%). |
| Demand-Based Pricing | (Advanced) Implement logic to increase prices when sales velocity exceeds thresholds. |
| Partner Discounts | Allow "Special Tiers" accessible only to holders of specific partner NFTs (e.g., DAO members get 15% off). |
| Price History | Emit `PriceChanged` events to track all pricing changes on-chain for transparency. |

**Deliverable:** A multi-tier pricing engine that enforces hard supply limits and dynamic pricing rules directly on-chain.

**Acceptance Criteria:**

- Pricing can be adjusted based on time until event (automatic tier switching)
- Early bird discounts are automatic based on date
- Last-minute pricing adjustments supported
- Price changes emit events and are announced to users
- Price history and changes are tracked on-chain
- Partner NFT holders can access special pricing tiers

**Deliverables:**

- Dynamic pricing logic in contract (`price_tiers.move`)
- Time-based tier switching mechanism
- Partner NFT discount hooks
- Price change event emission
- Admin interface for pricing management

**RFP Alignment:** ✅ **Aligned**
- Supports "Payment integrations and discount code management" (Event Creation & Registration)
- Extends "Each ticket is a unique, non-fungible record" with tier-specific pricing
- Supports "different ticket tiers" mentioned in Multi-track events (Optional/Extended Features)

---

### 3.2.2. Feature: User-Initiated Refunds (FEX-03.2.2)

> **Note:** This feature incorporates TS-18.2.4 (Refund Ticket Mechanisms) from the Ticketing System, deferred from MVP 1.

**User Story:** As an attendee, I want the ability to request a refund for my ticket before the event starts (within the organizer's policy), so that I can recover my funds if my plans change without needing to find a secondary buyer.

**Actions:**

| Action | Description |
|--------|-------------|
| Refund Policy Object | Create a `RefundPolicy` struct that defines the "Refund Window" (e.g., "Full refund 7 days before event") and "Cancellation Fees." |
| Request Refund | Implement a `request_refund` function that burns the Ticket object and triggers release of funds from the Event Treasury back to the user. |
| Pro-Rata Logic | Write math functions to calculate declining refund amounts as the event date approaches (e.g., 100% → 75% → 50% → 0%). |
| Admin Override | Provide a `force_refund` capability for organizers to handle exceptional cases via the admin dashboard. |
| Refund History | Emit `RefundProcessed` events and track all refunds on-chain for transparency and auditing. |

**Deliverable:** A transparent, automated refund portal that executes payouts based on pre-defined, on-chain time and fee rules.

**Acceptance Criteria:**

- Organizer can set refund policy (full, partial, none) during event creation
- Refund windows can be configured (e.g., until 48 hours before)
- Attendee can request refund within policy via self-service
- Refunds are processed automatically to original wallet
- Refund history is tracked and auditable on-chain
- Cancellation policies are displayed clearly in UI

**Deliverables:**

- Refund policy configuration in event creation
- `request_refund` function in ticket contract
- Pro-rata refund calculation logic
- Refund processing from escrow vault
- Refund analytics and tracking dashboard

**RFP Alignment:** ✅ **Aligned**
- Extends "Payment integrations" with refund capabilities
- Supports trustless financial operations without intermediaries
- Aligns with "Users retain control over their Walrus-stored data" principle extended to funds

---

## RFP Alignment Summary

| Feature | ID | RFP Alignment | Primary RFP Reference |
|---------|----|----|-----|
| Escrow Vault | FEX-03.1.1 | ✅ Aligned | Payment integrations + Decentralized trust model |
| Multi-Tier Pricing Engine | FEX-03.2.1 | ✅ Aligned | Payment integrations, discount code management |
| User-Initiated Refunds | FEX-03.2.2 | ✅ Aligned | Decentralized trust, buyer protection |

---

## Dependencies

| Feature | Depends On |
|---------|-----------|
| FEX-03.1.1 | FIN-09 (Financial Operations), EMS-07 (Event status/cancellation), TS-08 (Ticket ownership) |
| FEX-03.2.1 | FIN-09 (Payments), TS-08 (Ticket purchase), NFT-06 (Partner NFT verification) |
| FEX-03.2.2 | FEX-03.1.1 (Escrow Vault), TS-08 (Ticket ownership), EMS-07 (Event dates) |

---

## Summary of Requirements

| Feature | ID | Status |
|---------|----|----||
| Escrow Vault | FEX-03.1.1 | Not Started |
| Multi-Tier Pricing Engine | FEX-03.2.1 | Not Started |
| User-Initiated Refunds | FEX-03.2.2 | Not Started |
