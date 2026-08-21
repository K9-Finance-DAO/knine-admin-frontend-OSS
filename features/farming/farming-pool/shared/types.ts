import { TransactionRequest } from '@ethersproject/providers';

export type FarmingPoolTokenFields = {
  address: string;
  logo: string | null;
};

export type FarmingPoolFormFields = {
  poolName: string;
  poolLogo: string;
  token0: FarmingPoolTokenFields;
  token1: FarmingPoolTokenFields;
  tokenReward: FarmingPoolTokenFields;
  startDate: Date | null;
  endDate: Date | null;
  rps: string;
};

export interface CreatePoolRequest {
  poolName: string;
  poolLogo: string;
  tokenALogo: string;
  tokenBLogo: string;
  rewardTokenLogo: string;
  token0Address: string;
  token1Address: string;
  rewardToken: string;
  startTime: string;
  endTime: string;
  rps: string;
}

export type CretePoolResponse = {
  initial_tx: TransactionRequest;
  initial_tx_calldata: unknown;
} & CreatePoolRequest;
