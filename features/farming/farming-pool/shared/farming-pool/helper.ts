import type { FarmingPoolFormFields } from '../types';
import { Yup } from 'shared/hook-form/yup';
import { validateMedia } from 'shared/hook-form/yup/yup.config';
import { validateToken } from 'features/farming/farming-pool/shared/farming-pool/validate-token';

const tokenDefaultValues = {
  address: '',
  logo: null,
};

export const defaultValues: FarmingPoolFormFields = {
  poolName: '',
  poolLogo: '',
  token0: tokenDefaultValues,
  token1: tokenDefaultValues,
  tokenReward: tokenDefaultValues,
  startDate: new Date(),
  endDate: new Date(),
  rps: '',
};

const REQUIRED_MSG = 'Required field';

const tokenValidationSchema = Yup.object({
  address: Yup.string()
    .required(REQUIRED_MSG)
    .isValidAddress()
    .test(
      'validate token',
      'Unable to find token pair with USDT/USDC',
      async (value, { options: { context } }) => {
        if (value && !context?.isEditing) {
          return await validateToken(value);
        }

        return true;
      },
    ),
  logo: Yup.lazy((value) =>
    typeof value === 'string' ? Yup.string() : validateMedia(5).nullable(),
  ),
});

export const farmingPoolFormSchema = Yup.object().shape(
  {
    poolName: Yup.string().nullable().required(REQUIRED_MSG),
    poolLogo: Yup.lazy((value) =>
      typeof value === 'string'
        ? Yup.string()
        : validateMedia(5).required(REQUIRED_MSG),
    ),
    token0: tokenValidationSchema,
    token1: tokenValidationSchema,
    tokenReward: tokenValidationSchema,
    startDate: Yup.date()
      .nullable()
      .max(Yup.ref('endDate'), 'Start time cannot be after end time'),
    endDate: Yup.date()
      .nullable()
      .min(Yup.ref('startDate'), 'End time cannot be before end time'),
    rps: Yup.string(),
  },
  [['startDate', 'endDate']],
);

export const defaultValuesMock: FarmingPoolFormFields = {
  poolName: 'asd1',
  poolLogo: '',
  token0: {
    address: '0xCcD2466613fe5D185E5FA081A0B71040277606dd',
    logo: null,
  },
  token1: {
    address: '0xCcD2466613fe5D185E5FA081A0B71040277606dd',
    logo: null,
  },
  tokenReward: {
    address: '0xCcD2466613fe5D185E5FA081A0B71040277606dd',
    logo: null,
  },
  startDate: new Date(),
  endDate: new Date(),
  rps: '12',
};
