import { useState, type JSX, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '@/components/ui/input';
import { useConnect } from '@stacks/connect-react';
import { env, CONTRACT_ADDRESS, network } from '@/utils';
import { standardPrincipalCV, PrincipalCV } from '@stacks/transactions';
import { Divider } from '@/components/ui/divider';
import { Membership } from '@/data/Membership';
import { Proposal } from '@/data/Proposal';
import axios from 'axios';
import StatsView from '@/components/ProposalStats';
import { useProposalStore } from '@/store/proposalStore';

export const MemberView: React.FC<{ address: PrincipalCV }> = ({ address }) => {
  const { setProposals, setStats } = useProposalStore();

  const [amount, setAmount] = useState(1);
  const [recipient, setRecipient] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const { doContractCall } = useConnect();

  useEffect(() => {
    // Fetch proposals
    console.log('fetching');
    axios
      .get('http://localhost:3000/api/proposals')
      .then((response) => {
        setProposals(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching proposals:', error);
      });

    // Fetch stats
    axios
      .get('http://localhost:3000/api/proposals/stats')
      .then((response) => {
        console.log(response.data.data.data);
        setStats(response.data.data.data);
      })
      .catch((error) => {
        console.error('Error fetching stats:', error);
      });
  }, []);
  const membershipActions = new Membership(address, doContractCall);
  const proposalActions = new Proposal(address, doContractCall);
  const handleMint = (event: React.FormEvent) => {
    event.preventDefault();
    membershipActions.mint(amount);
  };
  const handleBurn = (event: React.FormEvent) => {
    event.preventDefault();
    membershipActions.burn(amount);
  };
  const handleTransfer = async (event: React.FormEvent, recipient: string) => {
    event.preventDefault();
    membershipActions.transfer(amount, standardPrincipalCV(recipient));
    setIsTransferModalOpen(false);
  };
  const handlePropose = async (
    event: React.FormEvent,
    title: string,
    description: string
  ) => {
    event.preventDefault();
    proposalActions.submit(title, description);
    setIsProposalModalOpen(false);
  };
  const handleHello = (event: React.FormEvent) => {
    event.preventDefault();
    doContractCall({
      network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: 'hello',
      functionName: 'hello',
      functionArgs: []
    });
  };
  return (
    <>
      <Button
        onClick={handleHello}
        value="Hello"
        className="px-4 py-2 text-white bg-indigo-500 rounded hover:bg-indigo-700"
      >
        Hello
      </Button>
      {isProposalModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={() => setIsProposalModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <label className="block">
              <span className="font-bold text-gray-700">Title</span>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <span className="font-bold text-gray-700">Description</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm h-20 overflow-auto resize-none"
                rows={6}
              />
            </label>
            <Divider />
            <div className="flex justify-end">
              <Button
                onClick={handlePropose}
                value="Propose"
                className="px-4 py-2 text-white bg-indigo-500 rounded hover:bg-indigo-700"
              >
                Submit proposal
              </Button>
            </div>
          </div>
        </div>
      )}
      {isTransferModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={() => setIsTransferModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <label className="block">
              <span className="font-bold text-gray-700">Recipient</span>
              <Input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </label>
            <Divider />
            <div className="flex justify-end">
              <Button
                onClick={handleTransfer}
                value="Transfer"
                className="px-4 py-2 text-white bg-indigo-500 rounded hover:bg-indigo-700"
              >
                Transfer
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className=" py-8">
        <h2 className="font-bold">Proposals</h2>
        <StatsView />
        <div className="py-2">
          <Button onClick={() => setIsProposalModalOpen(true)}>
            <span>Start Proposal</span>
          </Button>
        </div>
        <Divider />
        <h2 className="font-bold">Supply</h2>
        <div className="py-2">
          <label>
            Amount:
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </label>
          <div className="actions py-2">
            <Button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              onClick={handleMint}
              value="Mint new"
            >
              Mint
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              onClick={handleBurn}
              value="Mint new"
            >
              Burn
            </Button>
            <Button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsTransferModalOpen(true)}
            >
              Transfer
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
