'use client';

import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { useState } from 'react';
import Link from 'next/link';

export default function AttendeePage() {
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // Mock events data - in production, fetch from blockchain
  const mockEvents = [
    {
      id: '0x123',
      name: 'Tech Conference 2024',
      description: 'Annual technology conference with leading experts',
      location: 'San Francisco, CA',
      startTime: new Date('2024-06-15T09:00:00').toLocaleDateString(),
      ticketPrice: '1.5',
      ticketsAvailable: 50,
      totalSupply: 100
    },
    {
      id: '0x456',
      name: 'Web3 Summit',
      description: 'Exploring the future of decentralized web',
      location: 'New York, NY',
      startTime: new Date('2024-07-20T10:00:00').toLocaleDateString(),
      ticketPrice: '2.0',
      ticketsAvailable: 30,
      totalSupply: 75
    }
  ];

  const handlePurchaseTicket = async (eventId: string, price: string) => {
    if (!account) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const tx = new Transaction();
      
      // Split coins for payment
      const [coin] = tx.splitCoins(tx.gas, [
        tx.pure.u64(parseFloat(price) * 1000000000)
      ]);

      // Mock encrypted data - in production, use Seal encryption
      const encryptedData = new TextEncoder().encode('encrypted_ticket_data');
      
      tx.moveCall({
        target: `${process.env.NEXT_PUBLIC_PACKAGE_ID}::ticket::purchase_ticket`,
        arguments: [
          tx.object(eventId),
          coin,
          tx.pure.vector('u8', Array.from(encryptedData)),
          tx.object('0x6') // Clock object
        ],
      });

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: (result) => {
            console.log('Ticket purchased successfully:', result);
            alert('Ticket purchased successfully! Check your wallet for the NFT.');
          },
          onError: (error) => {
            console.error('Error purchasing ticket:', error);
            alert('Failed to purchase ticket');
          },
        }
      );
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-secondary">
            Ticketing Platform
          </Link>
          <div className="flex items-center gap-4">
            {account ? (
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-sm text-gray-600">Connected: </span>
                <span className="text-sm font-mono">{account.address.slice(0, 8)}...</span>
              </div>
            ) : (
              <button className="bg-secondary text-white px-4 py-2 rounded-lg">
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Events</h1>
          <p className="text-gray-600">Discover and purchase tickets for upcoming events</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Events List */}
          <div className="lg:col-span-2 space-y-4">
            {mockEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {event.name}
                    </h3>
                    <p className="text-gray-600 mb-3">{event.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <span className="mr-2">📍</span>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">📅</span>
                        <span>{event.startTime}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">🎫</span>
                        <span>{event.ticketsAvailable} / {event.totalSupply} available</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-6 text-right">
                    <div className="text-2xl font-bold text-secondary mb-2">
                      {event.ticketPrice} SUI
                    </div>
                    <button
                      onClick={() => handlePurchaseTicket(event.id, event.ticketPrice)}
                      disabled={!account || event.ticketsAvailable === 0}
                      className="bg-secondary text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {event.ticketsAvailable === 0 ? 'Sold Out' : 'Buy Ticket'}
                    </button>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <button
                    onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                    className="text-secondary hover:text-purple-800 text-sm font-medium"
                  >
                    {selectedEvent === event.id ? 'Hide Details ▲' : 'View Details ▼'}
                  </button>
                  
                  {selectedEvent === event.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Event Details</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Detailed event information is stored on Walrus decentralized storage.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Event ID:</strong> <code className="bg-gray-200 px-2 py-1 rounded">{event.id}</code>
                        </div>
                        <div>
                          <strong>Walrus Storage:</strong> <span className="text-green-600">✓ Available</span>
                        </div>
                        <div>
                          <strong>Encryption:</strong> <span className="text-green-600">✓ Seal Protected</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Tickets */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Your Tickets</h2>
              
              {account ? (
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-500 text-sm text-center">
                      No tickets yet. Purchase a ticket to get started!
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm text-center">
                  Connect wallet to view your tickets
                </p>
              )}
            </div>

            {/* Attendance NFTs */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Attendance NFTs</h2>
              
              {account ? (
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-500 text-sm text-center">
                      Receive attendance NFTs after checking in at events
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm text-center">
                  Connect wallet to view your attendance NFTs
                </p>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">🎫 How NFT Tickets Work</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Tickets are minted as NFTs on Sui blockchain</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Encrypted data protected by Seal technology</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Event details stored on Walrus</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Receive attendance NFT after check-in</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
