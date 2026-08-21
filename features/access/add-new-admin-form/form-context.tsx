import { PropsWithChildren, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AddNewAdminFormFields, addNewAdminFormSchema } from './helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddNewAdmin } from '../hooks';
import {
  FormControllerContext,
  FormControllerContextValueType,
} from 'shared/hook-form/form-controller';
import { useAccessDataContext } from '../provider';
import { startCase } from 'lodash';

export const AddNewAdminFormProvider = ({ children }: PropsWithChildren) => {
  const { contractAdminRoles, isDefaultAdmin, loading, updateAccessData } =
    useAccessDataContext();

  const values = useMemo(
    () => ({
      address: '',
      role: contractAdminRoles
        ? {
            label: startCase(Object.keys(contractAdminRoles)[0]?.toLowerCase()),
            value: Object.values(contractAdminRoles)[0],
          }
        : {
            label: '',
            value: '',
          },
    }),
    [contractAdminRoles],
  );

  const formObject = useForm<AddNewAdminFormFields>({
    values,
    resolver: yupResolver(addNewAdminFormSchema),
    mode: 'onChange',
    disabled: !isDefaultAdmin || loading,
  });

  const { reset } = formObject;

  const revalidate = async () => {
    await updateAccessData();
    reset();
  };

  const addNewAdmin = useAddNewAdmin({ onSuccess: revalidate });

  const formControllerValue: FormControllerContextValueType<AddNewAdminFormFields> =
    useMemo(
      () => ({
        onSubmit: (data) => addNewAdmin(data.role.value, data.address),
      }),
      [addNewAdmin],
    );

  return (
    <FormProvider {...formObject}>
      <FormControllerContext.Provider value={formControllerValue}>
        {children}
      </FormControllerContext.Provider>
    </FormProvider>
  );
};
