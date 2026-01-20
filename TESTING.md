# Testing Guide

This guide covers testing the Ticketing Platform smart contracts and frontend.

## Smart Contract Testing

### Prerequisites

- Sui CLI installed
- Project dependencies available

### Running Tests

```bash
cd move/ticketing_platform
sui move test
```

### Test Coverage

The test suite covers:

1. **Event Creation**
   - Creating events with valid parameters
   - Validating event metadata
   - Testing organizer permissions

2. **Ticket Purchasing**
   - Purchasing tickets with correct payment
   - Verifying ticket NFT minting
   - Testing ticket number assignment
   - Validating ticket supply limits

3. **Ticket Verification**
   - Marking tickets as used
   - Preventing duplicate usage
   - Organizer-only verification

4. **Attendance NFTs**
   - Issuing attendance NFTs after verification
   - Validating attendee addresses
   - Testing metadata assignment

### Writing Additional Tests

Add new tests in `move/ticketing_platform/tests/ticketing_platform_tests.move`:

```move
#[test]
fun test_your_feature() {
    let organizer = @0xA;
    let mut scenario = test_scenario::begin(organizer);
    
    // Your test logic here
    
    test_scenario::end(scenario);
}
```

## Frontend Testing

### Manual Testing Checklist

#### Wallet Connection
- [ ] Connect Sui Wallet successfully
- [ ] Display correct address after connection
- [ ] Handle wallet disconnection
- [ ] Test zkLogin authentication (if implemented)

#### Organizer Dashboard
- [ ] Create event with all fields
- [ ] Validate form inputs
- [ ] Upload data to Walrus
- [ ] Submit transaction successfully
- [ ] Display created events
- [ ] Update event status
- [ ] Withdraw proceeds

#### Attendee Interface
- [ ] Browse available events
- [ ] View event details from Walrus
- [ ] Purchase ticket successfully
- [ ] View owned tickets
- [ ] Display attendance NFTs

#### Edge Cases
- [ ] Handle insufficient funds
- [ ] Handle sold out events
- [ ] Handle expired events
- [ ] Handle network errors
- [ ] Handle Walrus upload failures

### End-to-End Testing

#### Scenario 1: Complete Event Lifecycle

1. **Setup**
   - Create two wallets (organizer and attendee)
   - Fund both with testnet SUI

2. **Event Creation**
   ```
   As Organizer:
   - Connect wallet
   - Navigate to organizer dashboard
   - Fill event form:
     * Name: "Test Conference"
     * Description: "A test event"
     * Location: "Virtual"
     * Start: Future date
     * End: Future date + 1 day
     * Supply: 10
     * Price: 0.5 SUI
     * Walrus ID: "test_blob_123"
   - Submit transaction
   - Verify event creation on-chain
   ```

3. **Ticket Purchase**
   ```
   As Attendee:
   - Connect different wallet
   - Browse events
   - Find created event
   - Click "Buy Ticket"
   - Approve transaction
   - Verify ticket NFT in wallet
   - Check tickets sold counter updated
   ```

4. **Verification & Attendance**
   ```
   As Organizer:
   - Verify attendee's ticket
   - Mark as used
   - Issue attendance NFT
   
   As Attendee:
   - Verify attendance NFT received
   - Check NFT metadata
   ```

5. **Proceeds Withdrawal**
   ```
   As Organizer:
   - View event balance
   - Withdraw proceeds
   - Verify SUI received
   ```

#### Scenario 2: Sold Out Event

1. Create event with supply = 1
2. Purchase ticket as attendee
3. Try to purchase again (should fail)
4. Verify "Sold Out" displayed

#### Scenario 3: Multiple Tickets

1. Create event with supply = 5
2. Purchase tickets from 3 different wallets
3. Verify each ticket has unique number
4. Verify tickets sold = 3

### Performance Testing

#### Load Testing Considerations

1. **Multiple Events**: Create 10+ events, verify UI performance
2. **Large Ticket Supply**: Create event with 1000+ tickets
3. **Walrus Storage**: Upload various file sizes
4. **Concurrent Purchases**: Test race conditions

### Integration Testing

#### Walrus Integration
```bash
# Test Walrus upload
cd frontend
npm run dev

# Upload test data
const testData = {
  name: "Test Event",
  description: "Testing Walrus integration"
};

const blobId = await uploadToWalrus(testData);
console.log("Blob ID:", blobId);

# Retrieve data
const retrieved = await retrieveFromWalrus(blobId);
console.log("Retrieved:", retrieved);
```

#### Seal Encryption
```typescript
// Test encryption/decryption
const ticketData = {
  ticketId: "123",
  eventId: "456",
  owner: "0xABC",
  accessCode: "SECRET123"
};

const encrypted = await encryptTicketData(ticketData);
const decrypted = await decryptTicketData(encrypted);

console.assert(
  JSON.stringify(ticketData) === JSON.stringify(decrypted),
  "Encryption/decryption failed"
);
```

## Automated Testing (Future)

### Unit Tests (Jest + React Testing Library)

```typescript
// Example test structure
describe('EventCard', () => {
  it('displays event information correctly', () => {
    render(<EventCard {...mockEvent} />);
    expect(screen.getByText('Test Event')).toBeInTheDocument();
  });

  it('disables purchase button when sold out', () => {
    render(<EventCard {...soldOutEvent} />);
    expect(screen.getByText('Sold Out')).toBeDisabled();
  });
});
```

### Integration Tests (Playwright)

```typescript
// Example integration test
test('complete ticket purchase flow', async ({ page }) => {
  await page.goto('/attendee');
  await page.click('text=Connect Wallet');
  await page.click('text=Buy Ticket');
  await page.waitForSelector('text=Ticket purchased successfully');
  
  // Verify ticket in wallet
  await page.goto('/tickets');
  expect(await page.textContent('.ticket-count')).toBe('1');
});
```

## Debugging

### Common Issues

#### Transaction Failures
```typescript
// Add detailed logging
try {
  await signAndExecute({ transaction: tx });
} catch (error) {
  console.error('Transaction failed:', error);
  console.log('Transaction details:', tx);
  console.log('Signer:', account?.address);
}
```

#### Walrus Upload Issues
```typescript
// Verify Walrus endpoints
console.log('Publisher URL:', WALRUS_PUBLISHER_URL);
console.log('Aggregator URL:', WALRUS_AGGREGATOR_URL);

// Test connectivity
fetch(WALRUS_PUBLISHER_URL)
  .then(res => console.log('Walrus status:', res.status))
  .catch(err => console.error('Walrus error:', err));
```

#### Contract Interaction Issues
```typescript
// Verify package ID
console.log('Package ID:', process.env.NEXT_PUBLIC_PACKAGE_ID);

// Check transaction structure
console.log('Transaction:', JSON.stringify(tx, null, 2));
```

### Sui Explorer

View all transactions and objects on [Sui Explorer](https://suiexplorer.com):

1. Search by package ID
2. View event objects
3. Check ticket NFTs
4. Verify attendance NFTs
5. Monitor gas usage

### Browser DevTools

- Check console for errors
- Monitor network requests
- Inspect wallet connections
- Debug React components

## Test Data

### Sample Events

```typescript
const sampleEvents = [
  {
    name: "Tech Conference 2024",
    description: "Annual technology conference",
    location: "San Francisco, CA",
    startTime: new Date("2024-06-15T09:00:00"),
    endTime: new Date("2024-06-15T18:00:00"),
    supply: 100,
    price: 1.5
  },
  {
    name: "Web3 Workshop",
    description: "Learn about blockchain development",
    location: "Virtual",
    startTime: new Date("2024-07-01T14:00:00"),
    endTime: new Date("2024-07-01T17:00:00"),
    supply: 50,
    price: 0.5
  }
];
```

## Continuous Integration

### GitHub Actions (Future)

```yaml
name: Test

on: [push, pull_request]

jobs:
  test-contracts:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install Sui
        run: |
          curl -fsSL https://sui.io/install.sh | sh
      - name: Run tests
        run: |
          cd move/ticketing_platform
          sui move test

  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          cd frontend
          npm install
      - name: Run tests
        run: |
          cd frontend
          npm test
```

## Reporting Issues

When reporting bugs, include:

1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Transaction digest (if applicable)
5. Browser console errors
6. Screenshots
7. Environment (testnet/mainnet)

## Best Practices

1. **Test on testnet first**: Always test thoroughly on testnet before mainnet
2. **Use small amounts**: Test with minimal SUI amounts
3. **Save transaction digests**: Keep records of test transactions
4. **Document edge cases**: Note any unusual behavior
5. **Test error handling**: Intentionally trigger errors to verify handling
6. **Cross-browser testing**: Test on Chrome, Firefox, Safari
7. **Mobile testing**: Test responsive design on mobile devices

## Security Testing

1. **Access Control**: Verify only organizers can verify tickets
2. **Payment Validation**: Ensure correct payment amounts
3. **Double-spending**: Test ticket reuse prevention
4. **Encryption**: Verify sensitive data encryption
5. **Input Validation**: Test with malformed inputs

---

Happy Testing! 🧪
