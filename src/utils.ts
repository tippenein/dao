import { StacksDevnet } from '@stacks/network';
import * as fs from 'fs';
import {
  broadcastTransaction,
  makeContractDeploy,
  StacksTransaction,
  TxBroadcastResultOk,
  TxBroadcastResultRejected,
  makeContractCall,
  AnchorMode,
} from '@stacks/transactions';

import { ADDR1, ADDR2, testnetKeyMap } from './mocknet';
export const env = 'devnet'; // TODO

export const network = new StacksDevnet();

export const CONTRACT_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';

export async function handleTransaction(transaction: StacksTransaction) {
  const result = await broadcastTransaction(transaction, network);
  console.log(result);
  if ((result as TxBroadcastResultRejected).error) {
    if (
      (result as TxBroadcastResultRejected).reason === 'ContractAlreadyExists'
    ) {
      console.log('already deployed');
    } else {
      throw new Error(
        `failed to handle transaction ${transaction.txid()}: ${JSON.stringify(
          result
        )}`
      );
    }
  }
  return result as TxBroadcastResultOk;
}

export async function callContractFunction(
  contractName: string,
  functionName: string,
  sender: any,
  args: any
) {
  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: contractName,
    functionName: functionName,
    functionArgs: args,
    senderKey: sender,
    network,
    postConditionMode: 0x01 // PostconditionMode.Allow
  };

  console.log('Sending transaction', contractName);
  const transaction = await makeContractCall(txOptions);
  console.log(transaction);

  return handleTransaction(transaction);
}

export async function deployContract(
  contractName: string,
  isProposal: boolean
) {
  let codeBody;
  if (isProposal) {
    codeBody = fs
      .readFileSync(`./contracts/proposals/${contractName}.clar`)
      .toString();
  } else {
    codeBody = fs.readFileSync(`./contracts/${contractName}.clar`).toString();
  }
  const transaction = await makeContractDeploy({
    contractName,
    codeBody: codeBody,
    senderKey: testnetKeyMap[ADDR1].secretKey,
    network,
    anchorMode: AnchorMode.Any
  });
  console.log(`deploy contract ${contractName}`);
  return handleTransaction(transaction);
}
