import { useState, type JSX, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '@/components/ui/input';
import { truncateAddress } from '@/lib/utils';
import { UserSession, useConnect } from '@stacks/connect-react';
import {
  StacksDevnet,
  StacksMocknet,
  StacksMainnet,
  StacksTestnet
} from '@stacks/network';
import {
  AnchorMode,
  contractPrincipalCV,
  cvToValue
} from '@stacks/transactions';
import {
  callReadOnlyFunction,
  standardPrincipalCV,
  uintCV
} from '@stacks/transactions';
import { MemberView } from './MemberView';
import { OnboardingView } from './OnboardingView';
import { env, CONTRACT_ADDRESS, network } from '@/utils';
import { InfoBar } from '@/components/InfoBar';

export const Home: React.FC<{ userSession: UserSession }> = ({
  userSession
}) => {
  const { doContractCall } = useConnect();
  const [address, setAddress] = useState('');
  const [totalSupply, setTotalSupply] = useState(null);
  const [isMember, setIsMember] = useState(false);

  const getTotalSupply = async () => {
    const result = await callReadOnlyFunction({
      network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: 'membership-token',
      functionName: 'get-total-supply',
      functionArgs: [],
      senderAddress: CONTRACT_ADDRESS
    });
    return cvToValue(result).value;
  };
  // hacky as hell
  const bootstrap = async () => {
    const userData = userSession.loadUserData();
    const address = userData.profile.stxAddress.testnet;

    await doContractCall({
      network: network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: 'core',
      functionName: 'construct',
      functionArgs: [contractPrincipalCV(CONTRACT_ADDRESS, 'bootstrap')],
      senderAddress: address
    });
  };
  const getBalance = async () => {

    // userData.profile.stxAddress.devnet
    const result = await callReadOnlyFunction({
      network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: 'membership-token',
      functionName: 'get-balance',
      functionArgs: [standardPrincipalCV(address)],
      senderAddress: CONTRACT_ADDRESS
    });
    console.log(result);
    return cvToValue(result).value;
  };
  useEffect(() => {
    getBalance().then((balance) => {
      console.log('balance', balance);
      setIsMember(balance >= 0);
    });
    getTotalSupply().then((ts) => {
      console.log('total supply', ts);
      // TODO
      // if (ts == 0) {
      //   console.log('bootstrapp');
      //   bootstrap();
      // }
      setTotalSupply(ts);
      // TODO
      setIsMember(true);
    });
    const userData = userSession.loadUserData();
    const address = userData.profile.stxAddress.testnet;
    setAddress(address)
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold">DAO Town</h1>
      <InfoBar />
      <div className="h-60 sm:h-72 flex items-center justify-center">
        <div className="py-4">
          {isMember ? (
            <MemberView address={address} />
          ) : (
            <OnboardingView />
          )}
        </div>
      </div>
    </>
  );
};
