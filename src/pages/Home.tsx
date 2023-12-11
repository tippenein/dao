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
  standardPrincipalCV
} from '@stacks/transactions';

const env = 'devnet'; // TODO

export const network = new StacksDevnet();

const CONTRACT_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
export const Home: React.FC = () => {
  const { doContractCall } = useConnect();
  const [address, setAddress] = useState('');

  return (
    <>
      <h2>DAO</h2>
      {address && <span>{truncateAddress(address)}</span>}
      <div className="h-60 sm:h-72 flex items-center justify-center">
        <div className="py-4"></div>
      </div>
    </>
  );
};
