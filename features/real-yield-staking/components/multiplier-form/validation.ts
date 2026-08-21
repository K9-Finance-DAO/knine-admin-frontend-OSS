import {
  MaxLockupMultiplierFormData,
  MaxLockupMultiplierFormInput,
  MaxLockupMultiplierFormValidationContext,
} from './types';
import { useWeb3 } from 'rnb-web3/web3-react';
import { useMemo } from 'react';
import { MaxUint256, Zero } from '@ethersproject/constants';
import { useAwaiter } from 'shared/hooks/use-awaiter';
import { Resolver } from 'react-hook-form';
import invariant from 'tiny-invariant';
import {
  GENERAL_ERROR_FIELD_FALLBACK,
  handleResolverValidationError,
  ValidationError,
} from 'shared/hook-form/validation';
import { awaitWithTimeout } from 'utils/await-with-timeout';

const VALIDATION_CONTEXT_TIMEOUT = 4000;

export const maxLockupMultiplierValidationResolver: Resolver<
  MaxLockupMultiplierFormInput,
  Promise<MaxLockupMultiplierFormValidationContext>
> = async (values, validationContextPromise) => {
  const { multiplier } = values;

  try {
    invariant(
      validationContextPromise,
      'validation context must be presented as context promise ',
    );

    const { isWalletActive } = await awaitWithTimeout(
      validationContextPromise,
      VALIDATION_CONTEXT_TIMEOUT,
    );

    if (!multiplier) throw new ValidationError('multiplier', '');

    if (multiplier <= 0)
      throw new ValidationError(
        'multiplier',
        `Enter max lockup multiplier greater than 0`,
      );

    if (multiplier >= +MaxUint256)
      throw new ValidationError(
        'multiplier',
        `Max lockup multiplier is not valid`,
      );

    if (!isWalletActive) {
      return {
        values,
        errors: { amount: 'wallet not connected' },
      };
    }

    return {
      values,
      errors: {},
    };
  } catch (error) {
    return handleResolverValidationError(
      error,
      'MaxLockupMultiplierForm',
      GENERAL_ERROR_FIELD_FALLBACK,
    );
  }
};

export const useMaxLockupMultiplierFormValidationContext = (
  networkData: MaxLockupMultiplierFormData,
) => {
  const { active } = useWeb3();
  const { isMultisig, multiplier } = networkData;
  const validationContextAwaited = useMemo(() => {
    if (active || (isMultisig !== undefined && multiplier)) {
      return {
        isWalletActive: active,
        multiplier: multiplier ?? Zero,
        isMultisig: isMultisig ?? false,
      };
    }
    return undefined;
  }, [active, isMultisig, multiplier]);

  return useAwaiter(validationContextAwaited).awaiter;
};
