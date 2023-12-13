import { describe, expect, it } from 'vitest';
import { initSimnet } from '@hirosystems/clarinet-sdk';
import { Cl, ClarityValue, cvToValue } from '@stacks/transactions';

const simnet = await initSimnet();

const accounts = simnet.getAccounts();
const deployer = accounts.get('deployer')!;
const address1 = accounts.get('wallet_1')!;
const address2 = accounts.get('wallet_2')!;

const err = (val: number) => {
  return Cl.error(Cl.uint(val));
};
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

const transfer = (amount: number, sender: string, recip: string) => {
  return callPub('transfer', deployer, [
    Cl.uint(amount),
    Cl.standardPrincipal(sender),
    Cl.standardPrincipal(recip)
  ]);
};
const burn = (amount: number, burner: string) => {
  return callPub('burn', deployer, [
    Cl.uint(amount),
    Cl.standardPrincipal(burner)
  ]);
};
const mint = (amount: number, recipient: string) => {
  return callPub('mint', deployer, [
    Cl.uint(amount),
    Cl.standardPrincipal(recipient)
  ]);
};

describe('membership tokens', () => {
  // simnet.callPublicFn('core', 'construct', [Cl.contractPrincipal(deployer, "bootstrap")], deployer);
  it('sets the dao owner initially', () => {
    const result = callPub('set-dao-owner', deployer, [
      Cl.standardPrincipal(deployer)
    ]);
    expect(result).toStrictEqual(Cl.ok(Cl.bool(true)));
    const owner = readFn('get-dao-owner', deployer, []);
    expect(owner).toStrictEqual(Cl.standardPrincipal(deployer));
  });
  it('can be minted', () => {
    const result = mint(1000, deployer);
    expect(result).toStrictEqual(Cl.ok(Cl.bool(true)));
  });
  it('shows correct total-supply', () => {
    mint(10, address2);
    expect(readFn('get-total-supply', address2, [])).toStrictEqual(
      Cl.ok(Cl.uint(1010))
    );
  });
  it('shows correct balance', () => {
    expect(
      readFn('get-balance', address2, [Cl.standardPrincipal(address2)])
    ).toStrictEqual(Cl.ok(Cl.uint(10)));
    burn(10, address2);
    expect(
      readFn('get-balance', address2, [Cl.standardPrincipal(address2)])
    ).toStrictEqual(Cl.ok(Cl.uint(0)));
  });
  it('can not burn more than you have', () => {
    mint(10, address2);
    expect(
      readFn('get-balance', address2, [Cl.standardPrincipal(address2)])
    ).toStrictEqual(Cl.ok(Cl.uint(10)));
    const result = burn(11, address2);
    expect(result).toStrictEqual(err(2004));
  });
  it('can transfer', () => {
    transfer(10, address2, address1);
    expect(
      readFn('get-balance', address2, [Cl.standardPrincipal(address2)])
    ).toStrictEqual(Cl.ok(Cl.uint(0)));
    expect(
      readFn('get-balance', address1, [Cl.standardPrincipal(address1)])
    ).toStrictEqual(Cl.ok(Cl.uint(10)));
  });
  it('disallows creating over the membership limit', () => {
    const result = mint(20000000, address1);
    expect(result).toStrictEqual(err(2002));
  });
});
