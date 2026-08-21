import { Address } from 'wagmi';

export type BonusPool = {
  id: number;
  poolLogo: string;
  poolName: string;
  description: string;
  instagram: string;
  telegram: string;
  discord: string;
  website: string;
  rewardToken: Address;
  startTime: number;
  endTime: number;
  rps: string | number;
};

export type FarmingPool = {
  id: number;
  poolLogo: string;
  tokenALogo: string;
  tokenBLogo: string;
  rewardTokenLogo: string;
  poolName: string;
  address: Address;
  token0Address: Address;
  token1Address: Address;
  rewardToken: Address;
  startTime: number;
  endTime: number;
  rps: string | number;
  bonusPools: BonusPool[];
  estimatedLpPriceUsd: number;
  stakedLiquidityUsd: number;
  estimatedApr: number;
};
