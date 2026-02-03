# Event Management System Requirements (EMS-17)

## Overview

The Event Management System provides comprehensive capabilities for organizers to create, administer, configure, and manage events throughout their lifecycle. This module handles event initialization, capacity management, cancellation procedures, publishing workflows, metadata updates, visibility settings, pricing configuration, and discovery features.

---

## 17.1 Feature: Event Creation (EMS-17.1)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 17.1 Feature: Event Creation (EMS-17.1) | User Story: As an organizer, I want to initialize a new event by defining its core identity, so that I can begin the lifecycle of a ticketed experience on the blockchain.<br><br>Actions:<br>- Initialize a `PendingEvent` object on-chain with unique UUID and Organizer address<br>- Link initial metadata (Title, Category) to a temporary Walrus blob<br>- Generate the `AdminCap` specifically for this event ID to delegate future management tasks<br><br>Deliverables:<br>- Move contract module for `PendingEvent` struct<br>- Entry point: `create_event(title: String, category: u64, ctx: &mut TxContext)`<br>- `AdminCap` object type with event_id field<br>- Walrus integration for metadata blob upload<br>- Event emission logging<br>- Frontend event creation form | Not Started |

---

## 17.2 Feature: Event Administration (EMS-17.2)

### 17.2.1 Feature: Capacity Management (EMS-17.2.1)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 17.2.1 Feature: Capacity Management (EMS-17.2.1) | User Story: As an organizer, I want to set a hard limit on the number of tickets available, so that I do not violate venue safety regulations.<br><br>Actions:<br>- **State Definition:** Add a `max_capacity: u64` field to the `EventDetails` object<br>- **Assertion Logic:** Implement an `assert!(current_supply < max_capacity)` check within the minting transaction<br>- **Dynamic Adjustment:** Create an admin-gated function to increase capacity if venue expansion occurs<br><br>Deliverables:<br>- `max_capacity` and `current_supply` fields in Event struct<br>- Entry point: `update_capacity(admin_cap: &AdminCap, event: &mut Event, new_capacity: u64)`<br>- Validation logic preventing overselling<br>- Frontend capacity management UI | Not Started |

---

### 17.2.2 Feature: Cancel Event Procedures (EMS-17.2.2)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 17.2.2 Feature: Cancel Event Procedures (EMS-17.2.2) | User Story: As an organizer, I want a formal protocol to cancel an event and trigger refunds, so that I can handle unforeseen circumstances with financial integrity.<br><br>Actions:<br>- **Status Toggle:** Transition the `EventStatus` enum to `Cancelled`<br>- **Refund Escrow:** Release the $SUI/USDC$ held in the event treasury back to the original buyer addresses via a batch PTB<br>- **Invalidation:** Emit a `CancelEvent` signal that renders the "Scan" function of all associated tickets void<br><br>Deliverables:<br>- `EventStatus` enum with `Cancelled` variant<br>- Entry point: `cancel_event(admin_cap: &AdminCap, event: &mut Event, reason: String)`<br>- Batch refund mechanism (PTB compatible)<br>- Ticket invalidation logic<br>- Cancellation notification system<br>- Frontend cancellation UI | Not Started |

---

### 17.2.3 Feature: Publishing Workflow (EMS-17.2.3)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 17.2.3 Feature: Publishing Workflow (EMS-17.2.3) | User Story: As a marketing manager, I want to move an event from a private draft to a public listing, so that ticket sales can officially begin.<br><br>Actions:<br>- **State Transition:** Update the `is_public` boolean from `false` to `true`<br>- **Marketplace Indexing:** Trigger the indexer to scrape the event's Walrus metadata for listing on the global dashboard<br>- **Epoch Gating:** Set the `start_epoch` and `end_epoch` to define the window of sale activity<br><br>Deliverables:<br>- `is_public` boolean field in Event struct<br>- Entry point: `publish_event(admin_cap: &AdminCap, event: &mut Event, start_epoch: u64, end_epoch: u64)`<br>- Epoch validation logic<br>- Indexer integration for marketplace discovery<br>- Frontend publishing UI with epoch picker | Not Started |

---

### 17.2.4 Feature: Update Event Details (EMS-17.2.5)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 17.2.4 Feature: Update Event Details (EMS-17.2.5) | User Story: As an organizer, I want to change non-critical event information (e.g., description updates or guest list changes) after publishing, so that my attendees have the latest info.<br><br>Actions:<br>- **Metadata Mutation:** Allow the `AdminCap` holder to update the `metadata_url` field in the Sui object<br>- **Event Emission:** Emit a `MetadataUpdated` event to notify wallets to refresh their cached view of the ticket<br>- **Version Tracking:** Maintain a history of previous metadata blobs for auditability<br><br>Deliverables:<br>- Entry point: `update_metadata(admin_cap: &AdminCap, event: &mut Event, new_metadata_url: String)`<br>- Metadata version tracking (vector of historical blob IDs)<br>- Event emission for update notifications<br>- Frontend metadata editing UI<br>- Version history viewer | Not Started |

---

## 17.3 Feature: Event Parameters (EMS-17.3)

### 17.3.1 Feature: Visibility Settings (EMS-17.3.1)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 17.3.1 Feature: Visibility Settings (EMS-17.3.1) | User Story: As an organizer, I want to toggle my event between "Public" and "Unlisted," so that I can host private parties or exclusive corporate meetups.<br><br>Actions:<br>- **Access Control:** Implement a whitelist (vector of addresses) that gates the mint function<br>- **Search Gating:** Configure the indexer to ignore objects with the `visibility: Hidden` flag<br><br>Deliverables:<br>- `Visibility` enum: `Public`, `Unlisted`, `Private`<br>- Whitelist management (vector of addresses)<br>- Entry point: `update_visibility(admin_cap: &AdminCap, event: &mut Event, visibility: u8)`<br>- Entry point: `add_to_whitelist(admin_cap: &AdminCap, event: &mut Event, address: address)`<br>- Entry point: `remove_from_whitelist(admin_cap: &AdminCap, event: &mut Event, address: address)`<br>- Mint function access control validation<br>- Frontend visibility configuration UI<br>- Whitelist management interface | Not Started |

---

### 17.3.2 Feature: Pricing Configuration (EMS-17.3.2)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 17.3.2 Feature: Pricing Configuration (EMS-17.3.2) | User Story: As an organizer, I want to define different price tiers and currencies, so that I can maximize revenue and accessibility.<br><br>Actions:<br>- **Currency Support:** Support for $SUI, $USDC, and $DEEP payments<br>- **Dynamic Tiers:** Create a `PriceMap` within the contract (e.g., VIP: 10 SUI, GA: 2 SUI)<br>- **Time-Based Decay:** Implement a logic block that increases prices as the event date approaches<br><br>Deliverables:<br>- `TicketTier` struct with name, price, currency, capacity fields<br>- `PriceMap` (Table or VecMap) for tier management<br>- Entry point: `add_ticket_tier(admin_cap: &AdminCap, event: &mut Event, tier_name: String, price: u64, currency: u8, capacity: u64)`<br>- Multi-currency payment handling<br>- Time-based pricing logic<br>- Frontend tier configuration UI<br>- Tier selection during ticket purchase | Not Started |

---

### 17.3.3 Feature: ICS File Generation (EMS-17.3.5)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 17.3.3 Feature: ICS File Generation (EMS-17.3.5) | User Story: As a user, I want to add my purchased ticket to my digital calendar instantly, so that I am reminded of the upcoming event.<br><br>Actions:<br>- **Dynamic Generation:** Construct an `.ics` blob using the event's metadata and the user's specific ticket UID<br>- **Direct Download:** Serve the file via the frontend immediately after a successful mint transaction<br><br>Deliverables:<br>- ICS file generation utility (frontend or backend)<br>- Entry point or API: `generate_ics(event_id: ID, ticket_id: ID)`<br>- Frontend download trigger post-purchase<br>- "Add to Calendar" button on ticket page<br>- ICS format validation | Not Started |

---

## 17.4 Feature: Discovery & Calendar Integration (EMS-17.4)

### 17.4.1 Feature: Search Capabilities (EMS-17.4.1)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 17.4.1 Feature: Search Capabilities (EMS-17.4.1) | User Story: As an attendee, I want to search for events by name or keyword, so that I can find experiences that interest me.<br><br>Actions:<br>- **Full-Text Search:** Implement an Elasticsearch or Algolia index that syncs with the Sui event stream<br>- **Fuzzy Matching:** Allow for typos or partial names in the search bar<br><br>Deliverables:<br>- Indexer integration (Elasticsearch, Algolia, or custom)<br>- Full-text search indexing of event metadata<br>- Frontend search bar component<br>- Search results page with filtering<br>- API endpoint: `GET /api/search?q={query}` | Not Started |

---

### 17.4.2 Feature: Category Filtering (EMS-17.4.2)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 17.4.2 Feature: Category Filtering (EMS-17.4.2) | User Story: As a user, I want to filter events by genre (Music, Tech, Sports), so that I can quickly browse relevant listings.<br><br>Actions:<br>- **Tagging System:** Assign `u64` category IDs to every event object<br>- **UI Facets:** Provide sidebar filters to narrow down the event list by category<br><br>Deliverables:<br>- Category enum or constant list<br>- `category_id` field in Event struct<br>- Indexer category aggregation<br>- Frontend category filter component<br>- API endpoint: `GET /api/events?category={id}` | Not Started |

---

### 17.4.3 Feature: Geolocation Features (EMS-17.4.3)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 17.4.3 Feature: Geolocation Features (EMS-17.4.3) | User Story: As a mobile user, I want to see events happening within 10 miles of my current location, so that I can find local entertainment.<br><br>Actions:<br>- **Coordinate Storage:** Store latitude and longitude in the event's metadata<br>- **Spatial Querying:** Use H3 geospatial indexing to calculate distances between user coordinates and venue locations<br><br>Deliverables:<br>- Latitude/longitude fields in event metadata<br>- Geospatial indexing (H3 or similar)<br>- Frontend geolocation API integration<br>- Map component (e.g., Mapbox, Google Maps)<br>- Distance calculation utility<br>- "Near Me" filter UI<br>- API endpoint: `GET /api/events?lat={lat}&lon={lon}&radius={miles}` | Not Started |

---

### 17.4.4 Feature: Venue Changes (EMS-17.4.4)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 17.4.4 Feature: Venue Changes (EMS-17.4.4) | User Story: As an attendee, I want to be notified if the venue changes, so that I do not show up at the wrong location.<br><br>Actions:<br>- **Admin Update:** Update the `venue_info` field in the Sui object<br>- **Push Notifications:** Trigger a Web3 notification (e.g., via Notifi or XMTP) to all addresses holding the event's Ticket objects<br>- **Version Tracking:** Maintain a history of previous metadata blobs for auditability<br><br>Deliverables:<br>- Entry point: `update_venue(admin_cap: &AdminCap, event: &mut Event, venue_name: String, address: String, lat: String, lon: String)`<br>- Notification integration (Notifi/XMTP)<br>- `VenueUpdated` event emission<br>- Frontend venue change alert UI<br>- Email notification service<br>- Updated ICS file generation | Not Started |

---

### 17.4.5 Feature: Calendar Sync Capabilities (EMS-17.4.5)

| User Story Title | User Story Body | Status |
| --- | --- | --- |
| 17.4.5 Feature: Calendar Sync Capabilities (EMS-17.4.5) | User Story: As a power user, I want my events to stay synced across my devices, so that I have the most up-to-date entry info.<br><br>Actions:<br>- **CalDAV Support:** Provide a subscription URL for the user's "Whatdahack?! Schedule"<br>- **Dynamic Refresh:** Ensure the calendar feed updates if the event time or venue is moved<br><br>Deliverables:<br>- CalDAV server implementation or service integration<br>- Per-user subscription URL generation<br>- Entry point: `generate_calendar_subscription(user_address: address)`<br>- Dynamic calendar feed updates<br>- Frontend subscription URL display<br>- Documentation for adding to various calendar apps | Not Started |

---

## Summary of Event Management System

| Feature ID | Feature Name | Status |
|------------|--------------|--------|
| EMS-17.1 | Event Creation | Not Started |
| EMS-17.2.1 | Capacity Management | Not Started |
| EMS-17.2.2 | Cancel Event Procedures | Not Started |
| EMS-17.2.3 | Publishing Workflow | Not Started |
| EMS-17.2.5 | Update Event Details | Not Started |
| EMS-17.3.1 | Visibility Settings | Not Started |
| EMS-17.3.2 | Pricing Configuration | Not Started |
| EMS-17.3.5 | ICS File Generation | Not Started |
| EMS-17.4.1 | Search Capabilities | Not Started |
| EMS-17.4.2 | Category Filtering | Not Started |
| EMS-17.4.3 | Geolocation Features | Not Started |
| EMS-17.4.4 | Venue Changes | Not Started |
| EMS-17.4.5 | Calendar Sync Capabilities | Not Started |

---

## Dependencies

- **ID-01:** Identity & Authentication - Required for organizer verification
- **UPS-02:** User Profile System - Required for organizer profiles
- **DAT-04:** Data Preservation & Storage - Walrus integration for metadata
- **NFT-14:** NFT Implementation - Ticket minting and AdminCap objects
- **INF-05:** Technical Infrastructure - Indexer, notification services

## Technical Considerations

1. **Smart Contract Design:**
   - Event object lifecycle (Pending → Published → Active → Completed → Cancelled)
   - AdminCap capability-based access control
   - Batch operations for refunds and notifications

2. **Scalability:**
   - Efficient indexing for search and discovery
   - Geospatial indexing for location-based queries
   - Caching strategies for high-traffic events

3. **User Experience:**
   - Real-time updates for ticket availability
   - Seamless notification delivery
   - Cross-platform calendar compatibility

4. **Security:**
   - Prevent unauthorized event modifications
   - Secure refund mechanisms
   - Whitelist validation for private events

---

## Notes

- ICS file generation is static; dynamic calendar sync requires CalDAV
- Multi-currency support requires integration with relevant coin modules
- Geolocation features require frontend permission handling
- Notification system depends on third-party services (Notifi, XMTP)
