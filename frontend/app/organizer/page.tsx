'use client';

import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { useState } from 'react';
import Link from 'next/link';

import { PACKAGE_ID } from '@/utils/constants';

export default function OrganizerDashboard() {
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  
  const [eventForm, setEventForm] = useState({
    name: '',
    description: '',
    location: '',
    startTime: '',
    endTime: '',
    ticketSupply: '',
    ticketPrice: '',
    walrusBlobId: ''
  });

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!account) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const tx = new Transaction();
      
      // Convert dates to timestamps
      const startTimestamp = new Date(eventForm.startTime).getTime();
      const endTimestamp = new Date(eventForm.endTime).getTime();
      
      // Convert strings to byte vectors for Move
      const nameBytes = Array.from(new TextEncoder().encode(eventForm.name));
      const descriptionBytes = Array.from(new TextEncoder().encode(eventForm.description));
      const locationBytes = Array.from(new TextEncoder().encode(eventForm.location));
      const walrusBlobIdBytes = Array.from(new TextEncoder().encode(eventForm.walrusBlobId));
      
      tx.moveCall({
        target: `${PACKAGE_ID}::event::create_event`,
        arguments: [
          tx.pure(nameBytes),
          tx.pure(descriptionBytes),
          tx.pure(locationBytes),
          tx.pure.u64(startTimestamp),
          tx.pure.u64(endTimestamp),
          tx.pure.u64(parseInt(eventForm.ticketSupply)),
          tx.pure.u64(parseFloat(eventForm.ticketPrice) * 1000000000), // Convert to MIST
          tx.pure(walrusBlobIdBytes)
        ],
      });

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: (result) => {
            console.log('Event created successfully:', result);
            alert('Event created successfully!');
            // Reset form
            setEventForm({
              name: '',
              description: '',
              location: '',
              startTime: '',
              endTime: '',
              ticketSupply: '',
              ticketPrice: '',
              walrusBlobId: ''
            });
          },
          onError: (error) => {
            console.error('Error creating event:', error);
            alert('Failed to create event');
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
          <Link href="/" className="text-2xl font-bold text-primary">
            Ticketing Platform
          </Link>
          <div className="flex items-center gap-4">
            {account ? (
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-sm text-gray-600">Connected: </span>
                <span className="text-sm font-mono">{account.address.slice(0, 8)}...</span>
              </div>
            ) : (
              <button className="bg-primary text-white px-4 py-2 rounded-lg">
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Organizer Dashboard</h1>
          <p className="text-gray-600">Create and manage your events</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Create Event Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Create New Event</h2>
            
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Name
                </label>
                <input
                  type="text"
                  required
                  value={eventForm.name}
                  onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Tech Conference 2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  required
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={3}
                  placeholder="Event description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="San Francisco, CA"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={eventForm.startTime}
                    onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={eventForm.endTime}
                    onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ticket Supply
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={eventForm.ticketSupply}
                    onChange={(e) => setEventForm({ ...eventForm, ticketSupply: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ticket Price (SUI)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={eventForm.ticketPrice}
                    onChange={(e) => setEventForm({ ...eventForm, ticketPrice: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="1.0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Walrus Blob ID
                </label>
                <input
                  type="text"
                  required
                  value={eventForm.walrusBlobId}
                  onChange={(e) => setEventForm({ ...eventForm, walrusBlobId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="walrus_blob_id_here"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Upload event assets to Walrus and enter the blob ID
                </p>
              </div>

              <button
                type="submit"
                disabled={!account}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {account ? 'Create Event' : 'Connect Wallet to Create'}
              </button>
            </form>
          </div>

          {/* Event Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Your Events</h2>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-gray-500 text-center py-8">
                  No events created yet. Create your first event to get started!
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Walrus Integration</h3>
              <p className="text-sm text-blue-800 mb-3">
                Upload your event assets (images, descriptions, etc.) to Walrus for decentralized storage.
              </p>
              <a
                href="https://docs.walrus.site"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Learn more about Walrus →
              </a>
            </div>

            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Seal Encryption</h3>
              <p className="text-sm text-purple-800 mb-3">
                Ticket data is encrypted using Seal to protect sensitive information.
              </p>
              <a
                href="https://docs.mystenlabs.com/seal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-600 hover:text-purple-800 underline"
              >
                Learn more about Seal →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
