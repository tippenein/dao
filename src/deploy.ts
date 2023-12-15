import { deployContract } from './utils';

export async function deploy() {
  await deployContract('bootstrap', true);
}

deploy();
