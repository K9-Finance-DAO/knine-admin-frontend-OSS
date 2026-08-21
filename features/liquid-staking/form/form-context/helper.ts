import { Yup } from 'shared/hook-form/yup';
import type { StakingFormFields } from './types';
import { MethodByField } from './types';
import { Zero } from '@ethersproject/constants';

export const MAX_FEE_TOTAL = 100;

export const schema = Yup.object().shape({
  protocolFee: Yup.string().validateLimits({ maxValue: 100 }),
  entityFees: Yup.object().shape({
    dao: Yup.string(),
    operators: Yup.string(),
    instantPool: Yup.string(),
    staking: Yup.string(),
  }),
  daoAddress: Yup.string().isValidAddress(),
  instantPoolAddress: Yup.string().isValidAddress(),
  nodeOperatorAddress: Yup.string().isValidAddress(),
  unstBONEAddress: Yup.string().isValidAddress(),
  l2StakingAddress: Yup.string().nullable().isValidAddress(),
  delegationLowerBound: Yup.mixed().nullable().isBigNumber(),
  instantPoolUsageFee: Yup.string().validateLimits({ maxValue: 100 }),
});

export const defaultState: StakingFormFields = {
  protocolFee: '',
  entityFees: { dao: '', operators: '', instantPool: '', staking: '' },
  daoAddress: '',
  instantPoolAddress: '',
  nodeOperatorAddress: '',
  unstBONEAddress: '',
  l2StakingAddress: '',
  rewardDistributionLowerBound: '',
  delegationLowerBound: Zero,
  instantPoolUsageFee: Zero,
};

export const shieldContractMethodByField: MethodByField = {
  protocolFee: 'setProtocolFee',
  entityFees: 'setFees',
  daoAddress: 'setDaoAddress',
  delegationLowerBound: 'setDelegationLowerBound',
  instantPoolAddress: 'setInstantPool',
  l2StakingAddress: 'setL2Staking',
  nodeOperatorAddress: 'setNodeOperatorRegistryAddress',
  rewardDistributionLowerBound: 'setRewardDistributionLowerBound',
  unstBONEAddress: 'setUnstBONE',
  instantPoolUsageFee: 'setInstantPoolUsageFee',
} as const;
