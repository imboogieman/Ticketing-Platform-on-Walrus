interface EventCardProps {
  name: string;
  description: string;
  location: string;
  startTime: string;
  ticketPrice: string;
  ticketsAvailable: number;
  totalSupply: number;
  onPurchase?: () => void;
  onViewDetails?: () => void;
}

export function EventCard({
  name,
  description,
  location,
  startTime,
  ticketPrice,
  ticketsAvailable,
  totalSupply,
  onPurchase,
  onViewDetails,
}: EventCardProps) {
  const soldOut = ticketsAvailable === 0;
  const percentageSold = ((totalSupply - ticketsAvailable) / totalSupply) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
          <p className="text-gray-600 mb-3 line-clamp-2">{description}</p>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="mr-2">📍</span>
              <span>{location}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">📅</span>
              <span>{startTime}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">🎫</span>
              <span>
                {ticketsAvailable} / {totalSupply} available
                {soldOut && <span className="ml-2 text-red-600 font-semibold">SOLD OUT</span>}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  soldOut ? 'bg-red-500' : percentageSold > 80 ? 'bg-orange-500' : 'bg-green-500'
                }`}
                style={{ width: `${percentageSold}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="ml-6 text-right flex flex-col gap-2">
          <div className="text-2xl font-bold text-secondary">{ticketPrice} SUI</div>
          
          {onPurchase && (
            <button
              onClick={onPurchase}
              disabled={soldOut}
              className="bg-secondary text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {soldOut ? 'Sold Out' : 'Buy Ticket'}
            </button>
          )}
          
          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className="text-secondary hover:text-purple-800 text-sm font-medium underline"
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
