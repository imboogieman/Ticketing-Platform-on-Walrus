# Communication and Engagement Requirements (CM-01)

## Overview

The Communication and Engagement module provides comprehensive notification, alert, and chat capabilities for organizers and attendees. This module enables real-time updates, personalized communications, and secure token-gated messaging throughout the event lifecycle.

---

## 1.1. Feature: Update Alerts (CM-01.1)

### 1.1.1. Feature: Broadcast Alerts (CM-01.1.1)

**User Story:** As an organizer, I want to broadcast high-priority update alerts to all ticket holders, so that I can communicate urgent venue changes or safety protocols in real-time with guaranteed delivery.

**Actions:**

| Action | Description |
|--------|-------------|
| Schema Design | Define a `GlobalAlert` event in Move with fields for `event_id`, `severity_level`, and a `timestamp`. |
| Broadcast Logic | Implement an admin-only function `emit_alert` that requires the `AdminCap` to prevent unauthorized broadcasts. |
| Notification Bridge | Configure a listener to capture `GlobalAlert` events and push them via Sui Stack Messaging SDK to all wallets holding the event's ticket object. |
| Frontend Integration | Build a "Critical Alert" banner in the dApp that persists until acknowledged by the user. |

**Deliverable:** A secure, high-priority broadcast system that allows organizers to reach 100% of attendees within sub-second finality.

---

### 1.1.2. Feature: Schedule Changes (CM-01.1.2)

**User Story:** As an attendee, I want to receive instant notifications when a session time or location changes, so that I can adjust my personal itinerary without missing key content.

**Actions:**

| Action | Description |
|--------|-------------|
| Mutable State Update | Write an `update_schedule` function in the Move contract that modifies the `EventSchedule` shared object. |
| Event-Driven Triggers | Emit a `ScheduleChanged` event containing the `session_id`, `old_time`, and `new_time`. |
| Automated Sync | Implement a WebSocket worker that monitors these events and automatically updates the "My Schedule" view in the attendee's app. |
| Conflict Detection | Build a frontend utility to flag "Itinerary Conflicts" for users if a moved session now overlaps with their other bookmarked events. |

**Deliverable:** A dynamic, real-time schedule synchronization engine that ensures attendee itineraries are always up-to-date with the on-chain state.

---

### 1.1.3. Feature: Event Notifications (CM-01.1.3)

**User Story:** As a user, I want to receive general event notifications (e.g., "Doors opening in 1 hour" or "Swag pickup now available"), so that I stay informed and engaged throughout the event lifecycle.

**Actions:**

| Action | Description |
|--------|-------------|
| Subscription Management | Create a `NotificationRegistry` where users can opt-in to specific categories (Announcements, Marketing, Logistics). |
| Time-Gated Execution | Use the Sui Clock to schedule "Delayed Notifications" that trigger at specific network checkpoints. |
| Personalized Routing | Filter notifications based on the user's `TicketTier` (e.g., sending "VIP Lounge is open" only to VIP ticket holders). |
| Delivery Logging | Log the `notification_hash` on-chain to allow users to verify the authenticity of messages received via off-chain channels like email or push. |

**Deliverable:** A personalized, category-based notification system that maintains a high signal-to-noise ratio for attendees.

---

## 1.2. Feature: Communication Platform (CM-01.2)

### 1.2.1. Feature: Event Chat Functionality (CM-01.2.1)

**User Story:** As an attendee, I want to participate in a secure, token-gated event chat, so that I can network with other verified participants and receive real-time support without exposing my personal contact info to bad actors.

**Actions:**

| Action | Description |
|--------|-------------|
| Namespace Setup | Utilize the Sui Stack Messaging SDK to initialize a decentralized chat namespace specifically for the `EventID`. |
| Access Control | Implement a Move function that verifies the presence of an `AttendeeBadge` or `Ticket` object in the user's wallet before allowing the client to join the chat stream. |
| Encryption Logic | Configure Sui Seal to handle group key distribution, ensuring that only current ticket holders can decrypt historical and real-time messages. |
| Moderation Tooling | Integrate a decentralized moderation hook where designated `ModeratorCap` holders can "tombstone" (hide) malicious messages on-chain. |

**Deliverable:** A private, end-to-end encrypted chat interface within the dApp, restricted to verified event participants.

---

### 1.2.2. Feature: Schedule Updates (CM-01.2.2)

**User Story:** As an organizer, I want to push instant, verifiable updates to the event schedule, so that attendees are immediately notified of room changes or speaker delays via their digital itinerary.

**Actions:**

| Action | Description |
|--------|-------------|
| Object Mutation | Update the `EventSchedule` shared object on Sui with the revised time, location, or speaker metadata. |
| Event-Driven Push | Trigger an on-chain `ScheduleChange` event that the Sui Notifier service captures to send a signed push notification. |
| Frontend Hot-Reload | Implement a React state-listener that detects the version change of the `EventSchedule` object and re-renders the user's calendar without a page refresh. |
| Conflict Resolution | Build a utility that compares the new schedule against the user's "Bookmarked Sessions" and sends a specific alert if a conflict is detected. |

**Deliverable:** A real-time, on-chain schedule management system that keeps 100% of attendees synchronized with the live event state.

---

### 1.2.3. Feature: Attendee List (CM-01.2.3)

**User Story:** As a networker, I want to view a list of other attendees who have opted-in to be visible, so that I can discover potential collaborators and initiate professional connections.

**Actions:**

| Action | Description |
|--------|-------------|
| Privacy Toggle | Add a `public_visibility` flag to the `UserProfile` object (UPS-02), allowing users to control their inclusion in the list. |
| Selective Indexing | Configure the indexer to aggregate and serve only the display name, avatar, and "Interests" tags for users who have opted-in. |
| Contact Gating | Implement a "Request Connection" flow where one-to-one messaging is only unlocked after both parties' `UserProfile` objects approve the link. |
| Search Optimization | Build a frontend filter to sort the list by "Hacker," "Sponsor," or "Speaker" roles based on ticket metadata. |

**Deliverable:** A privacy-first attendee directory that balances community discovery with cryptographic identity protection.

---

## 1.3. Feature: Notification System (CM-01.3)

### 1.3.1. Feature: Event Reminders (CM-01.3.1)

**User Story:** As an attendee, I want to receive automated reminders for the events I am registered for (e.g., "Event starts in 2 hours"), so that I can manage my schedule and arrive at the venue on time.

**Actions:**

| Action | Description |
|--------|-------------|
| Logic Implementation | Implement a "Cron-style" off-chain trigger using Nautilus that monitors the Sui Network Clock against the `start_time` metadata in the `EventDetails` shared object. |
| PTB Automation | Create a Programmable Transaction Block (PTB) that automatically calls the `send_broadcast` function of the Messaging SDK when the time threshold is reached. |
| State Verification | Within the Move contract, verify the ticket's `is_redeemed` status to ensure reminders are only sent to active, un-validated ticket holders. |
| Deep Linking | Configure the notification payload to include a deep-link to the user's digital ticket within the dApp for an "Instant Scan" experience. |

**Deliverable:** A time-aware reminder engine that automates pre-event engagement by linking network time to attendee wallet addresses.

---

### 1.3.2. Feature: Important Announcements (CM-01.3.2)

**User Story:** As an organizer, I want to broadcast critical announcements (e.g., "Main stage moved to Hall B") to all ticket holders, so that I can ensure everyone receives the message via a verifiable, trusted channel.

**Actions:**

| Action | Description |
|--------|-------------|
| Admin Gating | Integrate the announcement portal with the organizer's `AdminCap`, ensuring only authorized personnel can initiate global broadcasts. |
| Seal Encryption | Use Sui Seal to encrypt the announcement content, ensuring it is only decryptable by users holding the specific event's `Ticket` object. |
| Event Emission | Emit an `AnnouncementEvent` in Move to provide a permanent, searchable record of the update on the Sui ledger for audit purposes. |
| SDK Broadcasting | Utilize the Sui Stack Messaging SDK's broadcast primitive to push the encrypted message to all active channel members simultaneously. |

**Deliverable:** A high-integrity "Emergency Broadcast" tool that uses cryptographic signatures to prove authenticity and Seal encryption to gate access.

---

### 1.3.3. Feature: Personalized Communications (CM-01.3.3)

**User Story:** As a VIP attendee or speaker, I want to receive personalized communications relevant to my specific role (e.g., "Speaker lounge is now serving lunch"), so that I feel supported and well-informed throughout the event.

**Actions:**

| Action | Description |
|--------|-------------|
| Tier-Based Filtering | Implement a messaging filter that segments the `AttendeeList` by ticket object metadata (e.g., `tier_id` or `is_speaker`). |
| Direct 1:1 Channels | Enable the Sui Stack Messaging SDK's direct channel capability to allow staff to initiate secure 1:1 threads with VIPs or partners. |
| Dynamic Field Context | Reference the user's `UserProfile` (UPS-02) dynamic fields (e.g., "Interests" or "Special Needs") to personalize the content of automated notifications. |
| Encryption Policy | Apply a Seal Policy that allows different tiers of ticket holders to decrypt different sub-channels within the same broadcast stream. |

**Deliverable:** A granular communication engine that delivers a customized "Concierge-level" experience to different attendee segments without sacrificing user privacy.

---

## Dependencies

| Feature | Depends On |
|---------|-----------|
| CM-01.1.1 | EMS-07 (Event Management), TS-08 (Ticketing), ID-01 (AdminCap) |
| CM-01.1.2 | EMS-07 (Event Management), INF-05 (WebSocket infrastructure) |
| CM-01.1.3 | UPS-02 (User Profile), TS-08 (Ticket Tier metadata) |
| CM-01.2.1 | AM-03 (Attendance Badge), TS-08 (Ticket ownership), DAT-04 (Seal encryption) |
| CM-01.2.2 | EMS-07 (EventSchedule object), INF-05 (Real-time infrastructure) |
| CM-01.2.3 | UPS-02 (User Profile), ID-01 (Identity) |
| CM-01.3.1 | EMS-07 (Event timing), TS-08 (Ticket status), INF-05 (Nautilus scheduler) |
| CM-01.3.2 | ID-01 (AdminCap), DAT-04 (Seal encryption), TS-08 (Ticket ownership) |
| CM-01.3.3 | UPS-02 (User Profile), TS-08 (Ticket Tier), DAT-04 (Seal Policy) |

---

## Summary of Requirements

| Feature | ID | Status |
|---------|----|----|
| Broadcast Alerts | CM-01.1.1 | Not Started |
| Schedule Changes | CM-01.1.2 | Not Started |
| Event Notifications | CM-01.1.3 | Not Started |
| Event Chat Functionality | CM-01.2.1 | Not Started |
| Schedule Updates | CM-01.2.2 | Not Started |
| Attendee List | CM-01.2.3 | Not Started |
| Event Reminders | CM-01.3.1 | Not Started |
| Important Announcements | CM-01.3.2 | Not Started |
| Personalized Communications | CM-01.3.3 | Not Started |
