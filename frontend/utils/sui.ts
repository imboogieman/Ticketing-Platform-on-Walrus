/**
 * Sui contract interaction utilities
 */

import { Transaction } from '@mysten/sui/transactions';

const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || '0x0';

/**
 * Create a transaction to create a new event
 */
export function createEventTransaction(
  name: string,
  description: string,
  location: string,
  startTime: number,
  endTime: number,
  ticketSupply: number,
  ticketPrice: number,
  walrusBlobId: string
): Transaction {
  const tx = new Transaction();
  
  tx.moveCall({
    target: `${PACKAGE_ID}::event::create_event`,
    arguments: [
      tx.pure.string(name),
      tx.pure.string(description),
      tx.pure.string(location),
      tx.pure.u64(startTime),
      tx.pure.u64(endTime),
      tx.pure.u64(ticketSupply),
      tx.pure.u64(ticketPrice * 1_000_000_000), // Convert SUI to MIST
      tx.pure.string(walrusBlobId)
    ],
  });

  return tx;
}

/**
 * Create a transaction to purchase a ticket
 */
export function purchaseTicketTransaction(
  eventId: string,
  ticketPrice: number,
  encryptedData: Uint8Array
): Transaction {
  const tx = new Transaction();
  
  // Split coins for payment
  const [coin] = tx.splitCoins(tx.gas, [
    tx.pure.u64(ticketPrice * 1_000_000_000)
  ]);

  tx.moveCall({
    target: `${PACKAGE_ID}::ticket::purchase_ticket`,
    arguments: [
      tx.object(eventId),
      coin,
      tx.pure.vector('u8', Array.from(encryptedData)),
      tx.object('0x6') // Clock object
    ],
  });

  return tx;
}

/**
 * Create a transaction to verify a ticket
 */
export function verifyTicketTransaction(
  ticketId: string,
  eventId: string
): Transaction {
  const tx = new Transaction();
  
  tx.moveCall({
    target: `${PACKAGE_ID}::ticket::verify_ticket`,
    arguments: [
      tx.object(ticketId),
      tx.object(eventId)
    ],
  });

  return tx;
}

/**
 * Create a transaction to issue an attendance NFT
 */
export function issueAttendanceNFTTransaction(
  eventId: string,
  ticketId: string,
  metadata: string,
  eventName: string
): Transaction {
  const tx = new Transaction();
  
  tx.moveCall({
    target: `${PACKAGE_ID}::attendance::issue_attendance_nft`,
    arguments: [
      tx.object(eventId),
      tx.object(ticketId),
      tx.pure.string(metadata),
      tx.pure.string(eventName),
      tx.object('0x6') // Clock object
    ],
  });

  return tx;
}

/**
 * Create a transaction to update event status
 */
export function updateEventStatusTransaction(
  eventId: string,
  isActive: boolean
): Transaction {
  const tx = new Transaction();
  
  tx.moveCall({
    target: `${PACKAGE_ID}::event::update_event_status`,
    arguments: [
      tx.object(eventId),
      tx.pure.bool(isActive)
    ],
  });

  return tx;
}

/**
 * Create a transaction to withdraw event proceeds
 */
export function withdrawProceedsTransaction(eventId: string): Transaction {
  const tx = new Transaction();
  
  tx.moveCall({
    target: `${PACKAGE_ID}::event::withdraw_proceeds`,
    arguments: [tx.object(eventId)],
  });

  return tx;
}

/**
 * Format SUI amount from MIST
 */
export function formatSuiAmount(mist: number | bigint): string {
  const sui = Number(mist) / 1_000_000_000;
  return sui.toFixed(2);
}

/**
 * Parse SUI amount to MIST
 */
export function parseSuiAmount(sui: number | string): bigint {
  const amount = typeof sui === 'string' ? parseFloat(sui) : sui;
  return BigInt(Math.floor(amount * 1_000_000_000));
}

/**
 * Truncate address for display
 */
export function truncateAddress(address: string, length: number = 8): string {
  if (address.length <= length * 2) return address;
  return `${address.slice(0, length)}...${address.slice(-length)}`;
}

/**
 * Format timestamp to readable date
 */
export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
