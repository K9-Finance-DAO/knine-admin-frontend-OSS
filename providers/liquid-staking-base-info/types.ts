import { BigNumber } from 'ethers';

export type FeeDistributionType = {
  dao: number;
  operators: number;
  instantPool: number;
  staking: number;
};

export type LSBaseData = {
  protocolFee?: number;
  feeDistribution: Partial<FeeDistributionType>;
  totalPooled?: BigNumber;
  isPaused?: boolean;
  loading: {
    totalPooledLoading: boolean;
    feesLoading: boolean;
    statusLoading: boolean;
  };
};
