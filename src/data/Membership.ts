import { CONTRACT_ADDRESS, network } from '@/utils';
import { PrincipalCV, uintCV } from '@stacks/transactions';

export class Membership {
  address: PrincipalCV;
  doContractCall: any;

  constructor(address: PrincipalCV, doContractCall: any) {
    this.doContractCall = doContractCall;
    this.address = address;
  }

  mint = async (amount: number) => {
    await this.doContractCall({
      network: network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: 'membership-token',
      functionName: 'mint',
      functionArgs: [uintCV(amount), this.address]
    });
  };

  burn = async (amount: number) => {
    await this.doContractCall({
      network: network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: 'membership-token',
      functionName: 'burn',
      functionArgs: [uintCV(amount), this.address]
    });
  };

  transfer = async (amount: number, recipient: PrincipalCV) => {
    await this.doContractCall({
      network: network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: 'membership-token',
      functionName: 'transfer',
      functionArgs: [uintCV(amount), this.address, recipient]
    });
  };
}
