import { UserData } from '@stacks/connect';
import React from 'react';

interface WalletButtonProps {
  userData: UserData | undefined;
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
      className="p-4 bg-indigo-500 rounded text-white"
      onClick={connectWallet}
    >
      Connect wallet
    </button>
  ) : (
    <button
      className="p-4 bg-indigo-500 rounded text-white"
      onClick={disconnectWallet}
    >
      Disconnect wallet
    </button>
  );
};

export default WalletButton;
