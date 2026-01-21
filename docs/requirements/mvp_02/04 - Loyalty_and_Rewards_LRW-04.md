# Loyalty and Rewards Requirements (LRW-04)

## Overview

The Loyalty and Rewards module provides gamification, points systems, and reward mechanisms to incentivize repeat attendance and community engagement. This module leverages on-chain attendance data (SBTs) to create transparent, verifiable loyalty programs that reward the most engaged community members.

---

## 4.1. Feature: Loyalty Points & Rewards (LRW-04.1)

### 4.1.1. Feature: Loyalty Token System (LRW-04.1.1)

**User Story:** As a marketing manager, I want to reward frequent attendees with loyalty points, so that they can redeem them for discounts on future tickets or merchandise.

**Actions:**

| Action | Description |
|--------|-------------|
| Token Standards | Deploy a `Coin<LOYALTY>` module following the standard Sui Coin pattern. |
| Earning Logic | Trigger a mint or transfer of X points to the user's wallet automatically upon `ticket_redemption` (scanning at the gate). |
| Redemption Store | Build a "Rewards Marketplace" contract where users send Loyalty Tokens to burn/exchange for `DiscountCode` NFTs or specific merchandise. |
| Tier Multipliers | Specific logic to award 2x points to holders of "VIP" SBTs. |
| Tier Progression | Implement a `LoyaltyTier` enum (Bronze, Silver, Gold, Platinum) based on cumulative points or attendance count. Each tier unlocks specific perks (discounts, early access, exclusive content). |
| Gamification | Add achievement tracking: "First Event" badge, "5-Event Streak" badge, "VIP Status" milestone. Store as composable `Achievement` objects linked to user profile. |
| Point Transfer | (Optional) Allow users to transfer loyalty points to other wallets, enabling gifting or marketplace trading. |
| Expiry Logic | (Advanced) Implement a metadata field or epoch check to expire unused points after 1 year to encourage velocity. |

**Deliverable:** A complete loop: User scans ticket → Balance increases → Tier updates → User "spends" balance → User receives 20% off coupon + achievement unlocked.

**RFP Alignment:** ✅ **Aligned**
- Directly supports "Integration points for event apps, sponsor activations, or loyalty programs that leverage on-chain attendance data" (Optional/Extended Features)
- Supports "Proof of attendance can later be used for airdrops, follow-up campaigns, or reputation systems" (Attendance Verification)
- Enables "Event participation becomes composable data for airdrops, loyalty, and engagement insights" (Enables for Ecosystems)
- Supports "True ownership of tickets, private encrypted access, and reputation-building through attendance" (Enables for Users)

---

## RFP Alignment Summary

| Feature | ID | RFP Alignment | Primary RFP Reference |
|---------|----|----|-----|
| Loyalty Token System | LRW-04.1.1 | ✅ Aligned | Optional Features: Loyalty programs leveraging on-chain attendance |

---

## High-Level Alignment Analysis

### ✅ Strongly Aligned

The Loyalty Points & Rewards feature is explicitly called out in the RFP:

> "Integration points for event apps, sponsor activations, or **loyalty programs that leverage on-chain attendance data**"

> "Proof of attendance can later be used for airdrops, follow-up campaigns, or **reputation systems**"

This feature directly implements:

1. **Attendance-Triggered Rewards:** Points minted upon ticket redemption (gate scan)
2. **On-Chain Composability:** `Coin<LOYALTY>` follows Sui standards, enabling ecosystem integration
3. **Tier System:** Bronze → Silver → Gold → Platinum progression with tier-specific perks
4. **Tier Multipliers:** VIP SBT holders receive bonus points, creating tiered engagement
5. **Gamification:** Badges, streaks, and achievements incentivize repeat attendance
6. **Redemption Marketplace:** Converts loyalty into tangible value (discounts, merchandise)

> **Note:** This feature consolidates OE-1.7 (Loyalty Program & Reward Tiers) which has been merged into this document.

---

## Dependencies

| Feature | Depends On |
|---------|-----------|
| LRW-04.1.1 | AM-03 (Attendance/ticket redemption), NFT-06 (VIP SBTs), UPS-02 (User wallet), FIN-09 (Discount codes) |

---

## Summary of Requirements

| Feature | ID | Status |
|---------|----|----|
| Loyalty Token System | LRW-04.1.1 | Not Started |
