/**
 * Type definitions for the ticketing platform
 */

export interface Event {
  id: string;
  organizer: string;
  name: string;
  description: string;
  location: string;
  startTime: number;
  endTime: number;
  ticketSupply: number;
  ticketsSold: number;
  ticketPrice: number;
  walrusBlobId: string;
  isActive: boolean;
}

export interface Ticket {
  id: string;
  eventId: string;
  owner: string;
  ticketNumber: number;
  purchaseTime: number;
  isUsed: boolean;
  encryptedData: Uint8Array;
}

export interface AttendanceNFT {
  id: string;
  eventId: string;
  attendee: string;
  checkInTime: number;
  metadata: string;
  eventName: string;
}

export interface CreateEventForm {
  name: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  ticketSupply: string;
  ticketPrice: string;
  walrusBlobId: string;
}

export interface EventDetailsFromWalrus {
  name: string;
  description: string;
  location: string;
  imageUrl?: string;
  additionalInfo?: Record<string, any>;
}

export interface TransactionResult {
  digest: string;
  effects: {
    status: {
      status: 'success' | 'failure';
      error?: string;
    };
  };
}
