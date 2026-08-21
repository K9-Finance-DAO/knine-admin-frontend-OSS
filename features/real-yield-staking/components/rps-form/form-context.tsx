import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { RewardPerSecondFormData, RewardPerSecondFormInput } from './types';
import invariant from 'tiny-invariant';
import { useRealYieldStakingInfo } from '../../hooks';
import { useIsMultisig } from 'shared/hooks/useIsMultisig';
import { FormProvider, useForm } from 'react-hook-form';
import {
  FormControllerContext,
  FormControllerContextValueType,
  useFormControllerRetry,
} from 'shared/hook-form/form-controller';
import {
  RewardPerSecondValidationResolver,
  useRewardPerSecondFormValidationContext,
} from './validation';
import { useChangeRewardPerSecond } from './use-change-rps';

export const RewardPerSecondFormDataContext =
  createContext<RewardPerSecondFormData | null>(null);
RewardPerSecondFormDataContext.displayName = 'rewardPerSecondFormDataContext';

export const useRewardPerSecondFormData = () => {
  const value = useContext(RewardPerSecondFormDataContext);
  invariant(value, 'useRewardPerSecondFormData was used outside the provider');
  return value;
};

const useRewardPerSecondFormNetworkData = (): RewardPerSecondFormData => {
  const {
    data: realYieldStakingInfo,
    initialLoading: isRealYieldStakingLoading,
    update: updateRealYieldStakingInfo,
  } = useRealYieldStakingInfo();
  const { isMultisig, isLoading: isMultisigLoading } = useIsMultisig();

  const rps = useMemo(
    () => realYieldStakingInfo?.poolInfo?.rps || 0,
    [realYieldStakingInfo?.poolInfo?.rps],
  );

  const revalidate = useCallback(async () => {
    await updateRealYieldStakingInfo();
  }, [updateRealYieldStakingInfo]);

  const loading = useMemo(
    () => ({
      isRealYieldStakingLoading,
      isMultisigLoading,
    }),
    [isMultisigLoading, isRealYieldStakingLoading],
  );

  return {
    rewardPerSecond: rps,
    isMultisig: isMultisigLoading ? undefined : isMultisig,
    revalidate,
    loading,
  };
};

export const RewardPerSecondFormDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const data = useRewardPerSecondFormNetworkData();
  const validationContextPromise =
    useRewardPerSecondFormValidationContext(data);

  const formObject = useForm<RewardPerSecondFormInput>({
    defaultValues: {
      rewardPerSecond: 0,
    },
    context: validationContextPromise,
    resolver: RewardPerSecondValidationResolver,
    mode: 'onChange',
  });

  const { retryEvent, retryFire } = useFormControllerRetry();

  const { setValue } = formObject;

  const { changeRewardPerSecond } = useChangeRewardPerSecond({
    onConfirm: data.revalidate,
    onRetry: retryFire,
  });

  const formControllerValue: FormControllerContextValueType<RewardPerSecondFormInput> =
    useMemo(
      () => ({
        onSubmit: changeRewardPerSecond,
        retryEvent,
      }),
      [retryEvent, changeRewardPerSecond],
    );

  const value = useMemo(
    () => ({
      ...data,
    }),
    [data],
  );

  useEffect(() => {
    if (data?.rewardPerSecond)
      setValue('rewardPerSecond', data.rewardPerSecond);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.rewardPerSecond]);

  return (
    <FormProvider {...formObject}>
      <RewardPerSecondFormDataContext.Provider value={value}>
        <FormControllerContext.Provider value={formControllerValue}>
          {children}
        </FormControllerContext.Provider>
      </RewardPerSecondFormDataContext.Provider>
    </FormProvider>
  );
};
