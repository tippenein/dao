import { pubKeyfromPrivKey, publicKeyToString } from '@stacks/transactions';

// from personal public Stacks.toml file
export const ADDR1 = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
export const ADDR2 = 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5';
export const testnetKeys: { secretKey: string; stacksAddress: string }[] = [
  {
    secretKey:
      '753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601',
    stacksAddress: ADDR1
  },
  {
    secretKey:
      '7287ba251d44a4d3fd9276c88ce34c5c52a038955511cccaf77e61068649c17801',
    stacksAddress: ADDR2
  }
];

export const testnetKeyMap: Record<
  string,
  { address: string; secretKey: string; pubKey: string }
> = Object.fromEntries(
  testnetKeys.map((t) => [
    t.stacksAddress,
    {
      address: t.stacksAddress,
      secretKey: t.secretKey,
      pubKey: publicKeyToString(pubKeyfromPrivKey(t.secretKey))
    }
  ])
);
