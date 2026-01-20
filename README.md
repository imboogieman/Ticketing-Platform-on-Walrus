# Ticketing Platform on Walrus

A decentralized event and ticketing platform powered by Sui blockchain, Walrus decentralized storage, and Seal encryption.

## 🎫 Overview

This platform enables secure, verifiable, and transparent event ticketing using Web3 technologies:

- **NFT Tickets**: Verifiable on-chain tickets that cannot be counterfeited
- **Decentralized Storage**: Event data stored on Walrus for permanent availability
- **Encrypted Data**: Seal encryption protects sensitive ticket information
- **Proof of Attendance**: Attendance NFTs serve as verified proof-of-presence
- **Wallet Authentication**: Support for Sui Wallet and zkLogin

## ✨ Features

### For Event Organizers
- Create and manage events on-chain
- Set ticket prices and supply limits
- Upload event assets to Walrus decentralized storage
- Real-time ticket sales monitoring
- Verify attendees with NFT tickets
- Issue attendance NFTs for proof-of-presence
- Withdraw event proceeds directly to wallet

### For Attendees
- Browse available events
- Purchase NFT tickets with SUI tokens
- View encrypted ticket data
- Access event details from Walrus storage
- Receive attendance NFTs after check-in
- Build verifiable event attendance history

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

## 🔐 Security Features

- On-chain ticket ownership verification
- Seal encryption for sensitive ticket data
- Immutable event records on Sui blockchain
- Decentralized storage prevents data loss
- zkLogin support for privacy-preserving authentication
- Non-transferable attendance NFTs prevent fraud

## 🎯 Use Cases

- Conferences and tech events
- Concerts and music festivals
- Sports events
- Workshops and training sessions
- Meetups and community events
- Virtual events with token-gated access
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

- [x] Core smart contracts (Event, Ticket, Attendance)
- [x] Frontend dApp with organizer and attendee interfaces
- [x] Walrus storage integration
- [x] Seal encryption support
- [ ] Secondary ticket marketplace
- [ ] Dynamic pricing mechanisms
- [ ] Multi-tier ticket types
- [ ] Refund system
- [ ] Mobile app
- [ ] Analytics dashboard
- [ ] Event discovery and recommendations

---

Built with ❤️ for the decentralized future
