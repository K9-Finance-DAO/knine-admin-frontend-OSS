import {
  RewardPerSecondFormData,
  RewardPerSecondFormInput,
  RewardPerSecondFormValidationContext,
} from './types';
import { useWeb3 } from 'rnb-web3/web3-react';
import { useMemo } from 'react';
import { MaxUint256 } from '@ethersproject/constants';
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

export const RewardPerSecondValidationResolver: Resolver<
  RewardPerSecondFormInput,
  Promise<RewardPerSecondFormValidationContext>
> = async (values, validationContextPromise) => {
  const { rewardPerSecond } = values;

  try {
    invariant(
      validationContextPromise,
      'validation context must be presented as context promise ',
    );

    const { isWalletActive } = await awaitWithTimeout(
      validationContextPromise,
      VALIDATION_CONTEXT_TIMEOUT,
    );

    if (!rewardPerSecond) throw new ValidationError('multiplier', '');

    if (rewardPerSecond <= 0)
      throw new ValidationError(
        'multiplier',
        `Enter max lockup multiplier greater than 0`,
      );

    if (rewardPerSecond >= +MaxUint256)
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
      'RewardPerSecondForm',
      GENERAL_ERROR_FIELD_FALLBACK,
    );
  }
};

export const useRewardPerSecondFormValidationContext = (
  networkData: RewardPerSecondFormData,
) => {
  const { active } = useWeb3();
  const { isMultisig, rewardPerSecond } = networkData;
  const validationContextAwaited = useMemo(() => {
    if (active || (isMultisig !== undefined && rewardPerSecond)) {
      return {
        isWalletActive: active,
        multiplier: rewardPerSecond ?? 0,
        isMultisig: isMultisig ?? false,
      };
    }
    return undefined;
  }, [active, isMultisig, rewardPerSecond]);

  return useAwaiter(validationContextAwaited).awaiter;
};
