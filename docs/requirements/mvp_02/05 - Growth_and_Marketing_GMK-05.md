# Growth and Marketing Requirements (GMK-05)

## Overview

The Growth and Marketing module provides tools for influencer marketing, referral tracking, and commission management. This module enables transparent, on-chain tracking of promotional campaigns and automated commission payouts, turning every ticket holder into a potential promoter.

---

## 5.1. Feature: Decentralized Referral System (GMK-05.1)

### 5.1.1. Feature: Referral Links & Commissions (GMK-05.1.1)

**User Story:** As an influencer, I want to generate a unique referral link for an event, so that I can earn a commission for every ticket sold through my promotion.

**Actions:**

| Action | Description |
|--------|-------------|
| Link Generation | Frontend logic to deterministically generate a referral code (e.g., `hash(user_address + event_id)`). |
| On-Chain Tracking | Update the `buy_ticket` function to accept an optional `referrer_address` argument. |
| Split Payment | Inside the purchase transaction, programmatically route a percentage (e.g., 5%) of the payment `Coin` directly to the `referrer_address`. |
| Transparency | Emit a `CommissionPaid` event so the influencer can track their earnings in real-time. |
| Anti-Sybil | Implement checks to prevent users from referring themselves (e.g., `sender != referrer`). |

**Deliverable:** A dashboard view for promoters showing "Total Clicks," "Total Sales," and "SUI Earned," backed by on-chain event data.

**RFP Alignment:** ✅ **Aligned**
- Supports "Proof of attendance can later be used for airdrops, follow-up campaigns, or reputation systems" (Attendance Verification)
- Extends "Payment integrations and discount code management" (Event Creation & Registration) with referral tracking
- Supports "Lead capture and networking capabilities, such as opt-in profile sharing, wallet-based reputation links, or post-event follow-ups" (Optional/Extended Features)
- Enables "Event participation becomes composable data for airdrops, loyalty, and engagement insights" (Enables for Ecosystems)

---

## RFP Alignment Summary

| Feature | ID | RFP Alignment | Primary RFP Reference |
|---------|----|----|-----|
| Referral Links & Commissions | GMK-05.1.1 | ✅ Aligned | Optional Features: Lead capture, follow-up campaigns |

---

## High-Level Alignment Analysis

### ✅ Aligned (with Extended Scope)

The Decentralized Referral System extends several RFP concepts:

1. **Follow-up Campaigns:** The RFP mentions "follow-up campaigns" - referral systems are a key growth mechanism for event platforms.

2. **Wallet-Based Reputation:** The RFP states "wallet-based reputation links" - referral earnings create a verifiable track record for promoters.

3. **Payment Integrations:** Extends payment flow with automated commission splits.

4. **Transparent & Verifiable:** Aligns with "Transparent, verifiable event data" - all referral commissions are on-chain and auditable.

**Key Innovation:**
- Traditional referral systems rely on centralized tracking. This feature uses on-chain events (`CommissionPaid`) to create a trustless, transparent affiliate system.

---

## Dependencies

| Feature | Depends On |
|---------|-----------|
| GMK-05.1.1 | FIN-09 (Payment processing), TS-08 (buy_ticket function), ID-01 (User addresses) |

---

---

## 5.2. Feature: Lead Capture & Networking (GMK-05.2)

### 5.2.1. Feature: Opt-In Profile Sharing (GMK-05.2.1)

**User Story:** As an event organizer seeking business development, I want to capture attendee information and facilitate networking, so that I can follow up with qualified leads and foster business relationships.

**Actions:**

| Action | Description |
|--------|-------------|
| Profile Sharing Opt-In | Implement a consent-based profile sharing toggle during registration that allows attendees to share contact info with organizers/sponsors. |
| Lead Capture Forms | Build custom lead capture forms that can be embedded in registration flow or triggered at sponsor booths. |
| Lead Scoring | Implement a scoring algorithm based on engagement signals (sessions attended, booth visits, content downloads). |
| Networking Matcher | Build an interest-based matching algorithm that suggests attendees to connect with based on profile tags. |
| LinkedIn Integration | Enable OAuth-based LinkedIn profile import for professional networking at B2B events. |
| CRM Export | Provide CSV/API export of captured leads with scores for integration with Salesforce, HubSpot, etc. |

**Deliverable:** A lead capture dashboard where organizers view attendee opt-ins, lead scores, and export qualified leads to their CRM.

**Acceptance Criteria:**

- Optional attendee profile sharing (opt-in only, GDPR compliant)
- LinkedIn integration for professional networking
- Lead capture forms during registration and at booths
- Lead qualification and scoring system based on engagement
- Networking dashboard matching interests
- Lead export and CRM integration

**Deliverables:**

- Opt-in profile sharing mechanism
- Integration with LinkedIn and professional networks
- Lead capture and storage system (encrypted on Walrus)
- Networking matching algorithm
- Lead export and CRM integration APIs

**RFP Alignment:** ✅ **Direct Match**
- Directly implements "Lead capture and networking capabilities, such as opt-in profile sharing, wallet-based reputation links, or post-event follow-ups" (Optional/Extended Features)
- Supports "Proof of attendance can later be used for airdrops, follow-up campaigns" via lead capture

---

## 5.3. Feature: Sponsor Activation (GMK-05.3)

### 5.3.1. Feature: Sponsor Management & Engagement (GMK-05.3.1)

**User Story:** As an event sponsor, I want to activate sponsor booths, collect leads, and integrate brand experiences, so that I can maximize ROI on sponsorship investment.

**Actions:**

| Action | Description |
|--------|-------------|
| Sponsor Registry | Implement a `Sponsor` object in Move with fields for company info, tier (Gold, Silver, Bronze), and allocated lead credits. |
| Booth Check-In | Enable attendees to "check in" at sponsor booths via QR scan, triggering lead capture and point awards. |
| Lead Notifications | Real-time notifications to sponsors when attendees interact with their booth or content. |
| Gamification | Implement raffle entries, scavenger hunts, or trivia games at sponsor booths to drive engagement. |
| Brand Integration | Allow sponsors to customize their booth page with logos, videos, and downloadable content. |
| Sponsor Analytics | Dashboard showing booth visits, lead captures, content downloads, and engagement scores. |

**Deliverable:** A sponsor portal where sponsors view real-time engagement metrics, download captured leads, and track ROI on their sponsorship investment.

**Acceptance Criteria:**

- Sponsor profiles and booth information visible in event app/site
- Lead capture forms for sponsor interactions
- Sponsor notifications when leads interact
- Gamification (raffle, games) at sponsor booths
- Sponsor analytics on engagement
- Brand asset integration in event materials

**Deliverables:**

- Sponsor management module
- Lead capture and sponsor notification system
- Sponsor engagement tracking
- Gamification framework (raffles, challenges)
- Sponsor analytics dashboard

**RFP Alignment:** ✅ **Direct Match**
- Directly implements "Integration points for event apps, sponsor activations, or loyalty programs that leverage on-chain attendance data" (Optional/Extended Features)
- Supports lead capture capabilities extended to sponsor use cases

---

## RFP Alignment Summary

| Feature | ID | RFP Alignment | Primary RFP Reference |
|---------|----|----|-----|
| Referral Links & Commissions | GMK-05.1.1 | ✅ Aligned | Optional Features: Lead capture, follow-up campaigns |
| Opt-In Profile Sharing | GMK-05.2.1 | ✅ Direct Match | Optional Features: Lead capture and networking |
| Sponsor Management | GMK-05.3.1 | ✅ Direct Match | Optional Features: Sponsor activations |

---

## Dependencies

| Feature | Depends On |
|---------|-----------|
| GMK-05.1.1 | FIN-09 (Payment processing), TS-08 (buy_ticket function), ID-01 (User addresses) |
| GMK-05.2.1 | UPS-02 (User Profiles), ID-01 (Authentication), DAT-04 (Walrus storage) |
| GMK-05.3.1 | GMK-05.2.1 (Lead Capture), AM-03 (Attendance), EMS-07 (Event data) |

---

## Summary of Requirements

| Feature | ID | Status |
|---------|----|----||
| Referral Links & Commissions | GMK-05.1.1 | Not Started |
| Opt-In Profile Sharing | GMK-05.2.1 | Not Started |
| Sponsor Management & Engagement | GMK-05.3.1 | Not Started |
