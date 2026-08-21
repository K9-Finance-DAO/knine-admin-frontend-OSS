import type { PaginatedResponse } from 'types';
import { TransactionRequest } from '@ethersproject/providers';

export type BonusPoolItem = {
  id: string | number;
  poolLogo: string;
  poolId: string;
  txHash: string;
  status: string;
  poolName: string;
  description: string;
  instagram: string | null;
  telegram: string | null;
  discord: string | null;
  website: string | null;
  farmingPoolAddress: string;
  rewardToken: string;
  startTime: Date | null;
  endTime: Date | null;
  rps: string;
  createdAt: string;
  updatedAt: string;
  farmingPool: string;
};

export type BonusPools = PaginatedResponse<BonusPoolItem>;

export type BonusPoolFields = {
  poolLogo: string;
  poolName: string;
  description: string;
  instagram: string | null;
  telegram: string | null;
  discord: string | null;
  website: string | null;
  rewardToken: string;
  startTime: Date | null;
  endTime: Date | null;
  rps: string;
};

export type BonusPoolFieldsResponse = {
  status: string;
  tx_hash: string | null;
} & BonusPoolFields;

export type CreateEditBonusPoolResponse = {
  initial_tx?: TransactionRequest;
  initial_tx_calldata: unknown;
} & BonusPoolFieldsResponse;

export type CurrentPool = { address: string; poolId: string | number };

export enum BonusPoolStatuses {
  COMMITTED = 'committed',
  CREATED = 'created',
  DELETED = 'deleted',
  STOPPED = 'stopped',
}
