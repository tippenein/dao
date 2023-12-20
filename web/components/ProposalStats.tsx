import React from 'react';
import { useProposalStore } from '@/store/proposalStore';

const StatsView: React.FC = () => {
  const stats = useProposalStore.getState().stats;

  return (
    <div>
      <p>Total proposals: {stats?.totalProposed}</p>
      <p>Total disbursements: {stats?.totalConcluded}</p>
    </div>
  );
};

export default StatsView;
