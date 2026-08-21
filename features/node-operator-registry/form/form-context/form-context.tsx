import { PropsWithChildren, useCallback, useMemo } from 'react';
import {
  useNodeOperatorFormValues,
  useUpdateNodeOperatorValue,
} from '../hooks';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormControllerContext,
  FormControllerContextValueType,
} from 'shared/hook-form/form-controller';
import { NodeOperatorFormFields } from './types';
import { defaultState, schema, shieldContractMethodByField } from './helper';
import { serializeValueToContractParams } from 'shared/hook-form/utils';
import { useGetDefaultValues, useChainId } from 'shared/hooks';

export const NodeOperatorFormProvider = ({ children }: PropsWithChildren) => {
  const { data, error, update } = useNodeOperatorFormValues();

  const { getDefaultValues } = useGetDefaultValues<NodeOperatorFormFields>({
    data,
    error,
    defaultState,
  });
  const { chainId, currentChainId } = useChainId();

  const formObject = useForm({
    defaultValues: getDefaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange',
    disabled: chainId !== currentChainId,
  });

  const { reset } = formObject;

  const revalidateValues = useCallback(async () => {
    await Promise.allSettled([update().then(reset)]);
  }, [update]);

  const updateSetting = useUpdateNodeOperatorValue({
    onConfirm: revalidateValues,
  });

  const formControllerValue: FormControllerContextValueType<NodeOperatorFormFields> =
    useMemo(
      () => ({
        onSubmit: () => Promise.resolve(true),
        onSave: async ({ name, value }) => {
          const params = serializeValueToContractParams(value);

          // @ts-expect-error fix types later
          await updateSetting(shieldContractMethodByField[name], params);
        },
      }),
      [updateSetting],
    );

  return (
    <FormProvider {...formObject}>
      <FormControllerContext.Provider value={formControllerValue}>
        {children}
      </FormControllerContext.Provider>
    </FormProvider>
  );
};
