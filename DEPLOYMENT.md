# Deployment Guide

This guide covers deploying the Ticketing Platform on Sui, Walrus, and Walrus Sites.

## Prerequisites

- Sui CLI installed ([Installation Guide](https://docs.sui.io/build/install))
- Walrus CLI installed ([Installation Guide](https://docs.walrus.site))
- Node.js 18+ for frontend
- Sui wallet with testnet SUI tokens

## Part 1: Deploy Smart Contracts

### 1. Setup Sui Environment

```bash
# Check Sui installation
sui --version

# Switch to testnet
sui client switch --env testnet

# Check active address
sui client active-address

# Get testnet tokens from faucet
curl --location --request POST 'https://faucet.testnet.sui.io/gas' \
--header 'Content-Type: application/json' \
--data-raw '{
    "FixedAmountRequest": {
        "recipient": "YOUR_ADDRESS"
    }
}'
```

### 2. Build and Deploy Contracts

```bash
cd move/ticketing_platform

# Build the Move package
sui move build

# Test the contracts (optional but recommended)
sui move test

# Deploy to testnet
sui client publish --gas-budget 100000000
```

### 3. Save Contract Details

After deployment, save these values:
- Package ID: `0x...`
- Event Module: `0x...::event`
- Ticket Module: `0x...::ticket`
- Attendance Module: `0x...::attendance`

Update your frontend `.env.local` with the Package ID.

## Part 2: Configure Walrus Storage

### 1. Install Walrus CLI

```bash
# Download Walrus CLI
# Follow instructions at https://docs.walrus.site/usage/setup.html
```

### 2. Test Walrus Upload

```bash
# Upload a test file to Walrus
walrus store path/to/test.json

# Retrieve the blob ID from output
# Example: blob-id-abc123...
```

### 3. Configure Frontend Walrus Endpoints

Update your `.env.local`:
```
NEXT_PUBLIC_WALRUS_PUBLISHER_URL=https://publisher.walrus-testnet.walrus.space
NEXT_PUBLIC_WALRUS_AGGREGATOR_URL=https://aggregator.walrus-testnet.walrus.space
```

## Part 3: Deploy Frontend to Walrus Sites

### 1. Build Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create production build
npm run build

# Export static files
npm run build && npx next export
```

### 2. Deploy to Walrus Sites

```bash
# Deploy the out/ directory to Walrus Sites
walrus site deploy out/

# Save the site URL returned
# Example: https://abc123.walrus.site
```

### 3. Configure Custom Domain (Optional)

Follow [Walrus Sites domain configuration](https://docs.walrus.site/usage/web-publishing.html#custom-domains) to set up a custom domain.

## Part 4: Verify Deployment

### 1. Test Smart Contracts

```bash
# Create a test event
sui client call \
  --package YOUR_PACKAGE_ID \
  --module event \
  --function create_event \
  --args "Test Event" "Test Description" "Location" 1000000000 2000000000 100 1000000000 "walrus_blob_123" \
  --gas-budget 10000000
```

### 2. Test Frontend

1. Visit your Walrus Sites URL
2. Connect Sui Wallet
3. Try creating an event (as organizer)
4. Try browsing events (as attendee)

### 3. Test End-to-End Flow

1. **As Organizer:**
   - Connect wallet
   - Create event with test data
   - Upload event data to Walrus
   - Note the event object ID

2. **As Attendee:**
   - Connect wallet (different address)
   - Browse events
   - Purchase ticket
   - Verify NFT in wallet

3. **Verify Ticket:**
   - As organizer, verify the purchased ticket
   - Issue attendance NFT
   - Attendee should see attendance NFT in wallet

## Environment Configuration

### Frontend .env.local

```bash
# Sui Network
NEXT_PUBLIC_PACKAGE_ID=0xYOUR_PACKAGE_ID
NEXT_PUBLIC_NETWORK=testnet

# Walrus
NEXT_PUBLIC_WALRUS_PUBLISHER_URL=https://publisher.walrus-testnet.walrus.space
NEXT_PUBLIC_WALRUS_AGGREGATOR_URL=https://aggregator.walrus-testnet.walrus.space

# Site
NEXT_PUBLIC_SITE_URL=https://your-site.walrus.site
```

## Troubleshooting

### Contract Deployment Issues

**Problem:** Out of gas during deployment
- **Solution:** Increase gas budget: `--gas-budget 200000000`

**Problem:** Module already exists
- **Solution:** This is an upgrade. Use `sui client upgrade` instead

### Walrus Upload Issues

**Problem:** Upload timeout
- **Solution:** Try a smaller file or retry the upload

**Problem:** Can't retrieve data
- **Solution:** Verify aggregator URL and blob ID are correct

### Frontend Issues

**Problem:** Wallet not connecting
- **Solution:** Ensure Sui Wallet extension is installed and unlocked

**Problem:** Transaction fails
- **Solution:** Check you have enough SUI for gas fees

**Problem:** Events not loading
- **Solution:** Verify package ID is correct in .env.local

## Mainnet Deployment

When ready for production:

1. Switch to mainnet:
```bash
sui client switch --env mainnet
```

2. Get mainnet SUI tokens (not from faucet - purchase required)

3. Deploy contracts to mainnet following same steps

4. Update frontend environment to mainnet:
```bash
NEXT_PUBLIC_NETWORK=mainnet
NEXT_PUBLIC_WALRUS_PUBLISHER_URL=https://publisher.walrus.space
NEXT_PUBLIC_WALRUS_AGGREGATOR_URL=https://aggregator.walrus.space
```

5. Deploy frontend to production Walrus Sites

## Security Considerations

- Never commit `.env.local` or private keys
- Use hardware wallet for mainnet deployments
- Audit smart contracts before mainnet deployment
- Test thoroughly on testnet first
- Implement rate limiting on frontend
- Monitor contract events for suspicious activity

## Monitoring

- Monitor contract events on [Sui Explorer](https://suiexplorer.com)
- Track Walrus storage usage
- Monitor frontend analytics
- Set up alerts for failed transactions

## Support

- Sui Documentation: https://docs.sui.io
- Walrus Documentation: https://docs.walrus.site
- Sui Discord: https://discord.gg/sui
- GitHub Issues: Create issue in this repository
