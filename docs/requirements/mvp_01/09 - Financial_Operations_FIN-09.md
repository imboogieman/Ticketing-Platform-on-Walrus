# Financial Operations (FIN-19)

## Overview

This document outlines the financial operations requirements for the Ticketing Platform on Walrus, covering payment processing, financial reporting, and audit trails. These features ensure secure, transparent, and compliant handling of all monetary transactions across both cryptocurrency and fiat payment rails.

---

## 19.1. Feature: Payment Processing (FIN-19.1)

### 19.1.1. Feature: Cryptocurrency Acceptance (FIN-19.1.1)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 19.1.1. Feature: Cryptocurrency Acceptance (FIN-19.1.1) | User Story: As a crypto-native user, I want to pay for my tickets using SUI or USDC, so that I can utilize my digital assets directly without needing to off-ramp to fiat first.<br><br>Actions:<br>**Stablecoin Integration:** Implement support for native Sui USDC and high-liquidity stablecoins through the DeepBook v3 liquidity pools for real-time price routing.<br>**Atomic Swap Logic:** Use a Programmable Transaction Block (PTB) to atomically swap non-standard tokens into the organizer's preferred settlement currency (e.g., USDsui) during the purchase.<br>**Gas Sponsorship:** Configure Sui Sponsored Transactions to allow users to pay for tickets even if they have $0 SUI in their wallet, deducting the gas from the ticket price.<br>**Direct Transfer:** Write a Move function that routes 95% of the payment to the organizer's vault and 5% to the platform treasury in a single atomic action.<br><br>Deliverables:<br>- Move contract module for multi-token payment processing<br>- DeepBook v3 integration for atomic swaps<br>- Gas sponsorship service configuration<br>- Payment split logic (95/5 organizer/platform)<br>- Frontend token selection UI<br>- Payment event emission | Not Started |

---

### 19.1.2. Feature: Fiat Currency Options (Fiat On-Ramp) (FIN-19.1.2)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 19.1.2. Feature: Fiat Currency Options (Fiat On-Ramp) (FIN-19.1.2) | User Story: As a mainstream user, I want to purchase tickets using my credit card or Apple Pay, so that I can attend Web3 events without needing prior knowledge of wallets or exchanges.<br><br>Actions:<br>**SDK Integration:** Embed a non-custodial on-ramp provider (e.g., Banxa or Stripe Crypto SDK) directly into the checkout modal.<br>**zkLogin Handshake:** Use the user's social identity (Google/Apple) to generate a silent wallet address where the purchased crypto is delivered before being spent on the ticket.<br>**Rate Locking:** Implement a 60-second "Price Lock" via the on-ramp API to protect the user from volatility during the credit card processing window.<br>**KYC Bridge:** Utilize "Light-KYC" flows that allow for small-ticket purchases (under $500) without intensive documentation, following 2026 regional easing.<br><br>Deliverables:<br>- On-ramp provider SDK integration (Banxa/Stripe)<br>- zkLogin wallet creation flow<br>- Price locking mechanism (60-second window)<br>- Light-KYC compliance implementation<br>- Frontend checkout modal with fiat payment options<br>- Fiat-to-crypto conversion handling | Not Started |

---

### 19.1.3. Feature: Payment Verification (FIN-19.1.3)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 19.1.3. Feature: Payment Verification (FIN-19.1.3) | User Story: As an organizer, I want the system to verify the finality of every payment before issuing a ticket, so that I am protected against double-spending or failed fiat transactions.<br><br>Actions:<br>**Finality Monitoring:** Implement a listener that waits for the Sui network's "Checkpointed" state before triggering the `mint_ticket` function.<br>**Webhook Reconciliation:** For fiat payments, set up a secure webhook listener that matches the on-ramp's `payment_success` signal with the user's pending ticket order.<br>**Double-Spending Guard:** Use Sui's object-centric model to "lock" the inventory object during the transaction, ensuring a ticket cannot be sold to two people during a high-traffic drop.<br>**Status Dashboard:** Build a real-time "Payment Status" tracker for users to see "Processing," "Verified," and "Ticket Issued" stages.<br><br>Deliverables:<br>- Sui checkpoint finality listener<br>- Webhook endpoint for fiat payment verification<br>- Inventory locking mechanism<br>- Frontend payment status tracker UI<br>- Payment event logging<br>- Error handling and retry logic | Not Started |

---

## 19.2. Feature: Financial Reporting (FIN-19.2)

### 19.2.2. Feature: Transaction History (FIN-19.2.2)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 19.2.2. Feature: Transaction History (FIN-19.2.2) | User Story: As an attendee, I want to see a clear history of all my ticket purchases and refunds, so that I can track my spending and have proof of purchase for my personal records.<br><br>Actions:<br>**Personal Ledger:** Build a "Finance" tab in the user profile that queries all transactions linked to their `SuiAddress`.<br>**Receipt Generation:** Allow users to download a "Cryptographic Receipt" containing the transaction digest, date, and a Walrus-hosted image of the ticket.<br>**Interactive UI:** Implement filters for "Successful," "Pending," and "Refunded" transactions with a direct link to the SuiVision explorer for technical proof.<br><br>Deliverables:<br>- "Finance" tab in user profile UI<br>- Transaction query by wallet address<br>- Cryptographic receipt generation (PDF)<br>- Frontend filters (Successful/Pending/Refunded)<br>- SuiVision explorer integration<br>- API endpoint: `GET /api/user/transactions?address={address}` | Not Started |

---

### 19.2.3. Feature: Audit Trails (FIN-19.2.3)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 19.2.3. Feature: Audit Trails (FIN-19.2.3) | User Story: As a compliance officer, I want a tamper-proof audit trail of every financial action taken on the platform, so that the organization can pass annual audits and meet global regulatory requirements.<br><br>Actions:<br>**Immutable Event Logging:** Emit a unique `FinancialAudit` event for every mint, transfer, and refund, containing a hash of the current system state.<br>**Admin Action Tracking:** Log every use of the `FinanceCap` or `AdminCap`, identifying which staff address performed which manual override or refund.<br>**CARF-Ready Data:** Ensure all audit logs include the required metadata for Crypto-Asset Reporting Framework (CARF) compliance, including counterparty addresses and timestamps.<br>**Verification Tool:** Provide a "Verify Integrity" script that compares on-chain logs against the platform's internal database to ensure no data has been altered.<br><br>Deliverables:<br>- `FinancialAudit` event type and emission logic<br>- Admin action logging system<br>- CARF-compliant metadata fields<br>- Integrity verification script<br>- Auditor-access portal (read-only)<br>- Documentation for regulatory compliance | Not Started |

