import { CONTRACT_ADDRESS, network } from '@/utils';
import { StacksNetwork } from '@stacks/network';
import {
  PrincipalCV,
  callReadOnlyFunction,
  cvToValue,
  uintCV
} from '@stacks/transactions';

type DoContractCallArgs = {
  network: StacksNetwork;
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: Array<any>;
};

type Result = any;

export class Membership {
  address: PrincipalCV;
  doContractCall: (args: DoContractCallArgs) => Promise<Result>;

  constructor(address: PrincipalCV, doContractCall: any) {
    this.doContractCall = doContractCall;
    this.address = address;
  }

  getTotalSupply = async (): Promise<number> => {
    return callReadOnlyFunction({
      network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: 'membership-token',
      functionName: 'get-total-supply',
      functionArgs: [],
      senderAddress: CONTRACT_ADDRESS
    }).then((result) => {
      return Number(cvToValue(result).value);
    });
  };

  getBalance = async (): Promise<number> => {
    return callReadOnlyFunction({
      network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: 'membership-token',
      functionName: 'get-balance',
      functionArgs: [this.address],
      senderAddress: CONTRACT_ADDRESS
    }).then((result) => {
      return Number(cvToValue(result).value);
    });
  };
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
