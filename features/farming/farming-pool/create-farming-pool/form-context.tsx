import { PropsWithChildren, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  FormControllerContext,
  FormControllerContextValueType,
} from 'shared/hook-form/form-controller';
import { FarmingPoolFormFields } from '../shared/types';
import { defaultValues, farmingPoolFormSchema } from '../shared/farming-pool';
import { yupResolver } from '@hookform/resolvers/yup';
import { useChainId } from 'shared/hooks';
import { useCreateFarmingPool } from './useCreateFarmingPool';
import { useRouter } from 'next/router';
import { FARMING_PATH } from 'config/urls';

export const FarmingPoolFormProvider = ({ children }: PropsWithChildren) => {
  const { push } = useRouter();
  const { defaultChain, currentChainId } = useChainId();

  const formObject = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(farmingPoolFormSchema),
    mode: 'onChange',
    disabled: defaultChain !== currentChainId,
    criteriaMode: 'firstError',
    context: {
      isEditing: true,
    },
    reValidateMode: 'onChange',
  });

  const redirectOnSuccess = () => {
    void push(FARMING_PATH);
  };

  const createPool = useCreateFarmingPool({ onConfirm: redirectOnSuccess });

  const farmingFormControllerValue: FormControllerContextValueType<FarmingPoolFormFields> =
    useMemo(
      () => ({
        onSubmit: (data) => createPool(data),
      }),
      [createPool],
    );

  return (
    <FormProvider {...formObject}>
      <FormControllerContext.Provider value={farmingFormControllerValue}>
        {children}
      </FormControllerContext.Provider>
    </FormProvider>
  );
};
