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

**Note:** Tier-Gated Content (CNT-02.2.1) has been moved to MVP 1 Platform Deliverables (PD-05.4.1) for core platform delivery.

---

## Dependencies

| Feature | Depends On |
|---------|-----------|
| CNT-02.1.1 | DAT-04 (Walrus storage), EMS-07 (Session objects) |


---

## Summary of Requirements

| Feature | ID | Status |
|---------|----|----|
| Speaker Material Upload | CNT-02.1.1 | Not Started |

