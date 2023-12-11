import { describe, expect, it } from 'vitest';
import { initSimnet } from '@hirosystems/clarinet-sdk';
import { Cl, ClarityValue, cvToValue } from '@stacks/transactions';

const simnet = await initSimnet();

const accounts = simnet.getAccounts();
const deployer = accounts.get('deployer')!;
const address1 = accounts.get('wallet_1')!;
const address2 = accounts.get('wallet_2')!;

const callPub = (method: string, sender: string, args: any[]) => {
  const { result } = simnet.callPublicFn(
    'membership-token',
    method,
    args,
    sender
  );
  return result;
};

const readFn = (method: string, sender: string, args: any[]) => {
  const { result } = simnet.callReadOnlyFn(
    'membership-token',
    method,
    args,
    sender
  );
  return result;
};

const mint = (amount: number, recipient: string) => {
  return callPub('mint', deployer, [
    Cl.uint(amount),
    Cl.standardPrincipal(recipient)
  ]);
};

describe('membership tokens', () => {
  it('can be minted', () => {
    const result = mint(1000, deployer);
    expect(result).toStrictEqual(Cl.ok(Cl.bool(true)));
  });
  // it('shows correct total-supply', () => {
  //   mint(10, address2);
  //   expect(readFn('get-total-supply', address2)).toStrictEqual(
  //     Cl.ok(Cl.uint(1010))
  //   );
  // });
  // it('disallows creating over the membership limit', () => {
  //   const result = mint(2000, address1);
  //   expect(result).toStrictEqual(Cl.uint(2002));
  // });
});
