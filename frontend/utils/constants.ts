/**
 * Constants for the ticketing platform
 */

// Network configuration
export const NETWORK = process.env.NEXT_PUBLIC_NETWORK || 'testnet';

// Contract addresses
export const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || '0x0';

// Sui constants
export const SUI_DECIMALS = 9;
export const MIST_PER_SUI = 1_000_000_000;

// Walrus configuration
export const WALRUS_PUBLISHER_URL = 
  process.env.NEXT_PUBLIC_WALRUS_PUBLISHER_URL || 
  'https://publisher.walrus-testnet.walrus.space';

export const WALRUS_AGGREGATOR_URL = 
  process.env.NEXT_PUBLIC_WALRUS_AGGREGATOR_URL || 
  'https://aggregator.walrus-testnet.walrus.space';

// Clock object ID (constant on Sui)
export const CLOCK_OBJECT_ID = '0x6';

// Transaction configuration
export const DEFAULT_GAS_BUDGET = 10_000_000; // 0.01 SUI

// UI constants
export const MAX_EVENT_NAME_LENGTH = 100;
export const MAX_EVENT_DESCRIPTION_LENGTH = 1000;
export const MAX_TICKET_SUPPLY = 10000;
export const MIN_TICKET_PRICE = 0.01; // SUI

// Time constants
export const MILLISECONDS_PER_SECOND = 1000;
export const SECONDS_PER_MINUTE = 60;
export const MINUTES_PER_HOUR = 60;
export const HOURS_PER_DAY = 24;

// Error messages
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet first',
  INSUFFICIENT_FUNDS: 'Insufficient funds for this transaction',
  EVENT_SOLD_OUT: 'This event is sold out',
  EVENT_ENDED: 'This event has ended',
  INVALID_TICKET_PRICE: 'Invalid ticket price',
  INVALID_TICKET_SUPPLY: 'Invalid ticket supply',
  TRANSACTION_FAILED: 'Transaction failed. Please try again.',
  WALRUS_UPLOAD_FAILED: 'Failed to upload to Walrus',
  WALRUS_RETRIEVE_FAILED: 'Failed to retrieve from Walrus',
  NOT_AUTHORIZED: 'You are not authorized to perform this action',
  TICKET_ALREADY_USED: 'This ticket has already been used',
  INVALID_DATE_RANGE: 'End time must be after start time',
};

// Success messages
export const SUCCESS_MESSAGES = {
  EVENT_CREATED: 'Event created successfully!',
  TICKET_PURCHASED: 'Ticket purchased successfully!',
  TICKET_VERIFIED: 'Ticket verified successfully!',
  ATTENDANCE_NFT_ISSUED: 'Attendance NFT issued successfully!',
  PROCEEDS_WITHDRAWN: 'Proceeds withdrawn successfully!',
  WALRUS_UPLOAD_SUCCESS: 'Data uploaded to Walrus successfully!',
};

// Sui Explorer URLs
export const EXPLORER_URLS = {
  testnet: 'https://suiexplorer.com/?network=testnet',
  mainnet: 'https://suiexplorer.com',
};

export const getExplorerUrl = (objectId: string): string => {
  const baseUrl = NETWORK === 'mainnet' 
    ? EXPLORER_URLS.mainnet 
    : EXPLORER_URLS.testnet;
  return `${baseUrl}/object/${objectId}`;
};

export const getTransactionUrl = (digest: string): string => {
  const baseUrl = NETWORK === 'mainnet' 
    ? EXPLORER_URLS.mainnet 
    : EXPLORER_URLS.testnet;
  return `${baseUrl}/txblock/${digest}`;
};

// Regex patterns
export const PATTERNS = {
  SUI_ADDRESS: /^0x[a-fA-F0-9]{64}$/,
  WALRUS_BLOB_ID: /^[a-zA-Z0-9_-]+$/,
};

// Local storage keys
export const STORAGE_KEYS = {
  RECENT_EVENTS: 'ticketing_platform_recent_events',
  USER_TICKETS: 'ticketing_platform_user_tickets',
  PREFERENCES: 'ticketing_platform_preferences',
};

// Feature flags
export const FEATURES = {
  ZKLOGIN_ENABLED: false, // TODO: Enable when zkLogin is fully implemented
  SECONDARY_MARKET: false, // TODO: Enable for marketplace feature
  DYNAMIC_PRICING: false, // TODO: Enable for dynamic pricing
  REFUNDS: false, // TODO: Enable refund mechanism
};
