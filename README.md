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

## 📁 Project Structure

```
├── docs/                    # Documentation and specifications
│   ├── requirements/        # Detailed requirements documents
│   │   ├── 01 - Identity_and_Authentication_ID-01.md
│   │   ├── 02 - User_Profile_System_UPS-02.md
│   │   ├── 03 - Attendance_Management_AM-03.md
│   │   ├── 04 - Data_Preservation_and_Storage_DAT-04.md
│   │   ├── 05 - Technical_Infrastructure_INF-05.md
│   │   ├── 06 - NFT_Implementation_NFT-14.md
│   │   ├── Event_Creation_and_Registration_RC-1.md
│   │   ├── NFT_Ticketing_TC-1.md
│   │   ├── Event_Access_and_Validation_EA-1.md
│   │   ├── Communication_CM-1.md
│   │   ├── Post_Event_Interaction_PE-1.md
│   │   └── Optional_and_Extended_Features_OE-1.md
│   ├── technical-design/    # Technical specifications
│   └── architecture/        # System architecture docs
├── ARCHITECTURE.md          # Detailed technical architecture
├── DEPLOYMENT.md            # Deployment guide
├── USER_GUIDE.md           # User documentation
├── move/                   # Sui Move smart contracts
│   └── ticketing_platform/
│       ├── sources/
│       │   ├── event.move        # Event management
│       │   ├── ticket.move       # NFT tickets
│       │   └── attendance.move   # Attendance NFTs
│       ├── tests/
│       └── Move.toml
└── frontend/               # Next.js frontend dApp
    ├── app/
    │   ├── organizer/     # Organizer dashboard
    │   └── attendee/      # Attendee interface
    ├── lib/
    │   ├── walrus.ts      # Walrus integration
    │   └── seal.ts        # Seal encryption
    └── package.json
```

## 🚀 Quick Start

### Prerequisites

- [Sui CLI](https://docs.sui.io/build/install) for smart contract deployment
- [Node.js 18+](https://nodejs.org/) for frontend development
- [Sui Wallet](https://chrome.google.com/webstore/detail/sui-wallet) browser extension
- Testnet SUI tokens from [faucet](https://discord.gg/sui)

### 1. Deploy Smart Contracts

```bash
cd move/ticketing_platform
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
- [Project Overview & Vision](docs/requirements/Project_Overview_and_Vision.md) - Vision, goals, and design philosophy
- [Identity & Authentication (ID-1)](docs/requirements/Identity_and_Authentication_ID-1.md) - User registration and auth methods
- [Event Creation & Registration (RC-1)](docs/requirements/Event_Creation_and_Registration_RC-1.md) - Event management workflows
- [NFT Ticketing (TC-1)](docs/requirements/NFT_Ticketing_TC-1.md) - Encrypted ticket specifications
- [Event Access & Validation (EA-1)](docs/requirements/Event_Access_and_Validation_EA-1.md) - Access control and venue validation
- [Attendance Verification (AV-1)](docs/requirements/Attendance_Verification_AV-1.md) - Attendance NFTs and proof-of-presence
- [Communication (CM-1)](docs/requirements/Communication_CM-1.md) - Notification and messaging
- [Post-Event Interaction (PE-1)](docs/requirements/Post_Event_Interaction_PE-1.md) - Analytics and loyalty
- [Optional & Extended Features (OE-1)](docs/requirements/Optional_and_Extended_Features_OE-1.md) - Advanced features

### Implementation Guides
- [Architecture Document](ARCHITECTURE.md) - Technical design and system architecture
- [Deployment Guide](DEPLOYMENT.md) - Step-by-step deployment instructions
- [User Guide](USER_GUIDE.md) - Guide for organizers and attendees

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
