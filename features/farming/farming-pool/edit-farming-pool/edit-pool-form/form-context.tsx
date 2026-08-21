import { PropsWithChildren, createContext, useMemo, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  FormControllerContext,
  FormControllerContextValueType,
} from 'shared/hook-form/form-controller';
import {
  type FarmingPoolFormFields,
  defaultValues,
  farmingPoolFormSchema,
} from '../../shared';
import { useGetDefaultValues } from 'shared/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  getDirtyValues,
  serializeValueToContractParams,
} from 'shared/hook-form/utils';
import { useUpdateFarmingViaContract } from './useUpdateFarmingViaContract';
import { updateFarmingPool } from './updateFarmingPool';
import { useFarmingPoolData } from 'features/farming/farming-pool/edit-farming-pool/pool-data-context';

const EditFarmingPoolFormDataContext =
  createContext<FarmingPoolFormFields | null>(null);
EditFarmingPoolFormDataContext.displayName = 'EditFarmingPoolFormDataContext';

type Fields = keyof FarmingPoolFormFields & { emergencyStop: 'stopFarming' };

const methodByField: { [key in Fields]?: string } = {
  rps: 'changeFarmingRPS',
  emergencyStop: 'stopFarming',
};

export const EditFarmingPoolFormProvider = ({
  children,
}: PropsWithChildren) => {
  const { data, error, initialLoading, address } = useFarmingPoolData();
  const { getDefaultValues } = useGetDefaultValues({
    data,
    error,
    defaultState: defaultValues,
  });

  const formObject = useForm({
    defaultValues: getDefaultValues,
    resolver: yupResolver(farmingPoolFormSchema),
    mode: 'onChange',
    context: {
      isEditing: true,
    },
    disabled: initialLoading || !!error,
    reValidateMode: 'onChange',
  });

  const { dirtyFields } = formObject.formState;

  const contractUpdateCall = useUpdateFarmingViaContract({
    poolAddress: address,
  });

  const updateFarmingPoolForm = useCallback(
    async (data: FarmingPoolFormFields) => {
      const newData = getDirtyValues(
        dirtyFields,
        data,
      ) as FarmingPoolFormFields;

      return await updateFarmingPool(newData, address);
    },
    [address, dirtyFields],
  );

  const farmingFormControllerValue: FormControllerContextValueType<FarmingPoolFormFields> =
    useMemo(
      () => ({
        onSubmit: updateFarmingPoolForm,
        onSave: async ({ name, value }) => {
          const params = value ? serializeValueToContractParams(value) : [];
          // @ts-expect-error fix types later
          await contractUpdateCall(methodByField[name], params);
        },
        onReset: () => {},
      }),
      [updateFarmingPoolForm, contractUpdateCall],
    );

  return (
    <FormProvider {...formObject}>
      <FormControllerContext.Provider value={farmingFormControllerValue}>
        {children}
      </FormControllerContext.Provider>
    </FormProvider>
  );
};
