import React, { useEffect, useState } from 'react';
import { callReadOnlyFunction, cvToValue } from '@stacks/transactions';
import { network, CONTRACT_ADDRESS } from '@/utils';
import { Divider } from './ui/divider';

export const InfoBar: React.FC = () => {
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const [daoOwner, setDaoOwner] = useState<string | null>(null);

  const getDaoOwner = async () => {
    const result = await callReadOnlyFunction({
      network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: 'membership-token',
      functionName: 'get-dao-owner',
      functionArgs: [],
      senderAddress: CONTRACT_ADDRESS
    });
    return cvToValue(result).value;
  };
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

  useEffect(() => {
    getTotalSupply().then((ts) => {
      setTotalSupply(ts);
    });
    getDaoOwner().then((owner) => {
      setDaoOwner(owner);
    });
  }, []);

  return (
    <div className="infographic">
      <h2>Total Supply: {totalSupply}</h2>
      {daoOwner && (
        <>
          <h2>Owner</h2>
          <p>{daoOwner}</p>
        </>
      )}
      <Divider />
    </div>
  );
};
