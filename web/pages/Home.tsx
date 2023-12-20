import { useState, useEffect } from 'react';
import { useConnect } from '@stacks/connect-react';
import { standardPrincipalCV } from '@stacks/transactions';
import { Sidebar } from '@/components/Sidebar';
import { MemberView } from './MemberView';
import { OnboardingView } from './OnboardingView';
import { InfoBar } from '@/components/InfoBar';
import { Membership } from '@/data/Membership';
import { useSTXAddress } from '@/common/use-stx-address';
import { truncateAddress } from '@/lib/utils';

export const Home: React.FC = () => {
  const { doContractCall } = useConnect();
  const [isMember, setIsMember] = useState(false);
  const address = useSTXAddress();

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
    });
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow ">
        <h1 className="text-4xl font-bold">DAO Town</h1>
        <h2 className="text-lg font-bold text-gray-700">
          {truncateAddress(address)}
        </h2>
        <div className="w-4/5 h-60 sm:h-72 flex items-center justify-center">
          <div className="py-4">
            {isMember ? <MemberView address={principal} /> : <OnboardingView />}
          </div>
        </div>
      </div>
    </div>
  );
};
