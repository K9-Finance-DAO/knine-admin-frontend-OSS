import { NodeOperatorRegistryAbi } from '@knine-sdk/contracts';

export type NodeOperatorFormFields = {
  knBoneAddress: string;
  distanceThreshold: string;
  minRequestWithdrawRange: string;
  maxWithdrawPercentagePerRebalance: string;
};

export type MethodByField = {
  [key in keyof NodeOperatorFormFields]: keyof NodeOperatorRegistryAbi['functions'];
};
