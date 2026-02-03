# Ticketing Platform on Walrus

A decentralized event and ticketing platform powered by Sui blockchain, Walrus decentralized storage, and Seal encryption. Users register with on-chain or ZkLogin identity, receive verifiable encrypted NFT tickets, unlock access to event details hosted on Walrus Sites, and earn attendance NFTs for proof-of-presence and reward eligibility.

## 🎫 Overview

This platform enables secure, verifiable, and transparent event ticketing using Web3 technologies, creating composable event participation data for airdrops, loyalty, and engagement insights:

- **NFT Tickets**: Verifiable, encrypted on-chain tickets with Seal encryption
- **Decentralized Storage**: Event data and content stored on Walrus Sites
- **Identity Options**: Wallet connection + ZkLogin for frictionless onboarding
- **Proof of Attendance**: Soulbound Attendance NFTs for verifiable participation
- **Ecosystem Integration**: Attendance data composable for rewards and loyalty programs

## ✨ Core Features

### For Event Organizers
- **Event Creation**: Publish events with metadata stored on Walrus
- **Flexible Ticketing**: Configure price, capacity, tiers, and transferability
- **Approval Workflows**: Optional event approval for limited-capacity events
- **Real-Time Analytics**: Monitor sales, attendance, and engagement
- **Attendee Verification**: Scan QR codes or verify via wallet
- **Attendance Tracking**: Maintain on-chain records of who attended
- **Financial Reporting**: Tax-compliant reports and revenue analytics
- **Follow-Up Campaigns**: Target attendees for engagement and loyalty

### For Attendees
- **Easy Registration**: Sign up via Wallet Connect or ZkLogin (no seed phrases)
- **Purchase Tickets**: Buy encrypted NFT tickets with SUI tokens
- **Secure Access**: Decrypt sensitive ticket details via Seal encryption
- **Event Content**: Access exclusive Walrus Sites with agendas and materials
- **Proof of Attendance**: Earn soulbound Attendance NFTs after check-in
- **Reputation Building**: Showcase attendance history across the ecosystem
- **Ecosystem Rewards**: Leverage attendance for airdrops and loyalty programs

### For Ecosystems
- **Composable Data**: Event attendance becomes data for integrations
- **Loyalty Incentives**: Reward frequent attendees with discounts and perks
- **Engagement Insights**: Analytics on community participation
- **Reputation Systems**: Verifiable attendance credentials for trust

## 🏗️ Architecture

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

### Soulbound NFT Attendance Flow

The platform implements a sophisticated attendance verification system using Soulbound Tokens (SBTs) for non-transferable proof of attendance:

![Soulbound NFT Sequence Diagram](docs/diagrams/soulbound-nft-sequence.mmd)

For detailed flow visualization, see [Soulbound NFT Sequence Diagram](docs/diagrams/soulbound-nft-sequence.md).

**Key Features:**
- Dynamic QR code generation with 30-second rotation
- Real-time on-chain verification at venue gates
- Atomic PTB (Programmable Transaction Block) for ticket redemption and badge minting
- Non-transferable soulbound attendance badges linked to attendee address
- Redemption-gated content access via Seal encryption
- Sub-400ms transaction finalization for seamless gate experience

## 📁 Project Structure

> **Note:** Files marked with ⚠️ are placeholder files for future smart contract implementations. These are **not final code** and contain only module structure outlines based on the requirements documentation. See the individual files for implementation details and references to their respective requirement documents.

```
├── docs/                           # Documentation and specifications
│   ├── diagrams/                   # Architecture diagrams
│   │   ├── soulbound-nft-sequence.md
│   │   └── soulbound-nft-sequence.mmd
│   └── requirements/               # Detailed requirements documents
│       ├── mvp_01/                 # MVP Phase 1 Requirements (52 Features)
│       │   ├── 00 - UX_Design_UXD-00.md
│       │   ├── 01 - Identity_and_Authentication_ID-01.md
│       │   ├── 02 - User_Profile_System_UPS-02.md
│       │   ├── 03 - Attendance_Management_AM-03.md
│       │   ├── 04 - Data_Preservation_and_Storage_DAT-04.md
│       │   ├── 05 - Technical_Infrastructure_INF-05.md
│       │   ├── 06 - NFT_Implementation_NFT-06.md
│       │   ├── 07 - Event_Management_System_EMS-07.md
│       │   ├── 08 - Ticketing_System_TS-08.md
│       │   ├── 09 - Financial_Operations_FIN-09.md
│       │   ├── 11 - Analytics_and_Reporting_AR-06.md
│       │   └── 12 - Loyalty_and_Rewards_LRW-04.md
│       └── mvp_02/                 # MVP Phase 2 Requirements
│           ├── 01 - Communication_and_Engagement_CM-01.md
│           ├── 02 - Content_and_Materials_CNT-02.md
│           ├── 03 - Financial_Extensions_FEX-03.md
│           ├── 05 - Growth_and_Marketing_GMK-05.md
│           ├── 06 - Developer_Platform_DEV-06.md
│           ├── 07 - Platform_Deliverables_Communication_PD-05.md
│           ├── 08 - Event_Extensions_EVX-08.md
│           ├── 09 - Physical_Operations_PHY-09.md
│           └── README.md
├── smart-contracts/                # Sui Move smart contracts
│   └── ticketing_platform/
│       ├── sources/
│       │   ├── event.move          # Event management
│       │   ├── ticket.move         # NFT tickets
│       │   ├── attendance.move     # Attendance NFTs
│       │   ├── soulbound.move      # ⚠️ Placeholder: SBT standards (NFT-14.8/14.9)
│       │   ├── loyalty.move        # ⚠️ Placeholder: Loyalty tokens (LRW-04)
│       │   ├── payment.move        # ⚠️ Placeholder: Payment processing (FIN-09)
│       │   ├── transfer_policy.move # ⚠️ Placeholder: Transfer policies (TS-08)
│       │   └── seal_policy.move    # ⚠️ Placeholder: Seal encryption (NFT-14.5)
│       ├── tests/
│       │   └── ticketing_platform_tests.move
│       └── Move.toml
├── frontend/                       # Next.js frontend dApp
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page
│   │   ├── providers.tsx           # App providers
│   │   ├── globals.css             # Global styles
│   │   ├── organizer/              # Organizer dashboard
│   │   │   └── page.tsx
│   │   └── attendee/               # Attendee interface
│   │       └── page.tsx
│   ├── components/
│   │   ├── EventCard.tsx           # Event display component
│   │   ├── Navbar.tsx              # Navigation component
│   │   └── WalletConnect.tsx       # Wallet connection component
│   ├── lib/
│   │   ├── walrus.ts               # Walrus integration
│   │   └── seal.ts                 # Seal encryption
│   ├── utils/
│   │   ├── constants.ts            # App constants
│   │   ├── sui.ts                  # Sui utilities
│   │   └── types.ts                # TypeScript types
│   └── package.json
├── ARCHITECTURE.md                 # Detailed technical architecture
├── CONTRIBUTING.md                 # Contribution guidelines
├── DEPLOYMENT.md                   # Deployment guide
├── IMPLEMENTATION_SUMMARY.md       # Implementation summary
├── SECURITY.md                     # Security documentation
├── TESTING.md                      # Testing guide
├── USER_GUIDE.md                   # User documentation
├── deploy.sh                       # Deployment script
└── LICENSE                         # Project license
```

## 🚀 Quick Start

### Prerequisites

- [Sui CLI](https://docs.sui.io/build/install) for smart contract deployment
- [Node.js 18+](https://nodejs.org/) for frontend development
- [Sui Wallet](https://chrome.google.com/webstore/detail/sui-wallet) browser extension
- Testnet SUI tokens from [faucet](https://discord.gg/sui)

### 1. Deploy Smart Contracts

```bash
cd smart-contracts/ticketing_platform
sui move build
sui move test
sui client publish --gas-budget 100000000
```

Save the Package ID from the deployment output.

### 2. Setup Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
```

Update `.env.local` with your Package ID:
```
NEXT_PUBLIC_PACKAGE_ID=0xYOUR_PACKAGE_ID
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Deploy to Walrus Sites

```bash
npm run build
# Deploy to Walrus Sites following DEPLOYMENT.md
```

## 📚 Documentation

### Requirements & Specifications

#### MVP Phase 1 (52 Features)
- [UX Design](docs/requirements/mvp_01/00%20-%20UX_Design_UXD-00.md) - Responsive design, accessibility, and internationalization
- [Identity & Authentication](docs/requirements/mvp_01/01%20-%20Identity_and_Authentication_ID-01.md) - Wallet connection and zkLogin
- [User Profile System](docs/requirements/mvp_01/02%20-%20User_Profile_System_UPS-02.md) - Profile management and attendance history
- [Attendance Management](docs/requirements/mvp_01/03%20-%20Attendance_Management_AM-03.md) - Check-in and soulbound badges
- [Data Preservation & Storage](docs/requirements/mvp_01/04%20-%20Data_Preservation_and_Storage_DAT-04.md) - Walrus blob storage
- [Technical Infrastructure](docs/requirements/mvp_01/05%20-%20Technical_Infrastructure_INF-05.md) - Sui network and Seal encryption
- [NFT Implementation](docs/requirements/mvp_01/06%20-%20NFT_Implementation_NFT-06.md) - Ticket NFTs and soulbound tokens
- [Event Management System](docs/requirements/mvp_01/07%20-%20Event_Management_System_EMS-07.md) - Event creation and tier configuration
- [Ticketing System](docs/requirements/mvp_01/08%20-%20Ticketing_System_TS-08.md) - QR codes, digital signatures, and transfer policies
- [Financial Operations](docs/requirements/mvp_01/09%20-%20Financial_Operations_FIN-09.md) - Crypto payments, fiat on-ramp, and audit trails
- [Analytics & Reporting](docs/requirements/mvp_01/11%20-%20Analytics_and_Reporting_AR-06.md) - Tax compliance and data export
- [Loyalty & Rewards](docs/requirements/mvp_01/12%20-%20Loyalty_and_Rewards_LRW-04.md) - Points system and tier rewards

#### MVP Phase 2
- [Communication & Engagement](docs/requirements/mvp_02/01%20-%20Communication_and_Engagement_CM-01.md) - Delivery channels and messaging
- [Content & Materials](docs/requirements/mvp_02/02%20-%20Content_and_Materials_CNT-02.md) - Event content management
- [Financial Extensions](docs/requirements/mvp_02/03%20-%20Financial_Extensions_FEX-03.md) - Refunds and settlements
- [Growth & Marketing](docs/requirements/mvp_02/05%20-%20Growth_and_Marketing_GMK-05.md) - Marketing and discovery
- [Developer Platform](docs/requirements/mvp_02/06%20-%20Developer_Platform_DEV-06.md) - API and integrations
- [Platform Deliverables & Communication](docs/requirements/mvp_02/07%20-%20Platform_Deliverables_Communication_PD-05.md) - Alerts, chat, and notifications
- [Event Extensions](docs/requirements/mvp_02/08%20-%20Event_Extensions_EVX-08.md) - Advanced event features
- [Physical Operations](docs/requirements/mvp_02/09%20-%20Physical_Operations_PHY-09.md) - On-site operations

### Implementation Guides
- [Architecture Document](ARCHITECTURE.md) - Technical design and system architecture
- [Deployment Guide](DEPLOYMENT.md) - Step-by-step deployment instructions
- [User Guide](USER_GUIDE.md) - Guide for organizers and attendees
- [Testing Guide](TESTING.md) - Testing instructions and guidelines
- [Security Documentation](SECURITY.md) - Security best practices
- [Contributing Guide](CONTRIBUTING.md) - How to contribute

## 🔧 Technology Stack

- **Blockchain**: [Sui](https://sui.io/) - High-performance Layer 1 blockchain
- **Smart Contracts**: [Move](https://docs.sui.io/learn/move-overview) - Safe and flexible programming language
- **Storage**: [Walrus](https://walrus.site/) - Decentralized storage network
- **Encryption**: [Seal](https://docs.mystenlabs.com/seal) - Data encryption technology
- **Frontend**: [Next.js 14](https://nextjs.org/) - React framework
- **Wallet Integration**: [@mysten/dapp-kit](https://sdk.mystenlabs.com/dapp-kit) - Sui wallet SDK
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

## 🔐 Security & Privacy

- **On-Chain Verification**: Immutable ticket ownership via Sui blockchain
- **Seal Encryption**: Sensitive ticket metadata encrypted and gated by time
- **Data Control**: Users can revoke access to encrypted data while keeping attendance proof
- **Privacy-Preserving Auth**: ZkLogin enables authentication without revealing identity
- **Soulbound Attendance**: Non-transferable Attendance NFTs prevent fraud
- **Decentralized Storage**: Walrus ensures data redundancy and prevents single-point failure
- **Transparent Governance**: Event data remains auditable and verifiable

## 🎯 Use Cases
**Conferences & Tech Events**: Track attendance for networking and follow-up
- **Music & Sports**: Verify attendance and prevent counterfeit tickets
- **Workshops & Training**: Issue certificates via Attendance NFTs
- **Community Events**: Build reputation and loyalty programs
- **Web3 Events**: Token-gated access and airdrop eligibility
- **Corporate Retreats**: Attendance-based rewards and engagement tracking
- **Educational Programs**: Verifiable credentials and continuing education credits
- **Exclusive Access**: Privacy-preserving proof of membership or early adopter statugated access
- Exclusive membership events

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Sui Foundation](https://sui.io/) for the blockchain platform
- [Mysten Labs](https://mystenlabs.com/) for Walrus and Seal technologies
- The Web3 and decentralization community

## 📞 Support

- 📖 [Documentation](./ARCHITECTURE.md)
- 💬 [Sui Discord](https://discord.gg/sui)
- 🐛 [Issue Tracker](https://github.com/imboogieman/Ticketing-Platform-on-Walrus/issues)

## 🗺️ Roadmap
### Phase 1: Core Platform (Current)
- [x] Core smart contracts (Event, Ticket, Attendance)
- [x] Frontend dApp with organizer and attendee interfaces
- [x] Walrus storage integration
- [x] Seal encryption support
- [ ] Identity & authentication (wallet + ZkLogin)
- [ ] Event creation and registration workflows
- [ ] NFT ticket issuance and validation
- [ ] Attendance NFT minting

### Phase 2: Enhanced Features
- [ ] Analytics dashboard and reporting
- [ ] Email and wallet notifications
- [ ] Loyalty program and rewards
- [ ] Secondary ticket marketplace
- [ ] Dynamic pricing mechanisms
- [ ] Refund and cancellation system

### Phase 3: Advanced Integrations
- [ ] Event app and white-label support
- [ ] NFC badge and QR code printing
- [ ] Lead capture and networking
- [ ] Sponsor activation tools
- [ ] Mobile native app
- [ ] External service integrations (CRM, email, analytics)
- [ ] Event discovery and recommendations

---

Built with ❤️ for the decentralized future
