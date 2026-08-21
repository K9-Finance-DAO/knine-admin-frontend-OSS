import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import invariant from 'tiny-invariant';
import { useRealYieldStakingInfo } from '../../hooks';
import { useIsMultisig } from 'shared/hooks/useIsMultisig';
import {
  MaxLockupMultiplierFormData,
  MaxLockupMultiplierFormInput,
} from './types';
import { FormProvider, useForm } from 'react-hook-form';
import {
  maxLockupMultiplierValidationResolver,
  useMaxLockupMultiplierFormValidationContext,
} from './validation';
import {
  FormControllerContext,
  FormControllerContextValueType,
  useFormControllerRetry,
} from 'shared/hook-form/form-controller';
import { useChangeMultiplier } from './use-change-multiplier';

const MaxLockupMultiplierFormDataContext =
  createContext<MaxLockupMultiplierFormData | null>(null);
MaxLockupMultiplierFormDataContext.displayName =
  'MaxLockupMultiplierFormDataContext';

export const useMaxLockupMultiplierFormData = () => {
  const value = useContext(MaxLockupMultiplierFormDataContext);
  invariant(
    value,
    'useMaxLockupMultiplierFormData was used outside the provider',
  );
  return value;
};

const useMaxLockupMultiplierFormNetworkData =
  (): MaxLockupMultiplierFormData => {
    const {
      data: realYieldStakingInfo,
      initialLoading: isRealYieldStakingLoading,
      update: updateRealYieldStakingInfo,
    } = useRealYieldStakingInfo();
    const { isMultisig, isLoading: isMultisigLoading } = useIsMultisig();

    const multiplier = useMemo(
      () => realYieldStakingInfo?.maxLockMultiplier || 0,
      [realYieldStakingInfo?.maxLockMultiplier],
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
      multiplier,
      isMultisig: isMultisigLoading ? undefined : isMultisig,
      revalidate,
      loading,
    };
  };

export const MaxLockupMultiplierFormDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const data = useMaxLockupMultiplierFormNetworkData();
  const validationContextPromise =
    useMaxLockupMultiplierFormValidationContext(data);

  const formObject = useForm<MaxLockupMultiplierFormInput>({
    defaultValues: {
      multiplier: 0,
    },
    context: validationContextPromise,
    resolver: maxLockupMultiplierValidationResolver,
    mode: 'onChange',
  });

  const { retryEvent, retryFire } = useFormControllerRetry();

  const { setValue } = formObject;

  const { changeMultiplier } = useChangeMultiplier({
    onConfirm: data.revalidate,
    onRetry: retryFire,
  });

  const formControllerValue: FormControllerContextValueType<MaxLockupMultiplierFormInput> =
    useMemo(
      () => ({
        onSubmit: changeMultiplier,
        retryEvent,
      }),
      [retryEvent, changeMultiplier],
    );

  const value = useMemo(
    () => ({
      ...data,
    }),
    [data],
  );

  useEffect(() => {
    if (data?.multiplier) setValue('multiplier', data.multiplier);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.multiplier]);

  return (
    <FormProvider {...formObject}>
      <MaxLockupMultiplierFormDataContext.Provider value={value}>
        <FormControllerContext.Provider value={formControllerValue}>
          {children}
        </FormControllerContext.Provider>
      </MaxLockupMultiplierFormDataContext.Provider>
    </FormProvider>
  );
};
