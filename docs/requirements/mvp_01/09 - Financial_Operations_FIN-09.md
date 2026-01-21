# Financial Operations (FIN-19)

## Overview

This document outlines the financial operations requirements for the Ticketing Platform on Walrus, covering payment processing, financial reporting, and audit trails. These features ensure secure, transparent, and compliant handling of all monetary transactions across both cryptocurrency and fiat payment rails.

---

## 19.1. Feature: Payment Processing (FIN-19.1)

### 19.1.1. Feature: Cryptocurrency Acceptance (FIN-19.1.1)

**User Story:** As a crypto-native user, I want to pay for my tickets using SUI or USDC, so that I can utilize my digital assets directly without needing to off-ramp to fiat first.

**Actions:**

| Action | Description |
| --- | --- |
| Stablecoin Integration | Implement support for native Sui USDC and high-liquidity stablecoins through the DeepBook v3 liquidity pools for real-time price routing. |
| Atomic Swap Logic | Use a Programmable Transaction Block (PTB) to atomically swap non-standard tokens into the organizer's preferred settlement currency (e.g., USDsui) during the purchase. |
| Gas Sponsorship | Configure Sui Sponsored Transactions to allow users to pay for tickets even if they have $0 SUI in their wallet, deducting the gas from the ticket price. |
| Direct Transfer | Write a Move function that routes 95% of the payment to the organizer's vault and 5% to the platform treasury in a single atomic action. |

**Acceptance Criteria:**

- [ ] Users can select from supported Sui tokens (SUI, USDC, etc.) at checkout
- [ ] Atomic swap executes within a single PTB with no intermediate holding
- [ ] Gas sponsorship allows zero-SUI-balance users to complete purchases
- [ ] Payment split (95/5) is enforced on-chain and immutable
- [ ] `PaymentReceived` event is emitted with currency type, amount, and payer address
- [ ] Failed swaps roll back the entire transaction with no partial state changes

**Deliverable:** A multi-token checkout gateway that accepts any supported Sui asset and settles in the organizer's target currency instantly.

**RFP Alignment:** ✅ Directly supports *"Payment integrations and discount code management"* and enables *"Flexible ticket parameters (price, capacity, visibility, etc.)"* by allowing multi-currency pricing.

---

### 19.1.2. Feature: Fiat Currency Options (Fiat On-Ramp) (FIN-19.1.2)

**User Story:** As a mainstream user, I want to purchase tickets using my credit card or Apple Pay, so that I can attend Web3 events without needing prior knowledge of wallets or exchanges.

**Actions:**

| Action | Description |
| --- | --- |
| SDK Integration | Embed a non-custodial on-ramp provider (e.g., Banxa or Stripe Crypto SDK) directly into the checkout modal. |
| zkLogin Handshake | Use the user's social identity (Google/Apple) to generate a silent wallet address where the purchased crypto is delivered before being spent on the ticket. |
| Rate Locking | Implement a 60-second "Price Lock" via the on-ramp API to protect the user from volatility during the credit card processing window. |
| KYC Bridge | Utilize "Light-KYC" flows that allow for small-ticket purchases (under $500) without intensive documentation, following 2026 regional easing. |

**Acceptance Criteria:**

- [ ] Credit card, debit card, and Apple Pay are available as payment options
- [ ] zkLogin wallet is created silently for users authenticating via Google/Apple
- [ ] Price is locked for 60 seconds during fiat processing
- [ ] Light-KYC threshold of $500 is respected per regional compliance
- [ ] Fiat-to-crypto conversion is invisible to the end user
- [ ] Transaction confirmation is displayed within 90 seconds of payment initiation
- [ ] Failed fiat transactions do not result in any on-chain state changes

**Deliverable:** A "Web2-style" checkout experience that converts fiat to on-chain assets invisibly in the background.

**RFP Alignment:** ✅ Supports *"ZkLogin support for easy user onboarding"* and enables mainstream adoption by removing the crypto learning curve, aligning with *"Payment integrations"* requirement.

---

### 19.1.3. Feature: Payment Verification (FIN-19.1.3)

**User Story:** As an organizer, I want the system to verify the finality of every payment before issuing a ticket, so that I am protected against double-spending or failed fiat transactions.

**Actions:**

| Action | Description |
| --- | --- |
| Finality Monitoring | Implement a listener that waits for the Sui network's "Checkpointed" state before triggering the `mint_ticket` function. |
| Webhook Reconciliation | For fiat payments, set up a secure webhook listener that matches the on-ramp's `payment_success` signal with the user's pending ticket order. |
| Double-Spending Guard | Use Sui's object-centric model to "lock" the inventory object during the transaction, ensuring a ticket cannot be sold to two people during a high-traffic drop. |
| Status Dashboard | Build a real-time "Payment Status" tracker for users to see "Processing," "Verified," and "Ticket Issued" stages. |

**Acceptance Criteria:**

- [ ] Ticket minting only occurs after Sui checkpoint finality is confirmed
- [ ] Fiat payment webhook validates signature and matches pending order ID
- [ ] Inventory lock prevents race conditions during concurrent purchases
- [ ] User-facing status tracker shows real-time payment progression
- [ ] `PaymentFinalized` event is emitted only after full verification
- [ ] Failed payments are logged with reason codes for debugging

**Deliverable:** A robust verification engine that ensures 100% payment-to-ticket integrity across both crypto and fiat rails.

**RFP Alignment:** ✅ Ensures *"Transparent, verifiable event data"* by guaranteeing that every ticket issued corresponds to a verified payment, supporting the RFP's vision of trustworthy transactions.

---

### 19.1.4. Feature: Refund Processing (Manual Only) (FIN-19.1.4)

**User Story:** As a customer support lead, I want the ability to manually trigger a refund for an attendee in exceptional cases, so that I can provide high-quality service while maintaining strict control over the event treasury.

**Actions:**

| Action | Description |
| --- | --- |
| Capability Gating | Restrict the `manual_refund` Move function to addresses holding a specific `FinanceCap` issued by the organizer. |
| Burn & Return Logic | Write a function that destroys (burns) the specific `Ticket` object and simultaneously releases the corresponding funds from the escrow vault back to the original payer. |
| Approval Workflow | Implement a "Two-Step Approval" in the admin dashboard where one staff member initiates the refund and another confirms it. |
| Tax Reconciliation | Automatically adjust the organizer's "Net Revenue" report to account for the refunded amount, including a reason code for the audit trail. |

**Acceptance Criteria:**

- [ ] Only `FinanceCap` holders can initiate the refund function
- [ ] Refund burns the ticket and returns funds in a single atomic transaction
- [ ] Two-step approval requires distinct addresses for initiation and confirmation
- [ ] Refund reason codes are mandatory and stored on-chain
- [ ] `RefundProcessed` event is emitted with ticket ID, amount, and reason
- [ ] Net revenue reports automatically reflect refunded amounts
- [ ] Refund cannot exceed the original purchase price

**Deliverable:** A secure administrative tool for executing authorized refunds while maintaining an immutable log of every transaction.

**RFP Alignment:** ✅ Supports *"Users retain control over their Walrus-stored data"* by enabling ticket invalidation, and aligns with *"Ticket sales reports for tax"* by maintaining accurate financial records post-refund.

---

## 19.2. Feature: Financial Reporting (FIN-19.2)

### 19.2.1. Feature: Settlement Reports (FIN-19.2.1)

**User Story:** As an organizer, I want a detailed settlement report at the end of each day, so that I can understand my total revenue across all payment methods and currencies.

**Actions:**

| Action | Description |
| --- | --- |
| Aggregated Indexing | Use a specialized indexer to scrape all `PaymentFinalized` events and group them by currency type (SUI, USDC, Fiat). |
| FX Normalization | Convert all non-base currency sales into a "Reporting Currency" (e.g., USD) based on historical price data at the time of each transaction. |
| Withdrawal Tracking | Detail the status of funds moved from the platform's smart contract to the organizer's external bank account or cold wallet. |
| Export Options | Provide "One-Click" exports in CSV and PDF formats tailored for 2026 accounting standards. |

**Acceptance Criteria:**

- [ ] Daily settlement reports are auto-generated at 00:00 UTC
- [ ] Reports aggregate revenue by currency type (SUI, USDC, Fiat)
- [ ] FX conversion uses historical rates at transaction time
- [ ] Withdrawal status is tracked (Pending, Completed, Failed)
- [ ] CSV and PDF export options are available
- [ ] Reports include gross revenue, fees, refunds, and net revenue
- [ ] Historical reports are accessible for up to 7 years

**Deliverable:** A daily financial summary dashboard that provides a clear "Source of Truth" for all event earnings.

**RFP Alignment:** ✅ Directly supports *"Ticket sales reports for tax"* and *"Organizers can export anonymized attendance data for analytics"* by providing comprehensive financial export capabilities.

---

### 19.2.2. Feature: Transaction History (FIN-19.2.2)

**User Story:** As an attendee, I want to see a clear history of all my ticket purchases and refunds, so that I can track my spending and have proof of purchase for my personal records.

**Actions:**

| Action | Description |
| --- | --- |
| Personal Ledger | Build a "Finance" tab in the user profile that queries all transactions linked to their `SuiAddress`. |
| Receipt Generation | Allow users to download a "Cryptographic Receipt" containing the transaction digest, date, and a Walrus-hosted image of the ticket. |
| Interactive UI | Implement filters for "Successful," "Pending," and "Refunded" transactions with a direct link to the SuiVision explorer for technical proof. |

**Acceptance Criteria:**

- [ ] "Finance" tab displays all user transactions chronologically
- [ ] Each transaction shows date, event name, amount, currency, and status
- [ ] Cryptographic receipts are downloadable as PDF
- [ ] Receipts include transaction digest verifiable on SuiVision
- [ ] Filters allow sorting by status (Successful, Pending, Refunded)
- [ ] Transaction history is queryable via the user's connected wallet
- [ ] No personal data is exposed beyond what the user controls

**Deliverable:** A user-facing financial history portal that provides transparency and record-keeping for every platform interaction.

**RFP Alignment:** ✅ Supports *"True ownership of tickets"* by providing verifiable proof of purchase, and aligns with *"Event data remains verifiable on Walrus"* through cryptographic receipts.

---

### 19.2.3. Feature: Audit Trails (FIN-19.2.3)

**User Story:** As a compliance officer, I want a tamper-proof audit trail of every financial action taken on the platform, so that the organization can pass annual audits and meet global regulatory requirements.

**Actions:**

| Action | Description |
| --- | --- |
| Immutable Event Logging | Emit a unique `FinancialAudit` event for every mint, transfer, and refund, containing a hash of the current system state. |
| Admin Action Tracking | Log every use of the `FinanceCap` or `AdminCap`, identifying which staff address performed which manual override or refund. |
| CARF-Ready Data | Ensure all audit logs include the required metadata for Crypto-Asset Reporting Framework (CARF) compliance, including counterparty addresses and timestamps. |
| Verification Tool | Provide a "Verify Integrity" script that compares on-chain logs against the platform's internal database to ensure no data has been altered. |

**Acceptance Criteria:**

- [ ] `FinancialAudit` event is emitted for every financial state change
- [ ] Events include state hash, timestamp, actor address, and action type
- [ ] Admin actions are logged with capability type and staff identifier
- [ ] CARF-compliant metadata fields are present in all audit events
- [ ] Integrity verification script is provided and documented
- [ ] Audit logs are immutable and cannot be deleted or modified
- [ ] Auditor-access portal allows read-only access to chronological logs

**Deliverable:** A comprehensive, "Auditor-Access" portal that provides a chronologically ordered, immutable record of every dollar and token moved.

**RFP Alignment:** ✅ Enables *"Transparent, verifiable event data and participant history"* and supports *"Ticket sales reports for tax"* through CARF-compliant audit trails.

---

## RFP Alignment Summary

| Feature | RFP Requirement | Alignment Status |
| --- | --- | --- |
| Cryptocurrency Acceptance (FIN-19.1.1) | Payment integrations | ✅ Aligned |
| Fiat On-Ramp (FIN-19.1.2) | ZkLogin support, Payment integrations | ✅ Aligned |
| Payment Verification (FIN-19.1.3) | Transparent, verifiable event data | ✅ Aligned |
| Refund Processing (FIN-19.1.4) | User data control, Tax reports | ✅ Aligned |
| Settlement Reports (FIN-19.2.1) | Ticket sales reports for tax, Export analytics | ✅ Aligned |
| Transaction History (FIN-19.2.2) | True ownership, Verifiable data on Walrus | ✅ Aligned |
| Audit Trails (FIN-19.2.3) | Transparent data, Tax reports | ✅ Aligned |

---

## High-Level RFP Validation

The Financial Operations (FIN-19) requirements are **fully aligned** with the RFP on the following key dimensions:

1. **Payment Integrations**: The RFP explicitly calls for *"Payment integrations and discount code management."* FIN-19.1.1 (Cryptocurrency) and FIN-19.1.2 (Fiat On-Ramp) directly fulfill this requirement by supporting both crypto-native and mainstream payment methods.

2. **ZkLogin Support**: The RFP emphasizes *"ZkLogin support for easy user onboarding."* FIN-19.1.2's zkLogin Handshake enables seamless wallet creation for fiat users, removing barriers to entry.

3. **Transparency & Verifiability**: The RFP vision includes *"Transparent, verifiable event data and participant history."* FIN-19.1.3 (Payment Verification) and FIN-19.2.3 (Audit Trails) ensure every transaction is cryptographically verifiable.

4. **Tax & Compliance Reporting**: The RFP requires *"Ticket sales reports for tax."* FIN-19.2.1 (Settlement Reports) and FIN-19.2.3 (Audit Trails) provide comprehensive financial reporting with CARF compliance.

5. **User Ownership & Control**: The RFP states *"Users retain control over their Walrus-stored data."* FIN-19.2.2 (Transaction History) gives users full visibility into their financial interactions, with cryptographic receipts they own.

6. **Decentralization Philosophy**: All financial operations leverage Sui's on-chain capabilities (PTBs, object model, events) rather than centralized payment processors, maintaining the RFP's decentralized architecture vision.

**Conclusion:** All user stories in FIN-19 support and extend the RFP's core vision without contradiction. The module fills a critical gap in the RFP's *"Payment integrations"* requirement by providing detailed implementation specifications for both crypto and fiat payment flows.
