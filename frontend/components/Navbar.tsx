import Link from 'next/link';
import { WalletConnect } from './WalletConnect';

interface NavbarProps {
  title?: string;
}

export function Navbar({ title = 'Ticketing Platform' }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary hover:text-indigo-700 transition-colors">
          {title}
        </Link>
        
        <div className="flex items-center gap-4">
          <Link href="/organizer" className="text-gray-600 hover:text-primary transition-colors">
            Organizer
          </Link>
          <Link href="/attendee" className="text-gray-600 hover:text-primary transition-colors">
            Browse Events
          </Link>
          <WalletConnect />
        </div>
      </div>
    </nav>
  );
}
