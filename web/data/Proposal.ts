import { CONTRACT_ADDRESS, network } from '@/utils';
import { StacksNetwork } from '@stacks/network';
import {
  PrincipalCV,
  callReadOnlyFunction,
  standardPrincipalCV,
  cvToValue,
  stringAsciiCV,
  uintCV,
  contractPrincipalCV
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

  submit = async (
    stxAddress: PrincipalCV,
    title: string,
    description: string,
    milestones: number,
    amountPer: number
  ) => {
    console.log('ARGS');
    console.log(milestones);
    console.log(amountPer);
    console.log(title);
    console.log(description);
    await this.doContractCall({
      network: network,
      contractAddress: CONTRACT_ADDRESS,
      // stxAddress: stxAddress,
      contractName: 'proposal-submission',
      functionName: 'propose',
      functionArgs: [
        contractPrincipalCV(CONTRACT_ADDRESS, 'proposal-trait'),
        stringAsciiCV(title),
        stringAsciiCV(description),
        uintCV(milestones),
        uintCV(amountPer)
      ]
    });
  };
}
