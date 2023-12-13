import React, { useEffect, useState } from 'react';
import {
  PrincipalCV,
  callReadOnlyFunction,
  cvToValue,
  standardPrincipalCV
} from '@stacks/transactions';
import { network, CONTRACT_ADDRESS } from '@/utils';
import { Divider } from './ui/divider';
import { Membership } from '@/data/Membership';
import { useConnect } from '@stacks/connect-react';

export const InfoBar: React.FC<{ address: PrincipalCV }> = ({ address }) => {
  const { doContractCall } = useConnect();
  const [totalSupply, setTotalSupply] = useState<number | null>(null);

  useEffect(() => {
    const membershipActions = new Membership(address, doContractCall);
    console.log(address)
    membershipActions.getTotalSupply().then((ts) => {
      setTotalSupply(ts + 1);
    });
  }, []);

  return (
    <div className="infographic">
      <h2>Total Supply: {totalSupply}</h2>
      <Divider />
    </div>
  );
};
