# Content and Materials Requirements (CNT-02)

## Overview

The Content and Materials module provides capabilities for sharing, accessing, and managing event-related digital content. This includes speaker materials, presentation slides, recordings, and tier-gated premium content, all stored on Walrus decentralized storage with Seal encryption for access control.

---

## 2.1. Feature: Material Sharing (CNT-02.1)

### 2.1.1. Feature: Speaker Material Upload (CNT-02.1.1)

**User Story:** As a speaker, I want to share my presentation slides and code samples with the audience through the platform, so that they can follow along and reference the materials after the session.

**Actions:**

| Action | Description |
|--------|-------------|
| Walrus Integration | Build a "Speaker Portal" that allows file uploads (PDF, ZIP, IPYNB) directly to the Walrus Protocol decentralized storage. |
| Blob Linking | Write a Move function to link the resulting Walrus `BlobID` to the specific `Session` object within the event's shared state. |
| In-App Viewer | Integrate a PDF and code renderer in the frontend that fetches data directly from the Walrus gateway using the linked `BlobID`. |
| Permanent Archiving | Configure the Walrus storage epoch to match the event's lifecycle plus 1 year, ensuring materials remain accessible post-event. |

**Deliverable:** A decentralized asset library where session-specific materials are permanently linked to the event's on-chain record.

---

## 2.2. Feature: Presentation Access (CNT-02.2)

### 2.2.1. Feature: Tier-Gated Content (CNT-02.2.1)

**User Story:** As a premium attendee, I want exclusive access to high-definition recordings and private workshop notes, so that I receive the full value of my VIP ticket tier.

**Actions:**

| Action | Description |
|--------|-------------|
| Tier-Based Gating | Implement a `check_tier` logic in the Move contract that only exposes the Walrus `BlobID` to users holding a `VIP_Ticket` object. |
| Seal-Policy Gating | Use Sui Seal to encrypt the sensitive material links, only releasing the decryption key to users who sign a proof-of-ownership challenge. |
| Dynamic Content Release | Schedule the "Unlock" of specific recordings to trigger automatically 24 hours after a session ends, based on the Sui network Clock. |
| Access Analytics | Emit a `MaterialAccessed` event (anonymized) to help organizers understand which presentations were most popular among VIPs. |

**Deliverable:** A secure, token-gated content portal that enforces tiered access to exclusive event media and documentation.

---

## Dependencies

| Feature | Depends On |
|---------|-----------|
| CNT-02.1.1 | DAT-04 (Walrus storage), EMS-07 (Session objects) |
| CNT-02.2.1 | TS-08 (VIP_Ticket), DAT-04 (Seal encryption), INF-05 (Clock scheduling) |

---

## Summary of Requirements

| Feature | ID | Status |
|---------|----|----|
| Speaker Material Upload | CNT-02.1.1 | Not Started |
| Tier-Gated Content | CNT-02.2.1 | Not Started |
