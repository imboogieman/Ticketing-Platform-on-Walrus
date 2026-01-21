# Event Management System Requirements (EMS-17)

## Overview

The Event Management System provides comprehensive capabilities for organizers to create, administer, configure, and manage events throughout their lifecycle. This module handles event initialization, capacity management, cancellation procedures, publishing workflows, metadata updates, visibility settings, pricing configuration, and discovery features.

---

## 17.1 Feature: Event Creation (EMS-17.1)

**User Story:** As an organizer, I want to initialize a new event by defining its core identity, so that I can begin the lifecycle of a ticketed experience on the blockchain.

**Actions:**

- Initialize a `PendingEvent` object on-chain with unique UUID and Organizer address
- Link initial metadata (Title, Category) to a temporary Walrus blob
- Generate the `AdminCap` specifically for this event ID to delegate future management tasks

**Acceptance Criteria:**

- Event initialization creates a unique on-chain `PendingEvent` object
- UUID is cryptographically unique and prevents collision
- Organizer address is permanently linked to the event
- Initial metadata (Title, Category) is uploaded to Walrus and blob ID is stored
- `AdminCap` is minted and transferred to the organizer's address
- Event cannot be publicly accessed until published
- Transaction emits `EventCreated` event with UUID and organizer details

**Deliverable:** A newly minted, non-public Event Object on the Sui network.

**Deliverables:**

- Move contract module for `PendingEvent` struct
- Entry point: `create_event(title: String, category: u64, ctx: &mut TxContext)`
- `AdminCap` object type with event_id field
- Walrus integration for metadata blob upload
- Event emission logging
- Frontend event creation form

---

## 17.2 Feature: Event Administration (EMS-17.2)

### 17.2.1 Feature: Capacity Management (EMS-17.2.1)

**User Story:** As an organizer, I want to set a hard limit on the number of tickets available, so that I do not violate venue safety regulations.

**Actions:**

- **State Definition:** Add a `max_capacity: u64` field to the `EventDetails` object
- **Assertion Logic:** Implement an `assert!(current_supply < max_capacity)` check within the minting transaction
- **Dynamic Adjustment:** Create an admin-gated function to increase capacity if venue expansion occurs

**Acceptance Criteria:**

- `max_capacity` field is required during event creation
- Ticket minting fails if `current_supply >= max_capacity`
- Admin can increase capacity through `update_capacity()` function
- Capacity reduction is not allowed if it would invalidate existing tickets
- Capacity changes emit `CapacityUpdated` event
- Frontend displays remaining tickets in real-time

**Deliverable:** A smart contract constraint that physically prevents overselling.

**Deliverables:**

- `max_capacity` and `current_supply` fields in Event struct
- Entry point: `update_capacity(admin_cap: &AdminCap, event: &mut Event, new_capacity: u64)`
- Validation logic preventing overselling
- Frontend capacity management UI

---

### 17.2.2 Feature: Cancel Event Procedures (EMS-17.2.2)

**User Story:** As an organizer, I want a formal protocol to cancel an event and trigger refunds, so that I can handle unforeseen circumstances with financial integrity.

**Actions:**

- **Status Toggle:** Transition the `EventStatus` enum to `Cancelled`
- **Refund Escrow:** Release the $SUI/USDC$ held in the event treasury back to the original buyer addresses via a batch PTB
- **Invalidation:** Emit a `CancelEvent` signal that renders the "Scan" function of all associated tickets void

**Acceptance Criteria:**

- Only `AdminCap` holder can cancel an event
- Event status changes to `Cancelled` state
- All ticket holders are identified and refunded automatically
- Refund amount equals original purchase price
- Treasury balance is distributed proportionally to all buyers
- All tickets associated with the event are marked as invalid
- `EventCancelled` event is emitted with cancellation reason
- Frontend shows cancellation notice to all users
- No new tickets can be minted after cancellation
- Cancelled events remain on-chain for audit purposes

**Deliverable:** An automated refund and invalidation workflow for cancelled events.

**Deliverables:**

- `EventStatus` enum with `Cancelled` variant
- Entry point: `cancel_event(admin_cap: &AdminCap, event: &mut Event, reason: String)`
- Batch refund mechanism (PTB compatible)
- Ticket invalidation logic
- Cancellation notification system
- Frontend cancellation UI

---

### 17.2.3 Feature: Publishing Workflow (EMS-17.2.3)

**User Story:** As a marketing manager, I want to move an event from a private draft to a public listing, so that ticket sales can officially begin.

**Actions:**

- **State Transition:** Update the `is_public` boolean from `false` to `true`
- **Marketplace Indexing:** Trigger the indexer to scrape the event's Walrus metadata for listing on the global dashboard
- **Epoch Gating:** Set the `start_epoch` and `end_epoch` to define the window of sale activity

**Acceptance Criteria:**

- Events are created in draft (`is_public = false`) state by default
- Only `AdminCap` holder can publish the event
- Publishing sets `is_public = true` and records `published_at` timestamp
- `start_epoch` and `end_epoch` define ticket sale window
- Ticket minting is only allowed between start and end epoch
- Published events appear in marketplace indexer results
- `EventPublished` event is emitted
- Frontend shows "Draft" vs "Live" status clearly
- Once published, event cannot return to draft state

**Deliverable:** A "Live" event status that enables public minting capabilities.

**Deliverables:**

- `is_public` boolean field in Event struct
- Entry point: `publish_event(admin_cap: &AdminCap, event: &mut Event, start_epoch: u64, end_epoch: u64)`
- Epoch validation logic
- Indexer integration for marketplace discovery
- Frontend publishing UI with epoch picker

---

### 17.2.4 Feature: Update Event Details (EMS-17.2.5)

**User Story:** As an organizer, I want to change non-critical event information (e.g., description updates or guest list changes) after publishing, so that my attendees have the latest info.

**Actions:**

- **Metadata Mutation:** Allow the `AdminCap` holder to update the `metadata_url` field in the Sui object
- **Event Emission:** Emit a `MetadataUpdated` event to notify wallets to refresh their cached view of the ticket
- **Version Tracking:** Maintain a history of previous metadata blobs for auditability

**Acceptance Criteria:**

- Only `AdminCap` holder can update event metadata
- Organizer can update: description, guest speakers, agenda, images
- Organizer cannot update: event date/time, location (requires different flow)
- New metadata is uploaded to Walrus and new blob ID is stored
- Previous metadata blob IDs are retained in version history
- `MetadataUpdated` event includes new blob ID and version number
- Frontend displays update timestamp to users
- Ticket holders receive notification of updates
- Version history is queryable on-chain

**Deliverable:** A mutable metadata layer for live events.

**Deliverables:**

- Entry point: `update_metadata(admin_cap: &AdminCap, event: &mut Event, new_metadata_url: String)`
- Metadata version tracking (vector of historical blob IDs)
- Event emission for update notifications
- Frontend metadata editing UI
- Version history viewer

---

## 17.3 Feature: Event Parameters (EMS-17.3)

### 17.3.1 Feature: Visibility Settings (EMS-17.3.1)

**User Story:** As an organizer, I want to toggle my event between "Public" and "Unlisted," so that I can host private parties or exclusive corporate meetups.

**Actions:**

- **Access Control:** Implement a whitelist (vector of addresses) that gates the mint function
- **Search Gating:** Configure the indexer to ignore objects with the `visibility: Hidden` flag

**Acceptance Criteria:**

- Event visibility can be set to: `Public`, `Unlisted`, or `Private`
- `Public` events appear in search and marketplace
- `Unlisted` events require direct link but allow any wallet to mint
- `Private` events require wallet address to be on whitelist
- Organizer can manage whitelist (add/remove addresses)
- `AdminCap` holder can change visibility settings
- Indexer respects visibility flags for search results
- Direct link access works for `Unlisted` and `Private` events
- `VisibilityUpdated` event is emitted on changes

**Deliverable:** Configurable visibility tiers for event discovery.

**Deliverables:**

- `Visibility` enum: `Public`, `Unlisted`, `Private`
- Whitelist management (vector of addresses)
- Entry point: `update_visibility(admin_cap: &AdminCap, event: &mut Event, visibility: u8)`
- Entry point: `add_to_whitelist(admin_cap: &AdminCap, event: &mut Event, address: address)`
- Entry point: `remove_from_whitelist(admin_cap: &AdminCap, event: &mut Event, address: address)`
- Mint function access control validation
- Frontend visibility configuration UI
- Whitelist management interface

---

### 17.3.2 Feature: Pricing Configuration (EMS-17.3.2)

**User Story:** As an organizer, I want to define different price tiers and currencies, so that I can maximize revenue and accessibility.

**Actions:**

- **Currency Support:** Support for $SUI, $USDC, and $DEEP payments
- **Dynamic Tiers:** Create a `PriceMap` within the contract (e.g., VIP: 10 SUI, GA: 2 SUI)
- **Time-Based Decay:** Implement a logic block that increases prices as the event date approaches

**Acceptance Criteria:**

- Organizer can create multiple ticket tiers (e.g., VIP, General Admission, Early Bird)
- Each tier has: name, price, currency type, capacity, description
- Supported currencies: SUI, USDC, DEEP
- Price can vary by tier and time period
- Time-based pricing rules can be configured (early bird discounts, last-minute increases)
- Tier capacity is independent of total event capacity
- Sold-out tiers prevent further minting
- Frontend displays all available tiers with pricing
- Payment processing validates currency type and amount
- Multi-currency revenue tracking for organizer dashboard

**Deliverable:** A flexible pricing engine integrated with the Sui payment flow.

**Deliverables:**

- `TicketTier` struct with name, price, currency, capacity fields
- `PriceMap` (Table or VecMap) for tier management
- Entry point: `add_ticket_tier(admin_cap: &AdminCap, event: &mut Event, tier_name: String, price: u64, currency: u8, capacity: u64)`
- Multi-currency payment handling
- Time-based pricing logic
- Frontend tier configuration UI
- Tier selection during ticket purchase

---

### 17.3.3 Feature: ICS File Generation (EMS-17.3.5)

**User Story:** As a user, I want to add my purchased ticket to my digital calendar instantly, so that I am reminded of the upcoming event.

**Actions:**

- **Dynamic Generation:** Construct an `.ics` blob using the event's metadata and the user's specific ticket UID
- **Direct Download:** Serve the file via the frontend immediately after a successful mint transaction

**Acceptance Criteria:**

- ICS file is generated with standard iCalendar format
- File includes: event title, description, start/end time, location, unique UID
- User-specific ticket ID is embedded in the calendar event
- Download is triggered automatically after ticket purchase
- "Add to Calendar" button is available on ticket details page
- ICS file works with major calendar apps (Google Calendar, Apple Calendar, Outlook)
- Timezone information is correctly formatted
- Event updates do not automatically sync (static file)

**Deliverable:** A downloadable calendar invitation for every ticket holder.

**Deliverables:**

- ICS file generation utility (frontend or backend)
- Entry point or API: `generate_ics(event_id: ID, ticket_id: ID)`
- Frontend download trigger post-purchase
- "Add to Calendar" button on ticket page
- ICS format validation

---

## 17.4 Feature: Discovery & Calendar Integration (EMS-17.4)

### 17.4.1 Feature: Search Capabilities (EMS-17.4.1)

**User Story:** As an attendee, I want to search for events by name or keyword, so that I can find experiences that interest me.

**Actions:**

- **Full-Text Search:** Implement an Elasticsearch or Algolia index that syncs with the Sui event stream
- **Fuzzy Matching:** Allow for typos or partial names in the search bar

**Acceptance Criteria:**

- Search bar accepts text input for event name, description, or keywords
- Search results update in real-time as user types
- Fuzzy matching handles typos and partial matches
- Search covers event title, description, organizer name, category
- Results are ranked by relevance
- Search works across all published events
- Private/unlisted events do not appear in search results
- Search integrates with indexer backend
- Frontend displays search results with event cards

**Deliverable:** A high-speed search bar on the marketplace frontend.

**Deliverables:**

- Indexer integration (Elasticsearch, Algolia, or custom)
- Full-text search indexing of event metadata
- Frontend search bar component
- Search results page with filtering
- API endpoint: `GET /api/search?q={query}`

---

### 17.4.2 Feature: Category Filtering (EMS-17.4.2)

**User Story:** As a user, I want to filter events by genre (Music, Tech, Sports), so that I can quickly browse relevant listings.

**Actions:**

- **Tagging System:** Assign `u64` category IDs to every event object
- **UI Facets:** Provide sidebar filters to narrow down the event list by category

**Acceptance Criteria:**

- Predefined category list: Music, Tech, Sports, Art, Business, Food & Drink, etc.
- Each event is assigned exactly one primary category at creation
- Optional: Events can have multiple tags/subcategories
- Frontend displays category filter sidebar
- Users can select multiple categories simultaneously
- Filter results update without page reload
- Category counts show number of events in each category
- Indexer supports category-based queries
- Default view shows all categories

**Deliverable:** A faceted navigation system for event discovery.

**Deliverables:**

- Category enum or constant list
- `category_id` field in Event struct
- Indexer category aggregation
- Frontend category filter component
- API endpoint: `GET /api/events?category={id}`

---

### 17.4.3 Feature: Geolocation Features (EMS-17.4.3)

**User Story:** As a mobile user, I want to see events happening within 10 miles of my current location, so that I can find local entertainment.

**Actions:**

- **Coordinate Storage:** Store latitude and longitude in the event's metadata
- **Spatial Querying:** Use H3 geospatial indexing to calculate distances between user coordinates and venue locations

**Acceptance Criteria:**

- Event metadata includes venue latitude and longitude
- Frontend requests user's geolocation permission
- "Near Me" filter shows events within configurable radius (5, 10, 25, 50 miles)
- Distance calculation uses accurate geospatial algorithms
- Events are sorted by proximity to user
- Map view displays event locations on interactive map
- Location-based search works with category filtering
- Virtual/online events are flagged and shown separately
- Privacy: user location is not stored server-side

**Deliverable:** A "Near Me" map view for event discovery.

**Deliverables:**

- Latitude/longitude fields in event metadata
- Geospatial indexing (H3 or similar)
- Frontend geolocation API integration
- Map component (e.g., Mapbox, Google Maps)
- Distance calculation utility
- "Near Me" filter UI
- API endpoint: `GET /api/events?lat={lat}&lon={lon}&radius={miles}`

---

### 17.4.4 Feature: Venue Changes (EMS-17.4.4)

**User Story:** As an attendee, I want to be notified if the venue changes, so that I do not show up at the wrong location.

**Actions:**

- **Admin Update:** Update the `venue_info` field in the Sui object
- **Push Notifications:** Trigger a Web3 notification (e.g., via Notifi or XMTP) to all addresses holding the event's Ticket objects
- **Version Tracking:** Maintain a history of previous metadata blobs for auditability

**Acceptance Criteria:**

- Only `AdminCap` holder can update venue information
- Venue update includes: location name, address, coordinates
- New venue info is uploaded to Walrus
- `VenueUpdated` event is emitted with old and new venue details
- Push notification sent to all ticket holders
- Frontend displays prominent venue change alert
- Email notification sent to ticket holders (if email available)
- Updated ICS file generated with new location
- Venue change history is auditable on-chain

**Deliverable:** An automated venue-change alert system.

**Deliverables:**

- Entry point: `update_venue(admin_cap: &AdminCap, event: &mut Event, venue_name: String, address: String, lat: String, lon: String)`
- Notification integration (Notifi/XMTP)
- `VenueUpdated` event emission
- Frontend venue change alert UI
- Email notification service
- Updated ICS file generation

---

### 17.4.5 Feature: Calendar Sync Capabilities (EMS-17.4.5)

**User Story:** As a power user, I want my events to stay synced across my devices, so that I have the most up-to-date entry info.

**Actions:**

- **CalDAV Support:** Provide a subscription URL for the user's "Whatdahack?! Schedule"
- **Dynamic Refresh:** Ensure the calendar feed updates if the event time or venue is moved

**Acceptance Criteria:**

- User can generate a personal calendar subscription URL
- Subscription URL is unique per user wallet address
- CalDAV/iCal format for broad calendar app compatibility
- Calendar feed updates automatically when events change
- Feed includes all user's purchased tickets
- Cancelled events are marked as cancelled in calendar
- Venue/time changes reflect in synced calendars
- Subscription URL can be regenerated if compromised
- Frontend provides easy copy-paste of subscription URL
- Works with Google Calendar, Apple Calendar, Outlook

**Deliverable:** A live-sync calendar subscription for users.

**Deliverables:**

- CalDAV server implementation or service integration
- Per-user subscription URL generation
- Entry point: `generate_calendar_subscription(user_address: address)`
- Dynamic calendar feed updates
- Frontend subscription URL display
- Documentation for adding to various calendar apps

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
