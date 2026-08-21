import { VestingAbi } from '@knine-sdk/contracts';

export type VestingFormFields = {
  backingRatio: string;
  vestingRatio: string;
  vestingPeriod: string;
  denominator?: number;
};

export type UpdatedFields = {
  backingRatio: string;
  vestingRatio: string;
  vestingPeriod: string;
};

export type MethodByField = {
  [key in keyof UpdatedFields]: keyof VestingAbi['functions'];
};
