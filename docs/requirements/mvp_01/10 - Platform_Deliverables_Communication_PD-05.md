# Platform Deliverables: Communication System (PD-05)

## Overview

This document outlines the communication **features and use cases** for the Ticketing Platform on Walrus. For delivery channel specifications (email, wallet, in-app), see [CM-1 - Communication Delivery Channels](Communication_CM-1.md).

**Scope:** What is communicated (alerts, reminders, chat, content sharing)  
**Related:** CM-1 defines *how* notifications are delivered (infrastructure)

---

## RFP Alignment Summary

| RFP Requirement | PD-05 Coverage | Status |
|-----------------|----------------|--------|
| *"Optional integration notifications (reminders, updates, confirmations, event chat)"* | PD-05.1, PD-05.2, PD-05.3 | ✅ Aligned |
| *"Communications: Optional integration for email or wallet notifications"* | PD-05.1.1, PD-05.3.1, PD-05.3.2 | ✅ Aligned |
| *"Lead capture and networking capabilities, such as opt-in profile sharing"* | PD-05.2.3 | ✅ Aligned |

**Overall Assessment:** All user stories in PD-05 are **aligned** with the high-level RFP objectives. The communication features extend the RFP's optional communication integrations with blockchain-native, encrypted, and verifiable messaging capabilities.

---

## 05.1. Feature: Communication Tools (PD-05.1)

### 05.1.1. Feature: Update Alerts (PD-05.1.1)

**User Story:** As an organizer, I want to send urgent, wallet-linked alerts to all ticket holders, so that I can ensure they receive critical information (e.g., security protocols or weather warnings) through a verified, tamper-proof channel.

**Actions:**

| Action | Description |
|--------|-------------|
| Channel Creation | Use the Sui Stack Messaging SDK to initialize a broadcast channel linked to the unique EventID. |
| Membership Verification | Query ticket ownership to determine the notification recipient list. |
| In-App & Wallet Delivery | Deliver alerts via in-app notifications and wallet-linked push notifications to ticket holders. |

**Deliverable:** An "Alert Center" in the organizer dashboard that pushes wallet-linked notifications to all ticket holders.

**RFP Alignment:** ✅ Directly supports *"Communications: Optional integration for email or wallet notifications (reminders, updates, confirmations)"*.

---

### 05.1.2. Feature: Schedule Changes (PD-05.1.2)

**User Story:** As an attendee, I want to receive updates regarding speaker times or session moves, so that I can adjust my schedule without manually checking the website.

**Actions:**

| Action | Description |
|--------|-------------|
| Schedule Storage | Store event schedule data in Walrus or off-chain database for easy updates. |
| Change Detection | Use off-chain polling or webhooks to detect schedule updates. |
| Broadcast Update | Send schedule change notifications to ticket holders via configured delivery channels (CM-1). |
| Frontend Sync | Refresh the user's schedule view when updates are detected. |

**Deliverable:** A schedule notification system that pushes timeline changes to event attendees.

**RFP Alignment:** ✅ Supports *"Optional dynamic updates (status, RSVP, attendance)"*.

---

### 05.1.3. Feature: Event Notifications (PD-05.1.3)

**User Story:** As a user, I want to receive general event reminders (e.g., "Doors opening in 1 hour" or "Check-in now available"), so that I am kept engaged and informed throughout the event lifecycle.

**Actions:**

| Action | Description |
|--------|-------------|
| Scheduled Notifications | Use an off-chain scheduler (cron jobs) to trigger time-based notifications. |
| Tier-Based Logic | Filter notifications by ticket tier when relevant (e.g., "VIP early access"). |
| Opt-in Management | Build a "Notification Preferences" UI that allows users to toggle notification types. |

**Deliverable:** A notification system that sends lifecycle reminders to attendees via configured delivery channels (CM-1).

**RFP Alignment:** ✅ Directly implements *"Optional integration notifications (reminders, updates, confirmations)"*.

---

## 05.2. Feature: Communication Platform (PD-05.2)

### 05.2.1. Feature: Event Chat Functionality (PD-05.2.1)

**User Story:** As an attendee, I want to participate in a token-gated event chat, so that I can network with other verified participants without exposing my personal contact information.

**Actions:**

| Action | Description |
|--------|-------------|
| SDK Implementation | Integrate the Sui Stack Messaging SDK to initialize a chat room linked to the EventID. |
| Token-Gated Access | Verify that the user's address holds a valid Ticket or AttendeeBadge object before granting read/write access to the chat. |
| Frontend UI | Build a real-time chat interface featuring message threads and basic moderation tools for organizers. |

**Deliverable:** A token-gated messaging environment accessible only to verified attendees, powered by the Sui Messaging SDK.

**RFP Alignment:** ✅ Directly implements *"event chat"* mentioned in *"Optional integration notifications (reminders, updates, confirmations, event chat)"*.

---

### 05.2.2. Feature: Schedule Updates (PD-05.2.2)

**User Story:** As an organizer, I want to push updates to the event schedule, so that attendees are notified of speaker delays or room changes.

**Actions:**

| Action | Description |
|--------|-------------|
| Schedule Data Update | Update the event schedule data (can be stored on Walrus or off-chain database). |
| Push Notification | Send push notifications to ticket holders when schedule changes are published. |
| UI Synchronization | Implement refresh logic in the dApp to update the schedule view when changes are detected. |

**Deliverable:** A schedule update system that notifies attendees of event timeline changes.

**RFP Alignment:** ✅ Supports *"Optional dynamic updates (status, RSVP, attendance)"* and *"updates"* from the communication requirements.

---

### 05.2.3. Feature: Attendee List (PD-05.2.3)

**User Story:** As a networker, I want to see a list of other attendees who have opted-in to be visible, so that I can discover peers with similar interests and initiate professional connections.

**Actions:**

| Action | Description |
|--------|-------------|
| Opt-in Mechanism | Add an `is_visible` boolean to the UserProfile (UPS-02.1) that defaults to `false` for maximum privacy. |
| Query Filtering | Build an indexer query that fetches UserProfile data only for users who have both the "Opt-in" flag and a valid Ticket for the current event. |
| Privacy-Preserving UI | Display only the user's avatar (from Walrus) and bio, while keeping their full wallet address truncated or hidden until a connection is accepted. |

**Deliverable:** A searchable "Attendee Directory" that balances community discovery with individual user privacy.

**RFP Alignment:** ✅ Directly implements *"Lead capture and networking capabilities, such as opt-in profile sharing, wallet-based reputation links"* from the Optional/Extended Features.

---

## 05.3. Feature: Notification System (PD-05.3)

### 05.3.1. Feature: Event Reminders (PD-05.3.1)

**User Story:** As an attendee, I want to receive automated reminders for the events I am registered for (e.g., "Event starts in 2 hours"), so that I can manage my schedule and arrive on time.

**Actions:**

| Action | Description |
|--------|-------------|
| Scheduled Trigger | Use an off-chain scheduler to trigger reminders based on event `start_time`. |
| Dynamic Delivery | Include a deep link to the user's digital ticket for easy check-in. |
| State Check | Skip reminders for users who have already checked in (`is_redeemed` = true). |

**Deliverable:** A time-aware reminder system that automates pre-event notifications via configured delivery channels (CM-1).

**RFP Alignment:** ✅ Implements *"reminders"* from *"Optional integration for email or wallet notifications (reminders, updates, confirmations)"*.

---

### 05.3.2. Feature: Important Announcements (PD-05.3.2)

**User Story:** As an organizer, I want to broadcast important announcements (e.g., "Main stage moved to Hall B") to all ticket holders.

**Actions:**

| Action | Description |
|--------|-------------|
| Admin Authorization | Verify organizer permissions before allowing announcement broadcasts. |
| Broadcast Delivery | Send announcements to all ticket holders for the event via in-app and push notifications. |

**Deliverable:** A broadcast system that delivers announcements to all ticket holders.

**RFP Alignment:** ✅ Extends *"announcements"* from *"Ticket holders gain access to a full Walrus Site containing event-specific content (agenda, speakers, media, announcements)"".

---

## Summary of Platform Deliverables: Communication System

| Feature | ID | RFP Alignment | Status |
|---------|----|----|--------|
| **Communication Tools** | PD-05.1 | ✅ | Not Started |
| Update Alerts | PD-05.1.1 | ✅ wallet notifications, Seal encryption | Not Started |
| Schedule Changes | PD-05.1.2 | ✅ dynamic updates | Not Started |
| Event Notifications | PD-05.1.3 | ✅ reminders, confirmations | Not Started |
| **Communication Platform** | PD-05.2 | ✅ | Not Started |
| Event Chat Functionality | PD-05.2.1 | ✅ event chat | Not Started |
| Schedule Updates | PD-05.2.2 | ✅ updates, dynamic updates | Not Started |
| Attendee List | PD-05.2.3 | ✅ opt-in profile sharing | Not Started |
| **Notification System** | PD-05.3 | ✅ | Not Started |
| Event Reminders | PD-05.3.1 | ✅ reminders | Not Started |
| Important Announcements | PD-05.3.2 | ✅ announcements | Not Started |

---

## Dependencies

| Dependency | Related Requirement | Description |
|------------|---------------------|-------------|
| UPS-02.1 | UserProfile | Required for opt-in visibility and preferences storage |
| ID-01 | Identity & Authentication | Required for wallet-linked notifications |
| TS-08 | Ticketing System | Required for ticket validation |
| EMS-07 | Event Management | Required for EventID and schedule data |

---

## Technical Stack

| Component | Technology |
|-----------|------------|
| Delivery Channels | See CM-1 (email, wallet, in-app) |
| Scheduling | Off-chain scheduler (cron) |
| Frontend | React with polling/refresh |
