# Ticketing Platform Frontend

This is the frontend dApp for the decentralized ticketing platform built with Next.js, Sui, Walrus, and Seal.

## Features

- 🎫 NFT-based tickets on Sui blockchain
- 🔐 Encrypted ticket data using Seal
- 🌐 Decentralized storage with Walrus
- 👤 Wallet authentication (Sui Wallet, zkLogin)
- 🏆 Attendance NFTs for proof-of-presence
- 📊 Organizer dashboard for event management
- 🎉 Attendee interface for browsing and purchasing tickets

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Sui Wallet browser extension

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env.local
```

3. Update `.env.local` with your configuration:
   - Set `NEXT_PUBLIC_PACKAGE_ID` to your deployed contract address
   - Configure Walrus endpoints if using custom deployment

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building

Build for production:

```bash
npm run build
```

### Deployment to Walrus Sites

1. Build the static export:
```bash
npm run build
```

2. Upload to Walrus Sites following the [Walrus Sites documentation](https://docs.walrus.site)

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── organizer/         # Organizer dashboard
│   ├── attendee/          # Attendee interface
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
├── lib/                   # Utility functions
│   ├── walrus.ts         # Walrus integration
│   └── seal.ts           # Seal encryption
└── public/               # Static assets
```

## Technologies

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS
- **@mysten/dapp-kit**: Sui wallet integration
- **@mysten/sui.js**: Sui blockchain SDK
- **Walrus**: Decentralized storage
- **Seal**: Data encryption

## Usage

### For Event Organizers

1. Connect your Sui wallet
2. Navigate to the Organizer Dashboard
3. Create a new event with details
4. Upload event assets to Walrus
5. Set ticket price and supply
6. Publish event on-chain
7. Monitor ticket sales
8. Verify attendees and issue attendance NFTs

### For Attendees

1. Connect your Sui wallet
2. Browse available events
3. View event details from Walrus
4. Purchase tickets (mint NFT)
5. Receive encrypted ticket data
6. Present ticket at event
7. Receive attendance NFT after check-in

## Smart Contracts

The frontend interacts with three main Move contracts:

- `event`: Event creation and management
- `ticket`: NFT ticket minting and verification
- `attendance`: Attendance NFT issuance

See the `/move` directory for contract source code.

## License

MIT
