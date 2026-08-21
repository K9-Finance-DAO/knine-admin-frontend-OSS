import { PropsWithChildren, useCallback, useMemo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormControllerContext,
  FormControllerContextValueType,
} from 'shared/hook-form/form-controller';
import { useGetDefaultValues, useChainId } from 'shared/hooks';
import { useContractSWR, useFarmingFactoryContractRPC } from '@knine-sdk/react';
import { useWeb3 } from 'rnb-web3/web3-react';
import { STRATEGY_CONSTANT } from 'utils';
import { defaultState, schema } from './helper';
import { useUpdateZapFees } from './useUpdateZapFees';

const useZapFormValues = () => {
  const { defaultChain } = useChainId();
  const { account, active } = useWeb3();

  const {
    data,
    error,
    update,
    initialLoading: isFeesLoading,
  } = useContractSWR({
    contract: useFarmingFactoryContractRPC(defaultChain),
    method: 'zapFees',
    shouldFetch: active && !!account,
    config: STRATEGY_CONSTANT,
  });

  const loading = useMemo(
    () => ({
      isFeesLoading,
    }),
    [isFeesLoading],
  );

  return {
    data: data
      ? {
          zapEntryFee: data?.entry?.toString(),
          zapExitFee: data?.exit?.toString(),
        }
      : undefined,
    loading,
    error,
    revalidate: update,
  };
};

export type ZapFeesType = {
  zapEntryFee: string;
  zapExitFee: string;
};

export const ZapFeesFormProvider = ({ children }: PropsWithChildren) => {
  const { defaultChain, currentChainId } = useChainId();
  const { data, error, revalidate } = useZapFormValues();

  const { getDefaultValues } = useGetDefaultValues<ZapFeesType>({
    data: data,
    error: error,
    defaultState,
  });

  const formObject = useForm({
    defaultValues: getDefaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange',
    disabled: defaultChain !== currentChainId,
  });

  const { reset } = formObject;

  const revalidateValues = useCallback(async () => {
    // @ts-expect-error @todo: fix types
    const { entry, exit } = await revalidate();

    reset({ zapEntryFee: entry, zapExitFee: exit });
  }, [reset, revalidate]);

  const updateFormFields = useUpdateZapFees({
    onConfirm: revalidateValues,
  });

  const formControllerValue: FormControllerContextValueType<ZapFeesType> =
    useMemo(
      () => ({
        onSubmit: (values) =>
          updateFormFields('setFees', [
            { entry: values.zapEntryFee, exit: values.zapExitFee },
          ]),
        onReset: () => {},
      }),
      [updateFormFields],
    );

  return (
    <FormProvider {...formObject}>
      <FormControllerContext.Provider value={formControllerValue}>
        {children}
      </FormControllerContext.Provider>
    </FormProvider>
  );
};
