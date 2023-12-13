import { CONTRACT_ADDRESS, network } from '@/utils';
import { StacksNetwork } from '@stacks/network';
import {
  PrincipalCV,
  callReadOnlyFunction,
  cvToValue,
  stringAsciiCV,
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

export class Proposal {
  address: PrincipalCV;
  doContractCall: (args: DoContractCallArgs) => Promise<Result>;

  constructor(address: PrincipalCV, doContractCall: any) {
    this.doContractCall = doContractCall;
    this.address = address;
  }

  submit = async (title: string, description: string) => {
    await this.doContractCall({
      network: network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: 'proposal-submission',
      functionName: 'propose',
      functionArgs: [
        this.address,
        stringAsciiCV(title),
        stringAsciiCV(description)
      ]
    });
  };
}
