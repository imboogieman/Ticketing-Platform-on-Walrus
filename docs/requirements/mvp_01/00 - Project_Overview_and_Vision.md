# Project Overview and Vision

## 🎯 Project Goal

Build a decentralized event and ticketing platform powered by Sui smart contracts, Walrus storage, and Seal encryption, where users:

- Register with on-chain or ZkLogin identity
- Receive verifiable, encrypted NFT tickets
- Unlock access to event details hosted on Walrus Sites
- Earn attendance NFTs for proof-of-presence and reward eligibility

## 📋 Vision Statement

Today's event registration platforms like Luma, Eventbrite, and Google Forms rely on centralized data models and email-based access. Tickets, confirmations, and event details are managed by intermediaries.

This platform enables transparent, verifiable event management with true ownership of tickets, private encrypted access, and reputation-building through attendance. Event participation becomes composable data for airdrops, loyalty, and engagement insights across the ecosystem.

### Benefits for Stakeholders

**For Organizers:**
- Transparent, verifiable event data and participant history
- Direct access to attendee metrics and analytics
- Reduced fraud and counterfeit ticket issues
- Streamlined attendance verification
- Export anonymized attendance data for analytics
- Ticket sales reports for tax purposes

**For Users:**
- True ownership of tickets stored on-chain
- Private encrypted access to sensitive event information
- Reputation-building through verifiable attendance history
- Composable data for ecosystem rewards and loyalty programs
- Retain control over Walrus-stored data (delete or revoke access to encrypted blobs while on-chain proofs remain intact)
- Showcase attendance record across the ecosystem

**For Ecosystems:**
- Event participation becomes composable data for airdrops
- Loyalty and engagement insights across multiple events
- Verifiable credentials for follow-up campaigns
- Privacy-preserving analytics
- Integration points for event apps, sponsor activations, and loyalty programs

## 🔄 User Journey Overview

```
User Registration (ZkLogin/On-Chain)
    ↓
Browse & Discover Events
    ↓
Purchase NFT Tickets
    ↓
Decrypt Ticket Details (Seal Encryption)
    ↓
Access Event Content (Walrus Site)
    ↓
In-Venue Validation & Check-in
    ↓
Mint Attendance NFT (Proof-of-Presence)
    ↓
Showcase Attendance Record & Earn Rewards
```

## ⚙️ Technical Stack

- **Blockchain:** Sui blockchain for smart contracts and NFT ownership
- **Storage:** Walrus for decentralized event data and content hosting
- **Encryption:** Seal for encrypting sensitive ticket information
- **Authentication:** On-chain wallet + ZkLogin for frictionless onboarding
- **Frontend:** Next.js/React for organizer dashboards and attendee interfaces

## 🎨 Design Philosophy

This project embraces **creative flexibility**. While this RFP outlines recommended features and integrations, applicants and contributors are encouraged to propose alternative architectures, flows, or solutions that may better achieve the intended goals. Creative approaches that challenge or improve upon these specifications are welcome, provided they align with Sui and Walrus capabilities.

## 📊 Core Capabilities

### 1. Event Creation & Registration
- Create events with metadata (title, time, image, description) stored on Walrus
- ZkLogin support for easy user onboarding
- Optional approval flow for limited-capacity events
- Flexible ticket parameters (price, capacity, visibility, etc.)
- Upon successful registration, users receive a verifiable confirmation
- Confirmation includes an optional ICS calendar file ("Add to Calendar")
- Payment integrations and discount code management

### 2. NFT Ticketing
- Ticket NFTs minted on Sui and linked to a Walrus blob
- Ticket blob includes encrypted metadata (event location, QR code, access link) locked via Seal
- Only the rightful holder can decrypt and view details
- Optional dynamic updates (status, RSVP, attendance)

### 3. Event Access & Validation
- Ticket holders gain access to a full Walrus Site containing event-specific content (agenda, speakers, media, announcements)
- QR or wallet-based validation for entry
- At the venue, ticket NFTs can be scanned for validation and attendance tracking
- Attendance tracking and participation proof on-chain

### 4. Attendance Verification
- Scanning confirms attendance, triggering mint of an Attendance NFT (soulbound optional)
- Proof of attendance can later be used for airdrops, follow-up campaigns, or reputation systems

### 5. Communication
- Optional integration notifications (reminders, updates, confirmations, event chat)
- Email or wallet notifications support

### 6. Post-Event Interaction
- Event data remains verifiable on Walrus
- Organizers can export anonymized attendance data for analytics
- Attendees can showcase their attendance record across the ecosystem
- Ticket sales reports for tax
- Users retain control over their Walrus-stored data and may delete or revoke access to their encrypted blobs while on-chain proofs remain intact

### 7. Optional / Extended Features
- Lead capture and networking capabilities (opt-in profile sharing, wallet-based reputation links, post-event follow-ups)
- Multi-track or multi-flow registration support for larger events with different ticket tiers, agendas, or attendee types
- Badge printing and check-in support for in-person events, including QR or NFC-based access validation
- Integration points for event apps, sponsor activations, or loyalty programs that leverage on-chain attendance data

## 📦 Deliverables

1. **Technical Design** - Architecture document outlining system design
2. **Smart Contracts** - Sui contracts for event registration, ticketing, and attendance
3. **Frontend dApp** - Organizer dashboard + attendee view interfaces
4. **Walrus & Seal Integration** - Ticket encryption and decentralized storage
5. **Walrus Sites Deployment** - Event content hosted on Walrus Sites
6. **NFT Flows** - Minting and attendance verification workflows
7. **Open-Source Repository** - Frontend + contracts with documentation
8. **GTM Strategy** - Go-to-market plan for platform adoption

---

See the individual feature documents for detailed requirements and specifications.
