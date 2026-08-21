import { KnboneAbi } from '@knine-sdk/contracts';
import { BigNumber } from 'ethers';

export type StakingFormFields = {
  protocolFee: string;
  entityFees: {
    dao: string;
    operators: string;
    instantPool: string;
    staking: string;
  };
  daoAddress: string;
  instantPoolAddress: string;
  nodeOperatorAddress: string;
  unstBONEAddress: string;
  l2StakingAddress: string;
  rewardDistributionLowerBound: string;
  delegationLowerBound: BigNumber;
  instantPoolUsageFee: BigNumber | string;
};

export type MethodByField = {
  [key in keyof StakingFormFields]: keyof KnboneAbi['functions'];
};
