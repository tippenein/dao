import { useState, type JSX } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '@/components/ui/input';
import { truncateAddress } from '@/lib/utils';
import { useConnect } from '@stacks/connect-react';
import { env, CONTRACT_ADDRESS, network } from '@/utils';
import {
  callReadOnlyFunction,
  standardPrincipalCV,
  cvToValue,
  uintCV
} from '@stacks/transactions';

export const MemberView: React.FC = () => {
  const [amount, setAmount] = useState(1);
  const { doContractCall } = useConnect();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    buyMembership(amount);
  };
  const buyMembership = async (amount: number) => {
    await doContractCall({
      network: network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: 'membership-token',
      functionName: 'mint',
      functionArgs: [uintCV(1), standardPrincipalCV(CONTRACT_ADDRESS)]
    });
  };

  const onProposeClick = () => {
    console.log('proposal');
  };
  return (
    <div>
      <Button onClick={onProposeClick}>
        <span>Propose</span>
      </Button>
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
