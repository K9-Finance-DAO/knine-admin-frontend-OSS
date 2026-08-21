import { Yup } from 'shared/hook-form/yup';

export type AddNewAdminFormFields = {
  address: string;
  role: {
    label: string;
    value: string;
  };
};

export const addNewAdminFormSchema = Yup.object().shape({
  address: Yup.string().isValidAddress().required('Address is required'),
  role: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().required(),
  }),
});
