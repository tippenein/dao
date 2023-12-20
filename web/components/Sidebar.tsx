import React from 'react';
import { InfoBar } from '@/components/InfoBar';
import ProposalStats from '@/components/ProposalStats';
import { useSTXAddress } from '@/common/use-stx-address';
import { standardPrincipalCV } from '@stacks/transactions';

export const Sidebar: React.FC = () => {
  const address = useSTXAddress();
  const principal = standardPrincipalCV(address);

  return (
    <div className="w-64 bg-gray-200 p-4">
      <InfoBar address={principal} />
      <ProposalStats />
    </div>
  );
};
