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
