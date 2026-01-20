# User Guide - Ticketing Platform on Walrus

Welcome to the decentralized ticketing platform! This guide will help you get started as either an event organizer or attendee.

## Table of Contents

1. [Getting Started](#getting-started)
2. [For Event Organizers](#for-event-organizers)
3. [For Attendees](#for-attendees)
4. [Understanding NFT Tickets](#understanding-nft-tickets)
5. [FAQ](#faq)

## Getting Started

### What You Need

1. **Sui Wallet**: Install the Sui Wallet browser extension
   - Download from [Sui Wallet](https://chrome.google.com/webstore/detail/sui-wallet)
   - Create a new wallet or import existing one
   - Switch to testnet for testing

2. **SUI Tokens**: Get free testnet SUI tokens
   - Visit the [Sui Testnet Faucet](https://discord.gg/sui)
   - Request tokens in the #testnet-faucet channel
   - Wait for tokens to appear in your wallet

3. **Connect to Platform**
   - Visit the platform URL
   - Click "Connect Wallet"
   - Approve the connection in your Sui Wallet

### Alternative: ZkLogin

For privacy-preserving authentication, you can use zkLogin:
- Click "zkLogin" when connecting
- Authenticate with Google/Facebook/etc.
- Your identity is verified without revealing personal info

## For Event Organizers

### Creating Your First Event

1. **Navigate to Organizer Dashboard**
   - Click "Organizer Dashboard" from home page
   - Connect your wallet if not already connected

2. **Fill Out Event Details**
   - **Event Name**: Give your event a catchy name
   - **Description**: Describe what attendees can expect
   - **Location**: Where the event will take place
   - **Start/End Time**: When your event runs
   - **Ticket Supply**: Maximum number of tickets available
   - **Ticket Price**: Price in SUI tokens (e.g., 1.5 SUI)

3. **Upload to Walrus**
   - Prepare event assets (images, detailed info, etc.)
   - Upload to Walrus storage
   - Get the Blob ID
   - Enter the Blob ID in the form

4. **Create Event**
   - Click "Create Event"
   - Approve the transaction in your wallet
   - Wait for confirmation
   - Your event is now live!

### Managing Your Events

**View Event Details**
- See ticket sales in real-time
- Check remaining tickets
- View total revenue

**Update Event Status**
- Activate or deactivate ticket sales
- Manage event visibility

**Withdraw Proceeds**
- After the event, withdraw your earnings
- Click "Withdraw" next to your event
- Approve the transaction
- SUI tokens sent to your wallet

### Verifying Attendees

At your event:

1. **Check Ticket NFTs**
   - Attendees show their wallet
   - Verify they own the ticket NFT
   - Check ticket hasn't been used

2. **Mark Ticket as Used**
   - Use the verification function
   - Marks ticket to prevent re-entry

3. **Issue Attendance NFTs**
   - After verification, issue attendance NFT
   - Provides proof-of-presence for attendee
   - Can include rewards or perks

## For Attendees

### Finding Events

1. **Browse Events**
   - Click "Browse Events" from home page
   - View all available events
   - See event details, pricing, availability

2. **View Event Details**
   - Click "View Details" on any event
   - See full description, location, time
   - Event details loaded from Walrus

### Purchasing Tickets

1. **Select Event**
   - Find an event you want to attend
   - Check ticket price and availability

2. **Buy Ticket**
   - Click "Buy Ticket"
   - Approve the transaction in your wallet
   - Pay ticket price + gas fees
   - Wait for confirmation

3. **Receive NFT Ticket**
   - Ticket NFT minted to your wallet
   - Contains encrypted event access data
   - Unique ticket number assigned

### Managing Your Tickets

**View Your Tickets**
- Go to "Your Tickets" section
- See all your upcoming events
- View ticket details

**Transfer Tickets**
- Tickets are NFTs and can be transferred
- Use Sui Wallet to send to another address
- Useful if you can't attend

**Access Event Info**
- Click on ticket to view event details
- Data retrieved from Walrus storage
- See encrypted access codes (if applicable)

### Attending Events

1. **Before the Event**
   - Ensure you have ticket NFT in wallet
   - Check event time and location
   - Have wallet accessible

2. **At the Event**
   - Connect wallet to show ticket
   - Organizer verifies your NFT
   - Ticket marked as "used"

3. **After the Event**
   - Receive attendance NFT
   - Keep as proof-of-presence
   - May include rewards or benefits

## Understanding NFT Tickets

### What is an NFT Ticket?

- **NFT**: Non-Fungible Token - unique digital asset
- **On-Chain**: Stored on Sui blockchain
- **Verifiable**: Cannot be faked or duplicated
- **Transferable**: Can be sent to others
- **Encrypted**: Contains secure ticket data

### Benefits

✅ **Fraud Prevention**: Impossible to counterfeit
✅ **True Ownership**: You own the ticket, not a platform
✅ **Transferable**: Easy to resell or gift
✅ **Permanent Record**: Ticket history preserved
✅ **Privacy**: Data encrypted with Seal
✅ **Decentralized**: Event info on Walrus, not central server

### NFT Ticket Structure

Your ticket NFT contains:
- Unique ticket ID
- Event ID reference
- Ticket number
- Purchase timestamp
- Encrypted access data
- Usage status

### Attendance NFTs

After attending an event, you receive an attendance NFT:
- **Proof of Presence**: Verifies you attended
- **Collectible**: Keep as a memory
- **Rewards**: May unlock future benefits
- **Social**: Share your event history

## FAQ

### General Questions

**Q: What is Walrus?**
A: Walrus is a decentralized storage network that stores event data securely and permanently.

**Q: What is Seal?**
A: Seal is an encryption technology that protects sensitive ticket information.

**Q: Do I need cryptocurrency?**
A: Yes, you need SUI tokens to purchase tickets and pay gas fees.

**Q: Is my data safe?**
A: Yes, sensitive data is encrypted with Seal and stored on decentralized Walrus.

### For Organizers

**Q: How do I set ticket prices?**
A: When creating an event, enter the price in SUI tokens (e.g., 1.5 for 1.5 SUI).

**Q: Can I change event details after creation?**
A: Event details on-chain are immutable, but you can update status (active/inactive).

**Q: When can I withdraw proceeds?**
A: You can withdraw proceeds any time after tickets are sold.

**Q: How do I upload to Walrus?**
A: Use the Walrus CLI or web interface to upload files and get a Blob ID.

### For Attendees

**Q: What if I lose my ticket?**
A: Your ticket is in your wallet. If you have your wallet backup/seed phrase, you can recover it.

**Q: Can I resell my ticket?**
A: Yes, tickets are NFTs and can be transferred to another wallet address.

**Q: What if the event is cancelled?**
A: Contact the event organizer. Refund mechanisms depend on the organizer's policy.

**Q: How do I prove I attended?**
A: You'll receive an attendance NFT that serves as proof-of-presence.

### Technical Questions

**Q: Which blockchain is this on?**
A: Sui blockchain, a high-performance Layer 1 blockchain.

**Q: What wallets are supported?**
A: Sui Wallet browser extension and zkLogin authentication.

**Q: Are there transaction fees?**
A: Yes, small gas fees in SUI tokens for blockchain transactions.

**Q: Is this open source?**
A: Yes, all code is available in the GitHub repository.

**Q: Can I use this on mobile?**
A: Currently web-based, but works on mobile browsers with compatible wallets.

## Troubleshooting

### Wallet Issues

**Problem**: Can't connect wallet
- Solution: Install Sui Wallet extension and unlock it

**Problem**: Transactions failing
- Solution: Ensure you have enough SUI for gas fees

### Ticket Purchase Issues

**Problem**: "Sold Out" error
- Solution: All tickets sold, check other events

**Problem**: Transaction rejected
- Solution: Check wallet balance, try again with higher gas

### Display Issues

**Problem**: Events not loading
- Solution: Refresh page, check internet connection

**Problem**: Images not showing
- Solution: Walrus blob might be loading, wait a moment

## Support

Need help?
- Check this guide first
- Visit our documentation
- Join our Discord community
- Open a GitHub issue
- Contact event organizer (for event-specific questions)

## Best Practices

### For Organizers
- Upload high-quality event images to Walrus
- Provide detailed event descriptions
- Set reasonable ticket prices
- Verify attendees promptly
- Issue attendance NFTs quickly after event

### For Attendees
- Keep your wallet backup safe
- Don't share your seed phrase
- Verify event details before purchasing
- Arrive early to events
- Keep attendance NFTs as collectibles

---

**Ready to get started?** Connect your wallet and explore events!
