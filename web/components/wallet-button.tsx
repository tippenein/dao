import { UserData } from '@stacks/connect';
import React from 'react';

interface WalletButtonProps {
  userData: UserData | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

const WalletButton: React.FC<WalletButtonProps> = ({
  userData,
  connectWallet,
  disconnectWallet
}) => {
  return !userData ? (
    <button
      style={{ width: '100%' }}
      className="p-4 bg-indigo-500 hover:bg-indigo-700 text-white"
      onClick={connectWallet}
    >
      Connect wallet
    </button>
  ) : (
    <button
      style={{ width: '100%' }}
      className="p-4 bg-indigo-500 hover:bg-indigo-700 text-white"
      onClick={disconnectWallet}
    >
      Disconnect wallet
    </button>
  );
};

export default WalletButton;
