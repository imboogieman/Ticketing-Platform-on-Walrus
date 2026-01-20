import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Ticketing Platform on Walrus
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Decentralized event ticketing powered by Sui, Walrus, and Seal. 
            Secure, verifiable, and transparent.
          </p>
        </header>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🎫</div>
            <h3 className="text-lg font-semibold mb-2">NFT Tickets</h3>
            <p className="text-gray-600">
              Verifiable NFT-based tickets with on-chain ownership
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🔐</div>
            <h3 className="text-lg font-semibold mb-2">Encrypted Data</h3>
            <p className="text-gray-600">
              Secure ticket encryption using Seal technology
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🌐</div>
            <h3 className="text-lg font-semibold mb-2">Walrus Storage</h3>
            <p className="text-gray-600">
              Decentralized storage for event details and assets
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🏆</div>
            <h3 className="text-lg font-semibold mb-2">Attendance NFTs</h3>
            <p className="text-gray-600">
              Proof-of-presence rewards for verified attendees
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/organizer"
            className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg w-full sm:w-auto text-center"
          >
            Organizer Dashboard
          </Link>
          
          <Link
            href="/attendee"
            className="bg-secondary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-800 transition-colors shadow-lg w-full sm:w-auto text-center"
          >
            Browse Events
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* For Organizers */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-primary">For Event Organizers</h3>
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                  <div>
                    <strong>Connect Wallet</strong>
                    <p className="text-gray-600">Use Sui Wallet or zkLogin for authentication</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                  <div>
                    <strong>Create Event</strong>
                    <p className="text-gray-600">Set up event details, pricing, and ticket supply</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                  <div>
                    <strong>Upload to Walrus</strong>
                    <p className="text-gray-600">Store event assets on decentralized storage</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                  <div>
                    <strong>Verify Attendees</strong>
                    <p className="text-gray-600">Check-in attendees and issue attendance NFTs</p>
                  </div>
                </li>
              </ol>
            </div>

            {/* For Attendees */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-secondary">For Attendees</h3>
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                  <div>
                    <strong>Connect Wallet</strong>
                    <p className="text-gray-600">Use Sui Wallet or zkLogin to access platform</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                  <div>
                    <strong>Browse Events</strong>
                    <p className="text-gray-600">Discover upcoming events and view details</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                  <div>
                    <strong>Purchase Ticket</strong>
                    <p className="text-gray-600">Mint NFT ticket and receive encrypted data</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                  <div>
                    <strong>Receive Rewards</strong>
                    <p className="text-gray-600">Get attendance NFT for proof-of-presence</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
