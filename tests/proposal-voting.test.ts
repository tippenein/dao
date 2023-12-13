import { describe, expect, it } from 'vitest';
import { initSimnet } from '@hirosystems/clarinet-sdk';
import { Cl, ClarityValue, cvToValue } from '@stacks/transactions';

const simnet = await initSimnet();

const accounts = simnet.getAccounts();
const deployer = accounts.get('deployer')!;
const address1 = accounts.get('wallet_1')!;

const err = (val: number) => {
  return Cl.error(Cl.uint(val));
};

const callPub = (method: string, sender: string, args: any[]) => {
  const { result } = simnet.callPublicFn(
    'proposal-voting',
    method,
    args,
    sender
  );
  return result;
};

const readFn = (method: string, sender: string, args: any[]) => {
  const { result } = simnet.callReadOnlyFn(
    'proposal-voting',
    method,
    args,
    sender
  );
  return result;
};

describe('Proposal voting', () => {
  it('proposes', () => {
    expect(true).toBe(true);
  });
});
