import { Yup } from 'shared/hook-form/yup';

export const defaultState = {
  zapEntryFee: '',
  zapExitFee: '',
};

export const schema = Yup.object({
  zapEntryFee: Yup.string().validateLimits({ maxValue: 50 }),
  zapExitFee: Yup.string().validateLimits({ maxValue: 50 }),
});
