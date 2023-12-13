import { useState, type JSX, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '@/components/ui/input';
import { truncateAddress } from '@/lib/utils';
import { UserSession, openContractCall, useConnect } from '@stacks/connect-react';
import { env, CONTRACT_ADDRESS, network } from '@/utils';
import {
  callReadOnlyFunction,
  standardPrincipalCV,
  cvToValue,
  uintCV,
  PrincipalCV
} from '@stacks/transactions';
import { Divider } from '@/components/ui/divider';
import { Membership } from '@/data/Membership';

export const MemberView: React.FC<{ address: PrincipalCV }> = ({ address }) => {
  const [amount, setAmount] = useState(1);
  const [recipient, setRecipient] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { doContractCall } = useConnect();

  const membershipActions = new Membership(address, doContractCall)
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
    membershipActions.transfer(amount, standardPrincipalCV(address))
    setIsModalOpen(false);
  };
  const onProposeClick = () => {
    console.log('proposal');
  };
  return (
    <>
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleTransfer} className="space-y-4">
              <label className="block">
                <span className="text-gray-700">Recipient:</span>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </label>
              <div className="flex justify-end">
                <input
                  type="submit"
                  value="Submit"
                  className="px-4 py-2 text-white bg-indigo-500 rounded hover:bg-indigo-700"
                />
              </div>
            </form>
          </div>
        </div>
      )}
      <div className=" py-8">
        <h2 className="font-bold">Proposals</h2>
        <div className="py-2">
          <Button onClick={onProposeClick}>
            <span>Propose</span>
          </Button>
        </div>
        <Divider/>
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
              onClick={() => setIsModalOpen(true)}
            >
              Transfer
            </Button>
          </div>
        </div>

      </div>
    </>
  );
};
