import { useState, type JSX } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '@/components/ui/input';
import { truncateAddress } from '@/lib/utils';
import { useConnect } from '@stacks/connect-react';
import {
  StacksDevnet,
  StacksMocknet,
  StacksMainnet,
  StacksTestnet
} from '@stacks/network';
import { AnchorMode, cvToValue } from '@stacks/transactions';
import {
  callReadOnlyFunction,
  standardPrincipalCV,
  uintCV
} from '@stacks/transactions';
import { env, CONTRACT_ADDRESS, network } from '@/utils';

export const OnboardingView: React.FC = () => {
  const [amount, setAmount] = useState(1);
  const { doContractCall } = useConnect();
  const buyMembership = async (amount: number) => {
    await doContractCall({
      network: network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: 'membership-token',
      functionName: 'mint',
      functionArgs: [uintCV(1), standardPrincipalCV(CONTRACT_ADDRESS)]
    });
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    buyMembership(amount);
  };
  return (
    <div>
      <h2 className="text-4xl font-bold">onboarding</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </label>
        <input
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
          value="Buy membership"
        />
      </form>
    </div>
  );
};
