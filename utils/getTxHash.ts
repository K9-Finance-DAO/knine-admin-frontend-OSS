import { ContractTransaction } from '@ethersproject/contracts';

export const getTxHash = (tx: ContractTransaction | string) =>
  typeof tx === 'string' ? tx : tx.hash;
