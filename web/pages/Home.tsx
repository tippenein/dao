import { useState, useEffect } from 'react';
import { UserSession, useConnect } from '@stacks/connect-react';
import { contractPrincipalCV, standardPrincipalCV } from '@stacks/transactions';
import { MemberView } from './MemberView';
import { OnboardingView } from './OnboardingView';
import { InfoBar } from '@/components/InfoBar';
import { Membership } from '@/data/Membership';
import { CONTRACT_ADDRESS, network } from '@/utils';
import { resolveSTXAddress, useSTXAddress } from '@/common/use-stx-address';

export const Home: React.FC<{ userSession: UserSession }> = ({
  userSession
}) => {
  const { doContractCall } = useConnect();
  const [isMember, setIsMember] = useState(false);
  const address = useSTXAddress()

  // hacky as hell
  const bootstrap = async () => {

    await doContractCall({
      network: network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: 'core',
      functionName: 'construct',
      functionArgs: [contractPrincipalCV(CONTRACT_ADDRESS, 'bootstrap')],
      senderAddress: address
    });
  };
  const principal = standardPrincipalCV(address);
  useEffect(() => {
    const membershipActions = new Membership(
      standardPrincipalCV(address),
      doContractCall
    );
    membershipActions.getBalance().then((balance) => {
      console.log('balance', balance);
      setIsMember(balance >= 0); // TODO fix bootstrap
    });
    membershipActions.getTotalSupply().then((ts) => {
      console.log('total supply', ts);
      // TODO
      // if (ts == 0) {
      //   console.log('bootstrapp');
      //   bootstrap();
      // }
    });
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold">DAO Town</h1>
      <InfoBar address={principal} />
      <div className="h-60 sm:h-72 flex items-center justify-center">
        <div className="py-4">
          {isMember ? <MemberView address={principal} /> : <OnboardingView />}
        </div>
      </div>
    </>
  );
};