import { useState, type JSX, useEffect } from 'react';
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
import { MemberView } from './MemberView';
import { OnboardingView } from './OnboardingView';
import { env, CONTRACT_ADDRESS, network } from '@/utils';

export const Home: React.FC = () => {
  const { doContractCall } = useConnect();
  const [address, setAddress] = useState('');
  const [isMember, setIsMember] = useState(false);

  const getBalance = async () => {
    const result = await callReadOnlyFunction({
      network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: 'membership-token',
      functionName: 'get-balance',
      functionArgs: [standardPrincipalCV(CONTRACT_ADDRESS)],
      senderAddress: CONTRACT_ADDRESS
    });
    return cvToValue(result).value;
  };
  useEffect(() => {
    getBalance().then((balance) => {
      console.log('balance', balance);
      setIsMember(balance > 0);
    });
  }, []);

  return (
    <>
      <h2>DAO Town</h2>
      {address && <span>{truncateAddress(address)}</span>}
      <div className="h-60 sm:h-72 flex items-center justify-center">
        <div className="py-4">
          {isMember ? <MemberView /> : <OnboardingView />}
        </div>
      </div>
    </>
  );
};
