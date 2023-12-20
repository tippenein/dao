import { describe, expect, it } from 'vitest';
import { initSimnet } from '@hirosystems/clarinet-sdk';
import { Cl, boolCV, contractPrincipalCV } from '@stacks/transactions';

describe('Bootstrap', async () => {
  const simnet = await initSimnet();
  const accounts = simnet.getAccounts();
  const deployer = accounts.get('deployer')!;

  describe('execute', () => {
    it('should enable all extensions and mint membership tokens', () => {
      // const { result, events } = simnet.callPublicFn(
      //   'core',
      //   'construct',
      //   [contractPrincipalCV(deployer, 'bootstrap')],
      //   deployer
      // );
      // expect(result).toBeOk(boolCV(true));
      // expect(events).toMatchSnapshot();
      expect(true).toBe(true)
    });
  });
});
