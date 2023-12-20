import { create } from 'zustand';

interface ProposalState {
  setProposals: (data: any) => void;
  proposals: any[];
  setStats: (data: any) => void;
  stats: any;
}

interface ProposalStats {
  totalProposed: number;
  totalConcluded: number;
}

export const defaultProposalStats: ProposalStats = {
  totalProposed: 0,
  totalConcluded: 0
};

export const useProposalStore = create<ProposalState>((set, get) => ({
  proposals: [],
  stats: defaultProposalStats,

  setProposals(proposals: any[]) {
    set((state: ProposalState) => ({
      ...state,
      proposals
    }));
  },
  setStats(newStats: ProposalStats) {
    set((state: ProposalState) => ({
      ...state,
      stats: newStats
    }));
  }
}));
