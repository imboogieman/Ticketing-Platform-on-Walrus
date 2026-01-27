# Ticketing Platform on Walrus - Technical Architecture

## Overview

This is a decentralized event and ticketing platform powered by Sui blockchain, Walrus decentralized storage, and Seal encryption. The platform enables secure, verifiable ticketing with NFT-based proof of ownership and attendance.

## Architecture Components

### 1. Blockchain Layer (Sui)

#### Smart Contracts
- **Event Contract**: Manages event creation, metadata, and lifecycle
- **Ticket NFT Contract**: Handles ticket minting, transfers, and verification
- **Attendance NFT Contract**: Issues proof-of-presence NFTs for attendees
- **Access Control**: Manages permissions for organizers and attendees

#### Key Features
- On-chain identity (Sui Address or zkLogin)
- NFT-based tickets with metadata
- Verifiable ownership and transfers
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

## Stack-Provided Capabilities

This section documents the native capabilities provided by the Sui, Walrus, and Seal technology stack that reduce custom development requirements.

### Sui Blockchain

**Authentication & Identity:**
- Wallet Standard (@mysten/dapp-kit): Provides wallet detection, connection, and message signing
- zkLogin: Social login integration (Google, Twitter, Apple) with non-custodial wallet creation
- Session management via wallet events and ephemeral keys

**Security & Validation:**
- Digital signature verification (Ed25519, ECDSA) built into wallet interactions
- Object ownership model prevents double-spending automatically
- Object versioning provides race condition protection
- Move bytecode verifier prevents common smart contract vulnerabilities

**Transaction Features:**
- Programmable Transaction Blocks (PTB) for atomic multi-step operations
- Sponsored transactions for gasless user onboarding
- Sui Clock object for network-verified timestamps
- Fast-path execution for owned objects (sub-500ms finality)

### Walrus Storage

**Core Capabilities:**
- SDK provides complete upload/download API
- Automatic blob ID generation and content addressing
- Publisher node infrastructure managed by network
- Permanent, redundant storage by design
- Content verification through cryptographic hashing

**Integration Benefits:**
- Decentralized frontend hosting via Walrus Sites
- Event-specific sites for content distribution
- Immutable data references for audit trails
- Cost-effective alternative to on-chain storage

### Sui Seal

**Encryption Infrastructure:**
- Seal SDK for encryption/decryption operations
- Threshold key server infrastructure
- On-chain policy validation framework
- Automatic ownership-based access control

**Privacy Features:**
- Policy-driven content encryption
- Secure metadata protection
- Owner-only decryption with transfer support
- No centralized key management required

### Development Tools

**Frameworks & Libraries:**
- DeepBook v3 for liquidity pool integration
- Sui TypeScript SDK for backend services
- Next.js authentication patterns
- Standard OAuth flow templates

**Performance Optimizations:**
- Parallel execution for independent objects
- Storage fund rebate mechanism
- Consensus optimization (owned vs. shared objects)
- Gas fee optimization strategies

### Impact on Development

The comprehensive capabilities of the Sui/Walrus/Seal stack reduce MVP1 development effort by approximately **840 hours** (~28% reduction):

- **Removed Features** (~210 hours): Natively provided by stack (signatures, double-spend prevention, etc.)
- **Consolidated Requirements** (~150 hours): Single implementations for cross-module features (Seal encryption, authentication)
- **Reduced Estimates** (~480 hours): SDK/framework handles majority of implementation work

This allows the development team to focus on:
- Custom business logic and user experience
- UI/UX components and workflows
- Integration and testing
- Platform-specific features and optimizations

---

## Future Enhancements

1. Secondary ticket marketplace with royalty enforcement
2. Dynamic pricing based on demand analytics
3. Multi-tier ticket types (VIP, General, Early Bird)
4. Advanced refund mechanisms and escrow
5. AI-powered event recommendations
6. Social features and event sharing
7. Additional payment provider integrations
8. Native mobile app with biometric authentication
9. Real-time analytics dashboards
10. Venue capacity optimization algorithms
