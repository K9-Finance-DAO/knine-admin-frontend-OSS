import { PropsWithChildren, useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  FormControllerContext,
  FormControllerContextValueType,
} from 'shared/hook-form/form-controller';
import { UpdatedFields, VestingFormFields } from './types';
import {
  useUpdateVestingValue,
  useVestingContractValues,
} from 'features/vesting/hooks';
import {
  defaultState,
  methodsByField,
  schema,
  SECONDS_IN_A_DAY,
} from './helper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetDefaultValues, useChainId } from 'shared/hooks';
import { serializeValueToContractParams } from 'shared/hook-form/utils';
import { Big } from 'features/liquid-staking/rewards/helpers';

export const VestingFormProvider = ({ children }: PropsWithChildren) => {
  const { data, error, update } = useVestingContractValues();

  const { defaultChain, currentChainId } = useChainId();
  const { getDefaultValues } = useGetDefaultValues<VestingFormFields>({
    data: data,
    error: error,
    defaultState,
  });
  const formObject = useForm({
    defaultValues: getDefaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange',
    disabled: currentChainId !== defaultChain,
  });

  const { reset } = formObject;

  const contractDenominator = formObject.formState.defaultValues?.denominator;

  const formatValueForContract = useCallback(
    (field: keyof UpdatedFields, value: UpdatedFields[keyof UpdatedFields]) => {
      switch (field) {
        case 'vestingRatio':
        case 'backingRatio':
          return new Big(value)
            .multipliedBy(contractDenominator ?? 100)
            ?.toString();
        case 'vestingPeriod':
          return Number(value) * SECONDS_IN_A_DAY;
        default:
          return value;
      }
    },
    [contractDenominator],
  );

  const revalidateValues = useCallback(async () => {
    await Promise.allSettled([update().then(reset)]);
  }, [update]);

  const updateValue = useUpdateVestingValue({ onConfirm: revalidateValues });

  const formControllerValue: FormControllerContextValueType<UpdatedFields> =
    useMemo(
      () => ({
        onSubmit: () => Promise.resolve(true),
        onSave: async ({ name, value }) => {
          const params = serializeValueToContractParams(
            formatValueForContract(name, value),
          );

          await updateValue(methodsByField[name], params as any);
        },
      }),
      [formatValueForContract, updateValue],
    );

  return (
    <FormProvider {...formObject}>
      <FormControllerContext.Provider value={formControllerValue}>
        {children}
      </FormControllerContext.Provider>
    </FormProvider>
  );
};
