import { useContext } from 'react';
import { AppContext } from './context';
import dotenv from 'dotenv';

import { UserData } from '@stacks/auth';

const env = 'devnet';
export const useSTXAddress = (): string | undefined => {
  const [{ userData }, _] = useContext(AppContext);
  const isMainnet = env == 'mainnet';

  if (isMainnet) {
    return userData?.profile?.stxAddress?.mainnet as string;
  }
  return userData?.profile?.stxAddress?.testnet as string;
};

// export const bnsName = (): string | undefined => {
//   const [{ userData }, _] = useContext(AppContext);
//   return userData?.username || useSTXAddress();
// };

export const resolveSTXAddress = (userData: UserData | null) => {
  const isMainnet = env == 'mainnet';

  if (isMainnet) {
    return userData?.profile?.stxAddress?.mainnet as string;
  }
  return userData?.profile?.stxAddress?.testnet as string;
};
