import { PropsWithChildren, useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  FormControllerContext,
  type FormControllerContextValueType,
} from 'shared/hook-form/form-controller';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../bonus-pool-form/resolver';
import { useGetDefaultValues, useChainId } from 'shared/hooks';
import { useFormDrawer } from './drawer-context';
import { useFarmingPoolData } from '../../edit-farming-pool/pool-data-context';
import {
  useBonusPoolData,
  useCreateBonusPool,
  useEditBonusPool,
} from '../hooks';
import type { BonusPoolFields } from '../types';
import { getDirtyValues } from 'shared/hook-form/utils';
import { useBonusPoolsData } from './bonus-pools-context';

const defaultValues: BonusPoolFields = {
  poolLogo: '',
  poolName: '',
  description: '',
  instagram: '',
  telegram: '',
  discord: '',
  website: '',
  rewardToken: '',
  startTime: null,
  endTime: null,
  rps: '',
};

export const BonusPoolFormProvider = ({ children }: PropsWithChildren) => {
  const { defaultChain, currentChainId } = useChainId();
  const { data: mainPoolData, address } = useFarmingPoolData();
  const { selectedPool, closeDrawer, isEditing } = useFormDrawer();
  const { data, initialLoading, error, update } =
    useBonusPoolData(selectedPool);
  const { mutate: revalidatePools } = useBonusPoolsData();

  const { getDefaultValues } = useGetDefaultValues({
    data,
    error,
    defaultState: defaultValues,
  });

  const formObject = useForm({
    defaultValues: getDefaultValues,
    context: {
      mainPoolStartTime: mainPoolData?.startDate,
      mainPoolEndTime: mainPoolData?.endDate,
      isEditing,
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
    disabled: defaultChain !== currentChainId || initialLoading,
  });

  const { dirtyFields } = formObject.formState;

  const afterSuccessApiCall = useCallback(
    async (shouldUpdate = false) => {
      await revalidatePools();

      if (shouldUpdate) {
        await update();
      }
      closeDrawer();
    },
    [closeDrawer, revalidatePools, update],
  );

  const createBonusPool = useCreateBonusPool({
    mainPoolAddress: address,
    onConfirm: afterSuccessApiCall,
  });

  const editBonusPool = useEditBonusPool({
    mainPoolAddress: address,
    selectedPool: selectedPool,
    onConfirm: afterSuccessApiCall,
  });

  const isEditPoolFlow = selectedPool?.poolId;

  const farmingFormControllerValue: FormControllerContextValueType<BonusPoolFields> =
    useMemo(
      () => ({
        onSubmit: async (data) => {
          if (isEditPoolFlow) {
            const newData = getDirtyValues(
              dirtyFields,
              data,
            ) as BonusPoolFields;

            return await editBonusPool(newData);
          } else {
            return await createBonusPool(data);
          }
        },
      }),
      [createBonusPool, dirtyFields, editBonusPool, isEditPoolFlow],
    );

  return (
    <FormProvider {...formObject}>
      <FormControllerContext.Provider value={farmingFormControllerValue}>
        {children}
      </FormControllerContext.Provider>
    </FormProvider>
  );
};
