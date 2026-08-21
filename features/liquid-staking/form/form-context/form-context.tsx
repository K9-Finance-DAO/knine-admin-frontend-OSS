import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useCallStakingSettingsMethod, useStakingFormValues } from '../hooks';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormControllerContext,
  FormControllerContextValueType,
} from 'shared/hook-form/form-controller';
import { StakingFormFields } from './types';
import {
  defaultState,
  MAX_FEE_TOTAL,
  schema,
  shieldContractMethodByField,
} from './helper';
import { serializeValueToContractParams } from 'shared/hook-form/utils';
import { useGetDefaultValues, useChainId } from 'shared/hooks';
import invariant from 'tiny-invariant';

//
// TODO: fix, workaround to validate total of fee context, because resolver doest triggers, check later
//
const StakeValidationResultContext = createContext<{
  feeInvalid: boolean;
} | null>(null);
StakeValidationResultContext.displayName = 'StakeValidationResultContext';

export const useStakeValidationResult = () => {
  const value = useContext(StakeValidationResultContext);
  invariant(
    value,
    'useStakeValidationResult was used outside the StakeValidationResultContext psrovider',
  );
  return value;
};

export const LiquidStakingFormProvider = ({ children }: PropsWithChildren) => {
  const { chainId, currentChainId } = useChainId();
  const { data, error, update } = useStakingFormValues();
  const [feeInvalid, setFeeInvalid] = useState(false);

  const { getDefaultValues } = useGetDefaultValues<StakingFormFields>({
    data,
    error,
    defaultState,
  });

  const formObject = useForm({
    defaultValues: getDefaultValues,
    resolver: async (values) => {
      const total = Object.values(values.entityFees).reduce(
        (acc, c) => acc + +c,
        0,
      );
      setFeeInvalid(total !== MAX_FEE_TOTAL);

      // @ts-expect-error Yup types
      return yupResolver(schema)?.(values, {}, {});
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    disabled: currentChainId !== chainId,
  });

  const { reset } = formObject;

  const revalidateValues = useCallback(async () => {
    await Promise.allSettled([update().then(reset)]);
  }, [update]);

  const callContract = useCallStakingSettingsMethod({
    onConfirm: revalidateValues,
  });

  const formControllerValue: FormControllerContextValueType<StakingFormFields> =
    useMemo(
      () => ({
        onSubmit: () => Promise.resolve(true),
        onSave: async ({ value, name }) => {
          let newValue = value;

          if (name === 'entityFees') {
            // hotfix: no fresh data from onSave for the object field, so we get it from formObject
            newValue = formObject.getValues()?.['entityFees'];
          }

          const params = serializeValueToContractParams(newValue);
          return await callContract(
            shieldContractMethodByField[name],
            params as any,
          );
        },
      }),
      [callContract, formObject],
    );

  return (
    <FormProvider {...formObject}>
      <FormControllerContext.Provider value={formControllerValue}>
        <StakeValidationResultContext.Provider value={{ feeInvalid }}>
          {children}
        </StakeValidationResultContext.Provider>
      </FormControllerContext.Provider>
    </FormProvider>
  );
};
