import { Yup } from 'shared/hook-form/yup';
import { NodeOperatorFormFields, MethodByField } from './types';

export const schema = Yup.object({
  knBoneAddress: Yup.string().isValidAddress(),
  distanceThreshold: Yup.string().validateLimits({ minValue: 100 }),
  minRequestWithdrawRange: Yup.string().validateLimits({ maxValue: 100 }),
  maxWithdrawPercentagePerRebalance: Yup.string().validateLimits({
    maxValue: 100,
  }),
});

export const defaultState: NodeOperatorFormFields = {
  knBoneAddress: '',
  distanceThreshold: '',
  minRequestWithdrawRange: '',
  maxWithdrawPercentagePerRebalance: '',
};

export const shieldContractMethodByField: MethodByField = {
  knBoneAddress: 'setKnBONEAddress',
  distanceThreshold: 'setDistanceThreshold',
  minRequestWithdrawRange: 'setMinRequestWithdrawRange',
  maxWithdrawPercentagePerRebalance: 'setMaxWithdrawPercentagePerRebalance',
} as const;
