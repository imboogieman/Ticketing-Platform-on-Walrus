# Platform Deliverables: Communication System (PD-05)

## Overview

This document outlines the communication **features and use cases** for the Ticketing Platform on Walrus. For delivery channel specifications (email, wallet, in-app), see [CM-1 - Communication Delivery Channels](Communication_CM-1.md).

**Scope:** What is communicated (alerts, reminders, chat, content sharing)  
**Related:** CM-1 defines *how* notifications are delivered (infrastructure)

---

## 05.1. Feature: Communication Tools (PD-05.1)

### 05.1.1. Feature: Update Alerts (PD-05.1.1)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 05.1.1. Feature: Update Alerts (PD-05.1.1) | User Story: As an organizer, I want to send urgent, wallet-linked alerts to all ticket holders, so that I can ensure they receive critical information (e.g., security protocols or weather warnings) through a verified, tamper-proof channel.<br><br>Actions:<br>**Channel Creation:** Use the Sui Stack Messaging SDK to initialize a broadcast channel linked to the unique EventID.<br>**Membership Verification:** Query ticket ownership to determine the notification recipient list.<br>**In-App & Wallet Delivery:** Deliver alerts via in-app notifications and wallet-linked push notifications to ticket holders.<br><br>Deliverable: An "Alert Center" in the organizer dashboard that pushes wallet-linked notifications to all ticket holders. | Not Started |

---

### 05.1.2. Feature: Schedule Changes (PD-05.1.2)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 05.1.2. Feature: Schedule Changes (PD-05.1.2) | User Story: As an attendee, I want to receive updates regarding speaker times or session moves, so that I can adjust my schedule without manually checking the website.<br><br>Actions:<br>**Schedule Storage:** Store event schedule data in Walrus or off-chain database for easy updates.<br>**Change Detection:** Use off-chain polling or webhooks to detect schedule updates.<br>**Broadcast Update:** Send schedule change notifications to ticket holders via configured delivery channels (CM-1).<br>**Frontend Sync:** Refresh the user's schedule view when updates are detected.<br><br>Deliverable: A schedule notification system that pushes timeline changes to event attendees. | Not Started |

---

### 05.1.3. Feature: Event Notifications (PD-05.1.3)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 05.1.3. Feature: Event Notifications (PD-05.1.3) | User Story: As a user, I want to receive general event reminders (e.g., "Doors opening in 1 hour" or "Check-in now available"), so that I am kept engaged and informed throughout the event lifecycle.<br><br>Actions:<br>**Scheduled Notifications:** Use an off-chain scheduler (cron jobs) to trigger time-based notifications.<br>**Tier-Based Logic:** Filter notifications by ticket tier when relevant (e.g., "VIP early access").<br>**Opt-in Management:** Build a "Notification Preferences" UI that allows users to toggle notification types.<br><br>Deliverable: A notification system that sends lifecycle reminders to attendees via configured delivery channels (CM-1). | Not Started |

---

## 05.2. Feature: Communication Platform (PD-05.2)

### 05.2.1. Feature: Event Chat Functionality (PD-05.2.1)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 05.2.1. Feature: Event Chat Functionality (PD-05.2.1) | User Story: As an attendee, I want to participate in a token-gated event chat, so that I can network with other verified participants without exposing my personal contact information.<br><br>Actions:<br>**SDK Implementation:** Integrate the Sui Stack Messaging SDK to initialize a chat room linked to the EventID.<br>**Token-Gated Access:** Verify that the user's address holds a valid Ticket or AttendeeBadge object before granting read/write access to the chat.<br>**Frontend UI:** Build a real-time chat interface featuring message threads and basic moderation tools for organizers.<br><br>Deliverable: A token-gated messaging environment accessible only to verified attendees, powered by the Sui Messaging SDK. | Not Started |

---

### 05.2.2. Feature: Schedule Updates (PD-05.2.2)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 05.2.2. Feature: Schedule Updates (PD-05.2.2) | User Story: As an organizer, I want to push updates to the event schedule, so that attendees are notified of speaker delays or room changes.<br><br>Actions:<br>**Schedule Data Update:** Update the event schedule data (can be stored on Walrus or off-chain database).<br>**Push Notification:** Send push notifications to ticket holders when schedule changes are published.<br>**UI Synchronization:** Implement refresh logic in the dApp to update the schedule view when changes are detected.<br><br>Deliverable: A schedule update system that notifies attendees of event timeline changes. | Not Started |

---

### 05.2.3. Feature: Attendee List (PD-05.2.3)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 05.2.3. Feature: Attendee List (PD-05.2.3) | User Story: As a networker, I want to see a list of other attendees who have opted-in to be visible, so that I can discover peers with similar interests and initiate professional connections.<br><br>Actions:<br>**Opt-in Mechanism:** Add an `is_visible` boolean to the UserProfile (UPS-02.1) that defaults to `false` for maximum privacy.<br>**Query Filtering:** Build an indexer query that fetches UserProfile data only for users who have both the "Opt-in" flag and a valid Ticket for the current event.<br>**Privacy-Preserving UI:** Display only the user's avatar (from Walrus) and bio, while keeping their full wallet address truncated or hidden until a connection is accepted.<br><br>Deliverable: A searchable "Attendee Directory" that balances community discovery with individual user privacy. | Not Started |

---

## 05.3. Feature: Notification System (PD-05.3)

### 05.3.1. Feature: Event Reminders (PD-05.3.1)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 05.3.1. Feature: Event Reminders (PD-05.3.1) | User Story: As an attendee, I want to receive automated reminders for the events I am registered for (e.g., "Event starts in 2 hours"), so that I can manage my schedule and arrive on time.<br><br>Actions:<br>**Scheduled Trigger:** Use an off-chain scheduler to trigger reminders based on event `start_time`.<br>**Dynamic Delivery:** Include a deep link to the user's digital ticket for easy check-in.<br>**State Check:** Skip reminders for users who have already checked in (`is_redeemed` = true).<br><br>Deliverable: A time-aware reminder system that automates pre-event notifications via configured delivery channels (CM-1). | Not Started |

---

### 05.3.2. Feature: Important Announcements (PD-05.3.2)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 05.3.2. Feature: Important Announcements (PD-05.3.2) | User Story: As an organizer, I want to broadcast important announcements (e.g., "Main stage moved to Hall B") to all ticket holders.<br><br>Actions:<br>**Admin Authorization:** Verify organizer permissions before allowing announcement broadcasts.<br>**Broadcast Delivery:** Send announcements to all ticket holders for the event via in-app and push notifications.<br><br>Deliverable: A broadcast system that delivers announcements to all ticket holders. | Not Started |

---

## Summary of Platform Deliverables: Communication System

| Feature | ID | Status |
|---------|----|----|
| **Communication Tools** | PD-05.1 | Not Started |
| Update Alerts | PD-05.1.1 | Not Started |
| Schedule Changes | PD-05.1.2 | Not Started |
| Event Notifications | PD-05.1.3 | Not Started |
| **Communication Platform** | PD-05.2 | Not Started |
| Event Chat Functionality | PD-05.2.1 | Not Started |
| Schedule Updates | PD-05.2.2 | Not Started |
| Attendee List | PD-05.2.3 | Not Started |
| **Notification System** | PD-05.3 | Not Started |
| Event Reminders | PD-05.3.1 | Not Started |
| Important Announcements | PD-05.3.2 | Not Started |

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
