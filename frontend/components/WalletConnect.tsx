'use client';

import { ConnectButton } from '@mysten/dapp-kit';

export function WalletConnect() {
  return (
    <ConnectButton
      connectText="Connect Wallet"
      connectedText="Connected"
      className="!bg-primary !text-white !px-4 !py-2 !rounded-lg !font-semibold hover:!bg-indigo-700"
    />
  );
}
