# Ticketing Platform on Walrus - Technical Architecture

## Overview

This is a decentralized event and ticketing platform powered by Sui blockchain, Walrus decentralized storage, and Seal encryption. The platform enables secure, verifiable ticketing with NFT-based proof of ownership and attendance.

## Stack-Provided Features vs. Custom Development

A key architectural decision is understanding what the technology stack provides natively versus what requires custom development. This significantly impacts development estimates and system design.

### Sui Blockchain Provides

The Sui blockchain eliminates the need for custom implementation of many traditional ticketing platform concerns:

#### ✅ Automatic Features (No Custom Code Required)
- **Digital Signature Verification**: All transactions are cryptographically signed and verified automatically
- **Double-Spending Prevention**: Object versioning prevents ticket reuse without custom logic
- **Transaction Atomicity**: PTBs ensure multi-step operations succeed or fail atomically
- **Ownership Enforcement**: Single-writer model guarantees only ticket holder can redeem
- **Timestamp Authority**: Clock object (0x6) provides network-verified millisecond timestamps
- **Storage Persistence**: Storage fund mechanism ensures permanent data availability
- **Gas Sponsorship**: Built-in framework for sponsored transactions (gasless UX)
- **Fast Finality**: Sub-500ms confirmation for owned object transactions

#### 📦 SDK-Provided Features (Integration Only)
- **Wallet Connection**: @mysten/dapp-kit provides React hooks and UI components
- **zkLogin**: Social login SDK handles ephemeral keys and OIDC flows
- **Transaction Building**: @mysten/sui.js provides PTB composition utilities
- **Object Queries**: GraphQL and RPC APIs for blockchain state reads

### Walrus Storage Provides

#### ✅ Automatic Features
- **Blob Lifecycle**: Automatic replication and availability management
- **Content Addressing**: Immutable blob IDs for permanent references
- **HTTP Gateway**: Standard web access via aggregator nodes
- **Sites Hosting**: Static website deployment infrastructure

#### 📦 SDK-Provided Features
- **TypeScript/Rust SDKs**: Publisher and aggregator client libraries
- **Sites CLI**: Deployment and management tools

### Seal Encryption Provides

#### 📦 SDK-Provided Features
- **IBE Framework**: Identity-based encryption primitives
- **Policy Engine**: Attribute-based access control
- **Threshold Cryptography**: Distributed key management

### Custom Development Required

Our platform focuses on these areas where custom development is necessary:

#### Business Logic
- Event creation and management workflows
- Ticket pricing and tier configurations
- Check-in procedures and badge minting
- Revenue splitting and payment processing
- Loyalty and rewards programs

#### User Experience
- Responsive web interface (Next.js + React)
- Wallet connection flows and error handling
- QR code generation and scanning
- Dashboard analytics and reporting
- Mobile-optimized ticket display

#### Integration Work
- Walrus SDK integration for media storage
- Seal policy configuration for content gating
- DeepBook integration for multi-token payments
- Event indexing and search functionality
- Email notifications (optional)

---

## Architecture Components

### 1. Blockchain Layer (Sui)

#### Smart Contracts (Move)
- **Event Contract**: Manages event creation, metadata, and lifecycle
- **Ticket NFT Contract**: Handles ticket minting, transfers, and verification
- **Attendance NFT Contract**: Issues proof-of-presence NFTs for attendees
- **Access Control**: Manages permissions for organizers and attendees

#### Key Features
- On-chain identity (Sui Address or zkLogin)
- NFT-based tickets with metadata
- Verifiable ownership and transfers (automatic via Sui)
- Attendance verification and rewards

### 2. Storage Layer (Walrus)

#### Use Cases
- Event images and media assets
- Event descriptions and detailed information
- Encrypted ticket data
- Attendance records
- Frontend dApp hosting (Walrus Sites)

#### Benefits
- Decentralized and censorship-resistant
- Cost-effective storage
- Permanent data availability
- Integration with Sui ecosystem

### 3. Encryption Layer (Seal)

#### Purpose
- Encrypt sensitive ticket information
- Protect event access credentials
- Secure personal attendee data
- Enable privacy-preserving verification

### 4. Frontend Layer

#### Organizer Dashboard
- Create and manage events
- Set ticket prices and supply
- View sales analytics
- Verify attendee check-ins
- Manage event details

#### Attendee Interface
- Browse available events
- Purchase tickets (NFT minting)
- View owned tickets
- Access event details via Walrus
- Receive attendance NFTs

## Data Models

### Event
```
{
  id: ObjectID,
  organizer: Address,
  name: String,
  description: String,
  location: String,
  startTime: u64,
  endTime: u64,
  ticketSupply: u64,
  ticketPrice: u64,
  walrusId: String,
  isActive: bool
}
```

### Ticket NFT
```
{
  id: ObjectID,
  eventId: ObjectID,
  owner: Address,
  ticketNumber: u64,
  purchaseTime: u64,
  isUsed: bool,
  encryptedData: vector<u8>
}
```

### Attendance NFT
```
{
  id: ObjectID,
  eventId: ObjectID,
  attendee: Address,
  checkInTime: u64,
  metadata: String
}
```

## User Flows

### Organizer Flow
1. Connect wallet (Sui Wallet or zkLogin)
2. Create event with details
3. Upload event assets to Walrus
4. Set ticket parameters (price, supply)
5. Publish event on-chain
6. Monitor ticket sales
7. Verify attendees at event
8. Issue attendance NFTs

### Attendee Flow
1. Connect wallet (Sui Wallet or zkLogin)
2. Browse events
3. Purchase ticket (mint NFT)
4. Access event details from Walrus
5. Present ticket for verification
6. Receive attendance NFT
7. View attendance history and rewards

## Security Considerations

1. **Access Control**: Only event organizers can create events and verify attendance
2. **Ticket Verification**: NFT ownership verification prevents ticket fraud
3. **Encryption**: Seal encryption protects sensitive ticket data
4. **On-chain Audit Trail**: All transactions are permanently recorded
5. **ZkLogin Support**: Privacy-preserving authentication option

## Technology Stack

- **Blockchain**: Sui (Move language)
- **Storage**: Walrus
- **Encryption**: Seal
- **Frontend**: React/Next.js
- **Wallet Integration**: Sui Wallet SDK, zkLogin
- **Deployment**: Walrus Sites

## Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│           Walrus Sites (Frontend)               │
│  ┌──────────────┐      ┌──────────────┐        │
│  │  Organizer   │      │   Attendee   │        │
│  │  Dashboard   │      │  Interface   │        │
│  └──────────────┘      └──────────────┘        │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│              Sui Blockchain                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │  Event   │  │  Ticket  │  │Attendance│     │
│  │ Contract │  │ Contract │  │ Contract │     │
│  └──────────┘  └──────────┘  └──────────┘     │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│         Walrus Storage + Seal Encryption        │
│  - Event Assets     - Ticket Data               │
│  - Metadata        - Encrypted Info             │
└─────────────────────────────────────────────────┘
```

## Future Enhancements

1. Secondary ticket marketplace
2. Dynamic pricing based on demand
3. Multi-tier ticket types (VIP, General, etc.)
4. Refund mechanisms
5. Event recommendations
6. Social features and event sharing
7. Integration with payment providers
8. Mobile app support
