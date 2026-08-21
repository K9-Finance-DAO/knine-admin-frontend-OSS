import { MethodByField, VestingFormFields } from './types';
import { Yup } from 'shared/hook-form/yup';

export const defaultState: VestingFormFields = {
  backingRatio: '',
  vestingRatio: '',
  vestingPeriod: '',
  denominator: 100,
};

const validationFn = (value: any) => {
  return !!value && +value > 0;
};

export const schema = Yup.object().shape({
  backingRatio: Yup.string().test('more 0', validationFn),
  vestingRatio: Yup.mixed().test('more 0', validationFn),
  vestingPeriod: Yup.string().test('more 0', validationFn),
  denominator: Yup.number(),
});

export const SECONDS_IN_A_DAY = 86400;

export const methodsByField: MethodByField = {
  backingRatio: 'setBackingRatio',
  vestingPeriod: 'setVestingPeriod',
  vestingRatio: 'setVestingRatio',
};
