import { FormController } from 'shared/hook-form/form-controller';
import { MaxLockupMultiplierFormDataProvider } from './form-context';
import { MaxLockupMultiplierInput } from './controls';

export const MaxLockupMultiplierForm = () => {
  return (
    <MaxLockupMultiplierFormDataProvider>
      <FormController>
        <MaxLockupMultiplierInput />
      </FormController>
    </MaxLockupMultiplierFormDataProvider>
  );
};
